import React from 'react';
import { RoutePath } from '../types';
import { Mail, Shield, CheckCircle, Flag, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: RoutePath) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerLinks: { label: string; path: RoutePath }[] = [
    { label: 'Home Page', path: '/' },
    { label: 'About Us', path: '/about-us/' },
    { label: 'Contact Us', path: '/contact-us/' },
    { label: 'Privacy Policy', path: '/privacy-policy/' },
    { label: 'Terms & Conditions', path: '/terms-and-conditions/' },
    { label: 'Legal Disclaimer', path: '/disclaimer/' },
    { label: 'Cookie Policy', path: '/cookie-policy/' },
    { label: 'HTML Sitemap', path: '/sitemap/' }
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t-2 border-slate-900" id="footer">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 space-y-12">
        
        {/* Main grid section */}
        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Brand Identity & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('/')}>
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center font-black text-white text-sm select-none">
                cm
              </div>
              <span className="text-xl font-black text-white font-sans tracking-tight">
                cmtoinches<span className="text-yellow-400 font-mono">.uk</span>
              </span>
            </div>
            
            <p className="text-slate-400 leading-relaxed text-[11px] font-semibold">
              A premium, fast, and SEO-optimized length metrics translation engine. We provide instant centimeters (cm), inches (in), feet (ft), meters (m), and millimeters (mm) conversions with standard accuracy checks, conversion lookup lists, and interactive simulation rulers tailored for a UK-based audience.
            </p>

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
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-yellow-400 font-black tracking-wider text-xs uppercase font-mono">
              Statutory Pages & Navigation
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {footerLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => onNavigate(link.path)}
                  className="text-left text-[11px] text-slate-400 hover:text-yellow-400 hover:underline transition-colors font-bold cursor-pointer focus:outline-none"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Compliance Card */}
          <div className="md:col-span-3 bg-slate-900/60 p-5 rounded-2xl border-2 border-slate-900/80 space-y-3.5">
            <h5 className="text-xs font-black text-white flex items-center gap-1.5 uppercase font-mono">
              <Flag className="w-4 h-4 text-red-500 stroke-[2.5]" />
              UK Compliance Badge
            </h5>
            <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
              Our calculations, guides, and articles are fully compliant with UK imperial legislation regulations, GDPR policies, and educational metrological systems.
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono font-black uppercase tracking-wider">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              SSL & AdSense Enabled
            </div>
          </div>
        </div>

        {/* Global Metrological Network & Backlinks */}
        <div className="pt-2 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs font-bold text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shrink-0"></span>
            <span className="text-slate-400 font-sans tracking-wide">Our Measurement Network:</span>
          </div>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <a 
              href="https://stonetokg.uk" 
              target="_blank" 
              className="text-slate-350 hover:text-yellow-400 transition-colors uppercase font-mono tracking-wider flex items-center gap-1 hover:underline"
            >
              <span>🇬🇧 stonetokg.uk</span>
            </a>
            <span className="text-slate-800 select-none">•</span>
            <a 
              href="https://inchesincm.de" 
              target="_blank" 
              className="text-slate-350 hover:text-yellow-400 transition-colors uppercase font-mono tracking-wider flex items-center gap-1 hover:underline"
            >
              <span>🇩🇪 inchesincm.de</span>
            </a>
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
