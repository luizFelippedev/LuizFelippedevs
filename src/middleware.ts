// src/middleware.ts
import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  locales: ['pt', 'en', 'es', 'fr', 'de', 'it', 'ja', 'zh'],
  defaultLocale: 'pt'
});
 
export const config = {
  // CORREÇÃO: Este matcher é mais explícito. Ele diz para o middleware
  // rodar APENAS na raiz ('/') e em páginas com prefixo de idioma.
  // Ele vai ignorar /images, /icons, etc.
  matcher: [
    '/',
    '/(pt|en|es|fr|de|it|ja|zh)/:path*'
  ]
};