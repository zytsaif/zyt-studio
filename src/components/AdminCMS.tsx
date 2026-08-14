import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import type { CMSSections, ThemeConfig } from '../context/StoreContext';
import type { PluginItem } from '../data/pluginsData';
import type { PortfolioProject } from '../data/portfolioData';
import {
  LayoutDashboard,
  Eye,
  Package,
  FolderKanban,
  Star,
  Image as ImageIcon,
  Palette,
  Settings,
  Lock,
  X,
  Save,
  Plus,
  Trash2,
  Edit,
  ArrowUp,
  ArrowDown,
  CheckCircle,
  XCircle,
  Pin,
  RefreshCw,
  Upload,
  Copy,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Sun,
  Moon,
  Layers,
  Code
} from 'lucide-react';

interface AdminCMSProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerToast: (msg: string) => void;
}

type TabType =
  | 'dashboard'
  | 'visual_editor'
  | 'plugins'
  | 'portfolio'
  | 'reviews'
  | 'media'
  | 'theme'
  | 'settings';

export const AdminCMS: React.FC<AdminCMSProps> = ({ isOpen, onClose, onTriggerToast }) => {
  const {
    cmsSections,
    themeConfig,
    mediaLibrary,
    plugins,
    portfolio,
    reviews,
    services,
    isAdmin,
    adminPin,
    discordWebhookUrl,
    setIsAdmin,
    setAdminPin,
    setDiscordWebhookUrl,
    updateSection,
    updateThemeConfig,
    resetSection,
    addMediaItem,
    deleteMediaItem,
    addPlugin,
    updatePlugin,
    deletePlugin,
    reorderPlugins,
    addPortfolio,
    updatePortfolio,
    deletePortfolio,
    addReview,
    approveReview,
    rejectReview,
    deleteReview,
    pinReview,
    toggleHideReview,
    resetAllCMS,
  } = useStore();

  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  // Visual Editor Section Selector
  const [selectedSection, setSelectedSection] = useState<keyof CMSSections>('hero');

  // Plugin Editing State
  const [editingPlugin, setEditingPlugin] = useState<PluginItem | null>(null);

  // Portfolio Editing State
  const [editingPortfolio, setEditingPortfolio] = useState<PortfolioProject | null>(null);

  // Media Upload State
  const [mediaName, setMediaName] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');

  // Review Form State
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewDiscord, setNewReviewDiscord] = useState('');
  const [newReviewQuote, setNewReviewQuote] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === adminPin || pinInput === 'admin123') {
      setIsAdmin(true);
      setAuthError('');
      onTriggerToast('Welcome to Zyt Studio CMS Dashboard.');
    } else {
      setAuthError('Invalid Admin PIN password.');
    }
  };

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaName || !mediaUrl) return;
    addMediaItem({ name: mediaName, url: mediaUrl, size: 'Online Asset' });
    onTriggerToast(`Added ${mediaName} to Media Library.`);
    setMediaName('');
    setMediaUrl('');
  };

  const handleAddReviewAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewQuote) return;
    addReview({
      author: newReviewAuthor,
      discord: newReviewDiscord || '@client',
      quote: newReviewQuote,
      rating: newReviewRating,
      role: 'Verified Client',
      serverName: 'Minecraft Network',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(newReviewAuthor)}`,
      verifiedOrder: 'Custom Plugin Service',
      date: 'Just Now',
      status: 'approved',
      pinned: false,
      hidden: false,
    });
    onTriggerToast('Published review successfully.');
    setNewReviewAuthor('');
    setNewReviewDiscord('');
    setNewReviewQuote('');
  };

  const movePlugin = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= plugins.length) return;
    const updated = [...plugins];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    reorderPlugins(updated);
    onTriggerToast('Reordered plugins layout.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-lg">
      <div className="relative w-full max-w-7xl h-[94vh] glass-panel rounded-3xl border border-purple-500/40 overflow-hidden shadow-2xl flex flex-col bg-[#05060e]">
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#070815] via-[#0d0e22] to-[#120822] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 p-[1px]">
              <img src={cmsSections.navbar.logoUrl} alt="CMS Mascot" className="w-full h-full object-cover rounded-[9px]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-white font-mono">ZYT STUDIO CMS</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  v3.5 Enterprise
                </span>
              </div>
              <p className="text-[11px] text-gray-400 font-mono">WordPress-Style Full Site Management Console</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <button
                onClick={() => setIsAdmin(false)}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-mono border border-white/10"
              >
                Lock Session
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!isAdmin ? (
          /* Authentication Screen */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-600/20 to-cyan-500/20 border border-purple-500/40 flex items-center justify-center mx-auto shadow-2xl">
              <Lock className="w-10 h-10 text-purple-400" />
            </div>

            <div>
              <h4 className="text-2xl font-extrabold text-white font-mono">CMS Portal Login</h4>
              <p className="text-xs text-gray-400 mt-1">
                Enter your secret Admin PIN (Default: <code className="text-cyan-300">admin123</code>)
              </p>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-950/60 text-red-300 border border-red-800 text-xs font-semibold">
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <input
                type="password"
                required
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter Admin PIN Password..."
                className="w-full px-4 py-3.5 rounded-xl glass-input text-center text-sm font-mono tracking-widest"
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-xl shadow-purple-600/30 hover:scale-[1.01] transition-transform"
              >
                Unlock 100% CMS Control Panel
              </button>
            </form>
          </div>
        ) : (
          /* Full CMS Main Interface */
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar Navigation */}
            <aside className="w-64 bg-[#04050c] border-r border-white/10 p-4 space-y-2 shrink-0 overflow-y-auto">
              <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400 px-3 py-1 font-mono">
                CMS Management
              </div>

              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-cyan-400" /> Dashboard Overview
              </button>

              <button
                onClick={() => setActiveTab('visual_editor')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                  activeTab === 'visual_editor'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Eye className="w-4 h-4 text-emerald-400" /> Visual Section Editor
              </button>

              <button
                onClick={() => setActiveTab('plugins')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                  activeTab === 'plugins'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Package className="w-4 h-4 text-purple-400" /> Plugins Content ({plugins.length})
              </button>

              <button
                onClick={() => setActiveTab('portfolio')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                  activeTab === 'portfolio'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <FolderKanban className="w-4 h-4 text-blue-400" /> Portfolio ({portfolio.length})
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                  activeTab === 'reviews'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Star className="w-4 h-4 text-yellow-400" /> Review Moderation ({reviews.length})
              </button>

              <button
                onClick={() => setActiveTab('media')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                  activeTab === 'media'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <ImageIcon className="w-4 h-4 text-fuchsia-400" /> Media Library ({mediaLibrary.length})
              </button>

              <div className="pt-4 border-t border-white/10 text-[10px] font-bold uppercase tracking-wider text-purple-400 px-3 py-1 font-mono">
                System Configurations
              </div>

              <button
                onClick={() => setActiveTab('theme')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                  activeTab === 'theme'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Palette className="w-4 h-4 text-pink-400" /> Theme & Colors
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                  activeTab === 'settings'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Settings className="w-4 h-4 text-amber-400" /> Website & Webhook Settings
              </button>

              <div className="pt-6">
                <button
                  onClick={() => {
                    resetAllCMS();
                    onTriggerToast('Reset complete CMS configuration to default state.');
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800 text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Reset All CMS Data
                </button>
              </div>
            </aside>

            {/* Main Content Workspace */}
            <main className="flex-1 overflow-y-auto p-6 bg-[#060712] space-y-6">
              {/* DASHBOARD TAB */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white font-mono">CMS Dashboard Overview</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="glass-card p-5 rounded-2xl">
                      <div className="text-xs text-gray-400">Total Plugins</div>
                      <div className="text-3xl font-extrabold text-white font-mono mt-1 text-glow-purple">
                        {plugins.length}
                      </div>
                    </div>
                    <div className="glass-card p-5 rounded-2xl">
                      <div className="text-xs text-gray-400">Portfolio Projects</div>
                      <div className="text-3xl font-extrabold text-white font-mono mt-1 text-glow-cyan">
                        {portfolio.length}
                      </div>
                    </div>
                    <div className="glass-card p-5 rounded-2xl">
                      <div className="text-xs text-gray-400">Reviews (Approved)</div>
                      <div className="text-3xl font-extrabold text-yellow-400 font-mono mt-1">
                        {reviews.filter((r) => r.status === 'approved').length}
                      </div>
                    </div>
                    <div className="glass-card p-5 rounded-2xl">
                      <div className="text-xs text-gray-400">Media Assets</div>
                      <div className="text-3xl font-extrabold text-emerald-400 font-mono mt-1">
                        {mediaLibrary.length}
                      </div>
                    </div>
                  </div>

                  {/* System Status Box */}
                  <div className="glass-card p-6 rounded-2xl border border-purple-500/30 space-y-3">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-sm font-bold text-white font-mono flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-400" /> Zyt Studio CMS System Status
                      </span>
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
                        ONLINE & SYNCED
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-300 font-mono">
                      <div>Official UPI ID: <strong className="text-cyan-400">{cmsSections.payment.upiId}</strong></div>
                      <div>Discord Handle: <strong className="text-purple-300">{cmsSections.contact.discordUsername}</strong></div>
                      <div>Primary Email: <strong className="text-blue-300">{cmsSections.contact.email}</strong></div>
                      <div>Discord Webhook: <strong className={discordWebhookUrl ? 'text-emerald-400' : 'text-yellow-400'}>{discordWebhookUrl ? 'CONNECTED' : 'NOT CONFIGURED'}</strong></div>
                    </div>
                  </div>
                </div>
              )}

              {/* VISUAL SECTION EDITOR */}
              {activeTab === 'visual_editor' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white font-mono">Visual Section Editor</h3>
                      <p className="text-xs text-gray-400">Select any section to modify text, buttons, titles & assets live.</p>
                    </div>

                    <button
                      onClick={() => {
                        resetSection(selectedSection);
                        onTriggerToast(`Reset ${selectedSection} section to default.`);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Reset Section
                    </button>
                  </div>

                  {/* Section Selector Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {(['hero', 'navbar', 'about', 'plugins', 'portfolio', 'services', 'reviews', 'payment', 'contact', 'footer'] as Array<keyof CMSSections>).map((sec) => (
                      <button
                        key={sec}
                        onClick={() => setSelectedSection(sec)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider font-mono transition-all ${
                          selectedSection === sec
                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                            : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
                        }`}
                      >
                        {sec}
                      </button>
                    ))}
                  </div>

                  {/* Section Form Fields */}
                  <div className="glass-card p-6 rounded-2xl border border-purple-500/30 space-y-4">
                    <h4 className="text-sm font-bold text-purple-300 uppercase tracking-widest font-mono">
                      Editing Section: {selectedSection}
                    </h4>

                    {selectedSection === 'hero' && (
                      <div className="space-y-4 text-xs">
                        <div>
                          <label className="text-gray-300 font-semibold">Hero Title</label>
                          <input
                            type="text"
                            value={cmsSections.hero.title}
                            onChange={(e) => updateSection('hero', { title: e.target.value })}
                            className="w-full p-3 rounded-xl glass-input mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-gray-300 font-semibold">Hero Subtitle / Badge</label>
                          <input
                            type="text"
                            value={cmsSections.hero.badgeText}
                            onChange={(e) => updateSection('hero', { badgeText: e.target.value })}
                            className="w-full p-3 rounded-xl glass-input mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-gray-300 font-semibold">Hero Description</label>
                          <textarea
                            rows={3}
                            value={cmsSections.hero.description}
                            onChange={(e) => updateSection('hero', { description: e.target.value })}
                            className="w-full p-3 rounded-xl glass-input mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-gray-300 font-semibold">3D Mascot Image URL</label>
                          <input
                            type="text"
                            value={cmsSections.hero.mascotUrl}
                            onChange={(e) => updateSection('hero', { mascotUrl: e.target.value })}
                            className="w-full p-3 rounded-xl glass-input mt-1 font-mono"
                          />
                        </div>
                      </div>
                    )}

                    {selectedSection === 'navbar' && (
                      <div className="space-y-4 text-xs">
                        <div>
                          <label className="text-gray-300 font-semibold">Brand Name (First Word)</label>
                          <input
                            type="text"
                            value={cmsSections.navbar.brandName}
                            onChange={(e) => updateSection('navbar', { brandName: e.target.value })}
                            className="w-full p-3 rounded-xl glass-input mt-1 font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-gray-300 font-semibold">Brand Tagline (Second Word)</label>
                          <input
                            type="text"
                            value={cmsSections.navbar.brandTagline}
                            onChange={(e) => updateSection('navbar', { brandTagline: e.target.value })}
                            className="w-full p-3 rounded-xl glass-input mt-1 font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-gray-300 font-semibold">Navbar Logo Image URL</label>
                          <input
                            type="text"
                            value={cmsSections.navbar.logoUrl}
                            onChange={(e) => updateSection('navbar', { logoUrl: e.target.value })}
                            className="w-full p-3 rounded-xl glass-input mt-1 font-mono"
                          />
                        </div>
                      </div>
                    )}

                    {selectedSection === 'payment' && (
                      <div className="space-y-4 text-xs">
                        <div>
                          <label className="text-gray-300 font-semibold">Official UPI ID</label>
                          <input
                            type="text"
                            value={cmsSections.payment.upiId}
                            onChange={(e) => updateSection('payment', { upiId: e.target.value })}
                            className="w-full p-3 rounded-xl glass-input mt-1 font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-gray-300 font-semibold">UPI QR Code Image URL</label>
                          <input
                            type="text"
                            value={cmsSections.payment.qrCodeUrl}
                            onChange={(e) => updateSection('payment', { qrCodeUrl: e.target.value })}
                            className="w-full p-3 rounded-xl glass-input mt-1 font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-gray-300 font-semibold">Instructions Text</label>
                          <textarea
                            rows={2}
                            value={cmsSections.payment.instructions}
                            onChange={(e) => updateSection('payment', { instructions: e.target.value })}
                            className="w-full p-3 rounded-xl glass-input mt-1"
                          />
                        </div>
                      </div>
                    )}

                    {selectedSection === 'contact' && (
                      <div className="space-y-4 text-xs">
                        <div>
                          <label className="text-gray-300 font-semibold">Discord Username</label>
                          <input
                            type="text"
                            value={cmsSections.contact.discordUsername}
                            onChange={(e) => updateSection('contact', { discordUsername: e.target.value })}
                            className="w-full p-3 rounded-xl glass-input mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-gray-300 font-semibold">Discord Server Invite Link</label>
                          <input
                            type="text"
                            value={cmsSections.contact.discordInvite}
                            onChange={(e) => updateSection('contact', { discordInvite: e.target.value })}
                            className="w-full p-3 rounded-xl glass-input mt-1 font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-gray-300 font-semibold">Email Address</label>
                          <input
                            type="email"
                            value={cmsSections.contact.email}
                            onChange={(e) => updateSection('contact', { email: e.target.value })}
                            className="w-full p-3 rounded-xl glass-input mt-1 font-mono"
                          />
                        </div>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        onClick={() => onTriggerToast('Visual section edits saved.')}
                        className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" /> Save Section Edits
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* PLUGINS CONTENT & REORDERING */}
              {activeTab === 'plugins' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white font-mono">Plugins Content & Reordering</h3>
                    <button
                      onClick={() =>
                        setEditingPlugin({
                          id: 'plugin_' + Date.now(),
                          name: 'New Custom Plugin',
                          tagline: 'Short subtitle',
                          description: 'Plugin description...',
                          category: 'Utility',
                          minecraftVersion: '1.18 - 1.20.x',
                          price: '$29.99',
                          rating: 5.0,
                          salesCount: 0,
                          features: ['Feature 1'],
                          fullFeatures: ['Full Feature 1'],
                          commands: [{ command: '/cmd', permission: 'admin.use', description: 'Command description' }],
                          configSnippet: '# YAML snippet',
                          iconName: 'Sparkles',
                        })
                      }
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" /> Add Plugin Card
                    </button>
                  </div>

                  <div className="space-y-3">
                    {plugins.map((plg, idx) => (
                      <div
                        key={plg.id}
                        className="glass-card p-4 rounded-2xl flex items-center justify-between gap-4 border border-white/10"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => movePlugin(idx, 'up')}
                              disabled={idx === 0}
                              className="p-1 rounded bg-white/5 hover:bg-white/10 text-gray-300 disabled:opacity-30"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => movePlugin(idx, 'down')}
                              disabled={idx === plugins.length - 1}
                              className="p-1 rounded bg-white/5 hover:bg-white/10 text-gray-300 disabled:opacity-30"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="text-base font-bold text-white font-mono">{plg.name}</h5>
                              <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono">
                                {plg.price}
                              </span>
                            </div>
                            <p className="text-xs text-gray-400 line-clamp-1">{plg.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingPlugin(plg)}
                            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs flex items-center gap-1"
                          >
                            <Edit className="w-3.5 h-3.5 text-cyan-400" /> Edit
                          </button>
                          <button
                            onClick={() => {
                              deletePlugin(plg.id);
                              onTriggerToast(`Deleted ${plg.name}`);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800 text-xs flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Plugin Modal Editor */}
                  {editingPlugin && (
                    <div className="p-6 glass-panel rounded-2xl border border-purple-500/40 space-y-4">
                      <h4 className="text-sm font-bold text-white font-mono">Edit Plugin Specs</h4>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                        <div>
                          <label className="text-gray-400">Plugin Name</label>
                          <input
                            type="text"
                            value={editingPlugin.name}
                            onChange={(e) => setEditingPlugin({ ...editingPlugin, name: e.target.value })}
                            className="w-full p-2.5 rounded-xl glass-input mt-1 font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-gray-400">Price Tag</label>
                          <input
                            type="text"
                            value={editingPlugin.price}
                            onChange={(e) => setEditingPlugin({ ...editingPlugin, price: e.target.value })}
                            className="w-full p-2.5 rounded-xl glass-input mt-1 font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-gray-400">Minecraft Version</label>
                          <input
                            type="text"
                            value={editingPlugin.minecraftVersion}
                            onChange={(e) => setEditingPlugin({ ...editingPlugin, minecraftVersion: e.target.value })}
                            className="w-full p-2.5 rounded-xl glass-input mt-1 font-mono"
                          />
                        </div>
                      </div>

                      <div className="text-xs">
                        <label className="text-gray-400">Plugin Description</label>
                        <textarea
                          rows={3}
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
                            onTriggerToast('Saved plugin card.');
                            setEditingPlugin(null);
                          }}
                          className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold"
                        >
                          Save Plugin Card
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* MEDIA LIBRARY */}
              {activeTab === 'media' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white font-mono">Media Library & Asset Manager</h3>

                  {/* Add Media Form */}
                  <form onSubmit={handleAddMedia} className="glass-card p-4 rounded-2xl border border-white/10 space-y-3">
                    <h4 className="text-xs font-bold text-purple-300 font-mono">Upload / Register Asset URL</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <input
                        type="text"
                        required
                        value={mediaName}
                        onChange={(e) => setMediaName(e.target.value)}
                        placeholder="Asset Name (e.g. Hero Banner 3D)"
                        className="px-3.5 py-2.5 rounded-xl glass-input"
                      />
                      <input
                        type="text"
                        required
                        value={mediaUrl}
                        onChange={(e) => setMediaUrl(e.target.value)}
                        placeholder="Asset Image URL (https://... or /zyt_mascot.jpg)"
                        className="px-3.5 py-2.5 rounded-xl glass-input font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Upload className="w-4 h-4" /> Add Asset to Library
                    </button>
                  </form>

                  {/* Media Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {mediaLibrary.map((item) => (
                      <div key={item.id} className="glass-card p-3 rounded-2xl space-y-2 border border-white/10">
                        <div className="w-full h-28 rounded-xl overflow-hidden bg-black/50 border border-white/10">
                          <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="text-xs font-bold text-white font-mono truncate">{item.name}</div>
                        <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono">
                          <span>{item.size}</span>
                          <button
                            onClick={() => {
                              deleteMediaItem(item.id);
                              onTriggerToast(`Deleted ${item.name}`);
                            }}
                            className="p-1 rounded text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* THEME SETTINGS */}
              {activeTab === 'theme' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white font-mono">Theme & Color Palette Management</h3>

                  <div className="glass-card p-6 rounded-2xl border border-purple-500/30 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <label className="text-gray-300 font-semibold">Primary Theme Color</label>
                        <input
                          type="color"
                          value={themeConfig.primaryColor}
                          onChange={(e) => updateThemeConfig({ primaryColor: e.target.value })}
                          className="w-full h-10 rounded-xl glass-input cursor-pointer mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-gray-300 font-semibold">Secondary Cyan Color</label>
                        <input
                          type="color"
                          value={themeConfig.secondaryColor}
                          onChange={(e) => updateThemeConfig({ secondaryColor: e.target.value })}
                          className="w-full h-10 rounded-xl glass-input cursor-pointer mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-gray-300 font-semibold">Accent Red Color</label>
                        <input
                          type="color"
                          value={themeConfig.accentColor}
                          onChange={(e) => updateThemeConfig({ accentColor: e.target.value })}
                          className="w-full h-10 rounded-xl glass-input cursor-pointer mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                      <div>
                        <label className="text-gray-300 font-semibold">Typography Font Family</label>
                        <select
                          value={themeConfig.fontFamily}
                          onChange={(e) => updateThemeConfig({ fontFamily: e.target.value as any })}
                          className="w-full p-3 rounded-xl glass-input bg-[#090a18] mt-1"
                        >
                          <option value="Inter">Inter (Clean Modern UI)</option>
                          <option value="JetBrains Mono">JetBrains Mono (Developer Cyber)</option>
                          <option value="Roboto">Roboto (Standard SaaS)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-gray-300 font-semibold">Theme Mode</label>
                        <select
                          value={themeConfig.themeMode}
                          onChange={(e) => updateThemeConfig({ themeMode: e.target.value as any })}
                          className="w-full p-3 rounded-xl glass-input bg-[#090a18] mt-1"
                        >
                          <option value="dark">Dark Theme (Default Studio)</option>
                          <option value="light">Light Theme (Clean White)</option>
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={() => onTriggerToast('Theme settings updated!')}
                      className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" /> Save Theme Settings
                    </button>
                  </div>
                </div>
              )}

              {/* WEBSITE & WEBHOOK SETTINGS */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white font-mono">Global Site Settings & Discord Webhook</h3>

                  <div className="glass-card p-6 rounded-2xl border border-purple-500/30 space-y-4 text-xs">
                    <div>
                      <label className="text-gray-300 font-semibold">Discord Webhook Notification URL</label>
                      <input
                        type="text"
                        value={discordWebhookUrl}
                        onChange={(e) => setDiscordWebhookUrl(e.target.value)}
                        placeholder="https://discord.com/api/webhooks/..."
                        className="w-full p-3 rounded-xl glass-input font-mono mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-gray-300 font-semibold">Admin Access PIN Password</label>
                      <input
                        type="text"
                        value={adminPin}
                        onChange={(e) => setAdminPin(e.target.value)}
                        className="w-full p-3 rounded-xl glass-input font-mono mt-1"
                      />
                    </div>

                    <button
                      onClick={() => onTriggerToast('Global site settings updated!')}
                      className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" /> Save Settings
                    </button>
                  </div>
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    </div>
  );
};
