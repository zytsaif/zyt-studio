import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import { InlineEditableText } from './InlineEditableText';
import { EditableImage } from './EditableImage';
import { AnimatedCounter } from './AnimatedCounter';
import { ArrowRight, Sparkles, Code, Cpu, ShieldCheck, Star, Terminal, Layers, MessageSquare, ExternalLink } from 'lucide-react';

interface HeroProps {
  onOrderClick: () => void;
  onViewWorkClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderClick, onViewWorkClick }) => {
  const store = useStore();
  const cmsSections = store?.cmsSections;
  const hero = cmsSections?.hero;
  const webSettings = store?.websiteSettings;
  const contact = cmsSections?.contact || store?.contactSettings;
  const updateSection = store?.updateSection;

  const title = hero?.title || webSettings?.heroTitle || 'Professional Minecraft Plugin Development';
  const description = hero?.description || webSettings?.heroSubheading || 'Custom Plugins, Premium Systems, Server Solutions & Minecraft Development Services engineered for 20 TPS performance.';
  const mascotUrl = hero?.mascotUrl || webSettings?.mascotUrl || '/zyt_mascot.jpg';
  const badgeText = hero?.badgeText || 'Next-Gen Minecraft Studio & Paper/Spigot Architecture';
  const primaryBtnText = hero?.primaryBtnText || 'Order Custom Plugin';
  const secondaryBtnText = hero?.secondaryBtnText || 'View Portfolio';
  const discordBtnText = hero?.discordBtnText || 'Join Discord';
  const discordInvite = contact?.discordInvite || 'https://discord.gg';

  const stats = [
    { label: 'Plugins Created', value: '50+', icon: Code, color: 'text-purple-400' },
    { label: 'Happy Clients', value: '100+', icon: Star, color: 'text-cyan-400' },
    { label: 'Years Experience', value: '5+', icon: Cpu, color: 'text-red-400' },
    { label: 'Support & Updates', value: '24/7', icon: ShieldCheck, color: 'text-emerald-400' },
  ];

  // Motion Variants for Text Reveal
  const wordVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.15 + i * 0.05,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const titleWords = title.split(' ');

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-24 flex items-center justify-center overflow-hidden">
      {/* Dynamic Animated Ambient Radial Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-purple-600/20 rounded-full blur-[170px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 left-1/5 w-[480px] h-[480px] bg-red-600/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/5 w-[580px] h-[580px] bg-cyan-500/15 rounded-full blur-[170px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Top Mascot Display with 3D Floating & Lighting Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: -30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative inline-block mb-8 group"
        >
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 mx-auto rounded-3xl p-[2.5px] bg-gradient-to-r from-red-500 via-purple-600 to-cyan-500 shadow-2xl shadow-purple-600/40 group-hover:scale-105 transition-transform duration-500 animate-float">
            <EditableImage
              src={mascotUrl}
              alt="Zyt Studio 3D Mascot"
              onSave={(newUrl) => updateSection?.('hero', { mascotUrl: newUrl })}
              className="w-full h-full object-cover rounded-[22px] border border-white/20 animate-mascot-glow"
            />
            <span className="absolute -bottom-2 -right-2 px-3 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider bg-cyan-950/90 text-cyan-300 border border-cyan-400/40 shadow-xl pointer-events-none backdrop-blur-md">
              3D Mascot
            </span>
          </div>
        </motion.div>

        {/* Top Badge Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full glass-panel border border-purple-500/40 text-purple-300 text-xs font-semibold tracking-wide mb-6 shadow-xl hover:border-purple-400 transition-colors font-mono"
        >
          <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-ping" />
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <InlineEditableText
            value={badgeText}
            onSave={(val) => updateSection?.('hero', { badgeText: val })}
          />
        </motion.div>

        {/* Main Heading Word-by-Word Stagger Reveal Animation */}
        <motion.h1
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.12] flex flex-wrap justify-center gap-x-3 gap-y-1"
        >
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={wordVariants}
              className={i >= titleWords.length - 2 ? 'gradient-text-purple' : ''}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Sub Heading Fade */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto font-normal leading-relaxed"
        >
          <InlineEditableText
            value={description}
            multiline
            onSave={(val) => updateSection?.('hero', { description: val })}
          />
        </motion.div>

        {/* Action Buttons with Interactive Hover & Micro Animations */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-5"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onViewWorkClick}
            className="px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs font-mono backdrop-blur-xl transition-all hover:border-purple-400/60 flex items-center justify-center gap-2 group shadow-xl"
          >
            <Layers className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            <InlineEditableText
              value={secondaryBtnText}
              onSave={(val) => updateSection?.('hero', { secondaryBtnText: val })}
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOrderClick}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-500 via-purple-600 to-cyan-500 text-white font-extrabold text-xs font-mono shadow-2xl shadow-purple-600/40 hover:shadow-purple-500/60 transition-all flex items-center justify-center gap-2.5 btn-shimmer group"
          >
            <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
            <InlineEditableText
              value={primaryBtnText}
              onSave={(val) => updateSection?.('hero', { primaryBtnText: val })}
            />
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform duration-300" />
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={discordInvite}
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-4 rounded-2xl bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-500/50 hover:border-indigo-400 text-indigo-200 hover:text-white font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 shadow-xl group"
          >
            <MessageSquare className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
            <InlineEditableText
              value={discordBtnText}
              onSave={(val) => updateSection?.('hero', { discordBtnText: val })}
            />
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </motion.a>
        </motion.div>

        {/* Plugin Diagnostic Terminal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-14 max-w-2xl mx-auto rounded-2xl glass-panel border border-white/10 text-left overflow-hidden shadow-2xl hover:border-purple-500/40 transition-colors"
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

        {/* Animated Statistics Counters */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto"
        >
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.25 }}
                className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center group cursor-default"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:border-purple-500/50 transition-all">
                  <IconComponent className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight text-glow-purple">
                  <AnimatedCounter value={stat.value} duration={2.5} />
                </div>
                <div className="text-xs sm:text-sm font-medium text-gray-400 mt-1 font-mono">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
