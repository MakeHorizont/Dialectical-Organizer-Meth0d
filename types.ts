
export enum CategoryType {
  HISTORICAL = 'HISTORICAL', // Module 1
  CLASS = 'CLASS',           // Module 2
  SYSTEMIC = 'SYSTEMIC',     // Module 3
  IDEOLOGICAL = 'IDEOLOGICAL' // Module 4
}

export interface QuestionStructure {
  id: string;
  type: CategoryType;
}

export interface Answer {
  questionId: string;
  text: string;
  timestamp: number;
}

// The progression stages of the Protocol
export enum AnalysisStage {
  INIT = 'INIT',           // Object of Analysis
  MODULES = 'MODULES',     // Phase 1: Multivector Analysis
  SYNTHESIS = 'SYNTHESIS', // Phase 2: Central Contradiction
  STRATEGY = 'STRATEGY',   // Phase 3: Strategic Briefing inputs
  RISKS = 'RISKS',         // Phase 4: Self-Criticism
  COMPLETED = 'COMPLETED', // Done
}

export interface Analysis {
  id: string;
  title: string;
  thesis: string; // Object of Analysis
  synthesis: string; // Central Contradiction
  
  // New Strategic Fields
  vulnerabilities?: string;
  opportunities?: string;
  risks?: string;
  blindSpots?: string;

  createdAt: number;
  updatedAt: number;
  stage: AnalysisStage;
  answers: Answer[];
  isArchived: boolean;
}

export interface Quote {
  text: string;
  author: string;
}

export type LanguageCode = 'ru' | 'en' | 'es' | 'zh' | 'hi';

// Helper type to make all properties optional for overrides
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export interface TutorialSlide {
  title: string;
  content: string;
  analogy?: string; // e.g. "The Foundation", "The Walls"
}

export interface TranslationData {
  appName: string;
  slogan: string;
  nav: {
    current: string;
    analysis: string;
    archive: string;
  };
  themeNames: Record<ThemeId, string>; // Localized theme names
  tutorial: {
    welcome: string;
    startBtn: string;
    skipBtn: string;
    nextBtn: string;
    finishBtn: string;
    slides: {
      intro: TutorialSlide;
      foundation: TutorialSlide;
      walls: TutorialSlide;
      roof: TutorialSlide;
      method: TutorialSlide;
    }
  };
  stages: {
    init: string;
    modules: string;
    synthesis: string;
    strategy: string;
    risks: string;
    completed: string;
  };
  dashboard: {
    title: string;
    emptyTitle: string;
    emptyDesc: string;
    activeTasks: string;
    untitled: string;
  };
  wizard: {
    titleNew: string;
    titleObject: string;
    placeholderName: string;
    placeholderObject: string;
    descName: string;
    descObject: string;
    btnNext: string;
    btnBack: string;
    btnSave: string;
    btnFinish: string;
    contextLabel: string;
    
    // Synthesis
    synthesisTitle: string;
    synthesisDesc: string;
    synthesisPlaceholder: string;
    
    // Strategy
    strategyTitle: string;
    strategyDesc: string;
    vulnLabel: string;
    vulnPlaceholder: string;
    oppLabel: string;
    oppPlaceholder: string;

    // Risks
    risksTitle: string;
    risksDesc: string;
    risksLabel: string;
    risksPlaceholder: string;
    
    hintLabel: string;
    loading: string;
  };
  view: {
    objectLabel: string;
    contradictionLabel: string;
    briefingTitle: string;
    modulesTitle: string;
    strategyTitle: string;
    risksTitle: string;
    btnEdit: string;
    btnShare: string;
    btnArchive: string;
    confirmArchive: string;
    shareSuccess: string;
  };
  archive: {
    title: string;
    empty: string;
    btnRestore: string;
    btnBurn: string;
    confirmDelete: string;
    labelArchive: string;
    backupSection: string; // New
    btnExport: string;     // New
    btnImport: string;     // New
    importSuccess: string; // New
    importError: string;   // New
  };
  questions: Record<string, {
    categoryLabel: string;
    text: string;
    hint: string;
    placeholder: string;
  }>;
  quotes: Quote[]; 
  feedback: string[];
}

// Theme Types
export type ThemeId = 'neutral' | 'socialist' | 'cozy' | 'brutal' | 'amoled' | 'premium' | 'kitty' | 'pirate';

export interface ThemeColors {
  primary: string;   // Main accent (Buttons, Links)
  secondary: string; // Secondary accent
  background: string; // Main page background
  surface: string;   // Cards, inputs
  surfaceHighlight: string; // Hover states
  textMain: string;
  textMuted: string;
  textInverted: string;
  success: string;
  warning: string;
  danger: string;
}

export interface Theme {
  id: ThemeId;
  colors: ThemeColors;
  textOverrides: {
      [key in LanguageCode]?: DeepPartial<TranslationData>;
  };
}
