import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Sparkles, Code, Cpu, ShieldCheck, Star, Terminal, Layers, MessageSquare, ExternalLink } from 'lucide-react';

interface HeroProps {
  onOrderClick: () => void;
  onViewWorkClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderClick, onViewWorkClick }) => {
  const { websiteSettings, contactSettings } = useStore();

  const stats = [
    { label: 'Plugins Created', value: '50+', icon: Code, color: 'text-purple-400' },
    { label: 'Happy Clients', value: '100+', icon: Star, color: 'text-cyan-400' },
    { label: 'Years Experience', value: '5+', icon: Cpu, color: 'text-red-400' },
    { label: 'Support & Updates', value: '24/7', icon: ShieldCheck, color: 'text-emerald-400' },
  ];

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Top Mascot Hero Display Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative inline-block mb-8"
        >
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto rounded-3xl p-[2px] bg-gradient-to-r from-red-500 via-purple-600 to-cyan-500 shadow-2xl shadow-purple-600/30">
            <img
              src={websiteSettings.mascotUrl}
              alt="Zyt Studio 3D Mascot"
              className="w-full h-full object-cover rounded-[22px] border border-white/20 animate-mascot-glow"
            />
            <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-500/40 shadow-lg">
              3D Mascot
            </span>
          </div>
        </motion.div>

        {/* Top Badge Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wide mb-6 shadow-lg"
        >
          <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Next-Gen Minecraft Studio & Paper/Spigot Architecture</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.15]"
        >
          Professional{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-purple-400 to-cyan-400 text-glow-purple">
            {websiteSettings.heroTitle}
          </span>
        </motion.h1>

        {/* Sub Heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto font-normal leading-relaxed"
        >
          {websiteSettings.heroSubheading}
        </motion.p>

        {/* Call-to-Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5"
        >
          {/* View Portfolio */}
          <button
            onClick={onViewWorkClick}
            className="px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs backdrop-blur-md transition-all hover:border-purple-400/50 flex items-center justify-center gap-2 group shadow-lg"
          >
            <Layers className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
            View Portfolio
          </button>

          {/* Order Custom Plugin */}
          <button
            onClick={onOrderClick}
            className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-red-500 via-purple-600 to-cyan-500 text-white font-semibold text-xs shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-cyan-300" />
            Order Custom Plugin
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Join Discord */}
          <a
            href={contactSettings.discordInvite}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200 hover:text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <MessageSquare className="w-4 h-4 text-indigo-400" />
            Join Discord
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </motion.div>

        {/* Animated Plugin Diagnostic Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-14 max-w-2xl mx-auto rounded-2xl glass-panel border border-white/10 text-left overflow-hidden shadow-2xl"
        >
          <div className="px-4 py-3 bg-[#0c0d1e] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              <span className="text-xs text-gray-400 font-mono ml-2 flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5 text-purple-400" /> zyt-mascot-kernel.jar
              </span>
            </div>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
              Spigot / Paper / Folia 1.20.6
            </span>
          </div>
          <div className="p-4 font-mono text-xs text-gray-300 space-y-1.5 bg-[#05060f]/95">
            <div className="text-purple-400">[ZYT CORE] 3D Mascot Skin Engine Loaded Successfully.</div>
            <div className="text-cyan-300">[ASYNC NMS] PacketEvents & Redis pub/sub synchronized. <span className="text-green-400">READY</span></div>
            <div className="text-emerald-400 font-bold">[SERVER STATUS] 20.0 TPS (0.10ms tick speed) - Enterprise Ready</div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto"
        >
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center group"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <IconComponent className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight text-glow-purple">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-gray-400 mt-1">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
