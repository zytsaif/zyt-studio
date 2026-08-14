import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Award, Sparkles, Disc as DiscordIcon, ShieldCheck } from 'lucide-react';

export interface AdvancementItem {
  id: string;
  title: string;
  description: string;
  icon?: 'trophy' | 'diamond' | 'discord' | 'shield';
}

interface Props {
  advancement: AdvancementItem | null;
  onClose: () => void;
}

export const MinecraftAdvancementToast: React.FC<Props> = ({ advancement, onClose }) => {
  return (
    <AnimatePresence>
      {advancement && (
        <motion.div
          initial={{ opacity: 0, y: -40, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -30, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-20 right-4 z-50 pointer-events-auto"
        >
          <div
            onClick={onClose}
            className="cursor-pointer bg-[#0a0b18] border-2 border-purple-500/60 rounded-2xl p-4 shadow-2xl shadow-purple-950/60 flex items-center gap-3.5 max-w-sm font-mono backdrop-blur-xl relative overflow-hidden group hover:border-cyan-400 transition-colors"
          >
            {/* Ambient Redstone / Glow Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-amber-400" />

            {/* Advancement Icon */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/30 to-amber-500/20 border border-purple-500/40 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
              {advancement.icon === 'discord' ? (
                <DiscordIcon className="w-6 h-6 text-indigo-400" />
              ) : advancement.icon === 'shield' ? (
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              ) : advancement.icon === 'diamond' ? (
                <Sparkles className="w-6 h-6 text-cyan-400" />
              ) : (
                <Trophy className="w-6 h-6 text-amber-400" />
              )}
            </div>

            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" /> Advancement Made!
              </div>
              <h4 className="text-sm font-extrabold text-white leading-tight mt-0.5">
                {advancement.title}
              </h4>
              <p className="text-[11px] text-gray-300 line-clamp-1 mt-0.5 font-sans">
                {advancement.description}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
