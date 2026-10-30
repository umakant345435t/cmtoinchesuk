import React, { useEffect, useRef } from 'react';

interface AdSenseProps {
  slotId?: string;
  type?: 'header-leaderboard' | 'in-feed-horizontal' | 'sidebar-square' | 'footer-banner';
  className?: string;
}

export function AdSensePlaceholder({ slotId = '1002', type = 'in-feed-horizontal', className = '' }: AdSenseProps) {
  const adPushedRef = useRef(false);

  useEffect(() => {
    // Only attempt push once per mount to prevent duplicate push errors and invalid traffic flags
    if (adPushedRef.current) return;
    
    try {
      if (typeof window !== 'undefined') {
        const adsbygoogle = (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle;
        if (adsbygoogle) {
          adsbygoogle.push({});
          adPushedRef.current = true;
        }
      }
    } catch (_) {
      // Gracefully handle ad-blocker or script loading delays without crashing
    }
  }, []);

  const getContainerMinHeight = () => {
    switch (type) {
      case 'header-leaderboard':
        return 'min-h-[90px]';
      case 'sidebar-square':
        return 'min-h-[250px]';
      case 'footer-banner':
        return 'min-h-[90px]';
      case 'in-feed-horizontal':
      default:
        return 'min-h-[100px] sm:min-h-[120px]';
    }
  };

  return (
    <div 
      className={`w-full my-8 sm:my-10 px-2 flex flex-col items-center justify-center overflow-hidden clear-both ${getContainerMinHeight()} ${className}`}
      aria-label="Sponsored advertisement"
    >
      {/* Google AdSense Strict Policy: Clear non-deceptive label to prevent invalid clicks */}
      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center block mb-2 select-none">
        Advertisement
      </span>

      {/* Official Google Responsive Ad Unit */}
      <div className="w-full flex justify-center items-center overflow-hidden">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client="ca-pub-1551468689257640"
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}

