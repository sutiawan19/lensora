"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, MapPin, Star, CheckCircle2, Clock, 
  ChevronLeft, GitCompareArrows, Calendar as CalendarIcon, X, Maximize2
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// --- Mock Data ---
const PHOTOGRAPHER = {
  name: "Adrianus Dewa",
  rating: 4.9,
  reviewsCount: 124,
  location: "Jakarta Selatan",
  response_time: "< 1 Jam",
  experience: "5 Tahun",
  specialty: "Cinematic Wedding & Pre-Wedding",
  tags: ["Cinematic", "Wedding", "Pre-Wedding"],
  avatar: "https://i.pravatar.cc/150?img=11",
  cover: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1600&auto=format&fit=crop",
  bio: "Halo! Saya Adrianus. Pendekatan saya pada fotografi bukan sekadar menangkap gambar yang indah secara teknis, tapi juga menyampaikan emosi dan cerita di balik setiap momen. Saya menggunakan gaya pewarnaan sinematik yang kaya dan mendalam.",
};

const PORTFOLIO = [
  { id: 1, category: "Wedding", img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop", span: "row-span-2 col-span-2 sm:col-span-1" },
  { id: 2, category: "Pre-Wedding", img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop", span: "row-span-1 col-span-1" },
  { id: 3, category: "Portrait", img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop", span: "row-span-1 col-span-1" },
  { id: 4, category: "Wedding", img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop", span: "row-span-1 col-span-2 sm:col-span-1" },
  { id: 5, category: "Cinematic", img: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop", span: "row-span-2 col-span-1" },
  { id: 6, category: "Pre-Wedding", img: "https://images.unsplash.com/photo-1555529771-835f59bfc50c?q=80&w=800&auto=format&fit=crop", span: "row-span-1 col-span-1" },
];

const PACKAGES = [
  {
    name: "Essential Story",
    price: "Rp 1.500.000",
    duration: "4 Jam Sesi",
    photos: "50 Foto Edit Pilihan",
    revision: "1x Revisi Warna",
    delivery: "3 Hari Kerja",
    recommended: false,
  },
  {
    name: "Cinematic Journey",
    price: "Rp 3.500.000",
    duration: "8 Jam Sesi (Full Day)",
    photos: "120 Foto Edit Pilihan + Album",
    revision: "Unlimited Revisi",
    delivery: "7 Hari Kerja",
    recommended: true,
  }
];

const REVIEWS = [
  { id: 1, name: "Cindy Kirana", rating: 5, text: "Sangat profesional dan sabar banget ngarahin gaya kita yang kaku. Hasil grading warnanya bener-bener dapet banget cinematic-nya!", avatar: "https://i.pravatar.cc/100?img=32", img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=200&auto=format&fit=crop" },
  { id: 2, name: "Bagas Pratama", rating: 5, text: "Recommended! Dateng on time, gear-nya lengkap, dan hasilnya cepet dikirim.", avatar: "https://i.pravatar.cc/100?img=53" },
];

// Simple calendar generator (mocking next 14 days)
const CALENDAR_DAYS = Array.from({ length: 14 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i);
  return {
    date: d.getDate(),
    day: d.toLocaleDateString("id-ID", { weekday: "short" }),
    fullDate: d.toISOString(),
    available: i !== 2 && i !== 5 && i !== 6 // random unavailable days
  };
});

export default function PhotographerDetail() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("Semua");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const filteredPortfolio = activeTab === "Semua" ? PORTFOLIO : PORTFOLIO.filter(p => p.category === activeTab);

  return (
    <main className="min-h-screen bg-background pb-24 md:pb-0">
      {/* Navbar (Minimalist) */}
      <nav className="fixed top-0 w-full z-40 bg-white/90 backdrop-blur-md border-b border-border h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/explore" className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center text-text-muted hover:text-foreground transition-colors">
             <ChevronLeft className="w-5 h-5" />
          </Link>
          <span className="font-bold text-sm hidden sm:block">Kembali ke Pencarian</span>
        </div>
        <div className="flex gap-4 items-center">
          <button className="flex items-center gap-2 text-sm font-bold text-text-muted hover:text-foreground transition-colors">
            <GitCompareArrows className="w-4 h-4" /> Bandingkan
          </button>
        </div>
      </nav>

      {/* Hero Cover */}
      <div className="mt-16 w-full h-64 md:h-80 xl:h-96 relative">
         <img src={PHOTOGRAPHER.cover} alt="Cover" className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10 flex flex-col md:flex-row gap-8 items-start">
         
         {/* Main Content (Left Column) */}
         <div className="flex-1 w-full max-w-3xl">
            
            {/* Section 1: Header Profile */}
            <div className="bg-white rounded-3xl p-6 md:p-10 border border-border shadow-sm mb-8 relative">
               <img src={PHOTOGRAPHER.avatar} alt="Avatar" className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md absolute -top-12 md:-top-16 object-cover" />
               <div className="mt-12 md:mt-16">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                     <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground flex items-center gap-2">
                           {PHOTOGRAPHER.name}
                           <CheckCircle2 className="w-6 h-6 text-teal" />
                        </h1>
                        <div className="flex items-center gap-4 text-sm font-semibold text-text-muted mt-2">
                           <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> {PHOTOGRAPHER.location}</span>
                           <span className="flex items-center gap-1 bg-amber/10 text-amber px-2 py-0.5 rounded-md"><Star className="w-4 h-4 fill-amber"/> {PHOTOGRAPHER.rating} ({PHOTOGRAPHER.reviewsCount})</span>
                        </div>
                     </div>
                  </div>
                  
                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-border my-6">
                     <div><p className="text-xs text-text-muted mb-1">Pesanan Selesai</p><p className="font-extrabold text-foreground">{PHOTOGRAPHER.reviewsCount}+</p></div>
                     <div><p className="text-xs text-text-muted mb-1">Waktu Respons</p><p className="font-extrabold text-foreground">{PHOTOGRAPHER.response_time}</p></div>
                     <div><p className="text-xs text-text-muted mb-1">Pengalaman</p><p className="font-extrabold text-foreground">{PHOTOGRAPHER.experience}</p></div>
                     <div><p className="text-xs text-text-muted mb-1">Ketersediaan</p><p className="font-extrabold text-teal">Tersedia</p></div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                     {PHOTOGRAPHER.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-primary-light text-primary text-xs font-bold rounded-full">{tag}</span>
                     ))}
                  </div>
               </div>
            </div>

            {/* Section 3: About (Reordered conceptually to flow better) */}
            <div className="bg-white rounded-3xl p-6 md:p-10 border border-border shadow-sm mb-8">
               <h2 className="text-2xl font-extrabold mb-6">Tentang Fotografer</h2>
               <p className="text-text-muted leading-relaxed font-medium mb-6 text-lg">{PHOTOGRAPHER.bio}</p>
               <div>
                  <h3 className="font-bold text-foreground mb-2">Spesialisasi:</h3>
                  <p className="text-sm font-semibold text-text-muted bg-surface-2 inline-block px-4 py-2 rounded-xl border border-border">{PHOTOGRAPHER.specialty}</p>
               </div>
            </div>

            {/* Section 2: Portfolio Gallery */}
            <div className="mb-8" id="portfolio">
               <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-extrabold">Portofolio</h2>
               </div>
               
               {/* Gallery Tabs */}
               <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-6">
                  {["Semua", "Wedding", "Pre-Wedding", "Portrait", "Cinematic"].map(tab => (
                     <button 
                       key={tab} 
                       onClick={() => setActiveTab(tab)}
                       className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                         activeTab === tab ? "bg-foreground text-white" : "bg-white border border-border text-text-muted hover:border-foreground"
                       }`}
                     >
                        {tab}
                     </button>
                  ))}
               </div>

               {/* Masonry-like Grid */}
               <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[150px]">
                  <AnimatePresence>
                     {filteredPortfolio.map((item) => (
                        <motion.div
                           key={item.id}
                           layout
                           initial={{ opacity: 0, scale: 0.9 }}
                           animate={{ opacity: 1, scale: 1 }}
                           exit={{ opacity: 0, scale: 0.9 }}
                           transition={{ duration: 0.3 }}
                           className={`relative rounded-2xl overflow-hidden group cursor-pointer ${item.span}`}
                           onClick={() => setPreviewImage(item.img)}
                        >
                           <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Portfolio" />
                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Maximize2 className="w-8 h-8 text-white drop-shadow-md" />
                           </div>
                        </motion.div>
                     ))}
                  </AnimatePresence>
               </div>
            </div>

            {/* Section 4: Packages */}
            <div className="mb-8" id="packages">
               <h2 className="text-2xl font-extrabold mb-6">Paket & Harga</h2>
               <div className="flex flex-col gap-4">
                  {PACKAGES.map((pkg, i) => (
                     <div key={i} className={`p-6 rounded-3xl border ${pkg.recommended ? "border-primary bg-primary-light/30 shadow-md relative overflow-hidden" : "border-border bg-white shadow-sm"}`}>
                        {pkg.recommended && (
                           <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-extrabold px-4 py-1.5 rounded-bl-xl tracking-wider uppercase">Paling Populer</div>
                        )}
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-6">
                           <div className="flex-1">
                              <h3 className="text-xl font-extrabold text-foreground mb-1">{pkg.name}</h3>
                              <p className="text-2xl font-black text-primary mb-6">{pkg.price}</p>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                 <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-text-muted" /><span className="text-sm font-semibold">{pkg.duration}</span></div>
                                 <div className="flex items-center gap-2"><Camera className="w-4 h-4 text-text-muted" /><span className="text-sm font-semibold">{pkg.photos}</span></div>
                                 <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-text-muted" /><span className="text-sm font-semibold">{pkg.revision}</span></div>
                                 <div className="flex items-center gap-2"><CalendarIcon className="w-4 h-4 text-text-muted" /><span className="text-sm font-semibold">{pkg.delivery}</span></div>
                              </div>
                           </div>
                           <div className="w-full sm:w-auto shrink-0">
                              <button className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold transition-all shadow-sm ${pkg.recommended ? "bg-primary hover:bg-primary-hover text-white hover:-translate-y-0.5" : "bg-surface-2 hover:bg-border text-foreground"}`}>
                                 Pilih Paket
                              </button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* Section 6: Availability Calendar */}
            <div className="bg-white rounded-3xl p-6 md:p-10 border border-border shadow-sm mb-8">
               <h2 className="text-2xl font-extrabold mb-6">Ketersediaan Bulan Ini</h2>
               <div className="flex gap-4 mb-6 text-sm font-semibold">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-teal"></div>Tersedia</div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-surface-2 border border-border"></div>Penuh</div>
               </div>
               
               <div className="grid grid-cols-7 gap-2 text-center">
                  {/* Calendar Header */}
                  {["Min","Sen","Sel","Rab","Kam","Jum","Sab"].map(d => <div key={d} className="text-xs font-bold text-text-muted mb-2">{d}</div>)}
                  
                  {/* Calendar Days */}
                  {CALENDAR_DAYS.map((day, i) => (
                     <div key={i} className={`aspect-square flex items-center justify-center rounded-xl text-sm font-bold border transition-colors ${day.available ? "bg-teal/10 border-teal/20 text-teal hover:bg-teal/20 cursor-pointer" : "bg-surface text-text-muted/50 border-transparent relative"}`}>
                        {day.date}
                        {!day.available && <div className="absolute w-full h-[2px] bg-text-muted/20 -rotate-45"></div>}
                     </div>
                  ))}
               </div>
            </div>

            {/* Section 5: Reviews */}
            <div className="mb-12">
               <h2 className="text-2xl font-extrabold mb-6">Ulasan Klien ({PHOTOGRAPHER.reviewsCount})</h2>
               <div className="grid grid-cols-1 gap-4">
                  {REVIEWS.map(r => (
                     <div key={r.id} className="bg-white p-6 rounded-3xl border border-border flex gap-4 shadow-sm">
                        <img src={r.avatar} alt={r.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
                        <div>
                           <div className="flex items-center gap-2 mb-1">
                              <p className="font-bold">{r.name}</p>
                              <div className="flex"><Star className="w-3 h-3 fill-amber text-amber"/></div>
                           </div>
                           <p className="text-sm text-text-muted leading-relaxed mb-4">{r.text}</p>
                           {r.img && <img src={r.img} alt="Review attachment" className="w-24 h-24 rounded-xl object-cover" />}
                        </div>
                     </div>
                  ))}
               </div>
            </div>

         </div>

         {/* Sticky Sidebar (Right Column) - Desktop Only */}
         <aside className="hidden md:block w-80 lg:w-96 shrink-0 sticky top-24">
            <div className="bg-white rounded-3xl p-6 border border-border shadow-xl">
               <div className="mb-6">
                  <p className="text-sm font-bold text-text-muted uppercase tracking-wider mb-1">Mulai Dari</p>
                  <p className="text-3xl font-black text-foreground">Rp 1.500.000</p>
               </div>
               
               <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm font-semibold border-b border-border pb-3"><span className="text-text-muted">DP Pemesanan</span><span className="text-foreground">30%</span></div>
                  <div className="flex justify-between text-sm font-semibold border-b border-border pb-3"><span className="text-text-muted">Pembatalan</span><span className="text-foreground">Fleksibel</span></div>
               </div>

               <Link href={`/book/${PHOTOGRAPHER.name}`} className="w-full py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all text-lg mb-3 block text-center">
                  Pesan Fotografer
               </Link>
               <button className="w-full py-3.5 bg-white border-2 border-border hover:bg-surface-2 text-foreground font-bold rounded-xl transition-colors">
                  Kirim Pesan
               </button>
               
               <p className="text-center text-xs font-semibold text-text-muted mt-4">Pemesanan dijamin aman oleh Lensora Protection.</p>
            </div>
         </aside>

      </div>

      {/* Sticky Bottom CTA (Mobile Only) */}
      <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-border p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-40 flex items-center gap-4">
         <div>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Mulai Dari</p>
            <p className="text-lg font-black text-foreground">Rp 1.5jt</p>
         </div>
         <Link href={`/book/${PHOTOGRAPHER.name}`} className="flex-1 py-3.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl shadow-md transition-colors text-center block">
            Pesan Sekarang
         </Link>
      </div>

      {/* Lightbox Modal (Framer Motion) */}
      <AnimatePresence>
         {previewImage && (
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-10 backdrop-blur-sm"
               onClick={() => setPreviewImage(null)}
            >
               <button className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors">
                  <X className="w-6 h-6" />
               </button>
               <motion.img 
                  initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                  src={previewImage} alt="Preview" className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain"
                  onClick={e => e.stopPropagation()}
               />
            </motion.div>
         )}
      </AnimatePresence>
    </main>
  );
}
