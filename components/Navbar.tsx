
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Archive, Book, Plus, Globe, ChevronLeft, Palette } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { languageNames } from '../language';
import { themes } from '../themes';
import { LanguageCode, ThemeId } from '../types';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  const navItemClass = (path: string) => 
    `flex flex-col items-center justify-center p-2 text-xs font-medium transition-colors ${
      isActive(path) ? 'text-primary' : 'text-text-muted hover:text-primary/70'
    }`;

  // Don't show bottom nav on tutorial, language selection, or WIZARD screens (New/Edit)
  // This prevents double bottom bars and distraction during analysis
  // Logic updated to ensure it catches all edit sub-routes strictly
  if (
    location.pathname === '/tutorial' || 
    location.pathname === '/language' || 
    location.pathname === '/new' || 
    location.pathname.startsWith('/edit')
  ) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-surface-highlight pb-safe pt-1 px-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-50">
      <div className="flex justify-around items-center max-w-md mx-auto h-16">
        <Link to="/" className={navItemClass('/')}>
          <Book size={24} className="mb-1" />
          <span>{t.nav.current}</span>
        </Link>
        
        <Link to="/new" className="flex flex-col items-center -mt-8">
          <div className="bg-primary text-text-inverted p-4 rounded-full shadow-lg shadow-primary/40 transition-transform active:scale-90">
            <Plus size={28} />
          </div>
          <span className="text-xs font-bold text-primary mt-1">{t.nav.analysis}</span>
        </Link>

        <Link to="/archive" className={navItemClass('/archive')}>
          <Archive size={24} className="mb-1" />
          <span>{t.nav.archive}</span>
        </Link>
      </div>
    </nav>
  );
};

interface TopBarProps {
  title: string;
  showBack?: boolean;
  showSettings?: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({ title, showBack, showSettings }) => {
    const { currentLanguage, setLanguage, t } = useLanguage();
    const { currentTheme, setThemeId } = useTheme();
    
    const [isLangMenuOpen, setLangMenuOpen] = useState(false);
    const [isThemeMenuOpen, setThemeMenuOpen] = useState(false);

    // Refs to handle click outside
    const langMenuRef = useRef<HTMLDivElement>(null);
    const themeMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
                setLangMenuOpen(false);
            }
            if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
                setThemeMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 bg-surface/90 backdrop-blur-md z-40 border-b border-primary/10 px-4 py-3 no-print">
            <div className="max-w-2xl mx-auto flex items-center justify-between">
               <div className="flex items-center w-1/5">
                  {showBack && (
                      <Link to="/" className="text-text-muted hover:text-primary">
                          <ChevronLeft size={24} />
                      </Link>
                  )}
               </div>

               <h1 className="text-xl font-bold text-text-main text-center truncate tracking-tight flex-grow">
                 {title}
               </h1>

               <div className="w-1/5 flex justify-end relative gap-2">
                   {/* Theme Switcher */}
                   <div ref={themeMenuRef} className="relative">
                        <button 
                            onClick={() => { setThemeMenuOpen(!isThemeMenuOpen); setLangMenuOpen(false); }}
                            className="text-text-muted hover:text-primary p-1 rounded"
                        >
                            <Palette size={20} />
                        </button>
                        {isThemeMenuOpen && (
                             <div className="absolute top-10 right-0 bg-surface rounded-xl shadow-xl border border-surface-highlight w-48 overflow-hidden z-50 animate-fade-in">
                                {Object.values(themes).map(theme => (
                                    <button
                                        key={theme.id}
                                        onClick={() => { setThemeId(theme.id); setThemeMenuOpen(false); }}
                                        className={`w-full text-left px-4 py-3 text-sm flex items-center gap-2 hover:bg-surface-highlight ${
                                            currentTheme.id === theme.id ? 'font-bold text-primary bg-surface-highlight' : 'text-text-main'
                                        }`}
                                    >
                                        <div 
                                            className="w-4 h-4 rounded-full border border-gray-200" 
                                            style={{ backgroundColor: `rgb(${theme.colors.primary})` }} 
                                        />
                                        {t.themeNames[theme.id] || theme.id}
                                    </button>
                                ))}
                             </div>
                        )}
                   </div>

                   {/* Language Switcher */}
                   <div ref={langMenuRef} className="relative">
                        <button 
                            onClick={() => { setLangMenuOpen(!isLangMenuOpen); setThemeMenuOpen(false); }}
                            className="text-text-muted hover:text-primary p-1 rounded"
                        >
                            <Globe size={20} />
                            <span className="absolute -top-1 -right-1 text-[9px] font-bold bg-primary text-text-inverted px-1 rounded-full uppercase">
                                {currentLanguage}
                            </span>
                        </button>
                        {isLangMenuOpen && (
                            <div className="absolute top-10 right-0 bg-surface rounded-xl shadow-xl border border-surface-highlight w-40 overflow-hidden z-50 animate-fade-in">
                                {(Object.keys(languageNames) as LanguageCode[]).map(code => (
                                    <button
                                        key={code}
                                        onClick={() => { setLanguage(code); setLangMenuOpen(false); }}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-surface-highlight ${
                                            currentLanguage === code ? 'font-bold text-primary bg-surface-highlight' : 'text-text-main'
                                        }`}
                                    >
                                        {languageNames[code]}
                                    </button>
                                ))}
                            </div>
                        )}
                   </div>
               </div>
            </div>
        </header>
    )
}
