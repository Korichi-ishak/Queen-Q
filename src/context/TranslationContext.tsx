import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Types
type Language = 'fr' | 'en';
type TranslationKey = keyof typeof translations.fr;

// Translations data
const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.cards': 'Cartes',
    'nav.quiz': 'Quiz',
    
    // Cards page
    'cards.title': 'Explorez vos archétypes',
    'cards.description': 'Découvrez votre nature profonde à travers nos 54 archétypes mystiques',
    'cards.returnHome': 'Retour à l\'accueil',
    
    // Hero section
    'hero.title': 'Queen de Q',
    'hero.subtitle': 'Révélez les mystères de votre chemin personnel',
    'hero.description': 'Découvrez votre archétype unique à travers nos cartes divinatoires personnalisées. Une expérience mystique pour mieux vous connaître.',
    'hero.spotsLeft': 'places restantes',
    'hero.instruction': 'Cliquez sur les cartes ou appuyez sur ESPACE pour découvrir votre archétype',
    'hero.scrollText': 'Faites défiler pour explorer',
    'hero.cta': 'Révéler votre archétype',
    
    // Signup form
    'signup.title': 'Rejoignez Queen de Q',
    'signup.subtitle': 'Découvrez les mystères qui vous attendent',
    'signup.description': 'Découvrez les mystères qui vous attendent',
    'signup.name': 'Nom complet',
    'signup.email': 'Adresse email',
    'signup.submit': 'Rejoindre maintenant',
    'signup.close': 'Fermer',
    'signup.loading': 'En cours...',
    'signup.form.email': 'Adresse email',
    'signup.form.submit': 'Rejoindre maintenant',
    
    // FAQ
    'faq.title': 'Mystères Révélés',
    'faq.subtitle': 'Les réponses aux questions qui éclairent votre chemin vers la révélation',
    'faq.question1': 'Comment fonctionne la révélation d\'archétype ?',
    'faq.answer1': 'Notre système unique analyse vos réponses pour identifier votre archétype principal parmi 54 possibilités, basé sur des recherches en psychologie et symbolisme.',
    'faq.question2': 'Combien de temps dure le processus ?',
    'faq.answer2': 'La révélation complète prend environ 15-20 minutes, incluant le questionnaire et l\'analyse personnalisée de votre archétype.',
    'faq.question3': 'Puis-je refaire le test ?',
    'faq.answer3': 'Oui, vous pouvez refaire l\'expérience après 30 jours, car nous évoluons et notre archétype dominant peut changer avec le temps.',
    'faq.question4': 'Les résultats sont-ils fiables ?',
    'faq.answer4': 'Nos archétypes sont basés sur des recherches approfondies en psychologie jungienne et validation par des experts en développement personnel.',
    
    // How it works
    'howItWorks.title': 'Comment ça marche',
    'howItWorks.subtitle': 'Découvrez votre archétype en trois étapes mystiques',
    'howItWorks.step1.title': 'Inscription',
    'howItWorks.step1.description': 'Rejoignez notre univers mystique et créez votre profil unique pour débuter votre transformation personnelle.',
    'howItWorks.step1.backText': 'Votre voyage commence ici. Chaque grande révélation nécessite un premier pas courageux.',
    'howItWorks.step2.title': 'Révélation',
    'howItWorks.step2.description': 'Découvrez votre archétype parmi nos 54 cartes sacrées à travers un processus de révélation personnalisé.',
    'howItWorks.step2.backText': 'Les mystères de votre âme se dévoilent. Laissez la magie opérer et révéler votre essence profonde.',
    'howItWorks.step3.title': 'Transformation',
    'howItWorks.step3.description': 'Intégrez cette connaissance précieuse dans votre quotidien pour une transformation authentique et durable.',
    'howItWorks.step3.backText': 'La vraie magie réside dans l\'application. Votre archétype devient la clé de votre évolution.',
    
    // Newsletter
    'newsletter.title': 'Rejoignez la Révélation',
    'newsletter.subtitle': 'Découvrez les secrets cachés de votre âme et débloquez votre véritable potentiel',
    'newsletter.description': 'Recevez des révélations exclusives, des insights mystiques et accédez en premier aux nouvelles cartes archétypes',
    'newsletter.placeholder': 'Votre adresse email mystique',
    'newsletter.button': 'Commencer ma Révélation',
    'newsletter.loading': 'Initiation en cours...',
    'newsletter.success.title': 'Bienvenue dans la Communauté Mystique !',
    'newsletter.success.subtitle': 'Votre voyage vers la révélation commence maintenant. Surveillez votre boîte email pour des insights exclusifs.',
    'newsletter.stats.souls': 'Âmes Révélées',
    'newsletter.stats.archetypes': 'Archétypes Uniques',
    'newsletter.stats.transformations': 'Transformations Réussies',
    
    // Testimonials
    'testimonials.title': 'Confessions d\'Âmes',
    'testimonials.subtitle': 'Les révélations authentiques de ceux qui ont découvert leur véritable essence',
    'testimonials.archetype': 'Archétype révélé',
    'testimonials.marie.name': 'Marie L.',
    'testimonials.marie.archetype': 'L\'Exploratrice',
    'testimonials.marie.text': 'Cette expérience a complètement transformé ma vision de moi-même. Découvrir mon archétype m\'a aidée à comprendre mes motivations profondes et à embrasser ma vraie nature.',
    'testimonials.thomas.name': 'Thomas R.',
    'testimonials.thomas.archetype': 'Le Sage',
    'testimonials.thomas.text': 'Incroyable précision dans l\'analyse. Je me suis reconnu dans chaque aspect de mon archétype. Une révélation authentique qui guide désormais mes choix de vie.',
    'testimonials.sophie.name': 'Sophie M.',
    'testimonials.sophie.archetype': 'La Créatrice',
    'testimonials.sophie.text': 'Un voyage introspectif fascinant. Les insights obtenus m\'accompagnent quotidiennement dans mes décisions importantes et ont libéré ma créativité.',
    'testimonials.alex.name': 'Alex D.',
    'testimonials.alex.archetype': 'Le Guerrier',
    'testimonials.alex.text': 'Une approche moderne des archétypes jungiens. J\'ai enfin compris pourquoi certaines situations me galvanisent et d\'autres m\'épuisent. Révolutionnaire !',
    'testimonials.luna.name': 'Luna K.',
    'testimonials.luna.archetype': 'La Magicienne',
    'testimonials.luna.text': 'L\'expérience la plus transformative de ma vie. Mon archétype m\'a révélé des aspects cachés de ma personnalité et m\'a donné des clés pour mon épanouissement.',
    
    // Layout/Footer
    'footer.description': 'Découvrez les mystères de votre chemin personnel à travers nos archétypes uniques.',
    'footer.navigation': 'Navigation',
    'footer.copyright': '© 2024 Queen de Q. Tous droits réservés.',
    
    // Card specific
    'card.deckLabel': 'Deck de cartes – cliquez pour tirer',
    'card.archetype': 'Archétype',
    'card.number': 'Archétype n°',
    'card.aria': 'Carte {name}, numéro {number}. Cliquez pour révéler.',
    'card.drawnCard': 'Carte tirée',
    
    // Instructions
    'instructions.clickCards': 'Cliquez sur les cartes ou appuyez sur',
    'instructions.pressSpace': 'Appuyez sur',
    'instructions.spaceKey': 'ESPACE',
    'instructions.toDiscover': 'pour découvrir votre archétype',
    'instructions.toReveal': 'pour révéler votre archétype',
    
    // Links
    'links.privacy': 'Politique de confidentialité',
    'links.terms': 'Conditions d\'utilisation',
    'links.contact': 'Contact',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Une erreur est survenue',
    
    // Accessibility
    'accessibility.menu': 'Menu',
    'accessibility.clickToDraw': 'Cliquez pour tirer une carte',
    'accessibility.cardDrawn': 'Carte tirée',
    'accessibility.pressSpaceOrClick': 'Appuyez sur Espace ou cliquez pour tirer une carte',
    'accessibility.photoOf': 'Photo de',
    
    // Card names
    'cards.aceOfSpades': 'As de Pique',
    'cards.aceOfDiamonds': 'As de Carreau',
    
    // Card deck
    'cardDeck.dealCard': 'Tirez-moi une carte ↗',
    'cardDeck.yourArchetype': 'Votre Archétype'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.cards': 'Cards',
    'nav.quiz': 'Quiz',
    
    // Cards page
    'cards.title': 'Explore your archetypes',
    'cards.description': 'Discover your deep nature through our 54 mystical archetypes',
    'cards.returnHome': 'Back to home',
    
    // Hero section
    'hero.title': 'Queen de Q',
    'hero.subtitle': 'Reveal the mysteries of your personal path',
    'hero.description': 'Discover your unique archetype through our personalized divination cards. A mystical experience to know yourself better.',
    'hero.spotsLeft': 'spots left',
    'hero.instruction': 'Click on the cards or press SPACE to discover your archetype',
    'hero.scrollText': 'Scroll to explore',
    'hero.cta': 'Reveal your archetype',
    
    // Signup form
    'signup.title': 'Join Queen de Q',
    'signup.subtitle': 'Discover the mysteries that await you',
    'signup.description': 'Discover the mysteries that await you',
    'signup.name': 'Full name',
    'signup.email': 'Email address',
    'signup.submit': 'Join now',
    'signup.close': 'Close',
    'signup.loading': 'Loading...',
    'signup.form.email': 'Email address',
    'signup.form.submit': 'Join now',
    
    // FAQ
    'faq.title': 'Mysteries Revealed',
    'faq.subtitle': 'Answers to questions that illuminate your path to revelation',
    'faq.question1': 'How does archetype revelation work?',
    'faq.answer1': 'Our unique system analyzes your responses to identify your main archetype among 54 possibilities, based on psychology and symbolism research.',
    'faq.question2': 'How long does the process take?',
    'faq.answer2': 'The complete revelation takes about 15-20 minutes, including the questionnaire and personalized analysis of your archetype.',
    'faq.question3': 'Can I retake the test?',
    'faq.answer3': 'Yes, you can repeat the experience after 30 days, as we evolve and our dominant archetype can change over time.',
    'faq.question4': 'Are the results reliable?',
    'faq.answer4': 'Our archetypes are based on extensive research in Jungian psychology and validation by personal development experts.',
    
    // How it works
    'howItWorks.title': 'How it works',
    'howItWorks.subtitle': 'Discover your archetype in three mystical steps',
    'howItWorks.step1.title': 'Registration',
    'howItWorks.step1.description': 'Join our mystical universe and create your unique profile to begin your personal transformation.',
    'howItWorks.step1.backText': 'Your journey begins here. Every great revelation requires a first courageous step.',
    'howItWorks.step2.title': 'Revelation',
    'howItWorks.step2.description': 'Discover your archetype among our 54 sacred cards through a personalized revelation process.',
    'howItWorks.step2.backText': 'The mysteries of your soul unfold. Let the magic work and reveal your deep essence.',
    'howItWorks.step3.title': 'Transformation',
    'howItWorks.step3.description': 'Integrate this precious knowledge into your daily life for authentic and lasting transformation.',
    'howItWorks.step3.backText': 'True magic lies in application. Your archetype becomes the key to your evolution.',
    
    // Newsletter
    'newsletter.title': 'Join the Revelation',
    'newsletter.subtitle': 'Discover the hidden secrets of your soul and unlock your true potential',
    'newsletter.description': 'Receive exclusive revelations, mystical insights and get first access to new archetype cards',
    'newsletter.placeholder': 'Your mystical email address',
    'newsletter.button': 'Start my Revelation',
    'newsletter.loading': 'Initiation in progress...',
    'newsletter.success.title': 'Welcome to the Mystical Community!',
    'newsletter.success.subtitle': 'Your journey to revelation begins now. Watch your email for exclusive insights.',
    'newsletter.stats.souls': 'Souls Revealed',
    'newsletter.stats.archetypes': 'Unique Archetypes',
    'newsletter.stats.transformations': 'Successful Transformations',
    
    // Testimonials
    'testimonials.title': 'Soul Confessions',
    'testimonials.subtitle': 'Authentic revelations from those who have discovered their true essence',
    'testimonials.archetype': 'Revealed archetype',
    'testimonials.marie.name': 'Marie L.',
    'testimonials.marie.archetype': 'The Explorer',
    'testimonials.marie.text': 'This experience completely transformed my vision of myself. Discovering my archetype helped me understand my deep motivations and embrace my true nature.',
    'testimonials.thomas.name': 'Thomas R.',
    'testimonials.thomas.archetype': 'The Sage',
    'testimonials.thomas.text': 'Incredible precision in the analysis. I recognized myself in every aspect of my archetype. An authentic revelation that now guides my life choices.',
    'testimonials.sophie.name': 'Sophie M.',
    'testimonials.sophie.archetype': 'The Creator',
    'testimonials.sophie.text': 'A fascinating introspective journey. The insights I gained accompany me daily in my important decisions and have unleashed my creativity.',
    'testimonials.alex.name': 'Alex D.',
    'testimonials.alex.archetype': 'The Warrior',
    'testimonials.alex.text': 'A modern approach to Jungian archetypes. I finally understood why certain situations energize me and others drain me. Revolutionary!',
    'testimonials.luna.name': 'Luna K.',
    'testimonials.luna.archetype': 'The Magician',
    'testimonials.luna.text': 'The most transformative experience of my life. My archetype revealed hidden aspects of my personality and gave me keys to my fulfillment.',
    
    // Layout/Footer
    'footer.description': 'Discover the mysteries of your personal path through our unique archetypes.',
    'footer.navigation': 'Navigation',
    'footer.copyright': '© 2024 Queen de Q. All rights reserved.',
    
    // Card specific
    'card.deckLabel': 'Card deck – click to draw',
    'card.archetype': 'Archetype',
    'card.number': 'Archetype #',
    'card.aria': 'Card {name}, number {number}. Click to reveal.',
    'card.drawnCard': 'Drawn card',
    
    // Instructions
    'instructions.clickCards': 'Click on the cards or press',
    'instructions.pressSpace': 'Press',
    'instructions.spaceKey': 'SPACE',
    'instructions.toDiscover': 'to discover your archetype',
    'instructions.toReveal': 'to reveal your archetype',
    
    // Links
    'links.privacy': 'Privacy Policy',
    'links.terms': 'Terms of Service',
    'links.contact': 'Contact',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    
    // Accessibility
    'accessibility.menu': 'Menu',
    'accessibility.clickToDraw': 'Click to draw a card',
    'accessibility.cardDrawn': 'Card drawn',
    'accessibility.pressSpaceOrClick': 'Press Space or click to draw a card',
    'accessibility.photoOf': 'Photo of',
    
    // Card names
    'cards.aceOfSpades': 'Ace of Spades',
    'cards.aceOfDiamonds': 'Ace of Diamonds',
    
    // Card deck
    'cardDeck.dealCard': 'Deal me a card ↗',
    'cardDeck.yourArchetype': 'Your Archetype'
  }
};

// Context
interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey, variables?: Record<string, any>) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Provider
interface TranslationProviderProps {
  children: ReactNode;
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  // Get initial language from localStorage or default to French
  const getInitialLanguage = (): Language => {
    try {
      const saved = localStorage.getItem('queen-q-language');
      return (saved as Language) || 'fr';
    } catch {
      return 'fr';
    }
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  // Set language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('queen-q-language', lang);
    } catch (error) {
      console.warn('Could not save language to localStorage:', error);
    }
  };

  // Translation function
  const t = (key: TranslationKey, variables?: Record<string, any>): string => {
    let translation = translations[language][key] || translations.fr[key] || String(key);
    
    // Replace variables in translation
    if (variables) {
      Object.entries(variables).forEach(([variable, value]) => {
        translation = translation.replace(`{${variable}}`, String(value));
      });
    }
    
    return translation;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

// Hook
export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
} 