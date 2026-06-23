import React from 'react';
import { RoutePath } from '../types';
import { CONVERSION_TYPES } from '../data/conversions';
import { BLOG_POSTS } from '../data/blog';
import { Scroll, Award, Ruler, ExternalLink, Flame } from 'lucide-react';

interface SidebarProps {
  currentPath: RoutePath;
  onNavigate: (path: RoutePath) => void;
}

export function Sidebar({ currentPath, onNavigate }: SidebarProps) {
  // Popular conversions to list in side menu
  const quickConversions: { label: string; path: RoutePath }[] = [
    { label: 'CM to Inches (Standard)', path: '/cm-to-inches/' },
    { label: 'Inches to CM (Reverse)', path: '/inches-to-cm/' },
    { label: 'Feet to Centimeters', path: '/feet-to-cm/' },
    { label: 'Centimeters to Feet', path: '/cm-to-feet/' },
    { label: 'Meters to Feet', path: '/meters-to-feet/' },
    { label: 'Feet to Meters', path: '/feet-to-meters/' },
    { label: 'Millimeters to Inches', path: '/mm-to-inches/' },
    { label: 'Inches to Millimeters', path: '/inches-to-mm/' }
  ];

  // Specific landing values for height
  const popularHeightLandings: { label: string; path: RoutePath }[] = [
    { label: '90 cm to Inches', path: '/' },
    { label: '150 cm to Inches', path: '/150-cm-to-inches/' },
    { label: '170 cm to Inches', path: '/170-cm-to-inches/' },
    { label: '180 cm to Inches', path: '/180-cm-to-inches/' },
    { label: '200 cm to Inches', path: '/200-cm-to-inches/' },
    { label: '5 feet in CM', path: '/5-feet-in-cm/' },
    { label: '6 feet in CM', path: '/6-feet-in-cm/' }
  ];

  return (
    <aside className="w-full space-y-6" id="sidebar">
      {/* UK Average Height Reference Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border-2 border-slate-900 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-yellow-400 stroke-[2.5]" />
          <h4 className="text-[11px] font-black uppercase tracking-wider text-yellow-400 font-mono">
            Average British Height Guide
          </h4>
        </div>
        <div className="space-y-4 text-xs font-semibold">
          <p className="text-slate-300 leading-relaxed font-sans">
            The national average height for adults residing in the United Kingdom:
          </p>
          <div className="flex justify-between items-center bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <div>
              <span className="font-black block text-white text-sm">🇬🇧 UK Male Average</span>
              <span className="text-[10px] text-slate-500 font-bold">Biological males</span>
            </div>
            <div className="text-right">
              <span className="font-mono text-yellow-400 font-black block text-base leading-none">175.3 cm</span>
              <span className="text-[10px] text-slate-400 font-bold">5 feet 9 inches</span>
            </div>
          </div>
          <div className="flex justify-between items-center bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <div>
              <span className="font-black block text-white text-sm">🇬🇧 UK Female Average</span>
              <span className="text-[10px] text-slate-500 font-bold">Biological females</span>
            </div>
            <div className="text-right">
              <span className="font-mono text-yellow-400 font-black block text-base leading-none">161.6 cm</span>
              <span className="text-[10px] text-slate-400 font-bold">5 feet 3.6 inches</span>
            </div>
          </div>
          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mt-2 font-mono">
            Source: UK Office for National Statistics (ONS).
          </p>
        </div>
      </div>

      {/* Quick Nav Tools */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200">
        <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-1.5 border-b-2 border-slate-200 pb-2.5">
          <Ruler className="w-4 h-4 text-blue-600 stroke-[2.5]" />
          Related Converters
        </h4>
        <div className="grid grid-cols-1 gap-1.5">
          {quickConversions.map((conv) => (
            <button
              key={conv.path}
              onClick={() => onNavigate(conv.path)}
              className={`text-left text-xs py-2 px-3 rounded-xl transition-all cursor-pointer flex justify-between items-center font-bold ${
                currentPath === conv.path
                  ? 'bg-blue-50 text-blue-900 font-black border-l-4 border-blue-600'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent'
              }`}
            >
              <span>{conv.label}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Long-Tail Traffic Landing Links */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200">
        <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-1.5 border-b-2 border-slate-200 pb-2.5">
          <Flame className="w-4 h-4 text-orange-500 stroke-[2.5]" />
          Popular UK Search Hits
        </h4>
        <div className="flex flex-wrap gap-2">
          {popularHeightLandings.map((target, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate(target.path)}
              className={`text-[10px] uppercase font-bold tracking-wider py-1.5 px-3 rounded-lg border-2 transition-all cursor-pointer ${
                currentPath === target.path
                  ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100 font-black'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-400'
              }`}
            >
              {target.label}
            </button>
          ))}
        </div>
      </div>

      {/* Internal Blogs Widget */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200">
        <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-1.5 border-b-2 border-slate-200 pb-2.5">
          <Scroll className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
          Featured Reading
        </h4>
        <div className="space-y-4">
          {BLOG_POSTS.slice(0, 3).map((blog) => (
            <div 
              key={blog.slug} 
              onClick={() => onNavigate(`/blog/${blog.slug}/` as RoutePath)}
              className="cursor-pointer space-y-1 block group hover:bg-slate-50/80 p-2.5 -mx-2.5 rounded-xl transition-all"
            >
              <h5 className="text-xs font-black text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {blog.title}
              </h5>
              <div className="flex justify-between text-[10px] text-slate-400 font-bold font-mono uppercase tracking-wider">
                <span>{blog.category}</span>
                <span>{blog.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
