import React, { useState } from 'react';
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
    <section className="min-h-screen relative overflow-hidden">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-[60%_40%] min-h-screen">
        
        {/* Left Column - Content */}
        <div className="relative z-20 bg-gradient-to-br from-royal-purple via-royal-purple/95 to-royal-purple/90 flex items-center justify-center p-8 sm:p-16">
          <div className="max-w-2xl w-full">
            
            {/* Animated Typography */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="mb-12"
            >
              {/* Main Title */}
              <div className="mb-8">
                {titleWords.map((word, index) => (
                  <motion.span
                    key={index}
                    variants={item}
                    className="inline-block text-6xl md:text-8xl font-playfair font-bold text-imperial-gold mr-6 leading-none"
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
                 className="text-2xl md:text-4xl font-playfair font-bold text-rose-champagne mb-8 leading-relaxed"
               >
                 Découvrez votre archétype royal
               </motion.h2>
 
               {/* Description */}
               <motion.p
                 initial={{ y: 30, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 1, duration: 0.6 }}
                 className="text-lg md:text-xl text-rose-champagne/80 font-inter max-w-xl leading-relaxed mb-12"
               >
                 Rejoignez le <span className="text-imperial-gold font-semibold">Royal Launch</span> exclusif. 
                 Une expérience unique dans le royaume des archétypes vous attend.
               </motion.p>
            </motion.div>

                         {/* Glass Scarcity Badge */}
             <motion.div
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ delay: 1.2, duration: 0.5 }}
               className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-lg ring-1 ring-white/15 shadow-lg rounded-full px-6 py-3 mb-12"
             >
              <div className="w-2 h-2 bg-imperial-gold rounded-full animate-pulse"></div>
              <span className="text-rose-champagne font-inter font-medium">
                Seulement 1,000 places disponibles
              </span>
            </motion.div>

            {/* 3D Deck Component */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="flex justify-center sm:justify-start"
            >
              <Deck3D onCardDraw={handleCardDraw} />
            </motion.div>

            {/* Instructions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="mt-12 text-center sm:text-left"
            >
              <p className="text-rose-champagne/70 font-inter text-sm md:text-base mb-4">
                Cliquez sur le deck ou appuyez sur <kbd className="px-2 py-1 bg-imperial-gold/20 text-imperial-gold rounded text-xs font-mono">Espace</kbd> 
                pour découvrir votre archétype
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Column - Visual Background */}
        <div className="relative bg-gradient-to-bl from-royal-purple/60 via-royal-purple/40 to-royal-purple/60 velvet-bg">
          {/* Particle Canvas */}
          <ParticleCanvas />
          
          {/* Velvet Texture Overlay */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                radial-gradient(circle at 30% 40%, rgba(214, 174, 96, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 70% 60%, rgba(212, 181, 165, 0.1) 0%, transparent 50%),
                linear-gradient(45deg, transparent 30%, rgba(214, 174, 96, 0.05) 50%, transparent 70%)
              `
            }}
            data-speed="0.5"
          />
          
          {/* Ambient Light Effects */}
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-imperial-gold/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-rose-champagne/10 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <div className="flex flex-col items-center text-rose-champagne/50 group cursor-pointer">
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
    </section>
  );
}; 