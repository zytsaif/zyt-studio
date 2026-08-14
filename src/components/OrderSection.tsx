import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import { Sparkles, Disc as DiscordIcon, Mail, ArrowRight, ExternalLink, ShieldCheck, Users, Zap, MessageSquare } from 'lucide-react';

interface Props {
  onTriggerAdvancement?: (title: string, desc: string, icon?: 'trophy' | 'diamond' | 'discord' | 'shield') => void;
}

export const OrderSection: React.FC<Props> = ({ onTriggerAdvancement }) => {
  const store = useStore();
  const cmsSections = store?.cmsSections;
  const contact = cmsSections?.contact;

  const discordInvite = contact?.discordInvite || 'https://discord.gg';
  const email = contact?.email || 'contact@zytstudio.com';

  const scrollToContact = () => {
    const elem = document.getElementById('contact');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `mailto:${email}`;
    }
  };

  const handleDiscordClick = () => {
    if (onTriggerAdvancement) {
      onTriggerAdvancement('Joined Discord Server', 'Connecting to Zyt Studio Community Hub!', 'discord');
    }
  };

  return (
    <section id="order" className="relative py-28 bg-[#070815] z-10 border-t border-white/5 overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-600/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Live Developer Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4.5 py-2 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider mb-6 shadow-xl"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 -ml-5" />
          🟢 Status: Online & Available for Custom Projects
        </motion.div>

        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight"
        >
          Need a Custom <span className="gradient-text-purple">Minecraft Plugin?</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-300 mt-6 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans"
        >
          We create high-quality custom Minecraft plugins for servers, SMPs and content creators. To discuss your project, join our Discord server or contact us directly.
        </motion.p>

        {/* Discord Community Showcase Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 mb-10 text-left"
        >
          <div className="glass-card p-5 rounded-2xl border border-indigo-500/30 flex items-start gap-3.5">
            <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-800/40 text-indigo-400 shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-mono">1,250+ Members</div>
              <p className="text-xs text-gray-400 mt-0.5 font-sans">Active Minecraft server owner & developer community.</p>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-purple-500/30 flex items-start gap-3.5">
            <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-800/40 text-purple-400 shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-mono">Direct Support</div>
              <p className="text-xs text-gray-400 mt-0.5 font-sans">1-on-1 Discord communication & specs reviews.</p>
            </div>
          </div>

          <div className="glass-card p-5 rounded-2xl border border-cyan-500/30 flex items-start gap-3.5">
            <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-mono">20 TPS Guarantee</div>
              <p className="text-xs text-gray-400 mt-0.5 font-sans">Zero lag NMS packet architecture & memory tuning.</p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href={discordInvite}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDiscordClick}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-2xl shadow-indigo-600/40 transition-all flex items-center justify-center gap-3 font-mono btn-shimmer"
          >
            <DiscordIcon className="w-5 h-5 text-indigo-200" />
            Join Discord Server
            <ExternalLink className="w-4 h-4" />
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={scrollToContact}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-extrabold text-xs border border-white/10 hover:border-purple-500/50 transition-all flex items-center justify-center gap-2 font-mono"
          >
            <Mail className="w-5 h-5 text-cyan-400" />
            Contact Us
            <ArrowRight className="w-4 h-4 text-purple-400" />
          </motion.button>
        </motion.div>

        {/* Discord Invite Link Footer Display */}
        <div className="mt-10 pt-6 border-t border-white/5 inline-flex items-center justify-center gap-2 text-xs font-mono text-gray-400">
          <span>Official Discord Invite:</span>
          <a
            href={discordInvite}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDiscordClick}
            className="text-cyan-300 font-bold hover:underline"
          >
            {discordInvite}
          </a>
        </div>
      </div>
    </section>
  );
};
