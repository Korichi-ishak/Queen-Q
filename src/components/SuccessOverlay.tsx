import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import gsap from 'gsap';

interface SuccessOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  cardName: string;
}

export const SuccessOverlay: React.FC<SuccessOverlayProps> = ({ isVisible, onClose, cardName }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) {
      // Confettis chorégraphiés en 4 vagues
      const colors = ['#C9A96E', '#F4E4BC', '#FFD700', '#FFF8DC'];
      
      // Vague 1 - Centre
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: colors,
        gravity: 0.8,
        scalar: 1.2
      });

      // Vague 2 - Gauche (délai 200ms)
      setTimeout(() => {
        confetti({
          particleCount: 30,
          spread: 45,
          origin: { x: 0.2, y: 0.7 },
          colors: colors,
          gravity: 0.6,
          drift: 1
        });
      }, 200);

      // Vague 3 - Droite (délai 400ms)
      setTimeout(() => {
        confetti({
          particleCount: 30,
          spread: 45,
          origin: { x: 0.8, y: 0.7 },
          colors: colors,
          gravity: 0.6,
          drift: -1
        });
      }, 400);

      // Vague 4 - Pluie dorée (délai 600ms)
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 120,
          origin: { y: 0.3 },
          colors: ['#C9A96E', '#FFD700'],
          gravity: 0.4,
          scalar: 0.8
        });
      }, 600);

      // Animation d'entrée dramatique
      if (overlayRef.current && contentRef.current) {
        gsap.fromTo(overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.4 }
        );
        
        gsap.fromTo(contentRef.current,
          { scale: 0.3, opacity: 0, rotateY: 45, rotateZ: -10, y: -50 },
          { 
            scale: 1, 
            opacity: 1, 
            rotateY: 0, 
            rotateZ: 0, 
            y: 0,
            duration: 0.8, 
            ease: "elastic.out(1, 0.75)" 
          }
        );

        // Animation en cascade des éléments
        const elements = contentRef.current.querySelectorAll('.animate-cascade-success');
        gsap.fromTo(elements, 
          { opacity: 0, y: 30, scale: 0.8 },
          { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            duration: 0.6,
            delay: 0.4,
            stagger: 0.15,
            ease: "back.out(1.7)"
          }
        );
      }
    }
  }, [isVisible]);

  const handleClose = () => {
    if (overlayRef.current && contentRef.current) {
      gsap.to(contentRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      });
      
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.4,
        delay: 0.1,
        onComplete: onClose
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-60 flex items-center justify-center p-4"
    >
      <div
        ref={contentRef}
        className="bg-gradient-to-br from-royal-purple via-royal-purple/95 to-black max-w-lg w-full rounded-xl border border-imperial-gold/50 shadow-2xl p-8 text-center relative overflow-hidden"
      >
        {/* Arrière-plan décoratif mystique */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-8 right-8 w-40 h-40 bg-gradient-to-r from-imperial-gold/5 to-transparent rounded-full animate-pulse"></div>
          <div className="absolute bottom-8 left-8 w-32 h-32 bg-gradient-to-r from-imperial-gold/10 to-transparent rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-imperial-gold/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-imperial-gold/30 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-imperial-gold/50 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
        </div>
        {/* Bouton de fermeture ultra-créatif */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-imperial-gold/20 hover:bg-imperial-gold/30 transition-all duration-500 text-imperial-gold hover:rotate-180 group overflow-hidden"
        >
          {/* Effet de cercles concentriques */}
          <div className="absolute inset-0 rounded-full border-2 border-imperial-gold/30 animate-ping opacity-0 group-hover:opacity-100"></div>
          <div className="absolute inset-1 rounded-full border border-imperial-gold/20 animate-ping opacity-0 group-hover:opacity-100" style={{ animationDelay: '0.1s' }}></div>
          <div className="absolute inset-2 rounded-full border border-imperial-gold/10 animate-ping opacity-0 group-hover:opacity-100" style={{ animationDelay: '0.2s' }}></div>
          
          {/* Croix morphique 3D */}
          <div className="relative w-5 h-5 transform group-hover:rotateY-180 transition-transform duration-500">
            <div className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-current transform -translate-x-1/2 -translate-y-1/2 rotate-45 group-hover:scale-150 group-hover:bg-yellow-300 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-yellow-300/50"></div>
            <div className="absolute top-1/2 left-1/2 w-4 h-0.5 bg-current transform -translate-x-1/2 -translate-y-1/2 -rotate-45 group-hover:scale-150 group-hover:bg-yellow-300 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-yellow-300/50"></div>
          </div>
        </button>

        {/* Icône de succès mystique avec halo */}
        <div className="relative mx-auto mb-6 w-24 h-24 animate-cascade-success">
          <div className="absolute inset-0 bg-gradient-to-br from-imperial-gold via-yellow-400 to-imperial-gold rounded-full animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-imperial-gold/20 via-transparent to-imperial-gold/20 rounded-full animate-ping"></div>
          <div className="absolute inset-2 bg-royal-purple rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-imperial-gold" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L14.5 8.5L21 7L17 12L21 17L14.5 15.5L12 22L9.5 15.5L3 17L7 12L3 7L9.5 8.5L12 2Z"/>
            </svg>
          </div>
        </div>

        {/* Titre */}
        <h2 className="text-3xl font-playfair font-bold text-imperial-gold mb-4 animate-cascade-success">
          🎉 Révélation Initiée ! 🎉
        </h2>

        {/* Message */}
        <p className="text-rose-champagne/80 text-lg mb-6 leading-relaxed animate-cascade-success">
          Votre voyage mystique commence maintenant. Vérifiez votre email pour les prochaines étapes.
        </p>

        {/* Carte tirée */}
        {cardName && (
          <div className="bg-black/30 border border-imperial-gold/30 rounded-lg p-4 mb-6 animate-cascade-success">
            <p className="text-imperial-gold font-medium">
              ✨ Carte tirée : <span className="font-bold">{cardName}</span> ✨
            </p>
          </div>
        )}

        {/* Bouton d'action créatif */}
        <div className="relative group animate-cascade-success">
          <button
            onClick={handleClose}
            className="bg-gradient-to-r from-imperial-gold via-yellow-400 to-imperial-gold hover:from-yellow-400 hover:via-imperial-gold hover:to-yellow-400 text-royal-purple font-playfair font-bold py-4 px-8 rounded-lg transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-2xl hover:shadow-imperial-gold/30 relative overflow-hidden"
          >
            {/* Effet de brillance */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            {/* Particules flottantes */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-2 left-1/4 w-1 h-1 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-2 right-1/4 w-1 h-1 bg-white/30 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
            </div>
            
            <span className="relative z-10">
              🚀 Continuer l'Exploration 🌟
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}; 