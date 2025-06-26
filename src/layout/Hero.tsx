import React, { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Deck3D } from '../components/Deck3D';
import { SignupForm } from '../components/SignupForm';
import { ParticleCanvas } from '../components/ParticleCanvas';

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

  // Add keyboard listener for space key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' && !showSignupForm) {
        event.preventDefault();
        handleCardDraw("The Mysterious");
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSignupForm]);

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
      <section id="hero" className="relative grid lg:grid-cols-[60%_40%] w-screen min-h-screen overflow-hidden">
        {/* Left Cell - Content */}
        <div className="relative z-20 bg-gradient-to-br from-royal-purple via-royal-purple/95 to-royal-purple/90 flex items-center justify-center p-4 sm:p-8 lg:p-16 min-h-screen">
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
                {titleWords.map((word, index) => (
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
                Découvrez votre archétype royal
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="text-base sm:text-lg lg:text-xl text-rose-champagne/80 font-inter max-w-xl leading-relaxed mb-8 sm:mb-12"
              >
                Rejoignez le <span className="text-imperial-gold font-semibold">Royal Launch</span> exclusif. 
                Une expérience unique dans le royaume des archétypes vous attend.
              </motion.p>
            </motion.div>

            {/* Glassmorphism Scarcity Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="bg-white/10 backdrop-blur-lg ring-1 ring-white/15 shadow-lg rounded-full px-6 py-2 flex items-center gap-2 text-rose-champagne inline-flex mb-8 sm:mb-12"
            >
              <div className="w-2 h-2 bg-imperial-gold rounded-full animate-pulse"></div>
              <span className="font-inter font-medium text-sm sm:text-base">
                Seulement 1,000 places disponibles
              </span>
            </motion.div>

            {/* CTA Button - Only show on mobile/when deck is not visible */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="lg:hidden flex justify-center mb-8"
            >
              <button
                onClick={() => handleCardDraw("The Mysterious")}
                className="button px-8 py-4 bg-imperial-gold hover:bg-imperial-gold/90 text-royal-purple font-playfair font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-imperial-gold/30 focus-visible:ring-2 ring-imperial-gold ring-offset-2 ring-offset-royal-purple"
              >
                <span className="relative z-10">Deal me a card ↗</span>
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
                <span className="hidden lg:inline">Cliquez sur le deck ou appuyez sur </span>
                <span className="lg:hidden">Appuyez sur </span>
                <kbd className="px-2 py-1 bg-imperial-gold/20 text-imperial-gold rounded text-xs font-mono">Espace</kbd> 
                <span className="hidden lg:inline"> pour découvrir votre archétype</span>
                <span className="lg:hidden"> pour révéler votre archétype</span>
              </p>
            </motion.div>
          </div>
        </div>

        {/* RIGHT Cell - Final Stage */}
        <div className="hidden lg:block relative overflow-hidden flex items-center justify-center">
          {/* Velvet motif pleine largeur */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2d133e] via-[#130926] to-black/95"></div>
          
          {/* Halo diffus */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,203,183,0.18)_0%,transparent_70%)]"></div>
          
          {/* Halo principal (pulsation) */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,174,96,0.28)_0%,transparent_70%)] animate-pulse-slow"></div>
          
          {/* Canvas Particles */}
          <ParticleCanvas className="z-20 mix-blend-screen" />
          
          {/* 3D Deck */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 1.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-30"
          >
            <Deck3D onCardDraw={handleCardDraw} />
          </motion.div>
        </div>
      </section>

      {/* Scroll Indicator - Floating */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        className="hidden sm:block fixed bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none"
      >
        <div className="flex flex-col items-center text-rose-champagne/50 group cursor-pointer pointer-events-auto">
          <span className="text-xs font-inter mb-2 group-hover:text-imperial-gold transition-colors">
            Découvrir plus
          </span>
          <div className="w-5 h-8 border border-rose-champagne/30 rounded-full flex justify-center group-hover:border-imperial-gold transition-colors">
            <motion.div
              className="w-1 h-2 bg-imperial-gold rounded-full mt-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
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