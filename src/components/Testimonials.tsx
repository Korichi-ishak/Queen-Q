import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from '../context/TranslationContext';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: string;
  name: string;
  archetype: string;
  text: string;
  rating: number;
  avatar: string;
  mood: 'warm' | 'mystical' | 'energetic' | 'serene' | 'powerful';
}

export const Testimonials: React.FC = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<string | null>(null);

  // Use translation system for testimonials - All women
  const testimonials: Testimonial[] = [
    {
      id: 'marie',
      name: t('testimonials.marie.name'),
      archetype: t('testimonials.marie.archetype'),
      text: t('testimonials.marie.text'),
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      mood: 'warm'
    },
    {
      id: 'sophie',
      name: t('testimonials.sophie.name'),
      archetype: t('testimonials.sophie.archetype'),
      text: t('testimonials.sophie.text'),
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      mood: 'energetic'
    },
    {
      id: 'clara',
      name: t('testimonials.clara.name'),
      archetype: t('testimonials.clara.archetype'),
      text: t('testimonials.clara.text'),
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      mood: 'serene'
    },
    {
      id: 'julie',
      name: t('testimonials.julie.name'),
      archetype: t('testimonials.julie.archetype'),
      text: t('testimonials.julie.text'),
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b188?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      mood: 'mystical'
    },
    {
      id: 'camille',
      name: t('testimonials.camille.name'),
      archetype: t('testimonials.camille.archetype'),
      text: t('testimonials.camille.text'),
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
      mood: 'powerful'
    }
  ];

  useEffect(() => {
    if (containerRef.current) {
      const cards = gsap.utils.toArray('.soul-card') as HTMLElement[];
      
      gsap.fromTo(cards, 
        { 
          y: 60, 
          opacity: 0,
          rotateX: 15
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const getMoodColors = (mood: string) => {
    switch (mood) {
      case 'warm': return {
        bg: 'from-orange-900/20 via-amber-900/10 to-yellow-900/20',
        border: 'border-amber-500/30',
        glow: 'shadow-amber-500/20',
        accent: 'text-amber-400'
      };
      case 'mystical': return {
        bg: 'from-purple-900/20 via-indigo-900/10 to-blue-900/20',
        border: 'border-indigo-500/30',
        glow: 'shadow-indigo-500/20',
        accent: 'text-indigo-400'
      };
      case 'energetic': return {
        bg: 'from-red-900/20 via-pink-900/10 to-rose-900/20',
        border: 'border-pink-500/30',
        glow: 'shadow-pink-500/20',
        accent: 'text-pink-400'
      };
      case 'powerful': return {
        bg: 'from-slate-900/20 via-gray-900/10 to-zinc-900/20',
        border: 'border-slate-500/30',
        glow: 'shadow-slate-500/20',
        accent: 'text-slate-300'
      };
      case 'serene': return {
        bg: 'from-emerald-900/20 via-teal-900/10 to-cyan-900/20',
        border: 'border-teal-500/30',
        glow: 'shadow-teal-500/20',
        accent: 'text-teal-400'
      };
      default: return {
        bg: 'from-imperial-gold/20 via-royal-purple/10 to-imperial-gold/20',
        border: 'border-imperial-gold/30',
        glow: 'shadow-imperial-gold/20',
        accent: 'text-imperial-gold'
      };
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative py-24 sm:py-32 bg-gradient-to-b from-black via-royal-purple/5 to-black overflow-hidden"
    >
      {/* Organic background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Flowing particles with organic movement */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${10 + Math.random() * 80}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          >
            <div 
              className="bg-imperial-gold/20 rounded-full blur-sm" 
              style={{
                width: `${8 + Math.random() * 16}px`,
                height: `${8 + Math.random() * 16}px`
              }}
            />
          </div>
        ))}
        
        {/* Organic light patterns */}
        <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-gradient-radial from-imperial-gold/10 to-transparent rounded-full blur-2xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/5 w-40 h-40 bg-gradient-radial from-royal-purple/15 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Handcrafted header */}
        <div className="text-center mb-16">
          <div className="inline-block relative">
            {/* Creative title with handwritten feel */}
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-playfair font-bold mb-8 relative">
              <span className="block text-transparent bg-gradient-to-r from-imperial-gold via-rose-champagne to-imperial-gold bg-clip-text transform -rotate-1">
                {t('testimonials.title')}
              </span>
              {/* Underline scribble */}
              <svg className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-4" viewBox="0 0 200 20" fill="none">
                <path d="M10 15Q50 5 100 12T190 8" stroke="currentColor" strokeWidth="2" fill="none" className="text-imperial-gold/60" strokeLinecap="round" />
                <path d="M15 17Q60 8 110 14T195 10" stroke="currentColor" strokeWidth="1.5" fill="none" className="text-imperial-gold/40" strokeLinecap="round" />
              </svg>
            </h2>
          </div>
          <p className="text-xl text-rose-champagne/80 max-w-2xl mx-auto leading-relaxed font-light">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Irregular card layout - like scattered photos */}
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {testimonials.map((testimonial, index) => {
              const colors = getMoodColors(testimonial.mood);
              const isActive = activeCard === testimonial.id;
              
              return (
                <div
                  key={testimonial.id}
                  className={`soul-card group relative ${
                    index === 1 ? 'lg:mt-12' : 
                    index === 3 ? 'lg:-mt-8' : 
                    index === 4 ? 'lg:mt-6' : ''
                  } transform transition-all duration-500 hover:scale-105 ${
                    isActive ? 'z-20' : 'z-10'
                  }`}
                  onMouseEnter={() => setActiveCard(testimonial.id)}
                  onMouseLeave={() => setActiveCard(null)}
                  style={{
                    transform: `rotate(${Math.random() * 4 - 2}deg)` // Slight random rotation
                  }}
                >
                  {/* Card shadow for depth */}
                  <div className="absolute inset-0 bg-black/20 rounded-2xl transform translate-x-2 translate-y-2 blur-sm" />
                  
                  {/* Main card */}
                  <div className={`relative bg-gradient-to-br ${colors.bg} backdrop-blur-md border ${colors.border} rounded-2xl p-8 transition-all duration-500 group-hover:${colors.glow} group-hover:shadow-2xl`}>
                    {/* Organic corner decoration */}
                    <div className="absolute top-3 right-3 w-8 h-8 opacity-30">
                      <svg viewBox="0 0 32 32" fill="none" className={colors.accent}>
                        <path d="M8 24c4-4 8-8 12-4s4 8 8 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                        <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.5" />
                      </svg>
                    </div>
                    
                                         {/* Personal avatar with handmade feel */}
                     <div className="flex items-start gap-4 mb-6">
                       <div className="relative">
                         <div className={`w-14 h-14 ${colors.border} border-2 rounded-full overflow-hidden transform -rotate-3 transition-transform group-hover:rotate-0 shadow-lg`}>
                           <img 
                             src={testimonial.avatar} 
                             alt={`${t('accessibility.photoOf')} ${testimonial.name}`}
                             className="w-full h-full object-cover"
                             loading="lazy"
                             onError={(e) => {
                               // Fallback to initials if image fails to load
                               const target = e.target as HTMLImageElement;
                               const parent = target.parentElement;
                               if (parent) {
                                 parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br ${colors.bg} flex items-center justify-center font-bold text-lg text-rose-champagne">${testimonial.name.charAt(0)}</div>`;
                               }
                             }}
                           />
                         </div>
                         {/* Mood indicator */}
                         <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${colors.accent} rounded-full opacity-60`}>
                           <div className="w-full h-full bg-current rounded-full animate-pulse" />
                         </div>
                       </div>
                      
                      <div className="flex-1">
                        <h3 className="font-playfair font-bold text-lg text-rose-champagne mb-1">
                          {testimonial.name}
                        </h3>
                        <p className={`text-sm font-medium ${colors.accent}`}>
                          {testimonial.archetype}
                        </p>
                      </div>
                    </div>

                    {/* Stars with organic spacing */}
                    <div className="flex gap-1 mb-6 justify-start">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-4 h-4 ${colors.accent} transition-all duration-300`}
                          style={{ 
                            animationDelay: `${i * 0.1}s`,
                            transform: `rotate(${Math.random() * 20 - 10}deg) scale(${0.8 + Math.random() * 0.4})`
                          }}
                        >
                          <svg fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      ))}
                    </div>

                    {/* Testimonial text with natural formatting */}
                    <blockquote className="text-rose-champagne/90 leading-relaxed text-base relative mb-6">
                      {/* Opening quote */}
                      <span className={`${colors.accent} text-3xl absolute -top-2 -left-2 opacity-50 font-serif`}>"</span>
                      <span className="block pl-4">
                        {testimonial.text}
                      </span>
                      {/* Closing quote */}
                      <span className={`${colors.accent} text-3xl absolute -bottom-4 -right-2 opacity-50 font-serif`}>"</span>
                    </blockquote>

                    {/* Signature line */}
                    <div className="flex items-center justify-between pt-4 border-t border-rose-champagne/20">
                      <div className={`text-xs ${colors.accent} font-medium`}>
                        {t('testimonials.archetype')}
                      </div>
                      <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className={`w-1 h-1 ${colors.accent} rounded-full opacity-60`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom accent */}
        <div className="text-center mt-20">
          <div className="inline-block w-32 h-px bg-gradient-to-r from-transparent via-imperial-gold/50 to-transparent" />
          <div className="w-2 h-2 bg-imperial-gold/60 rounded-full mx-auto mt-2" />
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.6;
          }
          25% {
            transform: translateY(-15px) translateX(5px) rotate(2deg);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-25px) translateX(-5px) rotate(-1deg);
            opacity: 1;
          }
          75% {
            transform: translateY(-10px) translateX(8px) rotate(1deg);
            opacity: 0.9;
          }
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </section>
  );
}; 