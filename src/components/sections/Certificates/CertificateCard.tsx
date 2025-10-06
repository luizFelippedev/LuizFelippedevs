// C:\LF\luiz-felipe-portfolio\src\components\sections\Certificates\CertificateCard.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import type { Certificate } from '@/data/certificates';
import Image from 'next/image';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface CertificateCardProps {
  certificate: Certificate;
  onClick: () => void;
}

export function CertificateCard({ certificate, onClick }: CertificateCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Card 
      className="overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 ring-offset-background"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Ver detalhes do certificado: ${certificate.title}`}
    >
      <CardContent className="p-0">
        <div className="relative w-full aspect-video bg-muted">
          <Image
            src={certificate.imageUrl}
            alt={`Certificado ${certificate.title} emitido por ${certificate.issuer}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          {!imageLoaded && <Skeleton className="absolute inset-0" />}
        </div>
        <div className="p-4 border-t">
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {certificate.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{certificate.issuer}</p>
          {certificate.issueDate && (
            <p className="text-xs text-muted-foreground/80 mt-2">
              {certificate.issueDate}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}