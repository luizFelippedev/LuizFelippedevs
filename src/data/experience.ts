export interface Experience {
  role: string;
  company: string;
  date: string;
  description: string;
  skills: string[];
}

export const experiences: Experience[] = [
  {
    role: 'Desenvolvedor Full Stack Sênior',
    company: 'Tech Solutions Inc.',
    date: 'Jan 2022 - Presente',
    description: 'Lidero o desenvolvimento de aplicações web de larga escala utilizando Next.js e TypeScript. Responsável pela arquitetura de microsserviços com Node.js e pela otimização de performance do banco de dados PostgreSQL.',
    skills: ['Next.js', 'TypeScript', 'Node.js', 'Docker', 'Prisma'],
  },
  {
    role: 'Engenheiro de Software Pleno',
    company: 'Inova Web Apps',
    date: 'Jun 2019 - Dez 2021',
    description: 'Desenvolvi e mantive aplicações React, focando em interfaces de usuário reativas e componentização. Integrei APIs REST e GraphQL e participei da migração para um ambiente conteinerizado com Docker.',
    skills: ['React', 'JavaScript', 'GraphQL', 'Docker'],
  },
  {
    role: 'Estagiário de Desenvolvimento Web',
    company: 'Start Code Ltda.',
    date: 'Jan 2018 - Mai 2019',
    description: 'Auxiliei no desenvolvimento de websites institucionais e e-commerces utilizando HTML, CSS e JavaScript. Obtive experiência inicial com frameworks frontend e sistemas de controle de versão (Git).',
    skills: ['HTML', 'CSS', 'JavaScript', 'Git'],
  },
];