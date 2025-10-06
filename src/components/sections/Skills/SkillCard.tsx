// C:\LF\luiz-felipe-portfolio\src\components\sections\Skills\SkillCard.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import * as LucideIcons from 'lucide-react';

type IconName = keyof typeof LucideIcons;

interface SkillCardProps {
  skill: {
    name: string;
    iconName: string;
    mastery: number;
  };
}

export function SkillCard({ skill }: SkillCardProps) {
  const IconComponent = LucideIcons[skill.iconName as IconName] as LucideIcons.LucideIcon;

  return (
    <Card className="bg-muted/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">{skill.name}</CardTitle>
        {IconComponent && <IconComponent className="h-6 w-6 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{skill.mastery}%</div>
        <Progress value={skill.mastery} className="mt-2 h-2" />
      </CardContent>
    </Card>
  );
}