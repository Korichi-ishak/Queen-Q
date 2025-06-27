import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  name: string;
  archetype: string;
  text: string;
  rating: number;
  avatar: string;
}

export const Testimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      name: "Marie L.",
      archetype: "L'Exploratrice",
      text: "Cette expérience a complètement transformé ma vision de moi-même. Découvrir mon archétype m'a aidée à comprendre mes motivations profondes et à embrasser ma vraie nature.",
      rating: 5,
      avatar: "M"
    },
    {
      name: "Thomas R.",
      archetype: "Le Sage", 
      text: "Incroyable précision dans l'analyse. Je me suis reconnu dans chaque aspect de mon archétype. Une révélation authentique qui guide désormais mes choix de vie.",
      rating: 5,
      avatar: "T"
    },
    {
      name: "Sophie M.",
      archetype: "La Créatrice",
      text: "Un voyage introspectif fascinant. Les insights obtenus m'accompagnent quotidiennement dans mes décisions importantes et ont libéré ma créativité.",
      rating: 5,
      avatar: "S"
    },
    {
      name: "Alex D.",
      archetype: "Le Guerrier",
      text: "Une approche moderne des archétypes jungiens. J'ai enfin compris pourquoi certaines situations me galvanisent et d'autres m'épuisent. Révolutionnaire !",
      rating: 5,
      avatar: "A"
    },
    {
      name: "Luna K.",
      archetype: "La Magicienne",
      text: "L'expérience la plus transformative de ma vie. Mon archétype m'a révélé des aspects cachés de ma personnalité et m'a donné des clés pour mon épanouissement.",
      rating: 5,
      avatar: "L"
    }
  ];

  useEffect(() => {
    if (containerRef.current) {
      const cards = gsap.utils.toArray('.confession-card') as HTMLElement[];
      
      gsap.fromTo(cards, 
        { 
          y: 80, 
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Auto-rotation du carrousel
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length]
  ];

  return (
    <section 
      ref={containerRef} 
      className="relative py-20 sm:py-32 bg-black overflow-hidden"
    >
      {/* Étoiles flottantes mystiques */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            <div className="w-1 h-1 bg-imperial-gold rounded-full shadow-lg shadow-imperial-gold/50" />
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header élégant */}
        <div className="text-center mb-20">
          <div className="inline-block relative">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-transparent bg-gradient-to-br from-imperial-gold via-yellow-300 to-imperial-gold bg-clip-text mb-6">
              Confessions d'Âmes
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-0.5 bg-gradient-to-r from-transparent via-imperial-gold to-transparent animate-pulse"></div>
          </div>
          <p className="text-lg text-rose-champagne/70 mt-8 max-w-3xl mx-auto">
            Les révélations authentiques de ceux qui ont découvert leur véritable essence
          </p>
        </div>

        {/* Carrousel de témoignages */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 mb-12">
          {visibleTestimonials.map((testimonial, index) => (
            <div
              key={`${currentIndex}-${index}`}
              className={`confession-card group relative ${
                index === 1 ? 'lg:scale-105 lg:z-10' : 'lg:scale-95'
              } transition-all duration-700`}
            >
              <div className="h-80 p-8 rounded-3xl bg-gradient-to-br from-black via-royal-purple/20 to-black border border-imperial-gold/30 group-hover:border-imperial-gold/60 transition-all duration-500 backdrop-blur-sm relative overflow-hidden">
                {/* Effet d'aura magique */}
                <div className="absolute inset-0 bg-gradient-to-br from-imperial-gold/5 via-transparent to-royal-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Avatar mystique */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-imperial-gold to-yellow-600 rounded-full flex items-center justify-center text-black font-bold text-xl shadow-xl">
                      {testimonial.avatar}
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-br from-imperial-gold/30 to-transparent rounded-full animate-ping opacity-30"></div>
                  </div>
                </div>

                {/* Étoiles magiques */}
                <div className="flex justify-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 text-imperial-gold mx-1 animate-pulse"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  ))}
                </div>

                {/* Confession */}
                <blockquote className="text-rose-champagne/90 italic text-center mb-6 leading-relaxed text-sm relative z-10">
                  <span className="text-imperial-gold text-4xl absolute -top-2 -left-2 opacity-30">"</span>
                  {testimonial.text}
                  <span className="text-imperial-gold text-4xl absolute -bottom-6 -right-2 opacity-30">"</span>
                </blockquote>

                {/* Signature mystique */}
                <div className="text-center relative z-10">
                  <p className="text-imperial-gold font-playfair font-bold text-lg mb-1">
                    {testimonial.name}
                  </p>
                  <p className="text-rose-champagne/60 text-sm font-light">
                    Archétype révélé : <span className="text-imperial-gold/80">{testimonial.archetype}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicateurs de carrousel mystiques */}
        <div className="flex justify-center space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-imperial-gold shadow-lg shadow-imperial-gold/50' 
                  : 'bg-imperial-gold/30 hover:bg-imperial-gold/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}; 