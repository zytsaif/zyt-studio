import React, { createContext, useContext, useState, useEffect } from 'react';
import { PLUGINS_DATA } from '../data/pluginsData';
import type { PluginItem } from '../data/pluginsData';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import type { PortfolioProject } from '../data/portfolioData';
import { SERVICES_DATA } from '../data/servicesData';
import type { ServiceItem } from '../data/servicesData';
import { REVIEWS_DATA } from '../data/reviewsData';
import type { ReviewItem } from '../data/reviewsData';

export interface ExtendedReviewItem extends ReviewItem {
  status: 'approved' | 'pending' | 'rejected';
  pinned?: boolean;
  hidden?: boolean;
  discord?: string;
}

export interface SectionContent {
  title: string;
  subtitle: string;
  description: string;
  primaryBtnText?: string;
  primaryBtnLink?: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
  imageUrl?: string;
  bgColor?: string;
  accentColor?: string;
  [key: string]: any;
}

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
  reviews: {
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

interface StoreContextType {
  // CMS State
  cmsSections: CMSSections;
  themeConfig: ThemeConfig;
  mediaLibrary: MediaItem[];
  plugins: PluginItem[];
  portfolio: PortfolioProject[];
  reviews: ExtendedReviewItem[];
  services: ServiceItem[];
  isAdmin: boolean;
  adminPin: string;
  discordWebhookUrl: string;

  // Actions
  setIsAdmin: (val: boolean) => void;
  setAdminPin: (pin: string) => void;
  setDiscordWebhookUrl: (url: string) => void;
  updateSection: <K extends keyof CMSSections>(section: K, content: Partial<CMSSections[K]>) => void;
  updateThemeConfig: (config: Partial<ThemeConfig>) => void;
  resetSection: (section: keyof CMSSections) => void;
  
  // Media Library
  addMediaItem: (item: Omit<MediaItem, 'id' | 'date'>) => void;
  deleteMediaItem: (id: string) => void;

  // Plugins CMS Actions
  addPlugin: (plugin: PluginItem) => void;
  updatePlugin: (plugin: PluginItem) => void;
  deletePlugin: (id: string) => void;
  reorderPlugins: (newPlugins: PluginItem[]) => void;

  // Portfolio CMS Actions
  addPortfolio: (project: PortfolioProject) => void;
  updatePortfolio: (project: PortfolioProject) => void;
  deletePortfolio: (id: string) => void;

  // Reviews CMS Actions
  addReview: (review: Omit<ExtendedReviewItem, 'id'>) => void;
  submitReview: (data: { author: string; discord: string; rating: number; quote: string }) => { success: boolean; message: string };
  approveReview: (id: string) => void;
  rejectReview: (id: string) => void;
  deleteReview: (id: string) => void;
  pinReview: (id: string) => void;
  toggleHideReview: (id: string) => void;
  updateReview: (review: ExtendedReviewItem) => void;

  // Services CMS Actions
  updateService: (service: ServiceItem) => void;

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
      { name: 'Reviews', href: '#reviews' },
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
  reviews: {
    title: 'Client Reviews',
    subtitle: 'Real Client Feedback',
    description: 'Verified feedback from Minecraft server owners, creators, and community leads.',
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
  const [adminPin, setAdminPinState] = useState<string>(() => localStorage.getItem('zyt_admin_pin') || 'admin123');
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

  // Plugins
  const [plugins, setPlugins] = useState<PluginItem[]>(() => {
    const saved = localStorage.getItem('zyt_plugins');
    return saved ? JSON.parse(saved) : PLUGINS_DATA;
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

  // Reviews
  const [reviews, setReviews] = useState<ExtendedReviewItem[]>(() => {
    const saved = localStorage.getItem('zyt_reviews');
    if (saved) return JSON.parse(saved);
    return REVIEWS_DATA.map((r) => ({
      ...r,
      status: 'approved' as const,
      pinned: r.id === '1',
      hidden: false,
      discord: '@client_user',
    }));
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

  useEffect(() => {
    localStorage.setItem('zyt_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const setAdminPin = (pin: string) => {
    setAdminPinState(pin);
    localStorage.setItem('zyt_admin_pin', pin);
  };

  const setDiscordWebhookUrl = (url: string) => {
    setDiscordWebhookUrlState(url);
    localStorage.setItem('zyt_discord_webhook', url);
  };

  const updateSection = <K extends keyof CMSSections>(section: K, content: Partial<CMSSections[K]>) => {
    setCmsSections((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...content,
      },
    }));
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

  // Plugin Actions
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

  // Reviews Actions
  const addReview = (reviewData: Omit<ExtendedReviewItem, 'id'>) => {
    const newRev: ExtendedReviewItem = {
      ...reviewData,
      id: 'rev_' + Date.now(),
    };
    setReviews((prev) => [newRev, ...prev]);
  };

  const submitReview = (data: { author: string; discord: string; rating: number; quote: string }) => {
    const duplicate = reviews.find(
      (r) => r.discord?.toLowerCase() === data.discord.toLowerCase() && r.quote === data.quote
    );
    if (duplicate) {
      return { success: false, message: 'Duplicate review detected. You have already submitted this review.' };
    }

    const newRev: ExtendedReviewItem = {
      id: 'rev_' + Date.now(),
      rating: data.rating,
      quote: data.quote,
      author: data.author,
      role: 'Community Member',
      serverName: 'Minecraft Server',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(data.author)}`,
      verifiedOrder: 'Custom Plugin Order',
      date: 'Just Now',
      status: 'pending',
      pinned: false,
      hidden: false,
      discord: data.discord,
    };

    setReviews((prev) => [newRev, ...prev]);
    return { success: true, message: 'Review submitted successfully! Pending admin approval.' };
  };

  const approveReview = (id: string) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'approved' } : r)));
  };

  const rejectReview = (id: string) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r)));
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const pinReview = (id: string) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, pinned: !r.pinned } : r)));
  };

  const toggleHideReview = (id: string) => {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, hidden: !r.hidden } : r)));
  };

  const updateReview = (review: ExtendedReviewItem) => {
    setReviews((prev) => prev.map((r) => (r.id === review.id ? review : r)));
  };

  const updateService = (service: ServiceItem) => {
    setServices((prev) => prev.map((s) => (s.id === service.id ? service : s)));
  };

  const resetAllCMS = () => {
    localStorage.clear();
    setCmsSections(DEFAULT_SECTIONS);
    setThemeConfigState(DEFAULT_THEME);
    setPlugins(PLUGINS_DATA);
    setPortfolio(PORTFOLIO_PROJECTS);
    setServices(SERVICES_DATA);
    setReviews(
      REVIEWS_DATA.map((r) => ({
        ...r,
        status: 'approved' as const,
        pinned: r.id === '1',
        hidden: false,
        discord: '@client_user',
      }))
    );
  };

  return (
    <StoreContext.Provider
      value={{
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
        submitReview,
        approveReview,
        rejectReview,
        deleteReview,
        pinReview,
        toggleHideReview,
        updateReview,
        updateService,
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
