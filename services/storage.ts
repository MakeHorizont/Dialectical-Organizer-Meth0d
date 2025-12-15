
import { Analysis, AnalysisStage, PraxisLogEntry, ActionItem } from '../types';

const STORAGE_KEY = 'dialectical_organizer_data_v2'; 

export const saveAnalysis = (analysis: Analysis): void => {
  const analyses = getAnalyses();
  const index = analyses.findIndex(a => a.id === analysis.id);
  if (index >= 0) {
    analyses[index] = { ...analysis, updatedAt: Date.now() };
  } else {
    analyses.unshift(analysis);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(analyses));
};

export const getAnalyses = (): Analysis[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const getAnalysisById = (id: string): Analysis | undefined => {
  const analyses = getAnalyses();
  return analyses.find(a => a.id === id);
};

export const deleteAnalysis = (id: string): void => {
  const analyses = getAnalyses().filter(a => a.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(analyses));
};

export const archiveAnalysis = (id: string): void => {
  const analyses = getAnalyses();
  const target = analyses.find(a => a.id === id);
  if (target) {
    target.isArchived = true;
    target.updatedAt = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(analyses));
  }
};

export const restoreAnalysis = (id: string): void => {
  const analyses = getAnalyses();
  const target = analyses.find(a => a.id === id);
  if (target) {
    target.isArchived = false;
    target.updatedAt = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(analyses));
  }
};

export const createEmptyAnalysis = (): Analysis => {
  return {
    id: crypto.randomUUID(),
    title: '',
    thesis: '',
    synthesis: '',
    vulnerabilities: '',
    opportunities: '',
    risks: '',
    blindSpots: '',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    stage: AnalysisStage.INIT,
    answers: [],
    isArchived: false,
    tags: [],
    praxisLog: [],
    relatedIds: [], 
    checklist: [],
    isPinned: false
  };
};

export const addPraxisLog = (analysisId: string, text: string): void => {
    const analyses = getAnalyses();
    const target = analyses.find(a => a.id === analysisId);
    if (target) {
        if (!target.praxisLog) target.praxisLog = [];
        
        const newEntry: PraxisLogEntry = {
            id: crypto.randomUUID(),
            text,
            timestamp: Date.now()
        };
        
        target.praxisLog.unshift(newEntry); // Newest first
        target.updatedAt = Date.now();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(analyses));
    }
};

export const togglePinAnalysis = (id: string): void => {
    const analyses = getAnalyses();
    const target = analyses.find(a => a.id === id);
    if (target) {
        target.isPinned = !target.isPinned;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(analyses));
    }
};

// Tactical Checklist Management
export const addActionItem = (analysisId: string, text: string): void => {
    const analyses = getAnalyses();
    const target = analyses.find(a => a.id === analysisId);
    if (target) {
        if (!target.checklist) target.checklist = [];
        target.checklist.push({
            id: crypto.randomUUID(),
            text,
            isDone: false
        });
        target.updatedAt = Date.now();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(analyses));
    }
};

export const toggleActionItem = (analysisId: string, itemId: string): void => {
    const analyses = getAnalyses();
    const target = analyses.find(a => a.id === analysisId);
    if (target && target.checklist) {
        const item = target.checklist.find(i => i.id === itemId);
        if (item) {
            item.isDone = !item.isDone;
            
            // Auto-log to Praxis if completed
            if (item.isDone) {
                if (!target.praxisLog) target.praxisLog = [];
                target.praxisLog.unshift({
                    id: crypto.randomUUID(),
                    text: `[TACTICS] Completed: ${item.text}`,
                    timestamp: Date.now()
                });
            }
            
            target.updatedAt = Date.now();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(analyses));
        }
    }
};

export const deleteActionItem = (analysisId: string, itemId: string): void => {
    const analyses = getAnalyses();
    const target = analyses.find(a => a.id === analysisId);
    if (target && target.checklist) {
        target.checklist = target.checklist.filter(i => i.id !== itemId);
        target.updatedAt = Date.now();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(analyses));
    }
};


// Creates a bi-directional link between two analyses
export const toggleAnalysisConnection = (id1: string, id2: string): void => {
    if (id1 === id2) return;
    
    const analyses = getAnalyses();
    const a1 = analyses.find(a => a.id === id1);
    const a2 = analyses.find(a => a.id === id2);
    
    if (a1 && a2) {
        // Initialize arrays if missing
        if (!a1.relatedIds) a1.relatedIds = [];
        if (!a2.relatedIds) a2.relatedIds = [];
        
        const isConnected = a1.relatedIds.includes(id2);
        
        if (isConnected) {
            // Disconnect
            a1.relatedIds = a1.relatedIds.filter(id => id !== id2);
            a2.relatedIds = a2.relatedIds.filter(id => id !== id1);
        } else {
            // Connect
            a1.relatedIds.push(id2);
            a2.relatedIds.push(id1);
        }
        
        a1.updatedAt = Date.now();
        a2.updatedAt = Date.now();
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(analyses));
    }
};

export const exportData = (): void => {
  const data = localStorage.getItem(STORAGE_KEY);
  const parsedData = data ? JSON.parse(data) : [];
  
  const blob = new Blob([JSON.stringify(parsedData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const dateStr = new Date().toISOString().split('T')[0];
  const a = document.createElement('a');
  a.href = url;
  a.download = `Meth0d_Backup_${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportSingleAnalysis = (id: string): void => {
    const analysis = getAnalysisById(id);
    if (!analysis) return;

    const blob = new Blob([JSON.stringify(analysis, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const safeTitle = (analysis.title || 'Untitled').replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const a = document.createElement('a');
    a.href = url;
    a.download = `Meth0d_${safeTitle}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

export const importData = (jsonString: string): boolean => {
  try {
    const imported = JSON.parse(jsonString);
    let itemsToImport: Analysis[] = [];

    if (Array.isArray(imported)) {
        itemsToImport = imported;
    } else if (typeof imported === 'object' && imported !== null && imported.id) {
        itemsToImport = [imported];
    } else {
        throw new Error("Invalid format");
    }
    
    const isValid = itemsToImport.every(item => item.id && item.createdAt && item.stage);
    if (!isValid) throw new Error("Invalid data schema");

    const current = getAnalyses();
    const map = new Map(current.map(i => [i.id, i]));
    
    itemsToImport.forEach((item: Analysis) => {
        map.set(item.id, item);
    });
    
    const merged = Array.from(map.values());
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    return true;
  } catch (e) {
    console.error("Import failed", e);
    return false;
  }
};