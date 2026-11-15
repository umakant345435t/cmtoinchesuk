import React from 'react';
import { RoutePath } from '../types';
import { Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: RoutePath) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = 2026;

  const footerLinks: { label: string; path: RoutePath }[] = [
    { label: 'About Us', path: '/about-us/' },
    { label: 'Contact Us', path: '/contact-us/' },
    { label: 'Privacy Policy', path: '/privacy-policy/' },
    { label: 'Terms & Conditions', path: '/terms-and-conditions/' },
    { label: 'Legal Disclaimer', path: '/disclaimer/' },
    { label: 'Cookie Policy', path: '/cookie-policy/' },
    { label: 'HTML Sitemap', path: '/sitemap/' }
  ];

  const handleOpenCookieSettings = () => {
    if (typeof window !== 'undefined') {
      if (typeof window.__cmtoinchesOpenConsent === 'function') {
        window.__cmtoinchesOpenConsent();
      } else {
        window.dispatchEvent(new Event('cmtoinches-open-cookie-consent'));
      }
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 text-[14.8px] font-normal border-t-2 border-slate-900" id="footer">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 space-y-8">
        
        {/* Main grid section */}
        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Brand Identity & Transparent Digital Support */}
          <div className="md:col-span-5 space-y-4">
            <div 
              className="flex items-center cursor-pointer group" 
              onClick={() => onNavigate('/')}
              title="Home - CM to Inches Converter"
            >
              <svg
                viewBox="0 0 128 128"
                width="44"
                height="44"
                role="img"
                aria-label="CM to Inches Converter Logo"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl shadow-md shrink-0 transition-transform group-hover:scale-105"
              >
                <use href="#brand-cm-mark" />
              </svg>
            </div>

            <div className="flex flex-col gap-2.5 text-[14.8px] font-normal">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Support: <a href="mailto:support@cmtoinches.uk" className="text-white hover:underline hover:text-yellow-400 transition-colors font-mono">support@cmtoinches.uk</a></span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-1" aria-label="Official Social Channels">
              <a
                href="https://www.facebook.com/cmtoinches"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow CM to Inches on Facebook"
                title="Facebook"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white flex items-center justify-center transition-all duration-150 cursor-pointer shadow-xs group"
              >
                <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/>
                </svg>
              </a>

              <a
                href="https://uk.pinterest.com/cmtoinches/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow CM to Inches on Pinterest"
                title="Pinterest"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white flex items-center justify-center transition-all duration-150 cursor-pointer shadow-xs group"
              >
                <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2a10 10 0 0 0-3.65 19.31c-.04-.8-.07-2.05.12-2.94.18-.8 1.1-4.6 1.1-4.6s-.28-.56-.28-1.38c0-1.3.75-2.27 1.69-2.27.8 0 1.18.6 1.18 1.32 0 .8-.51 2-.78 3.1-.22.93.47 1.69 1.38 1.69 1.65 0 2.93-1.74 2.93-4.26 0-2.23-1.6-3.79-3.89-3.79-2.65 0-4.2 1.98-4.2 4.04 0 .8.31 1.66.69 2.12.08.09.09.18.07.27-.07.3-.23.95-.27 1.09-.04.18-.14.22-.33.13-1.2-.56-1.95-2.32-1.95-3.73 0-3.04 2.21-5.83 6.38-5.83 3.35 0 5.95 2.38 5.95 5.58 0 3.33-2.1 6-5.01 6-.98 0-1.9-.51-2.21-1.11l-.6 2.3c-.22.84-.81 1.89-1.2 2.52A10 10 0 1 0 12 2z"/>
                </svg>
              </a>

              <a
                href="https://www.instagram.com/cm_to_inches_converter/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow CM to Inches on Instagram"
                title="Instagram"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white flex items-center justify-center transition-all duration-150 cursor-pointer shadow-xs group"
              >
                <svg className="w-4 h-4 transition-transform group-hover:scale-110" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="2.2" />
                  <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
                  <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick-Nav Links Matrix */}
          <div className="md:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2.5">
              {footerLinks.map((link) => {
                const isHome = link.path === '/';
                const href = isHome ? 'https://www.cmtoinches.uk/' : link.path;
                return (
                  <a
                    key={link.path}
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(link.path);
                    }}
                    className="text-left text-[14.8px] sm:text-[15.8px] py-1 text-slate-200 hover:text-yellow-400 hover:underline transition-colors font-normal cursor-pointer focus:outline-none"
                  >
                    {link.label}
                  </a>
                );
              })}
              <button
                type="button"
                onClick={handleOpenCookieSettings}
                className="text-left text-[14.8px] sm:text-[15.8px] py-1 text-slate-200 hover:text-yellow-400 hover:underline transition-colors font-normal cursor-pointer focus:outline-none"
              >
                Cookie Settings
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright line */}
        <div className="pt-5 border-t border-slate-800 text-center sm:text-left text-[14.8px] text-slate-400 font-normal">
          <span>© {currentYear} cmtoinches.uk. All rights reserved.</span>
        </div>

      </div>
    </footer>
  );
}
