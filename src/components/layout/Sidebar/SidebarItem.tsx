// src/components/layout/Sidebar/SidebarItem.tsx
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LucideIcon, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export interface SidebarNavItem {
  label: string;
  icon: LucideIcon;
  href?: string;
  subItems?: SidebarNavItem[];
  badge?: string | number;
}

interface SidebarItemProps {
  item: SidebarNavItem;
  isCollapsed: boolean;
  depth?: number;
}

export const SidebarItem = React.memo(function SidebarItem({
  item,
  isCollapsed,
  depth = 0,
}: SidebarItemProps) {
  const pathname = usePathname();
  const { label, icon: Icon, href, subItems, badge } = item;
  
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isActive = useMemo(() => {
    if (href && pathname === href) return true;
    if (subItems) {
      return subItems.some((sub) => sub.href && pathname.startsWith(sub.href));
    }
    return false;
  }, [pathname, href, subItems]);

  const isSubItemActive = useMemo(() => {
    if (subItems && !isActive) {
      return subItems.some((sub) => sub.href && pathname === sub.href);
    }
    return false;
  }, [pathname, subItems, isActive]);

  // Accordion com sub-itens
  if (subItems && subItems.length > 0) {
    return (
      <Accordion
        type="single"
        collapsible
        className="w-full"
        value={isAccordionOpen ? 'item-1' : ''}
        onValueChange={() => setIsAccordionOpen(!isAccordionOpen)}
      >
        <AccordionItem value="item-1" className="border-none">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  className="relative"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {/* Active indicator bar */}
                  <div
                    className={cn(
                      'absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-primary transition-all duration-300',
                      isActive || isSubItemActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                    )}
                  />
                  
                  {/* Hover glow effect */}
                  <div
                    className={cn(
                      'absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 to-transparent transition-opacity duration-300',
                      isHovered ? 'opacity-100' : 'opacity-0'
                    )}
                  />

                  <AccordionTrigger
                    className={cn(
                      'relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all duration-200 hover:text-primary hover:no-underline group',
                      (isActive || isSubItemActive) && 'bg-primary/10 text-primary font-medium',
                      isCollapsed && 'justify-center px-2',
                      depth > 0 && 'ml-2'
                    )}
                  >
                    <div className="relative">
                      <Icon 
                        className={cn(
                          'h-5 w-5 transition-all duration-300',
                          isActive && 'scale-110'
                        )} 
                      />
                      {/* Icon pulse effect */}
                      <div
                        className={cn(
                          'absolute inset-0 rounded-full bg-primary/20 blur-md transition-opacity duration-300',
                          isActive ? 'opacity-100 animate-pulse' : 'opacity-0'
                        )}
                      />
                    </div>

                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-left text-sm">{label}</span>
                        
                        {badge && (
                          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">
                            {badge}
                          </span>
                        )}

                        <ChevronDown
                          className={cn(
                            'h-4 w-4 transition-transform duration-300 ml-auto',
                            isAccordionOpen && 'rotate-180'
                          )}
                        />
                      </>
                    )}
                  </AccordionTrigger>
                </div>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right" className="flex items-center gap-2">
                  {label}
                  {badge && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">
                      {badge}
                    </span>
                  )}
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>

          <AccordionContent 
            className={cn(
              'pl-6 pr-3 pb-1',
              !isCollapsed && 'border-l-2 border-primary/20 ml-6'
            )}
          >
            <div className="flex flex-col gap-0.5 mt-1">
              {subItems.map((subItem, index) => (
                <div
                  key={subItem.label}
                  style={{
                    animation: isAccordionOpen 
                      ? `slideIn 0.2s ease-out ${index * 0.05}s both`
                      : 'none'
                  }}
                >
                  <SidebarItem 
                    item={subItem} 
                    isCollapsed={isCollapsed}
                    depth={depth + 1}
                  />
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  // Link simples
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Active indicator bar */}
            <div
              className={cn(
                'absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-primary transition-all duration-300',
                isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              )}
            />
            
            {/* Hover glow effect */}
            <div
              className={cn(
                'absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 to-transparent transition-opacity duration-300',
                isHovered ? 'opacity-100' : 'opacity-0'
              )}
            />

            {/* Scan line effect */}
            <div
              className={cn(
                'absolute inset-0 overflow-hidden rounded-lg',
                isHovered && 'block'
              )}
            >
              <div
                className={cn(
                  'absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/10 to-transparent transition-transform duration-1000',
                  isHovered && 'translate-x-full'
                )}
              />
            </div>

            <Link
              href={href || '#'}
              className={cn(
                'relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all duration-200 hover:text-primary group',
                isActive && 'bg-primary/10 text-primary font-medium shadow-lg shadow-primary/5',
                isCollapsed && 'justify-center px-2',
                depth > 0 && 'ml-2'
              )}
            >
              <div className="relative">
                <Icon 
                  className={cn(
                    'h-5 w-5 transition-all duration-300',
                    isActive && 'scale-110',
                    isHovered && !isActive && 'scale-105'
                  )} 
                />
                {/* Icon pulse effect */}
                <div
                  className={cn(
                    'absolute inset-0 rounded-full bg-primary/20 blur-md transition-opacity duration-300',
                    isActive ? 'opacity-100 animate-pulse' : 'opacity-0'
                  )}
                />
              </div>

              {!isCollapsed && (
                <>
                  <span className="text-sm transition-all duration-200 group-hover:translate-x-0.5">
                    {label}
                  </span>
                  
                  {badge && (
                    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">
                      {badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          </div>
        </TooltipTrigger>
        {isCollapsed && (
          <TooltipContent side="right" className="flex items-center gap-2">
            {label}
            {badge && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">
                {badge}
              </span>
            )}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
});
