'use client'; 

import React, { useEffect, useRef, useState, Suspense } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { HeroContent } from './HeroContent';
import { HeroBackground } from './HeroBackground';
import { Scene3D } from '@/components/3d/Scene3D';
import { Skeleton } from '@/components/ui/skeleton';

export function Hero({ id = 'hero', className = '' }: { id?: string; className?: string; }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Busca o tamanho da janela APENAS no lado do cliente para evitar erros
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const y = useTransform(smoothProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 1], [1, 0.9]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative h-screen flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* Camada 0: Backgrounds (2D e 3D) */}
      <div className="absolute inset-0 z-0">
        <HeroBackground />
        <Suspense fallback={<Skeleton className="h-full w-full" />}>
          <Scene3D />
        </Suspense>
      </div>

      {/* Camada 1: Overlays de Estilo */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />

      {/* Camada 2: Conteúdo Principal com Parallax */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-20 w-full"
      >
        <HeroContent />
      </motion.div>

      {/* Camada 3: Partículas Flutuantes */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {windowSize.width > 0 && [...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-primary/50 rounded-full"
            initial={{
              x: Math.random() * windowSize.width,
              y: windowSize.height + 50,
            }}
            animate={{
              y: -100, // Sobe até desaparecer
              opacity: [0, 1, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5, // Duração entre 5 e 10 segundos
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: 'linear'
            }}
          />
        ))}
      </div>
    </section>
  );
};