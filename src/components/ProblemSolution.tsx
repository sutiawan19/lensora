"use client";

import { motion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

const problems = [
  "Harus chat manual satu per satu hanya untuk tanya harga",
  "Jadwal sering bentrok karena tidak ada sistem",
  "Portfolio tersebar, sulit membandingkan kualitas",
  "Harga tidak transparan sejak awal",
];

const solutions = [
  "Filter style, budget, dan lokasi langsung",
  "Kalender availability real-time",
  "Portfolio dan harga tertera jelas",
  "Bandingkan beberapa photographer sekaligus",
];

export default function ProblemSolutionV3() {
  return (
    <section className="py-20 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Big typographic header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-flex items-center justify-center bg-[#FACC15] px-4 py-1.5 rounded-full mb-4 rotate-[-2deg] shadow-sm">
            <p className="text-[10px] font-black tracking-widest uppercase text-[#78350F]">Masalah yang kami selesaikan</p>
          </div>
          <h2 className="font-black text-[#0F172A] leading-[0.95] tracking-tight" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            Booking photographer<br />
            <span className="text-[#2563EB]">seharusnya </span> lebih mudah.
          </h2>
        </motion.div>

        {/* Two columns — asymmetric */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-6">

          {/* Problems: border-heavy card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="border-2 border-slate-300 rounded-3xl p-8 md:p-10 relative flex flex-col"
          >
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-red-50 border-2 border-red-200 text-red-500 text-xs font-black uppercase tracking-wider rounded-xl">
                Cara lama
              </span>
            </div>
            <ul className="space-y-5">
              {problems.map((p, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-4 pb-5 border-b border-slate-100 last:border-0 last:pb-0"
                >
                  <span className="text-red-500 font-black text-lg leading-none shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-slate-600 text-sm leading-relaxed">{p}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Solutions: blue filled bold */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="bg-[#2563EB] rounded-3xl p-8 md:p-10 relative overflow-hidden flex flex-col"
          >
            {/* Decorative big number */}
            <div className="absolute -right-4 -top-8 text-[180px] font-black text-white/5 leading-none select-none pointer-events-none">L</div>

            <div className="mb-8 relative z-10">
              <span className="inline-block px-4 py-2 bg-[#FACC15] text-[#78350F] text-xs font-black uppercase tracking-wider rounded-xl shadow-sm">
                Dengan Lensora
              </span>
            </div>

            <ul className="space-y-5 relative z-10">
              {solutions.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 + 0.1 }}
                  className="flex items-start gap-4 pb-5 border-b border-white/15 last:border-0 last:pb-0"
                >
                  <span className="text-[#FACC15] font-black text-lg leading-none shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-white text-sm leading-relaxed font-medium">{s}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 relative z-10">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#FACC15] hover:bg-[#EAB308] text-[#78350F] font-black text-sm rounded-xl transition-all hover:-translate-y-px group">
                Coba Gratis
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
