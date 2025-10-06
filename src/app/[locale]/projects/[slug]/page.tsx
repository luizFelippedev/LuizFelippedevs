import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { Projects } from '@/components/sections/Projects';
import { Suspense } from 'react';
import ProjectsLoading from './loading'; // Importa o nosso skeleton

// Gera metadados de SEO dinâmicos para esta página
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'Projects' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

// A página é 'async' para buscar dados
export default async function ProjectsPage() {
  // Busca TODOS os projetos publicados do banco de dados, ordenados pelos mais recentes
  const allPublishedProjects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    // O Suspense mostra o skeleton (loading) enquanto os dados são buscados
    <Suspense fallback={<ProjectsLoading />}>
      {/* Passamos os projetos buscados do banco para o nosso componente de UI,
        que é um Componente de Cliente e cuida de toda a interatividade (filtros, modais, etc).
      */}
      <Projects projects={allPublishedProjects} />
    </Suspense>
  );
}