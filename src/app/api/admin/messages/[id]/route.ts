import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { z } from 'zod';

// Schema de validação para a atualização de uma mensagem
const updateMessageSchema = z.object({
  read: z.boolean(),
});

/**
 * Handler para GET /api/admin/messages/[id]
 * Busca uma mensagem específica pelo ID e, como efeito colateral, a marca como lida.
 */
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const message = await prisma.message.update({
      where: { id: params.id },
      data: { read: true }, // Marca como lida automaticamente ao ser visualizada
    });
    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json({ error: 'Mensagem não encontrada' }, { status: 404 });
  }
}

/**
 * Handler para PUT /api/admin/messages/[id]
 * Atualiza o status de uma mensagem (ex: marcar como não lida).
 */
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { read } = updateMessageSchema.parse(body); // Valida o corpo da requisição

    const updatedMessage = await prisma.message.update({
      where: { id: params.id },
      data: { read },
    });
    return NextResponse.json(updatedMessage);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Dados inválidos', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Erro ao atualizar mensagem' }, { status: 500 });
  }
}

/**
 * Handler para DELETE /api/admin/messages/[id]
 * Deleta uma mensagem específica.
 */
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    await prisma.message.delete({
      where: { id: params.id },
    });
    // Retorna uma resposta de sucesso sem conteúdo
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar mensagem' }, { status: 500 });
  }
}