"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, SlidersHorizontal, MapPin, Star, Camera, ChevronDown, CheckCircle2, X, Image as ImageIcon, Calendar,
  UploadCloud, Filter, ImagePlus, Check, Heart, BadgeCheck, Zap, Sparkles
} from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

// --- Mock Data ---
const STYLE_TAGS = ["Korean", "Cinematic", "Warm Tone", "Graduation", "Moody", "Documentary"];
const CATEGORIES = ["Wedding", "Pre-Wedding", "Graduation", "Product", "Fashion", "Event"];
const LOCATIONS = ["Jakarta", "Bandung", "Surabaya", "Bali", "Yogyakarta"];

const placeholders = [
  "Cari 'Cinematic Wedding Jakarta'...",
  "Cari 'Wisuda Outdoor Bandung'...",
  "Cari 'Studio Foto Keluarga'...",
  "Cari 'Moody Pre-wedding Bali'...",
];

const MOCK_PHOTOGRAPHERS = [
  { id: 1, name: "Adrianus Dewa", rating: 4.9, projects: 124, location: "Jakarta Selatan", price: "Rp 1.500.000", tags: ["Cinematic", "Wedding"], cover: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=900&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?img=11", available: true, verified: true, responseTime: "< 1 jam", portfolio: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=300", "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=300", "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=300", "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=300", "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=300", "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=300"] },
  { id: 2, name: "Bella & Co", rating: 5.0, projects: 89, location: "Bali", price: "Rp 3.000.000", tags: ["Warm Tone", "Pre-Wedding"], cover: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=900&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?img=5", available: true, verified: true, responseTime: "Dalam 10 menit", portfolio: ["https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=300", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=300", "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=300", "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=300", "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=300", "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=300"] },
  { id: 3, name: "Seno Visuals", rating: 4.8, projects: 210, location: "Bandung", price: "Rp 1.200.000", tags: ["Moody", "Graduation"], cover: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=900&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?img=12", available: false, verified: false, responseTime: "Dalam beberapa jam", portfolio: ["https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=300", "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=300", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=300", "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=300", "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=300", "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=300"] },
  { id: 4, name: "Luminare Studio", rating: 4.9, projects: 56, location: "Surabaya", price: "Rp 2.000.000", tags: ["Korean", "Fashion"], cover: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=900&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?img=9", available: true, verified: true, responseTime: "Super responsif", portfolio: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=300", "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=300", "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=300", "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=300", "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=300", "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=300"] },
  { id: 5, name: "Dimas Story", rating: 4.7, projects: 145, location: "Yogyakarta", price: "Rp 900.000", tags: ["Documentary", "Event"], cover: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=900&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?img=33", available: true, verified: false, responseTime: "< 1 jam", portfolio: ["https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=300", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=300", "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=300", "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=300", "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=300", "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=300"] },
  { id: 6, name: "Aesthetic Project", rating: 5.0, projects: 320, location: "Jakarta Pusat", price: "Rp 2.500.000", tags: ["Cinematic", "Product"], cover: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=900&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?img=47", available: false, verified: true, responseTime: "Dalam 30 menit", portfolio: ["https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=300", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=300", "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=300", "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=300", "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=300", "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=300"] },
  { id: 7, name: "Fajar Visuals", rating: 4.8, projects: 156, location: "Surabaya", price: "Rp 1.100.000", tags: ["Vintage", "Pre-Wedding"], cover: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=900&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?img=33", available: true, verified: true, responseTime: "< 1 jam", portfolio: ["https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=300", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=300", "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=300", "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=300", "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=300", "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=300"] },
  { id: 8, name: "Sinar Pagi", rating: 4.9, projects: 201, location: "Malang", price: "Rp 850.000", tags: ["Documentary", "Outdoor"], cover: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=900&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?img=5", available: true, verified: false, responseTime: "Dalam beberapa jam", portfolio: ["https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=300", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=300", "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=300", "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=300", "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=300", "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=300"] },
  { id: 9, name: "Elang Studio", rating: 4.6, projects: 78, location: "Jakarta Barat", price: "Rp 2.100.000", tags: ["Fashion", "Editorial"], cover: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=900&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?img=12", available: false, verified: true, responseTime: "Dalam 10 menit", portfolio: ["https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=300", "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=300", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=300", "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=300", "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=300", "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=300"] },
  { id: 10, name: "Aura Photos", rating: 5.0, projects: 405, location: "Semarang", price: "Rp 1.300.000", tags: ["Wedding", "Cinematic"], cover: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=900&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?img=11", available: true, verified: true, responseTime: "Super responsif", portfolio: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=300", "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=300", "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=300", "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=300", "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=300", "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=300"] },
  { id: 11, name: "Memori Kita", rating: 4.7, projects: 92, location: "Yogyakarta", price: "Rp 950.000", tags: ["Warm Tone", "Graduation"], cover: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=900&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?img=47", available: true, verified: false, responseTime: "< 1 jam", portfolio: ["https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=300", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=300", "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=300", "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=300", "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=300", "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=300"] },
  { id: 12, name: "Raja Fotografi", rating: 4.8, projects: 133, location: "Bali", price: "Rp 4.000.000", tags: ["Cinematic", "Pre-Wedding"], cover: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=900&auto=format&fit=crop", avatar: "https://i.pravatar.cc/150?img=12", available: true, verified: true, responseTime: "Dalam 10 menit", portfolio: ["https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=300", "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=300", "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=300", "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=300", "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=300", "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=300"] },
];
export default function ExplorePhotographers() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [phIdx, setPhIdx] = useState(0);

  // Vendor state
  const [savedVendors, setSavedVendors] = useState<number[]>([]);
  const [hoveredPreviewId, setHoveredPreviewId] = useState<number | null>(null);

  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleDateClick = () => {
    if (dateInputRef.current && 'showPicker' in HTMLInputElement.prototype) {
      try {
        dateInputRef.current.showPicker();
      } catch (error) {
        dateInputRef.current.focus();
      }
    } else {
      dateInputRef.current?.focus();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPhIdx((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const POPULAR_STYLES = [
    { label: "Graduation"},
    { label: "Korean Style"},
    { label: "Cinematic"},
    { label: "Pre-Wedding"},
    { label: "Warm Tone"},
    { label: "Candid"},
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setUploadedImage(url);
    }
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div className="border-b border-slate-100 pb-6">
        <label className="text-sm font-black text-[#0F172A] mb-4 block">Kategori</label>
        <div className="flex flex-col gap-3">
          {CATEGORIES.map(cat => {
            const isSelected = activeTag === cat;
            return (
              <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5 rounded border border-slate-300 group-hover:border-[#2563EB] transition-colors bg-white">
                  <Check className="w-3 h-3 text-white opacity-0 group-hover:opacity-20 transition-opacity" />
                </div>
                <span className="text-sm text-slate-600 group-hover:text-[#0F172A] transition-colors">{cat}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Style Tags */}
      <div className="border-b border-slate-100 pb-6">
        <label className="text-sm font-black text-[#0F172A] mb-4 block">Style Visual</label>
        <div className="flex flex-wrap gap-2">
          {STYLE_TAGS.map(tag => (
            <button 
              key={tag}
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                activeTag === tag 
                  ? "bg-[#2563EB] text-white border-[#2563EB] shadow-sm" 
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:border-[#2563EB] hover:text-[#2563EB]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="border-b border-slate-100 pb-6">
        <label className="text-sm font-black text-[#0F172A] mb-4 block">Range Harga</label>
        <div className="flex items-center gap-2">
          <div className="relative w-full">
             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">Rp</span>
             <input type="text" placeholder="Min" className="w-full pl-8 pr-3 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 transition-all text-[#0F172A]" />
          </div>
          <span className="text-slate-400">-</span>
          <div className="relative w-full">
             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-bold">Rp</span>
             <input type="text" placeholder="Max" className="w-full pl-8 pr-3 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 transition-all text-[#0F172A]" />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="border-b border-slate-100 pb-6">
        <label className="text-sm font-black text-[#0F172A] mb-4 block">Lokasi</label>
        <div className="relative">
          <select className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 appearance-none text-[#0F172A] cursor-pointer transition-all">
            <option value="">Semua Kota</option>
            {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>
          <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Availability */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer group p-4 bg-slate-50 hover:bg-blue-50/50 rounded-2xl border border-slate-200 hover:border-blue-200 transition-all">
          <div className="relative flex items-center justify-center w-5 h-5 rounded border border-slate-300 group-hover:border-[#2563EB] transition-colors bg-white">
             <Check className="w-3 h-3 text-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </div>
          <span className="text-sm font-bold text-[#0F172A]">Tersedia Minggu Ini</span>
        </label>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <div className="h-16" /> {/* Spacer for Absolute Navbar */}

      {/* Sticky-like Search Header */}
      <section className="sticky top-0 z-50 pt-5 pb-5 bg-background shadow-sm">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          
          {/* Search Container */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative w-full"
          >
             <div className="bg-white rounded-2xl md:rounded-[2rem] p-2 shadow-xl border border-slate-200 flex flex-col md:flex-row items-center gap-2 transition-all focus-within:border-[#2563EB] focus-within:ring-4 focus-within:ring-blue-500/10">
                
                {/* Search Input */}
                <div className="flex-1 flex items-center gap-3 px-4 w-full h-14 md:border-r border-slate-100">
                   <Search className="w-5 h-5 text-slate-400 shrink-0" />
                   <div className="relative flex-1 h-full flex items-center overflow-hidden">
                     <AnimatePresence mode="wait">
                       {!searchQuery && (
                         <motion.p
                           key={phIdx}
                           initial={{ y: 15, opacity: 0 }}
                           animate={{ y: 0, opacity: 1 }}
                           exit={{ y: -15, opacity: 0 }}
                           transition={{ duration: 0.2 }}
                           className="absolute inset-y-0 left-0 flex items-center text-slate-400 font-medium text-sm md:text-base pointer-events-none truncate right-0"
                         >
                           {placeholders[phIdx]}
                         </motion.p>
                       )}
                     </AnimatePresence>
                     <input 
                       type="text" 
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                       className="w-full h-full bg-transparent outline-none text-[#0F172A] font-bold z-10 text-sm md:text-base" 
                     />
                   </div>
                </div>

                {/* Date Picker */}
                <div 
                   onClick={handleDateClick}
                   className="flex-1 md:flex-none flex items-center gap-3 px-4 w-full md:w-48 xl:w-56 h-14 md:border-r border-slate-100 relative cursor-pointer group"
                >
                   <Calendar className="w-5 h-5 text-slate-400 shrink-0 pointer-events-none group-hover:text-[#2563EB] transition-colors" />
                   <div className="relative flex-1 h-full flex items-center">
                     <span className={`font-bold text-sm pointer-events-none ${selectedDate ? 'text-[#0F172A]' : 'text-slate-400 font-medium group-hover:text-[#0F172A] transition-colors'}`}>
                       {selectedDate ? new Date(selectedDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : "Pilih Tanggal"}
                     </span>
                     <input 
                       ref={dateInputRef}
                       type="date" 
                       value={selectedDate}
                       onChange={(e) => setSelectedDate(e.target.value)}
                       className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
                     />
                   </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 w-full md:w-auto px-2 pb-2 md:p-0">
                  <div className="relative">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      title="Upload referensi foto"
                    />
                    <button 
                      type="button"
                      className={`w-12 h-12 md:h-14 border flex items-center justify-center rounded-xl md:rounded-full transition-all shrink-0 relative overflow-hidden ${
                         uploadedImage 
                         ? "border-[#2563EB] bg-[#2563EB]/10 text-[#2563EB]" 
                         : "bg-slate-50 hover:bg-slate-100 border-slate-100 text-slate-500 hover:text-[#2563EB]"
                      }`}
                    >
                      {uploadedImage ? (
                        <>
                          <img src={uploadedImage} alt="Uploaded" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                          <CheckCircle2 className="w-5 h-5 relative z-10 text-[#2563EB]" />
                        </>
                      ) : (
                        <ImagePlus className="w-5 h-5" />
                      )}
                    </button>
                    {uploadedImage && (
                      <button 
                         onClick={(e) => { e.preventDefault(); setUploadedImage(null); }}
                         className="absolute -top-2 -right-2 p-1 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-red-500 z-20 shadow-sm"
                      >
                         <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  <button className="flex-1 md:w-auto px-8 h-12 md:h-14 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-black text-sm rounded-xl md:rounded-[1.5rem] transition-all shrink-0">
                    Cari Vendor
                  </button>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Main Layout */}
      <section className="flex-1 max-w-7xl mx-auto px-5 sm:px-8 py-8 w-full flex gap-8 relative">
        
        {/* Desktop Sidebar Filter */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-36 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
             <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <h2 className="font-extrabold flex items-center gap-2 text-[#0F172A]"><SlidersHorizontal className="w-4 h-4"/> Filter</h2>
                <button className="text-xs font-bold text-slate-400 hover:text-[#2563EB] transition-colors">Reset</button>
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
             {MOCK_PHOTOGRAPHERS.map((photographer, idx) => {
                const isSaved = savedVendors.includes(photographer.id);
                const isPreviewHovered = hoveredPreviewId === photographer.id;

                return (
                <motion.div 
                  key={photographer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden group shadow-sm hover:shadow-2xl hover:border-slate-300 transition-all duration-300 flex flex-col relative"
                >
                  {/* Availability Badge (Top Left) */}
                  {selectedDate && (
                     <div className={`absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full text-[10px] font-extrabold flex items-center gap-1.5 shadow-sm backdrop-blur-md ${
                        photographer.available ? "bg-white/95 text-teal-600" : "bg-white/95 text-red-500"
                     }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${photographer.available ? "bg-teal-500" : "bg-red-500"} ${photographer.available ? "animate-pulse" : ""}`}></div>
                        {photographer.available ? "Tersedia di tanggal terpilih" : "Penuh di tanggal terpilih"}
                     </div>
                  )}

                  {/* AI Match Confidence */}
                  {uploadedImage && (
                     <div className={`absolute ${selectedDate ? 'top-12' : 'top-4'} left-4 z-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1.5 rounded-full text-[10px] font-extrabold flex items-center gap-1.5 shadow-sm backdrop-blur-md`}>
                        <Sparkles className="w-3 h-3 text-yellow-300" /> 92% Match
                     </div>
                  )}

                  {/* Save/Wishlist Button (Top Right) */}
                  <button 
                     onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSavedVendors(prev => 
                           prev.includes(photographer.id) 
                           ? prev.filter(id => id !== photographer.id) 
                           : [...prev, photographer.id]
                        );
                     }}
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
