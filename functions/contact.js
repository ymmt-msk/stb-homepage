export async function onRequestPost({ request, env }) {
  try {
    const { name, email, phone = '', company = '', message } = await request.json();
    if (!name || !email || !message) {
      return new Response('Bad Request', { status: 400 });
    }

    // 管理者宛てメール
    const text = `お名前: ${name}\nメール: ${email}\n会社名: ${company || '(未記入)'}\n電話番号: ${phone || '(未記入)'}\n\n${message}`;
    const adminMail = {
      from: 'Contact Form <no-reply@stbshoukai.com>',
      to: ['info@stbshoukai.com'],
      reply_to: email,
      subject: `お問い合わせ from ${name}`,
      text
    };

    // ユーザー宛て自動返信メール
    const userText = `${name} 様\n\nお問い合わせありがとうございます。\n以下の内容で受け付けました。\n\n------------------\n${text}\n------------------\n\n担当者より折り返しご連絡いたしますので、今しばらくお待ちください。\n\nSTB商会`;
    const userMail = {
      from: 'STB商会 <no-reply@stbshoukai.com>',
      to: [email],
      subject: '【自動返信】お問い合わせありがとうございます',
      text: userText
    };

    // 管理者宛て送信
    const sendAdmin = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.RESEND_API_KEY}`
      },
      body: JSON.stringify(adminMail)
    });

    // ユーザー宛て送信
    const sendUser = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.RESEND_API_KEY}`
      },
      body: JSON.stringify(userMail)
    });

    const adminText = await sendAdmin.text();
    const userTextRes = await sendUser.text();

    if (!sendAdmin.ok) {
      return new Response(`Mail error (admin): ${sendAdmin.status} ${sendAdmin.statusText} ${adminText}`, { status: 500 });
    }
    if (!sendUser.ok) {
      return new Response(`Mail error (user): ${sendUser.status} ${sendUser.statusText} ${userTextRes}`, { status: 500 });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(`Server Error: ${err.message || err}`, { status: 500 });
  }
}
