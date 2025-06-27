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
  icon: string;
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
  svg: string;
}

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
  const optionsRef = useRef<HTMLDivElement[]>([]);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Quiz questions data
  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "Quelle est votre approche face à un défi inattendu ?",
      options: [
        { id: "1a", text: "J'analyse calmement", icon: "🧠", value: "analytical" },
        { id: "1b", text: "Je fais confiance à mon instinct", icon: "✨", value: "intuitive" },
        { id: "1c", text: "Je cherche l'inspiration", icon: "🎨", value: "creative" },
        { id: "1d", text: "Je prends des risques calculés", icon: "⚡", value: "bold" }
      ]
    },
    {
      id: 2,
      question: "Comment préférez-vous passer votre temps libre ?",
      options: [
        { id: "2a", text: "Méditer en nature", icon: "🌿", value: "intuitive" },
        { id: "2b", text: "Créer quelque chose", icon: "🎭", value: "creative" },
        { id: "2c", text: "Apprendre de nouvelles choses", icon: "📚", value: "analytical" },
        { id: "2d", text: "Vivre des aventures", icon: "🏔️", value: "bold" }
      ]
    },
    {
      id: 3,
      question: "Quel est votre plus grand atout ?",
      options: [
        { id: "3a", text: "Ma sagesse intérieure", icon: "🔮", value: "intuitive" },
        { id: "3b", text: "Ma créativité", icon: "🌈", value: "creative" },
        { id: "3c", text: "Mon esprit logique", icon: "⚖️", value: "analytical" },
        { id: "3d", text: "Mon courage", icon: "🦁", value: "bold" }
      ]
    },
    {
      id: 4,
      question: "Comment inspirez-vous les autres ?",
      options: [
        { id: "4a", text: "Par mon authenticité", icon: "💎", value: "intuitive" },
        { id: "4b", text: "Par ma vision unique", icon: "👁️", value: "creative" },
        { id: "4c", text: "Par mes conseils avisés", icon: "🎯", value: "analytical" },
        { id: "4d", text: "Par mon exemple", icon: "🌟", value: "bold" }
      ]
    },
    {
      id: 5,
      question: "Quelle couleur résonne le plus avec vous ?",
      options: [
        { id: "5a", text: "Violet mystique", icon: "🔮", value: "intuitive" },
        { id: "5b", text: "Orange créatif", icon: "🎨", value: "creative" },
        { id: "5c", text: "Bleu sagesse", icon: "💙", value: "analytical" },
        { id: "5d", text: "Rouge passion", icon: "❤️", value: "bold" }
      ]
    },
    {
      id: 6,
      question: "Quel symbole vous attire le plus ?",
      options: [
        { id: "6a", text: "La lune", icon: "🌙", value: "intuitive" },
        { id: "6b", text: "La palette", icon: "🎨", value: "creative" },
        { id: "6c", text: "La balance", icon: "⚖️", value: "analytical" },
        { id: "6d", text: "L'épée", icon: "⚔️", value: "bold" }
      ]
    },
    {
      id: 7,
      question: "Votre devise de vie serait ?",
      options: [
        { id: "7a", text: "Écoute ton cœur", icon: "💝", value: "intuitive" },
        { id: "7b", text: "Crée ta réalité", icon: "✨", value: "creative" },
        { id: "7c", text: "Connais-toi toi-même", icon: "🔍", value: "analytical" },
        { id: "7d", text: "Ose et persévère", icon: "🚀", value: "bold" }
      ]
    },
    {
      id: 8,
      question: "Comment voyez-vous votre avenir ?",
      options: [
        { id: "8a", text: "Plein de synchronicités", icon: "🌟", value: "intuitive" },
        { id: "8b", text: "Riche en créativité", icon: "🎭", value: "creative" },
        { id: "8c", text: "Structuré et épanouissant", icon: "🏛️", value: "analytical" },
        { id: "8d", text: "Audacieux et libre", icon: "🦅", value: "bold" }
      ]
    }
  ];

  // Queen results
  const queenResults: Record<string, QueenResult> = {
    intuitive: {
      id: "intuitive",
      name: "La Queen Mystique",
      description: "Vous êtes la Queen Mystique - intuition et feu intérieur vous guident vers des révélations profondes. Votre sagesse naturelle et votre connexion aux énergies subtiles font de vous une guide spirituelle née.",
      svg: "🔮"
    },
    creative: {
      id: "creative", 
      name: "La Queen Créatrice",
      description: "Vous êtes la Queen Créatrice - votre imagination sans limites transforme le monde autour de vous. Votre vision unique et votre capacité à créer de la beauté inspirent tous ceux qui vous entourent.",
      svg: "🎨"
    },
    analytical: {
      id: "analytical",
      name: "La Queen Sage",
      description: "Vous êtes la Queen Sage - votre intelligence et votre discernement éclairent le chemin vers la vérité. Votre capacité à analyser et comprendre fait de vous une conseillère précieuse.",
      svg: "⚖️"
    },
    bold: {
      id: "bold",
      name: "La Queen Guerrière", 
      description: "Vous êtes la Queen Guerrière - votre courage et votre détermination brisent tous les obstacles. Votre force intérieure et votre audace inspirent le respect et l'admiration.",
      svg: "⚔️"
    }
  };

  // Page entrance animation
  useEffect(() => {
    if (containerRef.current && !prefersReducedMotion) {
      gsap.fromTo(containerRef.current, 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [prefersReducedMotion]);

  // Progress bar animation
  useEffect(() => {
    if (progressRef.current && !showResult) {
      const progress = ((currentQuestion + 1) / questions.length) * 100;
      gsap.to(progressRef.current, {
        width: `${progress}%`,
        duration: 0.6,
        ease: "power2.out"
      });
    }
  }, [currentQuestion, showResult]);

  // Stagger icons entrance
  useEffect(() => {
    if (!prefersReducedMotion && optionsRef.current.length > 0) {
      gsap.fromTo(optionsRef.current,
        { scale: 0.8, opacity: 0, y: 20 },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0,
          duration: 0.4,
          stagger: 0.12,
          ease: "back.out(1.2)"
        }
      );
    }
  }, [currentQuestion, prefersReducedMotion]);

  const handleOptionSelect = (optionValue: string, optionId: string) => {
    setSelectedOption(optionId);
    
    // GSAP Flip animation for selection
    if (!prefersReducedMotion) {
      const selectedElement = optionsRef.current.find(el => 
        el && el.dataset.optionId === optionId
      );
      
      if (selectedElement) {
        gsap.to(selectedElement, {
          scale: 1.2,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
          onComplete: () => {
            proceedToNext(optionValue);
          }
        });
      } else {
        proceedToNext(optionValue);
      }
    } else {
      setTimeout(() => proceedToNext(optionValue), 300);
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
      
      // Trigger confetti
      setTimeout(() => {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D6AE60', '#C4A569', '#E4C97A']
        });
      }, 500);

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
    <div className="min-h-screen bg-[#3B1E50] flex items-center justify-center p-4">
      <motion.div
        ref={containerRef}
        className="w-full max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentQuestion}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-white/70 text-sm font-medium">
                    Question {currentQuestion + 1} / {questions.length}
                  </span>
                  <span className="text-imperial-gold text-sm font-bold">
                    {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    ref={progressRef}
                    className="bg-gradient-to-r from-imperial-gold to-rose-champagne h-2 rounded-full transition-all duration-600"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <fieldset className="mb-12">
                <legend className="sr-only">Question {currentQuestion + 1}</legend>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-playfair font-bold text-imperial-gold mb-12 text-center leading-relaxed">
                  {questions[currentQuestion].question}
                </h2>

                {/* Options */}
                <div className="grid grid-cols-2 gap-6 md:gap-8 max-w-2xl mx-auto">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={option.id}
                      ref={el => optionsRef.current[index] = el!}
                      data-option-id={option.id}
                      onClick={() => handleOptionSelect(option.value, option.id)}
                      disabled={selectedOption !== null}
                      className="group relative bg-white/10 hover:bg-white/20 border-2 border-white/30 hover:border-imperial-gold rounded-2xl p-6 md:p-8 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-imperial-gold focus:ring-offset-2 focus:ring-offset-[#3B1E50] disabled:opacity-50"
                      style={{
                        transform: prefersReducedMotion ? 'none' : 'perspective(800px)',
                      }}
                      onMouseEnter={(e) => {
                        if (!prefersReducedMotion && !selectedOption) {
                          gsap.to(e.currentTarget, {
                            rotationX: -5,
                            rotationY: 5,
                            scale: 1.05,
                            boxShadow: "0 20px 40px rgba(214, 174, 96, 0.3)",
                            duration: 0.3,
                            ease: "power2.out"
                          });
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!prefersReducedMotion && !selectedOption) {
                          gsap.to(e.currentTarget, {
                            rotationX: 0,
                            rotationY: 0,
                            scale: 1,
                            boxShadow: "none",
                            duration: 0.3,
                            ease: "power2.out"
                          });
                        }
                      }}
                    >
                      <div className="text-center">
                        <div className="text-4xl md:text-5xl mb-4 transform transition-transform group-hover:scale-110">
                          {option.icon}
                        </div>
                        <p className="text-white font-medium text-sm md:text-base leading-relaxed">
                          {option.text}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </fieldset>
            </motion.div>
          ) : (
            // Result Screen
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "back.out(1.2)" }}
            >
              {result && (
                <>
                  <motion.div
                    className="text-8xl md:text-9xl mb-6"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: "back.out(1.4)" }}
                  >
                    {result.svg}
                  </motion.div>

                  <motion.h2
                    className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-imperial-gold mb-6"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    {result.name}
                  </motion.h2>

                  <motion.p
                    className="text-white/90 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                  >
                    {result.description}
                  </motion.p>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                  >
                    <button
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: `Je suis ${result.name} !`,
                            text: result.description,
                            url: window.location.href
                          });
                        }
                      }}
                      className="px-8 py-4 bg-imperial-gold hover:bg-imperial-gold/90 text-royal-purple font-bold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-imperial-gold focus:ring-offset-2 focus:ring-offset-[#3B1E50]"
                    >
                      📱 Partager
                    </button>
                    
                    <button
                      onClick={() => window.location.href = '/#hero'}
                      className="px-8 py-4 bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 hover:border-white/50 font-bold rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#3B1E50]"
                    >
                      👑 Rejoindre la Liste Royale
                    </button>

                    <button
                      onClick={resetQuiz}
                      className="px-6 py-4 text-white/70 hover:text-white underline transition-colors duration-300"
                    >
                      🔄 Refaire le quiz
                    </button>
                  </motion.div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}; 