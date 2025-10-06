// i18n.ts (na raiz do projeto)
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['pt', 'en', 'es', 'fr', 'de', 'it', 'ja', 'zh'];
 
export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();
 
  return {
    locale, // <-- Esta linha remove os avisos
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});