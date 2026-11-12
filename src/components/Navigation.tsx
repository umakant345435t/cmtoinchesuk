import React, { useState } from 'react';
import { RoutePath } from '../types';
import { Home, Compass, FileText, Menu, X } from 'lucide-react';

interface NavigationProps {
  currentPath: RoutePath;
  onNavigate: (path: RoutePath) => void;
}

export function Navigation({ currentPath, onNavigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const mainLinks: { label: string; path: RoutePath; icon?: any }[] = [
    { label: 'cm to inches', path: '/', icon: Home },
    { label: 'Inches → CM', path: '/inches-to-cm/', icon: Compass },
    { label: 'Feet → CM', path: '/feet-to-cm/', icon: Compass },
    { label: 'CM → Feet', path: '/cm-to-feet/', icon: Compass },
    { label: 'Unit Chart', path: '/unit-conversion-chart/', icon: Compass },
    { label: 'Sitemap', path: '/sitemap/', icon: FileText }
  ];

  return (
    <header className="w-full bg-white text-slate-950 border-b border-slate-200 shadow-sm" id="header-navigation">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 sm:py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 lg:gap-4">
        {/* Brand Header & Toggle Row */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          {/* Brand Identity with Blue-600 High Contrast SVG Logo */}
          <div 
            onClick={() => {
              onNavigate('/');
              setIsOpen(false);
            }} 
            className="cursor-pointer flex items-center group"
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
          </div>

          {/* Responsive Hamburger Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden px-3.5 py-2.5 rounded-xl border-2 border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 focus:outline-none transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5 text-blue-600 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[2.5]" />}
            <span className="text-base font-black">Menu</span>
          </button>
        </div>

        {/* Desktop Primary Navigation Links */}
        <nav className="hidden lg:flex flex-wrap items-center gap-2">
          {mainLinks.map((link) => {
            const isActive = currentPath === link.path;
            const Icon = link.icon;
            return (
              <button
                key={link.path}
                onClick={() => onNavigate(link.path)}
                className={`px-3.5 py-2 rounded-xl text-base font-bold transition-all duration-150 flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-100' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile & Tablet Expandable Navigation Menu */}
        {isOpen && (
          <nav className="lg:hidden w-full bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 mt-2 space-y-2 shadow-inner">
            <div className="space-y-1.5">
              {mainLinks.map((link) => {
                const isActive = currentPath === link.path;
                const Icon = link.icon;
                return (
                  <button
                    key={link.path}
                    onClick={() => {
                      onNavigate(link.path);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-base sm:text-lg font-black transition-all flex items-center justify-between cursor-pointer ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-100' 
                        : 'text-slate-800 hover:text-blue-600 hover:bg-slate-200/60'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {Icon && <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />}
                      {link.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
