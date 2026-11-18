import React, { useState } from 'react';
import { RoutePath } from '../types';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  currentPath: RoutePath;
  onNavigate: (path: RoutePath) => void;
}

export function Navigation({ currentPath, onNavigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Desktop Header Links: ONLY these 7 items as requested
  const desktopHeaderLinks: { label: string; path: RoutePath; iconId: string }[] = [
    { label: 'CM to Inches', path: '/', iconId: 'ico-hm' },
    { label: 'Inches → CM', path: '/inches-to-cm/', iconId: 'ico-cmp' },
    { label: 'Feet → CM', path: '/feet-to-cm/', iconId: 'ico-cmp' },
    { label: 'CM → Feet', path: '/cm-to-feet/', iconId: 'ico-cmp' },
    { label: 'Meters → Feet', path: '/meters-to-feet/', iconId: 'ico-rlr' },
    { label: 'MM → Inches', path: '/mm-to-inches/', iconId: 'ico-rlr' },
    { label: 'Unit Chart', path: '/unit-conversion-chart/', iconId: 'ico-cmp' }
  ];

  // Hamburger Menu Links: Only core linear converters & Unit Chart
  const allSitePages: { label: string; path: RoutePath }[] = [
    { label: 'CM to Inches', path: '/' },
    { label: 'Inches → CM', path: '/inches-to-cm/' },
    { label: 'Feet → CM', path: '/feet-to-cm/' },
    { label: 'CM → Feet', path: '/cm-to-feet/' },
    { label: 'Meters → Feet', path: '/meters-to-feet/' },
    { label: 'Feet → Meters', path: '/feet-to-meters/' },
    { label: 'MM → Inches', path: '/mm-to-inches/' },
    { label: 'Inches → MM', path: '/inches-to-mm/' },
    { label: 'Unit Chart', path: '/unit-conversion-chart/' }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: RoutePath) => {
    e.preventDefault();
    onNavigate(path);
    setIsOpen(false);
  };

  return (
    <header className="w-full bg-white text-slate-950 border-b border-slate-200 shadow-xs" id="header-navigation">
      <svg width="0" height="0" className="hidden" aria-hidden="true">
        <defs>
          <g id="ico-hm">
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </g>
          <g id="ico-cmp">
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
          </g>
          <g id="ico-rlr">
            <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" />
            <path d="m14.5 12.5 2-2" />
            <path d="m11.5 9.5 2-2" />
            <path d="m8.5 6.5 2-2" />
            <path d="m17.5 15.5 2-2" />
          </g>
        </defs>
      </svg>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-2 flex flex-col gap-1.5">
        {/* Top Row: Brand Logo (SVG only, aligned with Footer logo), Desktop Header Links (single line) & Mobile Hamburger Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
          <div className="flex items-center justify-between w-full lg:w-auto shrink-0">
            {/* Brand Identity with Blue-600 High Contrast SVG Logo ONLY (no text beside it) */}
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="cursor-pointer flex items-center group focus:outline-none shrink-0"
              title="Home - CM to Inches Converter"
            >
              <svg
                id="brand-cm-logo"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 128 128"
                width="44"
                height="44"
                role="img"
                aria-label="CM to Inches Converter Logo"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl shadow-md shrink-0 transition-transform group-hover:scale-105"
              >
                <g id="brand-cm-mark">
                  <rect width="128" height="128" rx="28" fill="#2563eb" />
                  <path d="M24 40 H104 M24 88 H104" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
                  <path d="M34 40 V50 M44 40 V46 M54 40 V46 M64 40 V54 M74 40 V46 M84 40 V46 M94 40 V50" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                  <path d="M34 88 V78 M44 88 V82 M54 88 V82 M64 88 V74 M74 88 V82 M84 88 V82 M94 88 V78" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                  <text x="64" y="72" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="34" fill="#ffffff" textAnchor="middle" letterSpacing="-1">CM</text>
                </g>
              </svg>
            </a>

            {/* Responsive Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden px-3 py-2 rounded-xl border-2 border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 focus:outline-none transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
              aria-label="Toggle Menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5 text-blue-600 stroke-[2]" /> : <Menu className="w-5 h-5 stroke-[2]" />}
              <span className="text-[14.8px] font-normal">Menu</span>
            </button>
          </div>

          {/* Desktop Primary Navigation Links (7 items fixed in a single horizontal line, 14.8px unbolded) */}
          <nav aria-label="Main Navigation" className="hidden lg:flex flex-nowrap items-center gap-1 xl:gap-2 whitespace-nowrap">
            {desktopHeaderLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link.path)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-2.5 xl:px-3 py-1.5 rounded-xl text-[14.8px] font-normal transition-all duration-150 flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-100'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                  }`}
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <use href={`#${link.iconId}`} />
                  </svg>
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Mobile & Tablet Hamburger Menu (Contains ALL unique pages on the website) */}
        {isOpen && (
          <nav
            aria-label="Mobile Navigation"
            className="lg:hidden w-full bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 mt-1 space-y-3 shadow-inner"
          >
            <div className="px-1 text-[12.8px] font-normal uppercase tracking-wider text-slate-400">
              All Converters &amp; Pages
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {allSitePages.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <a
                    key={link.path}
                    href={link.path}
                    onClick={(e) => handleLinkClick(e, link.path)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-[14.8px] sm:text-[15.8px] font-normal transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-100'
                        : 'bg-white text-slate-800 border border-slate-200/80 hover:text-blue-600 hover:border-blue-300'
                    }`}
                  >
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
