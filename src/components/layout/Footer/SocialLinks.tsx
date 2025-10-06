'use client';

import { socialLinks } from '@/data/social';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function SocialLinks() {
  return (
    <div className="flex items-center gap-2">
      {socialLinks.map((link) => {
        const Icon = link.icon;
        return (
          <TooltipProvider key={link.name} delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: 'ghost', size: 'icon' }),
                    'text-muted-foreground hover:text-primary'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{link.name}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{link.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </div>
  );
}