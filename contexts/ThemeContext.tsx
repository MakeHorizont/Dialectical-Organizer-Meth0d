
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme, ThemeId } from '../types';
import { themes } from '../themes';

interface ThemeContextType {
  currentTheme: Theme;
  setThemeId: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeId, setThemeId] = useState<ThemeId>('neutral');

  useEffect(() => {
    const saved = localStorage.getItem('dialectical_theme') as ThemeId;
    if (saved && themes[saved]) {
      setThemeId(saved);
    }
  }, []);

  const handleSetTheme = (id: ThemeId) => {
    setThemeId(id);
    localStorage.setItem('dialectical_theme', id);
  };

  // Inject CSS variables
  useEffect(() => {
    const theme = themes[themeId];
    const root = document.documentElement;
    
    Object.entries(theme.colors).forEach(([key, value]) => {
      // Convert camelCase (textMain) to kebab-case (text-main) for CSS var
      const cssVarName = `--color-${key.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`;
      root.style.setProperty(cssVarName, value as string);
    });
    
    // Set meta theme color for browser chrome
    const metaThemeColor = document.querySelector("meta[name=theme-color]");
    if (metaThemeColor) {
        // We need to reconstruct hex or rgb() string for meta tag, 
        // but our theme stores "255 255 255".
        // Simplification: use primary color
        metaThemeColor.setAttribute("content", `rgb(${theme.colors.primary})`);
    }

  }, [themeId]);

  return (
    <ThemeContext.Provider value={{ 
      currentTheme: themes[themeId], 
      setThemeId: handleSetTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};