"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, MapPin, ArrowRight, Heart, GitCompareArrows, BadgeCheck, Zap, X, Image as ImageIcon } from "lucide-react";
import { useRef, useState } from "react";
import Link from "next/link";

const photographers = [
  { id: 1, name: "Adrianus Dewa", rating: 4.9, projects: 124, location: "Jakarta Selatan", price: "Rp 1.500.000", tags: ["Cinematic", "Wedding"], cover: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=900&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?img=11", verified: true, responseTime: "< 1 jam", portfolio: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=300", "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=300", "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=300", "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=300", "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=300", "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=300"] },
  { id: 2, name: "Bella & Co", rating: 5.0, projects: 89, location: "Bali", price: "Rp 3.000.000", tags: ["Warm Tone", "Pre-Wedding"], cover: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=900&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?img=5", verified: true, responseTime: "Dalam 10 menit", portfolio: ["https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=300", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=300", "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=300", "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=300", "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=300", "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=300"] },
  { id: 3, name: "Seno Visuals", rating: 4.8, projects: 210, location: "Bandung", price: "Rp 1.200.000", tags: ["Moody", "Graduation"], cover: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=900&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?img=12", verified: false, responseTime: "Dalam beberapa jam", portfolio: ["https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=300", "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=300", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=300", "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=300", "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=300", "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=300"] },
  { id: 4, name: "Luminare Studio", rating: 4.9, projects: 56, location: "Surabaya", price: "Rp 2.000.000", tags: ["Korean", "Fashion"], cover: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=900&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?img=9", verified: true, responseTime: "Super responsif", portfolio: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=300", "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=300", "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=300", "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=300", "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=300", "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=300"] },
  { id: 5, name: "Dimas Story", rating: 4.7, projects: 145, location: "Yogyakarta", price: "Rp 900.000", tags: ["Documentary", "Event"], cover: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=900&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?img=33", verified: false, responseTime: "< 1 jam", portfolio: ["https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=300", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=300", "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=300", "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=300", "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=300", "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=300"] },
  { id: 6, name: "Aesthetic Project", rating: 5.0, projects: 320, location: "Jakarta Pusat", price: "Rp 2.500.000", tags: ["Cinematic", "Product"], cover: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=900&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?img=47", verified: true, responseTime: "Dalam 30 menit", portfolio: ["https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=300", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=300", "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=300", "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=300", "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=300", "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=300"] },
];

const filters = ["Semua", "Wisuda", "Wedding", "Event", "Product"];

export default function ExplorePhotographersV3() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [savedVendors, setSavedVendors] = useState<number[]>([]);
  const [hoveredPreviewId, setHoveredPreviewId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleSave = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedVendors(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-20 md:py-28 bg-[#F8FAFF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header row */}
        <div className="flex items-end justify-between mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center justify-center bg-[#FACC15] px-4 py-1.5 rounded-full mb-3 rotate-[-2deg] shadow-sm">
              <p className="text-[10px] font-black tracking-widest uppercase text-[#78350F]">Explore</p>
            </div>
            <h2 className="font-black text-[#0F172A] leading-tight tracking-tight" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
              Cari photographer<br />sesuai <span className="text-[#2563EB]">kebutuhanmu.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hidden md:flex items-center gap-1.5 text-sm font-black text-white bg-[#2563EB] hover:bg-blue-700 px-5 py-2.5 rounded-xl transition-all"
          >
            <Link href="/explore">Lihat semua <ArrowRight className="w-4 h-4 inline" /></Link>
          </motion.div>
        </div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex gap-2 mb-8 overflow-x-auto pb-1"
        >
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all shrink-0 ${
                activeFilter === f
                  ? "bg-[#2563EB] text-white"
                  : "bg-white border-2 border-slate-200 text-slate-600 hover:border-slate-400"
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Horizontal scroll strip */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-16 pt-4 px-4 -mx-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {photographers.map((photographer, i) => {
            const isSaved = savedVendors.includes(photographer.id);
            const isPreviewHovered = hoveredPreviewId === photographer.id;

            return (
              <motion.div 
                key={photographer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden group shadow-sm hover:shadow-2xl hover:border-slate-300 transition-all duration-300 flex flex-col relative snap-start shrink-0 w-[280px] sm:w-[320px]"
              >
                {/* Save/Wishlist Button (Top Right) */}
                <button 
                   onClick={(e) => toggleSave(photographer.id, e)}
                   className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white hover:scale-110 transition-all duration-200 group/btn"
                >
                   <Heart className={`w-4 h-4 transition-colors ${isSaved ? "fill-red-500 text-red-500" : "text-slate-400 group-hover/btn:text-red-500"}`} />
                </button>

                {/* Cover Image */}
                <div className="w-full aspect-[4/3] overflow-hidden relative">
                  <img src={photographer.cover} alt={photographer.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  
                  {/* Dark gradient overlay for Quick Preview button */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <button 
                         onClick={() => setHoveredPreviewId(photographer.id)}
                         onMouseEnter={() => setHoveredPreviewId(photographer.id)}
                         className="bg-white/20 hover:bg-white backdrop-blur-md border border-white/30 text-white hover:text-[#0F172A] px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg"
                      >
                         <ImageIcon className="w-4 h-4" /> Quick Preview
                      </button>
                  </div>

                  {/* Floating Gallery (Quick Preview) */}
                  <AnimatePresence>
                     {isPreviewHovered && (
                        <motion.div 
                           initial={{ opacity: 0, scale: 0.95 }}
                           animate={{ opacity: 1, scale: 1 }}
                           exit={{ opacity: 0, scale: 0.95 }}
                           onMouseLeave={() => setHoveredPreviewId(null)}
                           className="absolute inset-0 z-30 bg-[#0F172A]/95 backdrop-blur-xl p-3 flex flex-col justify-center"
                        >
                           <div className="grid grid-cols-3 gap-2 h-full">
                              {photographer.portfolio?.map((img, i) => (
                                 <div key={i} className="w-full h-full rounded-lg overflow-hidden">
                                    <img src={img} alt={`portfolio ${i}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                                 </div>
                              ))}
                           </div>
                           <button 
                              onClick={(e) => { e.stopPropagation(); setHoveredPreviewId(null); }}
                              className="absolute top-2 right-2 p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                           >
                              <X className="w-3 h-3" />
                           </button>
                        </motion.div>
                     )}
                  </AnimatePresence>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 relative bg-white">
                  {/* Avatar */}
                  <img src={photographer.avatar} alt={photographer.name} className="w-16 h-16 rounded-full border-4 border-white shadow-md absolute -top-8 left-6 object-cover" />
                  
                  <div className="mt-6 flex justify-between items-start">
                     <div>
                        <div className="flex items-center gap-1.5">
                           {photographer.verified && (
                              <BadgeCheck className="w-5 h-5 text-[#2563EB] fill-blue-50 shrink-0" />
                           )}
                           <h3 className="font-extrabold text-xl text-[#0F172A] leading-tight truncate">{photographer.name}</h3>
                        </div>
                        
                        <div className="flex items-center gap-1 text-xs font-semibold text-slate-500 mt-1.5">
                           <MapPin className="w-3.5 h-3.5" /> {photographer.location}
                        </div>
                        <div className="flex items-center gap-1 text-xs font-medium text-slate-400 mt-1">
                           <Zap className="w-3.5 h-3.5 text-amber-500" /> {photographer.responseTime}
                        </div>
                     </div>
                     <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-100">
                           <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                           <span className="text-xs font-extrabold text-amber-600">{photographer.rating}</span>
                        </div>
                     </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-5 mb-5">
                     {photographer.tags.map(tag => (
                       <span key={tag} className="px-3 py-1 bg-slate-50 border border-slate-100 text-slate-600 text-[10px] font-bold rounded-full">{tag}</span>
                     ))}
                  </div>

                  <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
                     <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-0.5">Mulai dari</p>
                        <p className="font-black text-[#0F172A] text-base">{photographer.price}</p>
                     </div>
                     <Link href={`/photographer/${photographer.id}`} className="px-6 py-3 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5">
                        Lihat Profil
                     </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Scroll hint */}
        <p className="text-center text-xs text-slate-400 mt-4 md:hidden font-semibold">Geser untuk lihat lebih banyak</p>
      </div>
    </section>
  );
}
