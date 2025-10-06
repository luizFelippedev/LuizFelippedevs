// C:\LF\luiz-felipe-portfolio\src\lib\actions\settingsActions.ts
'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

// Schema de validação para o formulário de perfil do usuário
const profileSchema = z.object({
  name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres.'),
  email: z.string().email('O e-mail fornecido é inválido.'),
});

// Schema de validação para o formulário de configurações do site
const siteSettingsSchema = z.object({
  siteName: z.string()
    .min(1, 'O nome do site não pode estar vazio.')
    .max(100, 'O nome do site deve ter no máximo 100 caracteres.')
    .optional()
    .or(z.literal('')),
  description: z.string()
    .max(500, 'A descrição deve ter no máximo 500 caracteres.')
    .optional()
    .or(z.literal('')),
  contactEmail: z.string()
    .email('Formato de e-mail inválido.')
    .optional()
    .or(z.literal('')),
});

/**
 * Server Action para atualizar o perfil do usuário logado.
 * Requer autenticação via NextAuth.
 */
export async function updateUserProfile(formData: FormData) {
  try {
    // Verificação de autenticação
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { 
        success: false, 
        message: 'Não autorizado. Por favor, faça login novamente.' 
      };
    }

    // Validação dos dados do formulário
    const validatedFields = profileSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
    });

    if (!validatedFields.success) {
      return { 
        success: false, 
        message: 'Erro de validação. Verifique os campos.',
        errors: validatedFields.error.flatten().fieldErrors 
      };
    }

    // Verifica se o email já está em uso por outro usuário
    if (validatedFields.data.email !== session.user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: validatedFields.data.email },
      });

      if (existingUser) {
        return { 
          success: false, 
          message: 'Este e-mail já está em uso por outro usuário.' 
        };
      }
    }

    // Atualiza o perfil do usuário
    await prisma.user.update({
      where: { email: session.user.email },
      data: validatedFields.data,
    });

    // Revalida o cache da página
    revalidatePath('/[locale]/admin/settings', 'page');
    
    return { 
      success: true, 
      message: 'Perfil atualizado com sucesso!' 
    };
  } catch (error) {
    console.error('Erro ao atualizar perfil do usuário:', error);
    return { 
      success: false, 
      message: error instanceof Error 
        ? error.message 
        : 'Erro ao atualizar o perfil.' 
    };
  }
}

/**
 * Server Action para criar ou atualizar as configurações do site.
 * Usa upsert para criar se não existir ou atualizar se já existir.
 */
export async function updateSiteSettings(formData: FormData) {
  try {
    // Verificação de autenticação (opcional, mas recomendado)
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { 
        success: false, 
        message: 'Não autorizado. Por favor, faça login novamente.' 
      };
    }

    // Validação dos dados do formulário
    const validatedFields = siteSettingsSchema.safeParse({
      siteName: formData.get('siteName'),
      description: formData.get('description'),
      contactEmail: formData.get('contactEmail'),
    });

    if (!validatedFields.success) {
      return { 
        success: false, 
        message: 'Erro de validação. Verifique os campos.',
        errors: validatedFields.error.flatten().fieldErrors 
      };
    }

    // Prepara os dados para salvar (remove campos vazios)
    const dataToSave = Object.fromEntries(
      Object.entries(validatedFields.data).filter(([_, value]) => value !== '')
    );
    
    // 'upsert' cria as configurações se não existirem, ou atualiza se já existirem
    await prisma.siteSettings.upsert({
      where: { id: 'main' },
      update: dataToSave,
      create: {
        id: 'main',
        ...dataToSave,
      },
    });

    // Revalida o cache da página
    revalidatePath('/[locale]/admin/settings', 'page');
    
    return { 
      success: true, 
      message: 'Configurações do site atualizadas com sucesso!' 
    };
  } catch (error) {
    console.error('Erro ao atualizar configurações do site:', error);
    
    // Trata erro específico do Prisma quando a tabela não existe
    if (error instanceof Error && error.message.includes('Unknown arg `where`')) {
      return { 
        success: false, 
        message: 'Modelo SiteSettings não encontrado. Execute: npx prisma generate && npx prisma migrate dev' 
      };
    }
    
    return { 
      success: false, 
      message: error instanceof Error 
        ? error.message 
        : 'Erro ao atualizar as configurações.' 
    };
  }
}