// C:\LF\luiz-felipe-portfolio\src\components\sections\Hero\Scene3DFallback.tsx
'use client'; // <-- CORREÇÃO
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Scene3DFallback: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setSize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    // Geometric shapes with pseudo-3D effect
    class Shape {
      x: number;
      y: number;
      z: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      type: 'cube' | 'pyramid' | 'hexagon';
      color: string;
      velocityX: number;
      velocityY: number;
      velocityZ: number;

      constructor() {
        if (!canvas) throw new Error('Canvas not initialized');
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1000;
        this.size = Math.random() * 40 + 20;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.type = ['cube', 'pyramid', 'hexagon'][Math.floor(Math.random() * 3)] as 'cube' | 'pyramid' | 'hexagon';
        
        const colors = [
          'rgba(168, 85, 247, 0.6)',   // purple
          'rgba(236, 72, 153, 0.6)',   // pink
          'rgba(139, 92, 246, 0.6)',   // violet
          'rgba(59, 130, 246, 0.6)'    // blue
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        this.velocityX = (Math.random() - 0.5) * 0.5;
        this.velocityY = (Math.random() - 0.5) * 0.5;
        this.velocityZ = Math.random() * 2 + 1;
      }

      update() {
        if (!canvas) return;
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.z -= this.velocityZ;
        this.rotation += this.rotationSpeed;

        // Reset if too close or out of bounds
        if (this.z < 1) {
          this.z = 1000;
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }

        // Wrap around screen
        if (this.x < -100) this.x = canvas.width + 100;
        if (this.x > canvas.width + 100) this.x = -100;
        if (this.y < -100) this.y = canvas.height + 100;
        if (this.y > canvas.height + 100) this.y = -100;
      }

      draw() {
        if (!ctx || !canvas) return;

        const scale = 1000 / (1000 + this.z);
        const x = this.x * scale + (canvas.width / 2) * (1 - scale);
        const y = this.y * scale + (canvas.height / 2) * (1 - scale);
        const size = this.size * scale;
        const opacity = 1 - this.z / 1000;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = opacity;

        // Parse color and add opacity
        const colorMatch = this.color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (colorMatch) {
          const [, r, g, b] = colorMatch;
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.8})`;
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }

        ctx.lineWidth = 2;

        // Draw shape based on type
        if (this.type === 'cube') {
          this.drawCube(size);
        } else if (this.type === 'pyramid') {
          this.drawPyramid(size);
        } else {
          this.drawHexagon(size);
        }

        ctx.restore();
      }

      drawCube(size: number) {
        if (!ctx) return;
        
        const offset = size * 0.3;
        
        // Back face
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(-size / 2 + offset, -size / 2 + offset, size, size);
        
        // Front face
        ctx.fillRect(-size / 2, -size / 2, size, size);
        ctx.strokeRect(-size / 2, -size / 2, size, size);
        
        // Connecting lines
        ctx.beginPath();
        ctx.moveTo(-size / 2, -size / 2);
        ctx.lineTo(-size / 2 + offset, -size / 2 + offset);
        ctx.moveTo(size / 2, -size / 2);
        ctx.lineTo(size / 2 + offset, -size / 2 + offset);
        ctx.moveTo(size / 2, size / 2);
        ctx.lineTo(size / 2 + offset, size / 2 + offset);
        ctx.moveTo(-size / 2, size / 2);
        ctx.lineTo(-size / 2 + offset, size / 2 + offset);
        ctx.stroke();
      }

      drawPyramid(size: number) {
        if (!ctx) return;
        
        ctx.beginPath();
        // Base
        ctx.moveTo(-size / 2, size / 2);
        ctx.lineTo(size / 2, size / 2);
        ctx.lineTo(size / 2, -size / 2);
        ctx.lineTo(-size / 2, -size / 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Apex lines
        const apexX = 0;
        const apexY = -size;
        
        ctx.beginPath();
        ctx.moveTo(-size / 2, size / 2);
        ctx.lineTo(apexX, apexY);
        ctx.moveTo(size / 2, size / 2);
        ctx.lineTo(apexX, apexY);
        ctx.moveTo(-size / 2, -size / 2);
        ctx.lineTo(apexX, apexY);
        ctx.moveTo(size / 2, -size / 2);
        ctx.lineTo(apexX, apexY);
        ctx.stroke();
      }

      drawHexagon(size: number) {
        if (!ctx) return;
        
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          const x = Math.cos(angle) * size;
          const y = Math.sin(angle) * size;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Inner hexagon for 3D effect
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          const x = Math.cos(angle) * size * 0.5;
          const y = Math.sin(angle) * size * 0.5;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.stroke();
      }
    }

    // Create shapes
    const shapes: Shape[] = [];
    const shapeCount = 30;
    
    for (let i = 0; i < shapeCount; i++) {
      shapes.push(new Shape());
    }

    // Mouse interaction
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let animationFrame: number;
    
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Mouse repulsion effect
      shapes.forEach(shape => {
        const dx = mouseX - shape.x;
        const dy = mouseY - shape.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          shape.x -= (dx / distance) * force * 3;
          shape.y -= (dy / distance) * force * 3;
        }
        
        shape.update();
        shape.draw();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', setSize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'linear-gradient(to bottom right, #0f172a, #1e1b4b, #0f172a)' }}
      />
      
      {/* Fallback message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 right-4 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-lg text-xs text-gray-400"
      >
        WebGL not supported - Using 2D fallback
      </motion.div>
    </div>
  );
};

export default Scene3DFallback;