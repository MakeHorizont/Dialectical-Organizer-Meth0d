
import { TranslationData } from '../types';

export const en: TranslationData = {
  appName: "Meth0d",
  slogan: "Mutatus, iterum resurgo melior.",
  nav: {
    current: "Operations",
    analysis: "New Analysis",
    archive: "Archive"
  },
  themeNames: {
    neutral: "Neutral (Base)",
    socialist: "Red Classic",
    cozy: "Cozy Lamp",
    brutal: "Neobrutalism",
    amoled: "Void Black",
    premium: "Premium",
    kitty: "Pink Kitty",
    pirate: "Jolly Roger"
  },
  tutorial: {
    welcome: "Welcome.",
    startBtn: "Start Course",
    skipBtn: "Skip",
    nextBtn: "Next",
    finishBtn: "To Practice",
    slides: {
      intro: {
        title: "Why this tool?",
        content: "Simple to-do lists fail against complex problems.\n\nTo navigate a messy situation, you need to see not just the tasks, but the forces behind them. 'Black and white' logic doesn't work here. You need a systemic approach."
      },
      foundation: {
        title: "Principle 1: Materialism",
        analogy: "FOUNDATION",
        content: "Ideas and wishes are secondary. Resources, conditions, and facts are primary.\n\nAny analysis starts not with 'what we want,' but 'what we actually have.' Don't ignore harsh reality; build strategy on the solid ground of facts."
      },
      walls: {
        title: "Principle 2: Interests",
        analogy: "WALLS",
        content: "Every system contains a conflict of interests.\n\nBehind every problem lies the question: who benefits? Who gains resources, and who spends them? Don't look for malice or stupidity—look for the economic interests of the participants."
      },
      roof: {
        title: "Principle 3: Development",
        analogy: "GOAL",
        content: "Contradiction is the engine of development. You don't need to 'smooth corners' or find a compromise that satisfies no one.\n\nYou need to find the root of the contradiction and resolve it, creating a new, more efficient system."
      },
      method: {
        title: "Summary: Meth0d",
        analogy: "SPIRAL",
        content: "In dialectics, each new loop of the spiral does not just repeat the previous one, but makes a qualitative leap.\n\n'Mutatus, iterum resurgo melior' — Changed, I rise again improved.\n\nDevelopment goes not just wide, but up. Your task is to turn quantity (problems) into new quality (solutions)."
      }
    }
  },
  stages: {
    init: "Analysis Object",
    modules: "Phase 1: Decomposition",
    synthesis: "Phase 2: Contradiction",
    strategy: "Phase 3: Strategy",
    risks: "Phase 4: Audit",
    completed: "Briefing Ready"
  },
  dashboard: {
    title: "Workspace",
    emptyTitle: "Operational Pause",
    emptyDesc: "Situation stable. Activate protocol if a new problem arises.",
    activeTasks: "In Progress",
    untitled: "Object #",
    searchPlaceholder: "Search by thesis...",
    filterAll: "All",
    filterActive: "Active",
    filterDone: "Done"
  },
  wizard: {
    titleNew: "Analysis Setup",
    titleObject: "Subject of Study",
    placeholderName: "Title (e.g. 'Project Delay')",
    placeholderObject: "Describe the situation dryly and factually. What is happening?",
    descName: "Short identifier.",
    descObject: "Facts only. Save emotions for later.",
    btnNext: "Next",
    btnBack: "Back",
    btnSave: "Save",
    btnFinish: "Complete",
    contextLabel: "Context",
    
    synthesisTitle: "Phase 2: Key Contradiction",
    synthesisDesc: "Look at Phase 1 answers. What is the core conflict? Which two forces are colliding?",
    synthesisPlaceholder: "The main contradiction is between...",
    
    strategyTitle: "Phase 3: Strategic Resolution",
    strategyDesc: "How can we use this knowledge? Where is the leverage point?",
    vulnLabel: "System Vulnerabilities:",
    vulnPlaceholder: "Where does the system fail? Where do interests diverge?",
    oppLabel: "Our Opportunities:",
    oppPlaceholder: "How to turn this to our advantage? Concrete steps.",

    risksTitle: "Phase 4: Verification (Audit)",
    risksDesc: "Critical view. What did we miss?",
    risksLabel: "Risks & Blind Spots:",
    risksPlaceholder: "What could go wrong? Unaccounted factors.",
    
    hintLabel: "Hint:",
    loading: "Loading modules...",
  },
  view: {
    objectLabel: "OBJECT",
    contradictionLabel: "CORE CONTRADICTION",
    briefingTitle: "STRATEGIC REPORT",
    modulesTitle: "ANALYSIS DATA",
    strategyTitle: "ACTION PLAN",
    risksTitle: "RISKS",
    btnEdit: "Edit",
    btnShare: "Share",
    btnPrint: "Print / PDF",
    btnExportMD: "Download .MD",
    btnArchive: "Archive",
    confirmArchive: "Complete this task?",
    shareSuccess: "Copied to clipboard."
  },
  archive: {
    title: "Archive",
    empty: "Archive is empty.",
    btnRestore: "Restore",
    btnBurn: "Delete",
    confirmDelete: "Delete permanently?",
    labelArchive: "Done",
    backupSection: "Data Management",
    btnExport: "Download Backup",
    btnImport: "Import Backup",
    dragDropLabel: "Drag & Drop backup file here",
    orClick: "or click to select file",
    importSuccess: "Data restored successfully.",
    importError: "Failed to read file."
  },
  questions: {
    q_history: {
      categoryLabel: "History",
      text: "Cause and Effect: How did we get here?",
      hint: "Find material causes. What events or decisions led to the current state?",
      placeholder: "Historically this formed due to..."
    },
    q_class_interest: {
      categoryLabel: "Interests",
      text: "Benefit Balance: Who benefits?",
      hint: "Whose interests does the current situation serve? Who gains resources, who pays? Look for the economic basis.",
      placeholder: "This benefits..., while..."
    },
    q_system: {
      categoryLabel: "System",
      text: "Connections: What does this affect?",
      hint: "How is this element connected to others? If we change this, what else breaks or fixes?",
      placeholder: "This affects the system by..."
    },
    q_ideology: {
      categoryLabel: "Perception",
      text: "Form vs. Essence: What are we told?",
      hint: "How is the situation presented officially or externally? What is the difference between the 'image' and reality?",
      placeholder: "Officially it is said that..., but in reality..."
    }
  },
  quotes: [
    { text: "Philosophers have only interpreted the world in various ways; the point is to change it.", author: "Karl Marx" },
    { text: "The history of all hitherto existing society is the history of class struggles.", author: "Karl Marx" },
    { text: "History repeats itself, first as tragedy, second as farce.", author: "Karl Marx" },
    { text: "There are no morals in politics; there is only expedience.", author: "V.I. Lenin" },
    { text: "A lie told often enough becomes the truth.", author: "V.I. Lenin" },
    { text: "Quantity has a quality all its own.", author: "J.V. Stalin" },
    { text: "Political power grows out of the barrel of a gun.", author: "Mao Zedong" },
    { text: "Freedom is the recognition of necessity.", author: "Friedrich Engels" },
    { text: "No man ever steps in the same river twice.", author: "Heraclitus" },
    { text: "Better to die standing than to live on your knees.", author: "Che Guevara" },
    { text: "Condemn me. It does not matter. History will absolve me.", author: "Fidel Castro" },
    { text: "Pessimism of the intellect, optimism of the will.", author: "Antonio Gramsci" }
  ],
  feedback: [
    "Essence captured.",
    "Facts confirmed.",
    "Illusions discarded.",
    "Connections found."
  ],
  templates: [
    {
      id: "conflict",
      label: "Conflict",
      title: "Conflict of Interest in [Team/Project]",
      thesis: "A clash between Group A and Group B is observed. Resources are limited. Compromise is impossible."
    },
    {
      id: "stagnation",
      label: "Stagnation",
      title: "Stagnation of [Project]",
      thesis: "Growth has stopped. Old methods no longer yield results, but new ones have not yet been implemented."
    },
    {
      id: "personal",
      label: "Personal",
      title: "Personal Dead End in [Area]",
      thesis: "Subjective feeling of an impasse. Desires do not align with capabilities or resources."
    }
  ]
};
