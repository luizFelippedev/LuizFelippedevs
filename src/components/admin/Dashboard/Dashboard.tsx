// src/components/admin/Dashboard/Dashboard.tsx
'use client';

import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { StatsCards } from "./StatsCards";
import { OverviewChart } from "./Charts";
import { RecentActivity } from "./RecentActivity";
import type { Message } from "@prisma/client";

// Tipagem para as props foi atualizada
interface DashboardProps {
  totalProjects: number;
  unreadMessages: number;
  totalCertificates: number;
  recentMessages: Message[];
  chartData: { name: string; total: number }[]; // <-- Nova prop
}

export function Dashboard({ 
  totalProjects, 
  unreadMessages, 
  totalCertificates, 
  recentMessages,
  chartData, // <-- Recebe os dados
}: DashboardProps) {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      
      <StatsCards 
        totalProjects={totalProjects} 
        unreadMessages={unreadMessages} 
        totalCertificates={totalCertificates} 
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Visão Geral de Mensagens</CardTitle>
            <CardDescription>
              Mensagens recebidas nos últimos 6 meses.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Suspense fallback={<Skeleton className="w-full h-[350px]" />}>
              <OverviewChart data={chartData} /> {/* <-- Passa os dados para o gráfico */}
            </Suspense>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Mensagens Recentes</CardTitle>
            <CardDescription>
              Você tem {unreadMessages} mensagens não lidas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity messages={recentMessages} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}