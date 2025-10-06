// src/components/3d/ParticleSystem/MatrixRain.tsx
'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useControls } from 'leva';

export function MatrixRain({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const { size, speed } = useControls('Matrix Rain', {
    size: { value: 0.05, min: 0.001, max: 0.2 },
    speed: { value: 10, min: 1, max: 20 },
  });

  // Criamos as partículas e seus atributos (velocidade, posição inicial)
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 20;
      const velocity = 0;
      temp.push({ x, y, z, velocity });
    }
    return temp;
  }, [count]);

  // Este é o loop de animação principal.
  // Acessamos o buffer de geometria diretamente para atualizar a posição de cada partícula.
  // Esta é a maneira mais performática de animar um grande número de objetos.
  useFrame((state, delta) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.velocity += delta * 0.02; // Simula a gravidade
        
        let currentY = positions[i * 3 + 1];
        currentY -= p.velocity * delta * speed;

        // Se a partícula saiu da tela, a reposicionamos no topo com uma nova velocidade.
        if (currentY < -10) {
          currentY = 10;
          p.velocity = 0;
        }

        positions[i * 3 + 1] = currentY;
      }
      // Informamos ao Three.js que o buffer de posições precisa ser atualizado na GPU.
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const initialPositions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = particles[i].x;
      positions[i * 3 + 1] = particles[i].y;
      positions[i * 3 + 2] = particles[i].z;
    }
    return positions;
  }, [count, particles]);

  return (
    <Points ref={pointsRef} positions={initialPositions} stride={3}>
      <PointMaterial
        transparent
        color="#00ff00" // Cor verde clássica do Matrix
        size={size}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}