import React, { useState, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import type { CMSSections, ThemeConfig, AdminRole } from '../context/StoreContext';
import type { PluginItem } from '../data/pluginsData';
import type { PortfolioProject } from '../data/portfolioData';
import type { ServiceItem } from '../data/servicesData';
import { ImageUploader } from './ImageUploader';
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
  Download,
  Copy,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Sun,
  Moon,
  Layers,
  Code,
  Sliders,
  Menu,
  FileJson,
  UserCheck
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
  | 'services'
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
    services,
    reviews,
    isAdmin,
    adminRole,
    adminPin,
    editorPin,
    discordWebhookUrl,
    loginRole,
    logoutAdmin,
    setAdminPin,
    setEditorPin,
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
    addService,
    updateService,
    deleteService,
    addReview,
    approveReview,
    rejectReview,
    deleteReview,
    pinReview,
    toggleHideReview,
    exportCMSBackup,
    importCMSBackup,
    resetAllCMS,
  } = useStore();

  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Section & Item Editing States
  const [selectedSection, setSelectedSection] = useState<keyof CMSSections>('hero');
  const [editingPlugin, setEditingPlugin] = useState<PluginItem | null>(null);
  const [editingPortfolio, setEditingPortfolio] = useState<PortfolioProject | null>(null);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  // Media & Import File Ref
  const [mediaName, setMediaName] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const importFileRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const res = loginRole(pinInput);
    if (res.success) {
      setAuthError('');
      onTriggerToast(res.message);
    } else {
      setAuthError(res.message);
    }
  };

  // Backup Export
  const handleExportBackup = () => {
    const jsonStr = exportCMSBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zyt_studio_cms_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    onTriggerToast('Downloaded CMS Backup JSON file.');
  };

  // Backup Import
  const handleImportFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      if (content) {
        const res = importCMSBackup(content);
        onTriggerToast(res.message);
      }
    };
    reader.readAsText(file);
  };

  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaName || !mediaUrl) return;
    addMediaItem({ name: mediaName, url: mediaUrl, size: 'Online Asset' });
    onTriggerToast(`Added ${mediaName} to Media Library.`);
    setMediaName('');
    setMediaUrl('');
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
        <div className="px-4 sm:px-6 py-4 bg-gradient-to-r from-[#070815] via-[#0d0e22] to-[#120822] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isAdmin && (
              <button
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
                className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 p-[1px] hidden sm:block">
              <img src={cmsSections.navbar.logoUrl} alt="CMS Mascot" className="w-full h-full object-cover rounded-[9px]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold text-white font-mono">ZYT STUDIO CMS</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {adminRole === 'owner' ? 'OWNER ADMIN' : adminRole === 'editor' ? 'EDITOR' : 'CMS'}
                </span>
              </div>
              <p className="text-[11px] text-gray-400 font-mono hidden sm:block">Full Site Management Console</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {isAdmin && (
              <>
                {/* Export Backup JSON Button */}
                <button
                  onClick={handleExportBackup}
                  className="px-3 py-1.5 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-500/40 text-purple-200 text-xs font-mono font-semibold flex items-center gap-1.5"
                  title="Export Backup JSON"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" /> Export Backup
                </button>

                {/* Import Backup JSON */}
                <input
                  ref={importFileRef}
                  type="file"
                  accept="application/json"
                  onChange={handleImportFileSelect}
                  className="hidden"
                />
                <button
                  onClick={() => importFileRef.current?.click()}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-xs font-mono font-semibold flex items-center gap-1.5"
                  title="Import Backup JSON"
                >
                  <FileJson className="w-3.5 h-3.5 text-emerald-400" /> Import JSON
                </button>

                <button
                  onClick={logoutAdmin}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-mono border border-white/10"
                >
                  Lock
                </button>
              </>
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
          /* Role-Based Login Screen */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-600/20 to-cyan-500/20 border border-purple-500/40 flex items-center justify-center mx-auto shadow-2xl">
              <Lock className="w-10 h-10 text-purple-400" />
            </div>

            <div>
              <h4 className="text-2xl font-extrabold text-white font-mono">CMS Role Authorization</h4>
              <p className="text-xs text-gray-400 mt-1">
                Owner PIN: <code className="text-cyan-300">admin123</code> | Editor PIN: <code className="text-purple-300">editor123</code>
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
                placeholder="Enter Owner or Editor PIN..."
                className="w-full px-4 py-3.5 rounded-xl glass-input text-center text-sm font-mono tracking-widest"
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white font-bold text-xs shadow-xl shadow-purple-600/30 hover:scale-[1.01] transition-transform"
              >
                Access CMS Control Panel
              </button>
            </form>
          </div>
        ) : (
          /* Main Responsive CMS Workspace */
          <div className="flex flex-1 overflow-hidden relative">
            {/* Sidebar Navigation */}
            <aside
              className={`absolute lg:relative inset-y-0 left-0 z-30 w-64 bg-[#04050c] border-r border-white/10 p-4 space-y-2 shrink-0 overflow-y-auto transition-transform duration-300 ${
                mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400 px-3 py-1 font-mono">
                CMS Management
              </div>

              <button
                onClick={() => { setActiveTab('dashboard'); setMobileSidebarOpen(false); }}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                  activeTab === 'dashboard'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-cyan-400" /> Dashboard Overview
              </button>

              <button
                onClick={() => { setActiveTab('visual_editor'); setMobileSidebarOpen(false); }}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                  activeTab === 'visual_editor'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Eye className="w-4 h-4 text-emerald-400" /> Visual Section Editor
              </button>

              <button
                onClick={() => { setActiveTab('plugins'); setMobileSidebarOpen(false); }}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                  activeTab === 'plugins'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Package className="w-4 h-4 text-purple-400" /> Plugins Content ({plugins.length})
              </button>

              <button
                onClick={() => { setActiveTab('portfolio'); setMobileSidebarOpen(false); }}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                  activeTab === 'portfolio'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <FolderKanban className="w-4 h-4 text-blue-400" /> Portfolio ({portfolio.length})
              </button>

              <button
                onClick={() => { setActiveTab('services'); setMobileSidebarOpen(false); }}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                  activeTab === 'services'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Sliders className="w-4 h-4 text-amber-400" /> Services ({services.length})
              </button>

              <button
                onClick={() => { setActiveTab('reviews'); setMobileSidebarOpen(false); }}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                  activeTab === 'reviews'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Star className="w-4 h-4 text-yellow-400" /> Review Moderation ({reviews.length})
              </button>

              <button
                onClick={() => { setActiveTab('media'); setMobileSidebarOpen(false); }}
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
                onClick={() => { setActiveTab('theme'); setMobileSidebarOpen(false); }}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                  activeTab === 'theme'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Palette className="w-4 h-4 text-pink-400" /> Theme & Colors
              </button>

              <button
                onClick={() => { setActiveTab('settings'); setMobileSidebarOpen(false); }}
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
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#060712] space-y-6">
              {/* DASHBOARD TAB */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white font-mono">CMS Dashboard Overview</h3>

                  {/* Backup Import/Export Quick Action Banner */}
                  <div className="glass-card p-6 rounded-2xl border border-purple-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-purple-950/30 via-slate-900 to-cyan-950/30">
                    <div>
                      <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                        <FileJson className="w-5 h-5 text-cyan-400" /> Export & Import CMS Backup JSON
                      </h4>
                      <p className="text-xs text-gray-300 mt-1">
                        Export full site backups or restore previously saved `.json` CMS configuration files.
                      </p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <button
                        onClick={handleExportBackup}
                        className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" /> Export Backup JSON
                      </button>
                    </div>
                  </div>

                  {/* Logo System Uploader Quick Action Card */}
                  <div className="glass-card p-6 rounded-2xl border border-purple-500/40 space-y-4">
                    <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-purple-400" /> Website Logo & Mascot System
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ImageUploader
                        label="Navbar & Favicon Studio Logo"
                        value={cmsSections.navbar.logoUrl}
                        onChange={(newUrl) => {
                          updateSection('navbar', { logoUrl: newUrl });
                          onTriggerToast('Website logo updated dynamically!');
                        }}
                        onTriggerToast={onTriggerToast}
                      />

                      <ImageUploader
                        label="3D Mascot Hero Character Render"
                        value={cmsSections.hero.mascotUrl}
                        onChange={(newUrl) => {
                          updateSection('hero', { mascotUrl: newUrl });
                          onTriggerToast('Hero 3D Mascot render updated dynamically!');
                        }}
                        onTriggerToast={onTriggerToast}
                      />
                    </div>
                  </div>

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
                </div>
              )}

              {/* SERVICES TAB */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white font-mono">Services Management</h3>
                    <button
                      onClick={() =>
                        setEditingService({
                          id: 'serv_' + Date.now(),
                          title: 'New Service',
                          shortDesc: 'Short service description...',
                          fullDesc: 'Comprehensive full description of service...',
                          iconName: 'Code',
                          features: ['Feature 1', 'Feature 2'],
                          deliveryTime: '2 - 3 Days',
                          priceStart: 'From $49',
                        })
                      }
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" /> Add Service Card
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((srv) => (
                      <div key={srv.id} className="glass-card p-5 rounded-2xl space-y-3 border border-white/10 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <h5 className="text-base font-bold text-white font-mono">{srv.title}</h5>
                            <span className="text-xs text-cyan-400 font-mono font-bold">{srv.priceStart}</span>
                          </div>
                          <p className="text-xs text-gray-300 mt-1">{srv.shortDesc}</p>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                          <button
                            onClick={() => setEditingService(srv)}
                            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs flex items-center gap-1"
                          >
                            <Edit className="w-3.5 h-3.5 text-cyan-400" /> Edit
                          </button>
                          <button
                            onClick={() => {
                              deleteService(srv.id);
                              onTriggerToast(`Deleted ${srv.title}`);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800 text-xs flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Editing Service Modal */}
                  {editingService && (
                    <div className="p-6 glass-panel rounded-2xl border border-purple-500/40 space-y-4 text-xs">
                      <h4 className="text-sm font-bold text-white font-mono">Edit Service Specs</h4>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="text-gray-400">Title</label>
                          <input
                            type="text"
                            value={editingService.title}
                            onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                            className="w-full p-2.5 rounded-xl glass-input mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-gray-400">Starting Price</label>
                          <input
                            type="text"
                            value={editingService.priceStart}
                            onChange={(e) => setEditingService({ ...editingService, priceStart: e.target.value })}
                            className="w-full p-2.5 rounded-xl glass-input mt-1 font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-gray-400">Turnaround Time</label>
                          <input
                            type="text"
                            value={editingService.deliveryTime}
                            onChange={(e) => setEditingService({ ...editingService, deliveryTime: e.target.value })}
                            className="w-full p-2.5 rounded-xl glass-input mt-1 font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-gray-400">Description</label>
                        <textarea
                          rows={3}
                          value={editingService.fullDesc}
                          onChange={(e) => setEditingService({ ...editingService, fullDesc: e.target.value })}
                          className="w-full p-2.5 rounded-xl glass-input mt-1"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          onClick={() => setEditingService(null)}
                          className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            if (services.find((s) => s.id === editingService.id)) {
                              updateService(editingService);
                            } else {
                              addService(editingService);
                            }
                            onTriggerToast('Saved service card.');
                            setEditingService(null);
                          }}
                          className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold"
                        >
                          Save Service
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* VISUAL SECTION EDITOR */}
              {activeTab === 'visual_editor' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white font-mono">Visual Section Editor</h3>
                      <p className="text-xs text-gray-400">Select any section to modify text, buttons, titles & images live.</p>
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
                  <div className="glass-card p-6 rounded-2xl border border-purple-500/30 space-y-6">
                    <h4 className="text-sm font-bold text-purple-300 uppercase tracking-widest font-mono">
                      Editing Section: {selectedSection}
                    </h4>

                    {selectedSection === 'hero' && (
                      <div className="space-y-5 text-xs">
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

                        {/* Drag & Drop Mascot Uploader */}
                        <ImageUploader
                          label="3D Mascot Hero Character Render"
                          value={cmsSections.hero.mascotUrl}
                          onChange={(newUrl) => updateSection('hero', { mascotUrl: newUrl })}
                          onTriggerToast={onTriggerToast}
                        />
                      </div>
                    )}

                    {selectedSection === 'navbar' && (
                      <div className="space-y-5 text-xs">
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

                        {/* Drag & Drop Website Logo Uploader */}
                        <ImageUploader
                          label="Website Logo Image (Navbar & Favicon)"
                          value={cmsSections.navbar.logoUrl}
                          onChange={(newUrl) => updateSection('navbar', { logoUrl: newUrl })}
                          onTriggerToast={onTriggerToast}
                        />
                      </div>
                    )}

                    {selectedSection === 'payment' && (
                      <div className="space-y-5 text-xs">
                        <div>
                          <label className="text-gray-300 font-semibold">Official UPI ID</label>
                          <input
                            type="text"
                            value={cmsSections.payment.upiId}
                            onChange={(e) => updateSection('payment', { upiId: e.target.value })}
                            className="w-full p-3 rounded-xl glass-input mt-1 font-mono"
                          />
                        </div>

                        {/* Drag & Drop Payment QR Code Uploader */}
                        <ImageUploader
                          label="UPI QR Code Payment Image"
                          value={cmsSections.payment.qrCodeUrl}
                          onChange={(newUrl) => updateSection('payment', { qrCodeUrl: newUrl })}
                          onTriggerToast={onTriggerToast}
                        />

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

              {/* MEDIA LIBRARY */}
              {activeTab === 'media' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white font-mono">Media Library & Drag-and-Drop Image Uploader</h3>

                  <div className="glass-card p-6 rounded-2xl border border-purple-500/30 space-y-4">
                    <h4 className="text-xs font-bold text-purple-300 font-mono uppercase tracking-wider">
                      Upload Asset File to Library
                    </h4>

                    <ImageUploader
                      label="Choose Image File or Drag & Drop"
                      value={mediaUrl}
                      onChange={(newUrl) => {
                        setMediaUrl(newUrl);
                        addMediaItem({
                          name: mediaName || 'Uploaded Asset',
                          url: newUrl,
                          size: 'Custom Upload',
                        });
                        onTriggerToast('Asset uploaded into Media Library!');
                      }}
                      onTriggerToast={onTriggerToast}
                    />

                    <div className="pt-2">
                      <input
                        type="text"
                        value={mediaName}
                        onChange={(e) => setMediaName(e.target.value)}
                        placeholder="Optional Asset Title (e.g. Mascot Banner)"
                        className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {mediaLibrary.map((item) => (
                      <div key={item.id} className="glass-card p-3 rounded-2xl space-y-2 border border-white/10">
                        <div className="w-full h-28 rounded-xl overflow-hidden bg-black/60 border border-white/10">
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

              {/* PLUGINS CONTENT */}
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
                </div>
              )}

              {/* REVIEWS TAB */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white font-mono">Review Moderation</h3>
                    <span className="text-xs text-gray-400">Total: {reviews.length}</span>
                  </div>

                  <div className="space-y-3">
                    {reviews.map((rev) => (
                      <div key={rev.id} className="p-4 rounded-2xl glass-card border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white font-mono">{rev.author}</span>
                            <span className="text-xs text-yellow-400">★ {rev.rating}</span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 uppercase">
                              {rev.status}
                            </span>
                          </div>
                          <p className="text-xs text-gray-300 italic mt-1 font-sans">"{rev.quote}"</p>
                        </div>

                        <div className="flex items-center gap-2">
                          {rev.status !== 'approved' && (
                            <button
                              onClick={() => { approveReview(rev.id); onTriggerToast('Review approved!'); }}
                              className="px-2.5 py-1 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800 text-xs"
                            >
                              Approve
                            </button>
                          )}
                          <button
                            onClick={() => { pinReview(rev.id); onTriggerToast('Toggled review pin'); }}
                            className="p-1.5 rounded-lg bg-white/10 text-purple-300"
                          >
                            <Pin className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => { deleteReview(rev.id); onTriggerToast('Deleted review'); }}
                            className="p-1.5 rounded-lg bg-red-950/60 text-red-400"
                          >
                            <Trash2 className="w-4 h-4" />
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
                  <h3 className="text-xl font-bold text-white font-mono">Theme & Color Palette</h3>

                  <div className="glass-card p-6 rounded-2xl border border-purple-500/30 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <label className="text-gray-300 font-semibold">Primary Purple Color</label>
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

                    <button
                      onClick={() => onTriggerToast('Theme palette updated!')}
                      className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" /> Save Theme Settings
                    </button>
                  </div>
                </div>
              )}

              {/* SETTINGS TAB */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white font-mono">Global Site Settings & PIN Management</h3>

                  <div className="glass-card p-6 rounded-2xl border border-purple-500/30 space-y-4 text-xs">
                    <div>
                      <label className="text-gray-300 font-semibold">Discord Webhook URL</label>
                      <input
                        type="text"
                        value={discordWebhookUrl}
                        onChange={(e) => setDiscordWebhookUrl(e.target.value)}
                        placeholder="https://discord.com/api/webhooks/..."
                        className="w-full p-3 rounded-xl glass-input font-mono mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-gray-300 font-semibold">Master Owner PIN (Full CRUD Access)</label>
                        <input
                          type="text"
                          value={adminPin}
                          onChange={(e) => setAdminPin(e.target.value)}
                          className="w-full p-3 rounded-xl glass-input font-mono mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-gray-300 font-semibold">Content Editor PIN (Content Edits Only)</label>
                        <input
                          type="text"
                          value={editorPin}
                          onChange={(e) => setEditorPin(e.target.value)}
                          className="w-full p-3 rounded-xl glass-input font-mono mt-1"
                        />
                      </div>
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
