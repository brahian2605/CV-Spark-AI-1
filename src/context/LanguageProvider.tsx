'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import en from '@/locales/en.json';
import es from '@/locales/es.json';

const translations = { en, es };

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'es') {
      setLanguage('es');
    }
  }, []);

  const t = (key: string) => {
    const keys = key.split('.');
    let result: any = translations[language];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        let fallbackResult: any = translations['en'];
        for (const fk of keys) {
            fallbackResult = fallbackResult?.[fk];
             if (fallbackResult === undefined) {
                return key;
             }
        }
        return fallbackResult;
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: (lang) => setLanguage(lang), t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
