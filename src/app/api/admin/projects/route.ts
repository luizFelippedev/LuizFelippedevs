import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { z } from 'zod';

// Schema de validação usando Zod. Garante que os dados que chegam na API
// tenham o formato e as regras corretas antes de irem para o banco de dados.
const projectSchema = z.object({
  title: z.string().min(3, 'O título é obrigatório e precisa de no mínimo 3 caracteres.'),
  slug: z.string().min(3, 'O slug é obrigatório').regex(/^[a-z0-9-]+$/, 'O slug só pode conter letras minúsculas, números e hifens.'),
  description: z.string().min(10, 'A descrição curta é obrigatória.'),
  content: z.string().min(50, 'O conteúdo completo é obrigatório.'),
  imageUrl: z.string().url('A URL da imagem é obrigatória e deve ser válida.'),
  deployUrl: z.string().url('A URL de deploy deve ser válida.').optional().or(z.literal('')),
  repoUrl: z.string().url('A URL do repositório deve ser válida.').optional().or(z.literal('')),
  tags: z.string(), // Para SQLite, as tags são uma string única separada por vírgulas.
  published: z.boolean().default(false),
});

/**
 * Handler para GET /api/admin/projects
 * Lista todos os projetos do banco de dados.
 * Protegido por autenticação.
 */
export async function GET() {
  // 1. Verifica se o usuário está logado
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    // Retorna 401 Unauthorized se não houver sessão válida
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    // 2. Busca os projetos no banco, ordenando pelos mais recentes
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    // 3. Retorna a lista de projetos com status 200 OK
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

/**
 * Handler para POST /api/admin/projects
 * Cria um novo projeto no banco de dados.
 * Protegido por autenticação e com validação de dados.
 */
export async function POST(request: NextRequest) {
  // 1. Verifica se o usuário está logado
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    // 2. Lê o corpo da requisição
    const body = await request.json();
    
    // 3. Valida os dados recebidos com o schema do Zod
    const validatedData = projectSchema.parse(body);

    // 4. Cria o novo projeto no banco de dados
    const newProject = await prisma.project.create({
      data: validatedData,
    });

    // 5. Retorna o projeto recém-criado com status 201 (Created)
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    // 6. Tratamento de erros
    if (error instanceof z.ZodError) {
      // Se a validação do Zod falhar, retorna um erro 400 (Bad Request)
      return NextResponse.json({ error: 'Dados inválidos', details: error.errors }, { status: 400 });
    }
    
    // Para qualquer outro erro, retorna um erro 500 (Internal Server Error)
    console.error('Erro ao criar projeto:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}