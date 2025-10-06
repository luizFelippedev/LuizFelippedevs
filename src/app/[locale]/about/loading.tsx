import { Skeleton } from "@/components/ui/skeleton";

export default function AboutLoading() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20 animate-pulse">
      <div className="grid md:grid-cols-3 gap-8 md:gap-12">
        {/* Skeleton para a imagem e texto de introdução */}
        <div className="md:col-span-1 flex flex-col items-center">
          <Skeleton className="h-48 w-48 rounded-full mb-4" />
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Skeleton para a Timeline e Tech Stack */}
        <div className="md:col-span-2 space-y-12">
          {/* Skeleton da Timeline */}
          <div>
            <Skeleton className="h-8 w-1/3 mx-auto mb-8" />
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-24 w-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Skeleton da Tech Stack */}
          <div>
            <Skeleton className="h-8 w-1/2 mx-auto mb-8" />
            <div className="flex flex-wrap justify-center gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-16 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}