// C:\LF\luiz-felipe-portfolio\src\components\sections\Projects\ProjectFilter.tsx
'use client';

import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

interface ProjectFilterProps {
  tags: string[];
  activeTag: string;
  onTagChange: (tag: string) => void;
}

export function ProjectFilter({ tags, activeTag, onTagChange }: ProjectFilterProps) {
  const t = useTranslations('Projects');
  const allTags = [t('filterAll'), ...tags];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
      {allTags.map((tag) => (
        <Button
          key={tag}
          variant={activeTag === tag ? 'default' : 'outline'}
          onClick={() => onTagChange(tag)}
          className="rounded-full transition-all"
        >
          {tag}
        </Button>
      ))}
    </div>
  );
}