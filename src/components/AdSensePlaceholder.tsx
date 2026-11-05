import React from 'react';

interface AdSenseProps {
  slotId?: string;
  type?: 'header-leaderboard' | 'in-feed-horizontal' | 'sidebar-square' | 'footer-banner';
  className?: string;
}

/**
 * AdSense Auto Ads (`ca-pub-1551468689257640`) is managed globally via index.html.
 * Do NOT render unverified placeholder slot IDs (e.g. "1002", "1003") or trigger manual
 * `adsbygoogle.push({})` on SPA route changes, as fake slot IDs and adjacent interactive
 * placements can trigger Google AdSense invalid traffic / policy flags.
 */
export function AdSensePlaceholder(_props: AdSenseProps): React.ReactElement | null {
  return null;
}
