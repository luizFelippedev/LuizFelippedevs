'use client'; // <-- CORREÇÃO
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

interface ControlsProps {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
}

const Controls: React.FC<ControlsProps> = ({ scene, camera, renderer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    wireframe: false,
    rotation: true,
    particles: true,
    grid: true,
    fog: true,
    autoRotate: true
  });

  useEffect(() => {
    if (!scene) return;

    // Apply wireframe setting
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh && object.material instanceof THREE.MeshPhysicalMaterial) {
        object.material.wireframe = settings.wireframe;
      }
    });

    // Apply particles visibility
    scene.traverse((object) => {
      if (object instanceof THREE.Points) {
        object.visible = settings.particles;
      }
    });

    // Apply grid visibility
    scene.traverse((object) => {
      if (object instanceof THREE.GridHelper) {
        object.visible = settings.grid;
      }
    });

    // Apply fog setting
    if (settings.fog) {
      scene.fog = new THREE.Fog(0x0f172a, 10, 50);
    } else {
      scene.fog = null;
    }
  }, [settings, scene]);

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleReset = () => {
    if (!camera) return;
    
    // Reset camera position
    camera.position.set(0, 2, 8);
    camera.rotation.set(0, 0, 0);
    
    // Reset settings
    setSettings({
      wireframe: false,
      rotation: true,
      particles: true,
      grid: true,
      fog: true,
      autoRotate: true
    });
  };

  const handleScreenshot = () => {
    if (!renderer) return;
    
    const link = document.createElement('a');
    link.download = 'scene3d-screenshot.png';
    link.href = renderer.domElement.toDataURL();
    link.click();
  };

  const controlItems = [
    { key: 'wireframe', label: 'Wireframe', icon: '📐' },
    { key: 'rotation', label: 'Rotation', icon: '🔄' },
    { key: 'particles', label: 'Particles', icon: '✨' },
    { key: 'grid', label: 'Grid', icon: '⚡' },
    { key: 'fog', label: 'Fog', icon: '🌫️' },
    { key: 'autoRotate', label: 'Auto Rotate', icon: '🔁' }
  ];

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 right-4 z-50 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle 3D Controls"
      >
        <motion.svg
          className="w-6 h-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </motion.svg>
      </motion.button>

      {/* Control Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute top-20 right-4 z-50 w-72 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-white/10">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>🎨</span>
                Scene Controls
              </h3>
              <p className="text-xs text-gray-400 mt-1">Customize the 3D experience</p>
            </div>

            {/* Controls */}
            <div className="p-4 space-y-3">
              {controlItems.map((item) => (
                <motion.div
                  key={item.key}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-sm font-medium text-white">
                      {item.label}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handleToggle(item.key as keyof typeof settings)}
                    className={`relative w-12 h-6 rounded-full transition-all ${
                      settings[item.key as keyof typeof settings]
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                        : 'bg-gray-600'
                    }`}
                  >
                    <motion.div
                      className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-md"
                      animate={{
                        x: settings[item.key as keyof typeof settings] ? 24 : 0
                      }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="p-4 border-t border-white/10 space-y-2">
              <motion.button
                onClick={handleScreenshot}
                className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Take Screenshot
              </motion.button>

              <motion.button
                onClick={handleReset}
                className="w-full px-4 py-2.5 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset View
              </motion.button>
            </div>

            {/* Info */}
            <div className="px-4 py-3 bg-white/5 border-t border-white/10">
              <p className="text-xs text-gray-400 text-center">
                💡 Drag to rotate • Scroll to zoom
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Controls;