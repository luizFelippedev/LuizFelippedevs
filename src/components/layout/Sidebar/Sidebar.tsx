'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { SidebarItem, SidebarNavItem } from './SidebarItem';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Home,
  User, // Usaremos o User para 'Sobre Mim' para consistência
  Briefcase,
  Award,
  Mail,
  PanelLeftClose,
  PanelRightClose,
  Code,
  Sparkles,
} from 'lucide-react';
// CORREÇÃO: Importando o Link do nosso arquivo de navegação para suporte a i18n
import { Link } from '@/data/navigation';

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('Navigation');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Estrutura de dados para os links da sidebar
  const navigationItems: SidebarNavItem[] = [
    { label: t('home'), icon: Home, href: '/' },
    { label: t('about'), icon: User, href: '/about' },
    { label: t('projects'), icon: Briefcase, href: '/projects', badge: 8 },
    { label: t('certificates'), icon: Award, href: '/certificates' },
    { label: t('contact'), icon: Mail, href: '/contact' },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-50 hidden h-full flex-col border-r bg-background/95 backdrop-blur-xl transition-all duration-300 ease-in-out sm:flex',
        isCollapsed ? 'w-20' : 'w-64',
        mounted ? 'opacity-100' : 'opacity-0' // Animação de fade-in no carregamento
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Efeito de overlay com gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />
      
      {/* Efeito de borda animada no hover */}
      <div
        className={cn(
          'absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-primary/50 to-transparent transition-opacity duration-500',
          isHovered ? 'opacity-100' : 'opacity-0'
        )}
      />

      {/* Cabeçalho da Sidebar */}
      <div className="relative flex h-16 items-center border-b border-border/50 px-4 lg:px-6">
        <Link 
          href="/" 
          className="group flex items-center gap-2 font-semibold transition-all duration-300"
        >
          <div className="relative">
            <Code className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
          
          {!isCollapsed && (
            <div className="flex items-center gap-1 overflow-hidden">
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent transition-all duration-300 group-hover:from-primary group-hover:to-primary/70">
                Luiz Felipe
              </span>
              <Sparkles className="h-3 w-3 text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:rotate-12" />
            </div>
          )}
        </Link>
      </div>

      {/* Navegação */}
      <ScrollArea className="flex-1 relative">
        <nav className="grid items-start px-2 py-4 text-sm font-medium lg:px-4 gap-1">
          {navigationItems.map((item, index) => (
            <div
              key={item.label}
              style={{
                animation: mounted 
                  ? `slideInLeft 0.3s ease-out ${index * 0.08}s both`
                  : 'none'
              }}
            >
              <SidebarItem item={item} isCollapsed={isCollapsed} />
            </div>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </ScrollArea>

      {/* Rodapé */}
      <div className="relative mt-auto border-t border-border/50 p-4">
        <div
          className={cn(
            'absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent transition-opacity duration-500',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
        />
        <Button 
          onClick={toggleSidebar} 
          variant="outline" 
          className={cn(
            'relative w-full overflow-hidden transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 group',
            isCollapsed ? 'px-2 py-2' : 'px-3 py-2'
          )}
        >
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          <div className="relative flex items-center justify-center gap-2">
            {isCollapsed ? (
              <PanelRightClose className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            ) : (
              <>
                <PanelLeftClose className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                <span className="text-xs font-medium">Recolher</span>
              </>
            )}
          </div>
          <span className="sr-only">Recolher/Expandir Sidebar</span>
        </Button>
        {!isCollapsed && (
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <div className="relative h-2 w-2">
              <div className="h-full w-full rounded-full bg-primary animate-pulse" />
              <div className="absolute inset-0 h-full w-full rounded-full bg-primary/50 animate-ping" />
            </div>
            <span>Sistema Online</span>
          </div>
        )}
      </div>
    </aside>
  );
}