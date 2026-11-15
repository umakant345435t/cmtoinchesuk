import React, { useState, useEffect } from 'react';
import { RoutePath } from '../types';
import { ShieldCheck, X } from 'lucide-react';

interface CookieConsentProps {
  onNavigate: (path: RoutePath) => void;
}

const CONSENT_STORAGE_KEY = 'cmtoinches_cookie_consent_v1';

export type ConsentChoice = 'all' | 'essential';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    __cmtoinchesOpenConsent?: () => void;
  }
}

function applyGoogleConsent(choice: ConsentChoice) {
  if (typeof window === 'undefined') return;
  const granted = choice === 'all' ? 'granted' : 'denied';
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      ad_storage: granted,
      ad_user_data: granted,
      ad_personalization: granted,
      analytics_storage: granted,
      functionality_storage: 'granted',
      security_storage: 'granted',
    });
  }
}

export function CookieConsent({ onNavigate }: CookieConsentProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CONSENT_STORAGE_KEY) as ConsentChoice | null;
      if (saved === 'all' || saved === 'essential') {
        applyGoogleConsent(saved);
        setVisible(false);
      } else {
        setVisible(true);
      }
    } catch (_) {
      setVisible(true);
    }

    const handleOpen = () => setVisible(true);
    window.__cmtoinchesOpenConsent = handleOpen;
    window.addEventListener('cmtoinches-open-cookie-consent', handleOpen);
    return () => {
      window.removeEventListener('cmtoinches-open-cookie-consent', handleOpen);
    };
  }, []);

  const handleSave = (choice: ConsentChoice) => {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    } catch (_) {}
    applyGoogleConsent(choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="UK & EU Cookie Consent Preferences"
      className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-5 sm:max-w-md z-50 bg-white border-2 border-slate-200 rounded-2xl shadow-xl p-4 sm:p-5 text-slate-800"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
          <h2 className="text-sm sm:text-base font-bold text-slate-900">
            Privacy &amp; Cookie Settings (UK GDPR)
          </h2>
        </div>
        <button
          type="button"
          onClick={() => handleSave('essential')}
          aria-label="Dismiss with essential storage only"
          className="text-slate-400 hover:text-slate-700 p-1 rounded-lg cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3.5">
        cmtoinches.uk performs all conversions locally in your browser. With your consent, Google AdSense uses cookies to serve relevant ads and support this free tool. Review our{' '}
        <a
          href="/privacy-policy/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/privacy-policy/');
          }}
          className="text-blue-600 underline hover:text-blue-800"
        >
          Privacy Policy
        </a>{' '}
        and{' '}
        <a
          href="/cookie-policy/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/cookie-policy/');
          }}
          className="text-blue-600 underline hover:text-blue-800"
        >
          Cookie Policy
        </a>.
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => handleSave('all')}
          className="flex-1 min-h-[40px] px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap"
        >
          Accept All
        </button>
        <button
          type="button"
          onClick={() => handleSave('essential')}
          className="flex-1 min-h-[40px] px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
        >
          Essential Only
        </button>
      </div>
    </div>
  );
}
