// C:\LF\luiz-felipe-portfolio\src\components\admin\settings\SiteSettingsForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { SiteSettings } from '@prisma/client';
import { updateSiteSettings } from '@/lib/actions/settingsActions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
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

type SiteSettingsFormValues = z.infer<typeof formSchema>;

interface SiteSettingsFormProps {
  settings: SiteSettings | null;
}

export function SiteSettingsForm({ settings }: SiteSettingsFormProps) {
  const { toast } = useToast();
  
  const form = useForm<SiteSettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      siteName: settings?.siteName ?? '',
      description: settings?.description ?? '',
      contactEmail: settings?.contactEmail ?? '',
    },
  });

  const onSubmit = async (data: SiteSettingsFormValues) => {
    try {
      const formData = new FormData();
      formData.append('siteName', data.siteName || '');
      formData.append('description', data.description || '');
      formData.append('contactEmail', data.contactEmail || '');

      const result = await updateSiteSettings(formData);

      if (result.success) {
        toast({ 
          title: 'Sucesso!', 
          description: result.message as string,
          variant: 'default'
        });
        // Marca o formulário como não modificado após salvar com sucesso
        form.reset(data);
      } else {
        // Trata erros de validação do Zod
        if (result.errors) {
          const errorMessages = Object.entries(result.errors)
            .map(([field, messages]) => `${field}: ${messages?.join(', ')}`)
            .join('\n');
          
          toast({ 
            title: 'Erro de Validação', 
            description: errorMessages, 
            variant: 'destructive' 
          });
        } else {
          toast({ 
            title: 'Erro!', 
            description: (result.message as string) || 'Não foi possível salvar as configurações.', 
            variant: 'destructive' 
          });
        }
      }
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      toast({ 
        title: 'Erro!', 
        description: 'Ocorreu um erro inesperado ao salvar as configurações.', 
        variant: 'destructive' 
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações do Site</CardTitle>
        <CardDescription>
          Gerencie as configurações globais do seu portfólio. Estas informações serão usadas em todo o site.
        </CardDescription>
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField 
              control={form.control} 
              name="siteName" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Site</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="Meu Portfólio Incrível" 
                      disabled={form.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    Este nome aparecerá no título das páginas e na navegação.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )} 
            />

            <FormField 
              control={form.control} 
              name="description" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição do Site (para SEO)</FormLabel>
                  <FormControl>
                    <Textarea 
                      {...field} 
                      placeholder="Uma breve descrição do seu portfólio..."
                      rows={4}
                      disabled={form.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    Esta descrição será usada nos mecanismos de busca e redes sociais.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )} 
            />

            <FormField 
              control={form.control} 
              name="contactEmail" 
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail de Contato Público</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      {...field} 
                      placeholder="contato@meusite.com"
                      disabled={form.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    Este e-mail será exibido na página de contato do site.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )} 
            />
          </CardContent>
          
          <CardFooter className="border-t px-6 py-4">
            <Button 
              type="submit" 
              disabled={form.formState.isSubmitting || !form.formState.isDirty}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                'Salvar Configurações'
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}