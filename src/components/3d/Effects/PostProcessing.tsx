// src/components/3d/Effects/PostProcessing.tsx

'use client';

import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from '@react-three/postprocessing';
import { useControls } from 'leva';
import { ReactElement } from 'react';

export function PostProcessing() {
  const { bloom, dof, noise, vignette } = useControls('Post-Processing', {
    bloom: true,
    dof: true,
    noise: true,
    vignette: true,
  });

  const { intensity, luminanceThreshold, luminanceSmoothing } = useControls('Bloom', {
    intensity: { value: 0.6, min: 0, max: 2, step: 0.1 },
    luminanceThreshold: { value: 0.2, min: 0, max: 1, step: 0.05 },
    luminanceSmoothing: { value: 0.3, min: 0, max: 1, step: 0.05 },
  });

  const { focusDistance, focalLength, bokehScale } = useControls('Depth of Field', {
    focusDistance: { value: 0.02, min: 0, max: 1, step: 0.01 },
    focalLength: { value: 0.2, min: 0, max: 1, step: 0.01 },
    bokehScale: { value: 4, min: 0, max: 10, step: 1 },
  });

  // CORREÇÃO: Criamos um array para armazenar apenas os efeitos ativos.
  // Isso garante que não passemos 'null' ou 'false' como filhos para o EffectComposer.
  const effects: ReactElement[] = [];

  if (dof) {
    effects.push(
      <DepthOfField
        key="dof"
        focusDistance={focusDistance}
        focalLength={focalLength}
        bokehScale={bokehScale}
        height={480}
      />
    );
  }

  if (bloom) {
    effects.push(
      <Bloom
        key="bloom"
        intensity={intensity}
        luminanceThreshold={luminanceThreshold}
        luminanceSmoothing={luminanceSmoothing}
        mipmapBlur
        height={300}
      />
    );
  }

  if (noise) {
    effects.push(<Noise key="noise" opacity={0.03} />);
  }

  if (vignette) {
    effects.push(<Vignette key="vignette" eskil={false} offset={0.1} darkness={1.1} />);
  }
  
  return (
    <EffectComposer>
      {/* Renderizamos o array de efeitos. React sabe como lidar com isso. */}
      {effects}
    </EffectComposer>
  );
}