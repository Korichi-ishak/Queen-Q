import React, { useState, useEffect, useRef } from 'react';
import { SuccessOverlay } from './SuccessOverlay';
import { useLanguage } from '../i18n/LanguageContext';

interface SignupFormProps {
  drawnCard: string | null;
  isVisible: boolean;
  onClose: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ drawnCard, isVisible, onClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const { t } = useLanguage();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Fermer le modal quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Gérer la touche Echap
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
      
      // Focus sur le bouton de fermeture pour accessibilité
      if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isVisible, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulation de l'envoi Mailchimp (à remplacer par la vraie intégration)
      const formData = new FormData();
      formData.append('email', email);
      formData.append('data-card', drawnCard || '');
      
      // Simuler un délai d'envoi
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccess(true);
      setEmail('');
      
    } catch (_) {
      setError(t.signupForm.error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setIsSuccess(false);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed inset-0 bg-royal-purple/80 backdrop-blur-sm flex items-center justify-center z-40 p-4">
        <div 
          ref={modalRef}
          className="bg-royal-purple/95 border border-imperial-gold/30 rounded-2xl p-8 max-w-md w-full shadow-2xl relative"
        >
          {/* Close button */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute top-4 right-4 text-rose-champagne hover:text-imperial-gold transition-colors"
            aria-label="Fermer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="text-center mb-6">
            <h3 className="text-imperial-gold font-playfair font-bold text-2xl mb-2">
              {t.signupForm.title}
            </h3>
            {drawnCard && (
              <p className="text-rose-champagne font-inter mb-2">
                {t.signupForm.archetype} <span className="text-imperial-gold font-semibold">{drawnCard}</span>
              </p>
            )}
            <p className="text-rose-champagne/80 font-inter text-sm">
              {t.signupForm.limitedSpots}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Hidden card field for Mailchimp segmentation */}
            <input type="hidden" name="data-card" value={drawnCard || ''} />
            
            <div>
              <label htmlFor="email" className="block text-rose-champagne font-inter font-medium mb-2">
                {t.signupForm.emailLabel}
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-royal-purple/50 border border-imperial-gold/30 rounded-lg text-rose-champagne placeholder-rose-champagne/50 focus:border-imperial-gold focus:outline-none focus:ring-2 focus:ring-imperial-gold/20 transition-all"
                placeholder={t.signupForm.emailPlaceholder}
                disabled={isLoading}
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm font-inter">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading || !email}
              className="w-full px-6 py-3 bg-imperial-gold hover:bg-imperial-gold/90 disabled:bg-imperial-gold/50 text-royal-purple font-playfair font-bold text-lg rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-imperial-gold/30 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-royal-purple" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t.signupForm.loading}
                </span>
              ) : (
                t.signupForm.submitButton
              )}
            </button>
          </form>

          <p className="text-rose-champagne/60 text-xs font-inter text-center mt-4">
            {t.signupForm.privacyNotice}
          </p>
        </div>
      </div>

      {/* Success Overlay */}
      <SuccessOverlay 
        isVisible={isSuccess} 
        onClose={handleSuccessClose} 
        cardName={drawnCard || 'The Mysterious'} 
      />
    </>
  );
}; 