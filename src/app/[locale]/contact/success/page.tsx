// src/app/[locale]/contact/success/page.tsx
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Link } from '@/data/navigation';
import { CheckCircle2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ContactSuccessPage() {
  const { toast } = useToast();
  const t = useTranslations('Contact');

  // Mostra a notificação de sucesso assim que a página carrega
  useEffect(() => {
    toast({
      title: t('toastSuccessTitle'),
      description: t('toastSuccessDescription'),
    });
  }, [toast, t]);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto bg-green-100 dark:bg-green-900/50 p-3 rounded-full">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="mt-4 text-2xl">Mensagem Enviada!</CardTitle>
          <CardDescription>Obrigado por entrar em contato. Responderei assim que possível.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/">Voltar para a Página Inicial</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}