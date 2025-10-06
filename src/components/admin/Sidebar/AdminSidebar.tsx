import {
  Home,
  Briefcase,
  Award,
  MessageSquare,
  BarChart,
  Settings,
  Code,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { SidebarNav, NavItem } from './SidebarNav';

// Estrutura de dados para os links da sidebar do admin.
// Dividido em seções para melhor organização.
const mainNav: NavItem[] = [
  { title: 'Dashboard', href: '/admin/dashboard', icon: Home },
  { title: 'Projetos', href: '/admin/projects', icon: Briefcase },
  { title: 'Certificados', href: '/admin/certificates', icon: Award },
  { title: 'Mensagens', href: '/admin/messages', icon: MessageSquare, label: '3' },
];

const analyticsNav: NavItem[] = [
  { title: 'Analytics', href: '/admin/analytics', icon: BarChart },
  { title: 'Usuários', href: '/admin/users', icon: Users },
];

interface AdminSidebarProps {
  isCollapsed?: boolean;
}

/**
 * O componente container para a sidebar do admin.
 * - Define a estrutura visual completa.
 * - Gerencia e passa os dados de navegação para o SidebarNav.
 * - Se adapta visualmente com base na prop 'isCollapsed'.
 */
export function AdminSidebar({ isCollapsed = false }: AdminSidebarProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex h-full flex-col gap-4 py-2 bg-background"
    >
      {/* Cabeçalho da Sidebar com o Logo */}
      <div className="flex items-center justify-center h-14 border-b">
        <Link href="/admin/dashboard" className="flex items-center justify-center gap-2 font-semibold">
          <Code className="h-6 w-6 transition-all group-data-[collapsed=true]:h-8 group-data-[collapsed=true]:w-8" />
          <div className="group-data-[collapsed=true]:hidden">
            <span className="">Admin</span>
          </div>
        </Link>
      </div>
      
      {/* Navegação Principal */}
      <div className="flex-1 overflow-y-auto">
        <SidebarNav isCollapsed={isCollapsed} links={mainNav} />
      </div>

      <Separator />

      {/* Seção Secundária (Analytics) */}
      <div className="overflow-y-auto">
        <SidebarNav isCollapsed={isCollapsed} links={analyticsNav} />
      </div>

      {/* Rodapé da Sidebar com Configurações */}
      <div className="mt-auto">
        <Separator />
        <div className="p-2">
          <SidebarNav
            isCollapsed={isCollapsed}
            links={[
              { title: 'Configurações', href: '/admin/settings', icon: Settings },
            ]}
          />
        </div>
      </div>
    </div>
  );
}