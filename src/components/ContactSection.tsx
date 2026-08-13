import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, MessageSquare, ExternalLink, Copy, Check, Clock, ShieldCheck, Send } from 'lucide-react';

interface ContactSectionProps {
  onTriggerToast: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onTriggerToast }) => {
  const { contactSettings } = useStore();
  const [copiedDiscord, setCopiedDiscord] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyDiscord = () => {
    navigator.clipboard.writeText(contactSettings.discordUsername);
    setCopiedDiscord(true);
    onTriggerToast(`Discord copied: ${contactSettings.discordUsername}`);
    setTimeout(() => setCopiedDiscord(false), 2500);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactSettings.email);
    setCopiedEmail(true);
    onTriggerToast(`Email copied: ${contactSettings.email}`);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="relative py-24 bg-[#070815] z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-4">
            Contact <span className="gradient-text-purple">Zyt Studio</span>
          </h2>
          <p className="text-gray-400 mt-4 text-sm sm:text-base">
            Reach out directly via Discord or Email for consultations, server setups, or custom plugin specs.
          </p>
        </div>

        {/* Business Hours & Response Badge Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
          <div className="p-4 rounded-2xl glass-card border border-purple-500/30 flex items-center justify-between">
            <span className="text-xs text-gray-400 font-mono flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-purple-400" /> Response Time:
            </span>
            <span className="text-xs font-bold text-cyan-400 font-mono">{contactSettings.responseTime}</span>
          </div>

          <div className="p-4 rounded-2xl glass-card border border-cyan-500/30 flex items-center justify-between">
            <span className="text-xs text-gray-400 font-mono flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Business Hours:
            </span>
            <span className="text-xs font-bold text-emerald-400 font-mono">{contactSettings.businessHours}</span>
          </div>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Discord Contact Card */}
          <div className="glass-card rounded-3xl p-8 border border-indigo-500/30 shadow-2xl relative flex flex-col justify-between group hover:border-indigo-500/60">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                  <MessageSquare className="w-7 h-7 text-indigo-400" />
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-950/60 text-emerald-400 border border-emerald-800/40 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  🟢 Online & Available
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white font-mono mb-2">Discord Contact</h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-6">
                Join our Discord server or send a direct message for real-time plugin support and fast responses.
              </p>

              {/* Username Box */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between mb-6">
                <div>
                  <div className="text-[11px] text-gray-400">Discord Handle</div>
                  <div className="text-base font-bold text-white font-mono">{contactSettings.discordUsername}</div>
                </div>

                <button
                  onClick={handleCopyDiscord}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 transition-colors"
                  title="Copy Discord Username"
                >
                  {copiedDiscord ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
                </button>
              </div>
            </div>

            <a
              href={contactSettings.discordInvite}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              <MessageSquare className="w-4 h-4 text-white" />
              Join Discord
              <ExternalLink className="w-3.5 h-3.5 text-indigo-200" />
            </a>
          </div>

          {/* Email Contact Card */}
          <div className="glass-card rounded-3xl p-8 border border-cyan-500/30 shadow-2xl relative flex flex-col justify-between group hover:border-cyan-500/60">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center">
                  <Mail className="w-7 h-7 text-cyan-400" />
                </div>
                <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-purple-950/60 text-purple-300 border border-purple-800/40">
                  Business Email
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white font-mono mb-2">Email Contact</h3>
              <p className="text-xs text-gray-300 leading-relaxed mb-6">
                Prefer formal email communication? Send us your project specification files or server proposals.
              </p>

              {/* Email Address Box */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between mb-6">
                <div>
                  <div className="text-[11px] text-gray-400">Official Email</div>
                  <div className="text-base font-bold text-white font-mono">{contactSettings.email}</div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 transition-colors"
                  title="Copy Email Address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-cyan-400" />}
                </button>
              </div>
            </div>

            <a
              href={`mailto:${contactSettings.email}`}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/30"
            >
              <Send className="w-4 h-4 text-white" />
              Send Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
