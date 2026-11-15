import React from 'react';
import { RoutePath } from '../types';
import { Network, Home, FileCheck, Shield } from 'lucide-react';

interface SitemapProps {
  onNavigate: (path: RoutePath) => void;
}

export function Sitemap({ onNavigate }: SitemapProps) {
  const categories = [
    {
      title: 'Main Metrological Hub & Tools',
      icon: Home,
      links: [
        { label: 'Homepage / Main CM to Inches Calculator', path: '/' as RoutePath },
        { label: 'Inches to Centimeters Reverse Converter', path: '/inches-to-cm/' as RoutePath },
        { label: 'Feet to Centimeters Height Converter', path: '/feet-to-cm/' as RoutePath },
        { label: 'Centimeters to Feet Converter', path: '/cm-to-feet/' as RoutePath },
        { label: 'Meters to Feet Converter', path: '/meters-to-feet/' as RoutePath },
        { label: 'Feet to Meters Converter', path: '/feet-to-meters/' as RoutePath },
        { label: 'Millimeters to Inches Woodworking Converter', path: '/mm-to-inches/' as RoutePath },
        { label: 'Inches to Millimeters Precision Converter', path: '/inches-to-mm/' as RoutePath },
        { label: 'Paper Size Converter (A4, A3, A2, A1 & A0–A15 in Inches)', path: '/paper-size-in-inches/' as RoutePath },
        { label: 'Ring, Wrist & UK Shoe Size to CM Converter', path: '/ring-shoe-size-cm/' as RoutePath },
        { label: 'Master Unit Conversion Charts (1 to 1500)', path: '/unit-conversion-chart/' as RoutePath },
      ]
    },
    {
      title: 'Trust, Editorial & Statutory Policies',
      icon: Shield,
      links: [
        { label: 'About Us & Editorial Purpose', path: '/about-us/' as RoutePath },
        { label: 'Contact Us & Support Form', path: '/contact-us/' as RoutePath },
        { label: 'Privacy Policy (UK GDPR & EU GDPR)', path: '/privacy-policy/' as RoutePath },
        { label: 'Terms and Conditions', path: '/terms-and-conditions/' as RoutePath },
        { label: 'Legal Disclaimer', path: '/disclaimer/' as RoutePath },
        { label: 'Cookie Policy (PECR & Consent)', path: '/cookie-policy/' as RoutePath },
        { label: 'HTML Sitemap (This Page)', path: '/sitemap/' as RoutePath },
      ]
    }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8 space-y-8" id="sitemap-page">
      <div className="border-b-2 border-slate-200 pb-5">
        <span className="text-xs bg-blue-100 text-blue-800 font-black px-3 py-1 rounded-lg font-mono uppercase tracking-widest">
          HTML SITEMAP INDEX
        </span>
        <h1 className="text-xl md:text-2xl font-black text-slate-950 mt-3.5 flex items-center gap-2">
          <Network className="w-6 h-6 text-blue-600 stroke-[2.5]" />
          HTML Sitemap Index
        </h1>
        <p className="text-lg text-slate-700 mt-2 leading-relaxed font-semibold">
          Browse every active calculator, reference chart, and statutory policy page on <strong>cmtoinches.uk</strong>. All URLs listed here correspond directly to our canonical XML sitemap.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div key={idx} className="bg-slate-50/60 rounded-2xl p-5 border-2 border-slate-200 space-y-4">
              <h3 className="text-base sm:text-lg font-black uppercase text-slate-950 tracking-wider flex items-center gap-2 border-b-2 border-slate-200 pb-3">
                <Icon className="w-5 h-5 text-blue-600 stroke-[2.5] shrink-0" />
                {cat.title}
              </h3>
              <ul className="space-y-3.5">
                {cat.links.map((link, lIdx) => (
                  <li key={lIdx} className="text-base">
                    <a
                      href={link.path}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(link.path);
                      }}
                      className="text-left py-1 text-slate-800 hover:text-blue-600 font-bold text-base sm:text-[17px] transition-all hover:underline focus:outline-none flex items-start gap-2 w-full cursor-pointer"
                    >
                      <span className="text-blue-600 font-black font-mono mt-0.5">▸</span>
                      <span>{link.label}</span>
                    </a>
                    <span className="text-xs text-slate-500 font-bold font-mono pl-4 block select-all">
                      https://www.cmtoinches.uk{link.path}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-3 border-2 border-slate-900">
        <h4 className="text-base font-black flex items-center gap-2 text-yellow-400 font-mono">
          <FileCheck className="w-5 h-5 text-yellow-400 stroke-[2.5]" />
          CANONICAL INDEXING STRUCTURE
        </h4>
        <p className="text-slate-200 font-medium leading-relaxed text-base">
          This HTML sitemap mirrors our live <code className="bg-slate-950 text-slate-200 px-2 py-1 rounded font-mono font-bold text-sm">/sitemap.xml</code> index. Only high-utility converter tools, reference charts, and compliance documents are indexed.
        </p>
      </div>
    </div>
  );
}
