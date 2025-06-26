import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

// Register GSAP plugins
gsap.registerPlugin(Flip);

interface Deck3DProps {
  onCardDraw: (cardName: string) => void;
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

export const Deck3D: React.FC<Deck3DProps> = ({ onCardDraw }) => {
  const deckRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isSpinning, setIsSpinning] = useState(true);
  const [drawnCard, setDrawnCard] = useState<string | null>(null);
  const [isDealing, setIsDealing] = useState(false);

  useEffect(() => {
    if (!deckRef.current) return;

    // Create 3D rotation timeline as specified
    const tl = gsap.timeline({ 
      repeat: -1, 
      ease: 'none'
    });
    
    tl.to(deckRef.current, { 
      rotationY: '+=360', 
      transformPerspective: 800, 
      duration: 6,
      ease: 'none'
    });

    timelineRef.current = tl;

    // Set initial 3D styles
    gsap.set(deckRef.current, {
      transformStyle: 'preserve-3d',
      transformPerspective: 800,
    });

    // Add keyboard listener for space key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' && !isDealing) {
        event.preventDefault();
        handleDealCard();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      tl.kill();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDealing]);

  // Convert timeline progress to archetype
  const frameToArchetype = (progress: number): string => {
    const frameIndex = Math.floor(progress * ARCHETYPES.length);
    return ARCHETYPES[frameIndex % ARCHETYPES.length];
  };

  const handleDealCard = () => {
    if (!deckRef.current || !timelineRef.current || isDealing) return;

    setIsDealing(true);

    // Pause the spinning animation
    timelineRef.current.pause();
    setIsSpinning(false);

    // Get current state for Flip animation
    const state = Flip.getState(deckRef.current);
    
    // Add the single card class
    deckRef.current.classList.add('is-single');
    
    // Perform Flip animation as specified
    Flip.from(state, { 
      duration: 0.6, 
      ease: 'expo.out',
      onComplete: () => {
        // Select card based on timeline progress
        const selectedCard = frameToArchetype(timelineRef.current?.progress() || Math.random());
        setDrawnCard(selectedCard);
        onCardDraw(selectedCard);
        setIsDealing(false);
      }
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.code === 'Space') {
      event.preventDefault();
      handleDealCard();
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* 3D Card Deck */}
      <div
        ref={deckRef}
        className={`
          relative w-48 h-72 md:w-56 md:h-84 cursor-pointer transition-all duration-300
          ${isSpinning ? 'hover:scale-105' : ''}
          ${isDealing ? 'pointer-events-none' : ''}
          deck-container
        `}
        onClick={handleDealCard}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={isSpinning ? "Click to deal a card" : `Card drawn: ${drawnCard}`}
        aria-live="polite"
      >
        {/* Multiple card layers for 3D effect */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`
              absolute inset-0 rounded-lg border-2 transition-all duration-300
              ${isSpinning 
                ? 'border-imperial-gold/30 bg-gradient-to-br from-royal-purple via-royal-purple/90 to-royal-purple/80' 
                : 'border-imperial-gold bg-gradient-to-br from-imperial-gold via-imperial-gold/90 to-rose-champagne'
              }
              shadow-2xl backdrop-blur-sm
            `}
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
                  <div className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 border border-imperial-gold/30 rounded-full"></div>
                  <div className="absolute top-0.5 sm:top-1 left-1/2 transform -translate-x-1/2">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 bg-imperial-gold/40 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Single card state */}
        {!isSpinning && drawnCard && (
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-rose-champagne via-imperial-gold to-imperial-gold border-2 border-imperial-gold shadow-2xl flex items-center justify-center text-center p-4">
            <div>
              <h3 className="text-royal-purple font-playfair font-bold text-xs sm:text-sm lg:text-base leading-tight">
                {drawnCard}
              </h3>
            </div>
          </div>
        )}
      </div>



      {/* Card result */}
      {!isSpinning && drawnCard && (
        <div className="mt-6 sm:mt-8 text-center animate-fade-in px-4">
          <h3 className="text-imperial-gold font-playfair font-bold text-lg sm:text-xl mb-2">
            Your Royal Archetype
          </h3>
          <p className="text-rose-champagne/80 font-inter text-sm sm:text-base max-w-xs mx-auto">
            This archetype reveals unique insights about your royal essence
          </p>
        </div>
      )}
    </div>
  );
}; 