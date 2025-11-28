import React, { useEffect, useState } from 'react';
import { getAnalyses } from '../services/storage';
import { Analysis, AnalysisStage, Quote } from '../types';
import { Card } from '../components/Card';
import { TopBar } from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { Edit3, Eye } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Dashboard: React.FC = () => {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const { t } = useLanguage();
  const [quote, setQuote] = useState<Quote>({ text: "", author: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const all = getAnalyses();
    setAnalyses(all.filter(a => !a.isArchived).sort((a, b) => b.updatedAt - a.updatedAt));
  }, []);

  // Update quote when language changes or on mount
  useEffect(() => {
    // Fallback if quotes array is empty in translation
    const availableQuotes = t.quotes && t.quotes.length > 0 
        ? t.quotes 
        : [{ text: "Dialectics is the art of thinking.", author: "System" }];
        
    const randomQuote = availableQuotes[Math.floor(Math.random() * availableQuotes.length)];
    setQuote(randomQuote);
  }, [t]);

  const getStageLabel = (stage: AnalysisStage) => {
    switch (stage) {
      case AnalysisStage.INIT: return t.stages.init;
      case AnalysisStage.MODULES: return t.stages.modules;
      case AnalysisStage.SYNTHESIS: return t.stages.synthesis;
      case AnalysisStage.STRATEGY: return t.stages.strategy;
      case AnalysisStage.RISKS: return t.stages.risks;
      case AnalysisStage.COMPLETED: return t.stages.completed;
      default: return t.stages.init;
    }
  };

  return (
    <>
      <TopBar title={t.dashboard.title} showSettings />
      <div className="p-4 max-w-2xl mx-auto space-y-6 animate-fade-in">
        
        {/* Slogan Header */}
        <div className="text-center opacity-60">
            <h3 className="text-xs font-serif italic tracking-wide text-text-muted">
                {t.slogan}
            </h3>
        </div>

        {/* Daily Quote */}
        <div className="bg-secondary rounded-lg p-4 text-text-inverted shadow-lg transform -rotate-1 transition-all hover:rotate-0">
          <p className="text-sm italic opacity-90 mb-2">"{quote.text}"</p>
          <p className="text-xs font-bold text-right">— {quote.author}</p>
        </div>

        <h2 className="text-xl font-bold text-text-main flex items-center">
          <span className="bg-primary w-2 h-6 mr-2 rounded-sm"></span>
          {t.dashboard.activeTasks}
        </h2>

        {analyses.length === 0 ? (
          <div className="text-center py-12 bg-surface rounded-xl border-2 border-dashed border-primary/20">
            <p className="text-lg text-text-muted mb-2">{t.dashboard.emptyTitle}</p>
            <p className="text-sm text-text-muted/70">{t.dashboard.emptyDesc}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {analyses.map(analysis => (
              <Card key={analysis.id} className="relative group active:scale-[0.98] transition-transform" onClick={() => {
                  if (analysis.stage === AnalysisStage.COMPLETED) {
                      navigate(`/analysis/${analysis.id}`);
                  } else {
                      navigate(`/edit/${analysis.id}`);
                  }
              }}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-text-main mb-1">{analysis.title || t.dashboard.untitled}</h3>
                    <div className="flex items-center space-x-2">
                        <span className={`text-xs font-bold px-2 py-1 rounded ${
                            analysis.stage === AnalysisStage.COMPLETED 
                            ? 'bg-success/10 text-success' 
                            : 'bg-warning/10 text-warning'
                        }`}>
                        {getStageLabel(analysis.stage)}
                        </span>
                        <span className="text-xs text-text-muted">
                            {new Date(analysis.updatedAt).toLocaleDateString()}
                        </span>
                    </div>
                  </div>
                  <div className="text-primary opacity-50 group-hover:opacity-100 transition-opacity">
                    {analysis.stage === AnalysisStage.COMPLETED ? <Eye size={20} /> : <Edit3 size={20} />}
                  </div>
                </div>
                {analysis.thesis && (
                    <p className="mt-3 text-sm text-text-muted line-clamp-2 border-l-2 border-surface-highlight pl-2">
                        {analysis.thesis}
                    </p>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;