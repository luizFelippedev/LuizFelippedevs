import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Timeline } from "@/components/sections/About/Timeline";
import { TechStack } from "@/components/sections/About/TechStack";
import { Separator } from "@/components/ui/separator";

// Exportação de metadados para SEO específico desta página
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({ locale, namespace: 'About' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function AboutPage() {
  const t = await getTranslations('About');

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 md:py-16 lg:py-20">
      <div className="grid md:grid-cols-1 gap-12">
        {/* Seção de Introdução com Foto e Biografia */}
        <section className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="relative h-48 w-48 md:h-64 md:w-64 flex-shrink-0">
            <Image
              src="/images/profile.jpg" // IMPORTANTE: Coloque sua foto em 'public/images/profile.jpg'
              alt="Foto de Luiz Felipe"
              fill
              className="rounded-full object-cover border-4 border-primary/10 shadow-lg"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">{t('title')}</h1>
            <p className="text-lg text-muted-foreground">
              {t('description')}
            </p>
            {/* Você pode adicionar mais parágrafos de biografia aqui */}
          </div>
        </section>

        <Separator className="my-12" />

        {/* Seção da Timeline (reutilizando o componente) */}
        <section>
          <Timeline />
        </section>

        <Separator className="my-12" />
        
        {/* Seção de Tecnologias (reutilizando o componente) */}
        <section>
          <TechStack />
        </section>
      </div>
    </div>
  );
}