// src/components/common/ErrorBoundary/ErrorBoundary.tsx
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode; // UI de fallback customizada
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Um Error Boundary customizado para envolver componentes "frágeis".
 * Complementa o 'error.tsx' do Next.js, que lida com erros de página inteira.
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Você pode logar o erro para um serviço externo aqui
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div role="alert" className="p-4 bg-destructive/10 border border-destructive/50 text-destructive rounded-lg">
          <h3 className="font-bold">Oops! Algo deu errado.</h3>
          <p className="text-sm">Este componente encontrou um problema.</p>
          <Button variant="destructive" size="sm" className="mt-2" onClick={() => this.setState({ hasError: false })}>
            Tentar Novamente
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}