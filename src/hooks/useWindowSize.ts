import { useState, useEffect } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handler = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Define o tamanho inicial
    handler();

    window.addEventListener('resize', handler);

    // Limpa o listener
    return () => window.removeEventListener('resize', handler);
  }, []);

  return windowSize;
}