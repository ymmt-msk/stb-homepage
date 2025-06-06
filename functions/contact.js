const RESEND_API_KEY = 're_2NoQNoJY_NhTkEQhobeGjsvpmZmadFTDT';

export async function onRequestPost({ request }) {
  try {
    const { name, email, phone = '', company = '', message } = await request.json();
    if (!name || !email || !message) {
      return new Response('Bad Request', { status: 400 });
    }

    const text = `お名前: ${name}\nメール: ${email}\n会社名: ${company || '(未記入)'}\n電話番号: ${phone || '(未記入)'}\n\n${message}`;

    const data = {
      from: 'Contact Form <no-reply@stbshoukai.com>',
      to: ['info@stbshoukai.com'],
      reply_to: email,
      subject: `お問い合わせ from ${name}`,
      text
    };

    const send = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify(data)
    });

    if (!send.ok) {
      return new Response('Mail error', { status: 500 });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response('Server Error', { status: 500 });
  }
}
