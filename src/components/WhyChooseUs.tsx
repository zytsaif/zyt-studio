import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import { Zap, Code2, Gauge, Headphones, RefreshCw, Award } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const { cmsSections } = useStore();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return Zap;
      case 'Code2': return Code2;
      case 'Gauge': return Gauge;
      case 'Headphones': return Headphones;
      case 'RefreshCw': return RefreshCw;
      case 'Award': return Award;
      default: return Zap;
    }
  };

  return (
    <section id="why-us" className="relative py-24 bg-[#070815] z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40">
            {cmsSections.about.subtitle}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-4">
            {cmsSections.about.title}
          </h2>
          <p className="text-gray-400 mt-4 text-sm sm:text-base">
            {cmsSections.about.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cmsSections.about.cards.map((item, idx) => {
            const IconComp = getIcon(item.icon);

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="glass-card p-8 rounded-3xl transition-all duration-300 group hover:border-purple-500/50"
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
