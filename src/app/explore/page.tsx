"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, Search, MapPin, Star, Filter, X, CheckCircle2, 
  ChevronDown, LayoutGrid, SlidersHorizontal, GitCompareArrows,
  UploadCloud, Calendar
} from "lucide-react";
import Link from "next/link";

// --- Mock Data ---
const STYLE_TAGS = ["Korean", "Cinematic", "Warm Tone", "Graduation", "Moody", "Documentary"];
const CATEGORIES = ["Wedding", "Pre-Wedding", "Graduation", "Product", "Fashion", "Event"];
const LOCATIONS = ["Jakarta", "Bandung", "Surabaya", "Bali", "Yogyakarta"];

const MOCK_PHOTOGRAPHERS = [
  { id: 1, name: "Adrianus Dewa", rating: 4.9, projects: 124, location: "Jakarta Selatan", price: "Rp 1.500.000", tags: ["Cinematic", "Wedding"], cover: "https://images.unsplash.com/photo-1554046920-90dc5823ca20?q=80&w=900&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?img=11", available: true },
  { id: 2, name: "Bella & Co", rating: 5.0, projects: 89, location: "Bali", price: "Rp 3.000.000", tags: ["Warm Tone", "Pre-Wedding"], cover: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=900&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?img=5", available: true },
  { id: 3, name: "Seno Visuals", rating: 4.8, projects: 210, location: "Bandung", price: "Rp 1.200.000", tags: ["Moody", "Graduation"], cover: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=900&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?img=12", available: false },
  { id: 4, name: "Luminare Studio", rating: 4.9, projects: 56, location: "Surabaya", price: "Rp 2.000.000", tags: ["Korean", "Fashion"], cover: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=900&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?img=9", available: true },
  { id: 5, name: "Dimas Story", rating: 4.7, projects: 145, location: "Yogyakarta", price: "Rp 900.000", tags: ["Documentary", "Event"], cover: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=900&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?img=33", available: true },
  { id: 6, name: "Aesthetic Project", rating: 5.0, projects: 320, location: "Jakarta Pusat", price: "Rp 2.500.000", tags: ["Cinematic", "Product"], cover: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=900&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?img=47", available: false },
];

export default function ExplorePhotographers() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const POPULAR_STYLES = [
    { label: "Graduation", icon: "🎓" },
    { label: "Korean Style", icon: "🌸" },
    { label: "Cinematic", icon: "🎬" },
    { label: "Pre-Wedding", icon: "💍" },
    { label: "Warm Tone", icon: "✨" },
    { label: "Candid", icon: "📸" },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setUploadedImage(url);
    }
  };

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Search Filter */}
      <div>
        <label className="text-sm font-bold text-foreground mb-3 block">Pencarian</label>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input type="text" placeholder="Nama fotografer..." className="w-full pl-9 pr-3 py-2.5 bg-surface-2 border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors" />
        </div>
      </div>

      {/* Categories */}
      <div>
        <label className="text-sm font-bold text-foreground mb-3 block">Kategori</label>
        <div className="flex flex-col gap-2">
          {CATEGORIES.map(cat => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <div className="w-4 h-4 rounded border border-border flex items-center justify-center group-hover:border-primary transition-colors"></div>
              <span className="text-sm text-text-muted group-hover:text-foreground transition-colors">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Style Tags */}
      <div>
        <label className="text-sm font-bold text-foreground mb-3 block">Style Visual</label>
        <div className="flex flex-wrap gap-2">
          {STYLE_TAGS.map(tag => (
            <button 
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border ${
                activeTag === tag 
                  ? "bg-primary text-white border-primary" 
                  : "bg-white text-text-muted border-border hover:border-primary/50"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-sm font-bold text-foreground mb-3 block">Range Harga</label>
        <div className="flex items-center gap-2">
          <input type="text" placeholder="Min" className="w-full px-3 py-2 bg-surface-2 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" />
          <span className="text-text-muted">-</span>
          <input type="text" placeholder="Max" className="w-full px-3 py-2 bg-surface-2 border border-border rounded-xl text-sm focus:outline-none focus:border-primary" />
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="text-sm font-bold text-foreground mb-3 block">Lokasi</label>
        <div className="relative">
          <select className="w-full px-3 py-2.5 bg-surface-2 border border-border rounded-xl text-sm focus:outline-none focus:border-primary appearance-none text-text-muted">
            <option value="">Semua Lokasi</option>
            {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>
          <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
        </div>
      </div>

      {/* Availability */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer group p-3 bg-surface-2 rounded-xl border border-border">
          <div className="w-5 h-5 rounded border border-border flex items-center justify-center group-hover:border-primary transition-colors bg-white"></div>
          <span className="text-sm font-bold text-foreground">Tersedia Minggu Ini</span>
        </label>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navbar (Simplified for explore page) */}
      <nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-border h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-foreground">
          <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">
            <Camera className="w-4 h-4" />
          </div>
          Lensora<span className="text-primary">.</span>
        </Link>
        <div className="hidden md:flex gap-8 items-center text-sm font-semibold text-text-muted absolute left-1/2 -translate-x-1/2">
           <Link href="/" className="hover:text-primary transition-colors">Home</Link>
           <Link href="/explore" className="text-primary transition-colors">Explore Photographer</Link>
           <Link href="/about" className="hover:text-primary transition-colors">About</Link>
           <Link href="/vendor-onboarding" className="hover:text-primary transition-colors">Become Vendor</Link>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/dashboard" className="text-sm font-bold text-text-muted hover:text-foreground transition-colors hidden sm:block mt-0.5">Dashboard</Link>
          <Link href="/login" className="px-4 py-2 bg-surface-2 hover:bg-border rounded-xl text-foreground text-sm font-bold transition-colors">Masuk</Link>
        </div>
      </nav>

      {/* Header Section */}
      <section className="pt-28 pb-10 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            Temukan Fotografer <span className="text-primary">Impianmu</span>
          </h1>
          <p className="text-lg text-text-muted max-w-2xl">
            Eksplorasi ribuan talenta berdasarkan gaya, harga, lokasi, dan preferensi visualmu.
          </p>
          
          {/* Premium Search Container */}
          <div className="mt-10 max-w-5xl">
             <div className="bg-white border border-border shadow-md rounded-[2rem] p-3 flex flex-col md:flex-row items-center gap-3 w-full">
                
                {/* Field 1: Style / Photographer */}
                <div className="flex-1 w-full bg-surface-2 hover:bg-surface border border-transparent hover:border-border transition-colors rounded-3xl px-5 py-4 flex items-center gap-3">
                   <Search className="w-6 h-6 text-text-muted shrink-0" />
                   <input 
                     type="text" 
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     placeholder="Cari style, vibes, atau nama photographer..." 
                     className="w-full bg-transparent outline-none text-base font-semibold text-foreground placeholder-text-muted" 
                   />
                </div>

                {/* Field 2: Date */}
                <div className="w-full md:w-48 bg-surface-2 hover:bg-surface border border-transparent hover:border-border transition-colors rounded-3xl px-5 py-4 flex flex-col justify-center relative cursor-pointer group shrink-0">
                   <label className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider mb-0.5 cursor-pointer">Tanggal Pemotretan</label>
                   <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-foreground" />
                      <input type="date" className="bg-transparent outline-none text-sm font-bold text-foreground cursor-pointer appearance-none w-full" />
                   </div>
                </div>

                {/* Field 3: Upload Reference */}
                <div className="w-full md:w-56 h-[72px] bg-blue-50/50 hover:bg-blue-50 border border-blue-100 hover:border-blue-200 transition-all rounded-3xl relative overflow-hidden flex items-center shrink-0 cursor-pointer group">
                   <input 
                     type="file" 
                     accept="image/*"
                     onChange={handleFileUpload}
                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                   />
                   
                   {uploadedImage ? (
                      <div className="w-full h-full flex items-center p-2 gap-3 relative">
                         <img src={uploadedImage} alt="Reference" className="w-14 h-14 rounded-2xl object-cover shadow-sm border border-border/50" />
                         <div className="flex-1">
                            <p className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider mb-0.5">Inspirasi</p>
                            <p className="text-xs font-bold text-foreground truncate">1 Gambar Aktif</p>
                         </div>
                         <button 
                           onClick={(e) => { e.preventDefault(); setUploadedImage(null); }}
                           className="absolute top-2 right-2 p-1 bg-white/80 rounded-full text-text-muted hover:text-red-500 z-20"
                         >
                           <X className="w-3 h-3" />
                         </button>
                      </div>
                   ) : (
                      <div className="w-full px-5 flex items-center gap-3">
                         <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                            <UploadCloud className="w-5 h-5 text-blue-600" />
                         </div>
                         <div>
                            <p className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider mb-0.5">Upload Inspirasi</p>
                            <p className="text-xs font-bold text-text-muted leading-tight">Cari photographer dengan vibes serupa</p>
                         </div>
                      </div>
                   )}
                </div>

                {/* Search CTA */}
                <button className="w-full md:w-auto px-8 h-[72px] bg-blue-600 hover:bg-blue-700 text-white rounded-3xl font-extrabold text-base transition-colors shadow-sm shrink-0">
                   Cari Photographer
                </button>
             </div>

             {/* Popular Style Quick CTA */}
             <div className="mt-6">
                <div className="flex flex-wrap items-center gap-3">
                   <span className="text-sm font-extrabold text-foreground mr-2">🔥 Style Populer:</span>
                   {POPULAR_STYLES.map(style => (
                      <button 
                        key={style.label}
                        onClick={() => setSearchQuery(style.label)}
                        className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                           searchQuery === style.label 
                           ? "bg-blue-600 text-white border-blue-600 shadow-md" 
                           : "bg-white text-text-muted border-border hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
                        }`}
                      >
                         <span className="mr-1.5">{style.icon}</span>
                         {style.label}
                      </button>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Main Layout */}
      <section className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex gap-8 relative">
        
        {/* Desktop Sidebar Filter */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-24 bg-white p-6 rounded-3xl border border-border shadow-sm">
             <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                <h2 className="font-extrabold flex items-center gap-2"><SlidersHorizontal className="w-4 h-4"/> Filter</h2>
                <button className="text-xs font-bold text-text-muted hover:text-primary transition-colors">Reset</button>
             </div>
             <FilterContent />
          </div>
        </aside>

        {/* Photographers Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
             <p className="text-sm font-bold text-text-muted">Menampilkan <span className="text-foreground">245</span> fotografer</p>
             <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-text-muted hidden sm:block">Urutkan:</span>
                <select className="bg-white border border-border rounded-lg px-3 py-1.5 text-sm font-bold outline-none cursor-pointer">
                   <option>Rekomendasi</option>
                   <option>Rating Tertinggi</option>
                   <option>Harga Terendah</option>
                   <option>Harga Tertinggi</option>
                </select>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
             {MOCK_PHOTOGRAPHERS.map((photographer, idx) => (
                <motion.div 
                  key={photographer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-3xl border border-border overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col relative"
                >
                  {/* Availability Badge */}
                  {photographer.available && (
                     <div className="absolute top-4 right-4 z-10 bg-teal/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1.5 shadow-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div> Tersedia
                     </div>
                  )}

                  {/* Cover Image */}
                  <div className="w-full aspect-[4/3] overflow-hidden relative">
                    <img src={photographer.cover} alt={photographer.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1 relative bg-white">
                    {/* Avatar (overlapping) */}
                    <img src={photographer.avatar} alt={photographer.name} className="w-14 h-14 rounded-full border-4 border-white shadow-sm absolute -top-7 left-5 object-cover" />
                    
                    <div className="mt-6 flex justify-between items-start">
                       <div>
                          <h3 className="font-extrabold text-lg text-foreground leading-tight">{photographer.name}</h3>
                          <div className="flex items-center gap-1 text-xs font-semibold text-text-muted mt-1">
                             <MapPin className="w-3 h-3" /> {photographer.location}
                          </div>
                       </div>
                       <div className="flex items-center gap-1 bg-amber/10 px-2 py-1 rounded-md">
                          <Star className="w-3.5 h-3.5 text-amber fill-amber" />
                          <span className="text-xs font-extrabold text-amber">{photographer.rating}</span>
                       </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-4 mb-4">
                       {photographer.tags.map(tag => (
                         <span key={tag} className="px-2.5 py-1 bg-surface-2 text-text-muted text-[10px] font-bold rounded-full">{tag}</span>
                       ))}
                    </div>

                    <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
                       <div>
                          <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold mb-0.5">Mulai dari</p>
                          <p className="font-extrabold text-foreground text-sm">{photographer.price}</p>
                       </div>
                       <div className="flex gap-2">
                          <Link href={`/photographer/${photographer.id}`} className="px-6 py-2.5 w-full bg-foreground hover:bg-primary text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center">
                             Lihat Profil
                          </Link>
                       </div>
                    </div>
                  </div>
                </motion.div>
             ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
             <div className="flex gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-border bg-white text-text-muted hover:bg-surface-2 font-bold transition-colors" disabled>←</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary text-white font-bold shadow-sm">1</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-border bg-white text-foreground hover:bg-surface-2 font-bold transition-colors">2</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-border bg-white text-foreground hover:bg-surface-2 font-bold transition-colors">3</button>
                <span className="w-10 h-10 flex items-center justify-center text-text-muted font-bold">...</span>
                <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-border bg-white text-foreground hover:bg-surface-2 font-bold transition-colors">→</button>
             </div>
          </div>
        </div>

      </section>

      {/* Mobile Sticky Filter Button */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
         <button 
           onClick={() => setIsMobileFilterOpen(true)}
           className="bg-foreground text-white px-6 py-3.5 rounded-full font-bold shadow-xl flex items-center gap-2 hover:scale-105 transition-transform"
         >
            <Filter className="w-4 h-4" /> Filter & Urutkan
         </button>
      </div>

      {/* Mobile Filter Modal/Bottom Sheet */}
      <AnimatePresence>
         {isMobileFilterOpen && (
           <>
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               onClick={() => setIsMobileFilterOpen(false)}
               className="fixed inset-0 bg-black/50 z-50 lg:hidden backdrop-blur-sm"
             />
             <motion.div 
               initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
               transition={{ type: "spring", damping: 25, stiffness: 200 }}
               className="fixed inset-x-0 bottom-0 bg-white z-50 lg:hidden rounded-t-3xl max-h-[85vh] flex flex-col"
             >
                <div className="p-4 flex items-center justify-between border-b border-border shrink-0">
                   <h2 className="font-extrabold text-lg">Filter</h2>
                   <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 bg-surface-2 rounded-full text-text-muted hover:text-foreground">
                      <X className="w-5 h-5" />
                   </button>
                </div>
                <div className="p-6 overflow-y-auto flex-1">
                   <FilterContent />
                </div>
                <div className="p-4 border-t border-border shrink-0 flex gap-3 bg-white">
                   <button className="flex-1 py-3.5 bg-surface-2 text-foreground font-bold rounded-xl" onClick={() => setIsMobileFilterOpen(false)}>Reset</button>
                   <button className="flex-[2] py-3.5 bg-primary text-white font-bold rounded-xl shadow-sm" onClick={() => setIsMobileFilterOpen(false)}>Terapkan Filter</button>
                </div>
             </motion.div>
           </>
         )}
      </AnimatePresence>
    </main>
  );
}
