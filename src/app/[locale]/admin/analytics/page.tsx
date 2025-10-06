import { Suspense } from 'react';
import prisma from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Eye, Users, MessageCircle, BarChart } from 'lucide-react';
import { AnalyticsCharts } from '@/components/admin/Analytics/AnalyticsCharts';
import { format, subDays } from 'date-fns';

export const revalidate = 60; // Revalida os dados a cada 60 segundos

// Dados de exemplo para as visualizações de página (simulando os últimos 30 dias)
const generateViewsData = () => {
  return Array.from({ length: 30 }).map((_, i) => ({
    name: format(subDays(new Date(), 29 - i), 'dd/MM'),
    views: Math.floor(Math.random() * 20) + 5, // views em milhares (k)
  }));
};

// Dados de exemplo para as páginas mais visitadas
const topPagesData = [
  { name: '/projetos', total: Math.floor(Math.random() * 500) + 100 },
  { name: '/sobre', total: Math.floor(Math.random() * 400) + 100 },
  { name: '/contato', total: Math.floor(Math.random() * 300) + 50 },
  { name: '/certificados', total: Math.floor(Math.random() * 200) + 50 },
];

export default async function AnalyticsPage() {
  // Busca dados reais do banco de dados
  const totalMessages = await prisma.message.count();
  const totalProjects = await prisma.project.count();
  
  // Prepara os dados de exemplo
  const viewsData = generateViewsData();
  const totalViews = viewsData.reduce((acc, item) => acc + item.views, 0);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Análise de Tráfego</h2>
        <div className="flex items-center space-x-2">
          {/* Futuramente, aqui poderia ter um seletor de data */}
        </div>
      </div>
      
      {/* Cards de estatísticas com uma mistura de dados reais e de exemplo */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total de Visitas</CardTitle><Eye className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{totalViews}k</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Visitantes Únicos</CardTitle><Users className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{(totalViews * 0.75).toFixed(1)}k</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total de Mensagens</CardTitle><MessageCircle className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{totalMessages}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total de Projetos</CardTitle><BarChart className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{totalProjects}</div></CardContent></Card>
      </div>

      {/* Os gráficos são carregados em um componente de cliente separado com Suspense */}
      <Suspense fallback={<Skeleton className="w-full h-[400px]" />}>
        <AnalyticsCharts viewsData={viewsData} topPagesData={topPagesData} />
      </Suspense>
    </div>
  );
}