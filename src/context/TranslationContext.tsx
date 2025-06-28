import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Types
type Language = 'fr' | 'en';

// Translations data
const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.cards': 'Cartes',
    'nav.quiz': 'Quiz',
    'nav.chat': 'Chat',
    'nav.journal': 'Journal',
    'nav.shop': 'Boutique',
    
    // Shop - Updated for new products
    'shop.title': 'Boutique Queen de Q',
    'shop.subtitle': 'Les produits qui vont réveiller votre Reine intérieure',
    'shop.search': 'Rechercher un produit...',
    'shop.categories.all': 'Tous',
    'shop.categories.cards': 'Cartes',
    'shop.categories.clothing': 'Vêtements',
    'shop.categories.protection': 'Protection',
    'shop.categories.accessories': 'Accessoires',
    'shop.priceRanges.all': 'Tous les prix',
    'shop.priceRanges.low': '0$ - 50$ CAD',
    'shop.priceRanges.medium': '50$ - 100$ CAD',
    'shop.priceRanges.high': '100$+ CAD',
    'shop.badges.bestseller': 'Best-seller',
    'shop.badges.limitedEdition': 'Édition Limitée',
    'shop.badges.essential': 'Essentiel',
    'shop.badges.handcrafted': 'Fait Main',
    // Shop products - Real products
    'shop.items.physicalCards.name': 'Jeu de Cartes Queen de Q • Édition Physique',
    'shop.items.physicalCards.description': 'Découvrez les archétypes masculins avec notre jeu de cartes physique premium',
    'shop.items.queenShirt.name': 'T-Shirt "Je suis une Queen"',
    'shop.items.queenShirt.description': 'Portez votre couronne avec fierté dans ce t-shirt 100% coton bio',
    'shop.items.protectionKit.name': 'Kit de Protection Royale',
    'shop.items.protectionKit.description': 'Condoms premium et accessoires pour queens qui se respectent',
    'shop.items.charmBracelet.name': 'Bracelet Anti-2 de Pique',
    'shop.items.charmBracelet.description': 'Charme symbolique pour attirer les bonnes énergies masculines',
    'shop.addToCart': 'Ajouter au panier',
    'shop.comingSoon': 'Bientôt',
    'shop.noProducts': 'Aucun produit trouvé',
    'shop.noProductsDesc': 'Essayez de modifier vos filtres pour découvrir plus de produits.',
    
    // Chat - Updated for grandmother persona
    'chat.title': 'Salon de Thé avec Reine-Mère',
    'chat.queenMother': 'Reine-Mère',
    'chat.online': 'En ligne',
    'chat.greeting': 'Bonjour ma chérie... 👵🏻',
    'chat.welcome': 'Viens prendre le thé avec moi !',
    'chat.comingSoon': 'Bientôt disponible...',
    'chat.teaTime': 'Le thé de l\'après-midi arrive bientôt...',
    'chat.description': 'Fenêtre de chat avec la Reine-Mère, actuellement indisponible',
    'chat.timestamp1': '14:32',
    'chat.timestamp2': '14:33',
    
    // Journal - Updated for masculine archetypes focus
    'journal.title': 'Journal d\'Introspection',
    'journal.subtitle': 'Écrivez vos réflexions sur les archétypes masculins que vous attirez',
    'journal.newEntry': 'Écrire une nouvelle réflexion',
    'journal.entryTitle': 'Titre de votre réflexion',
    'journal.titlePlaceholder': 'Ex: Ma réflexion sur le Roi de Cœur...',
    'journal.archetype': 'Archétype découvert',
    'journal.optional': 'optionnel',
    'journal.archetypePlaceholder': 'Ex: Roi de Cœur - Le Protecteur',
    'journal.mood': 'Humeur du moment',
    'journal.moodPositive': 'Positive',
    'journal.moodNeutral': 'Neutre',
    'journal.moodReflective': 'Réflexive',
    'journal.moodMelancholic': 'Mélancolique',
    'journal.reflection': 'Votre réflexion',
    'journal.contentPlaceholder': 'Décrivez ce que cet archétype vous révèle sur vos patterns d\'attraction...',
    'journal.save': 'Sauvegarder',
    'journal.cancel': 'Annuler',
    'journal.delete': 'Supprimer',
    'journal.noEntries': 'Votre journal est vide',
    'journal.startWriting': 'Commencez à écrire vos premières réflexions sur les archétypes masculins',
    'journal.saved': 'Sauvegardé ✨',
    'journal.confirmDelete': 'Supprimer cette entrée ?',
    
    // Cards page
    'cards.title': 'Explorez les archétypes masculins',
    'cards.description': 'Découvrez les types d\'hommes que vous attirez dans vos relations',
    'cards.returnHome': 'Retour à l\'accueil',
    
    // Hero section
    'hero.title': 'Queen de Q',
    'hero.subtitle': 'Comprenez vos patterns d\'attraction masculine',
    'hero.description': 'Découvrez les archétypes d\'hommes que vous attirez et transformez vos relations amoureuses.',
    'hero.spotsLeft': 'places restantes',
    'hero.instruction': 'Cliquez sur les cartes ou appuyez sur ESPACE pour découvrir un archétype',
    'hero.scrollText': 'Faites défiler pour explorer',
    'hero.cta': 'Découvrir mon pattern',
    
    // Signup form
    'signup.title': 'Rejoignez Queen de Q',
    'signup.subtitle': 'Découvrez vos patterns d\'attraction',
    'signup.description': 'Comprenez les types d\'hommes que vous attirez',
    'signup.name': 'Nom complet',
    'signup.email': 'Adresse email',
    'signup.emailPlaceholder': 'votre@email.com',
    'signup.submit': 'Rejoindre maintenant',
    'signup.close': 'Fermer',
    'signup.loading': 'En cours...',
    'signup.form.email': 'Adresse email',
    'signup.form.submit': 'Rejoindre maintenant',
    
    // FAQ
    'faq.title': 'Questions Fréquentes',
    'faq.subtitle': 'Tout ce que vous devez savoir sur les archétypes masculins',
    'faq.question1': 'Comment fonctionnent les archétypes masculins ?',
    'faq.answer1': 'Notre système identifie les patterns d\'hommes que vous attirez habituellement dans vos relations, basé sur des cartes traditionnelles.',
    'faq.question2': 'Combien d\'archétypes existe-t-il ?',
    'faq.answer2': 'Il y a 52 archétypes masculins différents, chacun correspondant à une carte traditionnelle avec ses propres caractéristiques.',
    'faq.question3': 'Puis-je attirer différents archétypes ?',
    'faq.answer3': 'Oui, nos patterns évoluent avec le temps. Comprendre vos attractions actuelles vous aide à faire des choix plus conscients.',
    'faq.question4': 'Le 2 de Pique est-il vraiment problématique ?',
    'faq.answer4': 'Le 2 de Pique représente le manipulateur solaire. Comprendre ce pattern vous aide à l\'identifier et l\'éviter dans vos relations.',
    
    // How it works
    'howItWorks.title': 'Comment ça marche',
    'howItWorks.subtitle': 'Découvrez vos patterns en trois étapes',
    'howItWorks.step1.title': 'Tirage',
    'howItWorks.step1.description': 'Tirez une carte pour découvrir un archétype masculin et ses caractéristiques.',
    'howItWorks.step1.backText': 'Chaque carte révèle un type d\'homme différent que vous pourriez attirer.',
    'howItWorks.step2.title': 'Réflexion',
    'howItWorks.step2.description': 'Utilisez votre journal pour réfléchir sur vos patterns d\'attraction personnels.',
    'howItWorks.step2.backText': 'L\'introspection est clé pour comprendre vos choix amoureux.',
    'howItWorks.step3.title': 'Échange',
    'howItWorks.step3.description': 'Discutez avec Reine-Mère de vos découvertes autour d\'un thé complice.',
    'howItWorks.step3.backText': 'Partagez vos réflexions dans un espace bienveillant et sans jugement.',
    
    // Newsletter
    'newsletter.title': 'Rejoignez la Communauté',
    'newsletter.subtitle': 'Découvrez vos patterns d\'attraction masculine',
    'newsletter.description': 'Recevez des conseils exclusifs sur les relations et l\'analyse des archétypes masculins',
    'newsletter.placeholder': 'Votre adresse email',
    'newsletter.button': 'Commencer mon analyse',
    'newsletter.loading': 'Inscription en cours...',
    'newsletter.success.title': 'Bienvenue dans la Communauté !',
    'newsletter.success.subtitle': 'Vous allez recevoir des conseils exclusifs sur vos patterns d\'attraction.',
    'newsletter.stats.souls': 'Femmes Accompagnées',
    'newsletter.stats.archetypes': 'Archétypes Masculins',
    'newsletter.stats.transformations': 'Relations Transformées',
    
    // Testimonials
    'testimonials.title': 'Témoignages de Femmes',
    'testimonials.subtitle': 'Comment d\'autres femmes ont transformé leurs relations',
    'testimonials.archetype': 'Pattern découvert',
    'testimonials.marie.name': 'Marie L.',
    'testimonials.marie.archetype': 'Attirait des Manipulateurs',
    'testimonials.marie.text': 'Grâce à Queen de Q, j\'ai compris pourquoi j\'attirais toujours le même type d\'homme toxique. Maintenant je reconnais les red flags !',
    'testimonials.sophie.name': 'Sophie M.',
    'testimonials.sophie.archetype': 'Attirait des Immatures',
    'testimonials.sophie.text': 'J\'ai réalisé que j\'attirais des hommes émotionnellement indisponibles. Cette prise de conscience a tout changé dans mes relations.',
    'testimonials.clara.name': 'Clara D.',
    'testimonials.clara.archetype': 'Évitait les Protecteurs',
    'testimonials.clara.text': 'Je fuyais les hommes stables et aimants. Comprendre ce pattern m\'a aidée à accepter l\'amour sain.',
    
    // Layout/Footer
    'footer.description': 'Comprenez vos patterns d\'attraction masculine et transformez vos relations amoureuses.',
    'footer.navigation': 'Navigation',
    'footer.copyright': '© 2024 Queen de Q. Tous droits réservés.',
    
    // Card specific
    'card.deckLabel': 'Jeu de cartes – cliquez pour tirer',
    'card.archetype': 'Archétype',
    'card.number': 'Archétype n°',
    'card.aria': 'Carte {name}, numéro {number}. Cliquez pour révéler.',
    'card.drawnCard': 'Carte tirée',
    
    // Instructions
    'instructions.clickCards': 'Cliquez sur les cartes ou appuyez sur',
    'instructions.pressSpace': 'Appuyez sur',
    'instructions.spaceKey': 'ESPACE',
    'instructions.toDiscover': 'pour découvrir un archétype',
    'instructions.toReveal': 'pour révéler un archétype',
    
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
    'accessibility.closeChat': 'Fermer le chat',
    'accessibility.messageInput': 'Zone de message indisponible',
    
    // Card names
    'cards.aceOfSpades': 'As de Pique',
    'cards.aceOfDiamonds': 'As de Carreau',
    
    // Card deck
    'cardDeck.dealCard': 'Tirez-moi une carte ↗',
    'cardDeck.yourArchetype': 'Votre Archétype',
    
    // Suits
    'suits.hearts': 'Cœur',
    'suits.spades': 'Pique', 
    'suits.diamonds': 'Carreau',
    'suits.clubs': 'Trèfle',
    'ranks.dame': 'Dame',
    'ranks.reine': 'Reine',
    'ranks.roi': 'Roi', 
    'ranks.cavalier': 'Cavalier',
    
    // Live Tea Time
    'liveTeaTime.title': 'Live Tea Time',
    'liveTeaTime.date': '29 juin à 19:00 UTC+1',
    'liveTeaTime.reminder': 'Me rappeler',
    'liveTeaTime.close': 'Fermer la bannière',
    
    // Contact
    'contact.email': 'contact@queendeq.com',
    
    // Currency
    'currency.cad': 'CAD',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.cards': 'Cards',
    'nav.quiz': 'Quiz',
    'nav.chat': 'Chat',
    'nav.journal': 'Journal',
    'nav.shop': 'Shop',
    
    // Shop - Updated for new products
    'shop.title': 'Queen de Q Boutique',
    'shop.subtitle': 'Products that will awaken your inner Queen',
    'shop.search': 'Search for a product...',
    'shop.categories.all': 'All',
    'shop.categories.cards': 'Cards',
    'shop.categories.clothing': 'Clothing',
    'shop.categories.protection': 'Protection',
    'shop.categories.accessories': 'Accessories',
    'shop.priceRanges.all': 'All Prices',
    'shop.priceRanges.low': '$0 - $50 CAD',
    'shop.priceRanges.medium': '$50 - $100 CAD',
    'shop.priceRanges.high': '$100+ CAD',
    'shop.badges.bestseller': 'Bestseller',
    'shop.badges.limitedEdition': 'Limited Edition',
    'shop.badges.essential': 'Essential',
    'shop.badges.handcrafted': 'Handcrafted',
    // Shop products - Real products
    'shop.items.physicalCards.name': 'Queen de Q Card Deck • Physical Edition',
    'shop.items.physicalCards.description': 'Discover masculine archetypes with our premium physical card deck',
    'shop.items.queenShirt.name': 'T-Shirt "I am a Queen"',
    'shop.items.queenShirt.description': 'Wear your crown with pride in this 100% organic cotton t-shirt',
    'shop.items.protectionKit.name': 'Royal Protection Kit',
    'shop.items.protectionKit.description': 'Premium condoms and accessories for queens who respect themselves',
    'shop.items.charmBracelet.name': 'Anti-2 of Spades Bracelet',
    'shop.items.charmBracelet.description': 'Symbolic charm to attract positive masculine energies',
    'shop.addToCart': 'Add to Cart',
    'shop.comingSoon': 'Coming Soon',
    'shop.noProducts': 'No products found',
    'shop.noProductsDesc': 'Try modifying your filters to discover more products.',
    
    // Chat - Updated for grandmother persona
    'chat.title': 'Tea Salon with Queen Mother',
    'chat.queenMother': 'Queen Mother',
    'chat.online': 'Online',
    'chat.greeting': 'Hello my dear... 👵🏻',
    'chat.welcome': 'Come have tea with me!',
    'chat.comingSoon': 'Coming soon...',
    'chat.teaTime': 'Afternoon tea coming soon...',
    'chat.description': 'Chat window with Queen Mother, currently unavailable',
    'chat.timestamp1': '14:32',
    'chat.timestamp2': '14:33',
    
    // Journal - Updated for masculine archetypes focus
    'journal.title': 'Introspection Journal',
    'journal.subtitle': 'Write your reflections on the masculine archetypes you attract',
    'journal.newEntry': 'Write a new reflection',
    'journal.entryTitle': 'Title of your reflection',
    'journal.titlePlaceholder': 'Ex: My reflection on the King of Hearts...',
    'journal.archetype': 'Discovered archetype',
    'journal.optional': 'optional',
    'journal.archetypePlaceholder': 'Ex: King of Hearts - The Protector',
    'journal.mood': 'Current mood',
    'journal.moodPositive': 'Positive',
    'journal.moodNeutral': 'Neutral',
    'journal.moodReflective': 'Reflective',
    'journal.moodMelancholic': 'Melancholic',
    'journal.reflection': 'Your reflection',
    'journal.contentPlaceholder': 'Describe what this archetype reveals about your attraction patterns...',
    'journal.save': 'Save',
    'journal.cancel': 'Cancel',
    'journal.delete': 'Delete',
    'journal.noEntries': 'Your journal is empty',
    'journal.startWriting': 'Start writing your first reflections on masculine archetypes',
    'journal.saved': 'Saved ✨',
    'journal.confirmDelete': 'Delete this entry?',
    
    // Cards page
    'cards.title': 'Explore masculine archetypes',
    'cards.description': 'Discover the types of men you attract in your relationships',
    'cards.returnHome': 'Back to home',
    
    // Hero section
    'hero.title': 'Queen de Q',
    'hero.subtitle': 'Understand your masculine attraction patterns',
    'hero.description': 'Discover the archetypes of men you attract and transform your romantic relationships.',
    'hero.spotsLeft': 'spots left',
    'hero.instruction': 'Click on the cards or press SPACE to discover an archetype',
    'hero.scrollText': 'Scroll to explore',
    'hero.cta': 'Discover my pattern',
    
    // Signup form
    'signup.title': 'Join Queen de Q',
    'signup.subtitle': 'Discover your attraction patterns',
    'signup.description': 'Understand the types of men you attract',
    'signup.name': 'Full name',
    'signup.email': 'Email address',
    'signup.emailPlaceholder': 'your@email.com',
    'signup.submit': 'Join now',
    'signup.close': 'Close',
    'signup.loading': 'Loading...',
    'signup.form.email': 'Email address',
    'signup.form.submit': 'Join now',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Everything you need to know about masculine archetypes',
    'faq.question1': 'How do masculine archetypes work?',
    'faq.answer1': 'Our system identifies patterns of men you usually attract in your relationships, based on traditional playing cards.',
    'faq.question2': 'How many archetypes are there?',
    'faq.answer2': 'There are 52 different masculine archetypes, each corresponding to a traditional card with its own characteristics.',
    'faq.question3': 'Can I attract different archetypes?',
    'faq.answer3': 'Yes, our patterns evolve over time. Understanding your current attractions helps you make more conscious choices.',
    'faq.question4': 'Is the 2 of Spades really problematic?',
    'faq.answer4': 'The 2 of Spades represents the solar manipulator. Understanding this pattern helps you identify and avoid it in your relationships.',
    
    // How it works
    'howItWorks.title': 'How it works',
    'howItWorks.subtitle': 'Discover your patterns in three steps',
    'howItWorks.step1.title': 'Draw',
    'howItWorks.step1.description': 'Draw a card to discover a masculine archetype and its characteristics.',
    'howItWorks.step1.backText': 'Each card reveals a different type of man you might attract.',
    'howItWorks.step2.title': 'Reflect',
    'howItWorks.step2.description': 'Use your journal to reflect on your personal attraction patterns.',
    'howItWorks.step2.backText': 'Introspection is key to understanding your romantic choices.',
    'howItWorks.step3.title': 'Share',
    'howItWorks.step3.description': 'Discuss your discoveries with Queen Mother over a complicit tea.',
    'howItWorks.step3.backText': 'Share your reflections in a benevolent and judgment-free space.',
    
    // Newsletter
    'newsletter.title': 'Join the Community',
    'newsletter.subtitle': 'Discover your masculine attraction patterns',
    'newsletter.description': 'Receive exclusive advice on relationships and masculine archetype analysis',
    'newsletter.placeholder': 'Your email address',
    'newsletter.button': 'Start my analysis',
    'newsletter.loading': 'Registration in progress...',
    'newsletter.success.title': 'Welcome to the Community!',
    'newsletter.success.subtitle': 'You will receive exclusive advice on your attraction patterns.',
    'newsletter.stats.souls': 'Women Supported',
    'newsletter.stats.archetypes': 'Masculine Archetypes',
    'newsletter.stats.transformations': 'Relationships Transformed',
    
    // Testimonials
    'testimonials.title': 'Women\'s Testimonials',
    'testimonials.subtitle': 'How other women have transformed their relationships',
    'testimonials.archetype': 'Pattern discovered',
    'testimonials.marie.name': 'Marie L.',
    'testimonials.marie.archetype': 'Attracted Manipulators',
    'testimonials.marie.text': 'Thanks to Queen de Q, I understood why I always attracted the same type of toxic man. Now I recognize red flags!',
    'testimonials.sophie.name': 'Sophie M.',
    'testimonials.sophie.archetype': 'Attracted Immature Men',
    'testimonials.sophie.text': 'I realized I attracted emotionally unavailable men. This awareness changed everything in my relationships.',
    'testimonials.clara.name': 'Clara D.',
    'testimonials.clara.archetype': 'Avoided Protectors',
    'testimonials.clara.text': 'I was running away from stable and loving men. Understanding this pattern helped me accept healthy love.',
    
    // Layout/Footer
    'footer.description': 'Understand your masculine attraction patterns and transform your romantic relationships.',
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
    'instructions.toDiscover': 'to discover an archetype',
    'instructions.toReveal': 'to reveal an archetype',
    
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
    'accessibility.closeChat': 'Close chat',
    'accessibility.messageInput': 'Message input unavailable',
    
    // Card names
    'cards.aceOfSpades': 'Ace of Spades',
    'cards.aceOfDiamonds': 'Ace of Diamonds',
    
    // Card deck
    'cardDeck.dealCard': 'Deal me a card ↗',
    'cardDeck.yourArchetype': 'Your Archetype',
    
    // Suits
    'suits.hearts': 'Hearts',
    'suits.spades': 'Spades',
    'suits.diamonds': 'Diamonds', 
    'suits.clubs': 'Clubs',
    'ranks.dame': 'Dame',
    'ranks.reine': 'Queen',
    'ranks.roi': 'King',
    'ranks.cavalier': 'Knight',
    
    // Live Tea Time
    'liveTeaTime.title': 'Live Tea Time',
    'liveTeaTime.date': 'June 29th at 7:00 PM UTC+1',
    'liveTeaTime.reminder': 'Remind me',
    'liveTeaTime.close': 'Close banner',
    
    // Contact
    'contact.email': 'contact@queendeq.com',
    
    // Currency
    'currency.cad': 'CAD',
  }
};

// Define TranslationKey after translations object is complete
type TranslationKey = keyof typeof translations.fr;

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