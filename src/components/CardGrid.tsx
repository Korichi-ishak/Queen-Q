import React, { useState, useEffect, useRef, useCallback } from 'react';
import { archetypes } from '../data/archetypes';
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import gsap from 'gsap';
import { useTranslation } from '../hooks/useTranslation';

// Import des images Ace
import AceOfSpades from '../assets/Ace of Spades.jpeg';
import AceOfDiamonds from '../assets/Ace of Diamonds.jpeg';

// Générateur simple des cartes
const generateCardPaths = () => {
  const cards = [];
  
  for (let i = 1; i <= 54; i++) {
    let cardPath = `/assets/cards/placeholder.svg`;
    let cardName = archetypes[i - 1] || `Archétype n° ${i}`;
    let isSpecial = false;

    // Utiliser les images Ace pour les cartes 1 et 2
    if (i === 1) {
      cardPath = AceOfSpades;
      cardName = "Ace of Spades";
      isSpecial = true;
    } else if (i === 2) {
      cardPath = AceOfDiamonds;
      cardName = "Ace of Diamonds";
      isSpecial = true;
    }

    cards.push({
      id: i,
      path: cardPath,
      name: cardName,
      number: i,
      isSpecial
    });
  }
  return cards;
};

const cards = generateCardPaths();

interface CardProps {
  card: {
    id: number;
    path: string;
    name: string;
    number: number;
    isSpecial?: boolean;
  };
  index: number;
}

const Card: React.FC<CardProps> = ({ card, index }) => {
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
          aria-label={`Carte ${card.name}, numéro ${card.number}. Cliquez pour révéler.`}
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
                  Archétype
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

export const CardGrid: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-royal-purple via-black to-royal-purple min-h-screen relative overflow-hidden">
      {/* Arrière-plan subtil avec étoiles flottantes */}
      <div className="absolute inset-0 opacity-30">
        {/* Étoiles statiques */}
        <div className="absolute top-20 left-10 w-1 h-1 bg-imperial-gold rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-imperial-gold rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-imperial-gold rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-60 right-1/3 w-1 h-1 bg-imperial-gold rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-20 right-10 w-1.5 h-1.5 bg-imperial-gold rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
        
        {/* Voiles mystiques */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-imperial-gold/5 to-transparent animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-transparent via-imperial-gold/3 to-transparent animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* En-tête simple */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-imperial-gold mb-4">
            {t('cards.title')}
          </h1>
          <p className="text-rose-champagne/80 max-w-3xl mx-auto text-lg">
            {t('cards.description')}
          </p>
        </div>
        
        {/* Grille de cartes simple */}
        <div 
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 sm:gap-5 md:gap-6"
        >
          {cards.map((card, index) => (
            <Card key={card.id} card={card} index={index} />
          ))}
        </div>
        
        {/* Bouton de retour simple */}
        <div className="mt-16 text-center">
          <Link 
            to="/"
            className="inline-flex items-center px-6 py-3 bg-imperial-gold hover:bg-imperial-gold/90 text-royal-purple font-playfair font-bold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-imperial-gold focus:ring-offset-2 focus:ring-offset-royal-purple"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            {t('cards.returnHome')}
          </Link>
        </div>
      </div>
    </section>
  );
}; 