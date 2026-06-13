"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Upload, Sparkles, Star, Check } from "lucide-react";
import { useState } from "react";

const moodboards = [
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=300&auto=format&fit=crop",
];

const results = [
  { name: "Kezia Santoso", match: "97%", style: "Korean · Warm", avatar: "https://i.pravatar.cc/100?img=47", rating: "5.0", matchedImg: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=400&auto=format&fit=crop" },
  { name: "Yuna Imagery", match: "93%", style: "Korean · Soft", avatar: "https://i.pravatar.cc/100?img=32", rating: "4.9", matchedImg: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&auto=format&fit=crop" },
  { name: "Rafi Maulana", match: "88%", style: "Cinematic · Warm", avatar: "https://i.pravatar.cc/100?img=12", rating: "4.9", matchedImg: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=400&auto=format&fit=crop" },
];

export default function AIStyleMatchV3() {
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleUpload = () => {
    if (uploaded) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUploaded(true);
      setTimeout(() => setShowResults(true), 250);
    }, 1400);
  };

  return (
    <section className="py-20 md:py-28 bg-[#0F172A] overflow-hidden relative">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
        backgroundSize: "24px 24px"
      }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="inline-flex items-center justify-center gap-2 bg-[#FACC15] px-4 py-1.5 rounded-full mb-5 rotate-[-2deg] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#78350F]" />
            <p className="text-[10px] font-black tracking-widest uppercase text-[#78350F]">AI Style Matching</p>
          </div>
          <h2 className="font-black text-white leading-tight tracking-tight" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
            Upload referensi,<br />
            <span className="text-[#FACC15]">kami carikan </span> yang cocok.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 items-start">

          {/* Left: Moodboard grid */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 gap-3 mb-4">
              {moodboards.map((src, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl overflow-hidden aspect-[4/3] ${
                    i === 1 ? "ring-2 ring-[#FACC15] ring-offset-2 ring-offset-[#0F172A]" : ""
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                  {uploaded && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-[#2563EB]/40 flex items-center justify-center"
                    >
                      <Check className="w-8 h-8 text-white" />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={handleUpload}
              className={`w-full border-2 border-dashed rounded-2xl py-4 flex items-center justify-center gap-3 text-sm font-black transition-all ${
                uploaded
                  ? "border-[#FACC15]/40 bg-[#FACC15]/10 text-[#FACC15]"
                  : "border-slate-600 text-slate-400 hover:border-[#2563EB] hover:text-[#2563EB]"
              }`}
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />Menganalisis...</>
              ) : uploaded ? (
                <><Sparkles className="w-4 h-4" />Analisis selesai</>
              ) : (
                <><Upload className="w-4 h-4" />Upload foto referensi</>
              )}
            </button>

            <p className="text-slate-600 text-xs mt-3 text-center">AI menganalisis tone, komposisi, dan gaya visual</p>
          </motion.div>

          {/* Right: Results panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="border-2 border-white/10 rounded-3xl overflow-hidden">
              {/* Panel header */}
              <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-white text-sm font-black">Rekomendasi AI</span>
                </div>
                <span className="text-slate-500 text-xs">{showResults ? "3 hasil" : "Menunggu..."}</span>
              </div>

              <div className="p-5">
                <AnimatePresence>
                  {showResults ? (
                    <div className="space-y-3">
                      {results.map((r, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className={`flex gap-3 p-3 rounded-2xl border-2 cursor-pointer transition-all hover:-translate-y-0.5 ${
                            i === 0
                              ? "border-[#2563EB] bg-[#2563EB]/10"
                              : "border-white/10 hover:border-white/20"
                          }`}
                        >
                          {/* Matched Image Thumbnail */}
                          <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-xl overflow-hidden">
                            <img src={r.matchedImg} className="w-full h-full object-cover" alt="Matched style" />
                            {i === 0 && (
                              <div className="absolute top-1.5 left-1.5 bg-[#FACC15] text-[#78350F] text-[9px] font-black px-1.5 py-0.5 rounded-md">
                                Top Match
                              </div>
                            )}
                          </div>
                          
                          {/* Photographer Details */}
                          <div className="flex flex-col justify-between py-1 flex-1 min-w-0">
                            <div>
                              <div className="flex justify-between items-start mb-1">
                                <p className="text-white font-black text-sm truncate pr-2">{r.name}</p>
                                <p className={`font-black text-sm shrink-0 ${i === 0 ? "text-[#FACC15]" : "text-slate-400"}`}>{r.match}</p>
                              </div>
                              <p className="text-slate-400 text-[11px] mb-2">{r.style}</p>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <img src={r.avatar} alt={r.name} className="w-6 h-6 rounded-full object-cover border border-white/20" />
                              <div className="flex items-center gap-0.5">
                                <Star className="w-2.5 h-2.5 text-[#FACC15] fill-[#FACC15]" />
                                <span className="text-[10px] text-slate-400">{r.rating}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      <button className="w-full py-3.5 mt-2 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-[#78350F] font-black text-sm transition-all">
                        Lihat Semua Rekomendasi
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-[70px] rounded-2xl bg-white/5 animate-pulse" />
                      ))}
                      <p className="text-center text-slate-600 text-sm mt-2">Upload foto referensi untuk mulai</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
