// C:\LF\luiz-felipe-portfolio\src\components\sections\Projects\ProjectFilter.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Project } from '@prisma/client';

interface ProjectCardProps {
  project: Project;
  onCardClick: () => void; // Função para abrir o modal
}

export function ProjectCard({ project, onCardClick }: ProjectCardProps) {
  const tagsArray = project.tags.split(',').map(tag => tag.trim());

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ type: 'spring' }}
      className="flex"
    >
      <Card 
        onClick={onCardClick}
        className="w-full overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-2"
      >
        <CardHeader className="p-0">
          <div className="relative w-full aspect-video">
            <Image
              src={project.imageUrl}
              alt={`Imagem do projeto ${project.title}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="mb-2 truncate">{project.title}</CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1">
            {tagsArray.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}