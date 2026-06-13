"use client";

import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Upload, Tag, CalendarCheck, BarChart3 } from "lucide-react";

const features = [
  { icon: <Upload className="w-4 h-4" />, title: "Upload portfolio" },
  { icon: <Tag className="w-4 h-4" />, title: "Tambah style tags" },
  { icon: <CalendarCheck className="w-4 h-4" />, title: "Kelola jadwal" },
  { icon: <BarChart3 className="w-4 h-4" />, title: "Pantau performa" },
];

export default function ForVendorsV3() {
  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Full-width header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="inline-flex items-center justify-center bg-[#FACC15] px-4 py-1.5 rounded-full mb-4 rotate-[-2deg] shadow-sm">
            <p className="text-[10px] font-black tracking-widest uppercase text-[#78350F]">Untuk Fotografer</p>
          </div>
          <h2 className="font-black text-[#0F172A] leading-tight tracking-tight" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
            Kelola semua booking<br />
            <span className="text-[#2563EB]">dalam satu tempat.</span>
          </h2>
        </motion.div>

        {/* Layout: features left, dashboard right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 items-start">

          {/* Left: Features as horizontal pills + description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-slate-500 leading-relaxed mb-8">
              Berhenti bergantung pada algoritma Instagram. Dapatkan klien yang memang sedang mencari photographer.
            </p>

            {/* Feature tags */}
            <div className="flex flex-wrap gap-2.5 mb-10">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-center gap-2 px-4 py-2.5 border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:border-[#2563EB] hover:text-[#2563EB] transition-all cursor-default"
                >
                  <span className="text-[#2563EB]">{f.icon}</span>
                  {f.title}
                </motion.div>
              ))}
            </div>

            <button className="flex items-center gap-2 px-7 py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white font-black text-sm rounded-2xl transition-all group">
              Daftar Jadi Vendor
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Right: Dashboard mockup — clean bordered */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div className="border-2 border-slate-200 rounded-3xl overflow-hidden">
              {/* Dashboard header bar */}
              <div className="bg-[#0F172A] px-5 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                  </div>
                  <span className="text-white/40 text-xs font-mono">dashboard.lensora.id</span>
                </div>
                <img src="https://i.pravatar.cc/100?img=11" alt="" className="w-7 h-7 rounded-full border border-white/20 object-cover" />
              </div>

              <div className="p-5 bg-white">
                {/* Metrics row */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: "Booking", value: "24", sub: "+8 bln ini" },
                    { label: "Pendapatan", value: "Rp 12,5jt", sub: "+15%" },
                    { label: "Rating", value: "4.9", sub: "128 ulasan" },
                  ].map((m, i) => (
                    <div key={i} className="border-2 border-slate-100 rounded-2xl p-3">
                      <p className="text-[10px] text-slate-400 font-semibold mb-1">{m.label}</p>
                      <p className="text-sm font-black text-[#2563EB] leading-tight">{m.value}</p>
                      <p className="text-[10px] text-emerald-500 font-semibold mt-0.5">{m.sub}</p>
                    </div>
                  ))}
                </div>

                {/* Booking list */}
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-3">Booking terbaru</p>
                {[
                  { client: "Nadia Putri", session: "Pre-Wedding · 14 Jun", status: "Confirmed" },
                  { client: "Rendi S.", session: "Wisuda · 16 Jun", status: "Pending" },
                  { client: "Sari A.", session: "Birthday · 20 Jun", status: "Confirmed" },
                ].map((b, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-xl bg-blue-100 flex items-center justify-center text-[10px] font-black text-[#2563EB]">
                        {b.client[0]}
                      </div>
                      <div>
                        <p className="text-xs font-black text-[#0F172A]">{b.client}</p>
                        <p className="text-[10px] text-slate-400">{b.session}</p>
                      </div>
                    </div>
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-lg ${
                      b.status === "Confirmed" ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {b.status}
                    </span>
                  </div>
                ))}

                {/* Bar chart */}
                <div className="flex items-end gap-1.5 h-8 mt-5">
                  {[40, 55, 45, 70, 60, 80, 100].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.06 }}
                      style={{ height: `${h}%` }}
                      className={`flex-1 rounded-sm origin-bottom ${i === 6 ? "bg-[#2563EB]" : "bg-slate-100"}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating card */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 bg-white border-2 border-slate-200 rounded-2xl p-3.5 shadow-sm flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400">Pendapatan bulan ini</p>
                <p className="text-sm font-black text-[#0F172A]">Rp 12.500.000</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
