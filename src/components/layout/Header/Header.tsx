'use client';
import { useState, useEffect } from 'react';
import { Link } from '@/data/navigation'; // Use o atalho para a raiz
import { Code } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Navigation } from './Navigation';
import { MobileMenu } from './MobileMenu';
import { ThemeSwitch } from '@/components/common/ThemeSwitch';
import { LanguageSwitch } from '@/components/common/LanguageSwitch';

export function Header() {
  const [hasScrolled, setHasScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn('sticky top-0 z-50 w-full border-b transition-all', hasScrolled ? 'border-border bg-background/80 backdrop-blur-sm' : 'border-transparent bg-transparent')}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Code className="h-6 w-6 text-primary" /><span className="hidden sm:inline-block">Luiz Felipe</span>
        </Link>
        <Navigation />
        <div className="flex items-center gap-2">
          <div className="hidden md:flex gap-2"><ThemeSwitch /><LanguageSwitch /></div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}