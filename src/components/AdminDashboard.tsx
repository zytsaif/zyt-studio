import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import type { PluginItem } from '../data/pluginsData';
import type { PortfolioProject } from '../data/portfolioData';
import {
  Lock,
  X,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  Pin,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Sliders,
  Code,
  Layers,
  MessageSquare,
  CreditCard,
  Mail,
  Settings,
  ShieldCheck,
  QrCode,
  DollarSign
} from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerToast: (msg: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  onTriggerToast,
}) => {
  const {
    plugins,
    portfolio,
    reviews,
    paymentSettings,
    contactSettings,
    websiteSettings,
    isAdmin,
    setIsAdmin,
    approveReview,
    rejectReview,
    deleteReview,
    pinReview,
    toggleHideReview,
    addPlugin,
    updatePlugin,
    deletePlugin,
    addPortfolio,
    updatePortfolio,
    deletePortfolio,
    updatePaymentSettings,
    updateContactSettings,
    updateWebsiteSettings,
    resetToDefaults,
  } = useStore();

  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'plugins' | 'portfolio' | 'reviews' | 'payment' | 'contact' | 'settings'>('plugins');

  // Plugin Editing State
  const [editingPlugin, setEditingPlugin] = useState<PluginItem | null>(null);

  // Portfolio Editing State
  const [editingPortfolio, setEditingPortfolio] = useState<PortfolioProject | null>(null);

  // Form states for Payment & Settings
  const [paymentForm, setPaymentForm] = useState(paymentSettings);
  const [contactForm, setContactForm] = useState(contactSettings);
  const [websiteForm, setWebsiteForm] = useState(websiteSettings);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === websiteSettings.adminPin || pinInput === 'admin123') {
      setIsAdmin(true);
      setAuthError('');
      onTriggerToast('Admin authentication granted.');
    } else {
      setAuthError('Invalid Admin PIN password. Try again.');
    }
  };

  const handleSavePayment = () => {
    updatePaymentSettings(paymentForm);
    onTriggerToast('Payment settings saved successfully.');
  };

  const handleSaveContact = () => {
    updateContactSettings(contactForm);
    onTriggerToast('Contact settings saved successfully.');
  };

  const handleSaveWebsite = () => {
    updateWebsiteSettings(websiteForm);
    onTriggerToast('Website & SEO settings saved successfully.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-6xl glass-panel rounded-3xl border border-purple-500/40 overflow-hidden shadow-2xl flex flex-col max-h-[92vh] bg-[#070814]">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-slate-950 via-[#0d0e20] to-purple-950/60 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
              <Lock className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2">
                Zyt Studio Admin Dashboard
                {isAdmin && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    AUTHENTICATED
                  </span>
                )}
              </h3>
              <p className="text-xs text-gray-400">Full Website Management Portal (/admin)</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAdmin ? (
          /* Authentication Screen */
          <div className="p-8 sm:p-14 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mx-auto shadow-xl">
              <Lock className="w-8 h-8 text-purple-400" />
            </div>

            <div>
              <h4 className="text-2xl font-bold text-white font-mono">Admin Authorization</h4>
              <p className="text-xs text-gray-400 mt-1">
                Enter your secret Admin PIN (Default: <code className="text-cyan-300">admin123</code>)
              </p>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-950/60 text-red-300 border border-red-800 text-xs font-semibold">
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                required
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter Admin PIN..."
                className="w-full px-4 py-3 rounded-xl glass-input text-center text-sm tracking-widest font-mono"
              />

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 hover:scale-[1.01] transition-all"
              >
                Access Admin Controls
              </button>
            </form>
          </div>
        ) : (
          /* Admin Dashboard Main Interface */
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Admin Nav Tabs */}
            <div className="flex flex-wrap items-center gap-2 px-6 pt-4 border-b border-white/10 bg-[#090a18]">
              <button
                onClick={() => setActiveTab('plugins')}
                className={`px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
                  activeTab === 'plugins'
                    ? 'border-purple-500 text-white bg-white/5'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Code className="w-4 h-4 text-purple-400" /> Plugins ({plugins.length})
              </button>

              <button
                onClick={() => setActiveTab('portfolio')}
                className={`px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
                  activeTab === 'portfolio'
                    ? 'border-purple-500 text-white bg-white/5'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4 text-cyan-400" /> Portfolio ({portfolio.length})
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
                  activeTab === 'reviews'
                    ? 'border-purple-500 text-white bg-white/5'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" /> Review Moderation ({reviews.length})
              </button>

              <button
                onClick={() => setActiveTab('payment')}
                className={`px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
                  activeTab === 'payment'
                    ? 'border-purple-500 text-white bg-white/5'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-4 h-4 text-amber-400" /> Payment & UPI
              </button>

              <button
                onClick={() => setActiveTab('contact')}
                className={`px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
                  activeTab === 'contact'
                    ? 'border-purple-500 text-white bg-white/5'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Mail className="w-4 h-4 text-blue-400" /> Contact Info
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-2.5 text-xs font-semibold rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
                  activeTab === 'settings'
                    ? 'border-purple-500 text-white bg-white/5'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Settings className="w-4 h-4 text-red-400" /> Web & SEO Settings
              </button>
            </div>

            {/* Dashboard Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-[#060712]">
              {/* PLUGINS TAB */}
              {activeTab === 'plugins' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white font-mono">Manage Plugins</h4>
                    <button
                      onClick={() =>
                        setEditingPlugin({
                          id: 'plugin_' + Date.now(),
                          name: 'New Custom Plugin',
                          tagline: 'Short catchy subtitle',
                          description: 'Detailed description of the new plugin...',
                          category: 'Utility',
                          minecraftVersion: '1.18 - 1.20.x',
                          price: '$29.99',
                          rating: 5.0,
                          salesCount: 0,
                          features: ['Feature 1', 'Feature 2'],
                          fullFeatures: ['Full Feature 1', 'Full Feature 2'],
                          commands: [{ command: '/cmd', permission: 'node.admin', description: 'Command desc' }],
                          configSnippet: '# Config file snippet',
                          iconName: 'Sparkles',
                        })
                      }
                      className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" /> Add New Plugin
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {plugins.map((plg) => (
                      <div key={plg.id} className="glass-card p-4 rounded-2xl flex flex-col justify-between space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-xs text-purple-400 font-semibold">{plg.category}</span>
                            <h5 className="text-base font-bold text-white font-mono">{plg.name}</h5>
                            <p className="text-xs text-gray-400 line-clamp-2">{plg.description}</p>
                          </div>
                          <span className="text-sm font-bold text-cyan-400 font-mono">{plg.price}</span>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                          <button
                            onClick={() => setEditingPlugin(plg)}
                            className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs flex items-center gap-1"
                          >
                            <Edit2 className="w-3.5 h-3.5 text-cyan-400" /> Edit
                          </button>
                          <button
                            onClick={() => {
                              deletePlugin(plg.id);
                              onTriggerToast(`Deleted plugin ${plg.name}`);
                            }}
                            className="px-3 py-1 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800 text-xs flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Edit Plugin Submodal */}
                  {editingPlugin && (
                    <div className="p-6 glass-panel rounded-2xl border border-purple-500/40 space-y-4">
                      <h5 className="text-sm font-bold text-white font-mono">
                        {plugins.find((p) => p.id === editingPlugin.id) ? 'Edit Plugin' : 'Add New Plugin'}
                      </h5>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                        <div>
                          <label className="text-gray-400">Name</label>
                          <input
                            type="text"
                            value={editingPlugin.name}
                            onChange={(e) => setEditingPlugin({ ...editingPlugin, name: e.target.value })}
                            className="w-full p-2.5 rounded-xl glass-input mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-gray-400">Price</label>
                          <input
                            type="text"
                            value={editingPlugin.price}
                            onChange={(e) => setEditingPlugin({ ...editingPlugin, price: e.target.value })}
                            className="w-full p-2.5 rounded-xl glass-input mt-1 font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-gray-400">MC Version</label>
                          <input
                            type="text"
                            value={editingPlugin.minecraftVersion}
                            onChange={(e) => setEditingPlugin({ ...editingPlugin, minecraftVersion: e.target.value })}
                            className="w-full p-2.5 rounded-xl glass-input mt-1 font-mono"
                          />
                        </div>
                      </div>

                      <div className="text-xs">
                        <label className="text-gray-400">Description</label>
                        <textarea
                          rows={2}
                          value={editingPlugin.description}
                          onChange={(e) => setEditingPlugin({ ...editingPlugin, description: e.target.value })}
                          className="w-full p-2.5 rounded-xl glass-input mt-1"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          onClick={() => setEditingPlugin(null)}
                          className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            if (plugins.find((p) => p.id === editingPlugin.id)) {
                              updatePlugin(editingPlugin);
                            } else {
                              addPlugin(editingPlugin);
                            }
                            onTriggerToast('Plugin saved successfully!');
                            setEditingPlugin(null);
                          }}
                          className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold"
                        >
                          Save Plugin
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* REVIEWS MODERATION TAB */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white font-mono">Review Moderation System</h4>
                    <span className="text-xs text-gray-400">
                      Total: {reviews.length} | Pending Approval: {reviews.filter((r) => r.status === 'pending').length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className={`p-4 rounded-2xl glass-card border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          rev.status === 'pending'
                            ? 'border-yellow-500/50 bg-yellow-950/20'
                            : rev.status === 'rejected'
                            ? 'border-red-500/30 opacity-60'
                            : 'border-white/10'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white font-mono">{rev.author}</span>
                            <span className="text-xs text-purple-300 font-mono">({rev.discord})</span>
                            <span className="text-xs text-yellow-400">★ {rev.rating}</span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                rev.status === 'approved'
                                  ? 'bg-emerald-500/20 text-emerald-300'
                                  : rev.status === 'pending'
                                  ? 'bg-yellow-500/20 text-yellow-300'
                                  : 'bg-red-500/20 text-red-300'
                              }`}
                            >
                              {rev.status}
                            </span>
                            {rev.pinned && (
                              <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded">
                                Pinned
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-300 italic">"{rev.quote}"</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {rev.status !== 'approved' && (
                            <button
                              onClick={() => {
                                approveReview(rev.id);
                                onTriggerToast('Review approved!');
                              }}
                              className="px-2.5 py-1 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800 text-xs flex items-center gap-1"
                            >
                              <CheckCircle className="w-3.5 h-3.5" /> Approve
                            </button>
                          )}
                          {rev.status !== 'rejected' && (
                            <button
                              onClick={() => {
                                rejectReview(rev.id);
                                onTriggerToast('Review rejected.');
                              }}
                              className="px-2.5 py-1 rounded-lg bg-yellow-950/60 text-yellow-300 border border-yellow-800 text-xs flex items-center gap-1"
                            >
                              <XCircle className="w-3.5 h-3.5" /> Reject
                            </button>
                          )}
                          <button
                            onClick={() => {
                              pinReview(rev.id);
                              onTriggerToast(rev.pinned ? 'Unpinned review' : 'Pinned review');
                            }}
                            className="p-1.5 rounded-lg bg-white/10 text-purple-300 hover:text-white"
                            title="Toggle Pin"
                          >
                            <Pin className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              deleteReview(rev.id);
                              onTriggerToast('Review deleted permanently.');
                            }}
                            className="p-1.5 rounded-lg bg-red-950/60 text-red-400 hover:text-red-200"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PAYMENT MANAGEMENT TAB */}
              {activeTab === 'payment' && (
                <div className="space-y-6">
                  <h4 className="text-sm font-bold text-white font-mono">Edit Payment Settings & UPI</h4>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="text-gray-300 font-semibold">Official UPI ID</label>
                      <input
                        type="text"
                        value={paymentForm.upiId}
                        onChange={(e) => setPaymentForm({ ...paymentForm, upiId: e.target.value })}
                        className="w-full p-3 rounded-xl glass-input font-mono mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-gray-300 font-semibold">QR Code Image URL</label>
                      <input
                        type="text"
                        value={paymentForm.qrCodeUrl}
                        onChange={(e) => setPaymentForm({ ...paymentForm, qrCodeUrl: e.target.value })}
                        className="w-full p-3 rounded-xl glass-input mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-gray-300 font-semibold">Payment Instructions</label>
                      <textarea
                        rows={3}
                        value={paymentForm.instructions}
                        onChange={(e) => setPaymentForm({ ...paymentForm, instructions: e.target.value })}
                        className="w-full p-3 rounded-xl glass-input mt-1"
                      />
                    </div>

                    <button
                      onClick={handleSavePayment}
                      className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" /> Save Payment Settings
                    </button>
                  </div>
                </div>
              )}

              {/* CONTACT MANAGEMENT TAB */}
              {activeTab === 'contact' && (
                <div className="space-y-6">
                  <h4 className="text-sm font-bold text-white font-mono">Edit Contact Settings</h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="text-gray-300 font-semibold">Discord Username</label>
                      <input
                        type="text"
                        value={contactForm.discordUsername}
                        onChange={(e) => setContactForm({ ...contactForm, discordUsername: e.target.value })}
                        className="w-full p-3 rounded-xl glass-input mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-gray-300 font-semibold">Discord Invite Link</label>
                      <input
                        type="text"
                        value={contactForm.discordInvite}
                        onChange={(e) => setContactForm({ ...contactForm, discordInvite: e.target.value })}
                        className="w-full p-3 rounded-xl glass-input mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-gray-300 font-semibold">Official Email</label>
                      <input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full p-3 rounded-xl glass-input mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-gray-300 font-semibold">Response Time</label>
                      <input
                        type="text"
                        value={contactForm.responseTime}
                        onChange={(e) => setContactForm({ ...contactForm, responseTime: e.target.value })}
                        className="w-full p-3 rounded-xl glass-input mt-1"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSaveContact}
                    className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save Contact Info
                  </button>
                </div>
              )}

              {/* WEB & SEO SETTINGS TAB */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h4 className="text-sm font-bold text-white font-mono">Website & Webhook Settings</h4>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="text-gray-300 font-semibold">Discord Webhook URL (Order Dispatcher)</label>
                      <input
                        type="text"
                        value={websiteForm.discordWebhookUrl}
                        onChange={(e) => setWebsiteForm({ ...websiteForm, discordWebhookUrl: e.target.value })}
                        placeholder="https://discord.com/api/webhooks/..."
                        className="w-full p-3 rounded-xl glass-input mt-1 font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-gray-300 font-semibold">Hero Title</label>
                      <input
                        type="text"
                        value={websiteForm.heroTitle}
                        onChange={(e) => setWebsiteForm({ ...websiteForm, heroTitle: e.target.value })}
                        className="w-full p-3 rounded-xl glass-input mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-gray-300 font-semibold">Hero Subheading</label>
                      <input
                        type="text"
                        value={websiteForm.heroSubheading}
                        onChange={(e) => setWebsiteForm({ ...websiteForm, heroSubheading: e.target.value })}
                        className="w-full p-3 rounded-xl glass-input mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-gray-300 font-semibold">Admin PIN Password</label>
                      <input
                        type="text"
                        value={websiteForm.adminPin}
                        onChange={(e) => setWebsiteForm({ ...websiteForm, adminPin: e.target.value })}
                        className="w-full p-3 rounded-xl glass-input font-mono mt-1"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                      <button
                        onClick={handleSaveWebsite}
                        className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" /> Save Website Settings
                      </button>

                      <button
                        onClick={() => {
                          resetToDefaults();
                          onTriggerToast('Reset configuration to default values.');
                        }}
                        className="px-4 py-2.5 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Reset All Defaults
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
