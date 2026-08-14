import React, { useState, useEffect } from 'react';
import type { PluginItem } from '../data/pluginsData';
import { ImageUploader } from './ImageUploader';
import { Package, X, Save, DollarSign, Download, Sparkles, Code, Check } from 'lucide-react';

interface EditPluginModalProps {
  plugin: PluginItem | null;
  onClose: () => void;
  onSave: (plugin: PluginItem) => void;
  onTriggerToast: (msg: string) => void;
}

export const EditPluginModal: React.FC<EditPluginModalProps> = ({
  plugin,
  onClose,
  onSave,
  onTriggerToast,
}) => {
  const [formData, setFormData] = useState<PluginItem | null>(null);
  const [featureInput, setFeatureInput] = useState('');

  useEffect(() => {
    if (plugin) {
      setFormData({ ...plugin });
      setFeatureInput(plugin.features ? plugin.features.join(', ') : '');
    }
  }, [plugin]);

  if (!plugin || !formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedFeatures = featureInput
      ? featureInput.split(',').map((f) => f.trim()).filter(Boolean)
      : formData.features;

    const updatedPlugin: PluginItem = {
      ...formData,
      features: updatedFeatures,
    };

    onSave(updatedPlugin);
    onTriggerToast(`Successfully saved plugin: ${formData.name}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl max-h-[90vh] glass-panel rounded-3xl border border-purple-500/40 overflow-hidden shadow-2xl flex flex-col bg-[#070818] text-gray-100">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0c0d22] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
              <Package className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-mono">
                {plugin.id.startsWith('plugin_') ? 'Add New Plugin Card' : `Edit Plugin: ${formData.name}`}
              </h3>
              <p className="text-[11px] text-gray-400">Modify metadata, features, pricing & download links</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Fields Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Plugin Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Mocap"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">Price *</label>
              <input
                type="text"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="e.g. $39.99"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input font-mono text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input font-mono text-xs bg-[#0c0d22]"
              >
                <option value="Premium Plugin">Premium Plugin</option>
                <option value="Recording / Cinematic Tools">Recording / Cinematic Tools</option>
                <option value="Utility">Utility</option>
                <option value="PvP & Games">PvP & Games</option>
                <option value="SMP & Economy">SMP & Economy</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">Minecraft Version</label>
              <input
                type="text"
                value={formData.minecraftVersion}
                onChange={(e) => setFormData({ ...formData, minecraftVersion: e.target.value })}
                placeholder="e.g. 1.18 - 1.20.6"
                className="w-full px-3.5 py-2.5 rounded-xl glass-input font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Description *</label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Plugin description..."
              className="w-full px-3.5 py-2.5 rounded-xl glass-input leading-relaxed"
            />
          </div>

          {/* Drag & Drop Image Uploader */}
          <ImageUploader
            label="Plugin Image Asset / Logo"
            value={formData.imageUrl || '/zyt_mascot.jpg'}
            onChange={(newUrl) => setFormData({ ...formData, imageUrl: newUrl })}
            onTriggerToast={onTriggerToast}
          />

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Download URL</label>
            <input
              type="text"
              value={formData.downloadUrl || ''}
              onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
              placeholder="https://zytstudio.com/download/plugin.jar"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">
              Key Features (Comma-separated)
            </label>
            <textarea
              rows={2}
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              placeholder="Camera Paths, Motion Capture, NPC Animations"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input leading-relaxed font-mono"
            />
          </div>

          {/* Footer Action Buttons */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center gap-1.5 shadow-lg shadow-purple-600/30"
            >
              <Save className="w-4 h-4" /> Save Plugin Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
