import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Icône magique d'inscription avec animation de stroke
const InscriptionIcon = () => (
  <div className="relative w-20 h-20 mx-auto mb-6 group">
    <div className="absolute inset-0 bg-gradient-to-br from-imperial-gold/20 via-transparent to-imperial-gold/20 rounded-full animate-ping opacity-75"></div>
    <div className="absolute inset-2 bg-gradient-to-br from-black via-royal-purple to-black rounded-full border border-imperial-gold/30 group-hover:border-imperial-gold transition-all duration-500">
      <svg className="w-full h-full p-3 text-imperial-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="1.5" 
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          className="animate-[draw_3s_ease-in-out_infinite]"
          style={{ 
            strokeDasharray: '100',
            strokeDashoffset: '100',
            animation: 'draw 3s ease-in-out infinite'
          }}
        />
      </svg>
    </div>
    <div className="absolute -top-1 -right-1 w-4 h-4 bg-imperial-gold rounded-full animate-pulse"></div>
  </div>
);

// Icône mystique de révélation avec effet crystal
const RevelationIcon = () => (
  <div className="relative w-20 h-20 mx-auto mb-6 group">
    <div className="absolute inset-0 bg-gradient-to-br from-imperial-gold/20 via-transparent to-imperial-gold/20 rounded-full animate-ping opacity-75" style={{ animationDelay: '0.5s' }}></div>
    <div className="absolute inset-2 bg-gradient-to-br from-black via-royal-purple to-black rounded-full border border-imperial-gold/30 group-hover:border-imperial-gold transition-all duration-500">
      <svg className="w-full h-full p-3 text-imperial-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="1.5" 
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          className="animate-[draw_3s_ease-in-out_infinite]"
          style={{ 
            strokeDasharray: '150',
            strokeDashoffset: '150',
            animation: 'draw 3s ease-in-out infinite 0.5s'
          }}
        />
      </svg>
    </div>
    <div className="absolute -top-1 -right-1 w-4 h-4 bg-imperial-gold rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
  </div>
);

// Icône de transformation avec effet lightning
const TransformationIcon = () => (
  <div className="relative w-20 h-20 mx-auto mb-6 group">
    <div className="absolute inset-0 bg-gradient-to-br from-imperial-gold/20 via-transparent to-imperial-gold/20 rounded-full animate-ping opacity-75" style={{ animationDelay: '1s' }}></div>
    <div className="absolute inset-2 bg-gradient-to-br from-black via-royal-purple to-black rounded-full border border-imperial-gold/30 group-hover:border-imperial-gold transition-all duration-500">
      <svg className="w-full h-full p-3 text-imperial-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="1.5" 
          d="M13 10V3L4 14h7v7l9-11h-7z"
          className="animate-[draw_3s_ease-in-out_infinite]"
          style={{ 
            strokeDasharray: '120',
            strokeDashoffset: '120',
            animation: 'draw 3s ease-in-out infinite 1s'
          }}
        />
      </svg>
    </div>
    <div className="absolute -top-1 -right-1 w-4 h-4 bg-imperial-gold rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
  </div>
);

export const HowItWorks: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const cards = gsap.utils.toArray('.magic-step-card') as HTMLElement[];
      
      // Animation d'entrée spectaculaire
      gsap.fromTo(cards, 
        { 
          y: 120, 
          opacity: 0,
          scale: 0.7,
          rotationY: -25
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.4,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animation au hover pour chaque carte
      cards.forEach((card, index) => {
        const icon = card.querySelector('.step-icon');
        const flipCard = card.querySelector('.flip-card-inner');
        
        card.addEventListener('mouseenter', () => {
          gsap.to(icon, { 
            scale: 1.15, 
            rotation: 360,
            duration: 0.8, 
            ease: "power2.out" 
          });
          if (flipCard) {
            gsap.to(flipCard, { 
              rotationY: 180, 
              duration: 0.6, 
              ease: "power2.inOut" 
            });
          }
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(icon, { 
            scale: 1, 
            rotation: 0, 
            duration: 0.6, 
            ease: "power2.out" 
          });
          if (flipCard) {
            gsap.to(flipCard, { 
              rotationY: 0, 
              duration: 0.6, 
              ease: "power2.inOut" 
            });
          }
        });
      });
    }
  }, []);

  const steps = [
    {
      icon: <InscriptionIcon />,
      title: "Inscription",
      description: "Rejoignez notre univers mystique et créez votre profil unique pour débuter votre transformation personnelle.",
      backText: "Votre voyage commence ici. Chaque grande révélation nécessite un premier pas courageux."
    },
    {
      icon: <RevelationIcon />,
      title: "Révélation", 
      description: "Découvrez votre archétype parmi nos 54 cartes sacrées à travers un processus de révélation personnalisé.",
      backText: "Les mystères de votre âme se dévoilent. Laissez la magie opérer et révéler votre essence profonde."
    },
    {
      icon: <TransformationIcon />,
      title: "Transformation",
      description: "Intégrez cette connaissance précieuse dans votre quotidien pour une transformation authentique et durable.",
      backText: "La vraie magie réside dans l'application. Votre archétype devient la clé de votre évolution."
    }
  ];

  return (
    <section ref={containerRef} className="relative py-20 sm:py-32 bg-gradient-to-b from-black via-black/95 to-black overflow-hidden">
      {/* Particules flottantes en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-imperial-gold/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header mystique */}
        <div className="text-center mb-20">
          <div className="inline-block relative">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-transparent bg-gradient-to-br from-imperial-gold via-yellow-300 to-imperial-gold bg-clip-text mb-6">
              Comment ça marche
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-imperial-gold to-transparent animate-pulse"></div>
          </div>
          <p className="text-lg text-rose-champagne/70 mt-8 max-w-2xl mx-auto">
            Découvrez votre archétype en trois étapes mystiques
          </p>
        </div>

        {/* Steps avec effet flip magique */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="magic-step-card group relative perspective-1000"
            >
              <div className="flip-card-inner relative w-full h-80 transition-transform duration-700 preserve-3d">
                {/* Face avant */}
                <div className="flip-card-front absolute inset-0 backface-hidden">
                  <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-black via-royal-purple/30 to-black border border-imperial-gold/30 group-hover:border-imperial-gold/60 transition-all duration-500 backdrop-blur-sm relative overflow-hidden">
                    {/* Effet lumineux magique */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-imperial-gold/50 to-transparent group-hover:via-imperial-gold transition-all duration-500"></div>
                    
                    {/* Badge numéro stylisé */}
                    <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-imperial-gold to-yellow-600 rounded-full flex items-center justify-center text-black font-bold text-lg shadow-lg border-2 border-black">
                      {index + 1}
                    </div>

                    <div className="text-center h-full flex flex-col justify-center">
                      {/* Icon */}
                      <div className="step-icon mb-6">
                        {step.icon}
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-imperial-gold mb-6 group-hover:text-yellow-300 transition-colors">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-rose-champagne/80 leading-relaxed text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Face arrière */}
                <div className="flip-card-back absolute inset-0 backface-hidden rotate-y-180">
                  <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-royal-purple/40 via-black to-royal-purple/40 border border-imperial-gold/60 backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-imperial-gold/10 via-transparent to-imperial-gold/10"></div>
                    
                    <div className="text-center h-full flex flex-col justify-center relative z-10">
                      <div className="text-6xl mb-6 animate-pulse">
                        {index === 0 ? '✨' : index === 1 ? '🔮' : '⚡'}
                      </div>
                      <p className="text-imperial-gold font-playfair text-lg leading-relaxed italic">
                        {step.backText}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 