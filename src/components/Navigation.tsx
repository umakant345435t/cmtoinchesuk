import React, { useState } from 'react';
import { RoutePath } from '../types';
import { HelpCircle, RefreshCw, Home, Compass, BookOpen, Link, FileText, Menu, X } from 'lucide-react';

interface NavigationProps {
  currentPath: RoutePath;
  onNavigate: (path: RoutePath) => void;
}

export function Navigation({ currentPath, onNavigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const mainLinks: { label: string; path: RoutePath; icon?: any }[] = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'CM → Inches', path: '/cm-to-inches/', icon: Compass },
    { label: 'Inches → CM', path: '/inches-to-cm/', icon: Compass },
    { label: 'Feet → CM', path: '/feet-to-cm/', icon: Compass },
    { label: 'Blog Articles', path: '/blog/', icon: BookOpen },
    { label: 'Sitemap', path: '/sitemap/', icon: FileText }
  ];


  return (
    <header className="w-full bg-white text-slate-950 border-b border-slate-200 shadow-sm" id="header-navigation">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Brand Header & Toggle Row */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          {/* Brand Identity with Blue-600 High Contrast SVG Logo */}
          <div 
            onClick={() => {
              onNavigate('/');
              setIsOpen(false);
            }} 
            className="cursor-pointer flex items-center gap-3 group"
          >
            <img 
              src="/favicon.svg" 
              alt="cmtoinches.uk Logo" 
              className="w-11 h-11 rounded-xl shadow-md shrink-0 transition-transform group-hover:scale-105" 
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="text-xl font-black tracking-tight text-slate-900 flex items-center gap-0.5">
                <span>cmtoinches</span><span className="text-blue-600 font-extrabold text-xl">.uk</span>
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-sans">Measurement Metrology Portal</p>
            </div>
          </div>

          {/* Responsive Hamburger Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 rounded-xl border-2 border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100 hover:text-blue-600 focus:outline-none transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5 text-blue-600 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[2.5]" />}
            <span className="text-xs font-black uppercase tracking-wider hidden sm:inline">Menu</span>
          </button>
        </div>

        {/* Desktop Primary Navigation Links (hidden on smaller screen boundaries) */}
        <nav className="hidden lg:flex flex-wrap items-center gap-2">
          {mainLinks.map((link) => {
            const isActive = currentPath === link.path;
            const Icon = link.icon;
            return (
              <button
                key={link.path}
                onClick={() => onNavigate(link.path)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 translate-y-[-1px]' 
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-100/80'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile & Tablet Expandable Navigation Menu */}
        {isOpen && (
          <nav className="lg:hidden w-full bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 mt-2 space-y-2 animate-fade-in divide-y divide-slate-100 shadow-inner">
            <div className="pb-2">
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest font-mono">
                🧭 Navigational Directory
              </span>
            </div>
            <div className="space-y-1.5 pt-2">
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
                    className={`w-full text-left px-4 py-3 rounded-xl text-xs font-black transition-all flex items-center justify-between cursor-pointer ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                        : 'text-slate-700 hover:text-blue-600 hover:bg-slate-200/50'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      {Icon && <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />}
                      {link.label}
                    </span>
                    <span className="text-[10px] font-mono leading-none bg-black/10 text-slate-500 rounded px-1.5 py-1">
                      {link.path}
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
