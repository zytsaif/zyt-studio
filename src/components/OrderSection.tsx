import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useStore } from '../context/StoreContext';
import { Sparkles, Clock, Send, ShieldCheck, CheckCircle2, DollarSign, Calendar, Server, Disc as DiscordIcon, Mail, User } from 'lucide-react';

interface OrderSectionProps {
  initialPluginName?: string;
  onTriggerToast: (msg: string) => void;
}

export const OrderSection: React.FC<OrderSectionProps> = ({
  initialPluginName = '',
  onTriggerToast,
}) => {
  const { websiteSettings, contactSettings } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    discord: '',
    serverName: '',
    pluginIdea: '',
    budget: '$100 - $250',
    deadline: 'Within 1 Week',
  });

  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  useEffect(() => {
    if (initialPluginName) {
      setFormData((prev) => ({
        ...prev,
        pluginIdea: `Order Inquiry for: ${initialPluginName}\n\nKey Requirements:\n- Custom features:\n- Target Minecraft version: 1.20.x`,
      }));
    }
  }, [initialPluginName]);

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
    setTicketId(randomTicket);
    setSubmitted(true);

    // Confetti celebration
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });

    // Send Discord Webhook notification if URL configured
    if (websiteSettings.discordWebhookUrl) {
      try {
        await fetch(websiteSettings.discordWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            embeds: [
              {
                title: `⚡ New Custom Plugin Order [${randomTicket}]`,
                color: 0x8b5cf6,
                fields: [
                  { name: 'Customer Name', value: formData.name, inline: true },
                  { name: 'Discord Handle', value: formData.discord, inline: true },
                  { name: 'Email Address', value: formData.email, inline: true },
                  { name: 'Server Name', value: formData.serverName || 'N/A', inline: true },
                  { name: 'Estimated Budget', value: formData.budget, inline: true },
                  { name: 'Deadline', value: formData.deadline, inline: true },
                  { name: 'Plugin Idea / Requirements', value: formData.pluginIdea },
                ],
                footer: { text: 'Zyt Studio Order Dispatcher' },
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
            Commission Studio Services
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-4">
            Custom Plugin <span className="gradient-text-purple">Order</span>
          </h2>
          <p className="text-gray-400 mt-4 text-sm sm:text-base">
            Have a unique Minecraft plugin idea? Submit your requirements below for a detailed quote.
          </p>

          <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-cyan-300 text-xs font-semibold">
            <Clock className="w-4 h-4 text-cyan-400 animate-spin-slow" />
            <span>Estimated Response Time: <strong className="text-white">{contactSettings.responseTime}</strong></span>
          </div>
        </div>

        {/* Order Form Card */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-purple-500/30 shadow-2xl relative">
          {submitted ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>

              <h3 className="text-3xl font-bold text-white font-mono">Request Received!</h3>

              <p className="text-sm text-gray-300 max-w-lg mx-auto leading-relaxed">
                Thank you, <strong className="text-purple-300">{formData.name}</strong>! Your plugin request has been logged into our queue.
              </p>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-md mx-auto space-y-1">
                <div className="text-xs text-gray-400">Reference Ticket ID</div>
                <div className="text-2xl font-bold text-cyan-400 font-mono tracking-wider">
                  {ticketId}
                </div>
                <div className="text-[11px] text-gray-400">
                  Our developer will contact you on Discord (<strong className="text-white">{formData.discord}</strong>) or via Email within {contactSettings.responseTime}.
                </div>
              </div>

              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors"
              >
                Submit Another Request
              </button>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-2 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Estimated Budget
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl glass-input text-xs bg-[#0c0d1b]"
                  >
                    <option value="$30 - $100">$30 - $100 (Small Plugin / Patch)</option>
                    <option value="$100 - $250">$100 - $250 (Medium System)</option>
                    <option value="$250 - $500">$250 - $500 (Complex Core Plugin)</option>
                    <option value="$500+">$500+ (Full Server Infrastructure)</option>
                  </select>
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
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-red-500 via-purple-600 to-cyan-500 text-white font-bold text-sm shadow-xl shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-cyan-300" />
                  Request Custom Plugin
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-400 text-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero Obligation Quote • 100% Confidentiality Guaranteed</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
