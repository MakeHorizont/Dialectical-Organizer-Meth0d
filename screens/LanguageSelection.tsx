
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { languageNames } from '../language';
import { LanguageCode } from '../types';
import { Globe, ArrowRight } from 'lucide-react';

const LanguageSelection: React.FC = () => {
  const { setLanguage, currentLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleSelect = (code: string) => {
    const langCode = code as LanguageCode;
    setLanguage(langCode);
    // Mark language as explicitly set so we don't return here
    localStorage.setItem('dialectical_lang_set', 'true');
    navigate('/tutorial');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="max-w-sm w-full space-y-8">
        
        <div className="text-center space-y-4">
          <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
            <Globe size={40} className="text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-text-main">
            Select Language
          </h1>
          <p className="text-text-muted text-sm">
            Выберите язык / Choose your language
          </p>
        </div>

        <div className="space-y-3">
          {(Object.entries(languageNames) as [LanguageCode, string][]).map(([code, name]) => (
            <button
              key={code}
              onClick={() => handleSelect(code)}
              className={`w-full p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group ${
                currentLanguage === code 
                  ? 'bg-primary text-text-inverted border-primary shadow-lg shadow-primary/30' 
                  : 'bg-surface text-text-main border-surface-highlight hover:border-primary/50'
              }`}
            >
              <span className="font-medium text-lg">{name}</span>
              {currentLanguage === code && (
                <ArrowRight size={20} className="animate-slide-up" />
              )}
              <span className={`text-xs uppercase font-bold tracking-widest opacity-50 group-hover:opacity-100 ${
                 currentLanguage === code ? 'text-text-inverted' : 'text-primary' 
              }`}>
                {code}
              </span>
            </button>
          ))}
        </div>

        <div className="text-center text-xs text-text-muted opacity-60 mt-8">
            Dialectical Organizer v2.0
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;
