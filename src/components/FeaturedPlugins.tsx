import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import type { PluginItem } from '../data/pluginsData';
import { InlineEditableText } from './InlineEditableText';
import { TiltCard } from './TiltCard';
import { MagneticButton } from './MagneticButton';
import { Video, Skull, Disc, Swords, Trophy, ShieldCheck, ArrowRight, Check, Sparkles, Eye, Plus, Trash2, ArrowUp, ArrowDown, Award } from 'lucide-react';

interface FeaturedPluginsProps {
  onSelectPlugin: (plugin: PluginItem) => void;
  onOrderCustom: (pluginName: string) => void;
}

export const FeaturedPlugins: React.FC<FeaturedPluginsProps> = ({
  onSelectPlugin,
  onOrderCustom,
}) => {
  const { plugins, updatePlugin, deletePlugin, addPlugin, reorderPlugins, isEditMode } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Utility', 'PvP & Games', 'SMP & Economy', 'Recording / Cinematic Tools'];

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

  const getRarityInfo = (plg: PluginItem) => {
    const priceNum = parseFloat(plg.price.replace(/[^0-9.]/g, '')) || 0;
    if (plg.name.includes('Mocap') || priceNum >= 35) {
      return {
        tier: 'LEGENDARY',
        badgeClass: 'bg-amber-950/90 text-amber-300 border-amber-500/60 shadow-amber-500/20',
        cardGlow: 'hover:border-amber-500/70 hover:shadow-amber-500/25',
        iconBg: 'bg-amber-950/50 border-amber-500/40 text-amber-400',
      };
    }
    if (priceNum >= 20 || plg.name.includes('Economy')) {
      return {
        tier: 'EPIC',
        badgeClass: 'bg-purple-950/90 text-purple-300 border-purple-500/60 shadow-purple-500/20',
        cardGlow: 'hover:border-purple-500/70 hover:shadow-purple-500/25',
        iconBg: 'bg-purple-950/50 border-purple-500/40 text-purple-400',
      };
    }
    if (priceNum >= 10 || plg.name.includes('Kits')) {
      return {
        tier: 'RARE',
        badgeClass: 'bg-cyan-950/90 text-cyan-300 border-cyan-500/60 shadow-cyan-500/20',
        cardGlow: 'hover:border-cyan-500/70 hover:shadow-cyan-500/25',
        iconBg: 'bg-cyan-950/50 border-cyan-500/40 text-cyan-400',
      };
    }
    return {
      tier: 'COMMON',
      badgeClass: 'bg-emerald-950/90 text-emerald-300 border-emerald-500/60 shadow-emerald-500/20',
      cardGlow: 'hover:border-emerald-500/70 hover:shadow-emerald-500/25',
      iconBg: 'bg-emerald-950/50 border-emerald-500/40 text-emerald-400',
    };
  };

  const movePlugin = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= plugins.length) return;
    const updated = [...plugins];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    reorderPlugins(updated);
  };

  const handleAddNewPlugin = () => {
    const newPlugin: PluginItem = {
      id: 'plugin_' + Date.now(),
      name: 'Mocap Studio',
      tagline: 'Cinematic Motion Capture & Player Keyframe Suite',
      description: 'Cinematic motion capture, camera path recording, & replay tools for Minecraft animation & content creation.',
      category: 'Recording / Cinematic Tools',
      minecraftVersion: '1.18 - 1.20.6',
      price: '$39.99',
      rating: 5.0,
      salesCount: 1,
      iconName: 'Video',
      features: ['Motion Capture Pose Recording', '60 FPS Keyframe Interpolation', 'Export to Blockbench & Blender'],
      fullFeatures: ['Motion Capture Pose Recording', '60 FPS Keyframe Interpolation', 'Export to Blockbench & Blender'],
      commands: [{ command: '/mocap record', permission: 'mocap.admin', description: 'Start recording' }],
      configSnippet: 'mocap:\n  fps: 60',
    };
    addPlugin(newPlugin);
  };

  // Motion Container Variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="plugins" className="relative py-28 bg-[#05060e]/95 z-10 border-t border-white/5">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-4 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800/40 font-mono shadow-lg">
            Premium Spigot & Paper Assets
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-5">
            Featured <span className="gradient-text-purple">Minecraft Plugins</span>
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg leading-relaxed">
            High-performance, battle-tested plugin suites created for top Minecraft networks, SMPs and content creators worldwide.
          </p>

          {/* Add Plugin Quick Action in Edit Mode */}
          {isEditMode && (
            <div className="mt-4">
              <button
                onClick={handleAddNewPlugin}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 flex items-center gap-2 mx-auto animate-bounce font-mono"
              >
                <Plus className="w-4 h-4" /> Add Mocap Studio / New Plugin Card
              </button>
            </div>
          )}

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-xl shadow-purple-600/30 border border-purple-400/50 scale-105'
                    : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 hover:border-purple-500/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Plugin Cards Staggered Grid with 3D Cursor Tilt */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredPlugins.map((plugin, idx) => {
              const IconComponent = getIcon(plugin.iconName);
              const rarity = getRarityInfo(plugin);

              return (
                <motion.div key={plugin.id} layout variants={cardVariants}>
                  <TiltCard
                    className={`glass-card rounded-3xl p-8 flex flex-col justify-between border border-white/10 transition-all duration-300 group hover:shadow-2xl relative h-full ${rarity.cardGlow}`}
                  >
                    {/* Visual Admin Controls on Card */}
                    {isEditMode && (
                      <div className="absolute -top-3 -right-3 z-30 flex items-center gap-1 bg-[#090a1a] p-1.5 rounded-xl border border-purple-500/50 shadow-xl">
                        <button
                          onClick={() => movePlugin(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 rounded bg-white/10 text-cyan-300 disabled:opacity-30"
                          title="Move Left/Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => movePlugin(idx, 'down')}
                          disabled={idx === plugins.length - 1}
                          className="p-1 rounded bg-white/10 text-cyan-300 disabled:opacity-30"
                          title="Move Right/Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deletePlugin(plugin.id)}
                          className="p-1 rounded bg-red-950/80 text-red-300 border border-red-800"
                          title="Delete Plugin Card"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    <div>
                      {/* Top Rarity Badge & Price */}
                      <div className="flex items-center justify-between mb-6">
                        <div className={`w-13 h-13 rounded-2xl border flex items-center justify-center group-hover:scale-110 transition-all shadow-md ${rarity.iconBg}`}>
                          <IconComponent className="w-6 h-6" />
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Minecraft Plugin Rarity Pill */}
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold font-mono uppercase tracking-wider border shadow-md flex items-center gap-1 ${rarity.badgeClass}`}>
                            <Award className="w-3 h-3" /> {rarity.tier}
                          </span>

                          <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold font-mono bg-purple-950/90 text-cyan-300 border border-purple-500/40 shadow-lg">
                            <InlineEditableText
                              value={plugin.price}
                              onSave={(val) => updatePlugin({ ...plugin, price: val })}
                            />
                          </span>
                        </div>
                      </div>

                      {/* Plugin Name */}
                      <h3 className="text-2xl font-extrabold text-white font-mono mb-2 group-hover:text-purple-300 transition-colors">
                        <InlineEditableText
                          value={plugin.name}
                          onSave={(val) => updatePlugin({ ...plugin, name: val })}
                          tagName="span"
                        />
                      </h3>

                      {/* Description */}
                      <div className="text-xs text-gray-300 leading-relaxed mb-6">
                        <InlineEditableText
                          value={plugin.description}
                          multiline
                          onSave={(val) => updatePlugin({ ...plugin, description: val })}
                        />
                      </div>

                      {/* Feature Checklist */}
                      <ul className="space-y-2 mb-8">
                        {plugin.features.map((feat, fIdx) => (
                          <li key={fIdx} className="text-xs text-gray-300 flex items-center gap-2">
                            <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bottom Actions with Micro Interactions */}
                    <div className="pt-5 border-t border-white/10 flex items-center justify-between gap-3">
                      <button
                        onClick={() => onSelectPlugin(plugin)}
                        className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs font-mono transition-all flex items-center justify-center gap-1.5 hover:border-white/20 border border-transparent"
                      >
                        <Eye className="w-4 h-4 text-cyan-400" /> View Specs
                      </button>

                      <MagneticButton
                        onClick={() => onOrderCustom(plugin.name)}
                        className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs font-mono transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-purple-600/30"
                      >
                        Order
                        <ArrowRight className="w-3.5 h-3.5 text-white" />
                      </MagneticButton>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
