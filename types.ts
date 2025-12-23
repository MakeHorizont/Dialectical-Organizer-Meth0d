
export type LanguageCode = 'ru' | 'en' | 'es' | 'zh' | 'hi';

export type ThemeId = 'neutral' | 'corporate' | 'cozy' | 'brutal' | 'amoled' | 'premium' | 'cyberpunk' | 'minimalist' | 'kitty';

export enum AnalysisStage {
  INIT = 'INIT',
  MODULES = 'MODULES',
  SYNTHESIS = 'SYNTHESIS',
  STRATEGY = 'STRATEGY',
  RISKS = 'RISKS',
  COMPLETED = 'COMPLETED'
}

export enum CategoryType {
  TEMPORAL = 'TEMPORAL',
  INTERESTS = 'INTERESTS',
  STRUCTURAL = 'STRUCTURAL',
  NARRATIVE = 'NARRATIVE'
}

export interface Answer {
  questionId: string;
  text: string;
  timestamp: number;
}

export interface PraxisLogEntry {
  id: string;
  text: string;
  timestamp: number;
}

export interface ActionItem {
  id: string;
  text: string;
  isDone: boolean;
}

export interface Analysis {
  id: string;
  title: string;
  thesis: string;
  synthesis: string;
  vulnerabilities?: string;
  opportunities?: string;
  risks?: string;
  blindSpots?: string;
  createdAt: number;
  updatedAt: number;
  stage: AnalysisStage;
  answers: Answer[];
  isArchived: boolean;
  tags?: string[];
  praxisLog?: PraxisLogEntry[];
  relatedIds?: string[];
  checklist?: ActionItem[];
  isPinned?: boolean;
}

export interface Quote {
  text: string;
  author: string;
}

export interface Template {
  id: string;
  label: string;
  title: string;
  thesis: string;
}

export interface QuestionStructure {
  id: string;
  type: CategoryType;
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export interface Theme {
  id: ThemeId;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    surfaceHighlight: string;
    textMain: string;
    textMuted: string;
    textInverted: string;
    success: string;
    warning: string;
    danger: string;
  };
  textOverrides: {
    [key in LanguageCode]?: DeepPartial<TranslationData>;
  };
}

export interface TranslationData {
  appName: string;
  slogan: string;
  nav: {
    current: string;
    analysis: string;
    archive: string;
  };
  themeNames: Record<string, string>;
  tutorial: {
    welcome: string;
    startBtn: string;
    skipBtn: string;
    nextBtn: string;
    finishBtn: string;
    slides: {
      intro: { title: string; content: string; analogy?: string };
      foundation: { title: string; content: string; analogy?: string };
      walls: { title: string; content: string; analogy?: string };
      roof: { title: string; content: string; analogy?: string };
      method: { title: string; content: string; analogy?: string };
    };
  };
  stages: {
    init: string;
    modules: string;
    synthesis: string;
    synthesisDesc?: string;
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
    searchPlaceholder: string;
    filterAll: string;
    filterActive: string;
    filterDone: string;
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
    tagsLabel: string;
    tagsPlaceholder: string;
    synthesisTitle: string;
    synthesisDesc: string;
    synthesisPlaceholder: string;
    strategyTitle: string;
    strategyDesc: string;
    vulnLabel: string;
    vulnPlaceholder: string;
    oppLabel: string;
    oppPlaceholder: string;
    risksTitle: string;
    risksDesc: string;
    risksLabel: string;
    risksPlaceholder: string;
    hintLabel: string;
    loading: string;
    templatesTitle: string;
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
    btnPrint: string;
    btnExportMD: string;
    btnExportJSON: string;
    btnArchive: string;
    confirmArchive: string;
    shareSuccess: string;
    praxisTitle: string;
    praxisPlaceholder: string;
    btnAddLog: string;
    connectionsTitle: string;
    btnAddConnection: string;
    noConnections: string;
    selectConnection: string;
    tacticsTitle: string;
    tacticsPlaceholder: string;
    btnAddItem: string;
  };
  archive: {
    title: string;
    empty: string;
    btnRestore: string;
    btnBurn: string;
    confirmDelete: string;
    labelArchive: string;
    backupSection: string;
    btnExport: string;
    btnImport: string;
    dragDropLabel: string;
    orClick: string;
    importSuccess: string;
    importError: string;
  };
  questions: Record<string, {
    categoryLabel: string;
    text: string;
    hint: string;
    placeholder: string;
  }>;
  quotes?: Quote[];
  feedback?: string[];
  templates?: Template[];
}
