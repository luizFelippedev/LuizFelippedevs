// src/components/layout/Header/MobileMenu.tsx
'use client';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Code } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ThemeSwitch } from '@/components/common/ThemeSwitch';
import { LanguageSwitch } from '@/components/common/LanguageSwitch';
import { Link, navigationLinks } from '@/data/navigation';

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('Navigation');

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">{t('openMenu')}</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="flex flex-col h-full">
            <div className="border-b p-4">
              <Link href="/" className="flex items-center gap-2 font-semibold" onClick={() => setIsOpen(false)}>
                <Code className="h-6 w-6 text-primary" /><span>Luiz Felipe</span>
              </Link>
            </div>
            <nav className="flex flex-col gap-2 p-4 text-lg font-medium">
              {navigationLinks.map((link) => (
                <div key={link.href} onClick={() => setIsOpen(false)}>
                  <Link href={link.href} className="flex items-center gap-4 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary">
                    <link.icon className="h-5 w-5" />
                    {t(link.translationKey)}
                  </Link>
                </div>
              ))}
            </nav>
            <div className="mt-auto flex items-center justify-center gap-4 p-4 border-t"><ThemeSwitch /><LanguageSwitch /></div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}