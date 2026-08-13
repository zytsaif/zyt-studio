import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const ToastNotification: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 glass-panel px-5 py-3.5 rounded-2xl border border-purple-500/50 shadow-2xl flex items-center gap-3 bg-[#0d0e20]"
      >
        <div className="w-8 h-8 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
        </div>

        <span className="text-xs font-semibold text-white font-mono">{message}</span>

        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
