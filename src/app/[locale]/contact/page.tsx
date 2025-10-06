// src/app/[locale]/contact/page.tsx

import { Contact } from "@/components/sections/Contact";
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

// Gera metadados de SEO específicos para esta página
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Contact' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function ContactPage() {
  return (
    <div className="container mx-auto">
      {/* Reutiliza o mesmo componente da seção de contato da homepage */}
      <Contact />
    </div>
  );
}