import React, { useEffect, useRef } from 'react';

interface ParticleCanvasProps {
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  r: number;
  s: number;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return; // Skip animations for accessibility
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let w = canvas.width;
    let h = canvas.height;

    // Create 80 particles as specified
    const dots: Particle[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 1 + Math.random() * 2.5,
      s: 0.2 + Math.random() * 0.4,
    }));

    // Animation loop
    function loop() {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, w, h);
      
      dots.forEach((p, i) => {
        p.y += p.s;
        if (p.y > h) {
          p.y = -10;
          p.x = Math.random() * w; // Randomize x when resetting
        }
        
        // Varier la couleur - champagne une fois sur quatre
        ctx.fillStyle = i % 4 === 0 ? 'rgba(239,203,183,0.5)' : 'rgba(214,174,96,0.6)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationRef.current = requestAnimationFrame(loop);
    }

    loop();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-10 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}; 