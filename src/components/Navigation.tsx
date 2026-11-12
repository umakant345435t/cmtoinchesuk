import React, { useState } from 'react';
import { RoutePath } from '../types';
import { Home, Compass, Menu, X, Ruler } from 'lucide-react';

interface NavigationProps {
  currentPath: RoutePath;
  onNavigate: (path: RoutePath) => void;
}

export function Navigation({ currentPath, onNavigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Desktop Header Links: ONLY these 7 items as requested
  const desktopHeaderLinks: { label: string; path: RoutePath; icon?: any }[] = [
    { label: 'CM to Inches', path: '/', icon: Home },
    { label: 'Inches → CM', path: '/inches-to-cm/', icon: Compass },
    { label: 'Feet → CM', path: '/feet-to-cm/', icon: Compass },
    { label: 'CM → Feet', path: '/cm-to-feet/', icon: Compass },
    { label: 'Meters → Feet', path: '/meters-to-feet/', icon: Ruler },
    { label: 'MM → Inches', path: '/mm-to-inches/', icon: Ruler },
    { label: 'Unit Chart', path: '/unit-conversion-chart/', icon: Compass }
  ];

  // Hamburger Menu Links: All converter & chart pages (no duplicate footer legal pages)
  const allSitePages: { label: string; path: RoutePath }[] = [
    { label: 'CM to Inches', path: '/' },
    { label: 'Inches → CM', path: '/inches-to-cm/' },
    { label: 'Feet → CM', path: '/feet-to-cm/' },
    { label: 'CM → Feet', path: '/cm-to-feet/' },
    { label: 'Meters → Feet', path: '/meters-to-feet/' },
    { label: 'Feet → Meters', path: '/feet-to-meters/' },
    { label: 'MM → Inches', path: '/mm-to-inches/' },
    { label: 'Inches → MM', path: '/inches-to-mm/' },
    { label: 'Unit Chart', path: '/unit-conversion-chart/' },
    { label: '90 CM in Inches', path: '/90-cm-to-inches/' },
    { label: '150 CM in Inches', path: '/150-cm-to-inches/' },
    { label: '170 CM in Inches', path: '/170-cm-to-inches/' },
    { label: '180 CM in Inches', path: '/180-cm-to-inches/' },
    { label: '200 CM in Inches', path: '/200-cm-to-inches/' },
    { label: '5 Feet in CM', path: '/5-feet-in-cm/' },
    { label: '6 Feet in CM', path: '/6-feet-in-cm/' }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: RoutePath) => {
    e.preventDefault();
    onNavigate(path);
    setIsOpen(false);
  };

  return (
    <header className="w-full bg-white text-slate-950 border-b border-slate-200 shadow-xs" id="header-navigation">
      <div className="w-full lg:w-[82%] max-w-[1050px] mx-auto px-3 sm:px-5 py-2 flex flex-col gap-1.5">
        {/* Top Row: Brand Logo (SVG only), Desktop Header Links & Mobile Hamburger Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
          <div className="flex items-center justify-between w-full lg:w-auto">
            {/* Brand Identity with Blue-600 High Contrast SVG Logo ONLY (no text beside it) */}
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="cursor-pointer flex items-center group focus:outline-none"
              title="Home - CM to Inches Converter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 128 128"
                width="44"
                height="44"
                role="img"
                aria-label="CM to Inches Converter Logo"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl shadow-md shrink-0 transition-transform group-hover:scale-105"
              >
                <rect width="128" height="128" rx="28" fill="#2563eb" />
                <path d="M24 40 H104 M24 88 H104" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.4" />
                <path d="M34 40 V50 M44 40 V46 M54 40 V46 M64 40 V54 M74 40 V46 M84 40 V46 M94 40 V50" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                <path d="M34 88 V78 M44 88 V82 M54 88 V82 M64 88 V74 M74 88 V82 M84 88 V82 M94 88 V78" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
                <text x="64" y="72" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="34" fill="#ffffff" textAnchor="middle" letterSpacing="-1">CM</text>
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

          {/* Desktop Primary Navigation Links (7 items only, 14.8px unbolded font size) */}
          <nav aria-label="Main Navigation" className="hidden lg:flex flex-wrap items-center gap-1.5 xl:gap-2">
            {desktopHeaderLinks.map((link) => {
              const isActive = currentPath === link.path;
              const Icon = link.icon;
              return (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link.path)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3 py-1.5 rounded-xl text-[14.8px] font-normal transition-all duration-150 flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-100'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4 shrink-0" />}
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
