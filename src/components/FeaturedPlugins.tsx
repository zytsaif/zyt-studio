import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import type { PluginItem } from '../data/pluginsData';
import { Video, Skull, Disc, Swords, Trophy, ShieldCheck, ArrowRight, Check, Sparkles, Filter, Eye } from 'lucide-react';

interface FeaturedPluginsProps {
  onSelectPlugin: (plugin: PluginItem) => void;
  onOrderCustom: (pluginName: string) => void;
}

export const FeaturedPlugins: React.FC<FeaturedPluginsProps> = ({
  onSelectPlugin,
  onOrderCustom,
}) => {
  const { plugins } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Utility', 'PvP & Games', 'SMP & Economy'];

  const filteredPlugins =
    selectedCategory === 'All'
      ? plugins
      : plugins.filter((p) => p.category === selectedCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Video': return Video;
      case 'Skull': return Skull;
      case 'Disc': return Disc;
      case 'Swords': return Swords;
      case 'Trophy': return Trophy;
      case 'ShieldCheck': return ShieldCheck;
      default: return Sparkles;
    }
  };

  return (
    <section id="plugins" className="relative py-24 bg-[#05060e]/90 z-10 border-t border-white/5">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40">
            Premium Spigot & Paper Assets
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-4">
            Featured <span className="gradient-text-purple">Minecraft Plugins</span>
          </h2>
          <p className="text-gray-400 mt-4 text-sm sm:text-base">
            High-performance, battle-tested plugin suites created for top Minecraft servers and content creators worldwide.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Plugin Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlugins.map((plugin, index) => {
            const IconComp = getIcon(plugin.iconName);

            return (
              <motion.div
                key={plugin.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card rounded-3xl p-6 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Stripe */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-purple-500 to-cyan-500 opacity-70 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600/30 to-cyan-500/20 border border-purple-500/30 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6 text-cyan-400" />
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-gray-400">Price</div>
                      <div className="text-lg font-bold text-white font-mono text-glow-cyan">
                        {plugin.price}
                      </div>
                    </div>
                  </div>

                  {/* Plugin Name & Version */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors font-mono">
                      {plugin.name}
                    </h3>
                    <span className="text-[10px] font-mono bg-white/5 border border-white/10 text-gray-300 px-2 py-0.5 rounded">
                      {plugin.minecraftVersion}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-400 leading-relaxed mb-6 line-clamp-3">
                    {plugin.description}
                  </p>

                  {/* Features Bullet Points */}
                  <div className="space-y-2 mb-6">
                    {plugin.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-gray-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                  <button
                    onClick={() => onSelectPlugin(plugin)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-purple-400" />
                    View Details
                  </button>

                  <button
                    onClick={() => onOrderCustom(plugin.name)}
                    className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold text-xs hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center"
                  >
                    Order Now
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
