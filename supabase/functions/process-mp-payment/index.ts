import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';
import { z } from 'npm:zod@3.23.8';

// Payload coming from MP Payment Brick after card tokenization
const BodySchema = z.object({
  token: z.string().min(1),
  issuer_id: z.union([z.string(), z.number()]).optional(),
  payment_method_id: z.string().min(1),
  installments: z.number().int().positive(),
  transaction_amount: z.number().positive().max(100000000),
  external_reference: z.string().min(8).max(120),
  payer: z.object({
    email: z.string().email(),
    identification: z.object({
      type: z.string().min(1),
      number: z.string().min(1),
    }).optional(),
  }),
});

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const token = Deno.env.get('MP_ACCESS_TOKEN');
    if (!token) {
      return new Response(JSON.stringify({ error: 'MP_ACCESS_TOKEN no configurado' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const json = await req.json();
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: 'Datos inválidos', details: parsed.error.flatten().fieldErrors }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const d = parsed.data;
    const externalRef = d.external_reference;

    // Idempotency short-circuit: if a payment for this external_reference already exists,
    // return it instead of hitting MP again (protects against double-clicks / retries).
    const supaUrl = Deno.env.get('SUPABASE_URL');
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const supabase = supaUrl && serviceKey
      ? createClient(supaUrl, serviceKey, { auth: { persistSession: false } })
      : null;

    if (supabase) {
      const { data: existing } = await supabase
        .from('pagos')
        .select('id, status, status_detail, amount, payment_method_id, external_reference')
        .eq('external_reference', externalRef)
        .maybeSingle();
      if (existing) {
        return new Response(JSON.stringify({
          id: existing.id,
          status: existing.status,
          status_detail: existing.status_detail,
          transaction_amount: existing.amount,
          payment_method_id: existing.payment_method_id,
          external_reference: existing.external_reference,
          deduped: true,
        }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
    }

    const payment = {
      transaction_amount: Number(d.transaction_amount.toFixed(2)),
      token: d.token,
      description: 'Pago Esmeralda Apart',
      installments: d.installments,
      payment_method_id: d.payment_method_id,
      issuer_id: d.issuer_id,
      external_reference: externalRef,
      binary_mode: true,
      payer: {
        email: d.payer.email,
        identification: d.payer.identification,
      },
      statement_descriptor: 'ESMERALDA APART',
    };

    const mpRes = await fetch('https://api.mercadopago.com/v1/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        // Stable idempotency key: MP returns the same payment on retries.
        'X-Idempotency-Key': externalRef,
      },
      body: JSON.stringify(payment),
    });

    const mpData = await mpRes.json();
    if (!mpRes.ok) {
      console.error('MP error', JSON.stringify(mpData));
      return new Response(JSON.stringify({
        error: mpData?.message || 'Error procesando el pago',
        status_detail: mpData?.status_detail,
        details: mpData,
      }), {
        status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Persist initial record (webhook will keep it updated)
    const supaUrl = Deno.env.get('SUPABASE_URL');
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (supaUrl && serviceKey) {
      try {
        const supabase = createClient(supaUrl, serviceKey, { auth: { persistSession: false } });
        await supabase.from('pagos').upsert({
          id: mpData.id,
          status: mpData.status,
          status_detail: mpData.status_detail ?? null,
          amount: Number(mpData.transaction_amount ?? d.transaction_amount),
          payer_email: mpData?.payer?.email ?? d.payer.email,
          payer_name: [mpData?.payer?.first_name, mpData?.payer?.last_name].filter(Boolean).join(' ') || null,
          external_reference: mpData.external_reference ?? externalRef,
          payment_method_id: mpData.payment_method_id ?? d.payment_method_id,
          raw: mpData,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'id' });
      } catch (e) {
        console.error('persist pago failed', e);
      }
    }

    // Fire-and-forget: send confirmation email when payment is approved
    if (mpData.status === 'approved' && supaUrl && serviceKey) {
      fetch(`${supaUrl}/functions/v1/send-payment-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${serviceKey}`,
        },
        body: JSON.stringify({
          payment_id: mpData.id,
          amount: mpData.transaction_amount,
          payer_email: d.payer.email,
          payer_name: mpData?.payer?.first_name ?? undefined,
        }),
      }).catch((e) => console.error('send-payment-email invoke failed', e));
    }

    return new Response(JSON.stringify({
      id: mpData.id,
      status: mpData.status,
      status_detail: mpData.status_detail,
      transaction_amount: mpData.transaction_amount,
      payment_method_id: mpData.payment_method_id,
      external_reference: mpData.external_reference ?? externalRef,
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
