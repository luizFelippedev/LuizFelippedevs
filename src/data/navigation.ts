// navigation.ts

import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { Home, User, Briefcase, Mail, Award, type LucideIcon } from 'lucide-react';

// --- DETALHES DOS IDIOMAS ---
export const localeDetails = [
  { code: 'pt', name: 'Português', countryCode: 'br' },
  { code: 'en', name: 'English', countryCode: 'gb' },
  { code: 'es', name: 'Español', countryCode: 'es' },
  { code: 'fr', name: 'Français', countryCode: 'fr' },
  { code: 'de', name: 'Deutsch', countryCode: 'de' },
  { code: 'it', name: 'Italiano', countryCode: 'it' },
  { code: 'ja', name: '日本語', countryCode: 'jp' },
  { code: 'zh', name: '中文', countryCode: 'cn' },
] as const;

// Extrai apenas os códigos para a configuração do next-intl
export const locales = localeDetails.map(l => l.code);

// --- CONFIGURAÇÃO DE ROTAS ---
export const localePrefix = 'always';
export const defaultLocale = 'pt';
export type Locale = (typeof locales)[number];

// --- FERRAMENTAS DE NAVEGAÇÃO ---
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });

// --- DADOS DA NAVEGAÇÃO ---
export interface NavItem {
  href: string;
  translationKey: string;
  icon: LucideIcon;
}
export const navigationLinks: NavItem[] = [
  // ... (sua lista de links continua a mesma)
  { href: '/', translationKey: 'home', icon: Home },
  { href: '/about', translationKey: 'about', icon: User },
  { href: '/projects', translationKey: 'projects', icon: Briefcase },
  { href: '/certificates', translationKey: 'certificates', icon: Award },
  { href: '/contact', translationKey: 'contact', icon: Mail },
];