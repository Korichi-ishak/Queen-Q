import { archetypes } from './archetypes';

// Import des images Ace
import AceOfSpades from '../assets/Ace of Spades.jpeg';
import AceOfDiamonds from '../assets/Ace of Diamonds.jpeg';

export interface CardData {
  id: number;
  path: string;
  name: string;
  number: number;
  isSpecial: boolean;
}

// Générateur des données de cartes
export const generateCardData = (t: (key: string) => string): CardData[] => {
  const cards: CardData[] = [];
  
  for (let i = 1; i <= 54; i++) {
    let cardPath = `/assets/cards/placeholder.svg`;
    let cardName = archetypes[i - 1] || `${t('card.number')} ${i}`;
    let isSpecial = false;

    // Utiliser les images Ace pour les cartes 1 et 2
    if (i === 1) {
      cardPath = AceOfSpades;
      cardName = t('cards.aceOfSpades');
      isSpecial = true;
    } else if (i === 2) {
      cardPath = AceOfDiamonds;
      cardName = t('cards.aceOfDiamonds');
      isSpecial = true;
    }

    cards.push({
      id: i,
      path: cardPath,
      name: cardName,
      number: i,
      isSpecial
    });
  }
  return cards;
}; 