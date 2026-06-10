"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const plans = [
  {
    name: "Gratis",
    price: "Rp 0",
    period: "/ selamanya",
    desc: "Untuk fotografer yang baru memulai bisnis.",
    features: ["Profil Basic", "Upload max 10 foto", "Terima pesanan", "Potongan admin 5%"],
    highlight: false,
    btn: "Daftar Gratis",
  },
  {
    name: "Pro",
    price: "Rp 99.000",
    period: "/ bulan",
    desc: "Cocok untuk fotografer profesional.",
    features: ["Profil Prioritas di Pencarian", "Upload portfolio unlimited", "Badge Terverifikasi", "Analitik Pengunjung", "Bebas potongan admin"],
    highlight: true,
    btn: "Coba Gratis 14 Hari",
  },
  {
    name: "Enterprise",
    price: "Kustom",
    period: "",
    desc: "Untuk studio fotografi besar dan agensi.",
    features: ["Manajemen multi-fotografer", "API Integrasi", "Dukungan prioritas 24/7", "Laporan keuangan kustom"],
    highlight: false,
    btn: "Hubungi Sales",
  },
];

export default function Pricing() {
  return (
    <section className="py-28 bg-white border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">Harga Simpel & Transparan</h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">Mulai gratis, atau upgrade ke Pro untuk maksimalkan klien kamu.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className={`rounded-3xl p-8 border relative ${plan.highlight ? "border-primary bg-primary-light shadow-lg" : "border-border bg-white shadow-sm"}`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                  Paling Populer
                </div>
              )}
              <h3 className="text-xl font-bold text-foreground mb-1">{plan.name}</h3>
              <p className="text-text-muted text-sm mb-6">{plan.desc}</p>
              <div className="mb-8">
                <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                <span className="text-text-muted font-medium ml-1">{plan.period}</span>
              </div>
              <button className={`w-full py-3.5 rounded-xl font-bold mb-8 transition-colors text-sm ${plan.highlight ? "bg-primary hover:bg-primary-hover text-white" : "bg-surface-2 hover:bg-primary-light text-foreground border border-border"}`}>
                {plan.btn}
              </button>
              <ul className="space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${plan.highlight ? "text-primary" : "text-text-muted"}`} />
                    <span className="text-sm font-medium text-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
