"use client";

import { motion } from "framer-motion";
import { Star, MapPin, ArrowLeftRight } from "lucide-react";

const vendors = [
  { name: "Adrianus Dewa", rating: "4.9", loc: "Jakarta Selatan", price: "Rp 1.500.000", tags: ["Cinematic", "Wedding"], img: "https://images.unsplash.com/photo-1554046920-90dc5823ca20?q=80&w=500&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?img=11" },
  { name: "Bella & Co", rating: "5.0", loc: "Bali", price: "Rp 3.000.000", tags: ["Warm", "Pre-Wedding"], img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=500&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?img=5" },
  { name: "Seno Visuals", rating: "4.8", loc: "Bandung", price: "Rp 1.200.000", tags: ["Moody", "Outdoor"], img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=500&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?img=12" },
  { name: "Luminare Studio", rating: "4.9", loc: "Surabaya", price: "Rp 2.000.000", tags: ["Editorial", "Fashion"], img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?img=9" },
];

export default function FeaturedPhotographers() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3 text-foreground">Fotografer Pilihan</h2>
          <p className="text-lg text-text-muted">Talenta terbaik dengan rating tertinggi di platform kami.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vendors.map((v, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden flex flex-col hover:shadow-lg hover:border-primary/25 transition-all"
            >
              {/* Cover */}
              <div className="w-full h-48 overflow-hidden relative">
                <img src={v.img} alt={v.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 right-3 bg-white/95 px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
                  <Star className="w-3 h-3 text-amber fill-amber" /> {v.rating}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                {/* Avatar */}
                <div className="flex items-center gap-3 mb-4 -mt-9">
                  <img src={v.avatar} alt={v.name} className="w-14 h-14 rounded-full border-4 border-white shadow object-cover" />
                  <div className="mt-6">
                    <h3 className="font-bold text-foreground text-base leading-tight">{v.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-text-muted">
                      <MapPin className="w-3 h-3" /> {v.loc}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {v.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 bg-primary-light text-primary text-xs font-semibold rounded-full">{t}</span>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                  <div>
                    <p className="text-[11px] text-text-muted mb-0.5">Mulai dari</p>
                    <p className="font-extrabold text-primary text-sm">{v.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 border border-border rounded-xl text-text-muted hover:text-primary hover:border-primary hover:bg-primary-light transition-colors">
                      <ArrowLeftRight className="w-3.5 h-3.5" />
                    </button>
                    <button className="px-3 py-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl transition-colors">
                      Lihat
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
