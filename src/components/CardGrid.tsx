import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../context/TranslationContext';
import { generateCardData } from '../data/cards';
import { Card } from './Card';

export const CardGrid: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const cards = generateCardData(t as any);

  return (
    <section className="py-16 sm:py-24 bg-inked-indigo relative overflow-hidden">
      {/* Arrière-plan subtil avec étoiles flottantes */}
      <div className="absolute inset-0 opacity-40">
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
        {/* Grille de cartes simple */}
        <div 
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 sm:gap-5 md:gap-6"
        >
          {cards.map((card, index) => (
            <Card key={card.id} card={card} index={index} t={t as any} />
          ))}
        </div>
      </div>
    </section>
  );
}; 