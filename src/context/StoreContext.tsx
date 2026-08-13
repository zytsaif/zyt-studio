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

export interface PaymentSettings {
  upiId: string;
  qrCodeUrl: string;
  instructions: string;
  enabledMethods: {
    upi: boolean;
    card: boolean;
    paypal: boolean;
    crypto: boolean;
  };
}

export interface ContactSettings {
  discordUsername: string;
  discordInvite: string;
  email: string;
  responseTime: string;
  businessHours: string;
  socialLinks: {
    github: string;
    youtube: string;
    twitter: string;
  };
}

export interface WebsiteSettings {
  heroTitle: string;
  heroSubheading: string;
  mascotUrl: string;
  footerText: string;
  discordWebhookUrl: string;
  adminPin: string;
}

interface StoreContextType {
  plugins: PluginItem[];
  portfolio: PortfolioProject[];
  reviews: ExtendedReviewItem[];
  paymentSettings: PaymentSettings;
  contactSettings: ContactSettings;
  websiteSettings: WebsiteSettings;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  // Review actions
  submitReview: (review: { author: string; discord: string; rating: number; quote: string }) => { success: boolean; message: string };
  approveReview: (id: string) => void;
  rejectReview: (id: string) => void;
  deleteReview: (id: string) => void;
  pinReview: (id: string) => void;
  toggleHideReview: (id: string) => void;
  // Plugin actions
  addPlugin: (plugin: PluginItem) => void;
  updatePlugin: (plugin: PluginItem) => void;
  deletePlugin: (id: string) => void;
  // Portfolio actions
  addPortfolio: (project: PortfolioProject) => void;
  updatePortfolio: (project: PortfolioProject) => void;
  deletePortfolio: (id: string) => void;
  // Settings updates
  updatePaymentSettings: (settings: Partial<PaymentSettings>) => void;
  updateContactSettings: (settings: Partial<ContactSettings>) => void;
  updateWebsiteSettings: (settings: Partial<WebsiteSettings>) => void;
  // Reset defaults
  resetToDefaults: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Initialize plugins
  const [plugins, setPlugins] = useState<PluginItem[]>(() => {
    const saved = localStorage.getItem('zyt_plugins');
    return saved ? JSON.parse(saved) : PLUGINS_DATA;
  });

  // Initialize portfolio
  const [portfolio, setPortfolio] = useState<PortfolioProject[]>(() => {
    const saved = localStorage.getItem('zyt_portfolio');
    return saved ? JSON.parse(saved) : PORTFOLIO_PROJECTS;
  });

  // Initialize reviews
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

  // Initialize payment settings
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>(() => {
    const saved = localStorage.getItem('zyt_payment_settings');
    return saved
      ? JSON.parse(saved)
      : {
          upiId: 'zytsaif109@upi',
          qrCodeUrl: '/zyt_mascot.jpg',
          instructions: 'Scan QR Code or pay directly to the UPI ID. Once transferred, send screenshot on Discord for instant verification.',
          enabledMethods: { upi: true, card: true, paypal: true, crypto: true },
        };
  });

  // Initialize contact settings
  const [contactSettings, setContactSettings] = useState<ContactSettings>(() => {
    const saved = localStorage.getItem('zyt_contact_settings');
    return saved
      ? JSON.parse(saved)
      : {
          discordUsername: 'ZytStudio#0001',
          discordInvite: 'https://discord.gg',
          email: 'contact@zytstudio.com',
          responseTime: 'Within 24 Hours',
          businessHours: '24/7 Support & Monitoring',
          socialLinks: {
            github: 'https://github.com',
            youtube: 'https://youtube.com',
            twitter: 'https://twitter.com',
          },
        };
  });

  // Initialize website settings
  const [websiteSettings, setWebsiteSettings] = useState<WebsiteSettings>(() => {
    const saved = localStorage.getItem('zyt_website_settings');
    return saved
      ? JSON.parse(saved)
      : {
          heroTitle: 'Professional Minecraft Plugin Development',
          heroSubheading: 'Custom Plugins, Premium Systems, Server Solutions & Minecraft Development Services',
          mascotUrl: '/zyt_mascot.jpg',
          footerText: 'Building Professional Minecraft Experiences.',
          discordWebhookUrl: '',
          adminPin: 'admin123',
        };
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('zyt_plugins', JSON.stringify(plugins));
  }, [plugins]);

  useEffect(() => {
    localStorage.setItem('zyt_portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  useEffect(() => {
    localStorage.setItem('zyt_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('zyt_payment_settings', JSON.stringify(paymentSettings));
  }, [paymentSettings]);

  useEffect(() => {
    localStorage.setItem('zyt_contact_settings', JSON.stringify(contactSettings));
  }, [contactSettings]);

  useEffect(() => {
    localStorage.setItem('zyt_website_settings', JSON.stringify(websiteSettings));
  }, [websiteSettings]);

  // Review Actions
  const submitReview = (data: { author: string; discord: string; rating: number; quote: string }) => {
    // Check spam / duplicates
    const duplicate = reviews.find(
      (r) => r.discord.toLowerCase() === data.discord.toLowerCase() && r.quote === data.quote
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

  // Settings Updates
  const updatePaymentSettings = (settings: Partial<PaymentSettings>) => {
    setPaymentSettings((prev) => ({ ...prev, ...settings }));
  };

  const updateContactSettings = (settings: Partial<ContactSettings>) => {
    setContactSettings((prev) => ({ ...prev, ...settings }));
  };

  const updateWebsiteSettings = (settings: Partial<WebsiteSettings>) => {
    setWebsiteSettings((prev) => ({ ...prev, ...settings }));
  };

  const resetToDefaults = () => {
    localStorage.clear();
    setPlugins(PLUGINS_DATA);
    setPortfolio(PORTFOLIO_PROJECTS);
    setPaymentSettings({
      upiId: 'zytsaif109@upi',
      qrCodeUrl: '/zyt_mascot.jpg',
      instructions: 'Scan QR Code or pay directly to the UPI ID. Send screenshot on Discord for instant verification.',
      enabledMethods: { upi: true, card: true, paypal: true, crypto: true },
    });
  };

  return (
    <StoreContext.Provider
      value={{
        plugins,
        portfolio,
        reviews,
        paymentSettings,
        contactSettings,
        websiteSettings,
        isAdmin,
        setIsAdmin,
        submitReview,
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
