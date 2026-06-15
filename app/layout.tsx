import type { Metadata } from 'next';

import './globals.css';
import { SiteFooter } from './components/layout/SiteFooter';
import { SiteHeader } from './components/layout/SiteHeader';
import { AppProviders } from './components/providers/AppProviders';

export const metadata: Metadata = {
  title: 'Amigo Secreto',
  description: 'Sistema de sorteio de amigo secreto',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="grid min-h-dvh grid-rows-[auto_1fr_auto] bg-gray-950 text-gray-100">
        <AppProviders>
          <SiteHeader />
          <main className="min-h-0">{children}</main>
          <SiteFooter />
        </AppProviders>
      </body>
    </html>
  );
}
