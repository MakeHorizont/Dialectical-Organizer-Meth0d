
import { Analysis, AnalysisStage } from '../types';

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
  };
};

/**
 * Downloads all analyses as a JSON file.
 */
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

/**
 * Imports analysis data from a JSON string, merging with existing data.
 * Merging strategy: IDs match -> overwrite. New IDs -> add.
 */
export const importData = (jsonString: string): boolean => {
  try {
    const imported = JSON.parse(jsonString);
    if (!Array.isArray(imported)) throw new Error("Invalid format");
    
    // Basic validation of schema
    const isValid = imported.every(item => item.id && item.createdAt && item.stage);
    if (!isValid) throw new Error("Invalid data schema");

    const current = getAnalyses();
    const map = new Map(current.map(i => [i.id, i]));
    
    imported.forEach((item: Analysis) => {
        // Ensure imported items are compatible
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
