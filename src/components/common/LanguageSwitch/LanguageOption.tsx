// src/components/common/LanguageSwitch/LanguageOption.tsx
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LanguageOptionProps {
  flag: string;
  nativeName: string;
  name: string;
  isActive: boolean;
}

export function LanguageOption({ flag, nativeName, name, isActive }: LanguageOptionProps) {
  return (
    <div className="flex items-center justify-between w-full gap-3">
      <div className="flex items-center gap-3 flex-1">
        <span className="text-2xl leading-none">{flag}</span>
        <div className="flex flex-col gap-0.5">
          <span className={cn(
            "text-sm font-medium leading-none",
            isActive && "text-primary"
          )}>
            {nativeName}
          </span>
          <span className="text-xs text-muted-foreground leading-none">
            {name}
          </span>
        </div>
      </div>
      {isActive && (
        <Check className="h-4 w-4 text-primary flex-shrink-0" />
      )}
    </div>
  );
}