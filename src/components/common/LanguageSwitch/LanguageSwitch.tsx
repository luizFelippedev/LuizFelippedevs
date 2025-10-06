// src/components/common/LanguageSwitch/LanguageSwitch.tsx
'use client';

import { Globe } from 'lucide-react';
import { useLocale } from 'next-intl';
// CORREÇÃO: Importamos o tipo 'Locale' junto com os outros membros
import { usePathname, useRouter, locales, type Locale } from '@/data/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function LanguageSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  // CORREÇÃO: A função agora espera um 'Locale' em vez de uma 'string' genérica
  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Alterar idioma</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => handleLocaleChange(loc)}
            className={locale === loc ? 'bg-accent' : ''}
          >
            {loc.toUpperCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}