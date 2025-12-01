
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Analysis, AnalysisStage } from '../types';
import { getAnalysisById, createEmptyAnalysis, saveAnalysis } from '../services/storage';
import { QUESTION_STRUCTURE } from '../constants';
import { TopBar } from '../components/Navbar';
import { Button } from '../components/Button';
import { HelpCircle, ArrowRight, Check, Target, ShieldAlert, ChevronDown, ChevronUp, ChevronLeft, Save, Edit2 } from 'lucide-react';
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
  
  // State for stable feedback text to prevent flickering on keystrokes
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

  // Update feedback text only when the question changes or stage changes
  const currentQuestion = getCurrentQuestion();
  const activeStageId = analysis?.stage === AnalysisStage.MODULES ? currentQuestion?.id : analysis?.stage;

  useEffect(() => {
      if (t.feedback && t.feedback.length > 0) {
          const randomFeedback = t.feedback[Math.floor(Math.random() * t.feedback.length)];
          setFeedbackText(randomFeedback);
      }
  }, [activeStageId, t.feedback]);

  if (!analysis) return <div className="p-10 text-center text-text-muted">{t.wizard.loading}</div>;

  const handleSaveAndExit = () => {
     if (analysis) {
         // Save current progress locally before exiting
         const updated = { ...analysis, updatedAt: Date.now() };
         saveAnalysis(updated);
         navigate('/');
     }
  };

  // Allows user to jump back to a specific answer in Phase 1 to edit it
  const handleRewindToAnswer = (index: number) => {
      if (!analysis) return;
      
      // We want to edit a previous answer. 
      // In a strict wizard, this usually means unwinding the stack to that point.
      if (window.confirm("Редактирование предыдущего шага. Вы вернетесь к этому вопросу, чтобы изменить ответ. Продолжить?")) {
        const targetAnswer = analysis.answers[index];
        const updated = { ...analysis };
        
        // Remove the target answer and all subsequent answers from the array
        // so the Wizard "sees" this question as the next unanswered one.
        updated.answers = analysis.answers.slice(0, index);
        
        // Set the input to the old value so user can edit it
        setCurrentInput(targetAnswer.text);
        updated.stage = AnalysisStage.MODULES;
        
        setAnalysis(updated);
        saveAnalysis(updated);
        setShowContext(false);
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
                          <div key={i} className="border-t border-surface-highlight pt-2 group relative pr-8">
                               <div>
                                   <div className="text-[10px] text-primary font-bold">{t.questions[a.questionId]?.categoryLabel}</div>
                                   <div className="text-sm text-text-main">{a.text}</div>
                               </div>
                               {/* Rewind/Edit Button */}
                               <button 
                                   onClick={() => handleRewindToAnswer(i)}
                                   className="absolute right-0 top-2 p-2 text-text-muted hover:text-primary transition-colors"
                                   title="Редактировать этот шаг"
                               >
                                   <Edit2 size={16} />
                               </button>
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
                <h3 className="text-lg font-bold text-text-main mt-1">{qData.text}</h3>
            </div>
            
            <div className="relative">
                <textarea
                    ref={textareaRef}
                    className="w-full p-4 rounded-xl border-2 border-primary/20 focus:border-primary focus:ring-0 bg-surface text-text-main h-48 text-lg resize-none"
                    placeholder={qData.placeholder}
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                />
                 {/* Feedback Animation (Stable now) */}
                 {currentInput.length > 20 && feedbackText && (
                    <div className="absolute bottom-4 right-4 text-xs font-mono text-primary animate-fade-in bg-surface/80 px-2 py-1 rounded">
                        {feedbackText}
                    </div>
                )}
            </div>

            <button 
                onClick={() => setShowHint(!showHint)}
                className="text-xs text-text-muted hover:text-primary flex items-center"
            >
                <HelpCircle size={14} className="mr-1" /> {t.wizard.hintLabel}
            </button>
            
            {showHint && (
                <div className="bg-surface-highlight p-3 rounded-lg text-sm text-text-muted italic animate-fade-in border border-primary/10">
                    {qData.hint}
                </div>
            )}
        </div>
      );
  };

  const renderSynthesis = () => (
      <div className="animate-slide-up space-y-6">
           <div className="bg-secondary text-text-inverted p-6 rounded-xl shadow-lg">
               <Target size={32} className="mb-2 opacity-80" />
               <h2 className="text-xl font-bold mb-2">{t.wizard.synthesisTitle}</h2>
               <p className="text-sm opacity-90">{t.wizard.synthesisDesc}</p>
           </div>
           
           <textarea
             ref={textareaRef}
             className="w-full p-4 rounded-xl border-2 border-secondary focus:border-secondary focus:ring-0 bg-surface text-text-main h-40 text-lg resize-none shadow-inner"
             placeholder={t.wizard.synthesisPlaceholder}
             value={currentInput}
             onChange={(e) => setCurrentInput(e.target.value)}
           />
      </div>
  );

  const renderStrategy = () => (
      <div className="animate-slide-up space-y-6">
           <div className="mb-4">
               <h2 className="text-xl font-bold text-text-main mb-1">{t.wizard.strategyTitle}</h2>
               <p className="text-text-muted text-sm">{t.wizard.strategyDesc}</p>
           </div>
           
           <div className="space-y-4">
               <div>
                   <label className="text-xs font-bold text-danger uppercase mb-1 block">{t.wizard.vulnLabel}</label>
                   <textarea
                     ref={textareaRef}
                     className="w-full p-3 rounded-lg border-2 border-danger/20 focus:border-danger bg-surface text-text-main h-32 resize-none"
                     placeholder={t.wizard.vulnPlaceholder}
                     value={currentInput}
                     onChange={(e) => setCurrentInput(e.target.value)}
                   />
               </div>
               
               <div>
                   <label className="text-xs font-bold text-success uppercase mb-1 block">{t.wizard.oppLabel}</label>
                   <textarea
                     className="w-full p-3 rounded-lg border-2 border-success/20 focus:border-success bg-surface text-text-main h-32 resize-none"
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
           <div className="bg-surface-highlight p-4 rounded-xl border-l-4 border-warning">
               <h2 className="text-lg font-bold text-text-main flex items-center">
                   <ShieldAlert size={20} className="mr-2 text-warning"/> {t.wizard.risksTitle}
               </h2>
               <p className="text-text-muted text-sm mt-1">{t.wizard.risksDesc}</p>
           </div>
           
           <textarea
             ref={textareaRef}
             className="w-full p-4 rounded-xl border-2 border-warning/30 focus:border-warning bg-surface text-text-main h-48 text-lg resize-none"
             placeholder={t.wizard.risksPlaceholder}
             value={currentInput}
             onChange={(e) => setCurrentInput(e.target.value)}
           />
      </div>
  );

  // Router for rendering steps
  const renderStep = () => {
      switch(analysis.stage) {
          case AnalysisStage.INIT: return renderInit();
          case AnalysisStage.MODULES: return renderModules();
          case AnalysisStage.SYNTHESIS: return renderSynthesis();
          case AnalysisStage.STRATEGY: return renderStrategy();
          case AnalysisStage.RISKS: return renderRisks();
          default: return null;
      }
  };

  return (
    <>
      <TopBar 
        title={t.wizard.titleNew} 
        showBack={false} 
        showSettings={false} 
      />
      
      <div className="max-w-xl mx-auto p-4 pb-32">
          {/* Top Controls */}
          <div className="flex justify-between items-center mb-4">
              <Button variant="ghost" onClick={handleSaveAndExit} className="text-xs">
                  <Save size={16} className="mr-1"/> {t.wizard.btnSave}
              </Button>
          </div>

          <ContextPanel />

          {/* Main Content */}
          <div className="min-h-[300px]">
            {renderStep()}
          </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-surface-highlight p-4 z-50 shadow-[0_-5px_10px_rgba(0,0,0,0.05)]">
          <div className="max-w-xl mx-auto flex justify-between items-center gap-4">
              <Button 
                variant="secondary" 
                onClick={handleBack}
                disabled={analysis.stage === AnalysisStage.INIT && !analysis.title}
                className="h-20 min-w-[5rem] flex-shrink-0 rounded-2xl" 
              >
                  <ChevronLeft size={48} />
              </Button>

              <div className="flex-grow">
                 {/* Spacer or indicator could go here */}
              </div>

              <Button 
                variant="primary" 
                onClick={handleNext}
                disabled={
                    (analysis.stage === AnalysisStage.STRATEGY && (!currentInput || !secondaryInput)) ||
                    (!currentInput && analysis.stage !== AnalysisStage.STRATEGY)
                }
                className="h-20 min-w-[7rem] flex-shrink-0 shadow-xl shadow-primary/20 rounded-2xl"
              >
                  {analysis.stage === AnalysisStage.RISKS ? <Check size={48} /> : <ArrowRight size={48} />}
              </Button>
          </div>
      </div>
    </>
  );
};

export default AnalysisWizard;
