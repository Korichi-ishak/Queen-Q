import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../i18n/LanguageContext';

interface SuccessOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  cardName: string;
}

export const SuccessOverlay: React.FC<SuccessOverlayProps> = ({ isVisible, onClose, cardName }) => {
  const confettiRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { t } = useLanguage();

  // Handle Escape key press
  useEffect(() => {
    if (!isVisible) return;

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isVisible, onClose]);

  // Focus trap
  useEffect(() => {
    if (isVisible && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isVisible]);

  // Trigger confetti animation
  useEffect(() => {
    if (isVisible && confettiRef.current) {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      if (!prefersReducedMotion) {
        // Main burst
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { x: 0.5, y: 0.3 },
          colors: ['#D6AE60', '#D4B5A5', '#3B1E50'],
        });

        // Secondary bursts
        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0.3, y: 0.5 },
            colors: ['#D6AE60', '#D4B5A5'],
          });
        }, 250);

        setTimeout(() => {
          confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 0.7, y: 0.5 },
            colors: ['#D6AE60', '#D4B5A5'],
          });
        }, 400);
      }
    }
  }, [isVisible]);

  if (!isVisible) return null;

  // Format the message with the card name
  const formattedMessage = t.successOverlay.message.replace('{cardName}', cardName);

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="success-title"
    >
      <div 
        ref={confettiRef}
        className="relative bg-gradient-to-br from-royal-purple to-royal-purple/80 rounded-xl p-6 sm:p-8 max-w-md w-full mx-4 border border-imperial-gold/30 shadow-xl"
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 text-rose-champagne/60 hover:text-imperial-gold transition-colors"
          aria-label="Close success message"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="text-5xl mb-4">👑</div>
          <h2 
            id="success-title"
            className="text-2xl sm:text-3xl font-playfair font-bold text-imperial-gold mb-4"
          >
            {t.successOverlay.title}
          </h2>
          
          <p className="text-rose-champagne/90 mb-6">
            {formattedMessage}
          </p>
          
          <button
            onClick={onClose}
            className="px-6 py-3 bg-imperial-gold hover:bg-imperial-gold/90 text-royal-purple font-playfair font-bold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-imperial-gold focus:ring-offset-2 focus:ring-offset-royal-purple"
          >
            {t.successOverlay.returnButton}
          </button>
        </div>
      </div>
    </div>
  );
}; 