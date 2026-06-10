"use client";

import { motion } from "framer-motion";
import { X, CheckCircle2, Search, CreditCard, ShieldCheck, Smartphone } from "lucide-react";

export default function WhyLensora() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
            Kenapa Bukan <span className="text-accent">Instagram?</span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Kamu layak dapat pengalaman yang lebih dari sekadar scroll dan DM tanpa balasan.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Old Way */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-[#FFF8F8] border border-red-100 rounded-3xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-red-100"><Smartphone className="w-5 h-5 text-red-500" /></div>
              <div>
                <h3 className="text-lg font-bold text-foreground">Cara Lama</h3>
                <p className="text-xs text-text-muted">Cari di Instagram / WhatsApp</p>
              </div>
            </div>
            <ul className="space-y-5">
              {["Scroll hashtag berjam-jam tanpa hasil jelas","Harus DM satu-satu cuma buat nanya harga","Nggak tau kualitas aslinya sampai deal","Perbandingan antar fotografer? Manual banget"].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3 h-3 text-red-500" />
                  </div>
                  <span className="text-sm text-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Lensora Way */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            className="bg-primary rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-16 -mt-16 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-8 -mb-8 pointer-events-none" />

            <div className="flex items-center gap-3 mb-8 relative z-10">
              <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm"><CheckCircle2 className="w-5 h-5 text-white" /></div>
              <div>
                <h3 className="text-lg font-bold">Pengalaman Lensora</h3>
                <p className="text-xs text-white/70">Cerdas, transparan, menyenangkan</p>
              </div>
            </div>

            <ul className="space-y-5 relative z-10">
              {[
                { icon: <Search className="w-3 h-3" />, text: "Filter cerdas: gaya, harga, lokasi, jadwal" },
                { icon: <CreditCard className="w-3 h-3" />, text: "Harga & paket transparan, langsung terlihat" },
                { icon: <ShieldCheck className="w-3 h-3" />, text: "Ulasan asli dari klien terverifikasi" },
                { icon: <CheckCircle2 className="w-3 h-3" />, text: "Bandingkan hingga 3 fotografer sekaligus" },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/25 flex items-center justify-center shrink-0 mt-0.5">{item.icon}</div>
                  <span className="text-sm leading-relaxed text-white/90">{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
