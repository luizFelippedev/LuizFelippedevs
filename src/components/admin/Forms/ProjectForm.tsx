'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createOrUpdateProject, State } from '@/lib/actions/projectActions';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { Project } from '@prisma/client';

/**
 * Componente de botão de envio que usa o hook useFormStatus para
 * exibir um estado de carregamento e desabilitar o botão durante a submissão.
 */
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? 'Salvando...' : 'Salvar Projeto'}
    </Button>
  );
}

/**
 * Formulário principal para criar ou editar um projeto.
 * Aceita um 'project' opcional. Se fornecido, o formulário entra em modo de edição.
 */
export function ProjectForm({ project }: { project?: Project | null }) {
  const initialState: State = { message: null, errors: {} };
  
  // O hook useFormState conecta o formulário à Server Action.
  // 'state' contém a resposta da ação (erros ou mensagem de sucesso).
  // 'dispatch' é a função a ser chamada pelo formulário.
  const [state, dispatch] = useFormState(createOrUpdateProject, initialState);

  return (
    <form action={dispatch} className="space-y-6">
      {/* Campo oculto para o ID do projeto, usado na atualização */}
      <input type="hidden" name="id" value={project?.id} />

      {/* Campo de Título */}
      <div>
        <Label htmlFor="title">Título do Projeto</Label>
        <Input
          id="title"
          name="title"
          defaultValue={project?.title}
          required
          placeholder="Meu Novo Projeto Incrível"
        />
        {state.errors?.title && (
          <p className="text-sm text-destructive mt-1">{state.errors.title}</p>
        )}
      </div>

      {/* Campo de Slug */}
      <div>
        <Label htmlFor="slug">Slug (URL)</Label>
        <Input
          id="slug"
          name="slug"
          defaultValue={project?.slug}
          required
          placeholder="meu-novo-projeto-incrivel"
        />
        {state.errors?.slug && (
          <p className="text-sm text-destructive mt-1">{state.errors.slug}</p>
        )}
      </div>
      
      {/* Campo de Descrição Curta */}
      <div>
        <Label htmlFor="description">Descrição Curta</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={project?.description}
          required
          placeholder="Uma breve descrição que aparecerá nos cartões do projeto."
        />
        {state.errors?.description && (
          <p className="text-sm text-destructive mt-1">{state.errors.description}</p>
        )}
      </div>

      {/* Campo de Conteúdo Completo */}
      <div>
        <Label htmlFor="content">Conteúdo Completo (Markdown)</Label>
        <Textarea
          id="content"
          name="content"
          defaultValue={project?.content}
          required
          rows={10}
          placeholder="Descreva seu projeto em detalhes aqui. Você pode usar formatação Markdown."
        />
        {state.errors?.content && (
          <p className="text-sm text-destructive mt-1">{state.errors.content}</p>
        )}
      </div>

      {/* Campos de URLs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="imageUrl">URL da Imagem</Label>
          <Input id="imageUrl" name="imageUrl" defaultValue={project?.imageUrl} type="url" required />
          {state.errors?.imageUrl && <p className="text-sm text-destructive mt-1">{state.errors.imageUrl}</p>}
        </div>
        <div>
          <Label htmlFor="deployUrl">URL do Deploy</Label>
          <Input id="deployUrl" name="deployUrl" defaultValue={project?.deployUrl ?? ''} type="url" />
           {state.errors?.deployUrl && <p className="text-sm text-destructive mt-1">{state.errors.deployUrl}</p>}
        </div>
        <div>
          <Label htmlFor="repoUrl">URL do Repositório</Label>
          <Input id="repoUrl" name="repoUrl" defaultValue={project?.repoUrl ?? ''} type="url" />
          {state.errors?.repoUrl && <p className="text-sm text-destructive mt-1">{state.errors.repoUrl}</p>}
        </div>
      </div>
      
      {/* Campo de Tags */}
      <div>
        <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
        <Input
          id="tags"
          name="tags"
          defaultValue={project?.tags} // Compatível com o tipo String do SQLite
          placeholder="React, Next.js, TypeScript"
        />
      </div>

      {/* Interruptor de Publicação */}
      <div className="flex items-center space-x-2 pt-2">
        <Switch id="published" name="published" defaultChecked={project?.published ?? false} />
        <Label htmlFor="published">Publicar projeto?</Label>
      </div>

      {/* Alerta para exibir a resposta da Server Action */}
      {state.message && (
        <Alert variant={state.errors ? 'destructive' : 'default'}>
          <Terminal className="h-4 w-4" />
          <AlertTitle>{state.errors ? 'Erro de Validação!' : 'Sucesso!'}</AlertTitle>
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
      
      <div className="flex justify-end pt-4">
        <SubmitButton />
      </div>
    </form>
  );
}