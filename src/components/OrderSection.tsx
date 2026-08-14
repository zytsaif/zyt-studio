import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useStore } from '../context/StoreContext';
import { Sparkles, Clock, Send, ShieldCheck, CheckCircle2, DollarSign, Calendar, Server, Disc as DiscordIcon, Mail, User, IndianRupee, MessageSquare, ExternalLink, Ticket } from 'lucide-react';

interface OrderSectionProps {
  initialPluginName?: string;
  onTriggerToast: (msg: string) => void;
  onOpenRequestsPortal?: () => void;
}

export const OrderSection: React.FC<OrderSectionProps> = ({
  initialPluginName = '',
  onTriggerToast,
  onOpenRequestsPortal,
}) => {
  const store = useStore();
  const cmsSections = store?.cmsSections;
  const contact = cmsSections?.contact || store?.contactSettings;
  const webhookUrl = store?.discordWebhookUrl || store?.websiteSettings?.discordWebhookUrl;
  const addOrderRequest = store?.addOrderRequest;

  const responseTime = contact?.responseTime || 'Within 24 Hours';
  const discordInvite = contact?.discordInvite || 'https://discord.gg';

  // Budget & Currency State
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [budgetPreset, setBudgetPreset] = useState<string>('2000-5000');
  const [customMin, setCustomMin] = useState<string>('');
  const [customMax, setCustomMax] = useState<string>('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    discord: '',
    serverName: '',
    pluginIdea: '',
    deadline: 'Within 1 Week',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState<any>(null);

  useEffect(() => {
    if (initialPluginName) {
      setFormData((prev) => ({
        ...prev,
        pluginIdea: `Order Inquiry for: ${initialPluginName}\n\nKey Requirements:\n- Custom features:\n- Target Minecraft version: 1.20.x`,
      }));
    }
  }, [initialPluginName]);

  // Compute budget formatted string
  const getFormattedBudget = () => {
    const symbol = currency === 'INR' ? '₹' : '$';
    if (budgetPreset === 'custom') {
      const min = customMin ? parseInt(customMin).toLocaleString() : '0';
      const max = customMax ? parseInt(customMax).toLocaleString() : '∞';
      return `${symbol}${min} - ${symbol}${max}`;
    }

    if (currency === 'INR') {
      switch (budgetPreset) {
        case '500-2000': return '₹500 - ₹2,000';
        case '2000-5000': return '₹2,000 - ₹5,000';
        case '5000-10000': return '₹5,000 - ₹10,000';
        case '10000-25000': return '₹10,000 - ₹25,000';
        default: return '₹2,000 - ₹5,000';
      }
    } else {
      switch (budgetPreset) {
        case '10-50': return '$10 - $50';
        case '50-150': return '$50 - $150';
        case '150-350': return '$150 - $350';
        case '350-800': return '$350 - $800';
        default: return '$50 - $150';
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.discord || !formData.pluginIdea) {
      onTriggerToast('Please fill out all required fields before submitting.');
      return;
    }

    const randomTicket = 'ZYT-' + Math.floor(100000 + Math.random() * 900000);
    const formattedBudget = getFormattedBudget();

    let minVal = '2000';
    let maxVal = '5000';
    if (budgetPreset === 'custom') {
      minVal = customMin || '0';
      maxVal = customMax || '0';
    } else {
      const parts = budgetPreset.split('-');
      minVal = parts[0] || '0';
      maxVal = parts[1] || '0';
    }

    // Add Order Request to Store & LocalStorage
    const newReq = addOrderRequest({
      id: randomTicket,
      name: formData.name,
      email: formData.email,
      discord: formData.discord,
      serverName: formData.serverName,
      pluginIdea: formData.pluginIdea,
      currency,
      budgetMin: minVal,
      budgetMax: maxVal,
      budgetFormatted: formattedBudget,
      deadline: formData.deadline,
    });

    setSubmittedRequest(newReq);
    setSubmitted(true);

    // Confetti celebration
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch (err) {
      console.warn('Confetti error:', err);
    }

    // Send Discord Webhook notification if URL configured
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            embeds: [
              {
                title: `⚡ New Custom Plugin Request [${randomTicket}]`,
                color: 0x8b5cf6,
                fields: [
                  { name: 'Customer Name', value: formData.name, inline: true },
                  { name: 'Discord Handle', value: formData.discord, inline: true },
                  { name: 'Email Address', value: formData.email, inline: true },
                  { name: 'Server Name', value: formData.serverName || 'N/A', inline: true },
                  { name: 'Currency & Budget', value: `${currency} (${formattedBudget})`, inline: true },
                  { name: 'Deadline', value: formData.deadline, inline: true },
                  { name: 'Plugin Requirements', value: formData.pluginIdea },
                ],
                footer: { text: 'Zyt Studio Request Dispatcher' },
                timestamp: new Date().toISOString(),
              },
            ],
          }),
        });
      } catch (err) {
        console.error('Webhook notification error:', err);
      }
    }

    onTriggerToast(`Order request submitted! Ticket #${randomTicket}`);
  };

  return (
    <section id="order" className="relative py-24 bg-[#070815] z-10 border-t border-white/5">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40">
            Client Request Platform
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-4">
            Order Custom <span className="gradient-text-purple">Minecraft Plugin</span>
          </h2>
          <p className="text-gray-400 mt-4 text-sm sm:text-base">
            Submit your plugin specifications for a detailed quote. Every request gets a trackable Ticket ID!
          </p>

          <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 text-xs font-semibold">
            <Clock className="w-4 h-4 text-cyan-400 animate-spin-slow" />
            <span>Estimated Response Time: <strong className="text-white">{responseTime}</strong></span>
          </div>
        </div>

        {/* Order Form Card */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-purple-500/30 shadow-2xl relative">
          {submitted ? (
            /* Discord CTA & Success Screen */
            <div className="text-center py-10 space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>

              <div>
                <h3 className="text-3xl font-extrabold text-white font-mono">Your request has been received successfully!</h3>
                <p className="text-sm text-gray-300 max-w-lg mx-auto leading-relaxed mt-2">
                  Thank you, <strong className="text-purple-300">{formData.name}</strong>! Your ticket has been logged into our queue.
                </p>
              </div>

              {/* Ticket Box */}
              <div className="p-5 rounded-2xl bg-[#0b0c1e] border border-purple-500/40 max-w-md mx-auto space-y-2">
                <div className="text-xs text-gray-400 font-mono">Reference Ticket ID</div>
                <div className="text-3xl font-extrabold text-cyan-400 font-mono tracking-wider text-glow-cyan">
                  {submittedRequest?.id}
                </div>
                <div className="text-xs text-purple-300 font-mono">
                  Budget: <strong>{submittedRequest?.budgetFormatted}</strong>
                </div>
              </div>

              {/* Discord CTA Prominent Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-purple-950/80 to-slate-900 border border-indigo-500/50 max-w-xl mx-auto space-y-4 shadow-2xl">
                <div className="flex items-center justify-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                  <DiscordIcon className="w-4 h-4 text-indigo-400" /> Instant Project Discussion
                </div>
                <p className="text-sm text-white font-semibold">
                  For faster communication and project discussion, join our Discord server.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={discordInvite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-7 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/40"
                  >
                    <DiscordIcon className="w-4 h-4" /> Join Discord Server
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {onOpenRequestsPortal && (
                    <button
                      onClick={onOpenRequestsPortal}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-cyan-300 font-bold text-xs flex items-center justify-center gap-2 border border-white/10"
                    >
                      <Ticket className="w-4 h-4 text-cyan-400" /> Track in Requests Portal
                    </button>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-purple-400" /> Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Vance"
                    className="w-full px-4 py-3 rounded-xl glass-input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" /> Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alex@playmine.net"
                    className="w-full px-4 py-3 rounded-xl glass-input text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2 flex items-center gap-1.5">
                    <DiscordIcon className="w-3.5 h-3.5 text-indigo-400" /> Discord Username *
                  </label>
                  <input
                    type="text"
                    name="discord"
                    required
                    value={formData.discord}
                    onChange={handleChange}
                    placeholder="e.g. alex_vance#1234 or @alexvance"
                    className="w-full px-4 py-3 rounded-xl glass-input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2 flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-blue-400" /> Server Name
                  </label>
                  <input
                    type="text"
                    name="serverName"
                    value={formData.serverName}
                    onChange={handleChange}
                    placeholder="e.g. PlayMine Network"
                    className="w-full px-4 py-3 rounded-xl glass-input text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Plugin Idea & Requirements *
                </label>
                <textarea
                  name="pluginIdea"
                  required
                  rows={4}
                  value={formData.pluginIdea}
                  onChange={handleChange}
                  placeholder="Describe your custom plugin mechanics, commands, GUIs, or server specifications..."
                  className="w-full px-4 py-3 rounded-xl glass-input text-xs leading-relaxed resize-y"
                />
              </div>

              {/* BUDGET SYSTEM SECTION (CURRENCY + RANGES) */}
              <div className="p-6 rounded-2xl bg-[#090a1a] border border-purple-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white font-mono flex items-center gap-2">
                    {currency === 'INR' ? <IndianRupee className="w-4 h-4 text-emerald-400" /> : <DollarSign className="w-4 h-4 text-emerald-400" />}
                    Project Budget & Currency
                  </label>

                  {/* Currency Selector Toggle */}
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-black/60 border border-white/10">
                    <button
                      type="button"
                      onClick={() => { setCurrency('INR'); setBudgetPreset('2000-5000'); }}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                        currency === 'INR'
                          ? 'bg-emerald-600 text-white shadow-md'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      INR (₹)
                    </button>
                    <button
                      type="button"
                      onClick={() => { setCurrency('USD'); setBudgetPreset('50-150'); }}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                        currency === 'USD'
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      USD ($)
                    </button>
                  </div>
                </div>

                {/* Pre-set Ranges */}
                <div>
                  <label className="block text-[11px] text-gray-400 mb-2 font-mono">Select Estimated Range</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {currency === 'INR' ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setBudgetPreset('500-2000')}
                          className={`p-2.5 rounded-xl border text-xs font-mono font-semibold transition-all ${
                            budgetPreset === '500-2000'
                              ? 'bg-purple-600/30 border-purple-500 text-white shadow-lg'
                              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          ₹500 - ₹2,000
                        </button>
                        <button
                          type="button"
                          onClick={() => setBudgetPreset('2000-5000')}
                          className={`p-2.5 rounded-xl border text-xs font-mono font-semibold transition-all ${
                            budgetPreset === '2000-5000'
                              ? 'bg-purple-600/30 border-purple-500 text-white shadow-lg'
                              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          ₹2,000 - ₹5,000
                        </button>
                        <button
                          type="button"
                          onClick={() => setBudgetPreset('5000-10000')}
                          className={`p-2.5 rounded-xl border text-xs font-mono font-semibold transition-all ${
                            budgetPreset === '5000-10000'
                              ? 'bg-purple-600/30 border-purple-500 text-white shadow-lg'
                              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          ₹5,000 - ₹10,000
                        </button>
                        <button
                          type="button"
                          onClick={() => setBudgetPreset('10000-25000')}
                          className={`p-2.5 rounded-xl border text-xs font-mono font-semibold transition-all ${
                            budgetPreset === '10000-25000'
                              ? 'bg-purple-600/30 border-purple-500 text-white shadow-lg'
                              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          ₹10,000 - ₹25,000
                        </button>
                        <button
                          type="button"
                          onClick={() => setBudgetPreset('custom')}
                          className={`p-2.5 rounded-xl border text-xs font-mono font-semibold transition-all col-span-2 sm:col-span-1 ${
                            budgetPreset === 'custom'
                              ? 'bg-cyan-600/30 border-cyan-500 text-white shadow-lg'
                              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          Custom Budget
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => setBudgetPreset('10-50')}
                          className={`p-2.5 rounded-xl border text-xs font-mono font-semibold transition-all ${
                            budgetPreset === '10-50'
                              ? 'bg-purple-600/30 border-purple-500 text-white shadow-lg'
                              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          $10 - $50
                        </button>
                        <button
                          type="button"
                          onClick={() => setBudgetPreset('50-150')}
                          className={`p-2.5 rounded-xl border text-xs font-mono font-semibold transition-all ${
                            budgetPreset === '50-150'
                              ? 'bg-purple-600/30 border-purple-500 text-white shadow-lg'
                              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          $50 - $150
                        </button>
                        <button
                          type="button"
                          onClick={() => setBudgetPreset('150-350')}
                          className={`p-2.5 rounded-xl border text-xs font-mono font-semibold transition-all ${
                            budgetPreset === '150-350'
                              ? 'bg-purple-600/30 border-purple-500 text-white shadow-lg'
                              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          $150 - $350
                        </button>
                        <button
                          type="button"
                          onClick={() => setBudgetPreset('350-800')}
                          className={`p-2.5 rounded-xl border text-xs font-mono font-semibold transition-all ${
                            budgetPreset === '350-800'
                              ? 'bg-purple-600/30 border-purple-500 text-white shadow-lg'
                              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          $350 - $800
                        </button>
                        <button
                          type="button"
                          onClick={() => setBudgetPreset('custom')}
                          className={`p-2.5 rounded-xl border text-xs font-mono font-semibold transition-all col-span-2 sm:col-span-1 ${
                            budgetPreset === 'custom'
                              ? 'bg-cyan-600/30 border-cyan-500 text-white shadow-lg'
                              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          Custom Budget
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Custom Budget Min & Max Inputs */}
                {budgetPreset === 'custom' && (
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="text-[11px] text-gray-400 block mb-1">Min Budget ({currency === 'INR' ? '₹' : '$'})</label>
                      <input
                        type="number"
                        value={customMin}
                        onChange={(e) => setCustomMin(e.target.value)}
                        placeholder="Min value..."
                        className="w-full p-2.5 rounded-xl glass-input font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-400 block mb-1">Max Budget ({currency === 'INR' ? '₹' : '$'})</label>
                      <input
                        type="number"
                        value={customMax}
                        onChange={(e) => setCustomMax(e.target.value)}
                        placeholder="Max value..."
                        className="w-full p-2.5 rounded-xl glass-input font-mono text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" /> Desired Deadline
                </label>
                <select
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl glass-input text-xs bg-[#0c0d1b]"
                >
                  <option value="Urgent (24-48 Hrs)">Urgent (24 - 48 Hours)</option>
                  <option value="Within 1 Week">Within 1 Week</option>
                  <option value="Within 2 Weeks">Within 2 Weeks</option>
                  <option value="Flexible Schedule">Flexible Schedule</option>
                </select>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-red-500 via-purple-600 to-cyan-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-cyan-300" />
                  Submit Client Request
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-400 text-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero Obligation Quote • Trackable Ticket ID Issued</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
