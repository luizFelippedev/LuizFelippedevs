// C:\LF\luiz-felipe-portfolio\src\components\sections\Hero\AdvancedHero.tsx
'use client'; // <-- CORREÇÃO
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Scene3D from '../../3d/Scene3D';
import Scene3DFallback from './Scene3DFallback';
import TypingAnimation from './TypingAnimation';
import { HeroBackground } from './HeroBackground';

interface AdvancedHeroProps {
  onExploreClick?: () => void;
}

const AdvancedHero: React.FC<AdvancedHeroProps> = ({ onExploreClick }) => {
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  const titles = [
    'Full Stack Developer',
    'UI/UX Enthusiast',
    'Problem Solver',
    'Code Architect'
  ];

  useEffect(() => {
    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    setWebGLSupported(!!gl);
    
    setTimeout(() => setIsLoaded(true), 100);

    // Cycle through titles
    const interval = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  const glowVariants = {
    initial: { opacity: 0.5, scale: 1 },
    animate: {
      opacity: [0.5, 0.8, 0.5],
      scale: [1, 1.1, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <HeroBackground />

      {/* 3D Scene or Fallback */}
      <div className="absolute inset-0 z-0">
        {webGLSupported ? (
          <Scene3D />
        ) : (
          <Scene3DFallback />
        )}
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-900/50 z-10" />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-3xl z-0"
        variants={glowVariants}
        initial="initial"
        animate="animate"
      />

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-6 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="max-w-5xl mx-auto text-center"
        >
          {/* Greeting Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm text-purple-300"
              whileHover={{ scale: 1.05, borderColor: 'rgba(168, 85, 247, 0.4)' }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span>Available for new opportunities</span>
            </motion.div>
          </motion.div>

          {/* Main Heading */}
          <motion.div variants={itemVariants}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient">
                Luiz Felipe
              </span>
            </h1>
          </motion.div>

          {/* Typing Animation */}
          <motion.div variants={itemVariants} className="mb-8 h-16 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTitleIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-2xl md:text-4xl font-semibold text-purple-300"
              >
                <TypingAnimation text={titles[currentTitleIndex]} />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Crafting exceptional digital experiences with modern technologies.
            Specialized in React, TypeScript, and creating scalable applications
            that make a difference.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 justify-center items-center"
          >
            <motion.button
              onClick={onExploreClick}
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-white overflow-hidden shadow-lg shadow-purple-500/50"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(168, 85, 247, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                View My Work
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>

            <motion.a
              href="#contact"
              className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full font-semibold text-white hover:bg-white/10 hover:border-white/20 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>

          {/* Tech Stack Badges */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex flex-wrap gap-3 justify-center"
          >
            {['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind'].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg text-sm text-gray-300 cursor-default"
              >
                {tech}
              </motion.div>
            ))}
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            variants={floatingVariants}
            initial="initial"
            animate="animate"
            className="absolute top-20 left-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl"
          />
          <motion.div
            variants={floatingVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: 1 }}
            className="absolute bottom-20 right-10 w-32 h-32 bg-pink-500/10 rounded-full blur-xl"
          />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/60 cursor-pointer hover:text-white/80 transition-colors"
        >
          <span className="text-sm font-medium">Scroll Down</span>
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AdvancedHero;