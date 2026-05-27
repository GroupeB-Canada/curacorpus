/**
 * GoogleAnalytics.tsx — GA4 + Google Search Console support
 * GroupeB.ca — JARVIS 2026-05-27
 * 
 * Usage dans layout.tsx:
 *   import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
 *   <GoogleAnalytics />
 * 
 * ENV VAR requise:
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 */

'use client';

import Script from 'next/script';

export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  
  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          // Consent Mode v2 default — attend le consentement explicite
          gtag('consent', 'default', {
            ad_storage: 'denied',
            analytics_storage: 'denied',
            ad_personalization: 'denied',
            ad_user_data: 'denied',
            wait_for_update: 500
          });
          
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
            anonymize_ip: true,
          });
          
          // Écouter le consentement GroupeB pour activer analytics
          window.addEventListener('groupeb:consent-update', function(e) {
            if (e.detail && e.detail.granted) {
              gtag('consent', 'update', {
                analytics_storage: 'granted',
              });
            }
          });
        `}
      </Script>
    </>
  );
}

export default GoogleAnalytics;
