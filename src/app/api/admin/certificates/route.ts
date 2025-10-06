import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { z } from 'zod';

// Schema de validação para criar/atualizar um certificado
const certificateSchema = z.object({
  title: z.string().min(3, 'Título é obrigatório'),
  issuer: z.string().min(2, 'Emissor é obrigatório'),
  issueDate: z.string().datetime('Data inválida'),
  credentialId: z.string().optional(),
  credentialUrl: z.string().url('URL da credencial inválida').optional().or(z.literal('')),
  imageUrl: z.string().url('URL da imagem inválida'),
  skills: z.string(), // Armazenado como "skill1,skill2,skill3"
});

// GET /api/admin/certificates -> Lista todos os certificados
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const certificates = await prisma.certificate.findMany({
    orderBy: { issueDate: 'desc' },
  });

  return NextResponse.json(certificates);
}

// POST /api/admin/certificates -> Cria um novo certificado
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  try {
    const body = await request.json();
    const validatedData = certificateSchema.parse(body);

    const newCertificate = await prisma.certificate.create({
      data: validatedData,
    });

    return NextResponse.json(newCertificate, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados inválidos', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}