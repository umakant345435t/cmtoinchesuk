import React from 'react';
import { HelpCircle } from 'lucide-react';

interface AdSenseProps {
  slotId?: string;
  type?: 'header-leaderboard' | 'in-feed-horizontal' | 'sidebar-square' | 'footer-banner';
}

export function AdSensePlaceholder({ slotId = '1234567890', type = 'in-feed-horizontal' }: AdSenseProps) {
  const getLayoutClasses = () => {
    switch (type) {
      case 'header-leaderboard':
        return 'w-full min-h-[90px] md:min-h-[120px] max-w-[970px] mx-auto my-3';
      case 'sidebar-square':
        return 'w-full min-h-[250px] max-w-[336px] mx-auto my-4';
      case 'footer-banner':
        return 'w-full min-h-[90px] max-w-[728px] mx-auto my-5';
      case 'in-feed-horizontal':
      default:
        return 'w-full min-h-[100px] md:min-h-[150px] my-6';
    }
  };

  const getLabel = () => {
    switch (type) {
      case 'header-leaderboard':
        return 'UK AdSense Premium Leaderboard (970x90 or 728x90)';
      case 'sidebar-square':
        return 'High-CPM Sidebar Ad (300x250 or 336x280)';
      case 'footer-banner':
        return 'Footer Sticky Advertiser Unit (728x90)';
      case 'in-feed-horizontal':
      default:
        return 'In-Feed Recommended Overlay (Responsive Banner)';
    }
  };

  return (
    <div className={`${getLayoutClasses()} bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-2xl p-4 flex flex-col justify-between overflow-hidden relative group transition-colors hover:border-blue-400`}>
      <div className="absolute top-0 right-0 bg-blue-600 text-white text-[8px] px-2.5 py-1 rounded-bl-xl font-black uppercase tracking-widest leading-none">
        Advert
      </div>
      
      <div className="flex gap-2 items-start mt-1">
        <div className="bg-blue-600 text-white px-1.5 py-0.5 rounded-lg select-none">
          <span className="text-[10px] font-black font-mono">AD</span>
        </div>
        <div>
          <h4 className="text-xs font-black text-slate-800 tracking-tight">{getLabel()}</h4>
          <p className="text-[9px] text-slate-400 font-bold font-mono uppercase tracking-wider">Slot ID: ca-pub-XXXXXX / slot-{slotId}</p>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
        <span className="flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5 text-slate-350" />
          <span>SEO and UX Safe placement</span>
        </span>
        <span className="font-mono text-slate-400">Google AdSense Certified</span>
      </div>
    </div>
  );
}
