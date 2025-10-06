'use client'; // <-- CORREÇÃO
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import Controls from './Controls';

interface Scene3DProps {
  className?: string;
}

const Scene3D: React.FC<Scene3DProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0f172a, 10, 50);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 8;
    camera.position.y = 2;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0f172a, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xa855f7, 2, 50);
    pointLight1.position.set(5, 5, 5);
    pointLight1.castShadow = true;
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xec4899, 1.5, 50);
    pointLight2.position.set(-5, 3, -5);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x8b5cf6, 1, 30);
    pointLight3.position.set(0, -5, 0);
    scene.add(pointLight3);

    // Geometric shapes group
    const meshGroup = new THREE.Group();
    meshGroupRef.current = meshGroup;
    scene.add(meshGroup);

    // Create various geometric shapes
    const geometries = [
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TetrahedronGeometry(1, 0),
      new THREE.BoxGeometry(1.5, 1.5, 1.5),
      new THREE.TorusGeometry(1, 0.4, 16, 32)
    ];

    const material = new THREE.MeshPhysicalMaterial({
      color: 0xa855f7,
      metalness: 0.7,
      roughness: 0.2,
      transparent: true,
      opacity: 0.9,
      wireframe: false,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.2
    });

    // Position shapes in 3D space
    const positions = [
      { x: -3, y: 2, z: -2 },
      { x: 3, y: -1, z: -3 },
      { x: 0, y: 3, z: -5 },
      { x: -2, y: -2, z: -1 },
      { x: 2, y: 1, z: -4 }
    ];

    geometries.forEach((geometry, index) => {
      const mesh = new THREE.Mesh(geometry, material.clone());
      const pos = positions[index] || { x: 0, y: 0, z: 0 };
      mesh.position.set(pos.x, pos.y, pos.z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      
      // Random rotation
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      meshGroup.add(mesh);
    });

    // Particle system
    const particleCount = 1000;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 50;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      particleSizes[i] = Math.random() * 2 + 1;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xa855f7,
      size: 0.1,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    particlesRef.current = particles;
    scene.add(particles);

    // Grid helper
    const gridHelper = new THREE.GridHelper(20, 20, 0x8b5cf6, 0x1e1b4b);
    gridHelper.position.y = -3;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.2;
    scene.add(gridHelper);

    // Mouse interaction
    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      targetRotation.x = mouse.y * 0.3;
      targetRotation.y = mouse.x * 0.3;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer || !container) return;
      
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate mesh group
      if (meshGroup) {
        meshGroup.rotation.x += (targetRotation.x - meshGroup.rotation.x) * 0.05;
        meshGroup.rotation.y += (targetRotation.y - meshGroup.rotation.y) * 0.05;

        // Rotate individual meshes
        meshGroup.children.forEach((mesh, index) => {
          if (mesh instanceof THREE.Mesh) {
            mesh.rotation.x += 0.002 * (index + 1);
            mesh.rotation.y += 0.003 * (index + 1);
            
            // Float animation
            mesh.position.y += Math.sin(elapsedTime + index) * 0.002;
          }
        });
      }

      // Animate particles
      if (particles) {
        particles.rotation.y = elapsedTime * 0.05;
        
        const positions = particles.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] += Math.sin(elapsedTime + positions[i]) * 0.001;
        }
        particles.geometry.attributes.position.needsUpdate = true;
      }

      // Animate lights
      pointLight1.position.x = Math.sin(elapsedTime * 0.5) * 5;
      pointLight1.position.z = Math.cos(elapsedTime * 0.5) * 5;
      
      pointLight2.position.x = Math.cos(elapsedTime * 0.3) * 5;
      pointLight2.position.z = Math.sin(elapsedTime * 0.3) * 5;

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      // Dispose geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div ref={containerRef} className="w-full h-full" />
      
      {isLoaded && (
        <Controls
          scene={sceneRef.current}
          camera={cameraRef.current}
          renderer={rendererRef.current}
        />
      )}
    </div>
  );
};

export default Scene3D;