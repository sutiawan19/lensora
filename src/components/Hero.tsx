"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, Upload, Calendar, Star, MapPin, Sparkles } from "lucide-react";
import { useState } from "react";

export default function Hero() {
  const [dateVisible, setDateVisible] = useState(false);

  const floatingCards = [
    { name: "Kezia S.", style: "Cinematic", rating: "5.0", img: "https://images.unsplash.com/photo-1554046920-90dc5823ca20?q=80&w=300&auto=format&fit=crop", avatar: "https://i.pravatar.cc/100?img=5", top: "6%", left: "0%", delay: 0 },
    { name: "Rafi M.", style: "Korean Style", rating: "4.9", img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=300&auto=format&fit=crop", avatar: "https://i.pravatar.cc/100?img=12", top: "56%", left: "4%", delay: 0.8 },
    { name: "Studio Lumi", style: "Editorial", rating: "4.8", img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=300&auto=format&fit=crop", avatar: "https://i.pravatar.cc/100?img=9", top: "20%", right: "0%", delay: 0.4 },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-[#FAFAFB]">
      {/* Soft blob background — no gradient, just tinted blobs */}
      <div className="absolute top-[-8%] left-[-4%] w-[480px] h-[480px] bg-primary/10 blob pointer-events-none" />
      <div className="absolute bottom-[-8%] right-[-4%] w-[380px] h-[380px] bg-accent/8 blob pointer-events-none" style={{ animationDelay: "-4s" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-sm font-semibold text-primary mb-7"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              Platform Fotografi Gen Z #1
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl lg:text-[4.25rem] font-extrabold leading-[1.1] tracking-tight mb-5 text-foreground"
            >
              Temukan Fotografer<br />
              <span className="text-primary">Sesuai Vibes</span> Kamu.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-text-muted mb-10 max-w-xl leading-relaxed"
            >
              Jelajahi ratusan fotografer berdasarkan estetika, anggaran, dan lokasi. Upload referensi dan biarkan Lensora menemukan kecocokan terbaik untukmu.
            </motion.p>

            {/* === SEARCH CTA CARD === */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-md border border-border p-3 flex flex-col gap-2"
            >
              {/* Row 1: Search + Upload */}
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 flex items-center gap-3 bg-surface-2 rounded-xl px-4 py-3 border border-transparent focus-within:border-primary/50 transition-colors">
                  <Search className="w-4 h-4 text-text-muted shrink-0" />
                  <input
                    type="text"
                    placeholder="Cari gaya atau nama fotografer..."
                    className="w-full bg-transparent text-sm outline-none text-foreground placeholder:text-text-muted"
                  />
                </div>
                <label className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-border hover:border-primary/60 hover:bg-primary-light cursor-pointer transition-all group">
                  <Upload className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors" />
                  <span className="text-sm font-semibold text-text-muted group-hover:text-primary transition-colors whitespace-nowrap">Upload Referensi</span>
                  <input type="file" accept="image/*" className="hidden" />
                </label>
              </div>

              {/* Row 2: Date + Search button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDateVisible(!dateVisible)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-text-muted hover:text-primary hover:bg-primary-light transition-all"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  {dateVisible ? "Sembunyikan Tanggal" : "+ Tanggal (Opsional)"}
                </button>
                <div className="flex-1" />
                <button className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Cari Sekarang
                </button>
              </div>

              {/* Animated Date Input */}
              <AnimatePresence>
                {dateVisible && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-3 bg-surface-2 rounded-xl px-4 py-3">
                      <Calendar className="w-4 h-4 text-primary shrink-0" />
                      <input type="date" className="w-full bg-transparent text-sm outline-none text-foreground" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Popular Tags */}
              <div className="flex flex-wrap gap-2 pt-1 border-t border-border mt-1">
                <span className="text-xs text-text-muted font-medium pt-1">Populer:</span>
                {["Graduation 🎓", "Pre-Wedding 💍", "Korean Style 🌸", "Cinematic 🎬"].map(tag => (
                  <button key={tag} className="text-xs px-2.5 py-1 bg-surface-2 hover:bg-primary-light hover:text-primary text-text-muted rounded-full font-medium transition-colors">
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4 mt-7 text-sm"
            >
              <div className="flex -space-x-2">
                {[11, 5, 12, 9].map((i) => (
                  <img key={i} className="w-8 h-8 rounded-full border-2 border-white object-cover" src={`https://i.pravatar.cc/80?img=${i}`} alt="User" />
                ))}
              </div>
              <p className="text-text-muted">Dipercaya <span className="font-bold text-foreground">12.000+</span> klien</p>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber fill-amber" />
                <span className="font-bold text-foreground text-sm">4.9</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Floating cards */}
          <div className="hidden lg:block relative h-[580px]">
            {floatingCards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + card.delay, duration: 0.6, type: "spring" }}
                style={{ position: "absolute", top: card.top, left: card.left, right: (card as any).right }}
                className="w-52"
              >
                <motion.div
                  animate={{ y: [0, idx % 2 === 0 ? -12 : 10, 0] }}
                  transition={{ repeat: Infinity, duration: 5 + idx, ease: "easeInOut" }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-border"
                >
                  <div className="h-32 overflow-hidden relative">
                    <img src={card.img} alt={card.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber fill-amber" /> {card.rating}
                    </div>
                  </div>
                  <div className="p-3 flex items-center gap-2">
                    <img src={card.avatar} alt={card.name} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" />
                    <div>
                      <p className="text-xs font-bold text-foreground">{card.name}</p>
                      <p className="text-[10px] text-primary font-semibold">{card.style}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {/* Center featured card */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.7, type: "spring" }}
              style={{ position: "absolute", top: "28%", left: "16%", right: "8%" }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl border border-border"
              >
                <div className="h-52 overflow-hidden relative">
                  <img src="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=600&auto=format&fit=crop" alt="Featured" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute bottom-3 left-3 right-3 bg-black/30 backdrop-blur-sm border border-white/20 rounded-xl p-2.5">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-white text-xs font-bold">Bella & Co</p>
                      <span className="text-[10px] bg-accent text-white px-1.5 py-0.5 rounded-full font-semibold">Top Pick</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-white/80">
                      <MapPin className="w-2.5 h-2.5" /> Bali · Mulai Rp 2,5jt
                    </div>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex gap-1 flex-wrap">
                    {["Pre-Wed", "Warm", "Outdoor"].map(t => (
                      <span key={t} className="text-[10px] px-1.5 py-0.5 bg-primary-light text-primary rounded-full font-semibold">{t}</span>
                    ))}
                  </div>
                  <button className="text-xs bg-primary hover:bg-primary-hover text-white px-3 py-1.5 rounded-lg font-semibold transition-colors">Pesan</button>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
