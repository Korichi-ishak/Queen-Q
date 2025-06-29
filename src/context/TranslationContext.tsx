import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Types
type Language = 'fr' | 'en';

// Translations data
const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.cards': 'Le Cabinet des curiosités',
    'nav.apropos': 'À propos',
    'nav.application': "L'Application",
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
    'shop.awakeningTitle': 'La Boutique s\'Éveille',
    'shop.awakeningDesc': 'Notre collection exclusive arrive bientôt avec des produits authentiques Queen de Q. Restez connectées pour les premières révélations !',
    'shop.noProducts': 'Aucun produit trouvé',
    'shop.noProductsDesc': 'Essayez de modifier vos filtres pour découvrir plus de produits.',
    
    // Chat - Updated for grandmother persona
    'chat.title': 'Salon de Thé avec Reine-Mère',
    'chat.queenMother': 'Reine-Mère',
    'chat.reineMere': 'Reine-Mère',
    'chat.online': 'En ligne',
    'chat.greeting': 'Bonjour ma chérie... 👵🏻',
    'chat.welcome': 'Viens prendre le thé avec moi !',
    'chat.welcomeMessage': 'Bonjour ma belle ! Viens t\'asseoir, j\'ai préparé du thé et des petits gâteaux. Nous allons parler de ces archétypes masculins... 👵🏻☕',
    'chat.complicitMessage': 'Tu sais, j\'ai vu passer tellement d\'hommes dans ma vie ! Les manipulateurs, les protecteurs, les immatures... Je vais t\'aider à les reconnaître ma chérie.',
    'chat.teaTimeMessage': 'Bientôt, nous pourrons discuter en direct autour d\'un bon thé. En attendant, va explorer tes patterns dans ton journal ! 💕',
    'chat.comingSoon': 'Bientôt disponible...',
    'chat.teaTime': 'Le thé de l\'après-midi arrive bientôt...',
    'chat.teaTimeAvailable': 'Le thé sera bientôt prêt...',
    'chat.inputPlaceholder': 'Écrivez votre message... (bientôt disponible)',
    'chat.typing': 'Reine-Mère tape...',
    'chat.sendDisabled': 'Envoyer message (indisponible)',
    'chat.description': 'Fenêtre de chat avec la Reine-Mère, actuellement indisponible',
    'chat.timestamp1': '14:32',
    'chat.timestamp2': '14:33',
    'chat.timestamp3': '14:35',
    'chat.beta': 'VERSION BETA',
    'chat.awakeningTitle': 'Reine-Mère s\'éveille...',
    'chat.awakeningMessage': 'Elle apprend chaque jour à mieux vous comprendre et vous accompagner dans vos réflexions sur les archétypes masculins.',
    'chat.patience': '☕ "Patience ma chérie, le thé de l\'après-midi sera bientôt prêt..."',
    'chat.exploreJournal': 'En attendant, explorez vos patterns dans votre journal personnel ! 📝',
    'chat.evolving': '🌱 Reine-Mère est en pleine évolution !',
    'chat.placeholder': 'Tapez votre message...',
    'chat.betaNote': 'P.S. Je m\'améliore chaque jour pour mieux vous comprendre... Cette version beta me permet d\'apprendre vos besoins ! Bientôt, nos conversations seront encore plus riches. 💫',
    
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
    'testimonials.julie.name': 'Julie R.',
    'testimonials.julie.archetype': 'Attirait des Narcissiques',
    'testimonials.julie.text': 'J\'étais toujours avec des hommes qui ne parlaient que d\'eux. Queen de Q m\'a ouvert les yeux sur ce pattern destructeur.',
    'testimonials.camille.name': 'Camille S.',
    'testimonials.camille.archetype': 'Évitait l\'Engagement',
    'testimonials.camille.text': 'Je sabotais toujours mes relations sérieuses. Comprendre mes peurs m\'a permis de construire une relation stable.',
    
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
    'contact.email': 'gestionreines@gmail.com',
    
    // Currency
    'currency.cad': 'CAD',
    
    // Quiz
    'quiz.title': 'Découvrez Votre Queen Intérieure',
    'quiz.subtitle': 'Un voyage mystique à travers les archétypes féminins',
    'quiz.question': 'Question',
    'quiz.of': 'sur',
    'quiz.q1.text': 'Quelle est votre approche naturelle face à un défi ?',
    'quiz.q1.hearts': 'J\'écoute mon cœur et mes émotions',
    'quiz.q1.spades': 'J\'analyse stratégiquement la situation',
    'quiz.q1.diamonds': 'Je me concentre sur les opportunités pratiques',
    'quiz.q1.clubs': 'Je mobilise mon énergie créative',
    'quiz.q2.text': 'Comment exprimez-vous votre pouvoir personnel ?',
    'quiz.q2.hearts': 'Par la compassion et l\'empathie',
    'quiz.q2.spades': 'Par la sagesse et la détermination',
    'quiz.q2.diamonds': 'Par l\'ambition et la réussite',
    'quiz.q2.clubs': 'Par l\'innovation et l\'action',
    'quiz.q3.text': 'Quel environnement vous inspire le plus ?',
    'quiz.q3.hearts': 'Un foyer chaleureux entouré d\'amour',
    'quiz.q3.spades': 'Un espace de réflexion et de sagesse',
    'quiz.q3.diamonds': 'Un lieu de beauté et d\'élégance',
    'quiz.q3.clubs': 'Un atelier créatif plein d\'énergie',
    'quiz.q4.text': 'Comment gérez-vous les relations difficiles ?',
    'quiz.q4.hearts': 'Avec patience et compréhension',
    'quiz.q4.spades': 'Avec franchise et limites claires',
    'quiz.q4.diamonds': 'Avec diplomatie et intelligence',
    'quiz.q4.clubs': 'Avec passion et authenticité',
    'quiz.q5.text': 'Quelle est votre plus grande force ?',
    'quiz.q5.hearts': 'Ma capacité à aimer et nourrir',
    'quiz.q5.spades': 'Ma sagesse et mon discernement',
    'quiz.q5.diamonds': 'Mon élégance et ma grâce',
    'quiz.q5.clubs': 'Mon énergie et ma créativité',
    'quiz.q6.text': 'Comment prenez-vous des décisions importantes ?',
    'quiz.q6.hearts': 'En consultant mes sentiments profonds',
    'quiz.q6.spades': 'En pesant logiquement le pour et le contre',
    'quiz.q6.diamonds': 'En évaluant les bénéfices à long terme',
    'quiz.q6.clubs': 'En suivant mon instinct créatif',
    'quiz.q7.text': 'Quel rôle jouez-vous naturellement en groupe ?',
    'quiz.q7.hearts': 'La nourricière qui prend soin de tous',
    'quiz.q7.spades': 'La sage qui guide et conseille',
    'quiz.q7.diamonds': 'La leader qui inspire l\'excellence',
    'quiz.q7.clubs': 'L\'innovatrice qui apporte de nouvelles idées',
    'quiz.q8.text': 'Comment vous ressourcez-vous ?',
    'quiz.q8.hearts': 'En passant du temps avec mes proches',
    'quiz.q8.spades': 'En méditant et en me connectant à ma sagesse',
    'quiz.q8.diamonds': 'En m\'entourant de beauté et de luxe',
    'quiz.q8.clubs': 'En explorant de nouveaux projets créatifs',
    'quiz.results.hearts.title': 'Queen de Cœur - L\'Aimante',
    'quiz.results.hearts.subtitle': 'L\'Énergie de l\'Amour Inconditionnel',
    'quiz.results.hearts.description': 'Vous incarnez la force de l\'amour et de la compassion. Votre pouvoir réside dans votre capacité à nourrir et à guérir les autres.',
    'quiz.results.diamonds.title': 'Queen de Carreau - L\'Élégante',
    'quiz.results.diamonds.subtitle': 'L\'Énergie de la Grâce et de l\'Abondance',
    'quiz.results.diamonds.description': 'Vous rayonnez l\'élégance et la beauté. Votre pouvoir réside dans votre capacité à créer l\'harmonie et l\'abondance.',
    'quiz.results.spades.title': 'Queen de Pique - La Sage',
    'quiz.results.spades.subtitle': 'L\'Énergie de la Sagesse et de la Transformation',
    'quiz.results.spades.description': 'Vous incarnez la sagesse profonde et la transformation. Votre pouvoir réside dans votre capacité à voir au-delà des apparences.',
    'quiz.results.clubs.title': 'Queen de Trèfle - La Créatrice',
    'quiz.results.clubs.subtitle': 'L\'Énergie de la Créativité et de l\'Action',
    'quiz.results.clubs.description': 'Vous incarnez l\'énergie créatrice et l\'innovation. Votre pouvoir réside dans votre capacité à manifester vos visions.',
    'quiz.results.powerLabel': 'Votre Pouvoir',
    'quiz.results.shareTitle': 'Je suis une {title} !',
    'quiz.results.shareResult': 'Partager mon résultat',
    'quiz.results.joinKingdom': 'Rejoindre le Royaume',
    'quiz.retakeQuiz': 'Refaire le Quiz',

    // About Page
    'about.title': 'À propos',
    'about.intro.subtitle': 'Queen de Q, c\'est né d\'une amitié...',
    'about.intro.p1': 'Tout a commencé après quelques confidences échappées entre deux amies aux cœurs grands comme des royaumes. Karine, la Reine de Cœur, rayonne par son amour des autres, sa douceur désarmante et sa capacité à écouter sans juger. Marie-Ève, la Reine de Carreau, apporte sa fougue, son sens de l\'organisation… et son humour mordant qui décoiffe les idées reçues.',
    'about.intro.p2': 'Ce fut un coup de foudre d\'amitié. Une reconnaissance instinctive entre deux femmes aux parcours différents, mais animées par la même envie : créer du sens, du soutien, et de la magie dans la vie des autres femmes. Ensemble, elles ont rêvé d\'un royaume bien à elles — un espace sécurisant et drôle, sans courbettes ni comparaisons, où chaque femme pourrait se reconnecter à sa puissance, sa créativité, sa joie.',
    'about.intro.p3': 'De cette alliance est née Queen de Q, une application douce et impertinente, ludique et réfléchie, conçue pour aider les femmes à se « couronner » elles-mêmes. Grâce à des rituels quotidiens, des réflexions inspirantes, des cartes mystiques et des défis bienveillants, Queen de Q invite chacune à retrouver son trône — celui qui lui va, pas celui qu\'on lui a imposé.',
    'about.intro.p4': 'Parce qu\'on peut se reconstruire en riant. Parce qu\'on peut se choisir sans s\'excuser. Parce qu\'on est toutes Reines… à notre façon.',
    'about.karine.title': 'Reine de Cœur',
    'about.karine.p1': 'Pendant plus de vingt ans, Karine a tenu l\'espace sacré de la parentalité, accompagnant des familles dans les zones les plus vulnérables de leur humanité. Mais un jour, entre deux accompagnements, Karine a tourné le miroir. Vers elle.',
    'about.karine.p2': 'Ce qu\'elle a vu n\'était pas une mère, ni une guide, ni une coach. C\'était une Reine. Une reine fougueuse, lucide, blessée, qui portait en elle des archétypes, des patterns, des blessures générationnelles. Une femme qui s\'était trop souvent excusée d\'être forte, sensible, entière. Une femme qui voulait comprendre pourquoi elle attirait certains types d\'amants, pourquoi certaines histoires se répétaient, pourquoi le pouvoir féminin faisait si peur, même à elle-même.',
    'about.karine.p3': 'Aujourd\'hui, Karine est la présidente-directrice générale de Queen de Q. Mais pour les initiées, elle est beaucoup plus que ça : elle est la première Reine couronnée. Son rêve? Voir des milliers de femmes lever la tête, se choisir et se connaître. Parce qu\'une Reine, ça ne naît pas: ça se révèle.',
    'about.karine.p4': 'De cette plongée viscérale, est née une vision. Un outil. Un univers. Un empire doux, mais puissant : Queen de Q.',
    'about.marie-eve.title': 'Reine de Carreau',
    'about.marie-eve.p1': 'Il y a celles qui rêvent. Et il y a celles qui transforment le rêve en stratégie, le feu en structure, l\'intuition en empire. Marie-Ève Martel est de celles-là. Communicatrice chevronnée, femme d\'idées et d\'impact, elle est une force pragmatique derrière Queen de Q.',
    'about.marie-eve.p2': 'Mais ce n\'est pas un diplôme ni une feuille de route qui l\'a menée ici. C\'est une quête personnelle. Une série de traversées intérieures. Des blessures anciennes. Des masques brisés. Des dates qui laissaient des traces, et des silences lourds de sens. Elle aussi, elle a dansé avec les illusions. Elle aussi, elle a dû se recouronner.',
    'about.marie-eve.p3': 'Marie-Ève n\'est pas arrivée chez Queen de Q par hasard. Elle y est venue par devoir. Celui de créer un espace où les femmes peuvent se découvrir, se choisir et grandir dans le plaisir. Pas dans la douleur. Pas dans la honte. Pas dans l\'auto-sacrifice. Dans la clarté. Dans l\'humour. Dans le réel. Et avec un soupçon d\'audace.',
    'about.marie-eve.p4': 'Marie-Ève dirige les opérations marketing de Queen de Q. Mais elle est bien plus qu\'une stratège. Elle veille à ce que chaque Queen reconnaisse sa valeur — même quand elle doute, même quand elle chute.',
    'about.contact.title': 'Contacte-nous',
    'about.contact.email': 'gestionreines@gmail.com',

    // Application Page
    'app.title': 'Queen de Q',
    'app.subtitle': 'L\'APPLICATION',
    'app.scroll': 'Découvrez les secrets',
    'app.intro.title': 'Tout de toi est complet',
    'app.intro.p1': 'T\'as déconstruit. Analysé. Trop.',
    'app.intro.p2': 'T\'as été douce, forte, conciliante, sexy, brillante... parfois tout en même temps.',
    'app.intro.p3': 'Et t\'as quand même mangé des deux de piques.',
    'app.intro.p4': 'Queen de Q, c\'est la fin du bluff.',
    'app.intro.p5': 'C\'est le début d\'un jeu où on choisit nos règles, nos cartes, notre vérité.',
    'app.intro.p6': 'Pas pour plaire. Pour se couronner.',
    'app.features.title': 'L\'application Queen de Q, c\'est...',
    'app.feature1.title': 'Ta pioche',
    'app.feature1.desc': 'Tire le portrait du mec qui occupe ton esprit (ou ton lit). La Reine Mère t\'aide à identifier sa carte : Deux de pique manipulateur, Roi de trèfle fuyant ou Joker insaisissable... Tu sauras à quoi tu joues.',
    'app.feature2.title': 'Miroir, miroir',
    'app.feature2.desc': 'Un voyage introspectif guidé pour découvrir ta Queen Intérieure. Blessures racines, langage de l\'amour, style d\'attachement, croyances à flusher... Tu repars avec un portrait personnalisé et une clarté déstabilisante.',
    'app.feature3.title': 'Salon de thé',
    'app.feature3.desc': 'Des rituels guidés pour te désenvoûter, flusher les anciennes versions de toi, et entamer un réel processus de retour à toi.',
    'app.cta.title': 'Reçois ton invitation au Royaume',
    'app.cta.subtitle': 'Rejoins-nous pour le lancement officiel et sois parmi les premières à te couronner.',
    'app.cta.button': 'Recevoir mon invitation',

    // Registration Modal
    'modal.title': 'Lancement Officiel de Queen de Q',
    'modal.subtitle': '"Le pont-levis descend. Les portes s\'ouvrent. Le royaume t\'attend."',
    'modal.date': '15 Juillet 2025',
    'modal.time': '19:00 - 20:00',
    'modal.location': 'En Ligne',
    'modal.location.desc': 'Le lien vous sera envoyé',
    'modal.program.title': 'Au Programme Dans l\'Appli :',
    'modal.program.item1': '<span class="font-bold">Ta pioche :</span> Tire le portrait du mec qui occupe ton esprit (ou ton lit).',
    'modal.program.item2': '<span class="font-bold">Miroir, miroir :</span> Un voyage introspectif guidé pour découvrir ta Queen Intérieure.',
    'modal.program.item3': '<span class="font-bold">Salon de thé :</span> Des rituels guidés pour te désenvoûter et entamer un réel processus de retour à toi.',
    'modal.offer.title': 'OFFRE EXCLUSIVE LORS DU LANCEMENT !',
    'modal.offer.desc': 'Sois présente pour la découvrir.',
    'modal.final_question': 'Est-ce que t\'es prête à changer les règles du jeu ?',
    'modal.email_placeholder': 'Entre ton courriel...',
    'modal.submit_button': 'Je m\'inscris',
    
    // Cards page - Cabinet
    'cards.cabinet.title': 'Le Cabinet des Curiosités',
    'cards.cabinet.subtitle': 'Explorez les archétypes, levez le voile sur vos dynamiques et comprenez les règles du jeu pour mieux régner.',
    'cards.cabinet.item1.title': 'Le Voile des Mystères',
    'cards.cabinet.item1.desc': 'Chaque carte est une clé pour déchiffrer les schémas qui façonnent vos rencontres.',
    'cards.cabinet.item2.title': 'Votre Toile Créative',
    'cards.cabinet.item2.desc': 'Utilisez ces archétypes comme source d\'inspiration pour vos réflexions et vos histoires.',
    'cards.cabinet.item3.title': 'Les Règles du Jeu',
    'cards.cabinet.item3.desc': 'Tirez une carte, identifiez l\'archétype, et demandez-vous : progression ou répétition ?',

    // Cards page - Creative additions
    'cards.portal.title': 'Le Portail des Archétypes',
    'cards.portal.subtitle': 'Osez voir qui vous attirez vraiment.',
    'cards.portal.instruction': 'Touchez le portail pour commencer',
    'cards.instructions.title': 'Les Rituels de la Queen',
    'cards.instructions.theme1.title': 'Le Mystère',
    'cards.instructions.theme1.desc': 'Chaque carte est un miroir, un archétype masculin. Votre tirage n\'est pas un hasard, il est une révélation de vos patterns amoureux actuels. Accueillez-le avec curiosité.',
    'cards.instructions.theme2.title': 'La Créativité',
    'cards.instructions.theme2.desc': 'Le but n\'est pas de juger la carte, mais de comprendre le message. Utilisez votre journal pour noter vos réflexions. Quelle part de vous attire cet homme ? Quelle blessure est touchée ?',
    'cards.instructions.theme3.title': 'Le Jeu',
    'cards.instructions.theme3.desc': 'Tirez une carte, identifiez l\'archétype, et demandez-vous : est-ce une progression ou une répétition ? Le but est de comprendre pour mieux jouer.',
    'cards.grid.title': 'Le Grand Théâtre des Hommes',
    'footer.brand.title': 'Queen de Q',
    'footer.brand.subtitle': 'Dévoilez le jeu des archétypes masculins.',
    'footer.links.title': 'Navigation',
    'footer.links.about': 'À Propos',
    'footer.links.faq': 'FAQ',
    'footer.links.contact': 'Contact',
    'footer.social.title': 'Restons Connectés',
    'footer.social.subtitle': 'Suivez-nous pour des mises à jour et des contenus exclusifs.',
    'footer.rights': 'Tous droits réservés.',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.cards': 'The Cabinet of Curiosities',
    'nav.apropos': 'About',
    'nav.application': 'The Application',
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
    'shop.awakeningTitle': 'The Shop Awakens',
    'shop.awakeningDesc': 'Our exclusive collection is coming soon with authentic Queen de Q products. Stay connected for the first revelations!',
    'shop.noProducts': 'No products found',
    'shop.noProductsDesc': 'Try modifying your filters to discover more products.',
    
    // Chat - Updated for grandmother persona
    'chat.title': 'Tea Salon with Queen Mother',
    'chat.queenMother': 'Queen Mother',
    'chat.reineMere': 'Queen Mother',
    'chat.online': 'Online',
    'chat.greeting': 'Hello my dear... 👵🏻',
    'chat.welcome': 'Come have tea with me!',
    'chat.welcomeMessage': 'Hello my dear! Come sit down, I\'ve prepared tea and small cakes. We\'ll talk about these masculine archetypes... 👵🏻☕',
    'chat.complicitMessage': 'You know, I\'ve seen so many men in my life! Manipulators, protectors, immature ones... I\'ll help you recognize them my dear.',
    'chat.teaTimeMessage': 'Soon, we\'ll be able to chat live over a good cup of tea. Meanwhile, go explore your patterns in your journal! 💕',
    'chat.comingSoon': 'Coming soon...',
    'chat.teaTime': 'Afternoon tea coming soon...',
    'chat.teaTimeAvailable': 'Tea will be ready soon...',
    'chat.inputPlaceholder': 'Write your message... (coming soon)',
    'chat.typing': 'Queen Mother typing...',
    'chat.sendDisabled': 'Send message (unavailable)',
    'chat.description': 'Chat window with Queen Mother, currently unavailable',
    'chat.timestamp1': '14:32',
    'chat.timestamp2': '14:33',
    'chat.timestamp3': '14:35',
    'chat.beta': 'BETA VERSION',
    'chat.awakeningTitle': 'Queen Mother awakens...',
    'chat.awakeningMessage': 'She learns every day to better understand and accompany you in your reflections on masculine archetypes.',
    'chat.patience': '☕ "Patience my dear, afternoon tea will be ready soon..."',
    'chat.exploreJournal': 'In the meantime, explore your patterns in your personal journal! 📝',
    'chat.evolving': '🌱 Queen Mother is evolving!',
    'chat.placeholder': 'Type your message...',
    'chat.betaNote': 'P.S. I improve every day to better understand you... This beta version allows me to learn your needs! Soon, our conversations will be even richer. 💫',
    
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
    'testimonials.julie.name': 'Julie R.',
    'testimonials.julie.archetype': 'Attracted Narcissists',
    'testimonials.julie.text': 'I was always with men who only talked about themselves. Queen de Q opened my eyes to this destructive pattern.',
    'testimonials.camille.name': 'Camille S.',
    'testimonials.camille.archetype': 'Avoided Commitment',
    'testimonials.camille.text': 'I always sabotaged my serious relationships. Understanding my fears allowed me to build a stable relationship.',
    
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
    'contact.email': 'gestionreines@gmail.com',
    
    // Currency
    'currency.cad': 'CAD',
    
    // Quiz
    'quiz.title': 'Discover Your Inner Queen',
    'quiz.subtitle': 'A mystical journey through feminine archetypes',
    'quiz.question': 'Question',
    'quiz.of': 'of',
    'quiz.q1.text': 'What is your natural approach when facing a challenge?',
    'quiz.q1.hearts': 'I listen to my heart and emotions',
    'quiz.q1.spades': 'I strategically analyze the situation',
    'quiz.q1.diamonds': 'I focus on practical opportunities',
    'quiz.q1.clubs': 'I mobilize my creative energy',
    'quiz.q2.text': 'How do you express your personal power?',
    'quiz.q2.hearts': 'Through compassion and empathy',
    'quiz.q2.spades': 'Through wisdom and determination',
    'quiz.q2.diamonds': 'Through ambition and success',
    'quiz.q2.clubs': 'Through innovation and action',
    'quiz.q3.text': 'Which environment inspires you the most?',
    'quiz.q3.hearts': 'A warm home surrounded by love',
    'quiz.q3.spades': 'A space for reflection and wisdom',
    'quiz.q3.diamonds': 'A place of beauty and elegance',
    'quiz.q3.clubs': 'A creative workshop full of energy',
    'quiz.q4.text': 'How do you handle difficult relationships?',
    'quiz.q4.hearts': 'With patience and understanding',
    'quiz.q4.spades': 'With honesty and clear boundaries',
    'quiz.q4.diamonds': 'With diplomacy and intelligence',
    'quiz.q4.clubs': 'With passion and authenticity',
    'quiz.q5.text': 'What is your greatest strength?',
    'quiz.q5.hearts': 'My ability to love and nurture',
    'quiz.q5.spades': 'My wisdom and discernment',
    'quiz.q5.diamonds': 'My elegance and grace',
    'quiz.q5.clubs': 'My energy and creativity',
    'quiz.q6.text': 'How do you make important decisions?',
    'quiz.q6.hearts': 'By consulting my deep feelings',
    'quiz.q6.spades': 'By logically weighing pros and cons',
    'quiz.q6.diamonds': 'By evaluating long-term benefits',
    'quiz.q6.clubs': 'By following my creative instinct',
    'quiz.q7.text': 'What role do you naturally play in a group?',
    'quiz.q7.hearts': 'The nurturer who takes care of everyone',
    'quiz.q7.spades': 'The wise one who guides and advises',
    'quiz.q7.diamonds': 'The leader who inspires excellence',
    'quiz.q7.clubs': 'The innovator who brings new ideas',
    'quiz.q8.text': 'How do you recharge yourself?',
    'quiz.q8.hearts': 'By spending time with loved ones',
    'quiz.q8.spades': 'By meditating and connecting to my wisdom',
    'quiz.q8.diamonds': 'By surrounding myself with beauty and luxury',
    'quiz.q8.clubs': 'By exploring new creative projects',
    'quiz.results.hearts.title': 'Queen of Hearts - The Loving',
    'quiz.results.hearts.subtitle': 'The Energy of Unconditional Love',
    'quiz.results.hearts.description': 'You embody the power of love and compassion. Your strength lies in your ability to nurture and heal others.',
    'quiz.results.diamonds.title': 'Queen of Diamonds - The Elegant',
    'quiz.results.diamonds.subtitle': 'The Energy of Grace and Abundance',
    'quiz.results.diamonds.description': 'You radiate elegance and beauty. Your power lies in your ability to create harmony and abundance.',
    'quiz.results.spades.title': 'Queen of Spades - The Wise',
    'quiz.results.spades.subtitle': 'The Energy of Wisdom and Transformation',
    'quiz.results.spades.description': 'You embody deep wisdom and transformation. Your power lies in your ability to see beyond appearances.',
    'quiz.results.clubs.title': 'Queen of Clubs - The Creator',
    'quiz.results.clubs.subtitle': 'The Energy of Creativity and Action',
    'quiz.results.clubs.description': 'You embody creative energy and innovation. Your power lies in your ability to manifest your visions.',
    'quiz.results.powerLabel': 'Your Power',
    'quiz.results.shareTitle': 'I am a {title}!',
    'quiz.results.shareResult': 'Share my result',
    'quiz.results.joinKingdom': 'Join the Kingdom',
    'quiz.retakeQuiz': 'Retake Quiz',

    // About Page
    'about.title': 'About Us',
    'about.intro.subtitle': 'Queen de Q was born from a friendship...',
    'about.intro.p1': 'It all started after a few confidences were exchanged between two friends with hearts as vast as kingdoms. Karine, the Queen of Hearts, shines with her love for others, her disarming gentleness, and her ability to listen without judgment. Marie-Ève, the Queen of Diamonds, brings her passion, her organizational skills... and her biting humor that challenges conventional ideas.',
    'about.intro.p2': 'It was a friendship at first sight. An instinctive recognition between two women from different backgrounds, but driven by the same desire: to create meaning, support, and magic in the lives of other women. Together, they dreamed of a kingdom of their own—a safe and fun space, without curtsies or comparisons, where every woman could reconnect with her power, her creativity, her joy.',
    'about.intro.p3': 'From this alliance, Queen de Q was born, a gentle and impertinent, playful and thoughtful application, designed to help women "crown" themselves. Through daily rituals, inspiring reflections, mystical cards, and benevolent challenges, Queen de Q invites everyone to find their throne—the one that fits them, not the one that was imposed on them.',
    'about.intro.p4': 'Because we can rebuild ourselves while laughing. Because we can choose ourselves without apologizing. Because we are all Queens… in our own way.',
    'about.karine.title': 'Queen of Hearts',
    'about.karine.p1': 'For over twenty years, Karine held the sacred space of parenthood, accompanying families in the most vulnerable areas of their humanity. But one day, between two sessions, Karine turned the mirror. Towards herself.',
    'about.karine.p2': 'What she saw was not a mother, nor a guide, nor a coach. It was a Queen. A fiery, lucid, wounded queen, who carried within her archetypes, patterns, generational wounds. A woman who had too often apologized for being strong, sensitive, whole. A woman who wanted to understand why she attracted certain types of lovers, why certain stories repeated themselves, why feminine power was so frightening, even to herself.',
    'about.karine.p3': 'Today, Karine is the CEO of Queen de Q. But for the initiated, she is much more than that: she is the first crowned Queen. Her dream? To see thousands of women hold their heads high, choose themselves, and know themselves. Because a Queen is not born: she is revealed.',
    'about.karine.p4': 'From this visceral dive, a vision was born. A tool. A universe. A gentle but powerful empire: Queen de Q.',
    'about.marie-eve.title': 'Queen of Diamonds',
    'about.marie-eve.p1': 'There are those who dream. And there are those who transform the dream into strategy, fire into structure, intuition into an empire. Marie-Ève Martel is one of them. A seasoned communicator, a woman of ideas and impact, she is a pragmatic force behind Queen de Q.',
    'about.marie-eve.p2': 'But it wasn\'t a degree or a resume that brought her here. It was a personal quest. A series of inner journeys. Old wounds. Broken masks. Dates that left marks, and silences heavy with meaning. She, too, danced with illusions. She, too, had to re-crown herself.',
    'about.marie-eve.p3': 'Marie-Ève did not arrive at Queen de Q by chance. She came out of duty. The duty to create a space where women can discover themselves, choose themselves, and grow with pleasure. Not in pain. Not in shame. Not in self-sacrifice. In clarity. In humor. In reality. And with a hint of audacity.',
    'about.marie-eve.p4': 'Marie-Ève leads the marketing operations for Queen de Q. But she is much more than a strategist. She ensures that every Queen recognizes her value—even when she doubts, even when she stumbles.',
    'about.contact.title': 'Contact Us',
    'about.contact.email': 'gestionreines@gmail.com',

    // Application Page
    'app.title': 'Queen de Q',
    'app.subtitle': 'THE APPLICATION',
    'app.scroll': 'Discover the secrets',
    'app.intro.title': 'All of you is complete',
    'app.intro.p1': 'You have deconstructed. Analyzed. Too much.',
    'app.intro.p2': 'You have been gentle, strong, accommodating, sexy, brilliant... sometimes all at the same time.',
    'app.intro.p3': 'And you still got played by twos of spades.',
    'app.intro.p4': 'Queen de Q is the end of the bluff.',
    'app.intro.p5': 'It\'s the beginning of a game where we choose our rules, our cards, our truth.',
    'app.intro.p6': 'Not to please. To crown ourselves.',
    'app.features.title': 'The Queen de Q application is...',
    'app.feature1.title': 'Your Draw',
    'app.feature1.desc': 'Draw the portrait of the guy who occupies your mind (or your bed). The Queen Mother helps you identify his card: manipulative Two of Spades, elusive King of Clubs, or indecipherable Joker... You will know what you are playing with.',
    'app.feature2.title': 'Mirror, Mirror',
    'app.feature2.desc': 'A guided introspective journey to discover your inner Queen. Root wounds, love language, attachment style, beliefs to flush... You leave with a personalized portrait and unsettling clarity.',
    'app.feature3.title': 'Tea Room',
    'app.feature3.desc': 'Guided rituals to un-spell yourself, flush out old versions of yourself, and begin a real process of returning to you.',
    'app.cta.title': 'Receive your invitation to the Kingdom',
    'app.cta.subtitle': 'Join us for the official launch and be among the first to crown yourself.',
    'app.cta.button': 'Receive my invitation',

    // Registration Modal
    'modal.title': 'Official Launch of Queen de Q',
    'modal.subtitle': '"The drawbridge is lowering. The gates are opening. The kingdom awaits you."',
    'modal.date': 'July 15, 2025',
    'modal.time': '7:00 PM - 8:00 PM',
    'modal.location': 'Online',
    'modal.location.desc': 'The link will be sent to you',
    'modal.program.title': 'On the Agenda in the App:',
    'modal.program.item1': '<span class="font-bold">Your Draw:</span> Draw the portrait of the guy who occupies your mind (or your bed).',
    'modal.program.item2': '<span class="font-bold">Mirror, Mirror:</span> A guided introspective journey to discover your inner Queen.',
    'modal.program.item3': '<span class="font-bold">Tea Room:</span> Guided rituals to un-spell yourself and begin a real process of returning to you.',
    'modal.offer.title': 'EXCLUSIVE LAUNCH OFFER!',
    'modal.offer.desc': 'Be there to discover it.',
    'modal.final_question': 'Are you ready to change the rules of the game?',
    'modal.email_placeholder': 'Enter your email...',
    'modal.submit_button': 'I\'m signing up',
    
    // Cards page - Cabinet
    'cards.cabinet.title': 'The Cabinet of Curiosities',
    'cards.cabinet.subtitle': 'Explore the archetypes, lift the veil on your dynamics, and understand the rules of the game to better reign.',
    'cards.cabinet.item1.title': 'The Veil of Mysteries',
    'cards.cabinet.item1.desc': 'Each card is a key to decipher the patterns that shape your encounters.',
    'cards.cabinet.item2.title': 'Your Creative Canvas',
    'cards.cabinet.item2.desc': 'Use these archetypes as a source of inspiration for your thoughts and stories.',
    'cards.cabinet.item3.title': 'The Rules of the Game',
    'cards.cabinet.item3.desc': 'Draw a card, identify the archetype, and ask yourself: progression or repetition?',

    // Cards page - Creative additions
    'cards.portal.title': 'The Archetype Portal',
    'cards.portal.subtitle': 'Dare to see who you truly attract.',
    'cards.portal.instruction': 'Touch the portal to begin',
    'cards.instructions.title': 'The Queen\'s Rituals',
    'cards.instructions.theme1.title': 'The Mystery',
    'cards.instructions.theme1.desc': 'Each card is a mirror, a male archetype. Your draw is not random; it is a revelation of your current love patterns. Welcome it with curiosity.',
    'cards.instructions.theme2.title': 'The Creativity',
    'cards.instructions.theme2.desc': 'The goal is not to judge the card, but to understand the message. Use your journal to write down your thoughts. What part of you attracts this man? What wound is touched?',
    'cards.instructions.theme3.title': 'The Game',
    'cards.instructions.theme3.desc': 'Draw a card, identify the archetype, and ask yourself: is this progress or a repetition? The goal is to understand to play better.',
    'cards.grid.title': 'The Great Theatre of Men',
    'footer.brand.title': 'Queen of Q',
    'footer.brand.subtitle': 'Unveil the game of masculine archetypes.',
    'footer.links.title': 'Navigation',
    'footer.links.about': 'About',
    'footer.links.faq': 'FAQ',
    'footer.links.contact': 'Contact',
    'footer.social.title': 'Stay Connected',
    'footer.social.subtitle': 'Follow us for updates and exclusive content.',
    'footer.rights': 'All rights reserved.',
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