import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reward Tracking',
  description: 'PF2e party treasure tracker',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
