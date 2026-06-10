"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, CalendarCheck, ArrowRight } from "lucide-react";

const benefits = [
  { icon: <Users className="w-5 h-5 text-primary" />, text: "Jangkau lebih banyak klien baru setiap bulan" },
  { icon: <TrendingUp className="w-5 h-5 text-primary" />, text: "Portofolio teroptimasi & tampil di halaman utama" },
  { icon: <CalendarCheck className="w-5 h-5 text-primary" />, text: "Manajemen jadwal & pembayaran otomatis" },
];

export default function VendorCTA() {
  return (
    <section className="py-28 bg-surface-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row">

            {/* Left Image */}
            <div className="md:w-1/2 relative min-h-[300px] md:min-h-0">
              <img
                src="https://images.unsplash.com/photo-1554046920-90dc5823ca20?q=80&w=900&auto=format&fit=crop"
                alt="Photographer"
                className="w-full h-full object-cover"
              />
              {/* Floating metric card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute bottom-6 left-6 bg-white rounded-2xl p-4 shadow-lg border border-border flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-text-muted font-medium">Pendapatan Bulan Ini</p>
                  <p className="text-lg font-extrabold text-foreground">Rp 12.500.000</p>
                </div>
                <span className="text-xs font-bold text-teal bg-teal-light px-2 py-1 rounded-full">+15%</span>
              </motion.div>
            </div>

            {/* Right Content */}
            <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 bg-primary-light text-primary text-xs font-bold rounded-full mb-6 w-fit">
                Untuk Fotografer 📸
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-5 leading-tight">
                Kembangkan Bisnis Fotografi Kamu Bersama Lensora
              </h2>
              <p className="text-text-muted mb-8 leading-relaxed">
                Berhenti bergantung pada algoritma IG yang nggak menentu. Dapatkan klien yang memang lagi aktif cari fotografer.
              </p>

              <ul className="space-y-4 mb-10">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary-light flex items-center justify-center shrink-0">{b.icon}</div>
                    <span className="text-sm font-medium text-foreground">{b.text}</span>
                  </li>
                ))}
              </ul>

              <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold px-8 py-4 rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 w-fit">
                Daftar Sebagai Vendor <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
