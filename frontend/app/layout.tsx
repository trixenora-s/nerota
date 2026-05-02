'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 pt-20 pb-32">
            <SessionProvider>{children}</SessionProvider>
          </main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}