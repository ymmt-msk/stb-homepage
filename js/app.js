const { useState } = React;

function sanitize(str) {
  return str.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

function ContactComplete({ onBackHome }) {
  return (
    React.createElement('div', { className: 'contact-complete text-center py-5' },
      React.createElement('h2', null, 'お問い合わせありがとうございました'),
      React.createElement('p', null, 'お問い合わせ内容を受け付けました。担当者より折り返しご連絡いたします。'),
      React.createElement('button', {
        className: 'btn btn-primary mt-4',
        onClick: onBackHome
      }, 'ホームページに戻る')
    )
  );
}

function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [complete, setComplete] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: sanitize(form.name),
      email: sanitize(form.email),
      phone: sanitize(form.phone),
      company: sanitize(form.company),
      message: sanitize(form.message)
    };
    try {
      const res = await fetch('/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setForm({ name: '', email: '', phone: '', company: '', message: '' });
        setComplete(true);
      } else {
        alert('送信に失敗しました');
      }
    } catch (err) {
      console.error(err);
      alert('サーバーでエラーが発生しました');
    }
  };

  const handleBackHome = () => {
    window.location.href = '/';
  };

  if (complete) {
    return React.createElement(ContactComplete, { onBackHome: handleBackHome });
  }

  return (
    React.createElement('form', { onSubmit: handleSubmit, className: 'contact-form' },
      React.createElement('div', { className: 'mb-3' },
        React.createElement('label', { className: 'form-label' }, '\u304a\u540d\u524d (\u5fc5\u9808)'),
        React.createElement('input', {
          type: 'text',
          name: 'name',
          value: form.name,
          onChange: handleChange,
          className: 'form-control',
          required: true
        })
      ),
      React.createElement('div', { className: 'mb-3' },
        React.createElement('label', { className: 'form-label' }, '\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9 (\u5fc5\u9808)'),
        React.createElement('input', {
          type: 'email',
          name: 'email',
          value: form.email,
          onChange: handleChange,
          className: 'form-control',
          required: true
        })
      ),
      React.createElement('div', { className: 'mb-3' },
        React.createElement('label', { className: 'form-label' }, '\u4f1a\u793e\u540d (\u4efb\u610f)'),
        React.createElement('input', {
          type: 'text',
          name: 'company',
          value: form.company,
          onChange: handleChange,
          className: 'form-control'
        })
      ),
      React.createElement('div', { className: 'mb-3' },
        React.createElement('label', { className: 'form-label' }, '\u96fb\u8a71\u756a\u53f7 (\u4efb\u610f)'),
        React.createElement('input', {
          type: 'tel',
          name: 'phone',
          value: form.phone,
          onChange: handleChange,
          className: 'form-control'
        })
      ),
      React.createElement('div', { className: 'mb-3' },
        React.createElement('label', { className: 'form-label' }, '\u304a\u554f\u3044\u5408\u308f\u305b\u5185\u5bb9 (\u5fc5\u9808)'),
        React.createElement('textarea', {
          name: 'message',
          rows: 4,
          value: form.message,
          onChange: handleChange,
          className: 'form-control',
          required: true
        })
      ),
      React.createElement('button', { type: 'submit', className: 'btn btn-primary' }, '\u9001\u4fe1')
    )
  );
}

ReactDOM.render(
  React.createElement(ContactForm, null),
  document.getElementById('contact-root')
);