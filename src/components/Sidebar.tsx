import React from 'react';
import { RoutePath } from '../types';
import { Ruler, ExternalLink } from 'lucide-react';

interface SidebarProps {
  currentPath: RoutePath;
  onNavigate: (path: RoutePath) => void;
}

export function Sidebar({ currentPath, onNavigate }: SidebarProps) {
  // Popular conversions to list in side menu
  const quickConversions: { label: string; path: RoutePath }[] = [
    { label: 'CM to Inches (Standard)', path: '/' },
    { label: 'Inches to CM (Reverse)', path: '/inches-to-cm/' },
    { label: 'Feet to Centimeters', path: '/feet-to-cm/' },
    { label: 'Centimeters to Feet', path: '/cm-to-feet/' },
    { label: 'Meters to Feet', path: '/meters-to-feet/' },
    { label: 'Feet to Meters', path: '/feet-to-meters/' },
    { label: 'Millimeters to Inches', path: '/mm-to-inches/' },
    { label: 'Inches to Millimeters', path: '/inches-to-mm/' }
  ];

  return (
    <aside className="w-full space-y-6" id="sidebar">
      {/* Quick Nav Tools */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200">
        <h4 className="text-base sm:text-lg font-black text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-200 pb-3">
          <Ruler className="w-5 h-5 text-blue-600 stroke-[2.5]" />
          Related Converters
        </h4>
        <div className="grid grid-cols-1 gap-2">
          {quickConversions.map((conv) => (
            <button
              key={conv.path}
              onClick={() => onNavigate(conv.path)}
              className={`text-left text-base sm:text-[17px] py-2.5 px-3.5 rounded-xl transition-all cursor-pointer flex justify-between items-center font-bold ${
                currentPath === conv.path
                  ? 'bg-blue-50 text-blue-900 font-black border border-blue-200'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-slate-950 border border-transparent'
              }`}
            >
              <span>{conv.label}</span>
              <ExternalLink className="w-4 h-4 text-slate-400 shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
