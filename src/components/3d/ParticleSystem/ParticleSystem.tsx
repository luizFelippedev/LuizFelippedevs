// src/components/3d/ParticleSystem/ParticleSystem.tsx
'use client';

import { useControls } from 'leva';
import { FloatingDots } from './FloatingDots';
import { MatrixRain } from './MatrixRain';
import { NeuralNetwork } from './NeuralNetwork';
import { TechSymbols } from './TechSymbols'; // ← ADICIONAR

type ParticleType = 'dots' | 'matrix' | 'neural' | 'symbols'; // ← ADICIONAR 'symbols'

export function ParticleSystem() {
  const { type } = useControls('Particle System', {
    type: {
      options: ['dots', 'matrix', 'neural', 'symbols'], // ← ADICIONAR 'symbols'
      value: 'dots'
    },
  });

  const renderSystem = () => {
    switch (type as ParticleType) {
      case 'dots':
        return <FloatingDots count={5000} />;
      case 'matrix':
        return <MatrixRain count={10000} />;
      case 'neural':
        return <NeuralNetwork />;
      case 'symbols': // ← ADICIONAR
        return <TechSymbols count={100} />;
      default:
        return <FloatingDots count={5000} />;
    }
  };

  return <>{renderSystem()}</>;
}