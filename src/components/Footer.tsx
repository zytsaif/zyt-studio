import React from 'react';
import { useStore } from '../context/StoreContext';
import { MessageSquare, Mail, Globe, Play, ArrowUp, Lock } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const store = useStore();
  const cmsSections = store?.cmsSections;
  const webSettings = store?.websiteSettings;
  const contact = cmsSections?.contact || store?.contactSettings;
  const footer = cmsSections?.footer;

  const mascotUrl = cmsSections?.hero?.mascotUrl || webSettings?.mascotUrl || '/zyt_mascot.jpg';
  const tagline = footer?.tagline || webSettings?.footerText || 'Building Professional Minecraft Experiences.';
  const discordInvite = contact?.discordInvite || 'https://discord.gg';
  const email = contact?.email || 'contact@zytstudio.com';
  const githubLink = 'https://github.com';
  const youtubeLink = 'https://youtube.com';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#03040a] z-10 border-t border-white/10 pt-16 pb-12 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col with 3D Mascot */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 via-purple-600 to-cyan-500 p-[1.5px]">
                <img
                  src={mascotUrl}
                  alt="Zyt Mascot Logo"
                  className="w-full h-full object-cover rounded-[10px]"
                />
              </div>
              <span className="text-xl font-extrabold tracking-wider text-white font-mono">
                ZYT <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-400 to-cyan-400">STUDIO</span>
              </span>
            </div>

            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              {tagline} Specialized in custom Paper, Spigot, and Folia plugin development with enterprise-grade stability.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={discordInvite}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-purple-600/30 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                aria-label="Discord"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${email}`}
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-cyan-600/30 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={githubLink}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href={youtubeLink}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-red-600/30 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                aria-label="Youtube"
              >
                <Play className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#hero" className="hover:text-cyan-400 transition-colors">Home</a></li>
              <li><a href="#plugins" className="hover:text-cyan-400 transition-colors">Plugins</a></li>
              <li><a href="#portfolio" className="hover:text-cyan-400 transition-colors">Portfolio</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Services</a></li>
            </ul>
          </div>

          {/* Support & Admin Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono mb-4">
              Support & Admin
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#order" className="hover:text-purple-400 transition-colors">Request Custom Plugin</a></li>
              <li><a href="#payment" className="hover:text-purple-400 transition-colors">Payment Methods</a></li>
              <li><a href="#reviews" className="hover:text-purple-400 transition-colors">Client Reviews</a></li>
              <li>
                <button
                  onClick={onOpenAdmin}
                  className="hover:text-purple-400 transition-colors flex items-center gap-1 font-mono text-cyan-400"
                >
                  <Lock className="w-3 h-3" /> Admin Portal (/admin)
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Scroll Top Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>{footer?.copyright || '© 2026 Zyt Studio. All Rights Reserved.'}</p>

          <div className="flex items-center gap-6">
            <span className="text-gray-500 text-[11px]">Designed for Minecraft Server Owners</span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4 text-cyan-400" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
