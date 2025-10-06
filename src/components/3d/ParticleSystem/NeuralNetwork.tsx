// src/components/3d/ParticleSystem/NeuralNetwork.tsx

'use client';

import * as THREE from 'three';
import { useMemo, useRef } from 'react';
// CORREÇÃO: Corrigido o erro de digitação no nome do pacote.
import { useFrame, RootState } from '@react-three/fiber';
import { Points, Line } from '@react-three/drei';
import { useControls } from 'leva';
import { Vector3 } from 'three';

type Pulse = {
  from: Vector3;
  to: Vector3;
  progress: number;
  speed: number;
};

const LAYERS_CONFIG = [
  { count: 25, boxSize: [8, 8, 0] as [number, number, number], z: -5 },
  { count: 50, boxSize: [10, 10, 0] as [number, number, number], z: -2 },
  { count: 30, boxSize: [9, 9, 0] as [number, number, number], z: 1 },
  { count: 15, boxSize: [7, 7, 0] as [number, number, number], z: 4 },
];

export function NeuralNetwork() {
  const { pulseColor, nodeColor, lineColor, nodeSize, pulseSize, pulseSpeed, pulseFrequency } = useControls('Neural Network', {
    nodeColor: '#00aaff',
    lineColor: '#ffffff',
    pulseColor: '#ff22dd',
    nodeSize: { value: 0.1, min: 0.01, max: 0.5 },
    pulseSize: { value: 0.15, min: 0.01, max: 0.5 },
    pulseSpeed: { value: 2.0, min: 0.1, max: 5.0 },
    pulseFrequency: { value: 0.01, min: 0.001, max: 0.1 },
  });

  const allNodesRef = useRef<THREE.Vector3[]>([]);
  const pulsesRef = useRef<Pulse[]>([]);
  const pulsePointsRef = useRef<THREE.Points>(null!);

  const { nodePositions, lineVertices } = useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    const lines: THREE.Vector3[][] = [];
    
    LAYERS_CONFIG.forEach(layer => {
      for (let i = 0; i < layer.count; i++) {
        nodes.push(
          new THREE.Vector3(
            (Math.random() - 0.5) * layer.boxSize[0],
            (Math.random() - 0.5) * layer.boxSize[1],
            layer.z
          )
        );
      }
    });
    allNodesRef.current = nodes;

    let nodeIndexOffset = 0;
    for (let i = 0; i < LAYERS_CONFIG.length - 1; i++) {
      const currentLayer = LAYERS_CONFIG[i];
      const nextLayer = LAYERS_CONFIG[i + 1];
      const currentLayerNodes = nodes.slice(nodeIndexOffset, nodeIndexOffset + currentLayer.count);
      const nextLayerNodes = nodes.slice(nodeIndexOffset + currentLayer.count, nodeIndexOffset + currentLayer.count + nextLayer.count);
      
      currentLayerNodes.forEach(node1 => {
        for(let j=0; j<3; j++) {
            const node2 = nextLayerNodes[Math.floor(Math.random() * nextLayerNodes.length)];
            lines.push([node1, node2]);
        }
      });
      nodeIndexOffset += currentLayer.count;
    }
    
    const flatNodePositions = new Float32Array(nodes.flatMap(n => n.toArray()));
    const flatLineVertices = lines.map(line => [line[0], line[1]]);

    return { nodePositions: flatNodePositions, lineVertices: flatLineVertices };
  }, []);
  
  // CORREÇÃO: Adicionamos os tipos para 'state' e 'delta'.
  useFrame((state: RootState, delta: number) => {
    pulsesRef.current.forEach((pulse, index) => {
      pulse.progress += delta * pulse.speed;
      if (pulse.progress >= 1) {
        pulsesRef.current.splice(index, 1);
      }
    });

    if (Math.random() < pulseFrequency) {
        const startNodeIndex = Math.floor(Math.random() * LAYERS_CONFIG[0].count);
        const startNode = allNodesRef.current[startNodeIndex];
        const connection = lineVertices.find(line => line[0].equals(startNode));
        if (connection) {
            pulsesRef.current.push({
                from: connection[0],
                to: connection[1],
                progress: 0,
                speed: pulseSpeed * (0.8 + Math.random() * 0.4),
            });
        }
    }

    if (pulsePointsRef.current) {
        const positions = pulsePointsRef.current.geometry.attributes.position.array as Float32Array;
        pulsesRef.current.forEach((pulse, i) => {
            const currentPos = new THREE.Vector3().lerpVectors(pulse.from, pulse.to, pulse.progress);
            positions[i * 3] = currentPos.x;
            positions[i * 3 + 1] = currentPos.y;
            positions[i * 3 + 2] = currentPos.z;
        });
        for(let i = pulsesRef.current.length; i < 500; i++) {
            positions[i * 3] = 1000;
        }
        pulsePointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      <Points positions={nodePositions}>
        <pointsMaterial color={nodeColor} size={nodeSize} sizeAttenuation depthWrite={false} />
      </Points>
      {lineVertices.map((points, i) => (
        <Line key={i} points={points} color={lineColor} lineWidth={0.5} transparent opacity={0.1} derivatives={undefined} />
      ))}
      <Points ref={pulsePointsRef} positions={new Float32Array(500 * 3)}>
        <pointsMaterial color={pulseColor} size={pulseSize} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
      </Points>
    </group>
  );
}