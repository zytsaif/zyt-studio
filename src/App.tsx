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
import { Testimonials } from './components/Testimonials';
import { OrderSection } from './components/OrderSection';
import { PaymentSection } from './components/PaymentSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';
import { ToastNotification } from './components/ToastNotification';
import type { PluginItem } from './data/pluginsData';

function AppContent() {
  const [selectedPlugin, setSelectedPlugin] = useState<PluginItem | null>(null);
  const [orderInitialPlugin, setOrderInitialPlugin] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);

  // Check URL hash for #admin or /admin
  useEffect(() => {
    const handleHashCheck = () => {
      if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
        setAdminOpen(true);
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

  const scrollToOrder = (pluginName?: string) => {
    if (pluginName) {
      setOrderInitialPlugin(pluginName);
    }
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
      {/* Dynamic 3D Mascot Loading Screen */}
      <LoadingScreen />

      {/* Particle & Isometric Floating Cube Backdrop */}
      <ParticleBackground />

      {/* Navigation Header with 3D Mascot */}
      <Navbar
        onOrderClick={() => scrollToOrder()}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Main Page Sections */}
      <main className="relative z-10 space-y-0">
        <Hero
          onOrderClick={() => scrollToOrder()}
          onViewWorkClick={scrollToPortfolio}
        />

        <FeaturedPlugins
          onSelectPlugin={(plugin) => setSelectedPlugin(plugin)}
          onOrderCustom={(name) => scrollToOrder(name)}
        />

        <PortfolioSection onOrderClick={() => scrollToOrder()} />

        <ServicesSection
          onSelectService={(serviceTitle) => scrollToOrder(`Service: ${serviceTitle}`)}
        />

        <WhyChooseUs />

        <Testimonials />

        <OrderSection
          initialPluginName={orderInitialPlugin}
          onTriggerToast={triggerToast}
        />

        <PaymentSection onTriggerToast={triggerToast} />

        <ContactSection onTriggerToast={triggerToast} />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setAdminOpen(true)} />

      {/* Admin Dashboard Modal */}
      <AdminDashboard
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        onTriggerToast={triggerToast}
      />

      {/* Plugin Details Modal */}
      <PluginModal
        plugin={selectedPlugin}
        onClose={() => setSelectedPlugin(null)}
        onOrderCustom={(name) => scrollToOrder(name)}
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
