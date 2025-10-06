// src/components/3d/Models/TechSphere.tsx
'use client';

import { useFrame } from '@react-three/fiber';
import { Icosahedron, shaderMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import { useControls } from 'leva';

// GLSL code para o nosso shader customizado
const vertexShader = /* glsl */`
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = vec3(modelViewMatrix * vec4(position, 1.0));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */`
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uFresnelPower;
  varying vec3 vNormal;
  varying vec3 vPosition;

  // Função de ruído para o efeito de energia
  float noise(vec3 p) {
    return fract(sin(dot(p, vec3(12.9898, 78.233, 151.7182))) * 43758.5453);
  }

  void main() {
    // Efeito Fresnel (brilho nas bordas)
    float fresnel = dot(vNormal, normalize(vec3(0.0, 0.0, 1.0) - vPosition));
    fresnel = pow(fresnel, uFresnelPower);

    // Efeito de energia pulsante
    float energy = sin(vPosition.y * 4.0 + uTime * 2.0) * 0.5 + 0.5;
    energy *= noise(vPosition + uTime * 0.5);

    vec3 finalColor = uColor * (energy + fresnel);
    gl_FragColor = vec4(finalColor, fresnel * 0.8 + energy * 0.2);
  }
`;

// Criando um material React a partir do shader
const EnergyMaterial = shaderMaterial(
  { uTime: 0, uColor: new THREE.Color(0.1, 0.3, 1.0), uFresnelPower: 2.5 },
  vertexShader,
  fragmentShader
);
extend({ EnergyMaterial });

export function TechSphere() {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);

  const { color, fresnelPower } = useControls('Tech Sphere', {
    color: '#1a4dff',
    fresnelPower: { value: 2.5, min: 0.1, max: 10.0 },
  });

  useFrame((state, delta) => {
    // Animação contínua do tempo no shader para o efeito pulsante
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }
    // Rotação sutil da esfera
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <Icosahedron args={[2.5, 20]} ref={meshRef}>
      {/* @ts-ignore */}
      <energyMaterial
        ref={materialRef}
        uColor={color}
        uFresnelPower={fresnelPower}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </Icosahedron>
  );
}