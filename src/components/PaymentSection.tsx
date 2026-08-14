import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CreditCard, QrCode, Copy, Check, ShieldCheck, Lock, DollarSign, Wallet } from 'lucide-react';

interface PaymentSectionProps {
  onTriggerToast: (msg: string) => void;
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({ onTriggerToast }) => {
  const store = useStore();
  const cmsPayment = store?.cmsSections?.payment;
  const legacyPayment = store?.paymentSettings;

  const upiId = cmsPayment?.upiId || legacyPayment?.upiId || 'zytsaif109@upi';
  const qrCodeUrl = cmsPayment?.qrCodeUrl || legacyPayment?.qrCodeUrl || '/zyt_mascot.jpg';
  const instructions = cmsPayment?.instructions || legacyPayment?.instructions || 'Scan QR Code or pay directly to the UPI ID.';
  const enabledMethods = cmsPayment?.enabledMethods || legacyPayment?.enabledMethods || { upi: true, card: true, paypal: true, crypto: true };

  const [copiedUpi, setCopiedUpi] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    onTriggerToast(`UPI ID copied: ${upiId}`);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  return (
    <section id="payment" className="relative py-24 bg-[#05060e] z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/40">
            Transparent Transactions
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-4">
            Payment <span className="gradient-text-cyan">Methods</span>
          </h2>
          <p className="text-gray-400 mt-4 text-sm sm:text-base">
            Secure payments supported through UPI, Credit Cards, PayPal, and Cryptocurrency.
          </p>
        </div>

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* UPI Payment Card */}
          {enabledMethods?.upi !== false && (
            <div className="glass-card rounded-3xl p-8 border border-purple-500/40 shadow-2xl relative flex flex-col justify-between md:col-span-2 bg-gradient-to-br from-[#0d0e22] via-[#090a18] to-[#04050d]">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center">
                      <QrCode className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white font-mono">UPI Payment</h3>
                      <span className="text-xs text-gray-400">Instant Verification & Zero Fees</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Official VPA
                  </span>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed mb-6">
                  {instructions}
                </p>

                {/* Copyable UPI ID Box */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between mb-6">
                  <div className="space-y-0.5">
                    <div className="text-[11px] text-gray-400">Official UPI ID</div>
                    <div className="text-lg font-bold text-cyan-400 font-mono tracking-wider">
                      {upiId}
                    </div>
                  </div>

                  <button
                    onClick={handleCopyUpi}
                    className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors flex items-center gap-2"
                  >
                    {copiedUpi ? <Check className="w-4 h-4 text-green-300" /> : <Copy className="w-4 h-4 text-white" />}
                    {copiedUpi ? 'Copied' : 'Copy UPI ID'}
                  </button>
                </div>
              </div>

              {/* QR Trigger & Note */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => setShowQrModal(true)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <QrCode className="w-4 h-4 text-cyan-400" />
                  View UPI QR Code
                </button>

                <div className="text-xs text-gray-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Secure payments supported through UPI.</span>
                </div>
              </div>
            </div>
          )}

          {/* International & Cards Box */}
          <div className="glass-card rounded-3xl p-8 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <CreditCard className="w-6 h-6 text-cyan-400" />
              </div>

              <h3 className="text-xl font-bold text-white font-mono mb-2">Cards & Global</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                International client invoicing available via PayPal, Credit Cards, or Crypto.
              </p>

              <div className="space-y-3 font-mono text-xs text-gray-300">
                {enabledMethods?.paypal !== false && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <span>PayPal Invoicing</span>
                    <span className="text-cyan-400">Supported</span>
                  </div>
                )}
                {enabledMethods?.card !== false && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <span>Credit / Debit Card</span>
                    <span className="text-cyan-400">Supported</span>
                  </div>
                )}
                {enabledMethods?.crypto !== false && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <span>Crypto (USDT / BTC)</span>
                    <span className="text-cyan-400">Supported</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-center">
              <span className="text-[11px] text-gray-400 flex items-center justify-center gap-1">
                <Lock className="w-3.5 h-3.5 text-purple-400" /> 256-bit Encrypted Security
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-sm glass-panel p-6 rounded-3xl border border-purple-500/40 text-center space-y-4 shadow-2xl">
            <h3 className="text-xl font-bold text-white font-mono">Scan UPI QR Code</h3>
            <p className="text-xs text-gray-300">
              Scan using PhonePe, Google Pay, Paytm, or any UPI app.
            </p>

            {/* QR Code Display */}
            <div className="w-60 h-60 mx-auto bg-white p-3 rounded-2xl shadow-inner flex flex-col items-center justify-center border-4 border-purple-600 overflow-hidden">
              <img
                src={qrCodeUrl}
                alt="UPI Payment QR Code"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <div className="font-mono text-xs font-bold text-purple-300 bg-purple-950/60 p-2.5 rounded-xl border border-purple-800/40">
              UPI ID: {upiId}
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
            >
              Close Window
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
