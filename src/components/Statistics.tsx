"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "500+", label: "Fotografer Aktif", color: "text-primary" },
  { value: "2.000+", label: "Sesi Selesai", color: "text-accent" },
  { value: "4.9", label: "Rating Rata-rata", color: "text-amber" },
  { value: "98%", label: "Kepuasan Klien", color: "text-teal" },
];

export default function Statistics() {
  return (
    <section className="py-20 bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x divide-white/10">
          {stats.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center px-4"
            >
              <p className={`text-5xl font-extrabold mb-2 ${s.color}`}>{s.value}</p>
              <p className="text-sm text-white/60 uppercase tracking-wider font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
