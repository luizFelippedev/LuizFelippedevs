import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import prisma from '@/lib/prisma';
import { z } from 'zod';

const skillSchema = z.object({
  name: z.string().min(1),
  icon: z.string().min(1),
  mastery: z.number().min(0).max(100),
  category: z.enum(["LANGUAGE", "FRAMEWORK", "DATABASE", "TOOL"]),
});

export async function GET() {
  const skills = await prisma.skill.findMany();
  return NextResponse.json(skills);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  try {
    const body = await request.json();
    const validatedData = skillSchema.parse(body);

    const newSkill = await prisma.skill.create({ data: validatedData });
    return NextResponse.json(newSkill, { status: 201 });
  } catch (error) {
    // ... tratamento de erro
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}