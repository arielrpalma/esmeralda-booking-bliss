import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { z } from 'npm:zod@3.23.8';

const BodySchema = z.object({
  nombre: z.string().trim().min(1).max(100),
  apellido: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  telefono: z.string().trim().min(4).max(40),
  departamento: z.string().trim().min(1).max(100),
  codigo_reserva: z.string().trim().min(1).max(60),
  importe: z.number().positive().max(100000000),
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

    const preference = {
      items: [{
        title: 'Estadía Esmeralda Apart',
        description: `Reserva ${d.codigo_reserva} - ${d.departamento}`,
        quantity: 1,
        currency_id: 'ARS',
        unit_price: Number(d.importe.toFixed(2)),
      }],
      payer: {
        name: d.nombre,
        surname: d.apellido,
        email: d.email,
        phone: { number: d.telefono },
      },
      metadata: {
        nombre: d.nombre,
        apellido: d.apellido,
        telefono: d.telefono,
        departamento: d.departamento,
        codigo_reserva: d.codigo_reserva,
      },
      external_reference: d.codigo_reserva,
      back_urls: {
        success: 'https://esmeraldaapart.com.ar/pago/success',
        pending: 'https://esmeraldaapart.com.ar/pago/pending',
        failure: 'https://esmeraldaapart.com.ar/pago/failure',
      },
      auto_return: 'approved',
      statement_descriptor: 'ESMERALDA APART',
    };

    const mpRes = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-Idempotency-Key': `${d.codigo_reserva}-${Date.now()}`,
      },
      body: JSON.stringify(preference),
    });

    const mpData = await mpRes.json();
    if (!mpRes.ok) {
      console.error('MP error', mpData);
      return new Response(JSON.stringify({ error: 'Error creando preferencia', details: mpData }), {
        status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      id: mpData.id,
      init_point: mpData.init_point,
      sandbox_init_point: mpData.sandbox_init_point,
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
