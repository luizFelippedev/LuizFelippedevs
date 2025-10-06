import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsLoading() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      {/* Skeleton para o cabeçalho */}
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <Skeleton className="h-10 w-3/4 max-w-lg" />
        <Skeleton className="h-6 w-1/2 max-w-md" />
      </div>

      {/* Skeleton para os botões de filtro */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        <Skeleton className="h-10 w-20 rounded-full" />
        <Skeleton className="h-10 w-24 rounded-full" />
        <Skeleton className="h-10 w-28 rounded-full" />
        <Skeleton className="h-10 w-20 rounded-full" />
      </div>

      {/* Skeleton para a grelha de projetos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}