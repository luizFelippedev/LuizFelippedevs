'use client';
import { useTranslations } from 'next-intl';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Link, usePathname, navigationLinks } from '@/data/navigation'; // Importa tudo da raiz

export function Navigation() {
  const pathname = usePathname();
  const t = useTranslations('Navigation');
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {navigationLinks.map((link) => (
          <NavigationMenuItem key={link.href}>
            <Link href={link.href} legacyBehavior passHref>
              <NavigationMenuLink active={pathname === link.href} className={cn(navigationMenuTriggerStyle(), 'bg-transparent text-foreground')}>
                {t(link.translationKey)}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}