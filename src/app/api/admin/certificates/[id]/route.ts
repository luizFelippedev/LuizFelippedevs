import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { z } from 'zod';

// Schema para atualização (pode ser o mesmo ou uma versão parcial)
const certificateSchema = z.object({
  title: z.string().min(3, 'Título é obrigatório'),
  issuer: z.string().min(2, 'Emissor é obrigatório'),
  issueDate: z.string().datetime('Data inválida'),
  credentialId: z.string().optional(),
  credentialUrl: z.string().url('URL da credencial inválida').optional().or(z.literal('')),
  imageUrl: z.string().url('URL da imagem inválida'),
  skills: z.string(),
});

// GET /api/admin/certificates/[id] -> Busca um certificado
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // ... (código para GET um item, similar ao PUT/DELETE)
}

// PUT /api/admin/certificates/[id] -> Atualiza um certificado
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  try {
    const body = await request.json();
    const validatedData = certificateSchema.parse(body);

    const updatedCertificate = await prisma.certificate.update({
      where: { id: params.id },
      data: validatedData,
    });

    return NextResponse.json(updatedCertificate);
  } catch (error) {
    // ... (tratamento de erros similar ao POST)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

// DELETE /api/admin/certificates/[id] -> Deleta um certificado
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  try {
    await prisma.certificate.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 }); // 204 No Content
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar certificado' }, { status: 500 });
  }
}