//C:\LF\luiz-felipe-portfolio\src\components\sections\Contact\ContactInfo.tsx
'use client';

import { useTranslations } from 'next-intl';
import { Mail, Linkedin, Github } from 'lucide-react';

export function ContactInfo() {
  const t = useTranslations('Contact');
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t('title')}</h2>
      <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
        {t('description')}
      </p>
      <div className="space-y-3 pt-4">
        <a href="mailto:seu-email@exemplo.com" className="flex items-center gap-3 hover:text-primary transition-colors">
          <Mail className="h-5 w-5" />
          <span>seu-email@exemplo.com</span>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
          <Linkedin className="h-5 w-5" />
          <span>LinkedIn</span>
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
          <Github className="h-5 w-5" />
          <span>GitHub</span>
        </a>
      </div>
    </div>
  );
}