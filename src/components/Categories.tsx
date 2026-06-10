"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const styles = [
  { title: "Graduation 🎓", img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=500&auto=format&fit=crop" },
  { title: "Korean Style 🌸", img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=500&auto=format&fit=crop" },
  { title: "Cinematic 🎬", img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=500&auto=format&fit=crop" },
  { title: "Warm Tone ☀️", img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=500&auto=format&fit=crop" },
  { title: "Documentary 📷", img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=500&auto=format&fit=crop" },
  { title: "Luxury ✨", img: "https://images.unsplash.com/photo-1555529771-835f59bfc50c?q=80&w=500&auto=format&fit=crop" },
];

export default function Categories() {
  return (
    <section className="py-28 bg-surface-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-foreground">Eksplorasi Gaya</h2>
            <p className="text-lg text-text-muted">Pilih aesthetic yang kamu mau, kami cariin fotografernya.</p>
          </motion.div>
          <button className="text-primary font-semibold flex items-center gap-2 hover:text-primary-hover transition-colors text-sm shrink-0">
            Lihat Semua <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {styles.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="group cursor-pointer bg-white border border-border rounded-2xl p-2 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
            >
              <div className="w-full aspect-square rounded-xl overflow-hidden mb-3">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <p className="text-xs font-bold text-center text-foreground px-1 pb-1">{s.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
