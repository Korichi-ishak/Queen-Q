import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

// Register GSAP plugins
gsap.registerPlugin(Flip);

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

export const Deck3D: React.FC<Deck3DProps> = ({ onCardDraw, className = '' }) => {
  const deckRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isDealing, setIsDealing] = useState(false);

  useEffect(() => {
    if (!deckRef.current) return;

    // Create 3D rotation timeline as specified
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

  const deal = () => {
    if (!deckRef.current || !timelineRef.current || isDealing) return;
    
    setIsDealing(true);
    
    const tl = timelineRef.current;
    tl.pause();
    
    const state = Flip.getState(deckRef.current);
    deckRef.current.classList.add('is-single');
    
    Flip.from(state, { 
      duration: 0.6, 
      ease: 'expo.out',
      onComplete: () => {
        const selectedCard = frameToArchetype(tl.progress());
        onCardDraw(selectedCard);
        setIsDealing(false);
      }
    });
  };

  return (
    <div
      ref={deckRef}
      onClick={deal}
      className={`relative z-30 w-80 h-[28rem] lg:w-[24rem] lg:h-[34rem] min-w-[20rem] cursor-pointer deck-container ${className}`}
      aria-label="Deck de cartes – cliquez pour tirer"
      tabIndex={0}
      role="button"
    >
      {/* Multiple card layers for 3D effect */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-lg border-2 border-imperial-gold/30 bg-gradient-to-br from-royal-purple via-royal-purple/90 to-royal-purple/80 shadow-2xl backdrop-blur-sm"
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
    </div>
  );
}; 