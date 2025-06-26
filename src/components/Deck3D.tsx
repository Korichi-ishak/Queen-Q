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

    // Create 3D rotation timeline
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

    return () => {
      tl.kill();
    };
  }, []);

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
    
    // Perform Flip animation
    Flip.from(state, { 
      duration: 0.6, 
      ease: 'expo.out',
      onComplete: () => {
        // Select random card after animation
        const randomIndex = Math.floor(Math.random() * ARCHETYPES.length);
        const selectedCard = ARCHETYPES[randomIndex];
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
          relative w-32 h-44 md:w-40 md:h-56 cursor-pointer transition-all duration-300
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
                  <div className="w-8 h-8 border-2 border-imperial-gold/30 rounded-full"></div>
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
                    <div className="w-2 h-2 bg-imperial-gold/40 rounded-full"></div>
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
              <h3 className="text-royal-purple font-playfair font-bold text-sm md:text-base leading-tight">
                {drawnCard}
              </h3>
            </div>
          </div>
        )}
      </div>

      {/* Deal button */}
      {isSpinning && (
        <button
          onClick={handleDealCard}
          disabled={isDealing}
          className={`
            mt-8 px-8 py-4 bg-imperial-gold hover:bg-imperial-gold/90 
            text-royal-purple font-playfair font-bold text-lg rounded-lg 
            transition-all duration-300 transform hover:scale-105 
            hover:shadow-xl hover:shadow-imperial-gold/30
            focus-visible:ring-2 ring-imperial-gold ring-offset-2 ring-offset-royal-purple
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
            group relative overflow-hidden
          `}
        >
          {/* Ripple effect */}
          <span className="absolute inset-0 bg-white/20 rounded-lg transform scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"></span>
          <span className="relative z-10">
            {isDealing ? 'Dealing...' : 'Deal me a card ↗'}
          </span>
        </button>
      )}

      {/* Card result */}
      {!isSpinning && drawnCard && (
        <div className="mt-8 text-center animate-fade-in">
          <h3 className="text-imperial-gold font-playfair font-bold text-xl mb-2">
            Your Royal Archetype
          </h3>
          <p className="text-rose-champagne/80 font-inter text-sm">
            This archetype reveals unique insights about your royal essence
          </p>
        </div>
      )}
    </div>
  );
}; 