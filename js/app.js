const { useState } = React;

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${form.name} \u6b63\u3057\u304f\u304a\u53d7\u3051\u3057\u307e\u3057\u305f`);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    React.createElement('form', { onSubmit: handleSubmit, className: 'contact-form' },
      React.createElement('div', { className: 'mb-3' },
        React.createElement('label', { className: 'form-label' }, '\u304a\u540d\u524d'),
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
        React.createElement('label', { className: 'form-label' }, '\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9'),
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
        React.createElement('label', { className: 'form-label' }, '\u304a\u554f\u3044\u5408\u308f\u305b\u5185\u5bb9'),
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
