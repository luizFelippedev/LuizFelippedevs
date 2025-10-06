// C:\LF\luiz-felipe-portfolio\src\components\sections\Experience\Experience.tsx
'use client';

import { experiences } from '@/data/experience';
import { ExperienceCard } from './ExperienceCard';
import { motion } from 'framer-motion';

export function Experience() {
  return (
    <section id="experience" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12 sm:text-5xl">Experiência Profissional</h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ExperienceCard experience={exp} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}