
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Analysis, AnalysisStage, CategoryType } from '../types';
import { getAnalysisById, createEmptyAnalysis, saveAnalysis } from '../services/storage';
import { QUESTION_STRUCTURE } from '../constants';
import { TopBar } from '../components/Navbar';
import { Button } from '../components/Button';
import { HelpCircle, ArrowRight, Check, Target, ShieldAlert, ChevronDown, ChevronUp, ChevronLeft, Save } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const AnalysisWizard: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [currentInput, setCurrentInput] = useState('');
  
  // Extra inputs for multi-field steps
  const [secondaryInput, setSecondaryInput] = useState('');

  const [showHint, setShowHint] = useState(false);
  const [showContext, setShowContext] = useState(false);
  
  // State for stable feedback text
  const [feedbackText, setFeedbackText] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initialize or Load
  useEffect(() => {
    if (id) {
      const existing = getAnalysisById(id);
      if (existing) {
        setAnalysis(existing);
        loadStageInput(existing);
      } else {
        navigate('/');
      }
    } else {
      const newItem = createEmptyAnalysis();
      setAnalysis(newItem);
    }
  }, [id, navigate]);

  const loadStageInput = (existing: Analysis) => {
      if (existing.stage === AnalysisStage.INIT) setCurrentInput(existing.thesis || existing.title || '');
      if (existing.stage === AnalysisStage.SYNTHESIS) setCurrentInput(existing.synthesis);
      if (existing.stage === AnalysisStage.STRATEGY) {
          setCurrentInput(existing.vulnerabilities || '');
          setSecondaryInput(existing.opportunities || '');
      }
      if (existing.stage === AnalysisStage.RISKS) setCurrentInput(existing.risks || '');
      if (existing.stage === AnalysisStage.MODULES) setCurrentInput('');
  };

  useEffect(() => {
      if (textareaRef.current) textareaRef.current.focus();
  }, [analysis?.stage]);

  const getCurrentQuestion = () => {
    if (!analysis) return null;
    if (analysis.stage === AnalysisStage.MODULES) {
      // Find first unanswered question in structure order
      const nextQ = QUESTION_STRUCTURE.find(q => !analysis.answers.some(a => a.questionId === q.id));
      return nextQ;
    }
    return null;
  };

  // Update feedback text only when the question changes
  const currentQuestion = getCurrentQuestion();
  useEffect(() => {
      if (analysis?.stage === AnalysisStage.MODULES && currentQuestion) {
          const randomFeedback = t.feedback[Math.floor(Math.random() * t.feedback.length)];
          setFeedbackText(randomFeedback);
      }
  }, [currentQuestion?.id, analysis?.stage, t.feedback]);

  if (!analysis) return <div className="p-10 text-center text-text-muted">{t.wizard.loading}</div>;

  const handleSaveAndExit = () => {
     if (analysis) {
         // Save current progress locally before exiting
         const updated = { ...analysis, updatedAt: Date.now() };
         saveAnalysis(updated);
         navigate('/');
     }
  };

  const handleBack = () => {
      if (!analysis) return;
      
      // Simple state machine reversal
      const updated = { ...analysis };
      
      switch (analysis.stage) {
          case AnalysisStage.MODULES:
              // If we are at the start of modules, go back to INIT
              if (analysis.answers.length === 0) {
                  updated.stage = AnalysisStage.INIT;
                  setCurrentInput(updated.thesis);
              } else {
                  // Remove last answer
                  const lastAns = analysis.answers[analysis.answers.length - 1];
                  updated.answers = analysis.answers.slice(0, -1);
                  // Load the previous answer so user can edit it
                  setCurrentInput(lastAns.text);
              }
              break;
          case AnalysisStage.SYNTHESIS:
              updated.stage = AnalysisStage.MODULES;
              // We need to go to the state where we are answering the LAST question
              // Remove the last answer from the list so it pops up as current question
              if (updated.answers.length > 0) {
                 const last = updated.answers.pop();
                 if (last) setCurrentInput(last.text);
              }
              break;
          case AnalysisStage.STRATEGY:
              updated.stage = AnalysisStage.SYNTHESIS;
              setCurrentInput(updated.synthesis);
              break;
          case AnalysisStage.RISKS:
              updated.stage = AnalysisStage.STRATEGY;
              setCurrentInput(updated.vulnerabilities || '');
              setSecondaryInput(updated.opportunities || '');
              break;
      }
      
      setAnalysis(updated);
      saveAnalysis(updated);
  };

  const handleNext = () => {
    if (!analysis) return;
    const updatedAnalysis = { ...analysis, updatedAt: Date.now() };

    switch (analysis.stage) {
        case AnalysisStage.INIT:
            if (!analysis.title) {
                if (!currentInput.trim()) return;
                updatedAnalysis.title = currentInput;
                setCurrentInput(analysis.thesis || '');
            } else {
                if (!currentInput.trim()) return;
                updatedAnalysis.thesis = currentInput;
                updatedAnalysis.stage = AnalysisStage.MODULES;
                setCurrentInput('');
            }
            break;

        case AnalysisStage.MODULES:
            const question = getCurrentQuestion();
            if (question) {
                if (!currentInput.trim()) return;
                updatedAnalysis.answers = [
                    ...updatedAnalysis.answers.filter(a => a.questionId !== question.id),
                    { questionId: question.id, text: currentInput, timestamp: Date.now() }
                ];
                setCurrentInput('');
                
                // Check if all questions answered
                const remaining = QUESTION_STRUCTURE.filter(q => !updatedAnalysis.answers.some(a => a.questionId === q.id));
                if (remaining.length === 0) {
                    updatedAnalysis.stage = AnalysisStage.SYNTHESIS;
                    setCurrentInput(updatedAnalysis.synthesis || '');
                }
            }
            break;

        case AnalysisStage.SYNTHESIS:
            if (!currentInput.trim()) return;
            updatedAnalysis.synthesis = currentInput;
            updatedAnalysis.stage = AnalysisStage.STRATEGY;
            setCurrentInput(updatedAnalysis.vulnerabilities || '');
            setSecondaryInput(updatedAnalysis.opportunities || '');
            break;

        case AnalysisStage.STRATEGY:
            if (!currentInput.trim() || !secondaryInput.trim()) return;
            updatedAnalysis.vulnerabilities = currentInput;
            updatedAnalysis.opportunities = secondaryInput;
            updatedAnalysis.stage = AnalysisStage.RISKS;
            setCurrentInput(updatedAnalysis.risks || '');
            setSecondaryInput(''); // Reset for next use if needed
            break;
            
        case AnalysisStage.RISKS:
            if (!currentInput.trim()) return;
            updatedAnalysis.risks = currentInput;
            updatedAnalysis.stage = AnalysisStage.COMPLETED;
            break;
    }

    setAnalysis(updatedAnalysis);
    saveAnalysis(updatedAnalysis);

    if (updatedAnalysis.stage === AnalysisStage.COMPLETED) {
        navigate(`/analysis/${updatedAnalysis.id}`);
    }
  };

  // COMPONENTS
  
  const ContextPanel = () => {
      if (analysis.stage === AnalysisStage.INIT && !analysis.title) return null;
      
      return (
          <div className="mb-6 border rounded-lg border-surface-highlight bg-surface overflow-hidden transition-all">
              <button 
                onClick={() => setShowContext(!showContext)}
                className="w-full flex justify-between items-center p-3 bg-surface-highlight/50 hover:bg-surface-highlight text-xs font-bold text-text-muted uppercase"
              >
                  <span>{t.wizard.contextLabel}</span>
                  {showContext ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
              </button>
              
              {showContext && (
                  <div className="p-4 space-y-4 max-h-60 overflow-y-auto bg-surface">
                      <div>
                          <div className="text-[10px] text-primary font-bold">{t.view.objectLabel}</div>
                          <div className="text-sm text-text-main">{analysis.title}</div>
                          <div className="text-xs text-text-muted italic">{analysis.thesis}</div>
                      </div>
                      
                      {analysis.answers.map((a, i) => (
                          <div key={i} className="border-t border-surface-highlight pt-2">
                               <div className="text-[10px] text-primary font-bold">{t.questions[a.questionId]?.categoryLabel}</div>
                               <div className="text-sm text-text-main">{a.text}</div>
                          </div>
                      ))}
                      
                      {analysis.synthesis && (
                          <div className="border-t border-surface-highlight pt-2">
                               <div className="text-[10px] text-primary font-bold">{t.view.contradictionLabel}</div>
                               <div className="text-sm text-text-main font-medium">{analysis.synthesis}</div>
                          </div>
                      )}
                  </div>
              )}
          </div>
      )
  };

  // RENDERERS

  const renderInit = () => (
    <div className="animate-slide-up space-y-6">
       <h2 className="text-2xl font-bold text-text-main">
           {!analysis.title ? t.wizard.titleNew : t.wizard.titleObject}
       </h2>
       <p className="text-text-muted">
           {!analysis.title ? t.wizard.descName : t.wizard.descObject}
       </p>
       <textarea
         ref={textareaRef}
         className="w-full p-4 rounded-xl border-2 border-primary/20 focus:border-primary focus:ring-0 bg-surface text-text-main h-40 text-lg resize-none"
         placeholder={!analysis.title ? t.wizard.placeholderName : t.wizard.placeholderObject}
         value={currentInput}
         onChange={(e) => setCurrentInput(e.target.value)}
       />
    </div>
  );

  const renderModules = () => {
      const questionStruct = getCurrentQuestion();
      if (!questionStruct) return <div>{t.wizard.loading}</div>;
      
      const qData = t.questions[questionStruct.id];
      const qIndex = QUESTION_STRUCTURE.findIndex(q => q.id === questionStruct.id) + 1;

      return (
        <div className="animate-slide-up space-y-4">
            {/* Progress */}
            <div className="flex items-center justify-between text-xs font-bold text-primary uppercase tracking-widest mb-2">
                <span>{t.stages.modules}</span>
                <span>{qIndex} / {QUESTION_STRUCTURE.length}</span>
            </div>

            <div className="bg-primary/5 border-l-4 border-primary p-3 mb-2">
                <span className="text-xs font-bold text-primary uppercase">{qData.categoryLabel}</span>
            </div>

            <h2 className="text-xl font-bold text-text-main leading-relaxed">
                {qData.text}
            </h2>
            
            <div className="relative">
                <button 
                  onClick={() => setShowHint(!showHint)}
                  className="absolute right-2 top-2 text-primary/50 hover:text-primary transition-colors"
                >
                    <HelpCircle size={24} />
                </button>
                <textarea
                    ref={textareaRef}
                    className="w-full p-4 rounded-xl border border-surface-highlight focus:border-primary focus:ring-1 focus:ring-primary bg-surface text-text-main h-48 text-base resize-none shadow-inner"
                    placeholder={qData.placeholder}
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                />
            </div>

            {showHint && (
                <div className="bg-secondary/10 p-4 rounded-lg border border-secondary/20 text-text-main text-sm animate-fade-in">
                    <strong className="text-secondary">{t.wizard.hintLabel}</strong> {qData.hint}
                </div>
            )}

            {analysis.answers.length > 0 && (
                <div className="text-xs text-text-muted mt-4 text-center italic transition-opacity duration-300">
                    "{feedbackText}"
                </div>
            )}
        </div>
      );
  };

  const renderSynthesis = () => (
    <div className="animate-slide-up space-y-6">
        <div className="bg-surface-highlight p-4 rounded-lg text-xs text-text-muted mb-4">
            {t.stages.synthesis}
        </div>
        <h2 className="text-xl font-bold text-text-main">{t.wizard.synthesisTitle}</h2>
        <p className="text-sm text-text-muted">{t.wizard.synthesisDesc}</p>
        <textarea
            ref={textareaRef}
            className="w-full p-4 rounded-xl border-2 border-primary/30 focus:border-primary focus:ring-0 bg-surface text-text-main h-40 text-base resize-none"
            placeholder={t.wizard.synthesisPlaceholder}
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
        />
    </div>
  );

  const renderStrategy = () => (
    <div className="animate-slide-up space-y-6">
        <div className="bg-surface-highlight p-4 rounded-lg text-xs text-text-muted mb-4 flex items-center">
            <Target className="mr-2 w-4 h-4"/> {t.stages.strategy}
        </div>
        
        <h2 className="text-xl font-bold text-text-main">{t.wizard.strategyTitle}</h2>
        <p className="text-sm text-text-muted">{t.wizard.strategyDesc}</p>

        <div className="space-y-4">
            <div>
                <label className="block text-xs font-bold text-danger uppercase mb-1">{t.wizard.vulnLabel}</label>
                <textarea
                    ref={textareaRef}
                    className="w-full p-3 rounded-lg border border-surface-highlight focus:border-danger bg-surface text-text-main h-24 text-sm resize-none"
                    placeholder={t.wizard.vulnPlaceholder}
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-success uppercase mb-1">{t.wizard.oppLabel}</label>
                <textarea
                    className="w-full p-3 rounded-lg border border-surface-highlight focus:border-success bg-surface text-text-main h-24 text-sm resize-none"
                    placeholder={t.wizard.oppPlaceholder}
                    value={secondaryInput}
                    onChange={(e) => setSecondaryInput(e.target.value)}
                />
            </div>
        </div>
    </div>
  );

  const renderRisks = () => (
    <div className="animate-slide-up space-y-6">
        <div className="bg-surface-highlight p-4 rounded-lg text-xs text-text-muted mb-4 flex items-center">
            <ShieldAlert className="mr-2 w-4 h-4"/> {t.stages.risks}
        </div>
        <h2 className="text-xl font-bold text-text-main">{t.wizard.risksTitle}</h2>
        <p className="text-sm text-text-muted">{t.wizard.risksDesc}</p>
        
        <label className="block text-xs font-bold text-text-muted uppercase mb-1">{t.wizard.risksLabel}</label>
        <textarea
            ref={textareaRef}
            className="w-full p-4 rounded-xl border-2 border-surface-highlight focus:border-primary focus:ring-0 bg-surface text-text-main h-40 text-base resize-none"
            placeholder={t.wizard.risksPlaceholder}
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
        />
    </div>
  );

  const getButtonText = () => {
      if (analysis.stage === AnalysisStage.RISKS) return t.wizard.btnFinish;
      return t.wizard.btnNext;
  };

  const isButtonDisabled = () => {
      if (analysis.stage === AnalysisStage.STRATEGY) return !currentInput.trim() || !secondaryInput.trim();
      return !currentInput.trim();
  };

  return (
    <>
      <TopBar title={analysis.title || t.wizard.titleNew} showBack />
      <div className="max-w-2xl mx-auto p-4 pb-24">
         
         <ContextPanel />

         {analysis.stage === AnalysisStage.INIT && renderInit()}
         {analysis.stage === AnalysisStage.MODULES && renderModules()}
         {analysis.stage === AnalysisStage.SYNTHESIS && renderSynthesis()}
         {analysis.stage === AnalysisStage.STRATEGY && renderStrategy()}
         {analysis.stage === AnalysisStage.RISKS && renderRisks()}

         <div className="fixed bottom-20 left-0 right-0 px-4 max-w-2xl mx-auto flex gap-3">
            {/* Back Button - Only show if not in very first state */}
            {!(analysis.stage === AnalysisStage.INIT && !analysis.title) && (
                <Button variant="secondary" onClick={handleBack} className="px-5 py-4 flex-shrink-0">
                    <ChevronLeft size={28} />
                </Button>
            )}

            {/* Save & Exit Button */}
            <Button variant="outline" onClick={handleSaveAndExit} className="px-5 py-4 flex-shrink-0">
                <Save size={24} />
            </Button>

            <Button 
                variant="primary" 
                fullWidth 
                onClick={handleNext}
                disabled={isButtonDisabled()}
                className="shadow-xl flex-grow py-4"
            >
                <span className="flex items-center text-lg">
                    {getButtonText()} 
                    {analysis.stage === AnalysisStage.RISKS ? <Check className="ml-2" size={24} /> : <ArrowRight className="ml-2" size={24} />}
                </span>
            </Button>
         </div>
      </div>
    </>
  );
};

export default AnalysisWizard;
