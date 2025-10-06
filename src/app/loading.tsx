// src/app/[locale]/loading.tsx

export default function Loading() {
  // Você pode criar um componente de Spinner ou Skeleton aqui depois.
  // Por enquanto, um texto simples é o suficiente para resolver o erro.
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-lg">Carregando...</p>
    </div>
  );
}