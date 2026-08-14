import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  Edit3,
  Check,
  RotateCcw,
  RotateCw,
  Save,
  Lock,
  Sparkles,
  Eye,
  EyeOff,
  Download,
  Plus,
  Sliders,
  Package,
  Layers,
  Settings
} from 'lucide-react';

interface FloatingAdminBarProps {
  onOpenFullCMS: () => void;
  onTriggerToast: (msg: string) => void;
}

export const FloatingAdminBar: React.FC<FloatingAdminBarProps> = ({
  onOpenFullCMS,
  onTriggerToast,
}) => {
  const {
    isAdmin,
    adminRole,
    isEditMode,
    toggleEditMode,
    undo,
    redo,
    canUndo,
    canRedo,
    logoutAdmin,
    exportCMSBackup,
  } = useStore();

  if (!isAdmin) return null;

  const handlePublish = () => {
    onTriggerToast('Published changes live to Zyt Studio website!');
  };

  const handleQuickExport = () => {
    const jsonStr = exportCMSBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zyt_studio_publish_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    onTriggerToast('Exported publish backup JSON file.');
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-4xl w-[92%] sm:w-auto">
      <div className="glass-panel px-4 py-3 rounded-2xl border-2 border-purple-500/50 shadow-2xl bg-[#070818]/95 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Role Badge & Visual Edit Mode Switch */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 font-mono font-bold text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{adminRole === 'owner' ? 'OWNER BUILDER' : 'EDITOR'}</span>
          </div>

          <button
            onClick={toggleEditMode}
            className={`px-3.5 py-1.5 rounded-xl font-bold font-mono text-xs flex items-center gap-1.5 transition-all shadow-md ${
              isEditMode
                ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white border border-cyan-400 animate-pulse'
                : 'bg-white/10 hover:bg-white/15 text-gray-300 border border-white/15'
            }`}
          >
            {isEditMode ? <Eye className="w-4 h-4 text-cyan-200" /> : <EyeOff className="w-4 h-4" />}
            {isEditMode ? 'Visual Edit Mode: ON' : 'Preview Mode'}
          </button>
        </div>

        {/* Undo / Redo & Save Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={undo}
            disabled={!canUndo}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/15 text-gray-200 disabled:opacity-30 disabled:hover:bg-white/10 transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <RotateCcw className="w-4 h-4 text-cyan-400" />
          </button>

          <button
            onClick={redo}
            disabled={!canRedo}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/15 text-gray-200 disabled:opacity-30 disabled:hover:bg-white/10 transition-colors"
            title="Redo (Ctrl+Y)"
          >
            <RotateCw className="w-4 h-4 text-cyan-400" />
          </button>

          <button
            onClick={handlePublish}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-600/30"
          >
            <Check className="w-4 h-4 text-emerald-200" /> Publish Live
          </button>

          <button
            onClick={onOpenFullCMS}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-1.5 border border-white/10"
          >
            <Settings className="w-4 h-4 text-purple-400" /> Full CMS Dashboard
          </button>

          <button
            onClick={handleQuickExport}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/15 text-gray-300"
            title="Download Backup JSON"
          >
            <Download className="w-4 h-4 text-amber-400" />
          </button>

          <button
            onClick={logoutAdmin}
            className="p-2 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300"
            title="Lock Session"
          >
            <Lock className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
