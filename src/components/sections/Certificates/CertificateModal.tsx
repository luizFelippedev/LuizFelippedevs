// C:\LF\luiz-felipe-portfolio\src\components\sections\Certificates\CertificateModal.tsx
'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { Certificate } from '@/data/certificates';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Calendar, Award, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface CertificateModalProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CertificateModal({ certificate, isOpen, onClose }: CertificateModalProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Reseta o estado de carregamento da imagem sempre que o modal abre com um novo certificado
    if (isOpen) {
      setImageLoaded(false);
    }
  }, [isOpen]);

  if (!certificate) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            {certificate.title}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2 text-base pt-2">
            <span>{certificate.issuer}</span>
            {certificate.issueDate && (
              <>
                <Separator orientation="vertical" className="h-4" />
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{certificate.issueDate}</span>
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4 md:grid-cols-2">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted border">
            <Image 
              src={certificate.imageUrl}
              alt={`Certificado ${certificate.title} emitido por ${certificate.issuer}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`object-contain transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
              priority // Carrega a imagem do modal com prioridade
            />
            {!imageLoaded && <Skeleton className="absolute inset-0" />}
          </div>

          <div className="space-y-4 flex flex-col">
            {certificate.description && (
              <div>
                <h4 className="font-semibold mb-2">Descrição:</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{certificate.description}</p>
              </div>
            )}
            <div className="flex-1">
              <h4 className="font-semibold mb-3">Habilidades abordadas:</h4>
              <div className="flex flex-wrap gap-2">
                {certificate.skills.map(skill => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2 mt-auto pt-4 border-t">
              {certificate.credentialUrl && (
                <Button asChild className="w-full" size="lg">
                  <Link href={certificate.credentialUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Ver Credencial
                  </Link>
                </Button>
              )}
              {certificate.courseUrl && (
                <Button asChild variant="outline" className="w-full">
                  <Link href={certificate.courseUrl} target="_blank" rel="noopener noreferrer">
                    <BookOpen className="mr-2 h-4 w-4" /> Página do Curso
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}