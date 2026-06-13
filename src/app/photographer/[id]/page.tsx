"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, MapPin, Star, CheckCircle2, Clock, 
  ChevronLeft, Calendar as CalendarIcon, X, Maximize2, Zap, ShieldCheck, Scale
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCompare } from "@/context/CompareContext";

// --- Mock Data ---
const PHOTOGRAPHER = {
  name: "Adrianus Dewa",
  rating: 4.9,
  reviewsCount: 124,
  location: "Jakarta Selatan",
  response_time: "< 1 Jam",
  experience: "5+ Tahun",
  specialty: "Cinematic Wedding",
  tags: ["Cinematic", "Wedding", "Pre-Wedding"],
  avatar: "https://i.pravatar.cc/150?img=11",
  cover: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1600&auto=format&fit=crop",
  bio: "Gak cuma sekedar jepret, aku fokus buat nangkep emosi dan cerita jujur di balik momen kamu. Spesialis color grading cinematic yang bikin fotomu berasa kayak potongan film layar lebar.",
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
    rating: 4.8,
    summary: "Paling pas buat foto wisuda atau couple session singkat.",
    features: {
      "Semua File Original": true,
      "Same Day Preview": true,
      "Cetak Album Fisik": false,
      "Drone Shoot": false,
      "Unlimited Revision": false,
      "Asisten Fotografer": false,
    },
    details: {
      duration: "4 Jam",
      photos: "50 Foto Edit",
      revision: "1x Revisi",
      delivery: "3 Hari",
      locationCoverage: "Dalam Kota (Free)",
      rawFiles: "Tidak Tersedia",
      availableDates: "Senin - Kamis",
    }
  },
  {
    name: "Cinematic Journey",
    price: "Rp 3.500.000",
    duration: "8 Jam Sesi (Full Day)",
    photos: "120 Foto Edit + Album",
    revision: "Revisi Sepuasnya",
    delivery: "7 Hari Kerja",
    recommended: true,
    rating: 5.0,
    summary: "Paket lengkap all-in untuk pre-wedding atau dokumentasi event seharian.",
    features: {
      "Semua File Original": true,
      "Same Day Preview": true,
      "Cetak Album Fisik": true,
      "Drone Shoot": true,
      "Unlimited Revision": true,
      "Asisten Fotografer": true,
    },
    details: {
      duration: "8 Jam (Full Day)",
      photos: "120 Foto Edit",
      revision: "Revisi Sepuasnya",
      delivery: "7 Hari",
      locationCoverage: "Jabodetabek (Free)",
      rawFiles: "Termasuk (Google Drive)",
      availableDates: "Setiap Hari",
    }
  }
];

const REVIEWS = [
  { id: 1, name: "Cindy Kirana", rating: 5, text: "Profesional dan sabar banget ngarahin gaya kita yang kaku. Hasil grading warnanya bener-bener dapet cinematic-nya! Worth it banget.", avatar: "https://i.pravatar.cc/100?img=32", img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=200&auto=format&fit=crop" },
  { id: 2, name: "Bagas Pratama", rating: 5, text: "Gak nyesel booking Adrianus. Dateng on time, gear lengkap, dan hasilnya cepet banget dikirim. Asik diajak ngobrol juga.", avatar: "https://i.pravatar.cc/100?img=53" },
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

  const { compareList, toggleCompare } = useCompare();

  const handleCompare = (pkg: any) => {
    toggleCompare({
      vendorName: PHOTOGRAPHER.name,
      ...pkg
    });
  };

  const isCompared = (pkgName: string) => {
    return compareList.some(p => p.name === pkgName && p.vendorName === PHOTOGRAPHER.name);
  };

  const filteredPortfolio = activeTab === "Semua" ? PORTFOLIO : PORTFOLIO.filter(p => p.category === activeTab);

  return (
    <main className="min-h-screen bg-[#F8FAFF] pb-24 md:pb-0 font-sans">
      
      {/* Navbar Minimalist */}
      <nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link href="/explore" className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-[#0F172A] transition-colors border border-slate-100 shadow-sm">
             <ChevronLeft className="w-5 h-5" />
          </Link>
          <span className="font-bold text-[#0F172A] text-sm hidden sm:block">Kembali ke Pencarian</span>
        </div>
      </nav>

      {/* Hero Cover */}
      <div className="mt-16 w-full h-[30vh] md:h-[40vh] relative overflow-hidden">
         <motion.img 
            initial={{ scale: 1.05 }} animate={{ scale: 1 }} transition={{ duration: 1 }}
            src={PHOTOGRAPHER.cover} alt="Cover" className="w-full h-full object-cover" 
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFF] via-[#F8FAFF]/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 -mt-20 md:-mt-32 relative z-10 flex flex-col md:flex-row gap-8 items-start">
         
         {/* Main Content (Left Column) */}
         <div className="flex-1 w-full max-w-3xl">
            
            {/* 1. Header Profile */}
            <div className="bg-white rounded-[2.5rem] p-6 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/40 mb-8 relative">
               <div className="absolute -top-16 md:-top-20 left-6 md:left-10 w-28 h-28 md:w-36 md:h-36 rounded-[2rem] border-4 border-white shadow-xl overflow-hidden bg-white">
                 <img src={PHOTOGRAPHER.avatar} alt="Avatar" className="w-full h-full object-cover" />
               </div>

               <div className="mt-14 md:mt-16">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                     <div>
                        <h1 className="text-3xl md:text-4xl font-black text-[#0F172A] flex items-center gap-2 tracking-tight">
                           {PHOTOGRAPHER.name}
                           <CheckCircle2 className="w-6 h-6 text-[#2563EB]" />
                        </h1>
                        <div className="flex items-center gap-3 text-sm font-bold text-slate-500 mt-2">
                           <span className="flex items-center gap-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100"><MapPin className="w-4 h-4"/> {PHOTOGRAPHER.location}</span>
                           <span className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2.5 py-1 rounded-lg border border-yellow-100"><Star className="w-4 h-4 fill-yellow-500 text-yellow-500"/> {PHOTOGRAPHER.rating} ({PHOTOGRAPHER.reviewsCount})</span>
                        </div>
                     </div>
                  </div>
                  
                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-6 border-y border-slate-100 my-6">
                     <div className="bg-slate-50 rounded-2xl p-3 text-center border border-slate-100"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Klien</p><p className="font-black text-[#0F172A] text-lg">{PHOTOGRAPHER.reviewsCount}+</p></div>
                     <div className="bg-slate-50 rounded-2xl p-3 text-center border border-slate-100"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Respons</p><div className="flex items-center justify-center gap-1"><Zap className="w-3 h-3 text-yellow-500 fill-yellow-500"/><p className="font-black text-[#0F172A] text-lg">{PHOTOGRAPHER.response_time}</p></div></div>
                     <div className="bg-slate-50 rounded-2xl p-3 text-center border border-slate-100"><p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Pengalaman</p><p className="font-black text-[#0F172A] text-lg">{PHOTOGRAPHER.experience}</p></div>
                     <div className="bg-blue-50 rounded-2xl p-3 text-center border border-blue-100"><p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1">Status</p><p className="font-black text-[#2563EB] text-lg">Tersedia</p></div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                     {PHOTOGRAPHER.tags.map(tag => (
                        <span key={tag} className="px-3 py-1.5 bg-blue-50/50 border border-blue-100 text-[#2563EB] text-xs font-bold rounded-full">{tag}</span>
                     ))}
                  </div>
               </div>
            </div>

            {/* 2. Kenalan Sama Aku (Bio) */}
            <div className="bg-white rounded-[2.5rem] p-6 md:p-10 border border-slate-100 shadow-sm mb-8">
               <h2 className="text-2xl font-black mb-5 text-[#0F172A] tracking-tight">Kenalan Sama Aku 👋</h2>
               <p className="text-slate-500 leading-relaxed font-medium mb-6 text-base md:text-lg">{PHOTOGRAPHER.bio}</p>
               <div>
                  <h3 className="font-bold text-slate-400 uppercase tracking-widest text-[10px] mb-3">Spesialisasi Style</h3>
                  <div className="inline-flex items-center gap-2 font-bold text-[#0F172A] bg-[#FACC15]/20 px-4 py-2 rounded-xl border border-[#FACC15]/30">
                    <Camera className="w-4 h-4 text-yellow-700" />
                    {PHOTOGRAPHER.specialty}
                  </div>
               </div>
            </div>

            {/* 3. Portfolio Gallery */}
            <div className="mb-8 bg-white p-6 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm" id="portfolio">
               <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">Portofolio</h2>
               </div>
               
               {/* Gallery Tabs */}
               <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-6 pb-2">
                  {["Semua", "Wedding", "Pre-Wedding", "Portrait", "Cinematic"].map(tab => (
                     <button 
                       key={tab} 
                       onClick={() => setActiveTab(tab)}
                       className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                         activeTab === tab ? "bg-[#0F172A] text-white shadow-md" : "bg-slate-50 border border-slate-100 text-slate-500 hover:bg-slate-100"
                       }`}
                     >
                        {tab}
                     </button>
                  ))}
               </div>

               {/* Masonry-like Grid */}
               <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[160px]">
                  <AnimatePresence>
                     {filteredPortfolio.map((item) => (
                        <motion.div
                           key={item.id}
                           layout
                           initial={{ opacity: 0, scale: 0.95 }}
                           animate={{ opacity: 1, scale: 1 }}
                           exit={{ opacity: 0, scale: 0.95 }}
                           transition={{ duration: 0.3 }}
                           className={`relative rounded-2xl overflow-hidden group cursor-pointer border border-slate-100 ${item.span}`}
                           onClick={() => setPreviewImage(item.img)}
                        >
                           <img src={item.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Portfolio" />
                           <div className="absolute inset-0 bg-[#0F172A]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                              <Maximize2 className="w-8 h-8 text-white drop-shadow-md" />
                           </div>
                        </motion.div>
                     ))}
                  </AnimatePresence>
               </div>
            </div>

            {/* 4. Packages */}
            <div className="mb-8" id="packages">
               <h2 className="text-2xl font-black mb-6 text-[#0F172A] tracking-tight px-2">Pilihan Paket</h2>
               <div className="flex flex-col gap-5">
                  {PACKAGES.map((pkg, i) => (
                     <div key={i} className={`p-6 md:p-8 rounded-[2rem] border transition-all duration-300 ${pkg.recommended ? "bg-[#2563EB] border-[#2563EB] shadow-xl shadow-blue-500/20 relative overflow-hidden" : "bg-white border-slate-100 shadow-sm hover:shadow-lg"}`}>
                        
                        {pkg.recommended && (
                           <div className="absolute top-4 right-4 bg-[#FACC15] text-[#78350F] text-[10px] font-black px-3 py-1.5 rounded-full tracking-widest uppercase shadow-sm">
                             Bestseller 🔥
                           </div>
                        )}

                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-8">
                           <div className="flex-1">
                              <h3 className={`text-xl font-black mb-2 ${pkg.recommended ? "text-white" : "text-[#0F172A]"}`}>{pkg.name}</h3>
                              <p className={`text-3xl font-black mb-6 ${pkg.recommended ? "text-[#FACC15]" : "text-[#2563EB]"}`}>{pkg.price}</p>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                 <div className="flex items-center gap-3">
                                   <div className={`w-8 h-8 rounded-full flex items-center justify-center ${pkg.recommended ? 'bg-white/10' : 'bg-slate-50'}`}><Clock className={`w-4 h-4 ${pkg.recommended ? 'text-white' : 'text-slate-400'}`} /></div>
                                   <span className={`text-sm font-bold ${pkg.recommended ? 'text-white' : 'text-slate-600'}`}>{pkg.duration}</span>
                                 </div>
                                 <div className="flex items-center gap-3">
                                   <div className={`w-8 h-8 rounded-full flex items-center justify-center ${pkg.recommended ? 'bg-white/10' : 'bg-slate-50'}`}><Camera className={`w-4 h-4 ${pkg.recommended ? 'text-white' : 'text-slate-400'}`} /></div>
                                   <span className={`text-sm font-bold ${pkg.recommended ? 'text-white' : 'text-slate-600'}`}>{pkg.photos}</span>
                                 </div>
                                 <div className="flex items-center gap-3">
                                   <div className={`w-8 h-8 rounded-full flex items-center justify-center ${pkg.recommended ? 'bg-white/10' : 'bg-slate-50'}`}><CheckCircle2 className={`w-4 h-4 ${pkg.recommended ? 'text-white' : 'text-slate-400'}`} /></div>
                                   <span className={`text-sm font-bold ${pkg.recommended ? 'text-white' : 'text-slate-600'}`}>{pkg.revision}</span>
                                 </div>
                                 <div className="flex items-center gap-3">
                                   <div className={`w-8 h-8 rounded-full flex items-center justify-center ${pkg.recommended ? 'bg-white/10' : 'bg-slate-50'}`}><CalendarIcon className={`w-4 h-4 ${pkg.recommended ? 'text-white' : 'text-slate-400'}`} /></div>
                                   <span className={`text-sm font-bold ${pkg.recommended ? 'text-white' : 'text-slate-600'}`}>{pkg.delivery}</span>
                                 </div>
                              </div>
                           </div>
                           <div className="w-full md:w-auto shrink-0 mt-4 md:mt-0 flex flex-col gap-2">
                              <Link href={`/book/${PHOTOGRAPHER.name}?pkg=${pkg.name}`} className={`w-full md:w-auto px-8 py-4 rounded-2xl font-black transition-all text-center block ${pkg.recommended ? "bg-white text-[#2563EB] hover:bg-slate-50 shadow-lg hover:-translate-y-1" : "bg-[#2563EB] hover:bg-blue-700 text-white shadow-lg hover:-translate-y-1"} text-base`}>
                                 Booking Paket Ini
                              </Link>
                              <button 
                                onClick={() => handleCompare(pkg)}
                                className={`w-full md:w-auto px-6 py-3 rounded-xl font-bold transition-all text-center border-2 border-transparent ${
                                  isCompared(pkg.name)
                                    ? (pkg.recommended ? "bg-white/20 text-white" : "bg-slate-100 text-[#0F172A] border-slate-200")
                                    : (pkg.recommended ? "text-white/90 hover:bg-white/10" : "text-slate-500 hover:text-[#0F172A] hover:bg-slate-50 border-slate-100 hover:border-slate-200")
                                } text-sm flex items-center justify-center gap-2`}
                              >
                                 <Scale className="w-4 h-4" />
                                 {isCompared(pkg.name) ? "✓ Ditambahkan" : "Bandingkan Paket"}
                              </button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* 5. Availability Calendar */}
            <div className="bg-white rounded-[2.5rem] p-6 md:p-10 border border-slate-100 shadow-sm mb-8">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                 <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">Jadwal Kosong</h2>
                 <div className="flex gap-4 text-xs font-bold text-slate-500 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                    <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#2563EB]"></div>Tersedia</div>
                    <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>Penuh</div>
                 </div>
               </div>
               
               <div className="grid grid-cols-7 gap-2 md:gap-3 text-center">
                  {/* Calendar Header */}
                  {["Min","Sen","Sel","Rab","Kam","Jum","Sab"].map(d => <div key={d} className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{d}</div>)}
                  
                  {/* Calendar Days */}
                  {CALENDAR_DAYS.map((day, i) => (
                     <motion.div whileHover={day.available ? { scale: 1.05 } : {}} key={i} className={`aspect-square flex items-center justify-center rounded-xl md:rounded-2xl text-sm font-black border transition-colors ${day.available ? "bg-blue-50 border-blue-100 text-[#2563EB] hover:bg-blue-100 cursor-pointer shadow-sm" : "bg-slate-50 text-slate-300 border-slate-100 relative overflow-hidden"}`}>
                        {day.date}
                        {!day.available && <div className="absolute w-full h-[1px] bg-slate-300 -rotate-45"></div>}
                     </motion.div>
                  ))}
               </div>
            </div>

            {/* 6. Reviews */}
            <div className="mb-12 px-2">
               <h2 className="text-2xl font-black mb-6 text-[#0F172A] tracking-tight">Kata Mereka ({PHOTOGRAPHER.reviewsCount})</h2>
               <div className="grid grid-cols-1 gap-5">
                  {REVIEWS.map(r => (
                     <div key={r.id} className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 flex flex-col sm:flex-row gap-5 shadow-sm">
                        <img src={r.avatar} alt={r.name} className="w-14 h-14 rounded-full object-cover shrink-0 border-2 border-slate-50" />
                        <div>
                           <div className="flex items-center gap-3 mb-2">
                              <p className="font-black text-[#0F172A] text-lg">{r.name}</p>
                              <div className="flex bg-yellow-50 px-2 py-0.5 rounded-full border border-yellow-100"><Star className="w-3 h-3 fill-yellow-500 text-yellow-500"/></div>
                           </div>
                           <p className="text-base text-slate-500 font-medium leading-relaxed mb-4">"{r.text}"</p>
                           {r.img && <img src={r.img} alt="Review attachment" className="w-32 h-32 rounded-2xl object-cover shadow-md border border-slate-100" />}
                        </div>
                     </div>
                  ))}
               </div>
            </div>

         </div>

         {/* Sticky Sidebar (Right Column) - Desktop Only */}
         <aside className="hidden md:block w-80 lg:w-96 shrink-0 sticky top-24">
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40">
               <div className="mb-8">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Mulai Dari</p>
                  <p className="text-4xl font-black text-[#0F172A] tracking-tight">Rp 1.5jt</p>
               </div>
               
               <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center text-sm font-bold border-b border-slate-100 pb-4"><span className="text-slate-400">DP Pemesanan</span><span className="text-[#0F172A] bg-slate-50 px-3 py-1 rounded-lg">30%</span></div>
                  <div className="flex justify-between items-center text-sm font-bold border-b border-slate-100 pb-4"><span className="text-slate-400">Pembatalan</span><span className="text-[#2563EB] bg-blue-50 px-3 py-1 rounded-lg">Fleksibel</span></div>
               </div>

               <Link href={`/book/${PHOTOGRAPHER.name}`} className="w-full py-4 bg-[#2563EB] hover:bg-blue-700 text-white font-black rounded-2xl shadow-lg shadow-blue-500/25 hover:-translate-y-1 transition-all text-base mb-3 flex items-center justify-center gap-2">
                  Booking Sekarang <CheckCircle2 className="w-4 h-4" />
               </Link>
               <button className="w-full py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-black rounded-2xl transition-colors text-base">
                  Kirim Pesan
               </button>
               
               <div className="flex items-center justify-center gap-2 mt-6">
                 <ShieldCheck className="w-4 h-4 text-green-500" />
                 <p className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">Dijamin Aman oleh Lensora</p>
               </div>
            </div>
         </aside>

      </div>

      {/* Sticky Bottom CTA (Mobile Only) */}
      <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-100 p-4 shadow-[0_-20px_40px_rgba(0,0,0,0.05)] z-40 flex items-center gap-5">
         <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Start Dari</p>
            <p className="text-xl font-black text-[#0F172A]">Rp 1.5jt</p>
         </div>
         <Link href={`/book/${PHOTOGRAPHER.name}`} className="flex-1 py-4 bg-[#2563EB] text-white font-black rounded-2xl shadow-lg shadow-blue-500/25 transition-all text-center block">
            Booking Now
         </Link>
      </div>


      {/* Lightbox Modal (Framer Motion) */}
      <AnimatePresence>
         {previewImage && (
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="fixed inset-0 z-[100] bg-[#0F172A]/90 flex items-center justify-center p-4 sm:p-10 backdrop-blur-md"
               onClick={() => setPreviewImage(null)}
            >
               <button className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors">
                  <X className="w-6 h-6" />
               </button>
               <motion.img 
                  initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  src={previewImage} alt="Preview" className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain"
                  onClick={e => e.stopPropagation()}
               />
            </motion.div>
         )}
      </AnimatePresence>
    </main>
  );
}
