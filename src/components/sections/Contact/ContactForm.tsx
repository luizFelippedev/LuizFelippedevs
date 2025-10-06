// src/components/sections/Contact/ContactForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { Send } from 'lucide-react';
import { useRouter } from '@/data/navigation'; // Importa o router do next-intl

const formSchema = z.object({
  name: z.string().min(2, 'O nome precisa ter pelo menos 2 caracteres.'),
  email: z.string().email('Por favor, insira um e-mail válido.'),
  message: z.string().min(10, 'A mensagem precisa ter pelo menos 10 caracteres.'),
});

export function ContactForm() {
  const { toast } = useToast();
  const router = useRouter(); // Inicializa o router
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar a mensagem.');
      }

      // CORREÇÃO: Redireciona para a página de sucesso
      router.push('/contact/success');

    } catch (error) {
      toast({
        title: 'Erro!',
        description: 'Ocorreu um problema ao enviar sua mensagem. Tente novamente mais tarde.',
        variant: 'destructive',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl><Input placeholder="Seu nome completo" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl><Input type="email" placeholder="seu.email@exemplo.com" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensagem</FormLabel>
              <FormControl><Textarea placeholder="Deixe sua mensagem aqui..." className="resize-none" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Enviando...' : (<>Enviar Mensagem <Send className="ml-2 h-4 w-4" /></>)}
        </Button>
      </form>
    </Form>
  );
}