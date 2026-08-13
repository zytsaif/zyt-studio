import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, Menu, X, ArrowRight, ShieldCheck, Lock } from 'lucide-react';

interface NavbarProps {
  onOrderClick: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOrderClick, onOpenAdmin }) => {
  const { websiteSettings, isAdmin } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Plugins', href: '#plugins' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Payment', href: '#payment' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#060712]/90 backdrop-blur-md border-b border-purple-900/30 py-3 shadow-xl shadow-purple-950/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with 3D Mascot */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 via-purple-600 to-cyan-500 p-[1.5px] shadow-lg shadow-purple-500/25 group-hover:scale-105 transition-transform duration-300">
            <img
              src={websiteSettings.mascotUrl}
              alt="Zyt Studio Mascot"
              className="w-full h-full object-cover rounded-[10px]"
            />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold tracking-wider text-white font-mono">
                ZYT <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-400 to-cyan-400">STUDIO</span>
              </span>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-purple-300/80 font-bold -mt-1">
              Minecraft Dev
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border border-white/10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Admin Dashboard Access */}
          <button
            onClick={onOpenAdmin}
            className={`p-2.5 rounded-xl border text-xs font-mono font-semibold flex items-center gap-1.5 transition-all ${
              isAdmin
                ? 'bg-purple-950/60 border-purple-500/50 text-purple-300 hover:bg-purple-900/60'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
            title="Admin Dashboard (/admin)"
          >
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            {isAdmin ? 'Admin Dashboard' : '/admin'}
          </button>

          {/* Order Custom Plugin Button */}
          <button
            onClick={onOrderClick}
            className="relative group overflow-hidden rounded-xl p-[1px] font-semibold text-xs transition-all duration-300 active:scale-95 shadow-lg shadow-purple-600/25"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-red-500 via-purple-600 to-cyan-500 rounded-xl group-hover:opacity-100 opacity-90 transition-opacity"></span>
            <span className="relative px-5 py-2.5 rounded-[11px] bg-[#0b0c1a] group-hover:bg-opacity-80 flex items-center gap-2 text-white font-medium transition-all">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              Order Plugin
              <ArrowRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden glass-panel border-b border-purple-900/30 px-6 py-6 mt-3 space-y-4 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 text-sm font-medium text-gray-200 hover:text-white hover:bg-purple-900/20 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-white/10 text-gray-300 text-xs font-mono font-semibold flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4 text-cyan-400" />
              Admin Portal (/admin)
            </button>

            <button
              onClick={() => {
                setMobileOpen(false);
                onOrderClick();
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-500 via-purple-600 to-cyan-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              Order Custom Plugin
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
