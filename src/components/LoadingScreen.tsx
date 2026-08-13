import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#04050a] text-white"
        >
          <div className="relative flex flex-col items-center">
            {/* Mascot Image with Glowing Ring */}
            <div className="relative w-36 h-36 mb-6">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-red-500 via-purple-600 to-cyan-500 blur-xl opacity-75 animate-pulse" />
              <img
                src="/zyt_mascot.jpg"
                alt="Zyt Studio Mascot"
                className="relative w-full h-full object-cover rounded-3xl border-2 border-purple-500/50 shadow-2xl animate-mascot-glow"
              />
            </div>

            {/* Brand Title */}
            <h1 className="text-3xl font-extrabold tracking-wider font-mono text-white">
              ZYT <span className="gradient-text-purple">STUDIO</span>
            </h1>

            <p className="text-xs text-gray-400 font-mono mt-2 tracking-widest uppercase">
              Loading Minecraft Engine...
            </p>

            {/* Progress Bar */}
            <div className="w-48 h-1.5 bg-white/10 rounded-full mt-6 overflow-hidden border border-white/10">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.6, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-red-500 via-purple-500 to-cyan-400"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
