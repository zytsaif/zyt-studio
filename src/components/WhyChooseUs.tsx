import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Code2, Gauge, Headphones, RefreshCw, Award, CheckCircle2, ShieldCheck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      title: 'Fast Delivery',
      desc: 'Rapid development turnarounds with structured beta releases so your server launch stays on schedule.',
      icon: Zap,
      accent: 'text-amber-400',
      border: 'hover:border-amber-500/50',
    },
    {
      title: 'Clean Code',
      desc: 'Modular, object-oriented Java/Kotlin architecture following best Spigot & Paper API engineering patterns.',
      icon: Code2,
      accent: 'text-purple-400',
      border: 'hover:border-purple-500/50',
    },
    {
      title: 'Optimized Performance',
      desc: 'Async thread pools, zero GC memory churn, and non-blocking database queries to maintain 20.0 TPS.',
      icon: Gauge,
      accent: 'text-cyan-400',
      border: 'hover:border-cyan-500/50',
    },
    {
      title: 'Friendly Support',
      desc: 'Direct 1-on-1 Discord communication with prompt post-launch assistance and setup guidance.',
      icon: Headphones,
      accent: 'text-emerald-400',
      border: 'hover:border-emerald-500/50',
    },
    {
      title: 'Regular Updates',
      desc: 'Immediate updates whenever Minecraft releases major version patches or Mojang protocol updates.',
      icon: RefreshCw,
      accent: 'text-blue-400',
      border: 'hover:border-blue-500/50',
    },
    {
      title: 'Professional Quality',
      desc: 'Strict QA unit testing, anti-exploit protection, and battle-tested code built to scale.',
      icon: Award,
      accent: 'text-fuchsia-400',
      border: 'hover:border-fuchsia-500/50',
    },
  ];

  return (
    <section id="why-us" className="relative py-24 bg-[#070815] z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40">
            The Zyt Advantage
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-4">
            Why Choose <span className="gradient-text-purple">Zyt Studio</span>
          </h2>
          <p className="text-gray-400 mt-4 text-sm sm:text-base">
            We bridge the gap between high-level software engineering standards and Minecraft plugin development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => {
            const IconComp = item.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`glass-card p-8 rounded-3xl transition-all duration-300 group ${item.border}`}
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <IconComp className={`w-7 h-7 ${item.accent}`} />
                </div>

                <h3 className="text-xl font-bold text-white font-mono mb-3 group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
