import React, { useState, useEffect } from 'react';
import { StoreProvider } from './context/StoreContext';
import { ParticleBackground } from './components/ParticleBackground';
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
import type { PluginItem } from './data/pluginsData';

function AppContent() {
  const [selectedPlugin, setSelectedPlugin] = useState<PluginItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [cmsOpen, setCmsOpen] = useState(false);

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
      {/* 3D Mascot Loading Screen */}
      <LoadingScreen />

      {/* Particle & Floating Cube Backdrop */}
      <ParticleBackground />

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
          onSelectPlugin={(plugin) => setSelectedPlugin(plugin)}
          onOrderCustom={() => scrollToOrder()}
        />

        <PortfolioSection onOrderClick={() => scrollToOrder()} />

        <ServicesSection
          onSelectService={() => scrollToOrder()}
        />

        <WhyChooseUs />

        <OrderSection />

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
