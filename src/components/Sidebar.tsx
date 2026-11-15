import React from 'react';
import { RoutePath } from '../types';
import { Ruler } from 'lucide-react';

interface SidebarProps {
  currentPath: RoutePath;
  onNavigate: (path: RoutePath) => void;
}

export function Sidebar({ currentPath, onNavigate }: SidebarProps) {
  // Only canonical converter & chart pages in Related Converters (no programmatic number pages or footer duplicates)
  const relatedPages: { label: string; path: RoutePath }[] = [
    { label: 'CM to Inches', path: '/' },
    { label: 'Inches → CM', path: '/inches-to-cm/' },
    { label: 'Feet → CM', path: '/feet-to-cm/' },
    { label: 'CM → Feet', path: '/cm-to-feet/' },
    { label: 'Meters → Feet', path: '/meters-to-feet/' },
    { label: 'Feet → Meters', path: '/feet-to-meters/' },
    { label: 'MM → Inches', path: '/mm-to-inches/' },
    { label: 'Inches → MM', path: '/inches-to-mm/' },
    { label: 'Paper Sizes (A0–A15)', path: '/paper-size-in-inches/' },
    { label: 'Ring & Shoe Size (CM)', path: '/ring-shoe-size-cm/' },
    { label: 'Unit Chart', path: '/unit-conversion-chart/' }
  ];

  return (
    <aside className="w-full" id="related-converters">
      <svg width="0" height="0" className="hidden" aria-hidden="true">
        <defs>
          <g id="ico-ext">
            <path d="M15 3h6v6" />
            <path d="M10 14 21 3" />
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          </g>
        </defs>
      </svg>
      <nav aria-label="Related Converters" className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200">
        <h4 className="text-base sm:text-lg font-black text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-200 pb-3">
          <Ruler className="w-5 h-5 text-blue-600 stroke-[2.5]" />
          Related Converters
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {relatedPages.map((page) => (
            <a
              key={page.path}
              href={page.path}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(page.path);
              }}
              aria-current={currentPath === page.path ? 'page' : undefined}
              className={`text-left text-sm sm:text-[15px] py-2.5 px-3.5 rounded-xl transition-all cursor-pointer flex justify-between items-center font-bold ${
                currentPath === page.path
                  ? 'bg-blue-50 text-blue-900 font-black border border-blue-200'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950 border border-slate-100'
              }`}
            >
              <span>{page.label}</span>
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <use href="#ico-ext" />
              </svg>
            </a>
          ))}
        </div>
      </nav>
    </aside>
  );
}
