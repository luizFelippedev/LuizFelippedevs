// src/components/common/Loading/PageLoader.tsx
import { LoadingSpinner } from './LoadingSpinner';

export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <LoadingSpinner size={48} />
    </div>
  );
}