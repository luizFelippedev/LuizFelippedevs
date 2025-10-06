'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/data/navigation'; // CORREÇÃO: Usando o Link do i18n para rotas
import { Code, Lock } from 'lucide-react';
import { SocialLinks } from './SocialLinks';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function Footer() {
  const t = useTranslations('Footer');
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-muted/40">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Coluna 1: Logo, Copyright e Ícone de Login */}
          <div className="flex flex-col items-start gap-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Code className="h-6 w-6 text-primary" />
              <span>Luiz Felipe</span>
            </Link>
            <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground">
                {t('copyright', { year })}
              </p>
              
              {/* Ícone de Login para o Admin */}
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6" asChild>
                      <Link href="/login">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                        <span className="sr-only">Admin Login</span>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t('adminLogin')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          {/* Coluna 2: Navegação Rápida */}
          <div className="space-y-2 text-sm">
            <h4 className="font-semibold mb-3">{t('navigationTitle')}</h4>
            <Link href="#about" className="block text-muted-foreground hover:text-primary">Sobre</Link>
            <Link href="#projects" className="block text-muted-foreground hover:text-primary">Projetos</Link>
            <Link href="#contact" className="block text-muted-foreground hover:text-primary">Contato</Link>
          </div>

          {/* Coluna 3: Outros Links (Exemplo) */}
          <div className="space-y-2 text-sm">
            <h4 className="font-semibold mb-3">Recursos</h4>
            <Link href="/politica-de-privacidade" className="block text-muted-foreground hover:text-primary">Política de Privacidade</Link>
            <Link href="/termos-de-uso" className="block text-muted-foreground hover:text-primary">Termos de Uso</Link>
          </div>

          {/* Coluna 4: Redes Sociais */}
          <div className="space-y-2 text-sm">
            <h4 className="font-semibold mb-3">{t('socialTitle')}</h4>
            <SocialLinks />
          </div>
        </div>
      </div>
    </footer>
  );
}