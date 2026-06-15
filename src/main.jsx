import emailjs from '@emailjs/browser';
import { LanguageProvider } from './context/LanguageContext';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { EMAILJS_CONFIG } from './config/emailjs';
import './index.css';

if (EMAILJS_CONFIG.publicKey) {
  emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);
