
import React, { createContext, useContext, useState, useEffect } from 'react';
import { TranslationData, LanguageCode } from '../types';
import { languages } from '../language';
import { useTheme } from './ThemeContext';

interface LanguageContextType {
  currentLanguage: LanguageCode;
  t: TranslationData;
  setLanguage: (lang: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Deep merge utility
function deepMerge(target: any, source: any): any {
    if (typeof source !== 'object' || source === null) return source;
    const output = { ...target };
    Object.keys(source).forEach(key => {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            if (!(key in target)) Object.assign(output, { [key]: source[key] });
            else output[key] = deepMerge(target[key], source[key]);
        } else {
            Object.assign(output, { [key]: source[key] });
        }
    });
    return output;
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('ru');
  const { currentTheme } = useTheme();

  useEffect(() => {
    const saved = localStorage.getItem('dialectical_lang') as LanguageCode;
    if (saved && languages[saved]) {
      setCurrentLanguage(saved);
    } else {
      const browserLang = navigator.language.slice(0, 2);
      if (['ru', 'en', 'es', 'zh', 'hi'].includes(browserLang)) {
        setCurrentLanguage(browserLang as LanguageCode);
      } else {
        setCurrentLanguage('en');
      }
    }
  }, []);

  const handleSetLanguage = (lang: LanguageCode) => {
    setCurrentLanguage(lang);
    localStorage.setItem('dialectical_lang', lang);
  };

  // Calculate the actual text object by merging base language + theme overrides FOR THAT LANGUAGE
  const t = React.useMemo(() => {
    const base = languages[currentLanguage];
    // Get overrides specifically for the current language. 
    // If the theme doesn't support this language, it falls back to undefined.
    const themeOverrides = currentTheme.textOverrides[currentLanguage];
    
    if (themeOverrides) {
        return deepMerge(base, themeOverrides) as TranslationData;
    }
    
    // If no override exists for this language in this theme, return the base (standard) translation
    // rather than an English override.
    return base;
  }, [currentLanguage, currentTheme]);

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      t, 
      setLanguage: handleSetLanguage 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
