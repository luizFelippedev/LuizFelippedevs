// src/data/certificates.ts

export interface Certificate {
  title: string;
  issuer: string;
  issueDate: string;
  description: string; // Descrição do que foi aprendido
  imageUrl: string;
  skills: string[];
  credentialUrl?: string;
  courseUrl?: string; // Link para a página do curso
}

export const certificates: Certificate[] = [
  {
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    issueDate: 'Fevereiro 2024',
    description: 'Valida uma compreensão fundamental da nuvem AWS, seus serviços e terminologia. Abrange conceitos de segurança, arquitetura, nuvem e faturamento.',
    imageUrl: '/images/placeholder.png', // Substitua pela imagem real
    skills: ['AWS', 'Cloud', 'DevOps', 'Segurança'],
    credentialUrl: '#',
    courseUrl: '#',
  },
  {
    title: 'Next.js 14 Foundations',
    issuer: 'Vercel Learning',
    issueDate: 'Janeiro 2024',
    description: 'Curso aprofundado sobre os fundamentos do Next.js App Router, incluindo Server Components, Server Actions, caching e estratégias de renderização.',
    imageUrl: '/images/placeholder.png', // Substitua pela imagem real
    skills: ['Next.js', 'React', 'TypeScript', 'Server Components'],
    credentialUrl: '#',
  },
  // Adicione mais certificados aqui...
];