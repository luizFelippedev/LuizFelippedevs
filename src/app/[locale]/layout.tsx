import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ReactNode } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { ScrollProgress } from '@/components/common/ScrollProgress';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import '../globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export default async function LocaleLayout({ children, params: { locale } }: { children: ReactNode; params: { locale: string }; }) {
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background font-sans antialiased', inter.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ScrollProgress />
            <div className="flex min-h-screen w-full">
              <Sidebar />
              <div className="flex flex-1 flex-col pl-20 sm:pl-64">
                <Header />
                <main className="flex-1 overflow-y-auto">
                  {children}
                </main>
                <Footer />
              </div>
            </div>
            <Toaster />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}