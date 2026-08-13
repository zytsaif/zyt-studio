import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES_DATA } from '../data/servicesData';
import { Code, Server, Bug, Zap, Sliders, CheckCircle, ArrowRight, Sparkles, Clock } from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesProps> = ({ onSelectService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code': return Code;
      case 'Server': return Server;
      case 'Bug': return Bug;
      case 'Zap': return Zap;
      case 'Sliders': return Sliders;
      default: return Sparkles;
    }
  };

  return (
    <section id="services" className="relative py-24 bg-[#05060e] z-10 border-t border-white/5">
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40">
            Tailored Development Services
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-4">
            Professional <span className="gradient-text-purple">Services</span>
          </h2>
          <p className="text-gray-400 mt-4 text-sm sm:text-base">
            From ground-up plugin coding to full server optimization, Zyt Studio provides end-to-end Minecraft development solutions.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, idx) => {
            const IconComp = getIcon(service.iconName);

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`glass-card rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group ${
                  service.popular ? 'border-purple-500/50 shadow-2xl shadow-purple-900/20' : ''
                }`}
              >
                {service.popular && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600/30 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <IconComp className="w-7 h-7 text-cyan-400" />
                  </div>

                  <h3 className="text-2xl font-bold text-white font-mono mb-3 group-hover:text-purple-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-gray-300 leading-relaxed mb-6">
                    {service.fullDesc}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    {service.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-gray-300">
                        <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-[11px] text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-purple-400" /> Turnaround: {service.deliveryTime}
                    </div>
                    <div className="text-base font-bold text-cyan-400 font-mono">
                      {service.priceStart}
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectService(service.title)}
                    className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-purple-600 hover:text-white border border-white/10 text-gray-200 text-xs font-semibold transition-all flex items-center gap-1.5"
                  >
                    Inquire
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
