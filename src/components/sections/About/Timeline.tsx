// src/components/sections/About/Timeline.tsx
'use client';

import { experiences } from '@/data/experience';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export function Timeline() {
  return (
    <div className="relative mt-12">
      <h3 className="text-2xl font-bold text-center mb-8">Minha Jornada</h3>
      {/* A linha vertical da timeline */}
      <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border" />

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={exp.company} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            {/* Ponto na timeline */}
            <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary border-4 border-background transition group-hover:scale-125" />

            {/* Card de Experiência */}
            <Card className="w-full md:w-[calc(50%-2rem)]">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{exp.role}</CardTitle>
                    <CardDescription>{exp.company}</CardDescription>
                  </div>
                  <Badge variant="outline">{exp.date}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}