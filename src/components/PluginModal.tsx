import React, { useState } from 'react';
import type { PluginItem } from '../data/pluginsData';
import { X, CheckCircle2, ShieldCheck, Copy, Check, Zap, Sparkles } from 'lucide-react';

interface PluginModalProps {
  plugin: PluginItem | null;
  onClose: () => void;
  onOrderCustom: () => void;
  onTriggerToast: (msg: string) => void;
}

export const PluginModal: React.FC<PluginModalProps> = ({
  plugin,
  onClose,
  onOrderCustom,
  onTriggerToast,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'commands' | 'config'>('overview');
  const [copied, setCopied] = useState(false);

  if (!plugin) return null;

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(plugin.configSnippet);
    setCopied(true);
    onTriggerToast('Config snippet copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl glass-panel rounded-3xl border border-purple-500/30 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-purple-950/40 via-slate-900 to-cyan-950/40 border-b border-white/10 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 p-[1px] flex items-center justify-center shadow-lg">
              <div className="w-full h-full bg-[#0c0d1b] rounded-[15px] flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-bold text-white font-mono">{plugin.name}</h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {plugin.category}
                </span>
              </div>
              <p className="text-sm text-gray-300 mt-1">{plugin.tagline}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-white/10 bg-[#080914]">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 ${
              activeTab === 'overview'
                ? 'border-purple-500 text-white bg-white/5'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            Overview & Specs
          </button>
          <button
            onClick={() => setActiveTab('commands')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 ${
              activeTab === 'commands'
                ? 'border-purple-500 text-white bg-white/5'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            Commands & Permissions
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors border-b-2 ${
              activeTab === 'config'
                ? 'border-purple-500 text-white bg-white/5'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            YAML Config Sample
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-[#090a16]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <p className="text-sm text-gray-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                {plugin.description}
              </p>

              {/* Version & Price Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs text-gray-400 font-mono">Supported Versions</div>
                  <div className="text-sm font-semibold text-white font-mono mt-0.5">
                    {plugin.minecraftVersion}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs text-gray-400 font-mono">Rating & Satisfaction</div>
                  <div className="text-sm font-semibold text-yellow-400 font-mono mt-0.5 flex items-center gap-1">
                    ★ {plugin.rating} / 5.0 ({plugin.salesCount}+ licenses)
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 col-span-2 sm:col-span-1">
                  <div className="text-xs text-purple-300 font-mono">Price</div>
                  <div className="text-xl font-bold text-cyan-400 font-mono flex items-baseline gap-2">
                    <span>{plugin.price}</span>
                    {plugin.inrPrice && (
                      <span className="text-xs text-gray-400 font-semibold font-mono">
                        ({plugin.inrPrice})
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Comprehensive Features List */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-3 font-mono">
                  Full Feature Architecture
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {plugin.fullFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'commands' && (
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-2 font-mono">
                Available Command Nodes
              </h4>
              {plugin.commands.map((cmd, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-cyan-400 font-bold">{cmd.command}</span>
                    <span className="text-[11px] font-mono bg-purple-950/60 text-purple-300 px-2 py-0.5 rounded border border-purple-800/40">
                      {cmd.permission}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300">{cmd.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'config' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-gray-400">config.yml snippet</span>
                <button
                  onClick={handleCopyConfig}
                  className="px-3 py-1 text-xs rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-colors font-mono"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                  {copied ? 'Copied' : 'Copy Config'}
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-[#04050b] border border-white/10 font-mono text-xs text-purple-300 overflow-x-auto">
                {plugin.configSnippet}
              </pre>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-950 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-400 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Instant License Key Delivery & Lifetime Spigot Updates</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOrderCustom();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs font-mono shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-cyan-300" />
              Order Plugin ({plugin.price} {plugin.inrPrice ? `/ ${plugin.inrPrice}` : ''})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
