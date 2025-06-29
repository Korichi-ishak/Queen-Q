import React, { useState, useEffect, useRef, useCallback } from 'react';
import Tilt from 'react-parallax-tilt';
import gsap from 'gsap';
import type { CardData } from '../data/cards';

interface CardProps {
  card: CardData;
  index: number;
  t: (key: string, variables?: any) => string;
}

export const Card: React.FC<CardProps> = ({ card, index, t }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Vérifier la préférence de réduction de mouvement
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Animation d'entrée simple
  useEffect(() => {
    if (cardRef.current && !prefersReducedMotion) {
      gsap.fromTo(cardRef.current, 
        { 
          opacity: 0, 
          y: 20 
        },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.4,
          delay: index * 0.02, // Stagger léger
          ease: "power2.out"
        }
      );
    }
  }, [index, prefersReducedMotion]);

  // Flip simple de la carte
  const handleFlip = useCallback(() => {
    setIsFlipped(true);
    
    // Retour automatique après 10 secondes
    setTimeout(() => setIsFlipped(false), 10000);
  }, []);

  return (
    <div 
      ref={cardRef}
      className="relative card-item"
    >
      <Tilt
        tiltMaxAngleX={prefersReducedMotion ? 0 : 8}
        tiltMaxAngleY={prefersReducedMotion ? 0 : 8}
        perspective={1000}
        transitionSpeed={300}
        scale={1.02}
        glareEnable={true}
        glareMaxOpacity={0.1}
        glareColor="#D6AE60"
        className="h-full"
      >
        <button
          className="card-container aspect-[7/12] relative w-full h-full rounded-lg overflow-hidden shadow-lg focus:outline-none focus:ring-2 focus:ring-imperial-gold focus:ring-offset-2 focus:ring-offset-royal-purple border border-imperial-gold/20 hover:border-imperial-gold/40 transition-all duration-300 hover:shadow-imperial-gold/20"
          onClick={handleFlip}
          onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && handleFlip()}
          aria-label={t('card.aria', { name: card.name, number: card.number })}
        >
          <div
            className={`card-inner w-full h-full relative transition-transform duration-500 transform-style-preserve-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* Face cachée : Dos de carte simple */}
            <div className="card-face absolute inset-0 rounded-lg bg-gradient-to-br from-royal-purple/90 to-royal-purple/70 backface-hidden">
              <div className="flex flex-col items-center justify-center h-full p-4">
                <div className="text-imperial-gold font-playfair font-bold text-lg text-center mb-2">
                  Queen de Q
                </div>
                <div className="text-rose-champagne/70 text-sm text-center">
                  {t('card.archetype')}
                </div>
              </div>
              
              {/* Numéro de carte */}
              <div className="absolute bottom-2 left-2 right-2 text-center">
                <div className="text-imperial-gold font-playfair font-bold text-sm">
                  {card.number}
                </div>
              </div>
            </div>
            
            {/* Face révélée : Image */}
            <div className="card-back absolute inset-0 rounded-lg backface-hidden overflow-hidden rotate-y-180">
              <img 
                src={card.path} 
                alt={card.name} 
                className="w-full h-full object-cover"
                loading="lazy"
                width="1152"
                height="768"
              />
              
              {/* Overlay simple */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <div className="text-imperial-gold font-playfair font-bold text-sm text-center">
                  {card.name}
                </div>
              </div>
            </div>
          </div>
        </button>
      </Tilt>
    </div>
  );
}; 