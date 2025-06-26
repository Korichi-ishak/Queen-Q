export interface Translation {
  header: {
    home: string;
    cards: string;
  };
  footer: {
    description: string;
    navigation: string;
    legal: string;
    terms: string;
    privacy: string;
    contact: string;
    copyright: string;
  };
  signupForm: {
    title: string;
    archetype: string;
    limitedSpots: string;
    emailLabel: string;
    emailPlaceholder: string;
    submitButton: string;
    loading: string;
    privacyNotice: string;
    error: string;
  };
  successOverlay: {
    title: string;
    message: string;
    returnButton: string;
  };
  cards: {
    title: string;
    description: string;
    returnHome: string;
  };
}

export const translations: Record<string, Translation> = {
  en: {
    header: {
      home: "Home",
      cards: "The 54 Cards",
    },
    footer: {
      description: "Discover your royal archetype and unlock your true potential",
      navigation: "Navigation",
      legal: "Legal",
      terms: "Terms of Use",
      privacy: "Privacy Policy",
      contact: "Contact",
      copyright: "All rights reserved.",
    },
    signupForm: {
      title: "Join the Royal Launch",
      archetype: "Your archetype:",
      limitedSpots: "Limited spots • Exclusive early access",
      emailLabel: "Email address",
      emailPlaceholder: "your.email@example.com",
      submitButton: "Join the Royal Launch",
      loading: "Sending...",
      privacyNotice: "By signing up, you agree to receive our exclusive emails. You can unsubscribe at any time.",
      error: "An error occurred. Please try again.",
    },
    successOverlay: {
      title: "Welcome to the Realm!",
      message: "Your royal archetype {cardName} awaits. We'll notify you when your royal journey begins.",
      returnButton: "Return to Kingdom",
    },
    cards: {
      title: "The 54 Cards",
      description: "Discover the 54 royal archetypes of Queen de Q. Hover or tap a card to flip it.",
      returnHome: "Return to Home",
    },
  },
  fr: {
    header: {
      home: "Accueil",
      cards: "Les 54 Cartes",
    },
    footer: {
      description: "Découvrez votre archétype royal et libérez votre véritable potentiel",
      navigation: "Navigation",
      legal: "Légal",
      terms: "Conditions d'utilisation",
      privacy: "Politique de confidentialité",
      contact: "Contact",
      copyright: "Tous droits réservés.",
    },
    signupForm: {
      title: "Rejoignez la Royal Launch",
      archetype: "Votre archétype :",
      limitedSpots: "Places limitées • Accès exclusif en avant-première",
      emailLabel: "Adresse email",
      emailPlaceholder: "votre.email@exemple.com",
      submitButton: "Rejoindre la Royal Launch",
      loading: "Envoi en cours...",
      privacyNotice: "En vous inscrivant, vous acceptez de recevoir nos emails exclusifs. Vous pouvez vous désabonner à tout moment.",
      error: "Une erreur est survenue. Veuillez réessayer.",
    },
    successOverlay: {
      title: "Bienvenue dans le Royaume !",
      message: "Votre archétype royal {cardName} vous attend. Nous vous informerons lorsque votre voyage royal commencera.",
      returnButton: "Retourner au Royaume",
    },
    cards: {
      title: "Les 54 Cartes",
      description: "Découvrez les 54 archétypes royaux de Queen de Q. Survolez ou touchez une carte pour la retourner.",
      returnHome: "Retour à l'accueil",
    },
  },
}; 