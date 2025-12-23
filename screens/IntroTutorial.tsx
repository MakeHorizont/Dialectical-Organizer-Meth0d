
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/Button';
import { ChevronRight, ChevronLeft, BrainCircuit, Activity, Network, Target, Sparkles } from 'lucide-react';

const IntroTutorial: React.FC = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    
    const slides = [
        {
            id: 'intro',
            icon: <BrainCircuit size={64} className="text-primary" />,
            data: t.tutorial.slides.intro
        },
        {
            id: 'foundation',
            icon: <Activity size={64} className="text-secondary" />,
            data: t.tutorial.slides.foundation
        },
        {
            id: 'walls',
            icon: <Network size={64} className="text-warning" />,
            data: t.tutorial.slides.walls
        },
        {
            id: 'roof',
            icon: <Target size={64} className="text-danger" />,
            data: t.tutorial.slides.roof
        },
        {
            id: 'method',
            icon: <Sparkles size={64} className="text-primary" />,
            data: t.tutorial.slides.method
        }
    ];

    const currentSlide = slides[step];

    const handleNext = () => {
        if (step < slides.length - 1) {
            setStep(step + 1);
        } else {
            completeTutorial();
        }
    };

    const handleBack = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    const completeTutorial = () => {
        localStorage.setItem('dialectical_tutorial_seen', 'true');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-text-main">
            <div className="max-w-md w-full space-y-8 animate-fade-in">
                
                {/* Header Progress */}
                <div className="flex justify-center space-x-2 mb-8">
                    {slides.map((_, idx) => (
                        <div 
                            key={idx} 
                            className={`h-2 rounded-full transition-all duration-300 ${
                                idx === step ? 'w-8 bg-primary' : 'w-2 bg-surface-highlight'
                            }`}
                        />
                    ))}
                </div>

                {/* Content Card */}
                <div className="bg-surface p-8 rounded-2xl shadow-xl border border-surface-highlight text-center relative overflow-hidden min-h-[400px] flex flex-col">
                    
                    {currentSlide.data.analogy && (
                        <div className="absolute top-0 left-0 right-0 bg-surface-highlight/50 py-1 text-[10px] font-bold uppercase tracking-widest text-text-muted">
                            {currentSlide.data.analogy}
                        </div>
                    )}

                    <div className="flex-grow flex flex-col items-center justify-center mt-4">
                        <div className="mb-6 animate-pulse-slow">
                            {currentSlide.icon}
                        </div>
                        
                        <h2 className="text-2xl font-bold mb-4 text-primary">
                            {currentSlide.data.title}
                        </h2>
                        
                        <div className="text-sm leading-relaxed text-text-muted whitespace-pre-line text-left w-full">
                            {currentSlide.data.content}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    {step > 0 && (
                        <Button variant="outline" className="flex-1" onClick={handleBack}>
                            <ChevronLeft className="mr-2" size={18} />
                            {t.wizard.btnBack}
                        </Button>
                    )}
                    <Button variant="primary" className={step === 0 ? "w-full" : "flex-[2]"} onClick={handleNext}>
                        {step === slides.length - 1 ? t.tutorial.finishBtn : t.tutorial.nextBtn} 
                        <ChevronRight className="ml-2" size={18} />
                    </Button>
                </div>
                
                <div className="text-center">
                    <Button variant="ghost" onClick={completeTutorial} className="text-xs">
                        {t.tutorial.skipBtn}
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default IntroTutorial;
