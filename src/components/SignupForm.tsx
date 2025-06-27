import React, { useState, useEffect, useRef } from 'react';
import { SuccessOverlay } from './SuccessOverlay';
import gsap from 'gsap';

interface SignupFormProps {
  drawnCard: string;
  isVisible: boolean;
  onClose: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ drawnCard, isVisible, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Animation d'entrée ultra-créative
  useEffect(() => {
    if (isVisible && modalRef.current) {
      // Animation dramatique d'entrée
      gsap.fromTo(modalRef.current, 
        { opacity: 0, scale: 0.3, rotateY: -45, rotateZ: 10, y: -100 },
        { 
          opacity: 1, 
          scale: 1, 
          rotateY: 0, 
          rotateZ: 0, 
          y: 0,
          duration: 0.8, 
          ease: "elastic.out(1, 0.75)" 
        }
      );

      // Animation en cascade des éléments internes
      const elements = modalRef.current.querySelectorAll('.animate-cascade');
      gsap.fromTo(elements, 
        { opacity: 0, y: 30, scale: 0.8 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.6,
          delay: 0.3,
          stagger: 0.1,
          ease: "back.out(1.7)"
        }
      );

      // Animation spéciale pour le bouton de fermeture
      if (closeButtonRef.current) {
        gsap.fromTo(closeButtonRef.current,
          { opacity: 0, rotation: -180, scale: 0 },
          { 
            opacity: 1, 
            rotation: 0, 
            scale: 1,
            duration: 0.5,
            delay: 0.8,
            ease: "elastic.out(1, 0.75)"
          }
        );
      }
    }
  }, [isVisible]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulation d'envoi
      await new Promise(resolve => setTimeout(resolve, 2000));
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
          setFormData({ firstName: '', lastName: '', email: '' });
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
          {/* Bouton de fermeture ultra-créatif */}
          <button
            ref={closeButtonRef}
            onClick={handleClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-imperial-gold/20 hover:bg-imperial-gold/30 transition-all duration-500 text-imperial-gold hover:rotate-90 group overflow-hidden"
          >
            {/* Effet de cercles concentriques */}
            <div className="absolute inset-0 rounded-full border-2 border-imperial-gold/30 animate-ping opacity-0 group-hover:opacity-100"></div>
            <div className="absolute inset-1 rounded-full border border-imperial-gold/20 animate-ping opacity-0 group-hover:opacity-100" style={{ animationDelay: '0.1s' }}></div>
            
            {/* Croix morphique */}
            <div className="relative w-5 h-5">
              <div className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-current transform -translate-x-1/2 -translate-y-1/2 rotate-45 group-hover:scale-125 group-hover:bg-yellow-300 transition-all duration-300"></div>
              <div className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-current transform -translate-x-1/2 -translate-y-1/2 -rotate-45 group-hover:scale-125 group-hover:bg-yellow-300 transition-all duration-300"></div>
            </div>
          </button>

          {/* Arrière-plan décoratif mystique */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-imperial-gold/5 to-transparent rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-r from-imperial-gold/10 to-transparent rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-imperial-gold/30 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-imperial-gold/40 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
          </div>

          {/* Contenu */}
          <div className="relative z-10 p-8">
            <div className="text-center mb-8">
              {/* Icône mystique avec couronne */}
              <div className="relative w-16 h-16 mx-auto mb-4 animate-cascade">
                <div className="absolute inset-0 bg-gradient-to-br from-imperial-gold via-yellow-400 to-imperial-gold rounded-full animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-imperial-gold/20 via-transparent to-imperial-gold/20 rounded-full animate-ping"></div>
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
                Rejoignez des milliers de personnes qui ont découvert leur véritable archétype
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
                <label className="block text-rose-champagne font-medium mb-2 flex items-center">
                  <span className="mr-2">👤</span>
                  Prénom
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full px-4 py-3 bg-black/30 border border-imperial-gold/30 rounded-lg text-rose-champagne placeholder-rose-champagne/50 focus:border-imperial-gold focus:outline-none transition-all duration-300 hover:bg-black/40 focus:bg-black/50 focus:shadow-lg focus:shadow-imperial-gold/20"
                    placeholder="Votre prénom"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-imperial-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shimmer-effect"></div>
                </div>
              </div>

              <div className="relative animate-cascade">
                <label className="block text-rose-champagne font-medium mb-2 flex items-center">
                  <span className="mr-2">✨</span>
                  Nom
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-4 py-3 bg-black/30 border border-imperial-gold/30 rounded-lg text-rose-champagne placeholder-rose-champagne/50 focus:border-imperial-gold focus:outline-none transition-all duration-300 hover:bg-black/40 focus:bg-black/50 focus:shadow-lg focus:shadow-imperial-gold/20"
                    placeholder="Votre nom"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-imperial-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shimmer-effect"></div>
                </div>
              </div>

              <div className="relative animate-cascade">
                <label className="block text-rose-champagne font-medium mb-2 flex items-center">
                  <span className="mr-2">📧</span>
                  Email
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-black/30 border border-imperial-gold/30 rounded-lg text-rose-champagne placeholder-rose-champagne/50 focus:border-imperial-gold focus:outline-none transition-all duration-300 hover:bg-black/40 focus:bg-black/50 focus:shadow-lg focus:shadow-imperial-gold/20"
                    placeholder="votre@email.com"
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-imperial-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shimmer-effect"></div>
                </div>
              </div>

              <div className="relative group animate-cascade">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-imperial-gold via-yellow-400 to-imperial-gold hover:from-yellow-400 hover:via-imperial-gold hover:to-yellow-400 text-royal-purple font-playfair font-bold py-4 px-6 rounded-lg transition-all duration-500 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-2xl hover:shadow-imperial-gold/30 relative overflow-hidden"
                >
                  {/* Effet de brillance qui traverse le bouton */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  {/* Particules flottantes */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-2 left-1/4 w-1 h-1 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-2 right-1/4 w-1 h-1 bg-white/30 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                  </div>
                  
                  <span className="relative z-10 flex items-center justify-center">
                    {isLoading && (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-royal-purple" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    {isLoading ? 'Préparation de votre révélation...' : '✨ Commencer ma Révélation ✨'}
                  </span>
                </button>
              </div>
            </form>

            <p className="text-rose-champagne/60 text-xs text-center mt-6">
              Vos informations sont protégées et ne seront jamais partagées.
            </p>
          </div>
        </div>
      </div>

      <SuccessOverlay
        isVisible={isSuccess}
        onClose={handleClose}
        cardName={drawnCard}
      />
    </>
  );
}; 