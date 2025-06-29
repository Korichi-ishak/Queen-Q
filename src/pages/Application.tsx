import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, CreditCard, Coffee, Search, Heart } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

export const Application: React.FC = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const features = [
    {
      icon: <CreditCard className="w-12 h-12" />,
      title: "Ta pioche",
      description: "En répondant à quelques questions de la Reine Mère, découvre quel archétype masculin est ton ex, ton amoureux ou ton prospect. Plus la carte est forte, plus il est mature émotionnellement : pas pour rien qu'on mérite un King!",
      gradient: "from-rose-champagne via-antique-rose to-powder-rose"
    },
    {
      icon: <Search className="w-12 h-12" />,
      title: "Miroir, Miroir",
      description: "En répondant à quelques questions de la Reine Mère, découvre qui est ta reine intérieure (Cœur, Trèfle, Carreau, Pique). Tu pourras aussi apprendre quelles sont les blessures émotionnelles, ton langage de l'amour et les forces dominantes.",
      gradient: "from-imperial-gold via-smoky-gold to-patina-gold"
    },
    {
      icon: <Coffee className="w-12 h-12" />,
      title: "Le Salon de thé",
      description: "Profite d'un moment privilégié avec la Reine Mère. Échange avec elle pour tout savoir comment mettre un terme à une relation (Flush, Royal) ou pour te désenvouter du charme de ton deux de pique.",
      gradient: "from-royal-purple via-vintage-aubergine to-inked-indigo"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-royal-purple via-vintage-aubergine to-inked-indigo overflow-hidden relative">
      {/* Étoiles animées */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-imperial-gold rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Ornements décoratifs */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-20">
        <svg viewBox="0 0 200 200" className="w-full h-full text-imperial-gold">
          <path d="M0,0 Q50,50 100,0 Q150,50 200,0 L200,100 Q150,50 100,100 Q50,50 0,100 Z" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 opacity-20 transform rotate-90">
        <svg viewBox="0 0 200 200" className="w-full h-full text-imperial-gold">
          <path d="M0,0 Q50,50 100,0 Q150,50 200,0 L200,100 Q150,50 100,100 Q50,50 0,100 Z" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-64 h-64 opacity-20 transform rotate-180">
        <svg viewBox="0 0 200 200" className="w-full h-full text-imperial-gold">
          <path d="M0,0 Q50,50 100,0 Q150,50 200,0 L200,100 Q150,50 100,100 Q50,50 0,100 Z" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-20 transform rotate-270">
        <svg viewBox="0 0 200 200" className="w-full h-full text-imperial-gold">
          <path d="M0,0 Q50,50 100,0 Q150,50 200,0 L200,100 Q150,50 100,100 Q50,50 0,100 Z" fill="currentColor" />
        </svg>
      </div>

      <motion.div
        className="relative z-10 pt-24 pb-16 px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header avec couronne */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <div className="relative inline-block">
            {/* Couronne animée */}
            <motion.div
              className="absolute -top-8 left-1/2 transform -translate-x-1/2"
              animate={{
                rotate: [0, 5, -5, 0],
                y: [-2, 2, -2]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Crown className="w-16 h-16 text-imperial-gold" />
            </motion.div>
            
            <h1 className="font-playfair text-5xl md:text-7xl font-bold bg-gradient-to-r from-imperial-gold via-rose-champagne to-imperial-gold bg-clip-text text-transparent mb-4 pt-12">
              Queen de Q
            </h1>
            
            <motion.div
              className="text-4xl md:text-5xl font-playfair font-bold text-imperial-gold mb-6"
              animate={{
                textShadow: [
                  "0 0 20px rgba(210, 180, 140, 0.5)",
                  "0 0 30px rgba(210, 180, 140, 0.8)",
                  "0 0 20px rgba(210, 180, 140, 0.5)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              L'APPLICATION
            </motion.div>
            
            <motion.p 
              className="text-xl text-rose-champagne font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Lancement prévu été/automne 2025
            </motion.p>
          </div>
        </motion.div>

        {/* Message principal */}
        <motion.div
          className="max-w-4xl mx-auto text-center mb-20"
          variants={itemVariants}
        >
          <div className="relative bg-gradient-to-r from-royal-purple/30 via-vintage-aubergine/30 to-royal-purple/30 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-imperial-gold/30">
            {/* Ornements dans les coins */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-imperial-gold rounded-tl-lg"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-imperial-gold rounded-tr-lg"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-imperial-gold rounded-bl-lg"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-imperial-gold rounded-br-lg"></div>
            
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-imperial-gold mb-8">
              Tout de toi est complet
            </h2>
            
            <div className="space-y-4 text-lg md:text-xl text-rose-champagne leading-relaxed">
              <p>T'as déconstruit. Analysé. Trop.</p>
              <p>T'as été douce, forte, conciliante, sexy, brillante... parfois tout en même temps.</p>
              <p className="text-imperial-gold font-medium">Et t'as quand même mangé des deux de piques.</p>
              <p className="text-2xl font-playfair font-bold text-imperial-gold">Queen de Q, c'est la fin du bluff.</p>
              <p>C'est le début d'un jeu où on choisit nos règles, nos cartes, notre vérité.</p>
              <p className="text-xl font-bold text-rose-champagne">Pas pour plaire. Pour se couronner.</p>
            </div>
          </div>
        </motion.div>

        {/* Section des fonctionnalités */}
        <motion.div
          className="max-w-7xl mx-auto mb-20"
          variants={itemVariants}
        >
          <h3 className="text-center font-playfair text-3xl md:text-4xl font-bold text-imperial-gold mb-16">
            L'application Queen de Q, c'est...
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="relative group"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`relative bg-gradient-to-br ${feature.gradient} p-8 rounded-3xl shadow-2xl border border-imperial-gold/30 h-full`}>
                  {/* Ornements décoratifs */}
                  <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-white/30 rounded-tl-lg"></div>
                    <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-white/30 rounded-tr-lg"></div>
                    <div className="absolute bottom-4 left-4 w-6 h-6 border-l-2 border-b-2 border-white/30 rounded-bl-lg"></div>
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-white/30 rounded-br-lg"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-center mb-6">
                      <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm border border-white/30">
                        <div className="text-white">
                          {feature.icon}
                        </div>
                      </div>
                    </div>
                    
                    <h4 className="font-playfair text-2xl font-bold text-white text-center mb-6">
                      {feature.title}
                    </h4>
                    
                    <p className="text-white/90 text-center leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Particules flottantes */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/40 rounded-full"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                        }}
                        animate={{
                          opacity: [0.2, 0.8, 0.2],
                          scale: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2 + Math.random(),
                          repeat: Infinity,
                          delay: Math.random() * 2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          variants={itemVariants}
        >
          <div className="relative inline-block">
            <motion.div
              className="bg-gradient-to-r from-imperial-gold via-rose-champagne to-imperial-gold p-8 rounded-3xl shadow-2xl border-2 border-white/30 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h4 className="font-playfair text-2xl md:text-3xl font-bold text-royal-purple mb-4">
                Participe au lancement virtuel!
              </h4>
              
              <motion.button
                className="bg-royal-purple text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-vintage-aubergine transition-all duration-300 shadow-lg border-2 border-white/30"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles className="w-5 h-5 inline mr-2" />
                Je m'inscris
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          className="max-w-4xl mx-auto text-center mt-16"
          variants={itemVariants}
        >
          <p className="text-rose-champagne/70 text-sm italic leading-relaxed">
            Dans tous les cas, sache que les interactions avec la Reine Mère, un robot conversationnel entièrement spécifiquement par Queen de Q, te sont offertes à des fins de divertissement et ne remplacent en aucun cas un suivi thérapeutique avec une professionnelle de la santé compétente. Si tu ressens de la détresse, nous t'invitons à demander de l'aide.
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
}; 