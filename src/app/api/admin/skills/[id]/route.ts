import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const skillSchema = z.object({ /* ... (mesmo schema do arquivo anterior) ... */ });

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  try {
    const body = await request.json();
    const validatedData = skillSchema.parse(body);

    const updatedSkill = await prisma.skill.update({
      where: { id: params.id },
      data: validatedData,
    });
    return NextResponse.json(updatedSkill);
  } catch (error) {
    // ... tratamento de erro
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  try {
    await prisma.skill.delete({ where: { id: params.id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar habilidade' }, { status: 500 });
  }
}