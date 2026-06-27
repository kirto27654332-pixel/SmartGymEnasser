import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Logo from '../components/Logo';
import '../admin/admin.css';
import './auth.css';

export default function JoinPage() {
  const { t } = useLanguage();
  const { user, profile, isAdmin, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (user && profile) {
    return <Navigate to={isAdmin ? '/admin' : '/'} replace />;
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      let result;
      if (mode === 'signup') {
        result = await signUp(form);
      } else {
        result = await signIn(form.email, form.password);
      }

      navigate(result.profile.isAdmin ? '/admin' : '/');
    } catch (err) {
      const msg = err.code === 'auth/email-already-in-use'
        ? t.auth.errors.emailInUse
        : err.code === 'auth/invalid-credential'
          ? t.auth.errors.invalidCredentials
          : err.message || t.auth.errors.generic;
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-page__glow" aria-hidden />
      <div className="auth-page__card">
        <Logo size="md" />
        <h1>{mode === 'login' ? t.auth.loginTitle : t.auth.signupTitle}</h1>
        <p>{mode === 'login' ? t.auth.loginDesc : t.auth.signupDesc}</p>

        <div className="auth-page__tabs">
          <button
            type="button"
            className={mode === 'login' ? 'active' : ''}
            onClick={() => { setMode('login'); setError(''); }}
          >
            {t.auth.loginTab}
          </button>
          <button
            type="button"
            className={mode === 'signup' ? 'active' : ''}
            onClick={() => { setMode('signup'); setError(''); }}
          >
            {t.auth.signupTab}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="admin-form">
          {mode === 'signup' && (
            <>
              <label className="admin-field">
                <span>{t.auth.name}</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
              </label>
              <label className="admin-field">
                <span>{t.auth.phone}</span>
                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  autoComplete="tel"
                  placeholder="+216 ..."
                />
              </label>
            </>
          )}

          <label className="admin-field">
            <span>{t.auth.email}</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </label>

          <label className="admin-field">
            <span>{t.auth.password}</span>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={6}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </label>

          {error && <p className="admin-feedback admin-feedback--error">{error}</p>}

          <button type="submit" className="btn btn-primary auth-page__submit" disabled={submitting}>
            {submitting
              ? t.auth.submitting
              : mode === 'login'
                ? t.auth.loginBtn
                : t.auth.signupBtn}
          </button>
        </form>

        <Link to="/" className="auth-page__back">{t.auth.backToSite}</Link>
      </div>
    </div>
  );
}
