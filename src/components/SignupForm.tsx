import React, { useState, useEffect, useRef } from 'react';
import { SuccessOverlay } from './SuccessOverlay';
import gsap from 'gsap';

interface SignupFormProps {
  drawnCard: string;
  isVisible: boolean;
  onClose: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ drawnCard, isVisible, onClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Animation d'entrée
  useEffect(() => {
    if (isVisible && modalRef.current) {
      gsap.fromTo(modalRef.current, 
        { opacity: 0, scale: 0.3, y: -50 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          duration: 0.6, 
          ease: "back.out(1.7)" 
        }
      );

      const elements = modalRef.current.querySelectorAll('.animate-cascade');
      gsap.fromTo(elements, 
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.5,
          delay: 0.2,
          stagger: 0.1,
          ease: "power2.out"
        }
      );
    }
  }, [isVisible]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          onClose();
          setEmail('');
          setError('');
          setIsSuccess(false);
        }
      });
    }
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div
          ref={modalRef}
          className="bg-gradient-to-br from-royal-purple via-royal-purple/95 to-black max-w-md w-full rounded-xl border border-imperial-gold/30 shadow-2xl relative overflow-hidden"
        >
          {/* Bouton de fermeture simplifié */}
          <button
            ref={closeButtonRef}
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-imperial-gold hover:text-yellow-300 transition-all duration-300 hover:rotate-90 group"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Arrière-plan décoratif */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-imperial-gold/5 to-transparent rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-r from-imperial-gold/10 to-transparent rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Contenu */}
          <div className="relative z-10 p-8">
            <div className="text-center mb-8">
              {/* Icône mystique */}
              <div className="relative w-16 h-16 mx-auto mb-4 animate-cascade">
                <div className="absolute inset-0 bg-gradient-to-br from-imperial-gold via-yellow-400 to-imperial-gold rounded-full animate-pulse"></div>
                <div className="absolute inset-2 bg-royal-purple rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-imperial-gold" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,1L8,5H3L5,9L3,13H8L12,17L16,13H21L19,9L21,5H16L12,1M12,3.441L14.4,5.841H17.241L16.241,8.241L17.241,10.641H14.4L12,13.041L9.6,10.641H6.759L7.759,8.241L6.759,5.841H9.6L12,3.441Z" />
                  </svg>
                </div>
              </div>

              <h2 className="text-2xl font-playfair font-bold text-imperial-gold mb-2 animate-cascade">
                Commencez votre Révélation
              </h2>
              <p className="text-rose-champagne/80 animate-cascade">
                Entrez votre email pour découvrir votre archétype
              </p>
              {drawnCard && (
                <div className="mt-4 p-3 bg-imperial-gold/10 border border-imperial-gold/30 rounded-lg animate-cascade">
                  <p className="text-imperial-gold font-medium">
                    Carte tirée : <span className="font-bold">{drawnCard}</span>
                  </p>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">
                  {error}
                </div>
              )}

              <div className="relative animate-cascade">
                <label className="block text-rose-champagne font-medium mb-2">
                  Email
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-black/30 border border-imperial-gold/30 rounded-lg text-rose-champagne placeholder-rose-champagne/50 focus:border-imperial-gold focus:outline-none transition-all duration-300 hover:bg-black/40 focus:bg-black/50"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !email}
                className="w-full bg-gradient-to-r from-imperial-gold to-yellow-600 hover:from-yellow-600 hover:to-imperial-gold text-royal-purple font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none animate-cascade"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-royal-purple border-t-transparent rounded-full animate-spin mr-2"></div>
                    Envoi en cours...
                  </div>
                ) : (
                  'Découvrir mon Archétype'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <SuccessOverlay
        isVisible={isSuccess}
        onClose={() => {
          setIsSuccess(false);
          handleClose();
        }}
        cardName={drawnCard}
      />
    </>
  );
}; 