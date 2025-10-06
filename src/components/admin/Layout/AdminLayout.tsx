// src/components/admin/Layout/AdminLayout.tsx

'use client';

import React, { useState } from 'react';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from '../Sidebar/AdminSidebar'; // Supondo que você terá este componente
import { cn } from '@/lib/utils';

// Este componente é o "invólucro" de todas as páginas do painel administrativo.
// Ele controla o estado da sidebar (aberta ou fechada) e organiza a estrutura.
export function AdminLayout({ children }: { children: React.ReactNode }) {
  // Estado para controlar se a sidebar está recolhida ou expandida
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Função para alternar o estado da sidebar, passada para o Header
  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* A Sidebar é renderizada aqui, mas apenas para telas grandes (sm e acima) */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 hidden h-full border-r bg-background transition-all duration-300 ease-in-out sm:flex',
          isSidebarCollapsed ? 'w-14' : 'w-64'
        )}
      >
        <AdminSidebar isCollapsed={isSidebarCollapsed} />
      </aside>

      {/* Conteúdo Principal (inclui o Header e a página atual) */}
      <div
        className={cn(
          'flex flex-col sm:gap-4 sm:py-4 transition-all duration-300 ease-in-out',
          // Ajusta a margem esquerda com base no estado da sidebar
          isSidebarCollapsed ? 'sm:pl-14' : 'sm:pl-64'
        )}
      >
        <AdminHeader toggleSidebar={toggleSidebar} />

        {/* O 'children' aqui é o conteúdo da sua página (ex: page.tsx do dashboard) */}
        <main className="flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}