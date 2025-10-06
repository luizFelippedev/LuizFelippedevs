import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    // Usamos prisma.$transaction para executar múltiplas contagens em paralelo
    const [projectCount, certificateCount, messageCount, unreadMessageCount] = 
      await prisma.$transaction([
        prisma.project.count(),
        prisma.certificate.count(),
        prisma.message.count(),
        prisma.message.count({ where: { read: false } }),
      ]);

    const stats = {
      projects: projectCount,
      certificates: certificateCount,
      messages: messageCount,
      unreadMessages: unreadMessageCount,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Erro ao buscar dados de analytics:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}