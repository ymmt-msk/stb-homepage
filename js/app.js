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

function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        alert('\u9001\u4fe1\u304c\u5b8c\u4e86\u3057\u307e\u3057\u305f');
        setForm({ name: '', email: '', phone: '', company: '', message: '' });
      } else {
        alert('\u9001\u4fe1\u306b\u5931\u6557\u3057\u307e\u3057\u305f');
      }
    } catch (err) {
      console.error(err);
      alert('\u30b5\u30fc\u30d0\u30fc\u3067\u30a8\u30e9\u30fc\u304c\u767a\u751f\u3057\u307e\u3057\u305f');
    }
  };

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