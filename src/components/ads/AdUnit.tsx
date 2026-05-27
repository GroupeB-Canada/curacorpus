'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export type AdFormat = 'horizontal' | 'vertical' | 'square' | 'responsive';
export type AdNetwork = 'adsense' | 'carbon' | 'ethicalads' | 'custom';

export interface AdUnitProps {
  slot: string;
  format?: AdFormat;
  adSlotId?: string;
  network?: AdNetwork;
  sticky?: boolean;
  className?: string;
  forceShow?: boolean;
}

const FORMAT_SIZES: Record<AdFormat, { width: number; height: number }> = {
  horizontal: { width: 728, height: 90 },
  vertical:   { width: 160, height: 600 },
  square:     { width: 300, height: 250 },
  responsive: { width: 0,   height: 0 },
};

const EXCLUDED_PATHS = ['/login', '/signup', '/register', '/checkout', '/payment', '/admin', '/dashboard', '/api', '/auth', '/settings', '/account', '/profile/edit'];

function isExcludedPath(pathname: string): boolean {
  return EXCLUDED_PATHS.some(excluded => pathname === excluded || pathname.startsWith(excluded + '/'));
}

function EthicalAdsUnit({ placement }: { placement: string }) {
  useEffect(() => {
    if (!document.querySelector('script[src*="ethicalads"]')) {
      const script = document.createElement('script');
      script.src = 'https://media.ethicalads.io/media/client/ethicalads.min.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);
  return (
    <div
      data-ea-publisher="groupeb-ca"
      data-ea-type="text"
      data-ea-placement={placement}
      className="horizontal"
    />
  );
}

export function AdUnit({ slot, format = 'responsive', adSlotId, network = 'ethicalads', sticky = false, className = '', forceShow = false }: AdUnitProps) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const adsEnabled = process.env.NEXT_PUBLIC_ADS_ENABLED === 'true' || forceShow;
  const excluded = isExcludedPath(pathname);

  useEffect(() => {
    if (!containerRef.current || !adsEnabled || excluded) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { rootMargin: '200px' }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [adsEnabled, excluded]);

  if (!adsEnabled || excluded) return null;

  const sizes = FORMAT_SIZES[format];
  const containerStyle: React.CSSProperties = { display: 'flex', justifyContent: 'center', width: '100%', minHeight: format === 'responsive' ? '90px' : `${sizes.height}px` };

  return (
    <div ref={containerRef} className={`ad-unit ad-unit--${slot} ${className}`} style={containerStyle} data-ad-slot={slot} aria-label="Publicite">
      <div style={{ textAlign: 'center' }}>
        <span style={{ fontSize: '10px', color: '#999', textAlign: 'center', display: 'block', marginBottom: '2px' }}>Publicite</span>
        {isVisible && network === 'ethicalads' && <EthicalAdsUnit placement={slot} />}
      </div>
    </div>
  );
}

export default AdUnit;
