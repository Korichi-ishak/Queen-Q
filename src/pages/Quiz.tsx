import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import confetti from 'canvas-confetti';
import { useTranslation } from '../context/TranslationContext';

gsap.registerPlugin(Flip);

interface QuizOption {
  id: string;
  text: string;
  icon: JSX.Element;
  value: string;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

interface QueenResult {
  id: string;
  name: string;
  description: string;
  color: string;
  pattern: string;
  element: string;
}

// Creative SVG Icons
const CreativeIcons = {
  brain: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D6AE60" />
          <stop offset="100%" stopColor="#C4A569" />
        </linearGradient>
      </defs>
      <path d="M30 25 Q50 15 70 25 Q80 35 75 50 Q70 65 50 70 Q30 65 25 50 Q20 35 30 25 Z" 
            fill="url(#brainGrad)" stroke="#D6AE60" strokeWidth="2"/>
      <circle cx="40" cy="40" r="3" fill="#FFF" opacity="0.8"/>
      <circle cx="60" cy="45" r="2" fill="#FFF" opacity="0.6"/>
    </svg>
  ),
  intuition: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="intuitionGrad" cx="50%" cy="30%">
          <stop offset="0%" stopColor="#E4C97A" />
          <stop offset="100%" stopColor="#D6AE60" />
        </radialGradient>
      </defs>
      <path d="M50 20 L58 35 L45 35 Z" fill="url(#intuitionGrad)"/>
      <circle cx="50" cy="45" r="15" fill="none" stroke="#D6AE60" strokeWidth="2" strokeDasharray="5,5"/>
      <path d="M35 55 Q50 70 65 55" stroke="#D6AE60" strokeWidth="2" fill="none"/>
    </svg>
  ),
  creativity: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="creativityGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E4C97A" />
          <stop offset="50%" stopColor="#D6AE60" />
          <stop offset="100%" stopColor="#C4A569" />
        </linearGradient>
      </defs>
      <path d="M20 50 Q35 25 50 50 Q65 25 80 50 Q65 75 50 50 Q35 75 20 50 Z" 
            fill="url(#creativityGrad)" opacity="0.8"/>
      <circle cx="50" cy="50" r="8" fill="#FFF" opacity="0.9"/>
    </svg>
  ),
  boldness: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="boldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D6AE60" />
          <stop offset="100%" stopColor="#E4C97A" />
        </linearGradient>
      </defs>
      <polygon points="50,25 40,45 25,45 35,60 30,75 50,65 70,75 65,60 75,45 60,45" 
               fill="url(#boldGrad)" stroke="#D6AE60" strokeWidth="1"/>
    </svg>
  ),
  nature: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M50 75 Q40 60 35 45 Q45 35 50 45 Q55 35 65 45 Q60 60 50 75 Z" 
            fill="#D6AE60" opacity="0.8"/>
      <rect x="47" y="70" width="6" height="15" fill="#C4A569"/>
    </svg>
  ),
  adventure: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <polygon points="20,70 30,30 50,25 70,30 80,70 70,75 50,80 30,75" 
               fill="none" stroke="#D6AE60" strokeWidth="2"/>
      <path d="M35 50 L50 40 L65 50" stroke="#D6AE60" strokeWidth="2" fill="none"/>
    </svg>
  )
};

export const Quiz: React.FC = () => {
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<QueenResult | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLElement[]>([]);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Floating particles animation
  useEffect(() => {
    if (!prefersReducedMotion && particlesRef.current) {
      const particles = particlesRef.current.children;
      Array.from(particles).forEach((particle, index) => {
        gsap.to(particle, {
          y: "random(-20, 20)",
          x: "random(-20, 20)",
          rotation: "random(-360, 360)",
          duration: "random(3, 6)",
          repeat: -1,
          yoyo: true,
          delay: index * 0.2,
          ease: "sine.inOut"
        });
      });
    }
  }, [prefersReducedMotion]);

  // Quiz questions with creative options
  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "Face à l'inconnu, votre première réaction est de...",
      options: [
        { id: "1a", text: "Analyser chaque détail", icon: CreativeIcons.brain, value: "analytical" },
        { id: "1b", text: "Faire confiance à votre ressenti", icon: CreativeIcons.intuition, value: "intuitive" },
        { id: "1c", text: "Imaginer les possibilités", icon: CreativeIcons.creativity, value: "creative" },
        { id: "1d", text: "Foncer tête première", icon: CreativeIcons.boldness, value: "bold" }
      ]
    },
    {
      id: 2,
      question: "Votre environnement idéal pour vous ressourcer ?",
      options: [
        { id: "2a", text: "Une forêt silencieuse", icon: CreativeIcons.nature, value: "intuitive" },
        { id: "2b", text: "Un atelier d'artiste", icon: CreativeIcons.creativity, value: "creative" },
        { id: "2c", text: "Une bibliothèque ancienne", icon: CreativeIcons.brain, value: "analytical" },
        { id: "2d", text: "Un sommet de montagne", icon: CreativeIcons.adventure, value: "bold" }
      ]
    },
    {
      id: 3,
      question: "Quand vous prenez une décision importante...",
      options: [
        { id: "3a", text: "Vous méditez longuement", icon: CreativeIcons.intuition, value: "intuitive" },
        { id: "3b", text: "Vous explorez toutes les options", icon: CreativeIcons.creativity, value: "creative" },
        { id: "3c", text: "Vous pesez le pour et le contre", icon: CreativeIcons.brain, value: "analytical" },
        { id: "3d", text: "Vous suivez votre instinct d'action", icon: CreativeIcons.boldness, value: "bold" }
      ]
    },
    {
      id: 4,
      question: "Votre plus grande source d'inspiration ?",
      options: [
        { id: "4a", text: "Les mystères de l'univers", icon: CreativeIcons.intuition, value: "intuitive" },
        { id: "4b", text: "L'art sous toutes ses formes", icon: CreativeIcons.creativity, value: "creative" },
        { id: "4c", text: "Les découvertes scientifiques", icon: CreativeIcons.brain, value: "analytical" },
        { id: "4d", text: "Les défis impossibles", icon: CreativeIcons.boldness, value: "bold" }
      ]
    },
    {
      id: 5,
      question: "Dans un groupe, vous êtes naturellement...",
      options: [
        { id: "5a", text: "L'âme spirituelle", icon: CreativeIcons.intuition, value: "intuitive" },
        { id: "5b", text: "La source d'idées", icon: CreativeIcons.creativity, value: "creative" },
        { id: "5c", text: "Le conseiller sage", icon: CreativeIcons.brain, value: "analytical" },
        { id: "5d", text: "Le leader d'action", icon: CreativeIcons.boldness, value: "bold" }
      ]
    },
    {
      id: 6,
      question: "Votre rapport au temps est plutôt...",
      options: [
        { id: "6a", text: "Cyclique et spirituel", icon: CreativeIcons.intuition, value: "intuitive" },
        { id: "6b", text: "Créatif et fluide", icon: CreativeIcons.creativity, value: "creative" },
        { id: "6c", text: "Structuré et optimisé", icon: CreativeIcons.brain, value: "analytical" },
        { id: "6d", text: "Urgent et intense", icon: CreativeIcons.boldness, value: "bold" }
      ]
    },
    {
      id: 7,
      question: "Ce qui vous motive le plus profondément ?",
      options: [
        { id: "7a", text: "La connexion authentique", icon: CreativeIcons.intuition, value: "intuitive" },
        { id: "7b", text: "L'expression créative", icon: CreativeIcons.creativity, value: "creative" },
        { id: "7c", text: "La compréhension profonde", icon: CreativeIcons.brain, value: "analytical" },
        { id: "7d", text: "L'impact transformateur", icon: CreativeIcons.boldness, value: "bold" }
      ]
    },
    {
      id: 8,
      question: "Votre vision de l'avenir idéal ?",
      options: [
        { id: "8a", text: "Harmonie et paix intérieure", icon: CreativeIcons.intuition, value: "intuitive" },
        { id: "8b", text: "Innovation et beauté", icon: CreativeIcons.creativity, value: "creative" },
        { id: "8c", text: "Sagesse et équilibre", icon: CreativeIcons.brain, value: "analytical" },
        { id: "8d", text: "Liberté et aventures", icon: CreativeIcons.boldness, value: "bold" }
      ]
    }
  ];

  // Queen results with rich descriptions
  const queenResults: Record<string, QueenResult> = {
    intuitive: {
      id: "intuitive",
      name: "La Mystique des Profondeurs",
      description: "Vous naviguez dans les eaux profondes de l'intuition avec une grâce naturelle. Votre connexion aux énergies subtiles vous permet de percevoir ce que d'autres ne voient pas. Vous êtes une guide spirituelle née, capable de révéler les vérités cachées et d'éclairer les chemins obscurs.",
      color: "from-purple-600 via-violet-500 to-indigo-600",
      pattern: "radial",
      element: "L'Eau Sacrée"
    },
    creative: {
      id: "creative", 
      name: "L'Architecte des Rêves",
      description: "Votre imagination est un portail vers des mondes infinis. Vous transformez le vide en beauté, l'ordinaire en extraordinaire. Chaque pensée devient art, chaque vision devient réalité. Vous êtes celle qui peint l'impossible et sculpte l'avenir avec ses mains créatrices.",
      color: "from-orange-500 via-amber-400 to-yellow-500",
      pattern: "conic",
      element: "Le Feu Créateur"
    },
    analytical: {
      id: "analytical",
      name: "La Gardienne de la Sagesse",
      description: "Dans le temple de votre esprit résident mille bibliothèques. Vous déchiffrez les mystères de l'existence avec la précision d'un maître horloger. Votre intelligence illumine les ténèbres de l'ignorance et votre sagesse guide les âmes perdues vers la vérité.",
      color: "from-blue-600 via-cyan-500 to-teal-500",
      pattern: "linear",
      element: "L'Air de la Connaissance"
    },
    bold: {
      id: "bold",
      name: "La Conquérante des Impossibles", 
      description: "Votre courage enflamme les cœurs et votre détermination déplace les montagnes. Vous êtes la tempête qui brise les chaînes, la force qui transforme les obstacles en tremplins. Face à l'adversité, vous ne reculez jamais - vous avancez, toujours plus loin.",
      color: "from-red-600 via-rose-500 to-pink-500",
      pattern: "diagonal",
      element: "La Terre Inébranlable"
    }
  };

  // Page entrance animation
  useEffect(() => {
    if (containerRef.current && !prefersReducedMotion) {
      gsap.fromTo(containerRef.current, 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [prefersReducedMotion]);

  // Progress bar animation
  useEffect(() => {
    if (progressRef.current && !showResult) {
      const progress = ((currentQuestion + 1) / questions.length) * 100;
      gsap.to(progressRef.current, {
        width: `${progress}%`,
        duration: 0.8,
        ease: "power2.out"
      });
    }
  }, [currentQuestion, showResult]);

  // Stagger options entrance
  useEffect(() => {
    if (!prefersReducedMotion && optionsRef.current.length > 0) {
      gsap.fromTo(optionsRef.current,
        { scale: 0.9, opacity: 0, y: 30, rotationX: -15 },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0,
          rotationX: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "back.out(1.4)"
        }
      );
    }
  }, [currentQuestion, prefersReducedMotion]);

  const handleOptionSelect = (optionValue: string, optionId: string) => {
    setSelectedOption(optionId);
    
    if (!prefersReducedMotion) {
      const selectedElement = optionsRef.current.find(el => 
        el && el.dataset.optionId === optionId
      );
      
      if (selectedElement) {
        gsap.to(selectedElement, {
          scale: 1.1,
          rotationY: 360,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            proceedToNext(optionValue);
          }
        });
      } else {
        proceedToNext(optionValue);
      }
    } else {
      setTimeout(() => proceedToNext(optionValue), 400);
    }
  };

  const proceedToNext = (optionValue: string) => {
    const newAnswers = [...answers, optionValue];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result
      const counts = newAnswers.reduce((acc, answer) => {
        acc[answer] = (acc[answer] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const dominantType = Object.entries(counts).reduce((a, b) => 
        counts[a[0]] > counts[b[0]] ? a : b
      )[0];

      setResult(queenResults[dominantType]);
      setShowResult(true);
      
      // Enhanced confetti
      setTimeout(() => {
        const colors = ['#D6AE60', '#C4A569', '#E4C97A', '#F5E6B3'];
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { y: 0.6 },
          colors: colors,
          shapes: ['star', 'circle'],
          scalar: 1.2
        });
        
        // Second burst
        setTimeout(() => {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 },
            colors: colors
          });
        }, 200);
      }, 800);

      // Analytics
      if (typeof window !== 'undefined' && (window as any).plausible) {
        (window as any).plausible('quiz_finished', {
          props: { queen: queenResults[dominantType].name }
        });
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowResult(false);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#3B1E50] to-[#2d1444] py-20">
      {/* Background Particles */}
      <div ref={particlesRef} className="fixed inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-imperial-gold rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        ref={containerRef}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentQuestion}
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              {/* Mystical Header */}
              <div className="text-center mb-12">
                <motion.div
                  className="inline-block"
                  initial={{ rotateY: -180, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold bg-gradient-to-r from-imperial-gold via-rose-champagne to-imperial-gold bg-clip-text text-transparent mb-4">
                    Révélation de votre Essence
                  </h1>
                  <div className="w-32 h-1 bg-gradient-to-r from-transparent via-imperial-gold to-transparent mx-auto mb-6"></div>
                </motion.div>
              </div>

              {/* Progress Section */}
              <div className="mb-16">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-rose-champagne/80 text-lg font-medium">
                    Étape {currentQuestion + 1} sur {questions.length}
                  </span>
                  <span className="text-imperial-gold text-lg font-bold">
                    {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                  </span>
                </div>
                
                <div className="relative w-full h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                  <div
                    ref={progressRef}
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-imperial-gold via-rose-champagne to-imperial-gold rounded-full shadow-lg shadow-imperial-gold/30"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
                </div>
              </div>

              {/* Question Section */}
              <fieldset className="mb-16">
                <legend className="sr-only">Question {currentQuestion + 1}</legend>
                <motion.h2 
                  className="text-2xl md:text-3xl lg:text-4xl font-playfair font-bold text-center mb-16 leading-relaxed"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <span className="bg-gradient-to-r from-white via-rose-champagne to-white bg-clip-text text-transparent">
                    {questions[currentQuestion].question}
                  </span>
                </motion.h2>

                {/* Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={option.id}
                      ref={el => optionsRef.current[index] = el!}
                      data-option-id={option.id}
                      onClick={() => handleOptionSelect(option.value, option.id)}
                      disabled={selectedOption !== null}
                      className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/20 hover:border-imperial-gold/50 rounded-3xl p-8 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-imperial-gold focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 overflow-hidden"
                      style={{ perspective: '1000px' }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Background Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-imperial-gold/10 via-transparent to-rose-champagne/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Icon Container */}
                      <div className="relative mb-6">
                        <div className="w-20 h-20 mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-500">
                          {option.icon}
                        </div>
                      </div>

                      {/* Text */}
                      <p className="relative text-white font-medium text-lg leading-relaxed group-hover:text-imperial-gold transition-colors duration-300">
                        {option.text}
                      </p>

                      {/* Selection Indicator */}
                      {selectedOption === option.id && (
                        <motion.div
                          className="absolute inset-0 border-2 border-imperial-gold rounded-3xl"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </fieldset>
            </motion.div>
          ) : (
            // Enhanced Result Screen
            <motion.div
              className="text-center relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "back.out(1.2)" }}
            >
              {result && (
                <>
                  {/* Result Background Pattern */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${result.color} opacity-5 rounded-3xl blur-3xl`}></div>
                  
                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-12 border border-white/20">
                    {/* Crown Symbol */}
                    <motion.div
                      className="mb-8"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3, duration: 1, ease: "back.out(1.4)" }}
                    >
                      <svg className="w-24 h-24 mx-auto text-imperial-gold" viewBox="0 0 100 100" fill="currentColor">
                        <path d="M50 15 L40 35 L20 30 L30 50 L20 70 L40 65 L50 85 L60 65 L80 70 L70 50 L80 30 L60 35 Z"/>
                        <circle cx="50" cy="50" r="8" fill="#FFF"/>
                      </svg>
                    </motion.div>

                    <motion.h2
                      className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-6"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    >
                      <span className={`bg-gradient-to-r ${result.color} bg-clip-text text-transparent`}>
                        {result.name}
                      </span>
                    </motion.h2>

                    <motion.div
                      className="mb-8"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.8 }}
                    >
                      <div className="inline-block px-6 py-3 bg-gradient-to-r from-imperial-gold/20 to-rose-champagne/20 rounded-full border border-imperial-gold/30 mb-6">
                        <span className="text-imperial-gold font-medium">Élément: {result.element}</span>
                      </div>
                    </motion.div>

                    <motion.p
                      className="text-rose-champagne/90 text-xl md:text-2xl leading-relaxed mb-12 max-w-3xl mx-auto"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.9, duration: 0.8 }}
                    >
                      {result.description}
                    </motion.p>

                    <motion.div
                      className="flex flex-col sm:flex-row gap-6 justify-center"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.1, duration: 0.8 }}
                    >
                      <motion.button
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({
                              title: `Je suis ${result.name} !`,
                              text: result.description,
                              url: window.location.href
                            });
                          }
                        }}
                        className="px-8 py-4 bg-gradient-to-r from-imperial-gold to-rose-champagne hover:from-rose-champagne hover:to-imperial-gold text-royal-purple font-bold rounded-xl transition-all duration-300 shadow-lg shadow-imperial-gold/30 hover:shadow-imperial-gold/50 transform hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Partager ma Révélation
                      </motion.button>
                      
                      <motion.button
                        onClick={() => window.location.href = '/#hero'}
                        className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-imperial-gold/50 font-bold rounded-xl transition-all duration-300 backdrop-blur-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Rejoindre la Communauté Royale
                      </motion.button>

                      <motion.button
                        onClick={resetQuiz}
                        className="px-6 py-4 text-rose-champagne/80 hover:text-imperial-gold underline transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Recommencer le Voyage
                      </motion.button>
                    </motion.div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}; 