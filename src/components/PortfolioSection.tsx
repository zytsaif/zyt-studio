import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import type { PortfolioProject } from '../data/portfolioData';
import { ChevronRight, Sparkles, Terminal, Activity } from 'lucide-react';

interface PortfolioProps {
  onOrderClick: () => void;
}

export const PortfolioSection: React.FC<PortfolioProps> = ({ onOrderClick }) => {
  const { portfolio } = useStore();
  const [selectedProject, setSelectedProject] = useState<PortfolioProject>(portfolio[0] || {} as PortfolioProject);

  const activeProject = portfolio.find((p) => p.id === selectedProject?.id) || portfolio[0];

  if (!activeProject) return null;

  return (
    <section id="portfolio" className="relative py-28 bg-[#070815] z-10 border-t border-white/5 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400 px-4 py-1.5 rounded-full bg-purple-950/70 border border-purple-800/40 font-mono shadow-lg">
            Case Studies & Architecture
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-5">
            My <span className="gradient-text-cyan">Work</span>
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg leading-relaxed">
            Explore custom Minecraft systems built for top networks, creators, and servers. Hand-crafted with enterprise standards.
          </p>
        </motion.div>

        {/* Featured Case Study Hero Box */}
        <motion.div
          key={activeProject.id}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="glass-card rounded-3xl p-6 sm:p-10 border border-purple-500/30 mb-14 relative overflow-hidden bg-gradient-to-br from-[#0e0f22] via-[#090a18] to-[#04050d] shadow-2xl shadow-purple-950/40"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Terminal className="w-64 h-64 text-purple-400" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                  {activeProject.badge || 'Featured Case Study'}
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  Client: <strong className="text-gray-200">{activeProject.client}</strong>
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                {activeProject.title}
              </h3>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                {activeProject.description}
              </p>

              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/5">
                {activeProject.details}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {activeProject.tags?.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-purple-950/40 text-purple-300 border border-purple-800/40"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {activeProject.stats && activeProject.stats.length > 0 && (
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                  {activeProject.stats.map((st, sIdx) => (
                    <div key={sIdx} className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="text-xs text-gray-400 font-mono">{st.label}</div>
                      <div className="text-lg font-bold text-white font-mono mt-0.5 text-glow-cyan">
                        {st.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5 font-bold">
                    <Activity className="w-4 h-4 text-cyan-400 animate-pulse" /> Live Server Diagnostic
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40 font-bold">
                    STABLE 20.0 TPS
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-gray-300">
                    <span>Target Engine:</span>
                    <span className="text-purple-300 font-bold">Paper / Folia 1.20+</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-300">
                    <span>Execution Thread:</span>
                    <span className="text-purple-300 font-bold">Async Thread Pool</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-300">
                    <span>Packet Speed:</span>
                    <span className="text-cyan-400 font-bold">&lt; 0.15ms</span>
                  </div>
                </div>

                <div className="pt-3">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={onOrderClick}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold text-xs font-mono shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 btn-shimmer"
                  >
                    <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
                    Request Similar Architecture
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project Selector Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {portfolio.map((project) => {
            const isSelected = activeProject.id === project.id;

            return (
              <motion.div
                key={project.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                whileHover={{ y: -6, scale: 1.015 }}
                onClick={() => setSelectedProject(project)}
                className={`glass-card p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'border-purple-500 bg-purple-950/40 shadow-xl shadow-purple-900/30 ring-1 ring-purple-500'
                    : 'hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-purple-400 font-mono">{project.category}</span>
                  <span className="text-[11px] text-gray-400 font-mono">{project.client}</span>
                </div>

                <h4 className="text-xl font-bold text-white font-mono mb-2">{project.title}</h4>

                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-white/10 font-mono">
                  <span className="text-xs text-cyan-400">
                    {project.stats && project.stats[0] ? `${project.stats[0].label}: ${project.stats[0].value}` : 'Case Study Specs'}
                  </span>
                  <span className="text-xs text-purple-300 flex items-center gap-1 font-semibold">
                    View Specs <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
