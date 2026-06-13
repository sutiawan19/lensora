"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Nadia Putri", role: "Klien pre-wedding, Jakarta", quote: "Menemukan photographer dalam 10 menit. Harga langsung keliatan, tidak perlu DM dulu.", avatar: "https://i.pravatar.cc/100?img=47", size: "lg" },
  { name: "Rendi Saputra", role: "Wisuda, Bandung", quote: "Budget pas, style cocok, hasil jauh di atas ekspektasi.", avatar: "https://i.pravatar.cc/100?img=53", size: "sm" },
  { name: "Dimas Prasetyo", role: "Vendor, Yogyakarta", quote: "Dalam 2 bulan, booking naik 3x lipat.", avatar: "https://i.pravatar.cc/100?img=11", size: "sm" },
  { name: "Ayu Lestari", role: "Content creator, Bali", quote: "Upload referensi dan langsung dapat rekomendasi yang vibenya sama persis. Sangat membantu.", avatar: "https://i.pravatar.cc/100?img=32", size: "lg" },
];

const stats = [
  { value: "500+", label: "Vendor" },
  { value: "12k+", label: "Klien" },
  { value: "4.9", label: "Rating" },
  { value: "1k+", label: "Booking" },
];

export default function TestimonialsV3() {
  return (
    <section className="py-20 md:py-28 bg-[#F8FAFF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header with inline stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14"
        >
          <h2 className="font-black text-[#0F172A] leading-tight tracking-tight" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
            Dipercaya ribuan<br /><span className="text-[#2563EB]">klien dan vendor.</span>
          </h2>

          {/* Stats - horizontal pills */}
          <div className="flex flex-wrap gap-3">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center justify-center bg-white border-2 border-slate-200 rounded-2xl px-5 py-3 min-w-[80px]">
                <p className="text-xl font-black text-[#2563EB] leading-none">{s.value}</p>
                <p className="text-xs text-slate-500 font-semibold mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Masonry-style testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left column */}
          <div className="flex flex-col gap-4">
            {/* Large card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#2563EB] rounded-3xl p-7 relative overflow-hidden"
            >
              <div className="absolute -right-6 -top-6 w-28 h-28 bg-white/10 rounded-full pointer-events-none" />
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-[#FACC15] fill-[#FACC15]" />)}
              </div>
              <p className="text-white text-base leading-relaxed mb-6 relative z-10">
                &ldquo;{testimonials[0].quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 relative z-10">
                <img src={testimonials[0].avatar} alt={testimonials[0].name} className="w-10 h-10 rounded-full object-cover border-2 border-white/30" />
                <div>
                  <p className="text-white font-black text-sm">{testimonials[0].name}</p>
                  <p className="text-white/50 text-[11px]">{testimonials[0].role}</p>
                </div>
              </div>
            </motion.div>

            {/* Small card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="bg-white border-2 border-slate-200 rounded-3xl p-6"
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-[#FACC15] fill-[#FACC15]" />)}
              </div>
              <p className="text-slate-700 text-sm leading-relaxed mb-5">&ldquo;{testimonials[1].quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <img src={testimonials[1].avatar} alt={testimonials[1].name} className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm" />
                <div>
                  <p className="text-[#0F172A] font-black text-sm">{testimonials[1].name}</p>
                  <p className="text-slate-400 text-[11px]">{testimonials[1].role}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right column — reversed */}
          <div className="flex flex-col gap-4">
            {/* Small card — dark */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 }}
              className="bg-[#0F172A] rounded-3xl p-6"
            >
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-[#FACC15] fill-[#FACC15]" />)}
              </div>
              <p className="text-white/80 text-sm leading-relaxed mb-5">&ldquo;{testimonials[2].quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <img src={testimonials[2].avatar} alt={testimonials[2].name} className="w-9 h-9 rounded-full object-cover border-2 border-white/20" />
                <div>
                  <p className="text-white font-black text-sm">{testimonials[2].name}</p>
                  <p className="text-white/40 text-[11px]">{testimonials[2].role}</p>
                </div>
              </div>
            </motion.div>

            {/* Large card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.12 }}
              className="bg-[#FACC15] border-2 border-[#FACC15] rounded-3xl p-7 flex-1"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-[#78350F] fill-[#78350F]" />)}
              </div>
              <p className="text-[#78350F] text-base leading-relaxed mb-6">&ldquo;{testimonials[3].quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <img src={testimonials[3].avatar} alt={testimonials[3].name} className="w-10 h-10 rounded-full object-cover border-2 border-[#78350F]/20" />
                <div>
                  <p className="text-[#78350F] font-black text-sm">{testimonials[3].name}</p>
                  <p className="text-[#78350F]/60 text-[11px]">{testimonials[3].role}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
