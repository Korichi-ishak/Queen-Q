import React, { useState } from 'react';
import { CardDeck } from '../components/CardDeck';
import { SignupForm } from '../components/SignupForm';

export const Hero: React.FC = () => {
  const [drawnCard, setDrawnCard] = useState<string | null>(null);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const handleCardDraw = (cardName: string) => {
    setDrawnCard(cardName);
    setShowSignupForm(true);
  };

  const handleCloseForm = () => {
    setShowSignupForm(false);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-royal-purple via-royal-purple/95 to-royal-purple/90 flex items-center justify-center relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-imperial-gold rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-rose-champagne rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-imperial-gold rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero heading */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl font-playfair font-bold text-imperial-gold mb-6 leading-tight">
              Queen de Q
            </h1>
            <h2 className="text-2xl md:text-4xl font-playfair font-bold text-rose-champagne mb-8 leading-relaxed">
              Découvrez votre archétype royal
            </h2>
            <p className="text-lg md:text-xl text-rose-champagne/80 font-inter max-w-2xl mx-auto leading-relaxed">
              Rejoignez le <span className="text-imperial-gold font-semibold">Royal Launch</span> exclusif. 
              Places limitées pour une expérience unique dans le royaume des archétypes.
            </p>
          </div>

          {/* Scarcity messaging */}
          <div className="mb-12">
            <div className="inline-flex items-center px-6 py-3 bg-imperial-gold/10 border border-imperial-gold/30 rounded-full">
              <div className="w-2 h-2 bg-imperial-gold rounded-full mr-3 animate-pulse"></div>
              <span className="text-imperial-gold font-inter font-medium">
                Seulement 1,000 places disponibles
              </span>
            </div>
          </div>

          {/* Card deck section */}
          <div className="mb-16">
            <CardDeck onCardDraw={handleCardDraw} />
          </div>

          {/* Instructions */}
          <div className="max-w-2xl mx-auto">
            <p className="text-rose-champagne/70 font-inter text-sm md:text-base mb-4">
              Cliquez sur le deck ou appuyez sur <kbd className="px-2 py-1 bg-imperial-gold/20 text-imperial-gold rounded text-xs">Espace</kbd> 
              pour arrêter l'animation et découvrir votre archétype
            </p>
            <p className="text-rose-champagne/60 font-inter text-xs">
              • Chaque archétype révèle des insights uniques sur votre personnalité
            </p>
          </div>
        </div>
      </div>

      {/* Signup Form Modal */}
      <SignupForm 
        drawnCard={drawnCard}
        isVisible={showSignupForm}
        onClose={handleCloseForm}
      />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center text-rose-champagne/50">
          <span className="text-xs font-inter mb-2">Découvrir plus</span>
          <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}; 