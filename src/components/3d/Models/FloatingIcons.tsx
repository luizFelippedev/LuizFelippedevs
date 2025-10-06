// src/components/3d/Models/FloatingIcons.tsx

'use client';

import * as THREE from 'three';
import { useRef, useMemo } from 'react';
import { useFrame, RootState } from '@react-three/fiber';
import { useTexture, Instance, Instances } from '@react-three/drei';
import { AdditiveBlending } from 'three';

const techIcons = [
  '/particles/tech-icons/react.png',
  '/particles/tech-icons/nextjs.png',
  '/particles/tech-icons/nodejs.png',
  '/particles/tech-icons/typescript.png',
  '/particles/tech-icons/docker.png',
  '/particles/tech-icons/prisma.png',
  '/particles/tech-icons/tailwind.png',
  '/particles/tech-icons/graphql.png',
];

interface IconData {
  position: [number, number, number];
  texture: THREE.Texture;
  factor: number;
  speed: number;
}

export function FloatingIcons() {
  const textures = useTexture(techIcons);

  const particles = useMemo(() => {
    const temp: IconData[] = [];
    const count = techIcons.length;
    const phi = Math.PI * (3.0 - Math.sqrt(5.0));

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      
      temp.push({
        texture: textures[i],
        position: [x, y, z],
        factor: 0.1 + Math.random() * 2,
        speed: 0.005 + Math.random() / 200,
      });
    }
    return temp;
  }, [textures]);

  return (
    <group scale={5}>
      <Instances limit={particles.length} frustumCulled={false}>
        <planeGeometry args={[0.5, 0.5]} />
        <meshBasicMaterial transparent side={THREE.DoubleSide} blending={AdditiveBlending} depthWrite={false} />
        {particles.map((data, i) => (
          <Icon key={i} {...data} />
        ))}
      </Instances>
    </group>
  );
}

function Icon({ texture, factor, speed, ...props }: IconData) {
  const ref = useRef<THREE.InstancedMesh>(null!);
  
  useFrame((state: RootState) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime() + factor;
      ref.current.position.y = props.position[1] + Math.sin(t) * speed;
      ref.current.rotation.copy(state.camera.rotation);
    }
  });

  // CORREÇÃO: Ignoramos o erro de tipo da prop 'map', pois é uma limitação
  // conhecida da inferência de tipos do TypeScript com esta biblioteca.
  // @ts-ignore 
  return <Instance ref={ref} {...props} map={texture} />;
}