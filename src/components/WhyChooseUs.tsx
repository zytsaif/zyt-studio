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
    <section id="why-us" className="relative py-28 bg-[#070815] z-10 border-t border-white/5 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400 px-4 py-1.5 rounded-full bg-purple-950/70 border border-purple-800/40 font-mono shadow-lg">
            {cmsSections.about.subtitle}
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-5">
            {cmsSections.about.title}
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg leading-relaxed">
            {cmsSections.about.description}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {cmsSections.about.cards.map((item, idx) => {
            const IconComp = getIcon(item.icon);

            return (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 35 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                whileHover={{ y: -6, scale: 1.015 }}
                className="glass-card p-8 rounded-3xl transition-all duration-300 group hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-600/20"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-purple-500/40 transition-all shadow-md">
                  <IconComp className={`w-7 h-7 ${item.accent}`} />
                </div>

                <h3 className="text-xl font-bold text-white font-mono mb-3 group-hover:text-purple-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
