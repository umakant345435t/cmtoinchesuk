import React from 'react';
import { RoutePath } from '../types';
import { Network, Home, Book, FileCheck, Shield, HelpCircle, Landmark } from 'lucide-react';

interface SitemapProps {
  onNavigate: (path: RoutePath) => void;
}

export function Sitemap({ onNavigate }: SitemapProps) {
  const categories = [
    {
      title: 'Main Metrological Hub & Tools',
      icon: Home,
      links: [
        { label: '🇬🇧 Homepage / Main CM to Inches Calculator', path: '/' as RoutePath },
        { label: 'Centimeters to Inches Main Portal', path: '/cm-to-inches/' as RoutePath },
        { label: 'Inches to Centimeters Reverse Portal', path: '/inches-to-cm/' as RoutePath },
        { label: 'Feet to Centimeters Height Standard', path: '/feet-to-cm/' as RoutePath },
        { label: 'Centimeters to Feet Standardizer', path: '/cm-to-feet/' as RoutePath },
        { label: 'Meters to Feet Customizer', path: '/meters-to-feet/' as RoutePath },
        { label: 'Feet to Meters Standardizer', path: '/feet-to-meters/' as RoutePath },
        { label: 'Millimeters to Inches Woodwork Standard', path: '/mm-to-inches/' as RoutePath },
        { label: 'Inches to Millimeters Woodwork Standard', path: '/inches-to-mm/' as RoutePath },
      ]
    },
    {
      title: 'Popular UK Search Matches (Long-Tail Heights)',
      icon: Landmark,
      links: [
        { label: '150 cm to Inches Height Guide', path: '/150-cm-to-inches/' as RoutePath },
        { label: '170 cm to Inches Height Guide', path: '/170-cm-to-inches/' as RoutePath },
        { label: '180 cm to Inches Height Guide', path: '/180-cm-to-inches/' as RoutePath },
        { label: '200 cm to Inches Height Guide', path: '/200-cm-to-inches/' as RoutePath },
        { label: '5 Feet in CM Height Guide', path: '/5-feet-in-cm/' as RoutePath },
        { label: '6 Feet in CM Height Guide', path: '/6-feet-in-cm/' as RoutePath },
      ]
    },
    {
      title: 'Topical Authority Knowledge Base',
      icon: Book,
      links: [
        { label: '"How many inches are in 1 cm?" Deep-Dive', path: '/blog/how-many-inches-in-1-cm/' as RoutePath },
        { label: '"CM vs Inches" System Comparison', path: '/blog/cm-vs-inches/' as RoutePath },
        { label: '"UK Height Conversion" Passport & ID Guide', path: '/blog/uk-height-conversion-guide/' as RoutePath },
        { label: '"Clothing Size Conversion" E-Commerce Guide', path: '/blog/clothing-size-conversion/' as RoutePath },
        { label: '"International Measurement Systems" Geopolitical History', path: '/blog/international-measurement-systems/' as RoutePath },
        { label: 'Main Blog Section Index', path: '/blog/' as RoutePath },
      ]
    },
    {
      title: 'Trust, E-E-A-T & Statutory Policies',
      icon: Shield,
      links: [
        { label: 'About Us & Metrological Mission', path: '/about-us/' as RoutePath },
        { label: 'Contact Us & AdSense Queries', path: '/contact-us/' as RoutePath },
        { label: 'Privacy Policy & GDPR Compliance', path: '/privacy-policy/' as RoutePath },
        { label: 'Terms and Conditions of Tool Usage', path: '/terms-and-conditions/' as RoutePath },
        { label: 'Liability Disclaimer', path: '/disclaimer/' as RoutePath },
        { label: 'Pre-Approved Cookie Policy', path: '/cookie-policy/' as RoutePath },
        { label: 'Interactive HTML Sitemap (This Page)', path: '/sitemap/' as RoutePath },
      ]
    }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 md:p-8 space-y-8" id="sitemap-page">
      <div className="border-b-2 border-slate-200 pb-5">
        <span className="text-[10px] bg-blue-100 text-blue-800 font-black px-3 py-1 rounded-lg font-mono uppercase tracking-widest">
          XML & HTML INDEX SITEMAP
        </span>
        <h2 className="text-xl md:text-2xl font-black text-slate-950 mt-3.5 flex items-center gap-2">
          <Network className="w-6 h-6 text-blue-600 stroke-[2.5]" />
          Programmatic HTML Sitemap Index
        </h2>
        <p className="text-lg text-slate-700 mt-2 leading-relaxed font-semibold">
          This page represents the comprehensive hierarchical diagram of <strong>cmtoinches.uk</strong>. Both spiders (Googlebot, Bingbot) and humans can immediately trace canonical structural boundaries and jump anywhere in one click.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div key={idx} className="bg-slate-50/60 rounded-2xl p-5 border-2 border-slate-200 space-y-4">
              <h3 className="text-sm font-black uppercase text-slate-950 tracking-wider flex items-center gap-2 border-b-2 border-slate-200 pb-2.5">
                <Icon className="w-4 h-4 text-slate-600 stroke-[2.5]" />
                {cat.title}
              </h3>
              <ul className="space-y-3">
                {cat.links.map((link, lIdx) => (
                  <li key={lIdx} className="text-sm">
                    <button
                      onClick={() => onNavigate(link.path)}
                      className="text-left py-1 text-slate-800 hover:text-blue-600 font-bold transition-all hover:underline focus:outline-none flex items-start gap-1 w-full cursor-pointer"
                    >
                      <span className="text-blue-600 font-black font-mono mt-0.5">▸</span>
                      <span>{link.label}</span>
                    </button>
                    <span className="text-[9px] text-slate-400 font-bold font-mono pl-3.5 block select-all uppercase">
                      https://cmtoinches.uk{link.path}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* SEO guidelines for search engines */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl text-xs space-y-2.5 border-2 border-slate-900">
        <h4 className="font-black flex items-center gap-1.5 text-yellow-400 font-mono">
          <FileCheck className="w-4 h-4 text-yellow-400 stroke-[2.5]" />
          CRAWLER TECHNICAL AUDIT METADATA
        </h4>
        <p className="text-slate-300 font-semibold leading-relaxed text-sm">
          This sitemap operates on clean static hashes corresponding with the live <code className="bg-slate-950 text-slate-200 px-1.5 py-1 rounded font-mono font-bold text-xs">/sitemap.xml</code> tree submitted to Google Search Console. 100% of links render instantly on the client side without broken callbacks or dynamic redirects.
        </p>
      </div>
    </div>
  );
}
