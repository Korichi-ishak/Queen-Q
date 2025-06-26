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
  const performanceRef = useRef({ frameCount: 0, lastCheck: Date.now() });

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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles - tiny gold dots drifting down
    const particleCount = Math.min(30, Math.floor((canvas.width * canvas.height) / 20000));
    particlesRef.current = [];

    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(createParticle(canvas.width, canvas.height));
    }

    // 30 fps animation loop as specified
    let lastTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= frameInterval) {
        // Performance monitoring to maintain ≥ 60fps
        performanceRef.current.frameCount++;
        const now = Date.now();
        if (now - performanceRef.current.lastCheck > 2000) { // Check every 2 seconds
          const fps = (performanceRef.current.frameCount * 1000) / (now - performanceRef.current.lastCheck);
          if (fps < 50 && particlesRef.current.length > 10) {
            // Reduce particle count if performance is poor
            particlesRef.current = particlesRef.current.slice(0, Math.floor(particlesRef.current.length * 0.8));
          }
          performanceRef.current = { frameCount: 0, lastCheck: now };
        }

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

        lastTime = currentTime;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const createParticle = (width: number, height: number): Particle => {
    const maxLife = 400 + Math.random() * 300;
    return {
      x: Math.random() * width,
      y: -10, // Start above the screen
      size: 1 + Math.random() * 2, // Smaller particles
      speedX: (Math.random() - 0.5) * 0.3, // Gentle horizontal drift
      speedY: 0.2 + Math.random() * 0.5, // Drifting down
      opacity: 0,
      life: maxLife,
      maxLife
    };
  };

  const updateParticle = (particle: Particle) => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;
    particle.life--;

    // Reset particle when it goes off screen
    if (particle.y > window.innerHeight + 10) {
      particle.y = -10;
      particle.x = Math.random() * window.innerWidth;
      particle.life = particle.maxLife;
    }

    // Fade in/out with gentle sparkle
    const lifePercent = particle.life / particle.maxLife;
    if (lifePercent > 0.9) {
      particle.opacity = (1 - lifePercent) * 10; // Quick fade in
    } else if (lifePercent < 0.1) {
      particle.opacity = lifePercent * 10; // Quick fade out
    } else {
      particle.opacity = Math.min(0.4, 0.2 + Math.random() * 0.2); // Gentle twinkle
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