import type { Metadata } from 'next';
import './globals.css';
import TopNav from './components/TopNav';

export const metadata: Metadata = {
  title: 'Web Portfolio',
  description: 'Personal portfolio built with Next.js and Tailwind CSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
