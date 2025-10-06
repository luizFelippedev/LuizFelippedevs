// src/components/3d/ParticleSystem/TechSymbols.tsx
'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useControls } from 'leva';
import { Text } from '@react-three/drei';

interface Symbol {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  rotation: number;
  rotationSpeed: number;
  char: string;
  scale: number;
}

const TECH_SYMBOLS = [
  // Símbolos de programação
  '{', '}', '[', ']', '<', '>', '/', '\\', '|',
  // Operadores
  '+', '-', '*', '=', '!', '?', '&', '%', '$',
  // Números binários
  '0', '1',
  // Símbolos especiais
  '#', '@', '^', '~', '_',
];

export function TechSymbols({ count = 100 }: { count?: number }) {
  const groupRef = useRef<THREE.Group>(null!);

  const { color, speed, spread, size } = useControls('Tech Symbols', {
    color: '#00ffff',
    speed: { value: 0.5, min: 0.1, max: 2.0 },
    spread: { value: 15, min: 5, max: 30 },
    size: { value: 0.3, min: 0.1, max: 1.0 },
  });

  const symbols = useMemo(() => {
    const temp: Symbol[] = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        char: TECH_SYMBOLS[Math.floor(Math.random() * TECH_SYMBOLS.length)],
        scale: 0.5 + Math.random() * 0.5,
      });
    }
    return temp;
  }, [count, spread]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      symbols.forEach((symbol, i) => {
        // Atualiza posição
        symbol.position.add(symbol.velocity.clone().multiplyScalar(speed));
        
        // Mantém dentro dos limites
        ['x', 'y', 'z'].forEach((axis) => {
          const key = axis as 'x' | 'y' | 'z';
          if (Math.abs(symbol.position[key]) > spread / 2) {
            symbol.velocity[key] *= -1;
          }
        });

        // Atualiza rotação
        symbol.rotation += symbol.rotationSpeed * speed;

        // Aplica transformações ao mesh
        const mesh = groupRef.current.children[i];
        if (mesh) {
          mesh.position.copy(symbol.position);
          mesh.rotation.z = symbol.rotation;
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {symbols.map((symbol, i) => (
        <Text
          key={i}
          position={symbol.position}
          fontSize={size * symbol.scale}
          color={color}
          anchorX="center"
          anchorY="middle"
          transparent 
          opacity={0.6}
          depthWrite={false}
        >
          {symbol.char}
        </Text>
      ))}
    </group>
  );
}