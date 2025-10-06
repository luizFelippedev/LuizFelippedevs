'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User } from '@prisma/client';
import { updateUserProfile } from '@/lib/actions/settingsActions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  name: z.string().min(2, 'O nome é obrigatório.'),
  email: z.string().email('O e-mail fornecido é inválido.'),
});

type ProfileFormValues = z.infer<typeof formSchema>;

export function ProfileForm({ user }: { user: User }) {
  const { toast } = useToast();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: user.name ?? '', email: user.email ?? '' },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    
    const result = await updateUserProfile(formData);
    
    // CORREÇÃO: Verificamos o resultado antes de chamar o toast
    if (result.success && typeof result.message === 'string') {
      toast({ title: 'Sucesso!', description: result.message });
    } else {
      toast({ title: 'Erro!', description: 'Não foi possível atualizar o perfil.', variant: 'destructive' });
    }
  };

  return (
    <Card>
      <CardHeader><CardTitle>Perfil</CardTitle><CardDescription>Atualize as informações do seu perfil.</CardDescription></CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem><FormLabel>Nome</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}