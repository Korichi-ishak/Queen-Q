import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setLanguage('fr')}
        className={`px-2 py-1 rounded-md text-sm font-medium transition-colors ${
          language === 'fr'
            ? 'bg-imperial-gold/20 text-imperial-gold'
            : 'text-rose-champagne hover:text-imperial-gold'
        }`}
        aria-label="Changer la langue en français"
      >
        FR
      </button>
      <span className="text-rose-champagne/50">|</span>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 rounded-md text-sm font-medium transition-colors ${
          language === 'en'
            ? 'bg-imperial-gold/20 text-imperial-gold'
            : 'text-rose-champagne hover:text-imperial-gold'
        }`}
        aria-label="Change language to English"
      >
        EN
      </button>
    </div>
  );
}; 