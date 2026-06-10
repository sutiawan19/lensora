"use client";

import { motion } from "framer-motion";
import { ScanSearch, GitCompareArrows, Lock } from "lucide-react";

const features = [
  {
    icon: <ScanSearch className="w-6 h-6 text-primary" />,
    bg: "bg-primary-light",
    title: "Cari Berdasarkan Gaya",
    desc: "Upload foto referensi atau pilih estetika favoritmu. Sistem mencocokkan kamu dengan fotografer yang punya vibe serupa.",
    tag: "Style Matching ✨",
    tagBg: "bg-primary-light text-primary",
  },
  {
    icon: <GitCompareArrows className="w-6 h-6 text-accent" />,
    bg: "bg-accent-light",
    title: "Bandingkan Vendor",
    desc: "Lihat portofolio, paket, harga, dan ulasan dari beberapa fotografer dalam satu tampilan tanpa perlu buka banyak tab.",
    tag: "Hemat Waktu ⚡",
    tagBg: "bg-accent-light text-accent",
  },
  {
    icon: <Lock className="w-6 h-6 text-teal" />,
    bg: "bg-teal-light",
    title: "Pemesanan Aman",
    desc: "Bayar DP aman, semua tercatat rapi. Setiap fotografer sudah terverifikasi tim kami. Tenang, bukan asal comot dari IG.",
    tag: "100% Verified 🔐",
    tagBg: "bg-teal-light text-teal",
  },
];

export default function CoreFeatures() {
  return (
    <section className="py-28 bg-surface-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
            Fitur yang Bikin Kamu <span className="text-primary">Jatuh Cinta</span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">Didesain buat kamu yang pengen pengalaman booking fotografer yang smooth dan nggak ribet.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((f, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="bg-white rounded-3xl p-8 border border-border shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${f.bg}`}>{f.icon}</div>
              <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 ${f.tagBg}`}>{f.tag}</span>
              <h3 className="text-xl font-bold text-foreground mb-3">{f.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
