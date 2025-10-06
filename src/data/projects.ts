export interface Project {
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
}

export const projects: Project[] = [
  {
    title: 'Portfólio 3D Interativo',
    description:
      'Meu portfólio pessoal, construído com Next.js, TypeScript e Three.js (R3F), com cena 3D interativa, animações e um painel de admin para gerenciamento de conteúdo.',
    imageUrl: '/images/placeholder.png', // <-- Mude aqui
    tags: ['Next.js', 'Three.js', 'TypeScript', 'Tailwind CSS'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Plataforma de E-commerce "Tech Shop"',
    description:
      'Solução completa de e-commerce com carrinho, checkout, autenticação e painel de gerenciamento de produtos, usando uma arquitetura robusta e escalável.',
    imageUrl: '/images/placeholder.png', // <-- Mude aqui
    tags: ['React', 'Node.js', 'PostgreSQL', 'Prisma'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Visualizador de Dados Financeiros',
    description:
      'Aplicação que consome APIs de mercado para exibir gráficos e dados financeiros em tempo real, com foco em performance e visualização intuitiva.',
   imageUrl: '/images/placeholder.png', // <-- Mude aqui
    tags: ['React', 'TypeScript', 'API'],
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Clone do Notion com IA',
    description:
      'Editor de texto colaborativo em tempo real inspirado no Notion, com funcionalidades de IA para sumarização e geração de conteúdo, utilizando WebSockets e GPT API.',
    imageUrl: '/images/placeholder.png', // <-- Mude aqui
    tags: ['Next.js', 'TypeScript', 'IA'],
    repoUrl: '#',
  },
];