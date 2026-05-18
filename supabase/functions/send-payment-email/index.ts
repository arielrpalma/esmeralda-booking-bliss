import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';
import { z } from 'npm:zod@3.23.8';

const BodySchema = z.object({
  payment_id: z.union([z.string(), z.number()]),
  amount: z.number().positive(),
  payer_email: z.string().email(),
  payer_name: z.string().optional(),
});

const SMTP_USER = 'contacto@esmeraldadesarrollos.com.ar';
const BCC_LIST = ['arielrpalma@gmail.com', 'jerevidela005@gmail.com'];

const formatARS = (n: number) =>
  new Intl.NumberFormat('es-AR', { minimumFractionDigits: 2 }).format(n);

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const password = Deno.env.get('ZOHO_SMTP_PASSWORD');
    if (!password) {
      return new Response(JSON.stringify({ error: 'ZOHO_SMTP_PASSWORD no configurado' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: 'Datos inválidos', details: parsed.error.flatten().fieldErrors }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const { payment_id, amount, payer_email, payer_name } = parsed.data;

    const client = new SMTPClient({
      connection: {
        hostname: 'smtppro.zoho.com',
        port: 465,
        tls: true,
        auth: { username: SMTP_USER, password },
      },
    });

    const saludo = payer_name ? `Hola ${payer_name},` : 'Hola,';
    const html = `
      <div style="font-family:Arial,sans-serif;color:#222;max-width:560px;margin:0 auto;padding:24px;background:#ffffff;border:1px solid #eee;border-radius:6px;">
        <h2 style="color:#0f5132;margin:0 0 16px;">¡Pago exitoso!</h2>
        <p>${saludo}</p>
        <p>Tu pago <strong>N° ${payment_id}</strong> por <strong>$${formatARS(amount)} ARS</strong> ha sido procesado exitosamente.</p>
        <p>¡Muchas gracias por tu confianza y por elegir <strong>Esmeralda Apart</strong>! Será un placer recibirte.</p>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
        <p style="font-size:12px;color:#888;">Este es un comprobante automático de tu pago. Si necesitás ayuda, respondé a este correo.</p>
        <p style="font-size:12px;color:#888;">Esmeralda Apart — contacto@esmeraldadesarrollos.com.ar</p>
      </div>
    `;
    const text = `${saludo}\n\nTu pago N° ${payment_id} por $${formatARS(amount)} ARS ha sido procesado exitosamente.\n\n¡Muchas gracias por tu confianza y por elegir Esmeralda Apart!\n\n— Esmeralda Apart`;

    await client.send({
      from: `Esmeralda Apart <${SMTP_USER}>`,
      to: payer_email,
      bcc: BCC_LIST,
      replyTo: SMTP_USER,
      subject: 'Pago exitoso',
      content: text,
      html,
    });
    await client.close();

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('send-payment-email error', err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
