import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Coffee } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

export const LiveTeaBanner: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Show banner after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Handle banner close
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  // Get next tea time (example: always show next day at 7 PM GMT+1)
  const getNextTeaTime = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(19, 0, 0, 0); // 7 PM

    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    }).format(tomorrow);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-royal-purple via-imperial-gold/80 to-royal-purple shadow-lg shadow-black/20 border-t border-imperial-gold/30"
        initial={{ y: 100, opacity: 0 }}
        animate={{ 
          y: isClosing ? 100 : 0, 
          opacity: isClosing ? 0 : 1 
        }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ 
          type: "spring", 
          damping: 25, 
          stiffness: 200,
          duration: 0.6 
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Tea Time Info */}
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-2xl"
            >
              ☕
            </motion.div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
              <span className="font-playfair font-bold text-white text-lg">
                Live Tea Time
              </span>
              <span className="text-white/90 text-sm sm:text-base">
                {getNextTeaTime()}
              </span>
            </div>
          </div>

          {/* Action & Close */}
          <div className="flex items-center space-x-3">
            <motion.button
              className="hidden sm:inline-flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full transition-all duration-200 border border-white/20 hover:border-white/40"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => alert('Fonctionnalité bientôt disponible!')}
            >
              <Coffee size={16} />
              <span className="font-medium">Me rappeler</span>
            </motion.button>
            
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200 text-white/80 hover:text-white"
              aria-label="Fermer le bandeau"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Decorative Tea Steam Animation */}
        <div className="absolute left-8 top-0 transform -translate-y-2 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-6 bg-white/20 rounded-full"
              style={{ left: i * 4 }}
              animate={{
                y: [-10, -20, -10],
                opacity: [0.3, 0.6, 0.3, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Sparkle Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-imperial-gold rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}; 