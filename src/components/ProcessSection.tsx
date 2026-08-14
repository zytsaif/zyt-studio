import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Code2, ShieldCheck, Rocket, ArrowRight } from 'lucide-react';
import { TiltCard } from './TiltCard';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Idea & Specs',
      desc: 'We review your plugin requirements, features, NMS events, and design a custom paper/spigot architecture.',
      icon: Lightbulb,
      color: 'text-amber-400',
      border: 'border-amber-500/40',
      bg: 'bg-amber-950/30',
    },
    {
      num: '02',
      title: 'Async Development',
      desc: 'Clean code built with Paper/Folia APIs, packet listeners, database pools, and zero main thread blockings.',
      icon: Code2,
      color: 'text-purple-400',
      border: 'border-purple-500/40',
      bg: 'bg-purple-950/30',
    },
    {
      num: '03',
      title: '20.0 TPS Testing',
      desc: 'Tested under heavy player loads, packet stress, and benchmarked for zero tick spikes.',
      icon: ShieldCheck,
      color: 'text-cyan-400',
      border: 'border-cyan-500/40',
      bg: 'bg-cyan-950/30',
    },
    {
      num: '04',
      title: 'Delivery & Support',
      desc: 'Jar delivery, detailed config setup, permissions guide, and 24/7 Discord developer updates.',
      icon: Rocket,
      color: 'text-emerald-400',
      border: 'border-emerald-500/40',
      bg: 'bg-emerald-950/30',
    },
  ];

  return (
    <section id="process" className="relative py-28 bg-[#050610] z-10 border-t border-white/5 overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-4 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800/40 font-mono shadow-lg">
            Engineering Workflow
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-5 font-sans">
            Our Development <span className="gradient-text-purple">Process</span>
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg leading-relaxed">
            From initial idea to 20 TPS production deployment on your server, here is how we build custom plugins.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative"
        >
          {steps.map((step, idx) => {
            const IconComp = step.icon;

            return (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <TiltCard className={`glass-card p-8 rounded-3xl border ${step.border} ${step.bg} relative h-full flex flex-col justify-between group hover:shadow-2xl`}>
                  {/* Step Number Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform ${step.color}`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-extrabold font-mono text-white/20 group-hover:text-purple-400/60 transition-colors">
                      {step.num}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white font-mono mb-2 group-hover:text-purple-300 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed font-sans">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-gray-400">
                    <span>Phase {step.num}</span>
                    <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
