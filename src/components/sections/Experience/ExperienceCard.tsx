//C:\LF\luiz-felipe-portfolio\src\components\sections\Experience\ExperienceCard.tsx
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Experience } from '@/data/experience';

export function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{experience.role}</CardTitle>
            <CardDescription>{experience.company}</CardDescription>
          </div>
          <Badge variant="outline">{experience.date}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{experience.description}</p>
        <div className="flex flex-wrap gap-2">
          {experience.skills.map((skill) => (
            <Badge key={skill} variant="secondary">{skill}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}