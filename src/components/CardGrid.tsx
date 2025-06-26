import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { archetypes } from '../data/archetypes';
import { Link } from 'react-router-dom';

// Générer les chemins d'accès pour les 54 cartes
const generateCardPaths = () => {
  const cards = [];
  for (let i = 1; i <= 54; i++) {
    cards.push({
      id: i,
      // Utiliser l'image placeholder en attendant les vraies images
      path: `/assets/cards/placeholder.svg`,
      name: archetypes[i - 1] || `Carte n° ${i}`,
      number: i
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
  };
}

const Card: React.FC<CardProps> = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Vérifier la préférence de réduction de mouvement
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleFlip = () => {
    if (!prefersReducedMotion) {
      setIsFlipped(true);
      setTimeout(() => setIsFlipped(false), 1000); // Revenir à l'état initial après 1 seconde
    }
  };

  return (
    <div className="relative">
      {/* Effet de surbrillance dorée */}
      <motion.div 
        className="absolute inset-0 rounded-lg bg-imperial-gold/30 blur-md z-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isFlipped ? 0.6 : 0,
          scale: isFlipped ? 1.1 : 0.8
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
      
      <motion.button
        className="card-container aspect-[2/3] relative w-full rounded-lg overflow-hidden shadow-md focus:outline-none focus:ring-2 focus:ring-imperial-gold focus:ring-offset-2 focus:ring-offset-royal-purple z-10"
        onClick={handleFlip}
        onKeyDown={(e) => e.key === 'Enter' && handleFlip()}
        aria-label={`${card.name}, Carte numéro ${card.number}`}
        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
        whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      >
        <motion.div
          className="card-inner w-full h-full relative"
          animate={{ 
            rotateX: isFlipped ? 180 : 0,
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div 
            className="card-face absolute inset-0 rounded-lg bg-gradient-to-br from-royal-purple/80 to-royal-purple/60 border border-imperial-gold/30 backface-hidden"
          >
            <img 
              src={card.path} 
              alt={card.name} 
              className="w-full h-full object-contain rounded-lg"
              loading="lazy"
              width="300"
              height="450"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="text-imperial-gold font-playfair font-bold text-sm sm:text-base text-center">
                {card.number}
              </div>
            </div>
          </div>
          <div 
            className="card-back absolute inset-0 rounded-lg bg-gradient-to-br from-imperial-gold/20 to-royal-purple/80 border border-imperial-gold/50 backface-hidden"
            style={{ transform: 'rotateX(180deg)' }}
          >
            <div className="flex flex-col items-center justify-center h-full p-4">
              <div className="text-imperial-gold font-playfair font-bold text-lg sm:text-xl text-center mb-2">
                {card.name}
              </div>
              <div className="text-rose-champagne/80 text-sm text-center">
                Carte n° {card.number}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.button>
    </div>
  );
};

export const CardGrid: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-royal-purple to-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-imperial-gold mb-8 text-center">
          Les 54 Cartes
        </h1>
        
        <p className="text-rose-champagne/80 max-w-3xl mx-auto text-center mb-12">
          Découvrez les 54 archétypes royaux de Queen de Q. Survolez ou touchez une carte pour la retourner.
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link 
            to="/"
            className="inline-flex items-center px-6 py-3 bg-imperial-gold hover:bg-imperial-gold/90 text-royal-purple font-playfair font-bold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-imperial-gold focus:ring-offset-2 focus:ring-offset-royal-purple"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </section>
  );
}; 