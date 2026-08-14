import React, { useState, useEffect } from 'react';
import { StoreProvider } from './context/StoreContext';
import { ParticleBackground } from './components/ParticleBackground';
import { CursorGlow } from './components/CursorGlow';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedPlugins } from './components/FeaturedPlugins';
import { PluginModal } from './components/PluginModal';
import { PortfolioSection } from './components/PortfolioSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { OrderSection } from './components/OrderSection';
import { PaymentSection } from './components/PaymentSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminCMS } from './components/AdminCMS';
import { FloatingAdminBar } from './components/FloatingAdminBar';
import { ToastNotification } from './components/ToastNotification';
import { MinecraftAdvancementToast } from './components/MinecraftAdvancementToast';
import type { AdvancementItem } from './components/MinecraftAdvancementToast';
import type { PluginItem } from './data/pluginsData';

function AppContent() {
  const [selectedPlugin, setSelectedPlugin] = useState<PluginItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [cmsOpen, setCmsOpen] = useState(false);
  const [advancement, setAdvancement] = useState<AdvancementItem | null>(null);

  // Trigger initial Advancement Popup after initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerAdvancement(
        'Studio Explorer',
        'Welcome to Zyt Studio - Next-Gen Minecraft Studio',
        'trophy'
      );
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  // Check URL hash for #admin or /admin
  useEffect(() => {
    const handleHashCheck = () => {
      if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
        setCmsOpen(true);
      }
    };
    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 4000);
  };

  const triggerAdvancement = (
    title: string,
    description: string,
    icon: 'trophy' | 'diamond' | 'discord' | 'shield' = 'trophy'
  ) => {
    const newAdv: AdvancementItem = {
      id: 'adv_' + Date.now(),
      title,
      description,
      icon,
    };
    setAdvancement(newAdv);
    setTimeout(() => {
      setAdvancement((curr) => (curr?.id === newAdv.id ? null : curr));
    }, 4500);
  };

  const scrollToOrder = () => {
    const orderElem = document.getElementById('order');
    if (orderElem) {
      orderElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToPortfolio = () => {
    const portfolioElem = document.getElementById('portfolio');
    if (portfolioElem) {
      portfolioElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#05050a] text-gray-100 overflow-hidden font-sans selection:bg-purple-500 selection:text-white">
      {/* Scroll Progress Bar at Top */}
      <ScrollProgressBar />

      {/* Animated Custom Cursor & Trail Particles */}
      <CustomCursor />

      {/* Dynamic Cursor Ambient Spotlight */}
      <CursorGlow />

      {/* 3D Mascot Loading Screen */}
      <LoadingScreen />

      {/* Particle & Floating Cube Backdrop */}
      <ParticleBackground />

      {/* Minecraft Advancement Popup Notification */}
      <MinecraftAdvancementToast
        advancement={advancement}
        onClose={() => setAdvancement(null)}
      />

      {/* Navigation Header */}
      <Navbar
        onOrderClick={() => scrollToOrder()}
        onOpenAdmin={() => setCmsOpen(true)}
      />

      {/* Main Page Content */}
      <main className="relative z-10 space-y-0">
        <Hero
          onOrderClick={() => scrollToOrder()}
          onViewWorkClick={scrollToPortfolio}
        />

        <FeaturedPlugins
          onSelectPlugin={(plugin) => {
            setSelectedPlugin(plugin);
            triggerAdvancement('Plugin Inspection', `Inspecting ${plugin.name} specs!`, 'diamond');
          }}
          onOrderCustom={() => scrollToOrder()}
        />

        <PortfolioSection onOrderClick={() => scrollToOrder()} />

        <ServicesSection
          onSelectService={() => scrollToOrder()}
        />

        <WhyChooseUs />

        <OrderSection
          onTriggerAdvancement={triggerAdvancement}
        />

        <PaymentSection onTriggerToast={triggerToast} />

        <ContactSection onTriggerToast={triggerToast} />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setCmsOpen(true)} />

      {/* Floating Framer/Webflow Admin Control Toolbar */}
      <FloatingAdminBar
        onOpenFullCMS={() => setCmsOpen(true)}
        onTriggerToast={triggerToast}
      />

      {/* WordPress-Style Full Site CMS Panel */}
      <AdminCMS
        isOpen={cmsOpen}
        onClose={() => setCmsOpen(false)}
        onTriggerToast={triggerToast}
      />

      {/* Plugin Specs Modal */}
      <PluginModal
        plugin={selectedPlugin}
        onClose={() => setSelectedPlugin(null)}
        onOrderCustom={() => scrollToOrder()}
        onTriggerToast={triggerToast}
      />

      {/* Toast Notification */}
      <ToastNotification
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}

export function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}

export default App;
