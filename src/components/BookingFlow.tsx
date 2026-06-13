"use client";

import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Pilih photographer", desc: "Filter style, budget, dan lokasi." },
  { num: "02", title: "Pilih paket", desc: "Harga dan detail tertera jelas." },
  { num: "03", title: "Tentukan tanggal", desc: "Cek kalender availability langsung." },
  { num: "04", title: "Bayar DP", desc: "Pembayaran aman via sistem escrow." },
  { num: "05", title: "Sesi berjalan", desc: "Hasil dikirim sesuai jadwal." },
];

export default function BookingFlowV3() {
  return (
    <section className="py-20 md:py-28 bg-[#F8FAFF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <h2 className="font-black text-[#0F172A] leading-tight tracking-tight" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
            Booking dalam<br /><span className="text-[#2563EB]">5 langkah.</span>
          </h2>
          <p className="text-slate-500 text-sm max-w-xs">Tidak perlu DM, tidak perlu negosiasi manual.</p>
        </motion.div>

        {/* Steps — large numbered list, staggered */}
        <div className="space-y-0">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`flex items-start gap-6 py-6 border-b border-slate-200 group ${
                i === 0 ? "border-t" : ""
              }`}
            >
              {/* Number */}
              <span
                className="font-black text-slate-200 group-hover:text-[#2563EB] transition-colors shrink-0 leading-none"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                {step.num}
              </span>

              {/* Content */}
              <div className="flex-1 pt-2 md:flex md:items-center md:justify-between gap-8">
                <h3 className="font-black text-[#0F172A] text-lg md:text-xl mb-1">{step.title}</h3>
                <p className="text-slate-500 text-sm md:max-w-xs">{step.desc}</p>
              </div>

              {/* Step indicator */}
              <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full border-2 border-slate-200 group-hover:border-[#2563EB] group-hover:bg-[#2563EB] text-slate-400 group-hover:text-white font-black text-xs transition-all shrink-0 mt-2">
                {i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
