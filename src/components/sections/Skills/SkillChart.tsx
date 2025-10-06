// C:\LF\luiz-felipe-portfolio\src\components\sections\Skills\SkillChart.tsx
'use client';

import { skills } from '@/data/skills';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

// Calcula a média de maestria para cada categoria
const chartData = Object.entries(skills).map(([category, skillList]) => {
  const averageMastery =
    skillList.reduce((acc, skill) => acc + skill.mastery, 0) / skillList.length;
  return {
    subject: category.charAt(0).toUpperCase() + category.slice(1), // Capitaliza a categoria
    A: averageMastery,
    fullMark: 100,
  };
});

export function SkillChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
        <PolarGrid stroke="hsl(var(--border))" />
        <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--foreground))' }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
        <Radar
          name="Maestria Média"
          dataKey="A"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.6}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            border: '1px solid hsl(var(--border))',
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}