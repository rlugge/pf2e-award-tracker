import type { Metadata } from 'next';
import Header from '@/components/Header';
import SessionProvider from '@/components/SessionProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'PF2E Reward Tracking',
  description: 'Track party treasure progress against PF2e wealth-by-level benchmarks',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Header />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
