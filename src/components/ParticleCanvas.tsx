import React, { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000));
    particlesRef.current = [];

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(createParticle(canvas.width, canvas.height));
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        updateParticle(particle);
        drawParticle(ctx, particle);

        // Remove dead particles and create new ones
        if (particle.life <= 0) {
          particlesRef.current[index] = createParticle(canvas.width, canvas.height);
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const createParticle = (width: number, height: number): Particle => {
    const maxLife = 300 + Math.random() * 200;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1 + Math.random() * 3,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: 0,
      life: maxLife,
      maxLife
    };
  };

  const updateParticle = (particle: Particle) => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;
    particle.life--;

    // Fade in/out
    const lifePercent = particle.life / particle.maxLife;
    if (lifePercent > 0.8) {
      particle.opacity = (1 - lifePercent) * 5; // Fade in
    } else if (lifePercent < 0.2) {
      particle.opacity = lifePercent * 5; // Fade out
    } else {
      particle.opacity = Math.min(0.6, 0.3 + Math.random() * 0.3); // Twinkle
    }
  };

  const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.save();
    ctx.globalAlpha = particle.opacity;
    
    // Create golden gradient
    const gradient = ctx.createRadialGradient(
      particle.x, particle.y, 0,
      particle.x, particle.y, particle.size * 2
    );
    gradient.addColorStop(0, '#D6AE60'); // Imperial gold
    gradient.addColorStop(0.5, '#D4B5A5'); // Rose champagne
    gradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
    
    // Add sparkle effect
    if (Math.random() > 0.95) {
      ctx.strokeStyle = '#D6AE60';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(particle.x - particle.size, particle.y);
      ctx.lineTo(particle.x + particle.size, particle.y);
      ctx.moveTo(particle.x, particle.y - particle.size);
      ctx.lineTo(particle.x, particle.y + particle.size);
      ctx.stroke();
    }
    
    ctx.restore();
  };

  return (
    <canvas
      ref={canvasRef}
      id="particles"
      className="absolute inset-0 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
      aria-hidden="true"
    />
  );
}; 