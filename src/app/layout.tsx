import type { Metadata } from 'next';
import { AdUnit } from '@/components/ads/AdUnit';
import './globals.css';

export const metadata: Metadata = {
  title: 'CuraCorpus',
  description: 'Plateforme santé et fitness — curacorpus.groupeb.ca',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <div className="layout-wrapper">
          <main className="main-content">
            {children}
          </main>
          <aside className="sidebar">
            <AdUnit slot="sidebar-health" network="ethicalads" />
          </aside>
        </div>
      </body>
    </html>
  );
}
