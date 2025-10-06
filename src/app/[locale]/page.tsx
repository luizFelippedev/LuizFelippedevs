import { getTranslations } from 'next-intl/server';
import { Person, WithContext } from 'schema-dts';
import { Suspense } from 'react';
import prisma from '@/lib/prisma';
import type { Metadata } from 'next';

// --- Importações de todos os componentes ---
import { Scene3D } from '@/components/3d/Scene3D';
import Hero, { HeroContent } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Projects } from '@/components/sections/Projects';
import { Certificates } from '@/components/sections/Certificates';
import { Contact } from '@/components/sections/Contact';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { BackToTop } from '@/components/common/BackToTop';
import { JsonLd } from '@/components/common/SEO';
import { Skeleton } from '@/components/ui/skeleton';

// --- Metadata para SEO ---
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    metadataBase: new URL('http://localhost:3000'), // TODO: Troque para a URL de produção
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(','),
  };
}

// --- Componentes de Carregamento (Skeletons) ---
function Scene3DFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
        <p className="text-sm text-muted-foreground">Carregando experiência 3D...</p>
      </div>
    </div>
  );
}

function ProjectsSkeleton() {
  return (
    <div className="container px-4 md:px-6 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-[220px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Componente Principal da Página ---
export default async function HomePage() {
  const t = await getTranslations('Hero');

  // Busca os projetos publicados diretamente do banco de dados
  const publishedProjects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 6,
  });

  // Schema JSON-LD para SEO
  const jsonLdSchema: WithContext<Person> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Luiz Felipe',
    url: 'https://www.meu-dominio.com', // TODO: Atualizar com URL real
    jobTitle: 'Desenvolvedor Full Stack',
  };

  return (
    <>
      <JsonLd schema={jsonLdSchema} />
      
      <section 
        id="home" 
        className="relative h-screen w-full -mt-16 overflow-hidden"
        aria-label="Seção de apresentação principal"
      >
        <Hero />
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<Scene3DFallback />}>
            <Scene3D />
          </Suspense>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80 pointer-events-none z-10" />
      </section>

      <div className="relative z-20 bg-background">
        <About />
        <Skills />
        <Experience />
        <section id="projects" aria-label="Seção de projetos">
          <Suspense fallback={<ProjectsSkeleton />}>
            <Projects projects={publishedProjects} />
          </Suspense>
        </section>
        <Certificates />
        <Contact />
      </div>

      <BackToTop />
    </>
  );
}