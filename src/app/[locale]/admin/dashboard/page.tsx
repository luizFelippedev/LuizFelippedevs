// src/app/[locale]/admin/dashboard/page.tsx

import { Dashboard } from "@/components/admin/Dashboard";
import prisma from "@/lib/prisma";
import { subMonths, format } from 'date-fns';

export const revalidate = 0; 

// A página agora busca e processa os dados para o gráfico
export default async function DashboardPage() {
  // 1. Busca os totais, como antes
  const totalProjects = await prisma.project.count();
  const unreadMessages = await prisma.message.count({ where: { read: false } });
  const totalCertificates = await prisma.certificate.count();
  const recentMessages = await prisma.message.findMany({
    where: { read: false },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  // 2. LÓGICA AVANÇADA: Busca os dados para o gráfico
  const sixMonthsAgo = subMonths(new Date(), 5); // Pega a data de 6 meses atrás
  sixMonthsAgo.setDate(1); // Define o dia como 1 para pegar o mês inteiro

  const messagesByMonth = await prisma.message.groupBy({
    by: ['createdAt'],
    _count: {
      id: true,
    },
    where: {
      createdAt: {
        gte: sixMonthsAgo,
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  // 3. Formata os dados para o formato que o gráfico espera
  const chartData = Array.from({ length: 6 }).map((_, i) => {
    const date = subMonths(new Date(), 5 - i);
    const monthName = format(date, 'MMM'); // ex: "Jan", "Fev"
    return { name: monthName, total: 0 };
  });

  messagesByMonth.forEach(item => {
    const monthName = format(new Date(item.createdAt), 'MMM');
    const monthData = chartData.find(d => d.name === monthName);
    if (monthData) {
      monthData.total += item._count.id;
    }
  });


  return (
    <Dashboard 
      totalProjects={totalProjects}
      unreadMessages={unreadMessages}
      totalCertificates={totalCertificates}
      recentMessages={recentMessages}
      chartData={chartData} // Passa os novos dados do gráfico para o componente
    />
  );
}