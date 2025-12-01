
import React, { useEffect, useState, useRef } from 'react';
import { getAnalyses, deleteAnalysis, restoreAnalysis, exportData, importData } from '../services/storage';
import { Analysis } from '../types';
import { TopBar } from '../components/Navbar';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { RefreshCw, Trash2, Download, Upload, FileJson } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Archive: React.FC = () => {
  const [archivedItems, setArchivedItems] = useState<Analysis[]>([]);
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const loadData = () => {
    const all = getAnalyses();
    setArchivedItems(all.filter(a => a.isArchived).sort((a, b) => b.updatedAt - a.updatedAt));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (id: string) => {
      if (window.confirm(t.archive.confirmDelete)) {
          deleteAnalysis(id);
          loadData();
      }
  };

  const handleRestore = (id: string) => {
      restoreAnalysis(id);
      loadData();
  };

  const processFile = (file: File) => {
      const reader = new FileReader();
      reader.onload = (event) => {
          const content = event.target?.result as string;
          if (content) {
              const success = importData(content);
              if (success) {
                  alert(t.archive.importSuccess);
                  loadData(); 
                  window.location.reload();
              } else {
                  alert(t.archive.importError);
              }
          }
      };
      reader.readAsText(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
      e.target.value = '';
  };

  // Drag and Drop Handlers
  const onDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && file.name.endsWith('.json')) {
          processFile(file);
      } else {
          alert("Please drop a valid .json file");
      }
  };

  return (
    <>
      <TopBar title={t.archive.title} showSettings />
      <div className="p-4 max-w-2xl mx-auto space-y-8 animate-fade-in pb-24">
        
        {/* Data Management Section */}
        <div className="bg-surface rounded-xl p-6 border border-surface-highlight shadow-sm">
             <h3 className="text-sm font-bold text-text-muted uppercase mb-4 tracking-wider">
                 {t.archive.backupSection}
             </h3>
             <div className="space-y-4">
                 <Button variant="outline" fullWidth onClick={exportData} className="flex items-center justify-center">
                     <Download size={18} className="mr-2" />
                     <span className="text-sm">{t.archive.btnExport}</span>
                 </Button>
                 
                 {/* Drag and Drop Zone */}
                 <div 
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                        isDragging 
                        ? 'border-primary bg-primary/5' 
                        : 'border-surface-highlight hover:border-primary/50'
                    }`}
                 >
                     <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept=".json" 
                        className="hidden" 
                     />
                     <div className="flex flex-col items-center space-y-2 text-text-muted">
                        <Upload size={24} className={isDragging ? 'text-primary animate-bounce' : ''} />
                        <span className="text-sm font-medium">{t.archive.dragDropLabel}</span>
                        <span className="text-xs opacity-60">{t.archive.orClick}</span>
                     </div>
                 </div>
             </div>
        </div>

        {/* Archived Items */}
        <div className="space-y-4">
            {archivedItems.length === 0 ? (
                <div className="text-center py-8 text-text-muted opacity-60 text-sm">
                    {t.archive.empty}
                </div>
            ) : (
                archivedItems.map(item => (
                    <Card key={item.id} className="bg-surface/60 border-surface-highlight opacity-90">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-text-muted">{item.title}</h3>
                            <span className="text-xs bg-surface-highlight px-2 py-1 rounded text-text-muted">{t.archive.labelArchive}</span>
                        </div>
                        <p className="text-sm text-text-muted line-clamp-1 mb-4">{item.synthesis || item.thesis}</p>
                        <div className="flex justify-end space-x-2 border-t border-surface-highlight pt-3">
                            <button 
                                onClick={() => handleRestore(item.id)}
                                className="text-xs font-bold text-primary hover:bg-primary/10 px-3 py-2 rounded flex items-center transition-colors"
                            >
                                <RefreshCw size={14} className="mr-1" /> {t.archive.btnRestore}
                            </button>
                            <button 
                                onClick={() => handleDelete(item.id)}
                                className="text-xs font-bold text-text-muted hover:bg-danger/10 hover:text-danger px-3 py-2 rounded flex items-center transition-colors"
                            >
                                <Trash2 size={14} className="mr-1" /> {t.archive.btnBurn}
                            </button>
                        </div>
                    </Card>
                ))
            )}
        </div>
      </div>
    </>
  );
};

export default Archive;
