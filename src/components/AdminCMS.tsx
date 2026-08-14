import React, { useState, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import type { CMSSections, ThemeConfig, AdminRole } from '../context/StoreContext';
import type { PluginItem } from '../data/pluginsData';
import type { PortfolioProject } from '../data/portfolioData';
import type { ServiceItem } from '../data/servicesData';
import { ImageUploader } from './ImageUploader';
import { EditPluginModal } from './EditPluginModal';
import {
  LayoutDashboard,
  Eye,
  Package,
  FolderKanban,
  ImageIcon,
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
  Pin,
  RefreshCw,
  Upload,
  Download,
  Sliders,
  Sparkles,
  Layers,
  LogOut,
  ChevronRight,
  SlidersHorizontal,
  Disc as DiscordIcon,
  Mail,
  ExternalLink,
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
    isAdmin,
    adminRole,
    adminPin,
    editorPin,
    discordWebhookUrl,
    isEditMode,
    toggleEditMode,
    loginRole,
    logoutAdmin,
    setAdminPin,
    setEditorPin,
    setDiscordWebhookUrl,
    updateSection,
    updateThemeConfig,
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
    exportCMSBackup,
    importCMSBackup,
    resetAllCMS,
  } = useStore();

  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<keyof CMSSections>('hero');
  const [editingPlugin, setEditingPlugin] = useState<PluginItem | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const res = loginRole(pinInput.trim());
    if (res.success) {
      setAuthError('');
      setPinInput('');
      onTriggerToast(res.message);
    } else {
      setAuthError(res.message);
    }
  };

  const movePlugin = (index: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= plugins.length) return;
    const newArr = [...plugins];
    const temp = newArr[index];
    newArr[index] = newArr[newIdx];
    newArr[newIdx] = temp;
    reorderPlugins(newArr);
    onTriggerToast('Plugins reordered.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-2 sm:p-4 font-sans overflow-hidden">
      <div className="relative w-full max-w-7xl h-[92vh] bg-[#070815] border border-purple-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* TOP TOOLBAR HEADER */}
        <header className="px-6 py-4 border-b border-white/10 bg-[#090b1c] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white font-mono tracking-wide">
                  ZytStudio CMS Studio
                </h2>
                {isAdmin && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-purple-950 text-purple-300 border border-purple-800">
                    Role: {adminRole}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400">
                Visual Live Website Editor & Management Studio
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <>
                <button
                  onClick={() => {
                    toggleEditMode();
                    onTriggerToast(
                      !isEditMode
                        ? 'Visual Live Editor Enabled! Double-click text on homepage to edit.'
                        : 'Visual Live Editor Disabled.'
                    );
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-lg ${
                    isEditMode
                      ? 'bg-emerald-600 text-white shadow-emerald-600/30 border border-emerald-400'
                      : 'bg-white/10 text-cyan-300 hover:bg-white/20 border border-cyan-500/30'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  {isEditMode ? 'Live Editor ACTIVE' : 'Enable Visual Live Editor'}
                </button>

                <button
                  onClick={() => {
                    const json = exportCMSBackup();
                    const blob = new Blob([json], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `zyt_studio_backup_${Date.now()}.json`;
                    a.click();
                    onTriggerToast('Exported CMS Backup JSON!');
                  }}
                  className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-mono flex items-center gap-1.5 border border-white/10"
                >
                  <Download className="w-3.5 h-3.5" /> Export Backup
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-mono flex items-center gap-1.5 border border-white/10"
                >
                  <Upload className="w-3.5 h-3.5" /> Import Backup
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".json"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (evt) => {
                        const content = evt.target?.result as string;
                        const res = importCMSBackup(content);
                        onTriggerToast(res.message);
                      };
                      reader.readAsText(file);
                    }
                  }}
                />

                <button
                  onClick={logoutAdmin}
                  className="p-2 rounded-xl bg-red-950/60 hover:bg-red-900 border border-red-800 text-red-300 text-xs"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* AUTHENTICATION GATE IF NOT ADMIN */}
        {!isAdmin ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-radial-purple">
            <div className="glass-card max-w-md w-full p-8 rounded-3xl border border-purple-500/40 shadow-2xl text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/50 text-purple-400 flex items-center justify-center mx-auto shadow-inner">
                <Lock className="w-8 h-8 text-cyan-400" />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white font-mono">
                  Admin PIN Authorization
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Enter your Owner PIN (<code className="text-cyan-300">admin123</code>) or Editor PIN (<code className="text-purple-300">editor123</code>) to access the Studio.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter Passcode PIN..."
                  className="w-full px-4 py-3.5 rounded-2xl glass-input text-center text-lg tracking-widest font-mono text-white focus:border-purple-500"
                  autoFocus
                />

                {authError && (
                  <p className="text-xs text-red-400 font-mono bg-red-950/60 p-2.5 rounded-xl border border-red-800">
                    {authError}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30 transition-all font-mono"
                >
                  Authorize Entry ➔
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* WORKSPACE MAIN PANELS */
          <div className="flex-1 flex overflow-hidden">
            {/* PANEL 1: Left Navigation Sidebar */}
            <aside
              className={`w-64 bg-[#050614] border-r border-white/10 p-4 space-y-2 shrink-0 overflow-y-auto transition-transform ${
                mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
              }`}
            >
              <div className="text-[10px] font-bold uppercase tracking-wider text-purple-400 px-3 py-1 font-mono">
                Component Navigator
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
                <Eye className="w-4 h-4 text-emerald-400" /> Live Section Studio
              </button>

              <button
                onClick={() => { setActiveTab('plugins'); setMobileSidebarOpen(false); }}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                  activeTab === 'plugins'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Package className="w-4 h-4 text-purple-400" /> Plugins Suite ({plugins.length})
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
                onClick={() => { setActiveTab('media'); setMobileSidebarOpen(false); }}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                  activeTab === 'media'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <ImageIcon className="w-4 h-4 text-fuchsia-400" /> Media Manager ({mediaLibrary.length})
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
                <Palette className="w-4 h-4 text-pink-400" /> Theme & Palette
              </button>

              <button
                onClick={() => { setActiveTab('settings'); setMobileSidebarOpen(false); }}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 transition-colors ${
                  activeTab === 'settings'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Settings className="w-4 h-4 text-cyan-400" /> Global Settings & Discord
              </button>
            </aside>

            {/* PANEL 2: Center Main Work Area */}
            <main className="flex-1 p-6 overflow-y-auto bg-[#070815] space-y-6">
              {/* DASHBOARD TAB */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <div className="glass-card p-6 rounded-2xl border border-purple-500/30">
                    <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2 mb-4">
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

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="glass-card p-5 rounded-2xl">
                      <div className="text-xs text-gray-400">Total Plugins</div>
                      <div className="text-3xl font-extrabold text-white font-mono mt-1 text-glow-purple">
                        {plugins.length}
                      </div>
                    </div>
                    <div className="glass-card p-5 rounded-2xl">
                      <div className="text-xs text-gray-400 font-mono">Portfolio Items</div>
                      <div className="text-3xl font-extrabold text-cyan-400 font-mono mt-1">
                        {portfolio.length}
                      </div>
                    </div>
                    <div className="glass-card p-5 rounded-2xl">
                      <div className="text-xs text-gray-400 font-mono">Active Services</div>
                      <div className="text-3xl font-extrabold text-amber-400 font-mono mt-1">
                        {services.length}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* VISUAL EDITOR / SECTION INSPECTOR */}
              {activeTab === 'visual_editor' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white font-mono">
                        Live Section Inspector Studio
                      </h3>
                      <p className="text-xs text-gray-400">
                        Select a section below to edit its exact copy and images.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={toggleEditMode}
                        className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 ${
                          isEditMode ? 'bg-emerald-600 text-white' : 'bg-white/10 text-cyan-300'
                        }`}
                      >
                        <Eye className="w-4 h-4" />
                        {isEditMode ? 'Edit Mode ON' : 'Turn On Edit Mode'}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {(
                      [
                        'hero',
                        'navbar',
                        'about',
                        'plugins',
                        'portfolio',
                        'services',
                        'payment',
                        'contact',
                        'footer',
                      ] as Array<keyof CMSSections>
                    ).map((sec) => (
                      <button
                        key={sec}
                        onClick={() => setSelectedSection(sec)}
                        className={`p-3.5 rounded-2xl border text-left capitalize transition-all ${
                          selectedSection === sec
                            ? 'bg-purple-600/30 border-purple-500 text-white font-bold'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                        }`}
                      >
                        <div className="text-xs font-mono font-bold">{sec} Section</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* PLUGINS TAB */}
              {activeTab === 'plugins' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white font-mono">
                      Plugin Suite Management
                    </h3>
                    <button
                      onClick={() => {
                        const newPlg: PluginItem = {
                          id: 'mocap-studio-' + Date.now(),
                          name: 'Mocap Studio',
                          price: '$39.99',
                          description:
                            'Professional Minecraft motion capture and cinematic animation plugin with camera paths, emotes, NPC animation and recording tools.',
                          image: '/zyt_mascot.jpg',
                          features: [
                            'Live Motion Capture Sync',
                            'Cinematic Camera Pathing',
                            'Custom NPC Emotes',
                            'Keyframe Timeline Editor',
                          ],
                          category: 'Recording / Cinematic Tools',
                          downloadUrl: 'https://spigotmc.org',
                        };
                        addPlugin(newPlg);
                        onTriggerToast('Added Mocap Studio Plugin!');
                      }}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold font-mono flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Add Mocap / New Plugin
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
                              <span className="text-[10px] bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded font-mono">
                                {plg.category}
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
                            <Edit className="w-3.5 h-3.5 text-cyan-400" /> Edit Specs
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

              {/* SERVICES TAB */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white font-mono">Services Management</h3>
                    <button
                      onClick={() => {
                        const newSrv: ServiceItem = {
                          id: 'srv_' + Date.now(),
                          title: 'Custom Optimization & Audit',
                          price: 'From $49',
                          description: 'Complete server thread tuning, spark profiler analysis and memory leak patch.',
                          features: ['Spark Profiler Audit', 'Async Thread Setup', 'Garbage Collector Tuning'],
                          iconName: 'Gauge',
                          popular: true,
                        };
                        addService(newSrv);
                        onTriggerToast('Added new service!');
                      }}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold font-mono flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Add Service
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.map((srv) => (
                      <div key={srv.id} className="glass-card p-5 rounded-2xl border border-white/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-base font-bold text-white font-mono">{srv.title}</h4>
                          <span className="text-xs bg-purple-950 text-purple-300 px-2.5 py-1 rounded font-mono font-bold">
                            {srv.price}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400">{srv.description}</p>
                        <div className="pt-2 flex justify-end">
                          <button
                            onClick={() => {
                              deleteService(srv.id);
                              onTriggerToast(`Deleted ${srv.title}`);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-red-950/60 text-red-300 border border-red-800 text-xs flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MEDIA MANAGER TAB */}
              {activeTab === 'media' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white font-mono">Media Asset Manager</h3>
                    <ImageUploader
                      label="Upload New Media"
                      value=""
                      onChange={(newUrl) => {
                        addMediaItem({ name: 'Uploaded Asset', url: newUrl, size: 'Original' });
                        onTriggerToast('Added asset to media library!');
                      }}
                      onTriggerToast={onTriggerToast}
                    />
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

              {/* THEME TAB */}
              {activeTab === 'theme' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white font-mono">Theme Palette</h3>
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
                  </div>
                </div>
              )}

              {/* SETTINGS TAB */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white font-mono">Global Settings & Links</h3>

                  <div className="glass-card p-6 rounded-2xl border border-purple-500/40 space-y-4 text-xs">
                    <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                      <DiscordIcon className="w-4 h-4 text-indigo-400" /> Discord & Contact Links
                    </h4>

                    <div>
                      <label className="text-gray-300 font-semibold font-mono">Discord Invite Link</label>
                      <input
                        type="text"
                        value={cmsSections.contact.discordInvite}
                        onChange={(e) => updateSection('contact', { discordInvite: e.target.value })}
                        placeholder="e.g. https://discord.gg/yourserver"
                        className="w-full p-3 rounded-xl glass-input font-mono mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-gray-300 font-semibold font-mono font-mono">Official Email</label>
                      <input
                        type="text"
                        value={cmsSections.contact.email}
                        onChange={(e) => updateSection('contact', { email: e.target.value })}
                        placeholder="e.g. contact@zytstudio.com"
                        className="w-full p-3 rounded-xl glass-input font-mono mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-gray-300 font-semibold font-mono font-mono">Discord Webhook URL</label>
                      <input
                        type="text"
                        value={discordWebhookUrl}
                        onChange={(e) => setDiscordWebhookUrl(e.target.value)}
                        className="w-full p-3 rounded-xl glass-input font-mono mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-gray-300 font-semibold font-mono font-mono">Master Owner PIN</label>
                      <input
                        type="text"
                        value={adminPin}
                        onChange={(e) => setAdminPin(e.target.value)}
                        className="w-full p-3 rounded-xl glass-input font-mono mt-1"
                      />
                    </div>

                    <button
                      onClick={() => onTriggerToast('Saved global settings!')}
                      className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
                    >
                      Save Settings
                    </button>
                  </div>
                </div>
              )}
            </main>

            {/* PANEL 3: Right Contextual Property Inspector Panel */}
            <aside className="w-72 bg-[#04050c] border-l border-white/10 p-5 space-y-5 shrink-0 overflow-y-auto hidden xl:block text-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-bold text-white font-mono flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-cyan-400" /> Property Inspector
                </span>
                <span className="text-[10px] text-purple-400 font-mono uppercase bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
                  {selectedSection}
                </span>
              </div>

              {selectedSection === 'hero' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 font-semibold">Title</label>
                    <input
                      type="text"
                      value={cmsSections.hero.title}
                      onChange={(e) => updateSection('hero', { title: e.target.value })}
                      className="w-full p-2.5 rounded-xl glass-input mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 font-semibold">Subtitle / Badge</label>
                    <input
                      type="text"
                      value={cmsSections.hero.badgeText}
                      onChange={(e) => updateSection('hero', { badgeText: e.target.value })}
                      className="w-full p-2.5 rounded-xl glass-input mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 font-semibold">Description</label>
                    <textarea
                      rows={3}
                      value={cmsSections.hero.description}
                      onChange={(e) => updateSection('hero', { description: e.target.value })}
                      className="w-full p-2.5 rounded-xl glass-input mt-1"
                    />
                  </div>
                </div>
              )}

              {selectedSection === 'contact' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 font-semibold">Discord Invite Link</label>
                    <input
                      type="text"
                      value={cmsSections.contact.discordInvite}
                      onChange={(e) => updateSection('contact', { discordInvite: e.target.value })}
                      className="w-full p-2.5 rounded-xl glass-input mt-1 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 font-semibold">Discord Username</label>
                    <input
                      type="text"
                      value={cmsSections.contact.discordUsername}
                      onChange={(e) => updateSection('contact', { discordUsername: e.target.value })}
                      className="w-full p-2.5 rounded-xl glass-input mt-1 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 font-semibold">Official Email</label>
                    <input
                      type="text"
                      value={cmsSections.contact.email}
                      onChange={(e) => updateSection('contact', { email: e.target.value })}
                      className="w-full p-2.5 rounded-xl glass-input mt-1 font-mono"
                    />
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => onTriggerToast('Property inspector edits saved.')}
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save Property Specs
                </button>
              </div>
            </aside>
          </div>
        )}
      </div>

      {/* Render EditPluginModal when editingPlugin is non-null */}
      {editingPlugin && (
        <EditPluginModal
          plugin={editingPlugin}
          onClose={() => setEditingPlugin(null)}
          onSave={(updatedPlugin) => {
            if (plugins.find((p) => p.id === updatedPlugin.id)) {
              updatePlugin(updatedPlugin);
            } else {
              addPlugin(updatedPlugin);
            }
          }}
          onTriggerToast={onTriggerToast}
        />
      )}
    </div>
  );
};
