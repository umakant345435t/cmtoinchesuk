import React from 'react';
import { RoutePath } from '../types';
import { Ruler, ExternalLink } from 'lucide-react';

interface SidebarProps {
  currentPath: RoutePath;
  onNavigate: (path: RoutePath) => void;
}

export function Sidebar({ currentPath, onNavigate }: SidebarProps) {
  // Only converter & chart pages in Related Converters (no duplicate footer legal/info pages)
  const relatedPages: { label: string; path: RoutePath }[] = [
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

  return (
    <aside className="w-full" id="related-converters">
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
              <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" />
            </a>
          ))}
        </div>
      </nav>
    </aside>
  );
}
