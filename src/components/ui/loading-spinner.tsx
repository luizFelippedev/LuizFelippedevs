import { Loader2 } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import React from 'react';

// Define as variantes de estilo para o spinner usando cva
// Isso nos permite ter diferentes tamanhos pré-definidos.
const spinnerVariants = cva('animate-spin text-primary', {
  variants: {
    size: {
      default: 'h-4 w-4',
      sm: 'h-2 w-2',
      lg: 'h-8 w-8',
      icon: 'h-5 w-5',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

// Define as props que o componente aceitará, incluindo as variantes de cva
interface LoadingSpinnerProps
  extends React.HTMLAttributes<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {}

/**
 * Um componente de spinner de carregamento reutilizável com tamanhos personalizáveis.
 */
const LoadingSpinner = React.forwardRef<SVGSVGElement, LoadingSpinnerProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <Loader2
        className={cn(spinnerVariants({ size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
LoadingSpinner.displayName = 'LoadingSpinner';

export { LoadingSpinner };