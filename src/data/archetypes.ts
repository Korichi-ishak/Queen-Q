// Archétypes masculins de Queen de Q - Types d'hommes que vous attirez
// Basés sur les cartes à jouer traditionnelles (Cœur, Carreau, Trèfle, Pique)

export interface MasculineArchetype {
  id: string;
  suit: 'hearts' | 'diamonds' | 'clubs' | 'spades';
  rank: string;
  name: string;
  shortName: string;
  description: string;
  traits: string[];
  shadow: string;
  attraction: string;
}

export const masculineArchetypes: MasculineArchetype[] = [
  // CŒURS - Les Emotionnels/Protecteurs
  {
    id: 'king-hearts',
    suit: 'hearts',
    rank: 'Roi',
    name: 'Le Roi de Cœur - Le Protecteur',
    shortName: 'Le Protecteur',
    description: 'Un homme qui met la famille et les émotions au centre. Présent, attentionné, il crée un cocon sécurisant.',
    traits: ['Empathique', 'Protecteur', 'Fidèle', 'Familial'],
    shadow: 'Peut devenir possessif ou trop maternel',
    attraction: 'Vous attirez les hommes qui veulent créer un foyer stable'
  },
  {
    id: 'queen-hearts',
    suit: 'hearts',
    rank: 'Dame',
    name: 'La Dame de Cœur - L\'Amoureux Romantique',
    shortName: 'L\'Amoureux',
    description: 'Passionné et romantique, il vit l\'amour comme un conte de fées. Attentions délicates et grands gestes.',
    traits: ['Romantique', 'Passionné', 'Attentionné', 'Expressif'],
    shadow: 'Tendance à l\'idéalisation et à la jalousie',
    attraction: 'Vous attirez les âmes romantiques qui croient au grand amour'
  },
  {
    id: 'jack-hearts',
    suit: 'hearts',
    rank: 'Valet',
    name: 'Le Valet de Cœur - Le Jeune Sensible',
    shortName: 'Le Sensible',
    description: 'Émotionnellement ouvert, artistique, il porte son cœur sur la main. Vulnérable mais authentique.',
    traits: ['Sensible', 'Artistique', 'Vulnerable', 'Authentique'],
    shadow: 'Instabilité émotionnelle et dépendance affective',
    attraction: 'Vous attirez les âmes sensibles qui ont besoin de réconfort'
  },
  {
    id: 'ace-hearts',
    suit: 'hearts',
    rank: 'As',
    name: 'L\'As de Cœur - Le Nouveau Départ Amoureux',
    shortName: 'Nouveau Départ',
    description: 'Il représente le potentiel d\'un amour pur et nouveau. Fraîcheur, espoir, début d\'histoire.',
    traits: ['Pur', 'Espoir', 'Fraîcheur', 'Potentiel'],
    shadow: 'Manque d\'expérience et naïveté',
    attraction: 'Vous attirez les hommes qui offrent un nouveau commencement'
  },

  // CARREAUX - Les Ambitieux/Matérialistes  
  {
    id: 'king-diamonds',
    suit: 'diamonds',
    rank: 'Roi',
    name: 'Le Roi de Carreau - Le Boss Séducteur',
    shortName: 'Le Boss',
    description: 'Pouvoir, réussite, charisme. Il mène sa vie comme son entreprise : avec ambition et détermination.',
    traits: ['Ambitieux', 'Leader', 'Charismatique', 'Déterminé'],
    shadow: 'Narcissisme et priorité au travail sur la relation',
    attraction: 'Vous attirez les hommes de pouvoir et d\'influence'
  },
  {
    id: 'queen-diamonds',
    suit: 'diamonds',
    rank: 'Dame',
    name: 'La Dame de Carreau - Le Bon Vivant',
    shortName: 'Le Bon Vivant',
    description: 'Il aime les belles choses, les expériences luxueuses. Généreux mais parfois superficiel.',
    traits: ['Généreux', 'Raffiné', 'Sociable', 'Matérialiste'],
    shadow: 'Superficialité et rapport à l\'argent problématique',
    attraction: 'Vous attirez les hommes qui aiment profiter de la vie'
  },
  {
    id: 'jack-diamonds',
    suit: 'diamonds',
    rank: 'Valet',
    name: 'Le Valet de Carreau - L\'Opportuniste Charmeur',
    shortName: 'L\'Opportuniste',
    description: 'Malin, adaptable, il saisit les occasions. Charme et pragmatisme sont ses atouts.',
    traits: ['Malin', 'Adaptable', 'Charmeur', 'Pragmatique'],
    shadow: 'Peut être manipulateur et peu fiable',
    attraction: 'Vous attirez les charmeurs opportunistes'
  },

  // TRÈFLES - Les Actifs/Communicants
  {
    id: 'king-clubs',
    suit: 'clubs',
    rank: 'Roi',
    name: 'Le Roi de Trèfle - Le Conquérant',
    shortName: 'Le Conquérant',
    description: 'Force, action, leadership naturel. Il fonce vers ses objectifs avec une énergie débordante.',
    traits: ['Fort', 'Actif', 'Leader', 'Énergique'],
    shadow: 'Agressivité et besoin de domination',
    attraction: 'Vous attirez les hommes d\'action et de conquête'
  },
  {
    id: 'queen-clubs',
    suit: 'clubs',
    rank: 'Dame',
    name: 'La Dame de Trèfle - Le Communicant',
    shortName: 'Le Communicant',
    description: 'Sociable, bavard, il adore échanger et créer du lien. Network et relations sont sa spécialité.',
    traits: ['Sociable', 'Communicant', 'Créatif', 'Énergique'],
    shadow: 'Peut être superficiel dans ses relations',
    attraction: 'Vous attirez les grands communicants et networkers'
  },

  // PIQUES - Les Intellectuels/Mystérieux
  {
    id: 'king-spades',
    suit: 'spades',
    rank: 'Roi',
    name: 'Le Roi de Pique - Le Mystérieux Ténébreux',
    shortName: 'Le Ténébreux',
    description: 'Intelligence, mystère, profondeur. Il fascine par sa complexité et son côté insaisissable.',
    traits: ['Intelligent', 'Mystérieux', 'Profond', 'Complexe'],
    shadow: 'Tendance à la manipulation et aux jeux psychologiques',
    attraction: 'Vous attirez les hommes complexes et mystérieux'
  },
  {
    id: 'two-spades',
    suit: 'spades',
    rank: '2',
    name: 'Le 2 de Pique - Le Manipulateur Solaire',
    shortName: 'Le Manipulateur',
    description: 'Comme mentionné dans le cahier des charges, il représente les relations toxiques et manipulatrices.',
    traits: ['Manipulateur', 'Charmeur', 'Toxique', 'Séducteur'],
    shadow: 'Perversion narcissique et manipulation émotionnelle',
    attraction: 'Vous attirez malheureusement les manipulateurs'
  },
  {
    id: 'ace-spades',
    suit: 'spades',
    rank: 'As',
    name: 'L\'As de Pique - Le Solitaire Libre',
    shortName: 'Le Solitaire',
    description: 'Indépendant, intellectuel, il privilégie sa liberté. Difficile à apprivoiser mais fascinant.',
    traits: ['Indépendant', 'Intellectuel', 'Libre', 'Solitaire'],
    shadow: 'Difficultés d\'engagement et évitement émotionnel',
    attraction: 'Vous attirez les esprits libres difficiles à conquérir'
  }
];

// Version simplifiée pour compatibilité avec l'ancien code
export const archetypes = masculineArchetypes.map(arch => arch.name); 