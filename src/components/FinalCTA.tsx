"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FinalCTAV3() {
  return (
    <section className="pt-20 pb-32 md:pt-32 md:pb-48 bg-[#2563EB] overflow-hidden relative">
      {/* Decorative large text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none">
        <h2 className="text-[20vw] font-black text-white/5 leading-none tracking-tighter whitespace-nowrap">
          LENSORA
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0F172A] rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-20 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle yellow accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FACC15]/20 rounded-full blur-3xl pointer-events-none -mt-32 -mr-32" />

          <h2 className="font-black text-white leading-[1.05] tracking-tight mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
            Siap temukan<br />
            <span className="text-[#FACC15]">photographer-mu?</span>
          </h2>
          
          <p className="text-slate-400 text-base md:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
            Bergabung dengan ribuan klien yang sudah menemukan fotografer impian mereka lewat Lensora. Gratis untuk mulai.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FACC15] hover:bg-[#EAB308] text-[#78350F] font-black text-base rounded-2xl transition-all hover:-translate-y-1 group">
              Mulai Cari Sekarang
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white/20 hover:border-white text-white font-black text-base rounded-2xl transition-all hover:-translate-y-1">
              Daftar Jadi Vendor
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
