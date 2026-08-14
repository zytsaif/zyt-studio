import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, Disc as DiscordIcon, Mail, ArrowRight, ExternalLink } from 'lucide-react';

export const OrderSection: React.FC = () => {
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

  return (
    <section id="order" className="relative py-28 bg-[#070815] z-10 border-t border-white/5 overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Section Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/70 border border-purple-800/40 text-purple-300 text-xs font-bold font-mono uppercase tracking-widest mb-6">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          Custom Minecraft Plugin Development
        </div>

        {/* Title */}
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Need a Custom <span className="gradient-text-purple">Minecraft Plugin?</span>
        </h2>

        {/* Description */}
        <p className="text-gray-300 mt-6 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
          We create high-quality custom Minecraft plugins for servers, SMPs and content creators. To discuss your project, join our Discord server or contact us directly.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <a
            href={discordInvite}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-indigo-600/40 hover:scale-[1.03] transition-all flex items-center justify-center gap-3 font-mono"
          >
            <DiscordIcon className="w-5 h-5 text-indigo-200" />
            Join Discord Server
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToContact}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-extrabold text-sm border border-white/10 hover:border-purple-500/50 hover:scale-[1.03] transition-all flex items-center justify-center gap-2 font-mono"
          >
            <Mail className="w-5 h-5 text-cyan-400" />
            Contact Us
            <ArrowRight className="w-4 h-4 text-purple-400" />
          </button>
        </div>

        {/* Discord Invite Link Footer Display */}
        <div className="mt-8 pt-6 border-t border-white/5 inline-flex items-center justify-center gap-2 text-xs font-mono text-gray-400">
          <span>Official Discord:</span>
          <a
            href={discordInvite}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-300 font-bold hover:underline"
          >
            {discordInvite}
          </a>
        </div>
      </div>
    </section>
  );
};
