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
  cardSymbol: JSX.Element;
  value: string;
  suit: string;
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
  suit: string;
  cardNumber: string;
  cardImage: JSX.Element;
  power: string;
}

// Enseignes de Cartes Créatives
const CardSymbols = {
  // Cœurs - Intuition mystique
  hearts: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="heartsGrad" cx="50%" cy="30%">
          <stop offset="0%" stopColor="#F8E7B3" />
          <stop offset="40%" stopColor="#E4C97A" />
          <stop offset="80%" stopColor="#D6AE60" />
          <stop offset="100%" stopColor="#C4A569" />
        </radialGradient>
        <filter id="heartGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {/* Main heart shape */}
      <path d="M50 85 C30 62, 15 45, 25 30 C35 20, 45 25, 50 35 C55 25, 65 20, 75 30 C85 45, 70 62, 50 85 Z" 
            fill="url(#heartsGrad)" stroke="#D6AE60" strokeWidth="2" filter="url(#heartGlow)"/>
      {/* Inner sparkles */}
      <circle cx="42" cy="38" r="2" fill="#FFF" opacity="0.9"/>
      <circle cx="58" cy="42" r="1.5" fill="#FFF" opacity="0.7"/>
      <circle cx="50" cy="55" r="1" fill="#FFF" opacity="0.8"/>
      {/* Mystical lines */}
      <path d="M35 40 Q50 50 65 40" stroke="#FFF" strokeWidth="1" opacity="0.4" fill="none"/>
    </svg>
  ),
  
  // Piques - Sagesse ancienne
  spades: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="spadesGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F8E7B3" />
          <stop offset="30%" stopColor="#E4C97A" />
          <stop offset="70%" stopColor="#D6AE60" />
          <stop offset="100%" stopColor="#8B7355" />
        </linearGradient>
        <filter id="spadeGlow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {/* Main spade blade */}
      <path d="M50 15 C35 35, 25 55, 40 68 C44 71, 48 68, 50 68 C52 68, 56 71, 60 68 C75 55, 65 35, 50 15 Z" 
            fill="url(#spadesGrad)" stroke="#D6AE60" strokeWidth="2" filter="url(#spadeGlow)"/>
      {/* Stem */}
      <rect x="47" y="68" width="6" height="20" fill="url(#spadesGrad)" rx="3"/>
      {/* Ancient symbols */}
      <circle cx="50" cy="40" r="1.5" fill="#FFF" opacity="0.8"/>
      <path d="M45 30 L55 30 M45 50 L55 50" stroke="#FFF" strokeWidth="1" opacity="0.5"/>
      {/* Ornamental details */}
      <circle cx="42" cy="55" r="0.8" fill="#FFF" opacity="0.6"/>
      <circle cx="58" cy="55" r="0.8" fill="#FFF" opacity="0.6"/>
    </svg>
  ),
  
  // Carreaux - Créativité flamboyante
  diamonds: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="diamondsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2D6" />
          <stop offset="25%" stopColor="#F8E7B3" />
          <stop offset="50%" stopColor="#E4C97A" />
          <stop offset="75%" stopColor="#D6AE60" />
          <stop offset="100%" stopColor="#B8954F" />
        </linearGradient>
        <filter id="diamondGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {/* Main diamond */}
      <polygon points="50,20 75,50 50,80 25,50" 
               fill="url(#diamondsGrad)" stroke="#D6AE60" strokeWidth="2" filter="url(#diamondGlow)"/>
      {/* Inner facets for brilliance */}
      <polygon points="50,30 65,50 50,70 35,50" fill="#FFF" opacity="0.3"/>
      <polygon points="50,25 60,50 50,75 40,50" fill="none" stroke="#FFF" strokeWidth="1" opacity="0.5"/>
      {/* Creative sparkles */}
      <circle cx="43" cy="43" r="1" fill="#FFF" opacity="0.9"/>
      <circle cx="57" cy="43" r="1" fill="#FFF" opacity="0.9"/>
      <circle cx="43" cy="57" r="1" fill="#FFF" opacity="0.9"/>
      <circle cx="57" cy="57" r="1" fill="#FFF" opacity="0.9"/>
      {/* Central star */}
      <path d="M50 45 L52 48 L50 55 L48 48 Z" fill="#FFF" opacity="0.7"/>
    </svg>
  ),
  
  // Trèfles - Force vitale
  clubs: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="clubsGrad" cx="50%" cy="40%">
          <stop offset="0%" stopColor="#F8E7B3" />
          <stop offset="30%" stopColor="#E4C97A" />
          <stop offset="70%" stopColor="#D6AE60" />
          <stop offset="100%" stopColor="#A67C52" />
        </radialGradient>
        <filter id="clubGlow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {/* Three leaf clover */}
      <circle cx="38" cy="42" r="14" fill="url(#clubsGrad)" stroke="#D6AE60" strokeWidth="1.5" filter="url(#clubGlow)"/>
      <circle cx="62" cy="42" r="14" fill="url(#clubsGrad)" stroke="#D6AE60" strokeWidth="1.5" filter="url(#clubGlow)"/>
      <circle cx="50" cy="30" r="14" fill="url(#clubsGrad)" stroke="#D6AE60" strokeWidth="1.5" filter="url(#clubGlow)"/>
      {/* Stem */}
      <rect x="46" y="56" width="8" height="22" fill="url(#clubsGrad)" rx="4" stroke="#D6AE60" strokeWidth="1"/>
      {/* Leaf veins and details */}
      <circle cx="38" cy="40" r="2" fill="#FFF" opacity="0.6"/>
      <circle cx="62" cy="40" r="2" fill="#FFF" opacity="0.6"/>
      <circle cx="50" cy="28" r="2" fill="#FFF" opacity="0.6"/>
      {/* Natural texture lines */}
      <path d="M42 38 Q46 42 42 46" stroke="#FFF" strokeWidth="0.8" opacity="0.4" fill="none"/>
      <path d="M58 38 Q54 42 58 46" stroke="#FFF" strokeWidth="0.8" opacity="0.4" fill="none"/>
      <path d="M46 26 Q50 30 54 26" stroke="#FFF" strokeWidth="0.8" opacity="0.4" fill="none"/>
    </svg>
  )
};

export const Quiz: React.FC = () => {
  const { t, language } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<QueenResult | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isShuffling, setIsShuffling] = useState(true);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLElement[]>([]);
  const cardsRef = useRef<HTMLDivElement>(null);


  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Card shuffling animation on page load
  useEffect(() => {
    if (!prefersReducedMotion && cardsRef.current) {
      const cards = cardsRef.current.children;
      Array.from(cards).forEach((card, index) => {
        gsap.set(card, { 
          rotation: "random(-15, 15)",
          x: "random(-30, 30)",
          y: "random(-20, 20)",
          scale: 0.9
        });
        
        gsap.to(card, {
          rotation: 0,
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "back.out(1.2)",
          onComplete: () => {
            if (index === cards.length - 1) {
              setIsShuffling(false);
            }
          }
        });
      });
    } else {
      setTimeout(() => setIsShuffling(false), 1000);
    }
  }, [currentQuestion, prefersReducedMotion]);

  // Quiz questions with dynamic translations
  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: t('quiz.q1.text'),
      options: [
        { id: "1a", text: t('quiz.q1.hearts'), cardSymbol: CardSymbols.hearts, value: "hearts", suit: t('suits.hearts') },
        { id: "1b", text: t('quiz.q1.spades'), cardSymbol: CardSymbols.spades, value: "spades", suit: t('suits.spades') },
        { id: "1c", text: t('quiz.q1.diamonds'), cardSymbol: CardSymbols.diamonds, value: "diamonds", suit: t('suits.diamonds') },
        { id: "1d", text: t('quiz.q1.clubs'), cardSymbol: CardSymbols.clubs, value: "clubs", suit: t('suits.clubs') }
      ]
    },
    {
      id: 2,
      question: t('quiz.q2.text'),
      options: [
        { id: "2a", text: t('quiz.q2.hearts'), cardSymbol: CardSymbols.hearts, value: "hearts", suit: t('suits.hearts') },
        { id: "2b", text: t('quiz.q2.spades'), cardSymbol: CardSymbols.spades, value: "spades", suit: t('suits.spades') },
        { id: "2c", text: t('quiz.q2.diamonds'), cardSymbol: CardSymbols.diamonds, value: "diamonds", suit: t('suits.diamonds') },
        { id: "2d", text: t('quiz.q2.clubs'), cardSymbol: CardSymbols.clubs, value: "clubs", suit: t('suits.clubs') }
      ]
    },
    {
      id: 3,
      question: t('quiz.q3.text'),
      options: [
        { id: "3a", text: t('quiz.q3.hearts'), cardSymbol: CardSymbols.hearts, value: "hearts", suit: t('suits.hearts') },
        { id: "3b", text: t('quiz.q3.spades'), cardSymbol: CardSymbols.spades, value: "spades", suit: t('suits.spades') },
        { id: "3c", text: t('quiz.q3.diamonds'), cardSymbol: CardSymbols.diamonds, value: "diamonds", suit: t('suits.diamonds') },
        { id: "3d", text: t('quiz.q3.clubs'), cardSymbol: CardSymbols.clubs, value: "clubs", suit: t('suits.clubs') }
      ]
    },
    {
      id: 4,
      question: t('quiz.q4.text'),
      options: [
        { id: "4a", text: t('quiz.q4.hearts'), cardSymbol: CardSymbols.hearts, value: "hearts", suit: t('suits.hearts') },
        { id: "4b", text: t('quiz.q4.spades'), cardSymbol: CardSymbols.spades, value: "spades", suit: t('suits.spades') },
        { id: "4c", text: t('quiz.q4.diamonds'), cardSymbol: CardSymbols.diamonds, value: "diamonds", suit: t('suits.diamonds') },
        { id: "4d", text: t('quiz.q4.clubs'), cardSymbol: CardSymbols.clubs, value: "clubs", suit: t('suits.clubs') }
      ]
    },
    {
      id: 5,
      question: t('quiz.q5.text'),
      options: [
        { id: "5a", text: t('quiz.q5.hearts'), cardSymbol: CardSymbols.hearts, value: "hearts", suit: t('suits.hearts') },
        { id: "5b", text: t('quiz.q5.spades'), cardSymbol: CardSymbols.spades, value: "spades", suit: t('suits.spades') },
        { id: "5c", text: t('quiz.q5.diamonds'), cardSymbol: CardSymbols.diamonds, value: "diamonds", suit: t('suits.diamonds') },
        { id: "5d", text: t('quiz.q5.clubs'), cardSymbol: CardSymbols.clubs, value: "clubs", suit: t('suits.clubs') }
      ]
    },
    {
      id: 6,
      question: t('quiz.q6.text'),
      options: [
        { id: "6a", text: t('quiz.q6.hearts'), cardSymbol: CardSymbols.hearts, value: "hearts", suit: t('suits.hearts') },
        { id: "6b", text: t('quiz.q6.spades'), cardSymbol: CardSymbols.spades, value: "spades", suit: t('suits.spades') },
        { id: "6c", text: t('quiz.q6.diamonds'), cardSymbol: CardSymbols.diamonds, value: "diamonds", suit: t('suits.diamonds') },
        { id: "6d", text: t('quiz.q6.clubs'), cardSymbol: CardSymbols.clubs, value: "clubs", suit: t('suits.clubs') }
      ]
    },
    {
      id: 7,
      question: t('quiz.q7.text'),
      options: [
        { id: "7a", text: t('quiz.q7.hearts'), cardSymbol: CardSymbols.hearts, value: "hearts", suit: t('suits.hearts') },
        { id: "7b", text: t('quiz.q7.spades'), cardSymbol: CardSymbols.spades, value: "spades", suit: t('suits.spades') },
        { id: "7c", text: t('quiz.q7.diamonds'), cardSymbol: CardSymbols.diamonds, value: "diamonds", suit: t('suits.diamonds') },
        { id: "7d", text: t('quiz.q7.clubs'), cardSymbol: CardSymbols.clubs, value: "clubs", suit: t('suits.clubs') }
      ]
    },
    {
      id: 8,
      question: t('quiz.q8.text'),
      options: [
        { id: "8a", text: t('quiz.q8.hearts'), cardSymbol: CardSymbols.hearts, value: "hearts", suit: t('suits.hearts') },
        { id: "8b", text: t('quiz.q8.spades'), cardSymbol: CardSymbols.spades, value: "spades", suit: t('suits.spades') },
        { id: "8c", text: t('quiz.q8.diamonds'), cardSymbol: CardSymbols.diamonds, value: "diamonds", suit: t('suits.diamonds') },
        { id: "8d", text: t('quiz.q8.clubs'), cardSymbol: CardSymbols.clubs, value: "clubs", suit: t('suits.clubs') }
      ]
    }
  ];

  // Queen results with dynamic translations
  const queenResults: Record<string, QueenResult> = React.useMemo(() => ({
    hearts: {
      id: "hearts",
      name: t('quiz.results.hearts.title'),
      description: t('quiz.results.hearts.description'),
      suit: t('suits.hearts'),
      cardNumber: t('ranks.dame'),
      power: t('quiz.results.hearts.subtitle'),
      cardImage: (
        <svg viewBox="0 0 200 300" className="w-full h-full">
          <defs>
            <linearGradient id="heartQueenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5A96" />
              <stop offset="50%" stopColor="#D6AE60" />
              <stop offset="100%" stopColor="#6B46C1" />
            </linearGradient>
          </defs>
          <rect x="10" y="10" width="180" height="280" rx="15" fill="url(#heartQueenGrad)" stroke="#D6AE60" strokeWidth="3"/>
          <circle cx="100" cy="80" r="25" fill="#FFF" opacity="0.9"/>
          <path d="M100 140 C80 120, 60 100, 80 85 C90 80, 100 90, 100 90 C100 90, 110 80, 120 85 C140 100, 120 120, 100 140 Z" fill="#D6AE60"/>
          <text x="100" y="200" textAnchor="middle" fill="#FFF" fontSize="16" fontFamily="serif">DAME</text>
          <text x="100" y="220" textAnchor="middle" fill="#FFF" fontSize="12" fontFamily="serif">♥</text>
        </svg>
      )
    },
    diamonds: {
      id: "diamonds", 
      name: t('quiz.results.diamonds.title'),
      description: t('quiz.results.diamonds.description'),
      suit: t('suits.diamonds'),
      cardNumber: t('ranks.reine'),
      power: t('quiz.results.diamonds.subtitle'),
      cardImage: (
        <svg viewBox="0 0 200 300" className="w-full h-full">
          <defs>
            <linearGradient id="diamondQueenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#D6AE60" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>
          </defs>
          <rect x="10" y="10" width="180" height="280" rx="15" fill="url(#diamondQueenGrad)" stroke="#D6AE60" strokeWidth="3"/>
          <circle cx="100" cy="80" r="25" fill="#FFF" opacity="0.9"/>
          <polygon points="100,105 120,130 100,155 80,130" fill="#D6AE60"/>
          <text x="100" y="200" textAnchor="middle" fill="#FFF" fontSize="16" fontFamily="serif">REINE</text>
          <text x="100" y="220" textAnchor="middle" fill="#FFF" fontSize="12" fontFamily="serif">♦</text>
        </svg>
      )
    },
    spades: {
      id: "spades",
      name: t('quiz.results.spades.title'),
      description: t('quiz.results.spades.description'),
      suit: t('suits.spades'),
      cardNumber: t('ranks.roi'),
      power: t('quiz.results.spades.subtitle'),
      cardImage: (
        <svg viewBox="0 0 200 300" className="w-full h-full">
          <defs>
            <linearGradient id="spadeKingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E40AF" />
              <stop offset="50%" stopColor="#D6AE60" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <rect x="10" y="10" width="180" height="280" rx="15" fill="url(#spadeKingGrad)" stroke="#D6AE60" strokeWidth="3"/>
          <circle cx="100" cy="80" r="25" fill="#FFF" opacity="0.9"/>
          <path d="M100 105 C80 125, 70 145, 90 155 C95 157, 100 150, 100 150 C100 150, 105 157, 110 155 C130 145, 120 125, 100 105 Z" fill="#D6AE60"/>
          <text x="100" y="200" textAnchor="middle" fill="#FFF" fontSize="16" fontFamily="serif">ROI</text>
          <text x="100" y="220" textAnchor="middle" fill="#FFF" fontSize="12" fontFamily="serif">♠</text>
        </svg>
      )
    },
    clubs: {
      id: "clubs",
      name: t('quiz.results.clubs.title'),
      description: t('quiz.results.clubs.description'),
      suit: t('suits.clubs'),
      cardNumber: t('ranks.cavalier'),
      power: t('quiz.results.clubs.subtitle'),
      cardImage: (
        <svg viewBox="0 0 200 300" className="w-full h-full">
          <defs>
            <linearGradient id="clubKnightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DC2626" />
              <stop offset="50%" stopColor="#D6AE60" />
              <stop offset="100%" stopColor="#7C2D12" />
            </linearGradient>
          </defs>
          <rect x="10" y="10" width="180" height="280" rx="15" fill="url(#clubKnightGrad)" stroke="#D6AE60" strokeWidth="3"/>
          <circle cx="100" cy="80" r="25" fill="#FFF" opacity="0.9"/>
          <circle cx="90" cy="125" r="8" fill="#D6AE60"/>
          <circle cx="110" cy="125" r="8" fill="#D6AE60"/>
          <circle cx="100" cy="115" r="8" fill="#D6AE60"/>
          <text x="100" y="200" textAnchor="middle" fill="#FFF" fontSize="14" fontFamily="serif">CAVALIER</text>
          <text x="100" y="220" textAnchor="middle" fill="#FFF" fontSize="12" fontFamily="serif">♣</text>
        </svg>
      )
    }
  }), [t]);

  // Update result when language changes
  useEffect(() => {
    if (result && showResult) {
      // Recalculate result with new language
      const updatedResult = queenResults[result.id];
      if (updatedResult) {
        setResult(updatedResult);
      }
    }
  }, [language, queenResults, result, showResult]);

  // Enhanced card flip animation
  const handleOptionSelect = (optionValue: string, optionId: string) => {
    setSelectedOption(optionId);
    
    if (!prefersReducedMotion) {
      const selectedElement = optionsRef.current.find(el => 
        el && el.dataset.optionId === optionId
      );
      
      if (selectedElement) {
        // Card flip animation
        gsap.to(selectedElement, {
          rotationY: 180,
          scale: 1.05,
          duration: 0.3,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.to(selectedElement, {
              rotationY: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.inOut",
              onComplete: () => proceedToNext(optionValue)
            });
          }
        });
      } else {
        proceedToNext(optionValue);
      }
    } else {
      setTimeout(() => proceedToNext(optionValue), 600);
    }
  };

  const proceedToNext = (optionValue: string) => {
    const newAnswers = [...answers, optionValue];
    setAnswers(newAnswers);
    setSelectedOption(null);

    // Check if we have completed all questions (8 questions total)
    if (newAnswers.length < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result - all 8 questions answered
      const counts = newAnswers.reduce((acc, answer) => {
        acc[answer] = (acc[answer] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const dominantType = Object.entries(counts).reduce((a, b) => 
        counts[a[0]] > counts[b[0]] ? a : b
      )[0];

      const selectedResult = queenResults[dominantType];
      
      if (selectedResult) {
        setResult(selectedResult);
        setShowResult(true);
      } else {
        // Fallback to hearts if no result found
        setResult(queenResults.hearts);
        setShowResult(true);
      }
      
      // Enhanced card-themed confetti
      setTimeout(() => {
        const suits = ['♠', '♥', '♦', '♣'];
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#D6AE60', '#C4A569', '#E4C97A', '#8B5A96'],
          shapes: suits.map(() => 'square'),
          scalar: 1.5
        });
      }, 1000);

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
    setIsShuffling(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0b2e] via-[#3B1E50] to-[#2d1444] py-20">
      {/* Mystical Background Pattern */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,_#D6AE60_1px,_transparent_1px),radial-gradient(circle_at_75%_75%,_#E4C97A_1px,_transparent_1px)] bg-[length:50px_50px]"></div>
      </div>

      <motion.div
        ref={containerRef}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentQuestion}
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Tarot Header */}
              <div className="text-center mb-16">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold bg-gradient-to-r from-imperial-gold via-rose-champagne to-imperial-gold bg-clip-text text-transparent mb-4">
                    {t('quiz.title')}
                  </h1>
                  <p className="text-rose-champagne/80 text-xl mb-8">
                    {t('quiz.subtitle')}
                  </p>
                  <div className="w-40 h-1 bg-gradient-to-r from-transparent via-imperial-gold to-transparent mx-auto"></div>
                </motion.div>
              </div>

              {/* Progress as Cards */}
              <div className="mb-16">
                <div className="flex justify-center items-center mb-8">
                  <div className="flex space-x-2">
                    {Array.from({ length: questions.length }).map((_, index) => (
                      <div
                        key={index}
                        className={`w-8 h-12 rounded border-2 transition-all duration-500 ${
                          index <= currentQuestion
                            ? 'bg-imperial-gold border-imperial-gold shadow-lg shadow-imperial-gold/50'
                            : 'bg-white/10 border-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-center text-rose-champagne/80">
                  {t('quiz.question')} {currentQuestion + 1} {t('quiz.of')} {questions.length}
                </p>
              </div>

              {/* Question */}
              <fieldset className="mb-16">
                <legend className="sr-only">{t('quiz.question')} {currentQuestion + 1}</legend>
                <motion.h2 
                  className="text-2xl md:text-3xl lg:text-4xl font-playfair font-bold text-center mb-16 leading-relaxed"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <span className="bg-gradient-to-r from-white via-imperial-gold to-white bg-clip-text text-transparent">
                    {questions[currentQuestion].question}
                  </span>
                </motion.h2>

                {/* Card Options */}
                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={option.id}
                      ref={el => optionsRef.current[index] = el!}
                      data-option-id={option.id}
                      onClick={() => !isShuffling && handleOptionSelect(option.value, option.id)}
                      disabled={selectedOption !== null || isShuffling}
                      className="group relative bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-md border-2 border-imperial-gold/30 hover:border-imperial-gold rounded-2xl p-8 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-imperial-gold focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 overflow-hidden transform hover:scale-105 card-shadow"
                      style={{ 
                        perspective: '1000px',
                        transformStyle: 'preserve-3d'
                      }}
                      initial={{ rotateY: 180, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                    >
                      {/* Card Back Pattern when shuffling */}
                      {isShuffling && (
                        <div className="absolute inset-0 bg-gradient-to-br from-imperial-gold/20 to-royal-purple/20 flex items-center justify-center">
                          <div className="text-imperial-gold text-6xl">♠♥♦♣</div>
                        </div>
                      )}
                      
                      {/* Card Front */}
                      <div className={`transition-opacity duration-500 ${isShuffling ? 'opacity-0' : 'opacity-100'}`}>
                        {/* Suit indicator */}
                        <div className="absolute top-4 left-4 text-xs text-imperial-gold font-bold">
                          {option.suit}
                        </div>
                        <div className="absolute bottom-4 right-4 text-xs text-imperial-gold font-bold transform rotate-180">
                          {option.suit}
                        </div>
                        
                        {/* Card Symbol */}
                        <div className="w-24 h-24 mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-500">
                          {option.cardSymbol}
                        </div>

                        {/* Card Text */}
                        <div className="text-center">
                          <p className="text-white font-medium text-lg leading-relaxed whitespace-pre-line group-hover:text-imperial-gold transition-colors duration-300">
                            {option.text}
                          </p>
                        </div>
                      </div>

                      {/* Selection Glow */}
                      {selectedOption === option.id && (
                        <motion.div
                          className="absolute inset-0 border-2 border-imperial-gold rounded-2xl shadow-lg shadow-imperial-gold/50"
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
            // Enhanced Tarot Result
            <motion.div
              className="text-center relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "backOut" }}
            >
              {result && (
                <>
                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-12 border-2 border-imperial-gold/50 shadow-2xl shadow-imperial-gold/20">
                    {/* Tarot Card Result */}
                    <motion.div
                      className="w-48 h-72 mx-auto mb-8"
                      initial={{ rotateY: 180, scale: 0 }}
                      animate={{ rotateY: 0, scale: 1 }}
                      transition={{ delay: 0.5, duration: 1, ease: "backOut" }}
                    >
                      {result.cardImage}
                    </motion.div>

                    <motion.h2
                      className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold mb-4"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                    >
                      <span className="bg-gradient-to-r from-imperial-gold via-rose-champagne to-imperial-gold bg-clip-text text-transparent">
                        {result.name}
                      </span>
                    </motion.h2>

                    <motion.div
                      className="mb-8"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1, duration: 0.8 }}
                    >
                      <div className="inline-block px-6 py-3 bg-gradient-to-r from-imperial-gold/20 to-rose-champagne/20 rounded-full border border-imperial-gold/30 mb-4">
                        <span className="text-imperial-gold font-medium">{result.cardNumber} de {result.suit}</span>
                      </div>
                      <div className="inline-block px-6 py-3 bg-gradient-to-r from-royal-purple/20 to-imperial-gold/20 rounded-full border border-rose-champagne/30 ml-4">
                        <span className="text-rose-champagne font-medium">{t('quiz.results.powerLabel')}: {result.power}</span>
                      </div>
                    </motion.div>

                    <motion.p
                      className="text-rose-champagne/90 text-xl md:text-2xl leading-relaxed mb-12 max-w-4xl mx-auto"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.2, duration: 0.8 }}
                    >
                      {result.description}
                    </motion.p>

                    <motion.div
                      className="flex flex-col sm:flex-row gap-6 justify-center"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.4, duration: 0.8 }}
                    >
                      <motion.button
                        onClick={() => {
                          if (navigator.share) {
                            navigator.share({
                              title: t('quiz.results.shareTitle', { title: result.name }),
                              text: `${result.description}`,
                              url: window.location.href
                            });
                          }
                        }}
                        className="px-8 py-4 bg-gradient-to-r from-imperial-gold to-rose-champagne hover:from-rose-champagne hover:to-imperial-gold text-royal-purple font-bold rounded-xl transition-all duration-300 shadow-lg shadow-imperial-gold/30 hover:shadow-imperial-gold/50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {t('quiz.results.shareResult')}
                      </motion.button>
                      
                      <motion.button
                        onClick={() => window.location.href = '/#hero'}
                        className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-imperial-gold/50 font-bold rounded-xl transition-all duration-300 backdrop-blur-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {t('quiz.results.joinKingdom')}
                      </motion.button>

                      <motion.button
                        onClick={resetQuiz}
                        className="px-6 py-4 text-rose-champagne/80 hover:text-imperial-gold underline transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {t('quiz.retakeQuiz')}
                      </motion.button>
                    </motion.div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <style>{`
        .card-shadow {
          box-shadow: 
            0 4px 6px -1px rgba(214, 174, 96, 0.1),
            0 2px 4px -1px rgba(214, 174, 96, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        .card-shadow:hover {
          box-shadow: 
            0 20px 25px -5px rgba(214, 174, 96, 0.3),
            0 10px 10px -5px rgba(214, 174, 96, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}; 