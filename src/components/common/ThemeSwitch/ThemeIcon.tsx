// src/components/common/ThemeSwitch/ThemeIcon.tsx
import { Monitor, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ThemeIconProps {
  theme: 'light' | 'dark' | 'system';
  isActive: boolean;
  size?: number;
}

export function ThemeIcon({ theme, isActive, size = 16 }: ThemeIconProps) {
  const iconClass = cn(
    "transition-colors",
    isActive ? "text-primary" : "text-muted-foreground"
  );

  const iconProps = {
    className: iconClass,
    size,
  };

  switch (theme) {
    case 'light':
      return <Sun {...iconProps} />;
    case 'dark':
      return <Moon {...iconProps} />;
    case 'system':
      return <Monitor {...iconProps} />;
    default:
      return null;
  }
}