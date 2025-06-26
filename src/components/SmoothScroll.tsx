import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      return; // Skip smooth scroll if user prefers reduced motion
    }

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  // Handle parallax data-speed attributes
  useEffect(() => {
    if (!lenisRef.current) return;

    const handleScroll = () => {
      const elements = document.querySelectorAll('[data-speed]');
      
      elements.forEach((element) => {
        const speed = parseFloat(element.getAttribute('data-speed') || '1');
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Calculate transform based on scroll position
        if (elementTop < windowHeight && elementTop + elementHeight > 0) {
          const scrolled = (windowHeight - elementTop) * speed;
          (element as HTMLElement).style.transform = `translateY(${scrolled * 0.1}px)`;
        }
      });
    };

    lenisRef.current.on('scroll', handleScroll);

    return () => {
      if (lenisRef.current) {
        lenisRef.current.off('scroll', handleScroll);
      }
    };
  }, []);

  return <>{children}</>;
}; 