import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Deck3D } from '../components/Deck3D';
import { ParticleCanvas } from '../components/ParticleCanvas';
import { SignupForm } from '../components/SignupForm';
import { useSpotsLeft } from '../hooks/useSpotsLeft';

export const Hero: React.FC = () => {
  const [drawnCard, setDrawnCard] = useState<string>('');
  const [showSignupForm, setShowSignupForm] = useState(false);
  const { spotsLeft, isLoading } = useSpotsLeft();

  const handleCardDraw = (cardName: string) => {
    setDrawnCard(cardName);
    setShowSignupForm(true);
  };

  const handleCloseForm = () => {
    setShowSignupForm(false);
  };

  // Typography animation variants
  const container: Variants = { 
    hidden: { opacity: 0 }, 
    show: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.2
      } 
    } 
  };

  const item: Variants = { 
    hidden: { y: 50, opacity: 0 }, 
    show: { 
      y: 0, 
      opacity: 1
    } 
  };

  // Split text into words for stagger animation
  const titleWords = "Queen de Q".split(" ");

  return (
    <>
      <section id="hero" className="grid lg:grid-cols-[60%_40%] w-screen min-h-screen overflow-hidden">
        {/* LEFT column = headline, CTA, badge */}
        <div className="relative bg-gradient-to-br from-royal-purple via-royal-purple/95 to-royal-purple/90 flex items-center justify-center p-4 sm:p-8 lg:p-16 min-h-screen">
          <div className="max-w-2xl w-full mx-auto">
            
            {/* Animated Typography */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="mb-8 sm:mb-12"
            >
              {/* Main Title */}
              <div className="mb-6 sm:mb-8">
                {titleWords.map((word: string, index: number) => (
                  <motion.span
                    key={index}
                    variants={item}
                    className="inline-block text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-playfair font-bold text-imperial-gold mr-3 sm:mr-6 leading-none"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>

              {/* Subtitle */}
              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-playfair font-bold text-rose-champagne mb-6 sm:mb-8 leading-relaxed"
              >
                Révélez les mystères de votre chemin personnel
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="text-base sm:text-lg lg:text-xl text-rose-champagne/80 font-inter max-w-xl leading-relaxed mb-8 sm:mb-12"
              >
                Découvrez votre archétype unique à travers nos cartes divinatoires personnalisées. Une expérience mystique pour mieux vous connaître.
              </motion.p>
            </motion.div>

            {/* Glassmorphism Scarcity Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="bg-white/10 backdrop-blur-md ring-1 ring-white/15 rounded-full px-6 py-2 flex items-center gap-2 text-rose-champagne inline-flex mb-8 sm:mb-12"
            >
              <div className="w-2 h-2 bg-imperial-gold rounded-full animate-pulse"></div>
              <span className="font-inter font-medium text-sm sm:text-base">
                {isLoading ? (
                  "Chargement..."
                ) : (
                  `${spotsLeft || 0} places restantes`
                )}
              </span>
            </motion.div>

            {/* CTA Button - Only show on mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="lg:hidden flex justify-center mb-8"
            >
              <button
                onClick={() => handleCardDraw("The Mysterious")}
                className="button relative overflow-hidden px-8 py-4 bg-imperial-gold hover:bg-imperial-gold/90 text-royal-purple font-playfair font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-imperial-gold/30 focus-visible:ring-2 ring-imperial-gold ring-offset-2 ring-offset-royal-purple"
                data-plausible-event="card_pick"
                data-plausible-props='{"card": "The Mysterious"}'
              >
                <span className="relative z-10">Commencer ma Révélation</span>
              </button>
            </motion.div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="text-center lg:text-left"
            >
              <p className="text-rose-champagne/70 font-inter text-sm sm:text-base mb-4 px-4 sm:px-0">
                <span className="hidden lg:inline">Cliquez sur les cartes ou appuyez sur </span>
                <span className="lg:hidden">Appuyez sur </span>
                <kbd className="px-2 py-1 bg-imperial-gold/20 text-imperial-gold rounded text-xs font-mono">ESPACE</kbd> 
                <span className="hidden lg:inline"> pour découvrir votre archétype</span>
                <span className="lg:hidden"> pour révéler votre archétype</span>
              </p>
            </motion.div>
          </div>
        </div>

        {/* RIGHT column = visual stage */}
        <div className="relative overflow-hidden flex items-center justify-center">
          {/* soft radial spotlight */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(214,174,96,0.25),transparent_70%)]"></div>
          
          {/* velvet background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2d133e] via-[#130926] to-black/95"></div>

          {/* particles */}
          <ParticleCanvas className="absolute inset-0 z-10" />

          {/* 3-D spinning deck */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 1.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20"
          >
            <Deck3D 
              onCardDraw={handleCardDraw} 
              className="w-56 h-80 md:w-72 md:h-96" 
            />
            
            {/* Scroll cue */}
            <div className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 z-20">
              <div className="opacity-60 hover:opacity-100 transition-opacity">
                <svg 
                  width="48" 
                  height="48" 
                  viewBox="0 0 48 48" 
                  fill="none" 
                  className="animate-bounce"
                >
                  <path 
                    d="M18 20l6 6 6-6" 
                    stroke="rgba(214, 174, 96, 0.8)" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        className="hidden sm:block fixed bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none"
      >
        <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-rose-champagne/70 text-sm font-inter">
          Faites défiler pour explorer
        </div>
      </motion.div>

      {/* Signup Form Modal */}
      <SignupForm
        drawnCard={drawnCard}
        isVisible={showSignupForm}
        onClose={handleCloseForm}
      />
    </>
  );
}; 