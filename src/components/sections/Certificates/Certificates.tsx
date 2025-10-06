//C:\LF\luiz-felipe-portfolio\src\components\sections\Certificates\Certificates.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { certificates } from '@/data/certificates';
import type { Certificate } from '@/data/certificates';
import { CertificateCard } from './CertificateCard';
import { CertificateModal } from './CertificateModal';
import { useTranslations } from 'next-intl';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Anima os filhos um após o outro
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export function Certificates() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const t = useTranslations('Navigation'); // Usando a chave de navegação como exemplo

  return (
    <>
      <section id="certificates" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t('certificates')}</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              Minhas conquistas e áreas de estudo contínuo para aprimorar minhas habilidades.
            </p>
          </div>
          
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {certificates.map((cert) => (
              <motion.div key={cert.title} variants={itemVariants}>
                <CertificateCard 
                  certificate={cert}
                  onClick={() => setSelectedCertificate(cert)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      <CertificateModal 
        certificate={selectedCertificate}
        isOpen={!!selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </>
  );
}