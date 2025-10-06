// src/components/sections/About/About.tsx
'use client';

import { Timeline } from './Timeline';
import { TechStack } from './TechStack';

export function About() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Sobre Mim</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Sou um desenvolvedor apaixonado por criar soluções inovadoras e interfaces 3D interativas. Com uma base sólida em engenharia de software e um olhar atento para a experiência do usuário, busco transformar ideias complexas em realidade digital.
            </p>
          </div>
        </div>
        
        {/* Renderiza os outros componentes */}
        <div className="mx-auto grid max-w-5xl items-start gap-12 mt-12">
          <Timeline />
          <TechStack />
        </div>
      </div>
    </section>
  );
}