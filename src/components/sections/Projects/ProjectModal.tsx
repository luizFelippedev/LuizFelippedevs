// C:\LF\luiz-felipe-portfolio\src\components\sections\Projects\ProjectModal.tsx
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  const tagsArray = project.tags.split(',').map(tag => tag.trim());

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl">{project.title}</DialogTitle>
          <DialogDescription>{project.description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4 md:grid-cols-5">
          <div className="md:col-span-3 space-y-4">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <Image 
                src={project.imageUrl}
                alt={`Imagem do projeto ${project.title}`}
                fill
                className="object-cover"
              />
            </div>
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.content}</ReactMarkdown>
            </div>
          </div>
          <div className="md:col-span-2 space-y-6">
            <div>
              <h4 className="font-semibold mb-2">Tecnologias</h4>
              <div className="flex flex-wrap gap-2">
                {tagsArray.map(tag => <Badge key={tag}>{tag}</Badge>)}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Links</h4>
              <div className="flex flex-col gap-2">
                {/* CORREÇÃO: Alterado de project.liveUrl para project.deployUrl */}
                {project.deployUrl && (
                  <Button asChild variant="outline">
                    <Link href={project.deployUrl} target="_blank"><ExternalLink className="mr-2 h-4 w-4" />Ver Online</Link>
                  </Button>
                )}
                {project.repoUrl && (
                  <Button asChild variant="outline">
                    <Link href={project.repoUrl} target="_blank"><Github className="mr-2 h-4 w-4" />Repositório</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}