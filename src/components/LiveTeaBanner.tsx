import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

export const LiveTeaBanner: React.FC = () => {
  const { t } = useTranslation();
  const steamRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // GSAP steam animation would go here
    // For now using CSS animations
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-imperial-gold via-rose-champagne to-royal-purple text-warm-pearl py-3 px-4 shadow-lg"
          initial={{ y: 100 }}
          animate={{ 
            y: 0,
            transition: { duration: 0.5, delay: 2 }
          }}
          exit={{ 
            y: 100, 
            opacity: 0,
            transition: { duration: 0.3, delay: 0 }
          }}
        >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Tea Cup Icon with Steam */}
          <div className="relative">
            <div className="text-2xl">🫖</div>
            <div 
              ref={steamRef}
              className="absolute -top-2 left-1/2 transform -translate-x-1/2"
            >
              {/* Steam particles */}
              <motion.div
                className="w-1 h-1 bg-white/60 rounded-full"
                animate={{
                  y: [-5, -15],
                  x: [-2, 2, -1],
                  opacity: [1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
              />
              <motion.div
                className="absolute w-1 h-1 bg-white/40 rounded-full"
                animate={{
                  y: [-5, -20],
                  x: [1, -2, 1],
                  opacity: [1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.3,
                  repeatDelay: 0.5
                }}
              />
            </div>
          </div>
          
          <div>
            <span className="font-bold">{t('liveTeaTime.title')}</span>
            <span className="ml-2 text-white/90">{t('liveTeaTime.date')}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <motion.button
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full backdrop-blur-sm transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bell size={16} />
            <span className="text-sm font-medium">{t('liveTeaTime.reminder')}</span>
          </motion.button>
          
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
            aria-label={t('liveTeaTime.close')}
          >
            <X size={18} />
          </button>
        </div>
      </div>
      
      {/* Sparkle Effects */}
      <motion.div
        className="absolute top-2 left-20 w-1 h-1 bg-imperial-gold rounded-full"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 1
        }}
      />
      <motion.div
        className="absolute top-4 right-32 w-1 h-1 bg-rose-champagne rounded-full"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 2
        }}
      />
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 