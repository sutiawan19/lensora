"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ImagePlus } from "lucide-react";

const placeholders = [
  "Cari 'Cinematic Wedding Jakarta'...",
  "Cari 'Wisuda Outdoor Bandung'...",
  "Cari 'Studio Foto Keluarga'...",
  "Cari 'Moody Pre-wedding Bali'...",
];

export default function HeroV3() {
  const [phIdx, setPhIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhIdx((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] bg-white overflow-hidden flex flex-col justify-center pt-32 pb-16">
      
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-[10%] w-72 h-72 bg-[#2563EB]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-[10%] w-96 h-96 bg-[#FACC15]/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-5 w-full text-center relative z-10 mt-10">
        
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center gap-2 bg-[#FACC15] px-4 py-1.5 rounded-full mb-8 rotate-[-2deg] shadow-sm"
        >
          <div className="w-2 h-2 rounded-full bg-[#78350F] animate-pulse" />
          <span className="text-[10px] font-black tracking-widest uppercase text-[#78350F]">Marketplace Fotografi #1</span>
        </motion.div>

        {/* Massive Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-black tracking-tight leading-[1.1] text-[#0F172A] mb-6"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
        >
          Temukan photographer<br />
          <span className="text-[#2563EB]">sesuai</span> style kamu.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-500 text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Lebih dari 500+ vendor siap mengabadikan momenmu. Cari berdasarkan gaya visual, lokasi, dan budget dalam hitungan detik.
        </motion.p>

        {/* Clean, Massive Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative max-w-2xl mx-auto w-full"
        >
          <div className="bg-white rounded-2xl md:rounded-[2rem] p-2 shadow-xl border border-slate-200 flex flex-col md:flex-row items-center gap-2 transition-all focus-within:border-[#2563EB] focus-within:ring-4 focus-within:ring-blue-500/10">
            
            {/* Search Input */}
            <div className="flex-1 flex items-center gap-3 px-4 w-full h-14 md:border-r border-slate-100">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <div className="relative flex-1 h-full flex items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={phIdx}
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -15, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-y-0 left-0 flex items-center text-slate-400 font-medium text-sm md:text-base pointer-events-none truncate right-0"
                  >
                    {placeholders[phIdx]}
                  </motion.p>
                </AnimatePresence>
                <input 
                  type="text" 
                  className="w-full h-full bg-transparent outline-none text-[#0F172A] font-bold z-10 text-sm md:text-base"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 w-full md:w-auto px-2 pb-2 md:p-0">
              <button 
                type="button"
                className="w-12 h-12 md:h-14 bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-500 hover:text-[#2563EB] flex items-center justify-center rounded-xl md:rounded-full transition-all shrink-0"
                title="Cari dengan foto (AI Style Match)"
              >
                <ImagePlus className="w-5 h-5" />
              </button>
              <button className="flex-1 md:w-auto px-8 h-12 md:h-14 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-black text-sm rounded-xl md:rounded-[1.5rem] transition-all shrink-0">
                Cari Vendor
              </button>
            </div>
          </div>
        </motion.div>

        {/* Popular searches */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex flex-wrap justify-center items-center gap-2 text-xs font-bold text-slate-400"
        >
          <span>Pencarian populer:</span>
          {["Pre-wedding Bali", "Wisuda UGM", "Product Studio", "Cinematic"].map(tag => (
            <button key={tag} className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors text-slate-600">
              {tag}
            </button>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
