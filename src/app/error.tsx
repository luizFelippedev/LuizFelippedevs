// src/app/[locale]/error.tsx

'use client'; // <-- Esta é a linha mais importante para resolver o erro.

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // É uma boa prática enviar o erro para um serviço de monitoramento
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center p-6">
      <h2 className="text-2xl font-semibold mb-4">Algo deu errado!</h2>
      <p className="text-muted-foreground mb-6">
        Ocorreu um erro ao tentar processar sua solicitação.
      </p>
      <Button
        onClick={
          // Esta função tentará renderizar a página novamente
          () => reset()
        }
      >
        Tentar Novamente
      </Button>
    </div>
  );
}