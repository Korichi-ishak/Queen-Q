import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useTranslation } from '../context/TranslationContext';

interface CardDeckProps {
  onCardDraw: (cardName: string) => void;
}

// Liste des 54 archétypes pour mapping
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

export const CardDeck: React.FC<CardDeckProps> = ({ onCardDraw }) => {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [drawnCard, setDrawnCard] = useState<string | null>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    // Créer la timeline GSAP pour animer le spritesheet
    const tl = gsap.timeline({ 
      repeat: -1, 
      ease: "none"
    });

    // Animation de 54 frames (9x6 grid)
    // Chaque frame dure 1/24 seconde (24 fps)
    tl.to(cardRef.current, {
      backgroundPosition: "-540px 0px", // 9 cartes × 60px width
      duration: 54 / 24, // 54 frames à 24fps
      ease: "steps(8)" // 8 steps pour 9 cartes (0-8)
    }).to(cardRef.current, {
      backgroundPosition: "0px -80px", // Passer à la ligne suivante
      duration: 0,
    }).to(cardRef.current, {
      backgroundPosition: "-540px -80px",
      duration: 54 / 24,
      ease: "steps(8)"
    }).to(cardRef.current, {
      backgroundPosition: "0px -160px",
      duration: 0,
    });

    // Continuer pour les 6 lignes...
    for (let row = 2; row < 6; row++) {
      tl.to(cardRef.current, {
        backgroundPosition: `-540px -${row * 80}px`,
        duration: 54 / 24,
        ease: "steps(8)"
      }).to(cardRef.current, {
        backgroundPosition: `0px -${(row + 1) * 80}px`,
        duration: 0,
      });
    }

    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  const handleCardDraw = () => {
    if (!timelineRef.current || !isPlaying) return;

    // Pauser la timeline
    timelineRef.current.pause();
    setIsPlaying(false);

    // Calculer la frame actuelle
    const progress = timelineRef.current.progress();
    const currentFrame = Math.floor(progress * 54);
    const selectedCard = ARCHETYPES[currentFrame] || ARCHETYPES[0];
    
    setDrawnCard(selectedCard);
    onCardDraw(selectedCard);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.code === 'Space') {
      event.preventDefault();
      handleCardDraw();
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* Card deck container */}
      <div
        ref={cardRef}
        className="relative w-[120px] h-[160px] cursor-pointer border-2 border-imperial-gold/30 rounded-lg shadow-2xl transition-all duration-300 hover:border-imperial-gold hover:shadow-imperial-gold/20 hover:shadow-2xl"
        style={{
          backgroundImage: `url('/src/assets/sprites/54-cards.png')`,
          backgroundSize: '540px 480px', // 9×6 grid, each card 60×80px
          backgroundPosition: '0px 0px',
          backgroundRepeat: 'no-repeat'
        }}
        onClick={handleCardDraw}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
                    aria-label={isPlaying ? t('accessibility.clickToDraw') : `${t('accessibility.cardDrawn')}: ${drawnCard}`}
        aria-live="polite"
      />
      
      {/* Deal me a card button */}
      {isPlaying && (
        <button
          onClick={handleCardDraw}
          className="mt-6 px-8 py-3 bg-imperial-gold hover:bg-imperial-gold/90 text-royal-purple font-playfair font-bold text-lg rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-imperial-gold/30"
        >
          {t('cardDeck.dealCard')}
        </button>
      )}

      {/* Card drawn state */}
      {!isPlaying && drawnCard && (
        <div className="mt-6 text-center">
          <h3 className="text-imperial-gold font-playfair font-bold text-xl mb-2">
            {t('cardDeck.yourArchetype')}
          </h3>
          <p className="text-rose-champagne font-inter text-lg">
            {drawnCard}
          </p>
        </div>
      )}
    </div>
  );
}; 