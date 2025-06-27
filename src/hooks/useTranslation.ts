import { useState, useEffect } from 'react';

export type Language = 'fr' | 'en';

interface Translation {
  [key: string]: any;
}

export const useTranslation = () => {
  const [language, setLanguage] = useState<Language>('fr');
  const [translations, setTranslations] = useState<Translation>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTranslations(language);
  }, [language]);

  const loadTranslations = async (lang: Language) => {
    try {
      setLoading(true);
      const response = await fetch(`/locales/${lang}.json`);
      const data = await response.json();
      setTranslations(data);
    } catch (error) {
      console.error('Error loading translations:', error);
      // Fallback to French if error
      if (lang !== 'fr') {
        const fallbackResponse = await fetch('/locales/fr.json');
        const fallbackData = await fallbackResponse.json();
        setTranslations(fallbackData);
      }
    } finally {
      setLoading(false);
    }
  };

  const t = (key: string): any => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) break;
    }
    
    return value || key;
  };

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return {
    t,
    language,
    changeLanguage,
    loading
  };
}; 