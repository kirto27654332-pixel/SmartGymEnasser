import emailjs from '@emailjs/browser';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SiteContentProvider } from './context/SiteContentContext';
import { LanguageProvider } from './context/LanguageContext';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './AppRouter';
import { EMAILJS_CONFIG } from './config/emailjs';
import './index.css';

if (EMAILJS_CONFIG.publicKey) {
  emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SiteContentProvider>
          <LanguageProvider>
            <AppRouter />
          </LanguageProvider>
        </SiteContentProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
