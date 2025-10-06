// src/components/3d/ParticleSystem/FloatingDots.tsx

'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { inSphere } from 'maath/random';
import { useControls } from 'leva';

export function FloatingDots({ count }: { count: number }) {
  // CORREÇÃO: Tipamos explicitamente o useRef para que o TypeScript saiba que ele conterá um objeto THREE.Points.
  const pointsRef = useRef<THREE.Points>(null!);

  const { color, size, speed } = useControls('Floating Dots', {
    color: '#ffffff',
    size: { value: 0.015, min: 0.001, max: 0.1 },
    speed: { value: 0.1, min: 0.01, max: 1.0 },
  });

  const p = useMemo(() => {
    const array = new Float32Array(count * 3);
    // CORREÇÃO: Garantimos o tipo do retorno com 'as Float32Array'.
    return inSphere(array, { radius: 5 }) as Float32Array;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x -= delta * speed * 0.1;
      pointsRef.current.rotation.y -= delta * speed * 0.1;
    }
  });

  return (
    <Points ref={pointsRef} positions={p} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={color}
        size={size}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}