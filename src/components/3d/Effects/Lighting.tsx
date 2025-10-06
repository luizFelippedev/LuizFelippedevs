// src/components/3d/Effects/Lighting.tsx
'use client';

import { useHelper } from '@react-three/drei';
import { useControls } from 'leva';
import { useRef } from 'react';
import { DirectionalLightHelper, PointLightHelper } from 'three';

/**
 * Componente de iluminação profissional para a cena.
 * Utiliza o 'leva' para permitir o controle em tempo real da intensidade, cor e posição das luzes,
 * o que é extremamente útil para encontrar o visual perfeito sem precisar recarregar a página.
 */
export function Lighting() {
  const directionalLightRef = useRef(null!);
  const pointLightRef = useRef(null!);

  // O hook useHelper do drei nos permite visualizar a posição e direção das luzes
  // durante o desenvolvimento. Isso não é renderizado na build final.
  // useHelper(directionalLightRef, DirectionalLightHelper, 1, 'cyan');
  // useHelper(pointLightRef, PointLightHelper, 0.5, 'red');

  // Controles para a luz ambiente, que ilumina a cena de forma geral
  const { ambientIntensity, ambientColor } = useControls('Ambient Light', {
    ambientIntensity: { value: 0.2, min: 0, max: 2, step: 0.1 },
    ambientColor: '#ffffff',
  });

  // Controles para a luz direcional, a principal fonte de luz (como o sol)
  // que cria sombras bem definidas.
  const { dirIntensity, dirColor, dirPosition } = useControls('Directional Light', {
    dirIntensity: { value: 1.5, min: 0, max: 5, step: 0.1 },
    dirColor: '#ffffff',
    dirPosition: { x: 5, y: 5, z: 5 },
  });

  // Controles para uma luz de ponto, que funciona como uma lâmpada,
  // ótima para criar reflexos e iluminar áreas específicas.
  const { pointIntensity, pointColor, pointPosition } = useControls('Point Light', {
    pointIntensity: { value: 2.5, min: 0, max: 10, step: 0.1 },
    pointColor: '#ff00ff', // Um magenta para um toque de estilo
    pointPosition: { x: -4, y: -2, z: -3 },
  });

  return (
    <>
      <ambientLight intensity={ambientIntensity} color={ambientColor} />
      <directionalLight
        ref={directionalLightRef}
        intensity={dirIntensity}
        color={dirColor}
        position={[dirPosition.x, dirPosition.y, dirPosition.z]}
        castShadow // Essencial para que esta luz gere sombras
        shadow-mapSize-width={2048} // Aumenta a resolução do mapa de sombras para mais detalhes
        shadow-mapSize-height={2048}
      />
      <pointLight
        ref={pointLightRef}
        intensity={pointIntensity}
        color={pointColor}
        position={[pointPosition.x, pointPosition.y, pointPosition.z]}
      />
      {/* Uma luz extra no fundo para criar um efeito de contorno (rim light) */}
      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
    </>
  );
}