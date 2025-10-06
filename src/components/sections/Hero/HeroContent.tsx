'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { TypingAnimation } from './TypingAnimation';
import { Button } from '@/components/ui/button';
import { Download, Send } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' } },
};

export function HeroContent() {
  const t = useTranslations('Hero');

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center text-center p-4"
    >
      <motion.h1
        variants={itemVariants}
        className="text-6xl md:text-8xl font-bold text-white drop-shadow-2xl"
      >
        {t('greeting')} <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">{`Luiz Felipe`}</span>
      </motion.h1>

      <motion.div variants={itemVariants} className="h-12 mt-4">
        <TypingAnimation />
      </motion.div>

      <motion.div variants={itemVariants} className="mt-8 flex flex-col sm:flex-row gap-4">
        <Button size="lg" onClick={() => scrollTo('projects')}>
          {t('ctaPrimary')} <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
        </Button>
        <Button size="lg" variant="outline" onClick={() => scrollTo('contact')}>
          {t('ctaSecondary')} <Send className="ml-2 h-4 w-4" />
        </Button>
        <Button size="lg" variant="outline" asChild>
          <a href="/cv.pdf" download><Download className="mr-2 h-4 w-4" /> Download CV</a>
        </Button>
      </motion.div>
    </motion.div>
  );
}