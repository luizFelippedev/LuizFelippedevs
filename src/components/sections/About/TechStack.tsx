// C:\LF\luiz-felipe-portfolio\src\components\sections\About\TechStack.tsx
'use client';

import { skills } from '@/data/skills';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import * as LucideIcons from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type IconName = keyof typeof LucideIcons;

const fadeInAnimationVariants = {
  initial: { opacity: 0, y: 50 },
  animate: (index: number) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.05 * index, ease: 'easeInOut' },
  }),
};

const categoryTitles: { [key: string]: string } = {
  languages: 'Linguagens',
  frameworks: 'Frameworks & Bibliotecas',
  databases: 'Bancos de Dados & ORMs',
  tools: 'Ferramentas & Plataformas',
};

export function TechStack() {
  return (
    <div className="mt-16">
      <h3 className="text-3xl font-bold text-center mb-12">Minhas Ferramentas e Tecnologias</h3>
      <div className="space-y-12">
        {Object.entries(skills).map(([category, skillList]) => (
          <div key={category}>
            <h4 className="text-xl font-semibold mb-6 text-center text-primary/80">{categoryTitles[category]}</h4>
            <div className="flex flex-wrap justify-center gap-4">
              {skillList.map((skill, index) => {
                const IconComponent = LucideIcons[skill.iconName as IconName] as LucideIcon;
                if (!IconComponent) return null;
                
                return (
                  <motion.div
                    key={skill.name}
                    variants={fadeInAnimationVariants}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    custom={index}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="bg-muted p-4 rounded-lg border border-transparent transition-all hover:border-primary/50 hover:scale-105 hover:bg-accent cursor-pointer">
                            <IconComponent className="h-10 w-10 text-muted-foreground group-hover:text-foreground" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent><p>{skill.name}</p></TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}