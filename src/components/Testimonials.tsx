"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-28 bg-white border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">Kata Mereka</h2>
          <p className="text-lg text-text-muted">Cerita nyata dari klien yang sudah menemukan fotografer lewat Lensora.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Nadia Putri", role: "Klien Pre-Wedding, Jakarta", quote: "Menemukan fotografer pre-wedding nggak pernah semudah ini. Portofolionya tertata dan harga langsung keliatan.", avatar: "https://i.pravatar.cc/100?img=32" },
            { name: "Rendi Saputra", role: "Mahasiswa Wisuda, Bandung", quote: "Cuma butuh 10 menit buat nemuin fotografer wisuda yang cocok sama budget aku. Hasilnya? Beyond expectations!", avatar: "https://i.pravatar.cc/100?img=53" },
            { name: "Ayu Lestari", role: "Content Creator, Bali", quote: "Fitur upload referensi bener-bener game changer. Langsung dapet rekomendasi fotografer yang punya vibe yang sama.", avatar: "https://i.pravatar.cc/100?img=47" },
          ].map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-surface-2 rounded-3xl p-8 border border-border"
            >
              <div className="flex gap-1 mb-5">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-amber fill-amber" />)}
              </div>
              <blockquote className="text-foreground font-medium mb-6 leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                <div>
                  <p className="text-sm font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-text-muted">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
