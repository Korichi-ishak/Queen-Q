import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import type { Language } from '../hooks/useTranslation';

export const LanguageSwitcher: React.FC = () => {
  const { language, changeLanguage } = useTranslation();

  return (
    <div className="flex bg-royal-purple/40 backdrop-blur-md rounded-full border border-imperial-gold/40 overflow-hidden shadow-lg">
      <button
        onClick={() => changeLanguage('fr')}
        className={`px-3 py-1.5 text-sm font-bold font-playfair transition-all duration-500 ${
          language === 'fr'
            ? 'bg-imperial-gold text-royal-purple shadow-md transform scale-105'
            : 'text-imperial-gold hover:bg-imperial-gold/20 hover:scale-105'
        }`}
      >
        FR
      </button>
      <div className="w-px bg-imperial-gold/30"></div>
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1.5 text-sm font-bold font-playfair transition-all duration-500 ${
          language === 'en'
            ? 'bg-imperial-gold text-royal-purple shadow-md transform scale-105'
            : 'text-imperial-gold hover:bg-imperial-gold/20 hover:scale-105'
        }`}
      >
        EN
      </button>
    </div>
  );
}; 