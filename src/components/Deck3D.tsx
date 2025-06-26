import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface Deck3DProps {
  onCardDraw: (cardName: string) => void;
  className?: string;
}

const ARCHETYPES = [
  "The Empress", "The Warrior", "The Sage", "The Explorer", "The Lover",
  "The Jester", "The Caregiver", "The Creator", "The Rebel", "The Magician",
  "The Hero", "The Innocent", "The Sovereign", "The Scholar", "The Mystic",
  "The Guardian", "The Healer", "The Visionary", "The Mentor", "The Artist",
  "The Pioneer", "The Diplomat", "The Phoenix", "The Oracle", "The Catalyst",
  "The Architect", "The Storyteller", "The Alchemist", "The Protector", "The Dreamer",
  "The Challenger", "The Mediator", "The Transformer", "The Beacon", "The Voyager",
  "The Conductor", "The Scribe", "The Navigator", "The Harvester", "The Weaver",
  "The Knight", "The Priestess", "The Trickster", "The Judge", "The Liberator",
  "The Builder", "The Keeper", "The Wanderer", "The Flame", "The Mirror",
  "The Crown", "The Sword", "The Cup", "The Star"
];

function frameToArchetype(progress: number): string {
  const frameIndex = Math.floor(progress * ARCHETYPES.length);
  return ARCHETYPES[frameIndex % ARCHETYPES.length];
}

// Helper function for Plausible analytics
const trackEvent = (eventName: string, props?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible(eventName, { props });
  }
};

export const Deck3D: React.FC<Deck3DProps> = ({ onCardDraw, className = '' }) => {
  const deckRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isDealing, setIsDealing] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!deckRef.current || prefersReducedMotion) return;

    // Create 3D rotation timeline
    const tl = gsap.timeline({ repeat: -1, ease: 'none' });
    
    tl.to(deckRef.current, { 
      rotationY: '+=360', 
      transformPerspective: 800, 
      duration: 6 
    });

    timelineRef.current = tl;

    // Set initial 3D styles
    gsap.set(deckRef.current, {
      transformStyle: 'preserve-3d',
      transformPerspective: 800,
    });

    return () => {
      tl.kill();
    };
  }, []);

  // Handle Space key globally
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        dealCard();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const dealCard = () => {
    if (isDealing) return;
    
    setIsDealing(true);
    
    // Pause rotation
    if (timelineRef.current) {
      timelineRef.current.pause();
    }
    
    // Get current card based on rotation progress
    const progress = timelineRef.current?.progress() || Math.random();
    const selectedCard = frameToArchetype(progress);
    
    // Track card pick event
    trackEvent('card_pick', { card: selectedCard });
    
    // Scale animation
    gsap.timeline()
      .to(deckRef.current, { 
        scale: 1.1, 
        duration: 0.3, 
        ease: 'power2.out' 
      })
      .to(deckRef.current, { 
        scale: 1, 
        duration: 0.4, 
        ease: 'power2.inOut',
        onComplete: () => {
          onCardDraw(selectedCard);
          setIsDealing(false);
          
          // Announce for screen readers
          const announcement = document.createElement('div');
          announcement.setAttribute('aria-live', 'polite');
          announcement.className = 'sr-only';
          announcement.textContent = `Card drawn: ${selectedCard}`;
          document.body.appendChild(announcement);
          setTimeout(() => document.body.removeChild(announcement), 1000);
        }
      });
  };

  return (
    <div
      ref={deckRef}
      onClick={dealCard}
      className={`relative z-20 w-56 h-80 md:w-72 md:h-96 cursor-pointer deck-container ${className}`}
      aria-label="Deck de cartes – cliquez pour tirer"
      aria-describedby="cardHint"
      tabIndex={0}
      role="button"
    >
      {/* Multiple card layers for 3D effect */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-lg border-2 border-imperial-gold/30 bg-gradient-to-br from-royal-purple via-royal-purple/90 to-royal-purple/80 shadow-2xl"
          style={{
            transform: `translateZ(${i * 2}px) rotateX(${i * 1}deg)`,
            zIndex: 5 - i,
            opacity: 1 - (i * 0.1)
          }}
        >
          {/* Card back pattern */}
          <div className="absolute inset-2 rounded border border-imperial-gold/20 bg-royal-purple/50">
            <div className="absolute inset-2 rounded border border-imperial-gold/10 bg-gradient-to-br from-transparent to-imperial-gold/5">
              {/* Crown motif */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-6 h-6 md:w-8 md:h-8 border border-imperial-gold/30 rounded-full"></div>
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-imperial-gold/40 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Screen reader hint */}
      <p id="cardHint" className="sr-only">Press Space or click to draw a card</p>
    </div>
  );
}; 