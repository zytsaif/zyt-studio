import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import { TiltCard } from './TiltCard';
import { MagneticButton } from './MagneticButton';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck, Plus, MessageSquare, X } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { reviews, submitReview } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Form state
  const [author, setAuthor] = useState('');
  const [discord, setDiscord] = useState('');
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState('');
  const [statusMsg, setStatusMsg] = useState<{ success: boolean; text: string } | null>(null);

  // Filter approved and non-hidden reviews for public display (plus pinned first)
  const visibleReviews = reviews
    .filter((r) => r.status === 'approved' && !r.hidden)
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  const activeReview = visibleReviews[currentIndex] || visibleReviews[0];

  const nextReview = () => {
    if (visibleReviews.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % visibleReviews.length);
  };

  const prevReview = () => {
    if (visibleReviews.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + visibleReviews.length) % visibleReviews.length);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !discord || !quote) return;

    const res = submitReview({ author, discord, rating, quote });
    setStatusMsg({ success: res.success, text: res.message });

    if (res.success) {
      setAuthor('');
      setDiscord('');
      setQuote('');
      setTimeout(() => {
        setShowSubmitModal(false);
        setStatusMsg(null);
      }, 2500);
    }
  };

  return (
    <section id="reviews" className="relative py-28 bg-[#05060e] z-10 border-t border-white/5 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-4 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-800/40 font-mono shadow-lg">
            Real Client Feedback
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mt-5">
            Client <span className="gradient-text-cyan">Reviews</span>
          </h2>
          <p className="text-gray-400 mt-4 text-base sm:text-lg leading-relaxed">
            Verified feedback from Minecraft server owners, creators, and community leads.
          </p>

          <div className="mt-6">
            <MagneticButton
              onClick={() => setShowSubmitModal(true)}
              className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-xs inline-flex items-center gap-2 shadow-xl shadow-purple-600/30"
            >
              <Plus className="w-4 h-4" />
              Write a Review
            </MagneticButton>
          </div>
        </motion.div>

        {/* Testimonial Slider Box */}
        {visibleReviews.length > 0 && activeReview ? (
          <div className="max-w-4xl mx-auto">
            <TiltCard className="glass-card rounded-3xl p-8 sm:p-12 border border-purple-500/30 overflow-hidden shadow-2xl bg-gradient-to-br from-[#0c0d1e] via-[#080916] to-[#04050d] relative">
              <Quote className="absolute top-6 right-6 w-24 h-24 text-purple-600/10 pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeReview.id}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Star Rating & Pinned Tag */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(activeReview.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="ml-2 text-xs font-bold text-yellow-400 font-mono">
                        {activeReview.rating}.0 Rating
                      </span>
                    </div>

                    {activeReview.pinned && (
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold font-mono uppercase bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-md">
                        📌 Pinned Review
                      </span>
                    )}
                  </div>

                  {/* Quote Text */}
                  <blockquote className="text-lg sm:text-2xl font-medium text-gray-100 leading-relaxed italic font-sans">
                    "{activeReview.quote}"
                  </blockquote>

                  {/* Profile Footer */}
                  <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={activeReview.avatar}
                        alt={activeReview.author}
                        className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/50 shadow-md"
                      />
                      <div>
                        <h4 className="text-base font-bold text-white font-mono">
                          {activeReview.author}
                        </h4>
                        <div className="text-xs text-purple-300 font-medium">
                          {activeReview.role} • <span className="text-cyan-400 font-mono">{activeReview.discord}</span>
                        </div>
                      </div>
                    </div>

                    <div className="px-3.5 py-1.5 rounded-xl bg-emerald-950/50 border border-emerald-800/40 text-emerald-400 text-xs font-mono flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      {activeReview.verifiedOrder}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Controls */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                <div className="flex gap-2">
                  {visibleReviews.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentIndex === idx ? 'w-8 bg-purple-500' : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={prevReview}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextReview}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </TiltCard>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-400 font-mono">No reviews published yet. Be the first to submit a review!</div>
        )}
      </div>

      {/* Submit Review Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/40 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-xl font-bold text-white font-mono flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-purple-400" />
                Submit Client Review
              </h3>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {statusMsg && (
              <div
                className={`p-3 rounded-xl text-xs font-semibold ${
                  statusMsg.success
                    ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
                    : 'bg-red-950/60 text-red-300 border border-red-800'
                }`}
              >
                {statusMsg.text}
              </div>
            )}

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Alex Vance"
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Discord Username *</label>
                <input
                  type="text"
                  required
                  value={discord}
                  onChange={(e) => setDiscord(e.target.value)}
                  placeholder="e.g. alex_vance#1234 or @alexvance"
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Star Rating *</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 text-yellow-400 hover:scale-110 transition-transform"
                    >
                      <Star className={`w-6 h-6 ${star <= rating ? 'fill-yellow-400' : 'opacity-30'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Review Message *</label>
                <textarea
                  required
                  rows={3}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Write your honest review of Zyt Studio..."
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs resize-y"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold text-xs shadow-lg shadow-purple-600/30 hover:scale-[1.01] transition-transform"
                >
                  Submit Review for Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
