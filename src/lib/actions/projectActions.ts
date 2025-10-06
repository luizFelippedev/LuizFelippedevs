'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// O Schema de validação usando Zod. Esta é a "fonte da verdade" para os dados de um projeto.
// Garante que os dados sejam seguros e no formato correto antes de irem para o banco.
const ProjectSchema = z.object({
  id: z.string().cuid().optional().or(z.literal('')),
  title: z.string().min(3, 'O título deve ter no mínimo 3 caracteres.'),
  slug: z
    .string()
    .min(3, 'O slug deve ter no mínimo 3 caracteres.')
    .regex(/^[a-z0-9-]+$/, 'O slug só pode conter letras minúsculas, números e hifens.'),
  description: z.string().min(10, 'A descrição é muito curta.'),
  content: z.string().min(50, 'O conteúdo completo é muito curto.'),
  imageUrl: z.string().url('URL da imagem inválida.'),
  deployUrl: z.string().url('URL do deploy inválida.').optional().or(z.literal('')),
  repoUrl: z.string().url('URL do repositório inválida.').optional().or(z.literal('')),
  // As tags são validadas como uma string única, compatível com SQLite.
  tags: z.string().min(1, 'Adicione pelo menos uma tag.'),
  published: z.coerce.boolean(),
});

// Define o formato do estado que será retornado pela action para o formulário.
export type State = {
  errors?: {
    title?: string[];
    slug?: string[];
    description?: string[];
    content?: string[];
    imageUrl?: string[];
    deployUrl?: string[];
    repoUrl?: string[];
    tags?: string[];
  };
  message?: string | null;
};

/**
 * Server Action para criar um novo projeto ou atualizar um existente.
 * @param prevState - O estado anterior do formulário (usado pelo hook useFormState).
 * @param formData - Os dados do formulário enviados pelo cliente.
 */
export async function createOrUpdateProject(prevState: State, formData: FormData) {
  // 1. Validar os dados do formulário usando o schema Zod.
  const validatedFields = ProjectSchema.safeParse({
    id: formData.get('id'),
    title: formData.get('title'),
    slug: formData.get('slug'),
    description: formData.get('description'),
    content: formData.get('content'),
    imageUrl: formData.get('imageUrl'),
    deployUrl: formData.get('deployUrl'),
    repoUrl: formData.get('repoUrl'),
    tags: formData.get('tags'),
    published: formData.get('published') === 'on',
  });

  // 2. Se a validação falhar, retorna os erros para o formulário exibir.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Erro de validação. Por favor, corrija os campos destacados.',
    };
  }

  const { id, ...data } = validatedFields.data;

  // 3. Tenta salvar os dados no banco de dados.
  try {
    if (id) {
      // Se um ID foi fornecido, atualiza o projeto existente.
      await prisma.project.update({
        where: { id },
        data,
      });
    } else {
      // Se não, cria um novo projeto.
      await prisma.project.create({
        data,
      });
    }
  } catch (error) {
    console.error(error);
    // Captura erros comuns do banco de dados, como um 'slug' duplicado.
    if (error instanceof Error && error.message.includes('Unique constraint failed')) {
      return { message: 'Erro: O slug informado já existe em outro projeto.' };
    }
    return { message: 'Erro no banco de dados: Não foi possível salvar o projeto.' };
  }

  // 4. Se tudo der certo, limpa o cache das páginas de projetos.
  revalidatePath('/[locale]/admin/projects'); // Limpa o cache da página de admin
  revalidatePath('/[locale]/projects');      // Limpa o cache da página pública
  revalidatePath('/');                         // Limpa o cache da homepage

  // 5. Redireciona o usuário para a lista de projetos.
  redirect('/admin/projects');
}

/**
 * Server Action para deletar um projeto.
 * @param id - O ID do projeto a ser deletado.
 */
export async function deleteProject(id: string) {
  if (!id) {
    return { message: 'ID do projeto não fornecido.' };
  }
  
  try {
    await prisma.project.delete({
      where: { id },
    });

    // Limpa o cache para garantir que a lista de projetos seja atualizada.
    revalidatePath('/[locale]/admin/projects');
    revalidatePath('/[locale]/projects');
    revalidatePath('/');

    return { message: 'Projeto deletado com sucesso.' };
  } catch (error) {
    console.error(error);
    return { message: 'Erro no banco de dados: Não foi possível deletar o projeto.' };
  }
}