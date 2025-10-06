// C:\LF\luiz-felipe-portfolio\src\components\sections\Skills\Skills.tsx
'use client';

import { skills } from '@/data/skills';
import { SkillCard } from './SkillCard';
import { SkillChart } from './SkillChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Skills() {
  const allSkills = Object.values(skills).flat();

  return (
    <section id="skills" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Habilidades e Competências</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
            Uma visão geral e detalhada das tecnologias com as quais trabalho.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Visão Geral de Competências</CardTitle>
            </CardHeader>
            <CardContent>
              <SkillChart />
            </CardContent>
          </Card>
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {allSkills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}