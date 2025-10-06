import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

// GET /api/admin/messages -> Lista todas as mensagens
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const messages = await prisma.message.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(messages);
}