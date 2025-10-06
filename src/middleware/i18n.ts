// i18n.ts (na raiz do projeto)

import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// 1. Constantes para o middleware
export const locales = ['pt', 'en', 'es', 'fr', 'de', 'it', 'ja', 'zh'];
export const defaultLocale = 'pt';
export const localePrefix = 'always'; // Isso garante que o locale sempre apareça na URL

// 2. Lógica para carregar as traduções para as páginas
export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});