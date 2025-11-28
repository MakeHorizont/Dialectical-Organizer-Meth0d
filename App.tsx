
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Dashboard from './screens/Dashboard';
import Archive from './screens/Archive';
import AnalysisWizard from './screens/AnalysisWizard';
import AnalysisView from './screens/AnalysisView';
import IntroTutorial from './screens/IntroTutorial';
import LanguageSelection from './screens/LanguageSelection';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';

const AppContent: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
      const tutorialSeen = localStorage.getItem('dialectical_tutorial_seen');
      const langSet = localStorage.getItem('dialectical_lang_set');

      if (!tutorialSeen) {
          // If language hasn't been explicitly chosen, go there first
          if (!langSet) {
              navigate('/language');
          } else {
              // If language is set but tutorial not seen, go to tutorial
              navigate('/tutorial');
          }
      }
      // If tutorial is seen, we stay on default route (Dashboard)
  }, [navigate]);

  return (
    <div className="min-h-[calc(var(--vh,1vh)*100)] bg-background flex flex-col font-sans text-text-main pb-20 transition-colors duration-300">
      <main className="flex-grow">
        <Routes>
          <Route path="/language" element={<LanguageSelection />} />
          <Route path="/tutorial" element={<IntroTutorial />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/new" element={<AnalysisWizard />} />
          <Route path="/analysis/:id" element={<AnalysisView />} />
          <Route path="/edit/:id" element={<AnalysisWizard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Navbar />
    </div>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    setVH();
    window.addEventListener('resize', setVH);
    return () => window.removeEventListener('resize', setVH);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
           <AppContent />
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
