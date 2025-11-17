import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import sdk from '@farcaster/frame-sdk';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MarketCapOf - Farcaster Mini App',
  description: 'Calculez le prix cible d\'un token s\'il avait la marketcap d\'un autre',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
