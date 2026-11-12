import React from 'react';
import { RoutePath } from '../types';
import { Mail, MapPin } from 'lucide-react';

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

  return (
    <footer className="bg-slate-950 text-slate-300 text-[14.8px] font-normal border-t-2 border-slate-900" id="footer">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 space-y-8">
        
        {/* Main grid section */}
        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Brand Identity */}
          <div className="md:col-span-5 space-y-4">
            <div 
              className="flex items-center cursor-pointer group" 
              onClick={() => onNavigate('/')}
              title="Home - CM to Inches Converter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 128 128"
                width="44"
                height="44"
                role="img"
                aria-label="CM to Inches Converter Logo"
                className="w-11 h-11 rounded-xl shadow-md shrink-0 transition-transform group-hover:scale-105"
              >
                <rect width="128" height="128" rx="28" fill="#2563eb" />
                <path d="M24 40 H104 M24 88 H104" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
                <path d="M34 40 V50 M44 40 V46 M54 40 V46 M64 40 V54 M74 40 V46 M84 40 V46 M94 40 V50" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                <path d="M34 88 V78 M44 88 V82 M54 88 V82 M64 88 V74 M74 88 V82 M84 88 V82 M94 88 V78" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                <text x="64" y="72" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="34" fill="#ffffff" textAnchor="middle" letterSpacing="-1">CM</text>
              </svg>
            </div>

            <div className="flex flex-col gap-2.5 text-[14.8px] font-normal">
              <div className="flex items-center gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Kensington, London, W8 4SG, United Kingdom</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Support: <a href="mailto:support@cmtoinches.uk" className="text-white hover:underline hover:text-yellow-400 transition-colors font-mono">support@cmtoinches.uk</a></span>
              </div>
            </div>

            {/* Social Media Links: Left Side (Facebook, Pinterest in middle, Instagram last) */}
            <div className="flex items-center gap-3 pt-1" aria-label="Official Social Channels">
              {/* 1. Facebook */}
              <a
                href="https://www.facebook.com/cmtoinches"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow CM to Inches on Facebook"
                title="Facebook"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white flex items-center justify-center transition-all duration-150 cursor-pointer shadow-xs group"
              >
                <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* 2. Pinterest */}
              <a
                href="https://uk.pinterest.com/cmtoinches/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow CM to Inches on Pinterest"
                title="Pinterest"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white flex items-center justify-center transition-all duration-150 cursor-pointer shadow-xs group"
              >
                <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0a12 12 0 0 0-4.37 23.18c-.04-.98-.07-2.48.15-3.55.2-.97 1.3-5.5 1.3-5.5s-.33-.67-.33-1.65c0-1.55.9-2.7 2.02-2.7.95 0 1.41.71 1.41 1.57 0 .96-.61 2.39-.93 3.71-.27 1.11.56 2.02 1.65 2.02 1.98 0 3.5-2.09 3.5-5.1 0-2.67-1.92-4.54-4.66-4.54-3.17 0-5.03 2.38-5.03 4.84 0 .96.37 1.99.83 2.54.09.11.1.21.08.32-.09.36-.28 1.15-.32 1.32-.05.21-.17.26-.39.16-1.44-.67-2.34-2.78-2.34-4.47 0-3.64 2.65-6.99 7.64-6.99 4.01 0 7.13 2.86 7.13 6.68 0 3.99-2.51 7.2-6 7.2-1.17 0-2.27-.61-2.65-1.33l-.72 2.75c-.26 1-.96 2.26-1.43 3.02A12 12 0 1 0 12 0z"/>
                </svg>
              </a>

              {/* 3. Instagram */}
              <a
                href="https://www.instagram.com/cm_to_inches_converter/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow CM to Inches on Instagram"
                title="Instagram"
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white flex items-center justify-center transition-all duration-150 cursor-pointer shadow-xs group"
              >
                <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
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
