import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Gem, Sparkles, Moon, Eye, Zap, Crown } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

type TranslationFunction = ReturnType<typeof useTranslation>['t'];

interface MysticalItem {
  id: string;
  name: string;
  price: number;
  rarity: 'common' | 'rare' | 'legendary' | 'mythical';
  power: string;
  element: 'fire' | 'water' | 'earth' | 'air' | 'spirit';
  description: string;
}

const getMysticalItems = (t: TranslationFunction): MysticalItem[] => [
  {
    id: '1',
    name: t('shop.items.orb.name'),
    price: 89.99,
    rarity: 'legendary',
    power: t('shop.items.orb.power'),
    element: 'spirit',
    description: t('shop.items.orb.description')
  },
  {
    id: '2',
    name: t('shop.items.pendulum.name'),
    price: 124.99,
    rarity: 'mythical',
    power: t('shop.items.pendulum.power'),
    element: 'earth',
    description: t('shop.items.pendulum.description')
  },
  {
    id: '3',
    name: t('shop.items.cards.name'),
    price: 67.99,
    rarity: 'rare',
    power: t('shop.items.cards.power'),
    element: 'air',
    description: t('shop.items.cards.description')
  },
  {
    id: '4',
    name: t('shop.items.essence.name'),
    price: 156.99,
    rarity: 'mythical',
    power: t('shop.items.essence.power'),
    element: 'water',
    description: t('shop.items.essence.description')
  }
];

export const Shop: React.FC = () => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [starPositions, setStarPositions] = useState<Array<{x: number, y: number, delay: number}>>([]);
  
  const mysticalItems = getMysticalItems(t);

  useEffect(() => {
    // Generate random star positions for background
    const stars = Array.from({ length: 20 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setStarPositions(stars);
  }, []);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-purple-600';
      case 'legendary': return 'from-purple-500 to-pink-600';
      case 'mythical': return 'from-amber-400 to-rose-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getElementIcon = (element: string) => {
    switch (element) {
      case 'fire': return <Zap className="w-6 h-6 text-orange-400" />;
      case 'water': return <Moon className="w-6 h-6 text-blue-400" />;
      case 'earth': return <Gem className="w-6 h-6 text-green-400" />;
      case 'air': return <Sparkles className="w-6 h-6 text-purple-400" />;
      case 'spirit': return <Eye className="w-6 h-6 text-indigo-400" />;
      default: return <Star className="w-6 h-6 text-gray-400" />;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black px-6 pt-32 pb-12 relative overflow-hidden">
      {/* Animated Background Stars */}
      {starPositions.map((star, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{ left: `${star.x}%`, top: `${star.y}%` }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: star.delay }}
        />
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Mystical Header */}
        <motion.div
          className="text-center mb-16 relative"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent blur-3xl"></div>
          <motion.div
            className="relative"
            animate={{ rotateY: [0, 5, 0, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            <Crown className="w-16 h-16 text-amber-400 mx-auto mb-6" />
          </motion.div>
          
          <h1 className="font-playfair font-bold text-6xl bg-gradient-to-r from-amber-200 via-purple-300 to-rose-300 bg-clip-text text-transparent mb-6">
            {t('shop.title')}
          </h1>
          <p className="text-purple-200/80 text-xl max-w-3xl mx-auto leading-relaxed">
            {t('shop.subtitle')}
          </p>
          
          {/* Floating Orbs */}
          <motion.div
            className="absolute -top-10 left-1/4 w-4 h-4 bg-purple-400 rounded-full blur-sm"
            animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute -top-5 right-1/4 w-3 h-3 bg-amber-400 rounded-full blur-sm"
            animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          />
        </motion.div>

        {/* Mystical Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mysticalItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onHoverStart={() => setHoveredElement(item.element)}
              onHoverEnd={() => setHoveredElement(null)}
            >
              {/* Mystical Card */}
              <div className="relative bg-gradient-to-br from-indigo-800/40 to-purple-900/60 backdrop-blur-xl rounded-3xl p-6 border border-purple-400/30 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105">
                
                {/* Rarity Glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${getRarityColor(item.rarity)} opacity-0 group-hover:opacity-20 rounded-3xl blur-xl transition-all duration-500`}></div>
                
                {/* Element Badge */}
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center border-2 border-purple-300/50">
                  {getElementIcon(item.element)}
                </div>

                {/* Mystical Center */}
                <div className="relative text-center mb-6">
                  <motion.div
                    className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-400/30 to-indigo-500/30 rounded-full flex items-center justify-center mb-4 relative"
                    animate={{ 
                      rotateZ: hoveredElement === item.element ? 360 : 0,
                      scale: hoveredElement === item.element ? 1.1 : 1
                    }}
                    transition={{ duration: 2 }}
                  >
                    <Gem className="w-10 h-10 text-purple-200" />
                    {hoveredElement === item.element && (
                      <motion.div
                        className="absolute inset-0 border-2 border-purple-300 rounded-full"
                        animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                  
                  <div className={`inline-block px-3 py-1 text-xs rounded-full bg-gradient-to-r ${getRarityColor(item.rarity)} text-white font-bold mb-2`}>
                    {t(`shop.rarity.${item.rarity}`).toUpperCase()}
                  </div>
                </div>

                {/* Item Details */}
                <h3 className="font-playfair font-bold text-lg text-purple-100 mb-2 text-center">
                  {item.name}
                </h3>
                
                <p className="text-purple-300/80 text-sm text-center mb-3 italic">
                  "{item.power}"
                </p>
                
                <p className="text-purple-200/60 text-xs text-center mb-4">
                  {item.description}
                </p>

                {/* Price & Action */}
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xl bg-gradient-to-r from-amber-300 to-rose-300 bg-clip-text text-transparent">
                    ${item.price} {t('currency.cad')}
                  </span>
                  <motion.button
                    disabled
                    className="px-4 py-2 bg-gradient-to-r from-purple-600/50 to-indigo-600/50 text-purple-200 rounded-xl font-medium cursor-not-allowed opacity-60 border border-purple-400/30"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {t('shop.comingSoon')}
                  </motion.button>
                </div>

                {/* Magical Sparkles */}
                {hoveredElement === item.element && (
                  <>
                    <motion.div
                      className="absolute top-4 left-4 w-2 h-2 bg-purple-300 rounded-full"
                      animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                    />
                    <motion.div
                      className="absolute bottom-4 right-4 w-1 h-1 bg-amber-300 rounded-full"
                      animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 1 }}
                    />
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mystical Portal Footer */}
        <motion.div
          className="mt-20 text-center relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <div className="relative inline-block">
            <motion.div
              className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-500/30 to-indigo-600/30 rounded-full flex items-center justify-center border-4 border-purple-400/40 relative"
              animate={{ rotateZ: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Eye className="w-12 h-12 text-purple-200" />
              <motion.div
                className="absolute inset-0 border-4 border-purple-300/60 rounded-full"
                animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            
            <motion.div
              className="absolute -inset-8 border border-purple-400/20 rounded-full"
              animate={{ rotateZ: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
          </div>
          
          <h2 className="font-playfair font-bold text-3xl text-purple-200 mt-8 mb-4">
            {t('shop.awakeningTitle')}
          </h2>
          <p className="text-purple-300/80 max-w-2xl mx-auto leading-relaxed">
            {t('shop.awakeningDesc')}
          </p>
        </motion.div>
      </div>
    </main>
  );
}; 