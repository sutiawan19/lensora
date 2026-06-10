"use client";

import { motion } from "framer-motion";
import { Upload, Users, CalendarCheck } from "lucide-react";

const steps = [
  { icon: <Upload className="w-6 h-6 text-primary" />, num: "01", title: "Unggah Inspirasi", desc: "Bagikan referensi foto atau filter berdasarkan gaya & lokasi." },
  { icon: <Users className="w-6 h-6 text-accent" />, num: "02", title: "Temukan Fotografer", desc: "Sistem mencocokkan & menampilkan fotografer terbaik untukmu." },
  { icon: <CalendarCheck className="w-6 h-6 text-teal" />, num: "03", title: "Pesan Sesi", desc: "Pilih paket, bayar DP, dan sesi pemotretan pun terjadwal." },
];

export default function HowItWorks() {
  return (
    <section className="py-28 bg-white border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">Cara Kerja</h2>
          <p className="text-lg text-text-muted max-w-xl mx-auto">Tiga langkah mudah dari inspirasi ke sesi foto.</p>
        </motion.div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-10 left-[16.5%] right-[16.5%] h-px bg-border z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((s, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.18, type: "spring" }}
                className="flex flex-col items-center text-center"
              >
                {/* Icon circle */}
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-white border-2 border-border rounded-full flex items-center justify-center shadow-sm">
                    {s.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white text-xs font-extrabold flex items-center justify-center shadow-sm">
                    {idx + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{s.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed max-w-[220px]">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
