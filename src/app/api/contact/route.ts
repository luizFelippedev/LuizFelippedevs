import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import prisma from '@/lib/prisma';
import ContactEmail from '@/components/emails/ContactEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactFormSchema = z.object({
  name: z.string().min(2, 'O nome precisa ter pelo menos 2 caracteres.'),
  email: z.string().email('E-mail inválido.'),
  message: z.string().min(10, 'A mensagem precisa ter pelo menos 10 caracteres.'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = contactFormSchema.parse(body);
    const { name, email, message } = validatedData;

    // --- MELHORIA 1: Salvar a mensagem no banco de dados ---
    await prisma.message.create({
      data: {
        name,
        email,
        message,
      },
    });

    // --- MELHORIA 2: Enviar o e-mail usando o template React ---
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Use o domínio verificado ou o de teste
      to: ['seu-email-de-verdade@gmail.com'], // O e-mail ONDE VOCÊ VAI RECEBER
      subject: `Nova mensagem do Portfólio de ${name}`,
      reply_to: email,
      // Passa o componente React diretamente para o Resend
      react: ContactEmail({ name, email, message }),
    });

    if (error) {
      console.error({ error });
      // Se o email falhar, ainda consideramos a operação um sucesso parcial,
      // pois a mensagem foi salva no banco.
      return NextResponse.json({ message: 'Mensagem salva, mas erro ao enviar e-mail.', error }, { status: 500 });
    }

    return NextResponse.json({ message: 'Mensagem enviada e salva com sucesso!', data });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Dados inválidos.', errors: error.errors }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ message: 'Ocorreu um erro interno.' }, { status: 500 });
  }
}