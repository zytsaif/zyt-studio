import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import { Disc as DiscordIcon, MessageSquare, ArrowUp } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const store = useStore();
  const discordInvite = store?.cmsSections?.contact?.discordInvite || 'https://discord.gg';

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const elem = document.getElementById('contact');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5"
        >
          {/* Join Discord Button */}
          <a
            href={discordInvite}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-bold text-xs shadow-2xl shadow-indigo-600/40 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all border border-indigo-400/40"
          >
            <DiscordIcon className="w-4 h-4 text-indigo-200" />
            <span className="hidden sm:inline">Discord</span>
          </a>

          {/* Quick Contact Button */}
          <button
            onClick={scrollToContact}
            className="px-4 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-xs shadow-2xl shadow-purple-600/40 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all border border-purple-400/40"
          >
            <MessageSquare className="w-4 h-4 text-cyan-300" />
            <span className="hidden sm:inline">Contact</span>
          </button>

          {/* Scroll to top */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-mono font-bold text-xs shadow-xl backdrop-blur-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all border border-white/20"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 text-cyan-400" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
