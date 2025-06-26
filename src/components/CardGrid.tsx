import React, { useState, useEffect, useRef } from 'react';
import { archetypes } from '../data/archetypes';
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n/LanguageContext';

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Générer les chemins d'accès pour les 54 cartes
const generateCardPaths = () => {
  const cards = [];
  for (let i = 1; i <= 54; i++) {
    // Utiliser une hauteur fixe pour éviter le positionnement aléatoire
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
  index: number;
}

const Card: React.FC<CardProps> = ({ card, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Vérifier la préférence de réduction de mouvement
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Animation d'entrée avec GSAP
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { 
          opacity: 0, 
          y: 30 
        },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5,
          delay: index * 0.05, // Stagger de 50ms par carte
          ease: "power3.out"
        }
      );
    }
  }, [index]);

  const handleFlip = () => {
    if (!prefersReducedMotion) {
      setIsFlipped(true);
      
      // Déclencher des particules au premier flip
      if (!showSparkles) {
        setShowSparkles(true);
        
        // Créer des particules dorées
        if (cardRef.current) {
          const card = cardRef.current;
          
          // Créer 3-4 particules
          for (let i = 0; i < 3 + Math.floor(Math.random()); i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'absolute w-1 h-1 rounded-full bg-imperial-gold sparkle';
            sparkle.style.top = `${Math.random() * 40}%`;
            sparkle.style.left = `${Math.random() * 80 + 10}%`;
            card.appendChild(sparkle);
            
            // Supprimer après animation
            setTimeout(() => sparkle.remove(), 1200);
          }
        }
      }
      
      // Augmenter le temps d'affichage à 1.5 secondes (1500ms)
      setTimeout(() => setIsFlipped(false), 1500);
    }
  };

  return (
    <div 
      ref={cardRef}
      className="relative card-item"
    >
      {/* Effet de surbrillance dorée */}
      <div 
        className={`absolute inset-0 rounded-lg bg-imperial-gold/30 blur-md z-0 transition-all duration-300 ${isFlipped ? 'opacity-60 scale-110' : 'opacity-0 scale-80'}`}
      />
      
      <Tilt
        tiltMaxAngleX={prefersReducedMotion ? 0 : 6}
        tiltMaxAngleY={prefersReducedMotion ? 0 : 6}
        perspective={1000}
        transitionSpeed={400}
        scale={1.05}
        gyroscope={true}
        glareEnable={true}
        glareMaxOpacity={0.15}
        glareColor="#D6AE60"
        glarePosition="all"
        glareBorderRadius="8px"
        className="h-full"
      >
        <button
          className="card-container aspect-[2/3] relative w-full h-full rounded-lg overflow-hidden shadow-md focus:outline-none focus:ring-2 focus:ring-imperial-gold focus:ring-offset-2 focus:ring-offset-royal-purple z-10 gold-glow"
          onClick={handleFlip}
          onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && handleFlip()}
          aria-label={`Carte n° ${card.number}, ${card.name}, survolez pour détails`}
        >
          <div
            className={`card-inner w-full h-full relative ${isFlipped ? 'rotate-x-180' : ''}`}
            style={{
              transform: isFlipped ? 'rotateX(180deg)' : 'rotateX(0deg)'
            }}
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
              className="card-back absolute inset-0 rounded-lg bg-gradient-to-br from-imperial-gold/20 to-royal-purple/80 border border-imperial-gold/50 backface-hidden shadow-[inset_0_0_0.8rem_#D6AE60]"
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
          </div>
        </button>
      </Tilt>
    </div>
  );
};

export const CardGrid: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  
  useEffect(() => {
    // Animation de révélation en cascade diagonale
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.card-item');
      
      ScrollTrigger.batch(cards, {
        onEnter: (elements) => {
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            stagger: {
              each: 0.05,
              grid: [6, 9], // approximation de la grille
              from: "start"
            }
          });
        },
        once: false
      });
    }
    
    return () => {
      // Nettoyer les instances ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-royal-purple to-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-imperial-gold mb-8 text-center">
          {t.cards.title}
        </h1>
        
        <p className="text-rose-champagne/80 max-w-3xl mx-auto text-center mb-12">
          {t.cards.description}
        </p>
        
        <div 
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4 md:gap-5 lg:gap-6"
        >
          {cards.map((card, index) => (
            <Card key={card.id} card={card} index={index} />
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
            {t.cards.returnHome}
          </Link>
        </div>
      </div>
    </section>
  );
}; 