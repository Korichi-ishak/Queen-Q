import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Deck3D } from '../components/Deck3D';
import { ParticleCanvas } from '../components/ParticleCanvas';
import { SignupForm } from '../components/SignupForm';
import { useSpotsLeft } from '../hooks/useSpotsLeft';
import { useTranslation } from '../context/TranslationContext';

export const Hero: React.FC = () => {
  const { t, language } = useTranslation();
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

  // New creative typography animation variants
  const textReveal: Variants = {
    hidden: { 
      opacity: 0,
      clipPath: "inset(0 100% 0 0)"
    },
    show: { 
      opacity: 1,
      clipPath: "inset(0 0% 0 0)",
      transition: {
        duration: 1.2,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  const glowEffect: Variants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      filter: "blur(10px)"
    },
    show: { 
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        delay: 0.5,
        ease: "easeOut"
      }
    }
  };

  const floatingParticles: Variants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    show: { 
      opacity: [0, 1, 1, 0],
      y: [-20, -40, -60, -80],
      transition: {
        duration: 3,
        delay: 1,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut"
      }
    }
  };

  // Split title into characters for wave effect
  const titleText = t('hero.title');
  const titleChars = titleText.split("");

  return (
    <>
      <section id="hero" className="grid lg:grid-cols-[60%_40%] w-screen min-h-screen overflow-hidden">
        {/* LEFT column = headline, CTA, badge */}
        <div className="relative bg-gradient-to-br from-royal-purple via-royal-purple/95 to-royal-purple/90 flex items-center justify-center p-4 sm:p-8 lg:p-16 min-h-screen">
          <div className="max-w-2xl w-full mx-auto">
            
            {/* Creative Animated Typography */}
            <div className="mb-8 sm:mb-12 relative">
              {/* Floating Particles */}
              <div className="absolute -top-4 -left-4 w-full h-full pointer-events-none overflow-hidden">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    variants={floatingParticles}
                    initial="hidden"
                    animate="show"
                    className="absolute w-1 h-1 bg-imperial-gold rounded-full"
                    style={{
                      left: `${20 + (i * 15)}%`,
                      top: `${10 + (i * 8)}%`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  />
                ))}
              </div>

              {/* Main Title with Wave Effect */}
              <div className="mb-8 sm:mb-12 relative overflow-visible" style={{ minHeight: '120px' }}>
                <motion.h1 
                  variants={textReveal}
                  initial="hidden"
                  animate="show"
                  className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-playfair font-bold leading-relaxed relative pb-4"
                  style={{ lineHeight: '1.2' }}
                >
                  {titleChars.map((char: string, index: number) => (
                    <motion.span
                      key={index}
                      initial={{ 
                        opacity: 0, 
                        y: 50,
                        rotateX: -90,
                        scale: 0.5
                      }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        rotateX: 0,
                        scale: 1
                      }}
                      transition={{
                        delay: 0.8 + (index * 0.03),
                        duration: 0.6,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        type: "spring",
                        stiffness: 100,
                        damping: 12
                      }}
                      className="inline-block text-imperial-gold"
                                             style={{
                         transformOrigin: "center center",
                         textShadow: "0 0 20px rgba(214, 174, 96, 0.5)",
                         display: "inline-block",
                         marginBottom: "0.1em"
                       }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </motion.h1>
                
                                 {/* Glow effect behind title */}
                 <motion.div
                   variants={glowEffect}
                   initial="hidden"
                   animate="show"
                   className="absolute inset-0 text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-playfair font-bold text-imperial-gold/20 leading-relaxed blur-lg -z-10 pb-4"
                   style={{ lineHeight: '1.2' }}
                 >
                   {titleText}
                 </motion.div>
              </div>

              {/* Subtitle with Slide and Glow */}
              <motion.h2
                initial={{ 
                  x: -100, 
                  opacity: 0,
                  filter: "blur(5px)"
                }}
                animate={{ 
                  x: 0, 
                  opacity: 1,
                  filter: "blur(0px)"
                }}
                transition={{ 
                  delay: 1.8, 
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-playfair font-bold text-rose-champagne mb-6 sm:mb-8 leading-relaxed relative"
              >
                <span className="relative z-10">{t('hero.subtitle')}</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 2.2, duration: 0.6 }}
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-rose-champagne/50 to-transparent transform origin-left"
                />
              </motion.h2>

              {/* Description with Typewriter Effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 0.8 }}
                className="text-base sm:text-lg lg:text-xl text-rose-champagne/80 font-inter max-w-xl leading-relaxed mb-8 sm:mb-12"
              >
                <motion.p
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.02,
                        delayChildren: 0.1
                      }
                    }
                  }}
                >
                  {t('hero.description').split("").map((char: string, index: number) => (
                    <motion.span
                      key={index}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        show: { 
                          opacity: 1, 
                          y: 0,
                          transition: {
                            duration: 0.1
                          }
                        }
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.p>
              </motion.div>
            </div>

            {/* Glassmorphism Scarcity Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="bg-white/10 backdrop-blur-md ring-1 ring-white/15 rounded-full px-6 py-2 inline-flex items-center gap-2 text-rose-champagne mb-8 sm:mb-12"
            >
              <div className="w-2 h-2 bg-imperial-gold rounded-full animate-pulse"></div>
              <span className="font-inter font-medium text-sm sm:text-base">
                {isLoading ? (
                  t('common.loading')
                ) : (
                  `${spotsLeft || 0} ${t('hero.spotsLeft')}`
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
                <span className="relative z-10">{t('hero.cta')}</span>
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
                <span className="hidden lg:inline">{t('instructions.clickCards')} </span>
                                  <span className="lg:hidden">{t('instructions.pressSpace')} </span>
                  <kbd className="px-2 py-1 bg-imperial-gold/20 text-imperial-gold rounded text-xs font-mono">{t('instructions.spaceKey')}</kbd> 
                <span className="hidden lg:inline"> {t('instructions.toDiscover')}</span>
                <span className="lg:hidden"> {t('instructions.toReveal')}</span>
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



      {/* Scroll Indicator - Fixed Bottom Center */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none">
        <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-rose-champagne/70 text-sm font-inter">
          {t('hero.scrollText')}
        </div>
      </div>

      {/* Signup Form Modal */}
      <SignupForm
        drawnCard={drawnCard}
        isVisible={showSignupForm}
        onClose={handleCloseForm}
      />
    </>
  );
}; 