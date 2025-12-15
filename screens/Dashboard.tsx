
import React, { useEffect, useState, useMemo } from 'react';
import { getAnalyses, togglePinAnalysis } from '../services/storage';
import { Analysis, AnalysisStage, Quote } from '../types';
import { Card } from '../components/Card';
import { TopBar } from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { Edit3, Eye, Search, Filter, Pin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Dashboard: React.FC = () => {
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const { t } = useLanguage();
  const [quote, setQuote] = useState<Quote>({ text: "", author: "" });
  const navigate = useNavigate();

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'DONE'>('ACTIVE');

  const loadData = () => {
    const all = getAnalyses();
    // Sort logic: Pinned first, then by updatedAt
    const sorted = all.filter(a => !a.isArchived).sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return b.updatedAt - a.updatedAt;
    });
    setAnalyses(sorted);
  };

  useEffect(() => {
    loadData();
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

  const filteredAnalyses = useMemo(() => {
      return analyses.filter(analysis => {
          // Search Logic (Case insensitive)
          const matchesSearch = 
             (analysis.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
             (analysis.thesis || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
             (analysis.tags && analysis.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));

          // Status Logic
          let matchesStatus = true;
          if (statusFilter === 'ACTIVE') {
              matchesStatus = analysis.stage !== AnalysisStage.COMPLETED;
          } else if (statusFilter === 'DONE') {
              matchesStatus = analysis.stage === AnalysisStage.COMPLETED;
          }

          return matchesSearch && matchesStatus;
      });
  }, [analyses, searchQuery, statusFilter]);

  const handleTogglePin = (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      togglePinAnalysis(id);
      loadData();
  };

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
      <div className="p-4 max-w-2xl mx-auto space-y-6 animate-fade-in pb-24">
        
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

        {/* Controls: Tabs & Search */}
        <div className="space-y-4">
             {/* Search Bar */}
             <div className="relative">
                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted opacity-50" size={18} />
                 <input 
                    type="text" 
                    placeholder={t.dashboard.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-surface border border-surface-highlight rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm"
                 />
             </div>

             {/* Status Tabs */}
             <div className="flex bg-surface rounded-xl p-1 border border-surface-highlight">
                 {(['ALL', 'ACTIVE', 'DONE'] as const).map((filter) => (
                     <button
                        key={filter}
                        onClick={() => setStatusFilter(filter)}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                            statusFilter === filter 
                            ? 'bg-primary text-text-inverted shadow-md' 
                            : 'text-text-muted hover:bg-surface-highlight'
                        }`}
                     >
                         {filter === 'ALL' && t.dashboard.filterAll}
                         {filter === 'ACTIVE' && t.dashboard.filterActive}
                         {filter === 'DONE' && t.dashboard.filterDone}
                     </button>
                 ))}
             </div>
        </div>

        <h2 className="text-xl font-bold text-text-main flex items-center mt-6">
          <span className="bg-primary w-2 h-6 mr-2 rounded-sm"></span>
          {/* Dynamic title based on filter */}
          {statusFilter === 'ALL' && t.dashboard.filterAll}
          {statusFilter === 'ACTIVE' && t.dashboard.filterActive}
          {statusFilter === 'DONE' && t.dashboard.filterDone}
          <span className="ml-2 text-sm text-text-muted font-normal">({filteredAnalyses.length})</span>
        </h2>

        {filteredAnalyses.length === 0 ? (
          <div className="text-center py-12 bg-surface rounded-xl border-2 border-dashed border-primary/20">
            <p className="text-lg text-text-muted mb-2">{t.dashboard.emptyTitle}</p>
            <p className="text-sm text-text-muted/70">{t.dashboard.emptyDesc}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAnalyses.map(analysis => (
              <Card key={analysis.id} className="relative group active:scale-[0.98] transition-transform" onClick={() => {
                  if (analysis.stage === AnalysisStage.COMPLETED) {
                      navigate(`/analysis/${analysis.id}`);
                  } else {
                      navigate(`/edit/${analysis.id}`);
                  }
              }}>
                <div className="flex justify-between items-start">
                  <div className="pr-8">
                    <h3 className="font-bold text-lg text-text-main mb-1 flex items-center">
                        {analysis.isPinned && <Pin size={14} className="text-primary mr-1 fill-current" />}
                        {analysis.title || t.dashboard.untitled}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-xs font-bold px-2 py-1 rounded ${
                            analysis.stage === AnalysisStage.COMPLETED 
                            ? 'bg-success/10 text-success' 
                            : 'bg-warning/10 text-warning'
                        }`}>
                        {getStageLabel(analysis.stage)}
                        </span>
                        
                        {/* Tags Display */}
                        {analysis.tags && analysis.tags.map(tag => (
                            <span key={tag} className="text-[10px] bg-surface-highlight px-2 py-1 rounded text-text-muted border border-surface-highlight">
                                {tag}
                            </span>
                        ))}
                    </div>
                  </div>
                  <div className="text-primary opacity-50 group-hover:opacity-100 transition-opacity flex flex-col items-center gap-2">
                    <button 
                        onClick={(e) => handleTogglePin(e, analysis.id)}
                        className={`p-1 rounded-full hover:bg-primary/10 ${analysis.isPinned ? 'text-primary' : 'text-text-muted'}`}
                    >
                        <Pin size={18} className={analysis.isPinned ? "fill-current" : ""} />
                    </button>
                    {analysis.stage === AnalysisStage.COMPLETED ? <Eye size={20} /> : <Edit3 size={20} />}
                  </div>
                </div>
                {analysis.thesis && (
                    <p className="mt-3 text-sm text-text-muted line-clamp-2 border-l-2 border-surface-highlight pl-2">
                        {analysis.thesis}
                    </p>
                )}
                
                <div className="mt-2 flex justify-end">
                    <span className="text-[10px] text-text-muted">
                        {new Date(analysis.updatedAt).toLocaleDateString()}
                    </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;