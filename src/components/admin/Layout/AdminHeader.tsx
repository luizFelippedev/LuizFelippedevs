// src/components/admin/Layout/AdminHeader.tsx

'use client';

import { Menu, Sun, Moon, User, LogOut, Settings, Bell } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { usePathname } from 'next/navigation';

// Supondo que você terá um componente de Sidebar que será usado no Sheet
import { AdminSidebar } from '../Sidebar/AdminSidebar';

// Tipos de props para o cabeçalho
interface AdminHeaderProps {
  // Callback para alternar a visibilidade da sidebar em telas maiores
  toggleSidebar: () => void;
}

// Mapeamento de rotas para títulos amigáveis
const breadcrumbTitles: { [key: string]: string } = {
  '/admin/dashboard': 'Dashboard',
  '/admin/projects': 'Projetos',
  '/admin/certificates': 'Certificados',
  '/admin/skills': 'Habilidades',
  '/admin/messages': 'Mensagens',
  '/admin/settings': 'Configurações',
};

export function AdminHeader({ toggleSidebar }: AdminHeaderProps) {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  // Função para obter o título da página atual a partir da rota
  const getCurrentPageTitle = () => {
    // Remove o locale da URL (ex: /pt/admin/dashboard -> /admin/dashboard)
    const currentPath = pathname.split('/').slice(2).join('/');
    return breadcrumbTitles[`/${currentPath}`] || 'Admin';
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      {/* Menu Hamburguer para Mobile (usa o componente Sheet do Shadcn) */}
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Abrir Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs p-0">
          {/* O conteúdo do Sheet será a sua sidebar */}
          <AdminSidebar />
        </SheetContent>
      </Sheet>

      {/* Botão para alternar a sidebar em Desktops */}
      <Button
        size="icon"
        variant="outline"
        className="hidden sm:flex"
        onClick={toggleSidebar}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Alternar Menu</span>
      </Button>

      {/* Breadcrumb / Título da Página */}
      <div className="flex-1">
        <h1 className="text-xl font-semibold">{getCurrentPageTitle()}</h1>
      </div>

      {/* Ações do lado direito */}
      <div className="flex items-center gap-4">
        {/* Botão de Tema */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Alterar tema</span>
        </Button>

        {/* Menu de Notificações (exemplo) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notificações</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Notificações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Nova mensagem recebida!</DropdownMenuItem>
            <DropdownMenuItem>Projeto X foi atualizado.</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Menu do Usuário */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
              <Avatar>
                {/* A imagem viria da sessão do usuário (NextAuth) */}
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>LF</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              {/* Esta ação chamaria a função de signOut do NextAuth */}
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}