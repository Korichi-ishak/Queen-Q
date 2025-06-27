import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);

  // Animation d'entrée des éléments flottants
  useEffect(() => {
    if (floatingElementsRef.current) {
      const particles = floatingElementsRef.current.querySelectorAll('.floating-particle');
      gsap.fromTo(particles, 
        { opacity: 0, y: 50, scale: 0 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 1.5,
          stagger: 0.2,
          ease: "elastic.out(1, 0.75)",
          delay: 0.5
        }
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setShowSuccess(true);
    setEmail('');

    // Masquer le message de succès après 3 secondes
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 bg-black overflow-hidden"
    >
      {/* Arrière-plan mystique animé */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-royal-purple/10 to-imperial-gold/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-imperial-gold/5 to-royal-purple/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Particules flottantes */}
      <div ref={floatingElementsRef} className="absolute inset-0 overflow-hidden">
        <div className="floating-particle absolute top-1/6 left-1/5 w-2 h-2 bg-imperial-gold/40 rounded-full"></div>
        <div className="floating-particle absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-imperial-gold/30 rounded-full"></div>
        <div className="floating-particle absolute bottom-1/3 left-1/3 w-1 h-1 bg-imperial-gold/50 rounded-full"></div>
        <div className="floating-particle absolute bottom-1/4 right-1/5 w-2.5 h-2.5 bg-imperial-gold/25 rounded-full"></div>
        <div className="floating-particle absolute top-1/2 left-1/6 w-1 h-1 bg-imperial-gold/35 rounded-full"></div>
        <div className="floating-particle absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-imperial-gold/40 rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Icône mystique centrale */}
          <div className="relative w-20 h-20 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-imperial-gold via-yellow-400 to-imperial-gold rounded-full animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-imperial-gold/20 via-transparent to-imperial-gold/20 rounded-full animate-ping"></div>
            <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-imperial-gold" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
          </div>

          {/* Titre principal */}
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-imperial-gold mb-6">
            Rejoignez la Révélation
          </h2>

          {/* Sous-titre mystique */}
          <p className="text-xl md:text-2xl text-rose-champagne/90 mb-4 max-w-3xl mx-auto leading-relaxed">
            Découvrez les secrets cachés de votre âme et débloquez votre véritable potentiel
          </p>

          <p className="text-lg text-rose-champagne/70 mb-12 max-w-2xl mx-auto">
            Recevez des révélations exclusives, des insights mystiques et accédez en premier aux nouvelles cartes archétypes
          </p>

          {/* Formulaire d'inscription */}
          <div className="max-w-md mx-auto">
            {!showSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse email mystique"
                    required
                    className="w-full px-6 py-4 bg-royal-purple/20 border-2 border-imperial-gold/30 rounded-full text-rose-champagne placeholder-rose-champagne/50 focus:border-imperial-gold focus:outline-none transition-all duration-300 hover:bg-royal-purple/30 focus:bg-royal-purple/40 focus:shadow-lg focus:shadow-imperial-gold/20 text-center"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-imperial-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shimmer-effect"></div>
                </div>

                <div className="relative group">
                  <button
                    type="submit"
                    disabled={isLoading || !email}
                    className="w-full bg-gradient-to-r from-imperial-gold via-yellow-400 to-imperial-gold hover:from-yellow-400 hover:via-imperial-gold hover:to-yellow-400 text-black font-playfair font-bold py-4 px-8 rounded-full transition-all duration-500 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-2xl hover:shadow-imperial-gold/30 relative overflow-hidden"
                  >
                    {/* Effet de brillance */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    {/* Particules flottantes */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute top-2 left-1/4 w-1 h-1 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                      <div className="absolute bottom-2 right-1/4 w-1 h-1 bg-white/30 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                    </div>
                    
                    <span className="relative z-10 flex items-center justify-center">
                      {isLoading && (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      )}
                      {isLoading ? 'Initiation en cours...' : 'Commencer ma Révélation'}
                    </span>
                  </button>
                </div>
              </form>
            ) : (
              /* Message de succès */
              <div className="animate-fade-in">
                <div className="relative mx-auto mb-6 w-16 h-16">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-emerald-400 to-green-400 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-transparent to-green-400/20 rounded-full animate-ping"></div>
                  <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                </div>

                <h3 className="text-2xl font-playfair font-bold text-green-400 mb-4">
                  Bienvenue dans la Communauté Mystique !
                </h3>
                
                <p className="text-rose-champagne/80 text-lg mb-6">
                  Votre voyage vers la révélation commence maintenant. Surveillez votre boîte email pour des insights exclusifs.
                </p>

                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto"></div>
              </div>
            )}
          </div>

          {/* Statistiques mystiques */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-imperial-gold mb-2">10,000+</div>
              <p className="text-rose-champagne/70">Âmes Révélées</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-imperial-gold mb-2">54</div>
              <p className="text-rose-champagne/70">Archétypes Uniques</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-imperial-gold mb-2">95%</div>
              <p className="text-rose-champagne/70">Transformations Réussies</p>
            </div>
          </div>
        </div>
      </div>

      {/* CSS pour les animations flottantes */}
      <style jsx>{`
        .floating-particle {
          animation: float 6s ease-in-out infinite;
        }
        .floating-particle:nth-child(2) {
          animation-delay: 1s;
        }
        .floating-particle:nth-child(3) {
          animation-delay: 2s;
        }
        .floating-particle:nth-child(4) {
          animation-delay: 3s;
        }
        .floating-particle:nth-child(5) {
          animation-delay: 4s;
        }
        .floating-particle:nth-child(6) {
          animation-delay: 5s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.7;
          }
          25% {
            transform: translateY(-10px) scale(1.1);
            opacity: 1;
          }
          50% {
            transform: translateY(-20px) scale(0.9);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-15px) scale(1.05);
            opacity: 0.9;
          }
        }
      `}</style>
    </section>
  );
}; 