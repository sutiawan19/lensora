"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, Camera, CheckCircle2, Star, MapPin, 
  Clock, Image as ImageIcon, Zap, ShieldCheck, Plus, Package, Gift, X
} from "lucide-react";

// --- Mock Data for Packages ---
const MOCK_PACKAGES = [
  {
    id: "pkg-adrianus-dewa-0",
    photographerName: "Adrianus Dewa",
    photographerAvatar: "https://i.pravatar.cc/150?img=11",
    packageName: "Essential Story",
    packagePrice: "Rp 1.500.000",
    dpAmount: "30%",
    duration: "4 Jam Sesi",
    editedPhotos: 50,
    revisions: 1,
    delivery: "3 Hari Kerja",
    locations: 1,
    outfit: 2,
    styleTags: ["Cinematic", "Wedding"],
    bonuses: ["Free retouch", "Cloud gallery"],
    availableDate: "Bisa Kapan Saja",
    limitedSlot: false,
    rating: 4.9,
    projects: 124,
    reviews: 80,
  },
  {
    id: "pkg-bella-co-1",
    photographerName: "Bella & Co",
    photographerAvatar: "https://i.pravatar.cc/150?img=5",
    packageName: "Premium Cinematic",
    packagePrice: "Rp 4.500.000",
    dpAmount: "50%",
    duration: "Full Day (8 Jam)",
    editedPhotos: 120,
    revisions: 3,
    delivery: "14 Hari Kerja",
    locations: 3,
    outfit: 5,
    styleTags: ["Warm Tone", "Pre-Wedding", "Cinematic"],
    bonuses: ["Free retouch", "Cinematic video", "Cloud gallery", "Free print"],
    availableDate: "Sisa 2 Slot Bulan Ini",
    limitedSlot: true,
    rating: 5.0,
    projects: 89,
    reviews: 89,
  },
  {
    id: "pkg-luminare-0",
    photographerName: "Luminare Studio",
    photographerAvatar: "https://i.pravatar.cc/150?img=9",
    packageName: "Korean Look Basic",
    packagePrice: "Rp 2.000.000",
    dpAmount: "40%",
    duration: "5 Jam Sesi",
    editedPhotos: 40,
    revisions: 2,
    delivery: "7 Hari Kerja",
    locations: 2,
    outfit: 3,
    styleTags: ["Korean", "Fashion"],
    bonuses: ["Free retouch", "Cloud gallery"],
    availableDate: "Bisa Kapan Saja",
    limitedSlot: false,
    rating: 4.9,
    projects: 56,
    reviews: 40,
  }
];

function CompareContent() {
  const searchParams = useSearchParams();
  const packagesParam = searchParams.get("packages");
  
  const selectedIds = packagesParam ? packagesParam.split(",") : [];
  
  // Create mock selected packages by trying to match IDs, or just map them directly to MOCK_PACKAGES if ID doesn't strictly match since it's a frontend mockup
  // If the ID matches a mock package exactly, we use it. Otherwise, we just randomly assign one of the mock packages for demo purposes.
  const selectedPackages = selectedIds.map((id, index) => {
    const matched = MOCK_PACKAGES.find(p => p.id === id);
    if (matched) return matched;
    // For demo: if id comes from the photographer detail page (e.g. "pkg-adrianus-dewa-0"), we try to find it. 
    // If not found, just return a mock so the page doesn't look broken.
    return MOCK_PACKAGES[index % MOCK_PACKAGES.length];
  });

  // --- EMPTY STATE ---
  if (selectedIds.length === 0 || !selectedIds[0]) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-surface-2 rounded-full flex items-center justify-center mb-6">
           <Package className="w-10 h-10 text-text-muted" />
        </div>
        <h1 className="text-3xl font-extrabold text-foreground mb-3">Belum Ada Paket Untuk Dibandingkan</h1>
        <p className="text-text-muted max-w-md mb-8">Tambahkan paket dari halaman profil fotografer untuk melihat perbedaan harga, fasilitas, dan detail paket secara mendetail.</p>
        <Link href="/explore" className="px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary-hover transition-colors shadow-lg">
           Cari Fotografer
        </Link>
      </main>
    );
  }

  // --- SMART RECOMMENDATION ---
  // Just pick the most expensive or highest rated package for demo
  const recommended = selectedPackages.reduce((prev, current) => (prev.rating > current.rating) ? prev : current);

  return (
    <main className="min-h-screen bg-surface-2 pb-24">
      {/* Navbar Minimalist */}
      <nav className="bg-white border-b border-border h-16 flex items-center px-4 sm:px-6 lg:px-8 sticky top-0 z-40">
        <button onClick={() => window.history.back()} className="flex items-center gap-2 text-sm font-bold text-text-muted hover:text-foreground transition-colors mr-auto">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>
        <div className="font-extrabold tracking-tight text-foreground flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
           <div className="w-6 h-6 rounded-md bg-primary text-white flex items-center justify-center">
             <Camera className="w-3 h-3" />
           </div>
           Lensora.
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         <div className="mb-10 text-center">
            <h1 className="text-3xl font-extrabold text-foreground mb-2">Perbandingan Paket</h1>
            <p className="text-text-muted">Bandingkan detail dan fasilitas paket untuk memilih yang paling tepat.</p>
         </div>

         {/* Smart Recommendation Card */}
         <div className="bg-white rounded-3xl border border-primary/20 shadow-sm p-6 mb-12 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
            <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center shrink-0">
               <span className="text-2xl">✨</span>
            </div>
            <div className="flex-1">
               <h2 className="text-sm font-extrabold text-primary mb-1 uppercase tracking-wider">Recommended Package</h2>
               <p className="text-lg font-bold text-foreground mb-3">Paket "{recommended.packageName}" dari {recommended.photographerName} sangat direkomendasikan.</p>
               <div className="flex flex-wrap gap-4 text-sm font-medium text-text-muted">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-teal" /> Sesuai dengan spesifikasi gaya Anda</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-teal" /> Reputasi vendor luar biasa</span>
                  {recommended.bonuses.length > 2 && <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-teal" /> Banyak bonus tambahan</span>}
               </div>
            </div>
         </div>

         {/* COMPARISON LAYOUT (Mobile: Swipeable, Desktop: Grid) */}
         <div className="overflow-x-auto hide-scrollbar pb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex md:grid" style={{ gridTemplateColumns: `repeat(${selectedPackages.length}, minmax(0, 1fr))` }}>
               
               {selectedPackages.map((pkg, index) => (
                  <div key={`${pkg.id}-${index}`} className="w-[85vw] md:w-auto shrink-0 px-2 md:px-3 flex flex-col snap-center">
                     
                     {/* 1. Header Card (Package Info) */}
                     <div className="bg-white rounded-[2rem] border border-border p-5 shadow-sm mb-4 relative flex flex-col items-center">
                        <div className="flex flex-col items-center mb-4 mt-2">
                           <img src={pkg.photographerAvatar} className="w-16 h-16 rounded-full object-cover border-4 border-surface-2 mb-2" />
                           <h3 className="text-xs font-bold text-text-muted uppercase tracking-wide">{pkg.photographerName}</h3>
                        </div>
                        <h2 className="font-extrabold text-2xl text-foreground text-center leading-tight mb-6">{pkg.packageName}</h2>
                        
                        <div className="w-full flex gap-2">
                           <Link href={`/book/${pkg.photographerName}?pkg=${pkg.packageName}`} className="flex-[3] py-3.5 bg-primary hover:bg-primary-hover text-white text-sm font-extrabold rounded-xl text-center shadow-sm transition-colors">
                              Pesan Paket Ini
                           </Link>
                           <button className="flex-1 py-3.5 bg-surface-2 hover:bg-red-50 text-text-muted hover:text-red-500 hover:border-red-200 border border-border rounded-xl flex items-center justify-center transition-colors">
                              <X className="w-5 h-5" />
                           </button>
                        </div>
                     </div>

                     {/* COMPARISON ROWS */}
                     <div className="space-y-3">
                        
                        {/* 2. Harga */}
                        <div className="bg-white rounded-2xl border border-border p-5">
                           <p className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> Harga & Pembayaran</p>
                           <p className="text-2xl font-extrabold text-foreground mb-4">{pkg.packagePrice}</p>
                           <div className="flex justify-between items-center py-2 border-t border-border/50 text-sm font-semibold">
                              <span className="text-text-muted">Down Payment (DP)</span>
                              <span className="text-foreground font-extrabold bg-surface-2 px-2 py-0.5 rounded">{pkg.dpAmount}</span>
                           </div>
                        </div>

                        {/* 3. Detail Paket */}
                        <div className="bg-white rounded-2xl border border-border p-5">
                           <p className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider mb-4 flex items-center gap-1.5"><Package className="w-3.5 h-3.5" /> Spesifikasi Paket</p>
                           <div className="space-y-3">
                              <div className="flex justify-between text-sm font-medium">
                                 <span className="text-text-muted">Durasi Sesi</span>
                                 <span className="text-foreground font-bold">{pkg.duration}</span>
                              </div>
                              <div className="flex justify-between text-sm font-medium">
                                 <span className="text-text-muted">Foto Diedit</span>
                                 <span className="text-foreground font-bold">{pkg.editedPhotos} foto</span>
                              </div>
                              <div className="flex justify-between text-sm font-medium">
                                 <span className="text-text-muted">Batas Revisi</span>
                                 <span className="text-foreground font-bold">{pkg.revisions}x</span>
                              </div>
                              <div className="flex justify-between text-sm font-medium pt-3 border-t border-border/50">
                                 <span className="text-text-muted">Estimasi Selesai</span>
                                 <span className="text-foreground font-bold">{pkg.delivery}</span>
                              </div>
                              <div className="flex justify-between text-sm font-medium">
                                 <span className="text-text-muted">Jumlah Lokasi</span>
                                 <span className="text-foreground font-bold">{pkg.locations} Lokasi</span>
                              </div>
                              <div className="flex justify-between text-sm font-medium">
                                 <span className="text-text-muted">Ganti Baju (Outfit)</span>
                                 <span className="text-foreground font-bold">{pkg.outfit}x Ganti</span>
                              </div>
                           </div>
                        </div>

                        {/* 4. Style Photography */}
                        <div className="bg-white rounded-2xl border border-border p-5">
                           <p className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5"><ImageIcon className="w-3.5 h-3.5" /> Style Visual</p>
                           <div className="flex flex-wrap gap-2">
                              {pkg.styleTags.map(tag => (
                                 <span key={tag} className="px-3 py-1 bg-surface-2 border border-border rounded-lg text-xs font-bold text-foreground">
                                    {tag}
                                 </span>
                              ))}
                           </div>
                        </div>

                        {/* 5. Bonus Included */}
                        <div className="bg-white rounded-2xl border border-border p-5">
                           <p className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5"><Gift className="w-3.5 h-3.5" /> Bonus & Ekstra</p>
                           <div className="space-y-2">
                              {["Free retouch", "Cinematic video", "Cloud gallery", "Free print"].map(bonusName => {
                                 const hasBonus = pkg.bonuses.find(b => b.toLowerCase() === bonusName.toLowerCase());
                                 return (
                                    <div key={bonusName} className={`flex items-center gap-2 text-sm font-medium ${hasBonus ? "text-foreground" : "text-text-muted/40"}`}>
                                       {hasBonus ? <CheckCircle2 className="w-4 h-4 text-teal" /> : <X className="w-4 h-4" />}
                                       {bonusName}
                                    </div>
                                 );
                              })}
                           </div>
                        </div>

                        {/* 6. Availability */}
                        <div className="bg-white rounded-2xl border border-border p-5">
                           <p className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Ketersediaan</p>
                           <div className={`flex items-center gap-2 text-sm font-bold px-3 py-2 rounded-xl ${pkg.limitedSlot ? "bg-amber/10 text-amber" : "bg-teal/10 text-teal"}`}>
                              {pkg.limitedSlot ? <Clock className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                              {pkg.availableDate}
                           </div>
                        </div>

                        {/* 7. Vendor Reputation */}
                        <div className="bg-white rounded-2xl border border-border p-5">
                           <p className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5"><Star className="w-3.5 h-3.5" /> Reputasi Vendor</p>
                           <div className="flex items-center gap-2 mb-2">
                              <Star className="w-5 h-5 text-amber fill-amber" />
                              <span className="text-xl font-extrabold text-foreground">{pkg.rating}</span>
                           </div>
                           <div className="flex gap-4 text-xs font-semibold text-text-muted mt-2">
                              <span>{pkg.projects} Selesai</span>
                              <span>•</span>
                              <span>{pkg.reviews} Ulasan</span>
                           </div>
                        </div>

                     </div>
                  </div>
               ))}
               
            </div>
         </div>
      </div>
    </main>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-primary font-bold">Loading Comparison...</div>}>
      <CompareContent />
    </Suspense>
  );
}
