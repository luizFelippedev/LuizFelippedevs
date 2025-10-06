// C:\LF\luiz-felipe-portfolio\src\components\sections\Projects\Projects.tsx
'use client';

import { useState, useMemo } from 'react';
import type { Project } from '@prisma/client';
import { ProjectCard } from './ProjectCard';
import { ProjectFilter } from './ProjectFilter';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function Projects({ projects }: { projects: Project[] }) {
  const t = useTranslations('Projects');
  
  // CORREÇÃO: Inicializa o estado diretamente com o valor traduzido.
  const [activeTag, setActiveTag] = useState(t('filterAll'));

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((project) => {
      project.tags.split(',').forEach((tag) => {
        if (tag.trim()) tags.add(tag.trim());
      });
    });
    return Array.from(tags).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    // A comparação agora usa o valor traduzido de "Todos".
    if (activeTag === t('filterAll')) return projects;
    return projects.filter((project) => 
      project.tags.split(',').map(t => t.trim()).includes(activeTag)
    );
  }, [activeTag, projects, t]);

  return (
    <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t('title')}</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
            {t('description')}
          </p>
        </div>
        
        <ProjectFilter
          tags={allTags}
          activeTag={activeTag}
          onTagChange={setActiveTag}
        />
        
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onCardClick={function (): void {
                throw new Error('Function not implemented.');
              } } />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}