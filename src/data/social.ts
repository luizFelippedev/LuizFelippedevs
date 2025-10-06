import { Github, Linkedin, Twitter, Instagram, type LucideIcon } from 'lucide-react';

export interface SocialLink {
  name: string;
  url: string;
  icon: LucideIcon;
}

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/seu-usuario', // TODO: Troque pelo seu link
    icon: Github,
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/seu-usuario', // TODO: Troque pelo seu link
    icon: Linkedin,
  },
  {
    name: 'Twitter / X',
    url: 'https://twitter.com/seu-usuario', // TODO: Troque pelo seu link
    icon: Twitter,
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/seu-usuario', // TODO: Troque pelo seu link
    icon: Instagram,
  },
];