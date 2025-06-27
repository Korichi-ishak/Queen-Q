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

// Tarot Card Symbols
const CardSymbols = {
  // Coeurs - Intuition
  hearts: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="heartsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D6AE60" />
          <stop offset="100%" stopColor="#E4C97A" />
        </linearGradient>
      </defs>
      <path d="M50 80 C30 60, 10 40, 30 25 C40 20, 50 30, 50 30 C50 30, 60 20, 70 25 C90 40, 70 60, 50 80 Z" 
            fill="url(#heartsGrad)" stroke="#D6AE60" strokeWidth="1"/>
      <circle cx="35" cy="35" r="3" fill="#FFF" opacity="0.6"/>
      <circle cx="65" cy="35" r="3" fill="#FFF" opacity="0.6"/>
    </svg>
  ),
  
  // Piques - Sagesse
  spades: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="spadesGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C4A569" />
          <stop offset="100%" stopColor="#D6AE60" />
        </linearGradient>
      </defs>
      <path d="M50 20 C30 40, 20 60, 40 70 C45 72, 50 65, 50 65 C50 65, 55 72, 60 70 C80 60, 70 40, 50 20 Z" 
            fill="url(#spadesGrad)" stroke="#D6AE60" strokeWidth="1"/>
      <rect x="47" y="65" width="6" height="15" fill="url(#spadesGrad)"/>
      <circle cx="50" cy="45" r="2" fill="#FFF" opacity="0.8"/>
    </svg>
  ),
  
  // Carreaux - Créativité
  diamonds: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="diamondsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E4C97A" />
          <stop offset="50%" stopColor="#D6AE60" />
          <stop offset="100%" stopColor="#C4A569" />
        </linearGradient>
      </defs>
      <polygon points="50,25 70,50 50,75 30,50" 
               fill="url(#diamondsGrad)" stroke="#D6AE60" strokeWidth="1"/>
      <polygon points="50,35 60,50 50,65 40,50" 
               fill="#FFF" opacity="0.3"/>
    </svg>
  ),
  
  // Trèfles - Courage
  clubs: (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="clubsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D6AE60" />
          <stop offset="100%" stopColor="#C4A569" />
        </linearGradient>
      </defs>
      <circle cx="40" cy="45" r="12" fill="url(#clubsGrad)"/>
      <circle cx="60" cy="45" r="12" fill="url(#clubsGrad)"/>
      <circle cx="50" cy="35" r="12" fill="url(#clubsGrad)"/>
      <rect x="47" y="55" width="6" height="20" fill="url(#clubsGrad)"/>
      <circle cx="50" cy="42" r="3" fill="#FFF" opacity="0.7"/>
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

  // Quiz questions with tarot card theme
  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "L'Oracle vous montre une situation inattendue. Quelle carte tirez-vous ?",
      options: [
        { id: "1a", text: "L'Hermite\n(Réflexion profonde)", cardSymbol: CardSymbols.spades, value: "analytical", suit: "Pique" },
        { id: "1b", text: "La Lune\n(Intuition mystique)", cardSymbol: CardSymbols.hearts, value: "intuitive", suit: "Cœur" },
        { id: "1c", text: "L'Étoile\n(Inspiration créatrice)", cardSymbol: CardSymbols.diamonds, value: "creative", suit: "Carreau" },
        { id: "1d", text: "Le Chariot\n(Action immédiate)", cardSymbol: CardSymbols.clubs, value: "bold", suit: "Trèfle" }
      ]
    },
    {
      id: 2,
      question: "Votre sanctuaire spirituel révèle votre essence. Quelle carte vous appelle ?",
      options: [
        { id: "2a", text: "Quatre de Cœur\n(Temple de nature)", cardSymbol: CardSymbols.hearts, value: "intuitive", suit: "Cœur" },
        { id: "2b", text: "As de Carreau\n(Atelier de création)", cardSymbol: CardSymbols.diamonds, value: "creative", suit: "Carreau" },
        { id: "2c", text: "Roi de Pique\n(Bibliothèque sacrée)", cardSymbol: CardSymbols.spades, value: "analytical", suit: "Pique" },
        { id: "2d", text: "Cavalier de Trèfle\n(Sommet du monde)", cardSymbol: CardSymbols.clubs, value: "bold", suit: "Trèfle" }
      ]
    },
    {
      id: 3,
      question: "Face à un choix crucial, les cartes révèlent votre méthode. Laquelle résonne ?",
      options: [
        { id: "3a", text: "La Papesse\n(Méditation silencieuse)", cardSymbol: CardSymbols.hearts, value: "intuitive", suit: "Cœur" },
        { id: "3b", text: "Le Bateleur\n(Exploration magique)", cardSymbol: CardSymbols.diamonds, value: "creative", suit: "Carreau" },
        { id: "3c", text: "La Justice\n(Équilibre des forces)", cardSymbol: CardSymbols.spades, value: "analytical", suit: "Pique" },
        { id: "3d", text: "La Force\n(Pouvoir intérieur)", cardSymbol: CardSymbols.clubs, value: "bold", suit: "Trèfle" }
      ]
    },
    {
      id: 4,
      question: "Les étoiles vous montrent votre source d'inspiration. Quelle arcane choisissez-vous ?",
      options: [
        { id: "4a", text: "L'Étoile\n(Mystères cosmiques)", cardSymbol: CardSymbols.hearts, value: "intuitive", suit: "Cœur" },
        { id: "4b", text: "Le Monde\n(Arts universels)", cardSymbol: CardSymbols.diamonds, value: "creative", suit: "Carreau" },
        { id: "4c", text: "Le Pendu\n(Sagesse ancienne)", cardSymbol: CardSymbols.spades, value: "analytical", suit: "Pique" },
        { id: "4d", text: "La Tour\n(Défis titanesques)", cardSymbol: CardSymbols.clubs, value: "bold", suit: "Trèfle" }
      ]
    },
    {
      id: 5,
      question: "Dans le cercle magique, votre rôle naturel se révèle. Quelle carte vous représente ?",
      options: [
        { id: "5a", text: "Dame de Cœur\n(Âme mystique)", cardSymbol: CardSymbols.hearts, value: "intuitive", suit: "Cœur" },
        { id: "5b", text: "Valet de Carreau\n(Messager créatif)", cardSymbol: CardSymbols.diamonds, value: "creative", suit: "Carreau" },
        { id: "5c", text: "Roi de Pique\n(Sage conseiller)", cardSymbol: CardSymbols.spades, value: "analytical", suit: "Pique" },
        { id: "5d", text: "Cavalier de Trèfle\n(Chef de guerre)", cardSymbol: CardSymbols.clubs, value: "bold", suit: "Trèfle" }
      ]
    },
    {
      id: 6,
      question: "Le temps révèle sa nature dans votre tirage. Quelle carte pulse avec votre rythme ?",
      options: [
        { id: "6a", text: "La Roue de Fortune\n(Cycles éternels)", cardSymbol: CardSymbols.hearts, value: "intuitive", suit: "Cœur" },
        { id: "6b", text: "Le Fou\n(Liberté temporelle)", cardSymbol: CardSymbols.diamonds, value: "creative", suit: "Carreau" },
        { id: "6c", text: "Deux de Pique\n(Structure parfaite)", cardSymbol: CardSymbols.spades, value: "analytical", suit: "Pique" },
        { id: "6d", text: "Sept de Trèfle\n(Urgence puissante)", cardSymbol: CardSymbols.clubs, value: "bold", suit: "Trèfle" }
      ]
    },
    {
      id: 7,
      question: "Votre motivation profonde s'illumine dans les arcanes. Quelle carte brille pour vous ?",
      options: [
        { id: "7a", text: "Les Amoureux\n(Connexion sacrée)", cardSymbol: CardSymbols.hearts, value: "intuitive", suit: "Cœur" },
        { id: "7b", text: "L'Impératrice\n(Création divine)", cardSymbol: CardSymbols.diamonds, value: "creative", suit: "Carreau" },
        { id: "7c", text: "L'Empereur\n(Maîtrise absolue)", cardSymbol: CardSymbols.spades, value: "analytical", suit: "Pique" },
        { id: "7d", text: "Le Jugement\n(Transformation totale)", cardSymbol: CardSymbols.clubs, value: "bold", suit: "Trèfle" }
      ]
    },
    {
      id: 8,
      question: "L'Oracle final révèle votre destinée. Quelle carte couronne votre avenir ?",
      options: [
        { id: "8a", text: "Le Soleil\n(Harmonie lumineuse)", cardSymbol: CardSymbols.hearts, value: "intuitive", suit: "Cœur" },
        { id: "8b", text: "Le Monde\n(Beauté éternelle)", cardSymbol: CardSymbols.diamonds, value: "creative", suit: "Carreau" },
        { id: "8c", text: "La Tempérance\n(Sagesse équilibrée)", cardSymbol: CardSymbols.spades, value: "analytical", suit: "Pique" },
        { id: "8d", text: "Le Chariot\n(Liberté conquise)", cardSymbol: CardSymbols.clubs, value: "bold", suit: "Trèfle" }
      ]
    }
  ];

  // Queen results as Tarot Archetypes
  const queenResults: Record<string, QueenResult> = {
    intuitive: {
      id: "intuitive",
      name: "La Dame de Cœur Mystique",
      description: "Votre âme navigue dans les eaux profondes de l'intuition sacrée. Comme la Grande Prêtresse des anciens tarots, vous percevez les vérités cachées derrière le voile de l'illusion. Les cartes vous révèlent que votre pouvoir réside dans la connexion aux énergies subtiles et à la sagesse ancestrale.",
      suit: "Cœur",
      cardNumber: "Dame",
      power: "Vision Mystique",
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
    creative: {
      id: "creative", 
      name: "La Reine de Carreau Créatrice",
      description: "Votre essence rayonne comme l'Impératrice des tarots, créatrice de mondes et de beauté. Les carreaux de votre existence brillent de mille feux créatifs. Vous transformez le vide en chef-d'œuvre, l'ordinaire en extraordinaire. Votre magie réside dans votre capacité à manifester l'impossible.",
      suit: "Carreau",
      cardNumber: "Reine",
      power: "Manifestation Créatrice",
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
    analytical: {
      id: "analytical",
      name: "La Souveraine de Pique Sage",
      description: "Tel l'Empereur dans son royaume de sagesse, vous régnez sur le domaine de la connaissance et de l'analyse. Les piques de votre intellect transpercent les mystères les plus complexes. Votre trône se dresse dans la bibliothèque universelle, et votre sceptre est fait de vérité pure.",
      suit: "Pique",
      cardNumber: "Roi",
      power: "Sagesse Souveraine",
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
    bold: {
      id: "bold",
      name: "La Guerrière de Trèfle Conquérante", 
      description: "Comme la Force incarnée des arcanes majeurs, vous dominez par votre courage et votre détermination. Les trèfles de votre destine fleurissent sur les champs de bataille que vous transformez en jardins de victoire. Votre pouvoir brise toutes les chaînes et ouvre tous les chemins.",
      suit: "Trèfle",
      cardNumber: "Cavalier",
      power: "Force Conquérante",
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
  };

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
                    Oracle des Queens
                  </h1>
                  <p className="text-rose-champagne/80 text-xl mb-8">
                    Les cartes révèlent votre archétype royal
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
                  Carte {currentQuestion + 1} de {questions.length}
                </p>
              </div>

              {/* Question */}
              <fieldset className="mb-16">
                <legend className="sr-only">Question {currentQuestion + 1}</legend>
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
              transition={{ duration: 1, ease: "back.out(1.2)" }}
            >
              {result && (
                <>
                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-3xl p-12 border-2 border-imperial-gold/50 shadow-2xl shadow-imperial-gold/20">
                    {/* Tarot Card Result */}
                    <motion.div
                      className="w-48 h-72 mx-auto mb-8"
                      initial={{ rotateY: 180, scale: 0 }}
                      animate={{ rotateY: 0, scale: 1 }}
                      transition={{ delay: 0.5, duration: 1, ease: "back.out(1.4)" }}
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
                        <span className="text-rose-champagne font-medium">Pouvoir: {result.power}</span>
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
                              title: `Je suis ${result.name} !`,
                              text: `${result.description}`,
                              url: window.location.href
                            });
                          }
                        }}
                        className="px-8 py-4 bg-gradient-to-r from-imperial-gold to-rose-champagne hover:from-rose-champagne hover:to-imperial-gold text-royal-purple font-bold rounded-xl transition-all duration-300 shadow-lg shadow-imperial-gold/30 hover:shadow-imperial-gold/50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Partager ma Carte Révélatrice
                      </motion.button>
                      
                      <motion.button
                        onClick={() => window.location.href = '/#hero'}
                        className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-imperial-gold/50 font-bold rounded-xl transition-all duration-300 backdrop-blur-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Rejoindre le Royaume Royal
                      </motion.button>

                      <motion.button
                        onClick={resetQuiz}
                        className="px-6 py-4 text-rose-champagne/80 hover:text-imperial-gold underline transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Nouveau Tirage Oracle
                      </motion.button>
                    </motion.div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <style jsx>{`
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