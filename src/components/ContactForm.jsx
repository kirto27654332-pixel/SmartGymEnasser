import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../context/LanguageContext';
import { EMAILJS_CONFIG } from '../config/emailjs';
import './ContactForm.css';

const INITIAL = { name: '', email: '', message: '' };

export default function ContactForm() {
  const { t } = useLanguage();
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!EMAILJS_CONFIG.publicKey) {
      setStatus('config');
      return;
    }

    setStatus('sending');

    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          user_name: form.name,
          from_name: form.name,
          name: form.name,
          user_email: form.email,
          from_email: form.email,
          email: form.email,
          reply_to: form.email,
          message: form.message,
        },
        { publicKey: EMAILJS_CONFIG.publicKey },
      );

      setStatus('success');
      setForm(INITIAL);
    } catch (err) {
      console.error('EmailJS error:', err?.status, err?.text);

      if (typeof err?.text === 'string' && err.text.toLowerCase().includes('private key')) {
        setStatus('strictMode');
      } else {
        setStatus('error');
      }
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__row">
        <label className="contact-form__field">
          <span>{t.cta.form.name}</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder={t.cta.form.namePlaceholder}
            required
            autoComplete="name"
          />
        </label>

        <label className="contact-form__field">
          <span>{t.cta.form.email}</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder={t.cta.form.emailPlaceholder}
            required
            autoComplete="email"
          />
        </label>
      </div>

      <label className="contact-form__field">
        <span>{t.cta.form.message}</span>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder={t.cta.form.messagePlaceholder}
          rows={5}
          required
        />
      </label>

      <button
        type="submit"
        className="btn btn-primary contact-form__submit"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? t.cta.form.sending : t.cta.form.send}
        {status !== 'sending' && (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        )}
      </button>

      {status === 'success' && (
        <p className="contact-form__feedback contact-form__feedback--success" role="status">
          {t.cta.form.success}
        </p>
      )}
      {status === 'error' && (
        <p className="contact-form__feedback contact-form__feedback--error" role="alert">
          {t.cta.form.error}
        </p>
      )}
      {status === 'config' && (
        <p className="contact-form__feedback contact-form__feedback--error" role="alert">
          {t.cta.form.configError}
        </p>
      )}
      {status === 'strictMode' && (
        <p className="contact-form__feedback contact-form__feedback--error" role="alert">
          {t.cta.form.strictModeError}
        </p>
      )}
    </form>
  );
}
