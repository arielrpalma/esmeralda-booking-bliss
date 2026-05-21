import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

// Mercado Pago webhook receiver.
// Validates x-signature header, fetches the full payment from MP, upserts in `pagos`,
// and fires the confirmation email on first approval.

async function verifyMpSignature(req: Request, rawBody: string, secret: string, dataId: string) {
  const xSignature = req.headers.get('x-signature');
  const xRequestId = req.headers.get('x-request-id');
  if (!xSignature || !xRequestId) return false;

  // x-signature looks like: ts=1700000000,v1=abcdef...
  const parts = Object.fromEntries(
    xSignature.split(',').map((p) => {
      const [k, v] = p.split('=');
      return [k.trim(), v?.trim()];
    }),
  );
  const ts = parts.ts;
  const v1 = parts.v1;
  if (!ts || !v1) return false;

  // Manifest format per MP docs
  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(manifest));
  const hex = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return hex === v1;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const mpToken = Deno.env.get('MP_ACCESS_TOKEN');
    const webhookSecret = Deno.env.get('MP_WEBHOOK_SECRET');
    const supaUrl = Deno.env.get('SUPABASE_URL');
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!mpToken || !supaUrl || !serviceKey) {
      return new Response(JSON.stringify({ error: 'Server not configured' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const rawBody = await req.text();
    let payload: { type?: string; action?: string; data?: { id?: string | number } } = {};
    try { payload = JSON.parse(rawBody); } catch { /* keep empty */ }

    const dataId = String(payload?.data?.id ?? '');
    if (!dataId) {
      // MP sometimes sends test pings without data.id — respond 200 to avoid retries
      return new Response('ok', { status: 200, headers: corsHeaders });
    }

    // Only react to payment events
    const type = payload.type ?? '';
    if (type && !type.startsWith('payment')) {
      return new Response('ignored', { status: 200, headers: corsHeaders });
    }

    // Optional signature validation — skip silently if no secret yet
    if (webhookSecret) {
      const ok = await verifyMpSignature(req, rawBody, webhookSecret, dataId);
      if (!ok) {
        console.warn('Invalid MP webhook signature for id', dataId);
        return new Response(JSON.stringify({ error: 'Invalid signature' }), {
          status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    // Fetch the full payment from MP (source of truth)
    const mpRes = await fetch(`https://api.mercadopago.com/v1/payments/${dataId}`, {
      headers: { 'Authorization': `Bearer ${mpToken}` },
    });
    if (!mpRes.ok) {
      const txt = await mpRes.text();
      console.error('MP fetch failed', mpRes.status, txt);
      return new Response(JSON.stringify({ error: 'MP fetch failed' }), {
        status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const p = await mpRes.json();

    const supabase = createClient(supaUrl, serviceKey, { auth: { persistSession: false } });

    // Check previous status to detect first-time approval
    const { data: existing } = await supabase
      .from('pagos')
      .select('id, status')
      .eq('id', p.id)
      .maybeSingle();

    const wasApprovedBefore = existing?.status === 'approved';

    const row = {
      id: p.id,
      status: p.status,
      status_detail: p.status_detail ?? null,
      amount: Number(p.transaction_amount ?? 0),
      payer_email: p?.payer?.email ?? null,
      payer_name: [p?.payer?.first_name, p?.payer?.last_name].filter(Boolean).join(' ') || null,
      external_reference: p.external_reference ?? null,
      payment_method_id: p.payment_method_id ?? null,
      raw: p,
      updated_at: new Date().toISOString(),
    };

    const { error: upsertErr } = await supabase
      .from('pagos')
      .upsert(row, { onConflict: 'id' });
    if (upsertErr) {
      console.error('Upsert error', upsertErr);
      return new Response(JSON.stringify({ error: upsertErr.message }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // First-time approval: send confirmation email
    if (p.status === 'approved' && !wasApprovedBefore) {
      fetch(`${supaUrl}/functions/v1/send-payment-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${serviceKey}`,
        },
        body: JSON.stringify({
          payment_id: p.id,
          amount: p.transaction_amount,
          payer_email: p?.payer?.email,
          payer_name: p?.payer?.first_name ?? undefined,
        }),
      }).catch((e) => console.error('send-payment-email invoke failed', e));
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('mp-webhook error', err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
