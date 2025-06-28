import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, Star, Heart, ShoppingBag, Sparkles, Moon, Sun, Gem, Compass, Flame, Scroll } from 'lucide-react';
import { useTranslation } from '../context/TranslationContext';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'cartes' | 'vetements' | 'accessoires';
  badge?: string;
  rating: number;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'shop.products.oracle.name',
    price: 67.99,
    image: '/assets/cards/placeholder.svg',
    category: 'cartes',
    badge: 'shop.badges.limitedEdition',
    rating: 4.9
  },
  {
    id: '2',
    name: 'shop.products.crystal.name',
    price: 89.99,
    image: '/assets/cards/placeholder.svg',
    category: 'accessoires',
    badge: 'shop.badges.handcrafted',
    rating: 4.8
  },
  {
    id: '3',
    name: 'shop.products.journal.name',
    price: 45.99,
    image: '/assets/cards/placeholder.svg',
    category: 'accessoires',
    badge: 'shop.badges.bestseller',
    rating: 4.7
  },
  {
    id: '4',
    name: 'shop.products.pendulum.name',
    price: 124.99,
    image: '/assets/cards/placeholder.svg',
    category: 'accessoires',
    badge: 'shop.badges.artisan',
    rating: 4.9
  }
];

export const Shop: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('tous');
  const [priceRange, setPriceRange] = useState<string>('tous');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const categories = [
    { value: 'tous', label: t('shop.categories.all') },
    { value: 'cartes', label: t('shop.categories.cards') },
    { value: 'accessoires', label: t('shop.categories.accessories') }
  ];

  const priceRanges = [
    { value: 'tous', label: t('shop.priceRanges.all') },
    { value: '0-50', label: t('shop.priceRanges.low') },
    { value: '50-100', label: t('shop.priceRanges.medium') },
    { value: '100+', label: t('shop.priceRanges.high') }
  ];

  const toggleFavorite = (productId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const getProductIcon = (productId: string) => {
    const iconProps = { className: "w-12 h-12", strokeWidth: 1.5 };
    
    switch (productId) {
      case '1': // Oracle
        return (
          <div className="relative">
            <Sparkles {...iconProps} className="w-12 h-12 text-imperial-gold" />
            <div className="absolute inset-0 bg-gradient-to-br from-imperial-gold/20 to-rose-champagne/20 rounded-full blur-md"></div>
          </div>
        );
      case '2': // Crystal Sphere
        return (
          <div className="relative">
            <Gem {...iconProps} className="w-12 h-12 text-purple-400" />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-md"></div>
          </div>
        );
      case '3': // Grimoire
        return (
          <div className="relative">
            <Scroll {...iconProps} className="w-12 h-12 text-amber-600" />
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-orange-400/20 rounded-full blur-md"></div>
          </div>
        );
      case '4': // Pendulum
        return (
          <div className="relative">
            <Compass {...iconProps} className="w-12 h-12 text-rose-gold" />
            <div className="absolute inset-0 bg-gradient-to-br from-rose-champagne/20 to-imperial-gold/20 rounded-full blur-md"></div>
          </div>
        );
      case '5': // Candles
        return (
          <div className="relative flex space-x-1">
            <Flame className="w-6 h-12 text-orange-400" strokeWidth={1.5} />
            <Flame className="w-6 h-12 text-yellow-400" strokeWidth={1.5} />
            <Flame className="w-6 h-12 text-orange-400" strokeWidth={1.5} />
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-yellow-400/20 rounded-full blur-md"></div>
          </div>
        );
      case '6': // Tarot Cloth
        return (
          <div className="relative">
            <div className="flex items-center space-x-1">
              <Moon className="w-6 h-8 text-blue-300" strokeWidth={1.5} />
              <Sun className="w-6 h-8 text-yellow-400" strokeWidth={1.5} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-300/20 to-yellow-400/20 rounded-full blur-md"></div>
          </div>
        );
      default:
        return <ShoppingBag className="w-12 h-12 text-royal-purple/60" />;
    }
  };

  const filteredProducts = mockProducts.filter(product => {
    if (selectedCategory !== 'tous' && product.category !== selectedCategory) {
      return false;
    }
    
          if (priceRange !== 'tous') {
        const price = product.price;
        switch (priceRange) {
          case '0-50':
            return price <= 50;
          case '50-100':
            return price > 50 && price <= 100;
          case '100+':
            return price > 100;
          default:
            return true;
        }
      }
    
    return true;
  });

  return (
    <main className="min-h-screen bg-royal-purple/5 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-playfair font-bold text-5xl text-royal-purple mb-4">
            {t('shop.title')}
          </h1>
          <p className="text-royal-purple/70 text-xl max-w-2xl mx-auto">
            {t('shop.subtitle')}
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-lg border border-rose-champagne/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-royal-purple/40" size={20} />
              <input
                type="text"
                placeholder={t('shop.search')}
                disabled
                className="w-full pl-10 pr-4 py-3 bg-white/80 border border-rose-champagne/30 rounded-xl text-royal-purple placeholder-royal-purple/50 cursor-not-allowed opacity-60"
                aria-label="Recherche de produits (indisponible)"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-royal-purple/40" size={18} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 bg-white/80 border border-rose-champagne/30 rounded-xl text-royal-purple appearance-none cursor-pointer min-w-48"
                aria-label="Filtrer par catégorie"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="relative">
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="pl-4 pr-8 py-3 bg-white/80 border border-rose-champagne/30 rounded-xl text-royal-purple appearance-none cursor-pointer min-w-40"
                aria-label="Filtrer par prix"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-rose-champagne/20 hover:shadow-xl hover:scale-105 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-gradient-to-br from-royal-purple/10 to-imperial-gold/10 flex items-center justify-center overflow-hidden">
                <div className="w-20 h-20 bg-royal-purple/20 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-10 h-10 text-royal-purple/60" />
                </div>
                
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-imperial-gold text-white px-2 py-1 rounded-full text-xs font-medium">
                    {t(product.badge as any)}
                  </div>
                )}
                
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-200"
                  aria-label={`${favorites.has(product.id) ? 'Retirer des' : 'Ajouter aux'} favoris`}
                >
                  <Heart 
                    className={`w-4 h-4 ${
                      favorites.has(product.id) 
                        ? 'text-red-500 fill-current' 
                        : 'text-royal-purple/60'
                    }`}
                  />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-playfair font-bold text-lg text-royal-purple mb-2 line-clamp-2 leading-tight">
                  {t(product.name as any)}
                </h3>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) 
                            ? 'text-imperial-gold fill-current' 
                            : 'text-royal-purple/20'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-royal-purple/70">
                    {product.rating}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-xl text-royal-purple">
                    ${product.price.toFixed(2)} CAD
                  </span>
                  <button
                    disabled
                    className="px-4 py-2 bg-imperial-gold/30 text-imperial-gold rounded-xl font-medium cursor-not-allowed opacity-40 hover:opacity-40 transition-opacity duration-200"
                    aria-label="Ajouter au panier (indisponible)"
                  >
                    {t('shop.addToCart')}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 bg-royal-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-royal-purple/40" />
            </div>
            <h3 className="font-playfair font-bold text-2xl text-royal-purple mb-2">
              {t('shop.noProducts')}
            </h3>
            <p className="text-royal-purple/70">
              {t('shop.noProductsDesc')}
            </p>
          </motion.div>
        )}

        {/* Coming Soon Banner */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-royal-purple to-imperial-gold/80 rounded-2xl p-8 text-center text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="font-playfair font-bold text-3xl mb-4">
            {t('shop.comingSoon')}
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            {t('shop.comingSoonDesc')}
          </p>
        </motion.div>
      </div>
    </main>
  );
}; 