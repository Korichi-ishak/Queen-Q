import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
import { translations } from './translations';
import type { Translation } from './translations';

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: Translation;
};

const defaultLanguage = 'fr'; // Langue par défaut

const LanguageContext = createContext<LanguageContextType>({
  language: defaultLanguage,
  setLanguage: () => {},
  t: translations[defaultLanguage],
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Vérifier si une langue est déjà stockée dans localStorage
  const storedLanguage = typeof window !== 'undefined' 
    ? localStorage.getItem('language') || defaultLanguage 
    : defaultLanguage;
  
  const [language, setLanguageState] = useState<string>(storedLanguage);

  const setLanguage = (lang: string) => {
    if (translations[lang]) {
      setLanguageState(lang);
      localStorage.setItem('language', lang);
    }
  };

  const t = translations[language] || translations[defaultLanguage];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext); 