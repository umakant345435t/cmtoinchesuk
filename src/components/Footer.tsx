import React from 'react';
import { RoutePath } from '../types';
import { Mail, Shield, CheckCircle, Flag, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: RoutePath) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerLinks: { label: string; path: RoutePath }[] = [
    { label: 'About Us', path: '/about-us/' },
    { label: 'Contact Us', path: '/contact-us/' },
    { label: 'Privacy Policy', path: '/privacy-policy/' },
    { label: 'Terms & Conditions', path: '/terms-and-conditions/' },
    { label: 'Legal Disclaimer', path: '/disclaimer/' },
    { label: 'Cookie Policy', path: '/cookie-policy/' },
    { label: 'Unit Chart', path: '/unit-conversion-chart/' },
    { label: 'HTML Sitemap', path: '/sitemap/' }
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t-2 border-slate-900" id="footer">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 space-y-12">
        
        {/* Main grid section */}
        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Brand Identity */}
          <div className="md:col-span-5 space-y-4">
            <div 
              className="flex items-center cursor-pointer group" 
              onClick={() => onNavigate('/')}
              title="Home - CM to Inches Converter"
            >
              <img 
                src="/favicon.svg" 
                alt="CM to Inches Converter Logo" 
                className="w-11 h-11 rounded-xl shadow-md shrink-0 transition-transform group-hover:scale-105" 
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex flex-col gap-2.5 text-[11px] font-bold">
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                <span>Kensington, London, W8 4SG, United Kingdom</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Support: <a href="mailto:support@cmtoinches.uk" className="text-white hover:underline hover:text-yellow-450 transition-colors font-mono">support@cmtoinches.uk</a></span>
              </div>
            </div>
          </div>

          {/* Quick-Nav Links Matrix */}
          <div className="md:col-span-7 space-y-4">
            <div className="border-b border-slate-900 pb-2">
              <h4 className="text-yellow-400 font-black tracking-wider text-xs uppercase font-mono">
                Statutory Pages & Navigation
              </h4>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2.5">
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
                    className="text-left text-[11px] text-slate-400 hover:text-yellow-400 hover:underline transition-colors font-bold cursor-pointer focus:outline-none"
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Useful Measurement Tools & Partner Backlinks */}
        <div className="pt-6 border-t border-slate-900/80 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shrink-0"></span>
            <h4 className="text-slate-300 font-mono text-xs uppercase font-black tracking-wider">
              Recommended Unit Converters &amp; Partner Tools
            </h4>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-[11px] text-slate-400 leading-relaxed font-medium">
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-900">
              Need stone to kg or pounds? Convert body weight, luggage, fitness, and everyday measurements instantly with{' '}
              <a 
                href="https://stonetokg.uk/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-yellow-400 font-black hover:underline"
              >
                stone to kg
              </a>
              {' '}— fast, accurate, mobile-friendly, and easy to use.
            </div>

            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-900">
              Want to type faster and have a little fun while practicing?{' '}
              <a 
                href="https://poptyping.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-yellow-400 font-black hover:underline"
              >
                Popタイピング
              </a>
              {' '}is a simple typing where you can test your speed, improve your keyboard skills, and challenge yourself to get better with every try.
            </div>
          </div>
        </div>

        {/* Middle Divider */}
        <div className="h-0.5 bg-slate-900"></div>

        {/* Lower Disclaimer note */}
        <div className="space-y-4">
          <p className="text-[10px] text-slate-500 leading-relaxed text-center font-semibold">
            <strong>Liability & Accuracy Disclaimer:</strong> Every conversion computed by our tools has been extensively tested; however, discrepancies may occasionally arise. cmtoinches.uk holds zero legislative, operational, or mechanical liability for incorrect values. For medical, architectural, structural builder, or manufacturing projects, always cross check calculations against official governmental standard guides.
          </p>
          
          {/* Bottom Copyright line */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500 font-mono font-bold">
            <span>© {currentYear} cmtoinches.uk. All rights reserved. Created in alignment with UK measurement guidelines.</span>
            
            <span className="flex items-center gap-1.5 text-slate-400">
              <Shield className="w-4 h-4 text-blue-500" />
              <span>GDPR / PECR Secure Environment</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
