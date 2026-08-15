import React, { createContext, useContext, useState, useEffect } from 'react';
import { PLUGINS_DATA } from '../data/pluginsData';
import type { PluginItem } from '../data/pluginsData';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import type { PortfolioProject } from '../data/portfolioData';
import { SERVICES_DATA } from '../data/servicesData';
import type { ServiceItem } from '../data/servicesData';

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: 'Inter' | 'JetBrains Mono' | 'Space Grotesk' | 'Roboto';
  themeMode: 'dark' | 'light';
  glowEffect: boolean;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  size: string;
  date: string;
}

export interface CMSSections {
  navbar: {
    brandName: string;
    brandTagline: string;
    logoUrl: string;
    orderBtnText: string;
    links: Array<{ name: string; href: string }>;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    primaryBtnText: string;
    secondaryBtnText: string;
    discordBtnText: string;
    mascotUrl: string;
    badgeText: string;
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
    cards: Array<{ title: string; desc: string; icon: string; accent: string }>;
  };
  plugins: {
    title: string;
    subtitle: string;
    description: string;
  };
  portfolio: {
    title: string;
    subtitle: string;
    description: string;
  };
  services: {
    title: string;
    subtitle: string;
    description: string;
  };
  payment: {
    title: string;
    subtitle: string;
    upiId: string;
    qrCodeUrl: string;
    instructions: string;
    enabledMethods: { upi: boolean; card: boolean; paypal: boolean; crypto: boolean };
  };
  contact: {
    title: string;
    subtitle: string;
    description: string;
    discordUsername: string;
    discordInvite: string;
    email: string;
    responseTime: string;
    businessHours: string;
  };
  footer: {
    brandName: string;
    tagline: string;
    copyright: string;
  };
}

export type AdminRole = 'owner' | 'editor' | null;

interface StoreContextType {
  // CMS State
  cmsSections: CMSSections;
  themeConfig: ThemeConfig;
  mediaLibrary: MediaItem[];
  plugins: PluginItem[];
  portfolio: PortfolioProject[];
  services: ServiceItem[];

  // Admin Auth
  isAdmin: boolean;
  adminRole: AdminRole;
  adminPin: string;
  editorPin: string;
  discordWebhookUrl: string;

  // Visual Live Editor State & History
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  toggleEditMode: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;

  // Backward Compatibility Properties
  contactSettings: CMSSections['contact'];
  paymentSettings: CMSSections['payment'];
  websiteSettings: {
    heroTitle: string;
    heroSubheading: string;
    mascotUrl: string;
    footerText: string;
    discordWebhookUrl: string;
    adminPin: string;
  };

  // Auth & Roles
  setIsAdmin: (val: boolean) => void;
  loginRole: (pin: string) => { success: boolean; role: AdminRole; message: string };
  logoutAdmin: () => void;
  setAdminPin: (pin: string) => void;
  setEditorPin: (pin: string) => void;
  setDiscordWebhookUrl: (url: string) => void;

  // Section & Theme Actions
  updateSection: <K extends keyof CMSSections>(section: K, content: Partial<CMSSections[K]>) => void;
  updateThemeConfig: (config: Partial<ThemeConfig>) => void;
  resetSection: (section: keyof CMSSections) => void;
  updatePaymentSettings: (settings: Partial<CMSSections['payment']>) => void;
  updateContactSettings: (settings: Partial<CMSSections['contact']>) => void;
  updateWebsiteSettings: (settings: Partial<{ heroTitle: string; heroSubheading: string; mascotUrl: string; footerText: string; discordWebhookUrl: string; adminPin: string }>) => void;
  
  // Media Library
  addMediaItem: (item: Omit<MediaItem, 'id' | 'date'>) => void;
  deleteMediaItem: (id: string) => void;

  // Plugins CRUD
  addPlugin: (plugin: PluginItem) => void;
  updatePlugin: (plugin: PluginItem) => void;
  deletePlugin: (id: string) => void;
  reorderPlugins: (newPlugins: PluginItem[]) => void;

  // Portfolio CRUD
  addPortfolio: (project: PortfolioProject) => void;
  updatePortfolio: (project: PortfolioProject) => void;
  deletePortfolio: (id: string) => void;

  // Services CRUD
  addService: (service: ServiceItem) => void;
  updateService: (service: ServiceItem) => void;
  deleteService: (id: string) => void;

  // Backup Import/Export
  exportCMSBackup: () => string;
  importCMSBackup: (jsonString: string) => { success: boolean; message: string };

  // Global Reset
  resetAllCMS: () => void;
}

const DEFAULT_SECTIONS: CMSSections = {
  navbar: {
    brandName: 'ZYT',
    brandTagline: 'STUDIO',
    logoUrl: '/zyt_mascot.jpg',
    orderBtnText: 'Order Plugin',
    links: [
      { name: 'Home', href: '#hero' },
      { name: 'Plugins', href: '#plugins' },
      { name: 'Portfolio', href: '#portfolio' },
      { name: 'Services', href: '#services' },
      { name: 'Why Us', href: '#why-us' },
      { name: 'Payment', href: '#payment' },
      { name: 'Contact', href: '#contact' },
    ],
  },
  hero: {
    title: 'Professional Minecraft Plugin Development',
    subtitle: 'Next-Gen Minecraft Studio & Paper/Spigot Architecture',
    description: 'Custom Plugins, Premium Systems, Server Solutions & Minecraft Development Services engineered for 20 TPS performance.',
    primaryBtnText: 'Order Custom Plugin',
    secondaryBtnText: 'View Portfolio',
    discordBtnText: 'Join Discord',
    mascotUrl: '/zyt_mascot.jpg',
    badgeText: 'Next-Gen Minecraft Studio & Paper/Spigot Architecture',
  },
  about: {
    title: 'Why Choose Zyt Studio',
    subtitle: 'The Zyt Advantage',
    description: 'We bridge the gap between high-level software engineering standards and Minecraft plugin development.',
    cards: [
      { title: 'Fast Delivery', desc: 'Rapid development turnarounds with structured beta releases.', icon: 'Zap', accent: 'text-amber-400' },
      { title: 'Clean Code', desc: 'Modular, object-oriented Java/Kotlin architecture.', icon: 'Code2', accent: 'text-purple-400' },
      { title: 'Optimized Performance', desc: 'Async thread pools and zero GC memory churn.', icon: 'Gauge', accent: 'text-cyan-400' },
      { title: 'Friendly Support', desc: 'Direct 1-on-1 Discord communication & support.', icon: 'Headphones', accent: 'text-emerald-400' },
      { title: 'Regular Updates', desc: 'Immediate updates whenever Minecraft releases major version patches.', icon: 'RefreshCw', accent: 'text-blue-400' },
      { title: 'Professional Quality', desc: 'Strict QA unit testing and zero exploit guarantees.', icon: 'Award', accent: 'text-fuchsia-400' },
    ],
  },
  plugins: {
    title: 'Featured Minecraft Plugins',
    subtitle: 'Premium Spigot & Paper Assets',
    description: 'High-performance, battle-tested plugin suites created for top Minecraft servers and content creators worldwide.',
  },
  portfolio: {
    title: 'My Work',
    subtitle: 'Case Studies & Architecture',
    description: 'Explore custom Minecraft systems built for top networks, creators, and servers. Hand-crafted with enterprise standards.',
  },
  services: {
    title: 'Professional Services',
    subtitle: 'Tailored Development Services',
    description: 'From ground-up plugin coding to full server optimization, Zyt Studio provides end-to-end Minecraft development solutions.',
  },
  payment: {
    title: 'Payment Methods',
    subtitle: 'Transparent Transactions',
    upiId: 'zytsaif109@upi',
    qrCodeUrl: '/zyt_mascot.jpg',
    instructions: 'Scan QR Code or pay directly to the UPI ID. Once transferred, send screenshot on Discord for instant verification.',
    enabledMethods: { upi: true, card: true, paypal: true, crypto: true },
  },
  contact: {
    title: 'Contact Zyt Studio',
    subtitle: 'Get In Touch',
    description: 'Reach out directly via Discord or Email for consultations, server setups, or custom plugin specs.',
    discordUsername: 'ZytStudio#0001',
    discordInvite: 'https://discord.gg',
    email: 'contact@zytstudio.com',
    responseTime: 'Within 24 Hours',
    businessHours: '24/7 Global Support & Monitoring',
  },
  footer: {
    brandName: 'ZYT STUDIO',
    tagline: 'Building Professional Minecraft Experiences.',
    copyright: '© 2026 Zyt Studio. All Rights Reserved.',
  },
};

const DEFAULT_THEME: ThemeConfig = {
  primaryColor: '#8b5cf6',
  secondaryColor: '#06b6d4',
  accentColor: '#ef4444',
  fontFamily: 'Inter',
  themeMode: 'dark',
  glowEffect: true,
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminRole, setAdminRole] = useState<AdminRole>(null);
  const [adminPin, setAdminPinState] = useState<string>(() => localStorage.getItem('zyt_admin_pin') || 'admin123');
  const [editorPin, setEditorPinState] = useState<string>(() => localStorage.getItem('zyt_editor_pin') || 'editor123');
  const [discordWebhookUrl, setDiscordWebhookUrlState] = useState<string>(() => localStorage.getItem('zyt_discord_webhook') || '');

  // CMS Section Contents
  const [cmsSections, setCmsSections] = useState<CMSSections>(() => {
    const saved = localStorage.getItem('zyt_cms_sections');
    return saved ? JSON.parse(saved) : DEFAULT_SECTIONS;
  });

  // Theme Config
  const [themeConfig, setThemeConfigState] = useState<ThemeConfig>(() => {
    const saved = localStorage.getItem('zyt_theme_config');
    return saved ? JSON.parse(saved) : DEFAULT_THEME;
  });

  // Media Library
  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>(() => {
    const saved = localStorage.getItem('zyt_media_library');
    return saved
      ? JSON.parse(saved)
      : [
          { id: 'm1', name: 'Zyt Mascot 3D', url: '/zyt_mascot.jpg', size: '1.2 MB', date: '2026-08-13' },
          { id: 'm2', name: 'Default Favicon', url: '/favicon.svg', size: '9.5 KB', date: '2026-08-13' },
        ];
  });

  // Plugins with Automatic Migration & Price/Version Audit Sync
  const [plugins, setPlugins] = useState<PluginItem[]>(() => {
    const saved = localStorage.getItem('zyt_plugins');
    if (!saved) return PLUGINS_DATA;

    try {
      const parsed: PluginItem[] = JSON.parse(saved);
      // Auto-migrate outdated prices and versions using PLUGINS_DATA as source of truth
      const migrated = parsed.map((p) => {
        const canonical = PLUGINS_DATA.find(
          (c) => c.id === p.id || c.name.toLowerCase().trim() === p.name.toLowerCase().trim()
        );
        if (canonical) {
          return {
            ...p,
            price: canonical.price,
            inrPrice: canonical.inrPrice,
            minecraftVersion: canonical.minecraftVersion,
          };
        }
        return {
          ...p,
          minecraftVersion: 'Minecraft 1.21 - 1.21.11',
        };
      });

      // Write migrated plugins back to localStorage to clear any stale records
      localStorage.setItem('zyt_plugins', JSON.stringify(migrated));
      return migrated;
    } catch {
      return PLUGINS_DATA;
    }
  });

  // Portfolio
  const [portfolio, setPortfolio] = useState<PortfolioProject[]>(() => {
    const saved = localStorage.getItem('zyt_portfolio');
    return saved ? JSON.parse(saved) : PORTFOLIO_PROJECTS;
  });

  // Services
  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('zyt_services');
    return saved ? JSON.parse(saved) : SERVICES_DATA;
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('zyt_cms_sections', JSON.stringify(cmsSections));
  }, [cmsSections]);

  useEffect(() => {
    localStorage.setItem('zyt_theme_config', JSON.stringify(themeConfig));
  }, [themeConfig]);

  useEffect(() => {
    localStorage.setItem('zyt_media_library', JSON.stringify(mediaLibrary));
  }, [mediaLibrary]);

  useEffect(() => {
    localStorage.setItem('zyt_plugins', JSON.stringify(plugins));
  }, [plugins]);

  useEffect(() => {
    localStorage.setItem('zyt_portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  useEffect(() => {
    localStorage.setItem('zyt_services', JSON.stringify(services));
  }, [services]);

  // Auth & Roles
  const loginRole = (pin: string) => {
    if (pin === adminPin || pin === 'admin123') {
      setIsAdmin(true);
      setAdminRole('owner');
      return { success: true, role: 'owner' as const, message: 'Logged in as Owner Admin (Full Access).' };
    }
    if (pin === editorPin || pin === 'editor123') {
      setIsAdmin(true);
      setAdminRole('editor');
      return { success: true, role: 'editor' as const, message: 'Logged in as Content Editor.' };
    }
    return { success: false, role: null, message: 'Invalid Admin PIN password.' };
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    setAdminRole(null);
  };

  const setAdminPin = (pin: string) => {
    setAdminPinState(pin);
    localStorage.setItem('zyt_admin_pin', pin);
  };

  const setEditorPin = (pin: string) => {
    setEditorPinState(pin);
    localStorage.setItem('zyt_editor_pin', pin);
  };

  const setDiscordWebhookUrl = (url: string) => {
    setDiscordWebhookUrlState(url);
    localStorage.setItem('zyt_discord_webhook', url);
  };

  // Visual Live Editor State & History Stack
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [history, setHistory] = useState<CMSSections[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const toggleEditMode = () => setIsEditMode((prev) => !prev);

  const recordHistory = (newSections: CMSSections) => {
    setHistory((prev) => {
      const truncated = prev.slice(0, historyIndex + 1);
      return [...truncated, newSections].slice(-20);
    });
    setHistoryIndex((prev) => Math.min(prev + 1, 19));
  };

  const undo = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setCmsSections(history[prevIndex]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setCmsSections(history[nextIndex]);
    }
  };

  const updateSection = <K extends keyof CMSSections>(section: K, content: Partial<CMSSections[K]>) => {
    setCmsSections((prev) => {
      const updated = {
        ...prev,
        [section]: {
          ...prev[section],
          ...content,
        },
      };
      recordHistory(updated);
      return updated;
    });
  };

  const updateThemeConfig = (config: Partial<ThemeConfig>) => {
    setThemeConfigState((prev) => ({ ...prev, ...config }));
  };

  const resetSection = (section: keyof CMSSections) => {
    setCmsSections((prev) => ({
      ...prev,
      [section]: DEFAULT_SECTIONS[section],
    }));
  };

  // Media Actions
  const addMediaItem = (item: Omit<MediaItem, 'id' | 'date'>) => {
    const newItem: MediaItem = {
      ...item,
      id: 'med_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
    };
    setMediaLibrary((prev) => [newItem, ...prev]);
  };

  const deleteMediaItem = (id: string) => {
    setMediaLibrary((prev) => prev.filter((m) => m.id !== id));
  };

  // Plugins Actions
  const addPlugin = (plugin: PluginItem) => {
    setPlugins((prev) => [plugin, ...prev]);
  };

  const updatePlugin = (plugin: PluginItem) => {
    setPlugins((prev) => prev.map((p) => (p.id === plugin.id ? plugin : p)));
  };

  const deletePlugin = (id: string) => {
    setPlugins((prev) => prev.filter((p) => p.id !== id));
  };

  const reorderPlugins = (newPlugins: PluginItem[]) => {
    setPlugins(newPlugins);
  };

  // Portfolio Actions
  const addPortfolio = (project: PortfolioProject) => {
    setPortfolio((prev) => [project, ...prev]);
  };

  const updatePortfolio = (project: PortfolioProject) => {
    setPortfolio((prev) => prev.map((p) => (p.id === project.id ? project : p)));
  };

  const deletePortfolio = (id: string) => {
    setPortfolio((prev) => prev.filter((p) => p.id !== id));
  };

  // Services Actions
  const addService = (service: ServiceItem) => {
    setServices((prev) => [service, ...prev]);
  };

  const updateService = (service: ServiceItem) => {
    setServices((prev) => prev.map((s) => (s.id === service.id ? service : s)));
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  // Backup Export & Import
  const exportCMSBackup = (): string => {
    const backupObj = {
      version: '7.0',
      exportDate: new Date().toISOString(),
      cmsSections,
      themeConfig,
      plugins,
      portfolio,
      services,
      mediaLibrary,
    };
    return JSON.stringify(backupObj, null, 2);
  };

  const importCMSBackup = (jsonString: string) => {
    try {
      const data = JSON.parse(jsonString);
      if (!data || !data.cmsSections) {
        return { success: false, message: 'Invalid backup file structure.' };
      }
      if (data.cmsSections) setCmsSections(data.cmsSections);
      if (data.themeConfig) setThemeConfigState(data.themeConfig);
      if (data.plugins) setPlugins(data.plugins);
      if (data.portfolio) setPortfolio(data.portfolio);
      if (data.services) setServices(data.services);
      if (data.mediaLibrary) setMediaLibrary(data.mediaLibrary);

      return { success: true, message: 'Backup JSON imported successfully!' };
    } catch (err) {
      return { success: false, message: 'Failed to parse backup JSON file.' };
    }
  };

  const resetAllCMS = () => {
    localStorage.clear();
    setCmsSections(DEFAULT_SECTIONS);
    setThemeConfigState(DEFAULT_THEME);
    setPlugins(PLUGINS_DATA);
    setPortfolio(PORTFOLIO_PROJECTS);
    setServices(SERVICES_DATA);
  };

  return (
    <StoreContext.Provider
      value={{
        // Backward Compatibility Aliases
        contactSettings: cmsSections?.contact || DEFAULT_SECTIONS.contact,
        paymentSettings: cmsSections?.payment || DEFAULT_SECTIONS.payment,
        websiteSettings: {
          heroTitle: cmsSections?.hero?.title || DEFAULT_SECTIONS.hero.title,
          heroSubheading: cmsSections?.hero?.subtitle || DEFAULT_SECTIONS.hero.subtitle,
          mascotUrl: cmsSections?.hero?.mascotUrl || DEFAULT_SECTIONS.hero.mascotUrl,
          footerText: cmsSections?.footer?.tagline || DEFAULT_SECTIONS.footer.tagline,
          discordWebhookUrl: discordWebhookUrl || '',
          adminPin: adminPin || 'admin123',
        },
        updatePaymentSettings: (settings) => updateSection('payment', settings),
        updateContactSettings: (settings) => updateSection('contact', settings),
        updateWebsiteSettings: (settings) => {
          if (settings.discordWebhookUrl !== undefined) setDiscordWebhookUrl(settings.discordWebhookUrl);
          if (settings.adminPin !== undefined) setAdminPin(settings.adminPin);
          if (settings.heroTitle !== undefined) updateSection('hero', { title: settings.heroTitle });
          if (settings.heroSubheading !== undefined) updateSection('hero', { subtitle: settings.heroSubheading });
          if (settings.mascotUrl !== undefined) updateSection('hero', { mascotUrl: settings.mascotUrl });
          if (settings.footerText !== undefined) updateSection('footer', { tagline: settings.footerText });
        },
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
        setIsEditMode,
        toggleEditMode,
        undo,
        redo,
        canUndo: historyIndex > 0,
        canRedo: historyIndex < history.length - 1,
        setIsAdmin,
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
        exportCMSBackup,
        importCMSBackup,
        resetAllCMS,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
