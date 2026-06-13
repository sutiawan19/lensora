"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, Search, Bell, Settings, LogOut, Calendar, MessageSquare, 
  MapPin, Clock, Download, X, Star, CheckCircle2, ChevronRight
} from "lucide-react";
import Link from "next/link";


// --- Mock Data ---
type SessionStatus = "Upcoming" | "Ongoing" | "Completed" | "Cancelled";

const SESSIONS = [
  {
    id: "LSR-123901",
    photographer: "Adrianus Dewa",
    avatar: "https://i.pravatar.cc/150?img=11",
    rating: 4.9,
    style: "Cinematic",
    package: "Cinematic Journey",
    date: "15 Juni 2026",
    time: "10:00 AM",
    duration: "8 Jam (Full Day)",
    location: "Taman Literasi, Blok M, Jakarta Selatan",
    status: "Upcoming" as SessionStatus,
    subStatus: "Confirmed", // Waiting Confirmation, Confirmed, Ongoing, Editing Process, Completed
    progressStep: 1, // 0: booked, 1: confirmed, 2: photoshoot, 3: editing, 4: delivered
    notes: "I want cinematic graduation vibes. Fokus ke candid dan pencahayaan natural ya...",
    referenceImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=300&auto=format&fit=crop",
    gallery: []
  },
  {
    id: "LSR-112002",
    photographer: "Bella & Co",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 5.0,
    style: "Warm Tone",
    package: "Essential Story",
    date: "10 Mei 2026",
    time: "09:00 AM",
    duration: "4 Jam Sesi",
    location: "Pantai Indah Kapuk, Jakarta Utara",
    status: "Completed" as SessionStatus,
    subStatus: "Completed",
    progressStep: 4,
    notes: "Pre-wedding casual theme.",
    referenceImage: null,
    gallery: [
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=400&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&auto=format&fit=crop"
    ]
  }
];

const TABS: SessionStatus[] = ["Upcoming", "Ongoing", "Completed", "Cancelled"];

export default function MySessions() {
  const [activeTab, setActiveTab] = useState<SessionStatus>("Upcoming");
  const [selectedSession, setSelectedSession] = useState<typeof SESSIONS[0] | null>(null);

  const filteredSessions = SESSIONS.filter(s => s.status === activeTab);

  const getStatusBadge = (subStatus: string) => {
    switch(subStatus) {
      case "Waiting Confirmation": return <span className="bg-amber/10 text-amber px-3 py-1 rounded-full text-xs font-bold">Menunggu Konfirmasi</span>;
      case "Confirmed": return <span className="bg-teal/10 text-teal px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Terkonfirmasi</span>;
      case "Ongoing": return <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">Sedang Berjalan</span>;
      case "Editing Process": return <span className="bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"><Clock className="w-3 h-3"/> Proses Editing</span>;
      case "Completed": return <span className="bg-surface-2 text-text-muted px-3 py-1 rounded-full text-xs font-bold">Selesai</span>;
      default: return null;
    }
  };

  return (
    <main className="min-h-screen bg-surface-2 flex flex-col md:flex-row">
      {/* Sidebar (Copied from Dashboard Layout) */}
      <aside className="w-full md:w-64 bg-white border-r border-border flex flex-col h-screen md:sticky md:top-0 shrink-0 hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2 text-foreground font-extrabold tracking-tight text-xl">
             <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">
               <Camera className="w-4 h-4" />
             </div>
             Lensora<span className="text-primary">.</span>
          </Link>
        </div>
        
        <div className="p-4 flex-1">
          <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4 px-3">Menu Utama</p>
          <nav className="space-y-1">
             <Link href="/explore" className="flex items-center gap-3 px-3 py-2 text-text-muted hover:bg-surface-2 hover:text-foreground font-semibold rounded-xl transition-colors">
               <Search className="w-5 h-5" /> Cari Fotografer
             </Link>
             <Link href="/dashboard/sessions" className="flex items-center gap-3 px-3 py-2 bg-primary-light text-primary font-bold rounded-xl transition-colors">
               <Calendar className="w-5 h-5" /> Sesi Pemotretan
             </Link>
             <Link href="/dashboard/messages" className="flex items-center gap-3 px-3 py-2 text-text-muted hover:bg-surface-2 hover:text-foreground font-semibold rounded-xl transition-colors">
               <MessageSquare className="w-5 h-5" /> Pesan <span className="ml-auto bg-accent text-white text-[10px] px-2 py-0.5 rounded-full font-bold">2</span>
             </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-border">
          <a href="#" className="flex items-center gap-3 px-3 py-2 text-text-muted hover:bg-surface-2 hover:text-foreground font-semibold rounded-xl transition-colors">
            <Settings className="w-5 h-5" /> Pengaturan
          </a>
          <Link href="/" className="flex items-center gap-3 px-3 py-2 text-text-muted hover:bg-red-50 hover:text-red-500 font-semibold rounded-xl transition-colors">
            <LogOut className="w-5 h-5" /> Keluar
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="md:hidden h-16 bg-white border-b border-border flex items-center justify-between px-4 sticky top-0 z-40">
          <Link href="/" className="flex items-center gap-2 text-foreground font-extrabold tracking-tight">
             <div className="w-7 h-7 rounded-md bg-primary text-white flex items-center justify-center"><Camera className="w-3.5 h-3.5" /></div>
             Lensora.
          </Link>
          <button className="p-2 text-text-muted"><Bell className="w-5 h-5"/></button>
        </header>

        {/* Dashboard Topbar (Desktop) */}
        <header className="hidden md:flex h-16 bg-white border-b border-border items-center justify-end px-8 sticky top-0 z-30">
           <div className="flex items-center gap-4">
              <button className="relative p-2 text-text-muted hover:bg-surface-2 rounded-full transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-accent rounded-full border-2 border-white"></span>
              </button>
              <div className="w-px h-6 bg-border"></div>
              <div className="flex items-center gap-3">
                 <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-foreground">Budi Santoso</p>
                    <p className="text-xs text-text-muted">Klien</p>
                 </div>
                 <img src="https://i.pravatar.cc/100?img=11" alt="Profile" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
              </div>
           </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 md:p-8 max-w-5xl pb-24 md:pb-8">
           <div className="mb-6 md:mb-8 text-center sm:text-left">
             <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-1">Sesi Pemotretan</h1>
             <p className="text-text-muted">Kelola jadwal, pantau status, dan unduh hasil foto Anda di sini.</p>
           </div>

           {/* Tabs */}
           <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 bg-white p-2 rounded-2xl border border-border inline-flex">
              {TABS.map(tab => (
                 <button 
                   key={tab} 
                   onClick={() => setActiveTab(tab)}
                   className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                     activeTab === tab ? "bg-primary text-white shadow-sm" : "text-text-muted hover:text-foreground hover:bg-surface-2"
                   }`}
                 >
                    {tab}
                 </button>
              ))}
           </div>

           {/* Session Cards */}
           <div className="space-y-6">
              {filteredSessions.length === 0 ? (
                 <div className="bg-white border border-border border-dashed rounded-3xl p-12 text-center">
                    <div className="w-16 h-16 bg-surface-2 rounded-full flex items-center justify-center mx-auto mb-4"><Camera className="w-8 h-8 text-text-muted/50" /></div>
                    <p className="font-bold text-foreground mb-1">Belum ada sesi di kategori ini.</p>
                    <p className="text-sm text-text-muted">Cari fotografer dan mulai pesan sesi pertamamu.</p>
                 </div>
              ) : (
                 filteredSessions.map(session => (
                    <div key={session.id} className="bg-white border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                       {/* Header Card */}
                       <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                             <img src={session.avatar} alt="Avatar" className="w-14 h-14 rounded-full object-cover border-2 border-surface-2" />
                             <div>
                                <div className="flex items-center gap-2 mb-1">
                                   <h3 className="font-extrabold text-foreground">{session.photographer}</h3>
                                   <div className="flex items-center gap-1 bg-amber/10 px-1.5 py-0.5 rounded text-[10px] font-bold text-amber"><Star className="w-3 h-3 fill-amber"/> {session.rating}</div>
                                </div>
                                <div className="flex gap-2">
                                   <span className="text-xs font-bold text-text-muted bg-surface-2 px-2 py-1 rounded-md">{session.style} Style</span>
                                </div>
                             </div>
                          </div>
                          <div>{getStatusBadge(session.subStatus)}</div>
                       </div>

                       {/* Content Card */}
                       <div className="p-5 md:p-6 flex flex-col lg:flex-row gap-6 md:gap-8">
                          <div className="flex-1 space-y-4">
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                   <p className="text-[10px] sm:text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Tanggal & Waktu</p>
                                   <p className="font-semibold text-foreground text-sm flex items-center gap-1.5"><Calendar className="w-4 h-4 text-primary shrink-0" /> {session.date}</p>
                                   <p className="font-semibold text-text-muted text-sm ml-5.5 mt-0.5">{session.time} ({session.duration})</p>
                                </div>
                                <div>
                                   <p className="text-[10px] sm:text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Paket</p>
                                   <p className="font-semibold text-foreground text-sm">{session.package}</p>
                                </div>
                             </div>
                             <div>
                                <p className="text-[10px] sm:text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Lokasi</p>
                                <p className="font-semibold text-foreground text-sm flex items-start gap-1.5"><MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {session.location}</p>
                             </div>
                          </div>

                          {/* Progress Tracker (Horizontal) */}
                          <div className="flex-1 border-t lg:border-t-0 lg:border-l border-border pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-center">
                             <p className="text-[10px] sm:text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Status Progres</p>
                             <div className="flex items-center justify-between relative">
                                {/* Line background */}
                                <div className="absolute top-1/2 left-0 w-full h-1 bg-surface-2 -translate-y-1/2 rounded-full z-0"></div>
                                {/* Line fill */}
                                <div className="absolute top-1/2 left-0 h-1 bg-teal -translate-y-1/2 rounded-full z-0 transition-all" style={{ width: `${(session.progressStep / 4) * 100}%` }}></div>
                                
                                {/* Steps */}
                                {[0,1,2,3,4].map(stepIndex => (
                                   <div key={stepIndex} className={`w-5 h-5 rounded-full z-10 flex items-center justify-center border-2 transition-colors ${
                                      session.progressStep >= stepIndex ? "bg-teal border-teal" : "bg-white border-border"
                                   }`}>
                                      {session.progressStep >= stepIndex && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                   </div>
                                ))}
                             </div>
                             <div className="flex justify-between mt-2 text-[10px] font-bold text-text-muted">
                                <span>Booked</span>
                                <span className={session.progressStep >= 2 ? "text-teal" : ""}>Sesi Foto</span>
                                <span className={session.progressStep >= 4 ? "text-teal" : ""}>Selesai</span>
                             </div>
                          </div>
                       </div>

                       {/* Footer Actions */}
                       <div className="p-4 bg-surface-2 border-t border-border flex flex-col md:flex-row gap-3 justify-end items-center">
                          <p className="text-[10px] sm:text-xs font-bold text-text-muted md:mr-auto mb-2 md:mb-0">ID Pesanan: {session.id}</p>
                          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                             <Link href="/dashboard/messages" className="w-full sm:w-auto px-6 py-2.5 bg-white border border-border hover:bg-surface-2 text-foreground text-sm font-bold rounded-xl transition-colors text-center block">
                                Chat Fotografer
                             </Link>
                             <button 
                               onClick={() => setSelectedSession(session)}
                               className="w-full sm:w-auto px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-xl transition-colors shadow-sm"
                             >
                                Lihat Detail
                             </button>
                          </div>
                       </div>
                    </div>
                 ))
              )}
           </div>
        </main>
      </div>

      {/* Detail Modal / Lightbox */}
      <AnimatePresence>
         {selectedSession && (
            <>
               <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 onClick={() => setSelectedSession(null)}
                 className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
               />
               <motion.div 
                 initial={{ opacity: 0, y: 50, scale: 0.95 }} 
                 animate={{ opacity: 1, y: 0, scale: 1 }} 
                 exit={{ opacity: 0, y: 20, scale: 0.95 }}
                 className="fixed inset-0 sm:inset-x-4 sm:top-[5vh] sm:bottom-[5vh] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[800px] bg-white z-50 sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden"
               >
                  {/* Modal Header */}
                  <div className="px-5 py-4 border-b border-border flex items-center justify-between shrink-0 bg-surface">
                     <h2 className="font-extrabold text-base sm:text-lg">Detail Sesi: {selectedSession.id}</h2>
                     <button onClick={() => setSelectedSession(null)} className="p-2 bg-surface-2 rounded-full hover:bg-border text-text-muted transition-colors">
                        <X className="w-5 h-5" />
                     </button>
                  </div>

                  {/* Modal Body */}
                  <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-8">
                     
                     {/* Top Section */}
                     <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                        {/* Info Block */}
                        <div className="flex-1 space-y-6">
                           <div>
                              <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Informasi Fotografer</p>
                              <div className="flex items-center gap-3">
                                 <img src={selectedSession.avatar} className="w-12 h-12 rounded-full object-cover" />
                                 <div>
                                    <p className="font-bold">{selectedSession.photographer}</p>
                                    <p className="text-xs text-text-muted">{selectedSession.package}</p>
                                 </div>
                              </div>
                           </div>
                           
                           <div className="bg-surface-2 p-4 rounded-2xl border border-border space-y-3">
                              <div className="flex items-start gap-3">
                                 <Calendar className="w-4 h-4 text-text-muted shrink-0 mt-0.5" />
                                 <div><p className="text-sm font-bold">{selectedSession.date}</p><p className="text-xs text-text-muted">{selectedSession.time}</p></div>
                              </div>
                              <div className="flex items-start gap-3">
                                 <MapPin className="w-4 h-4 text-text-muted shrink-0 mt-0.5" />
                                 <p className="text-sm font-bold leading-tight">{selectedSession.location}</p>
                              </div>
                           </div>

                           <div>
                              <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Catatan Khusus</p>
                              <p className="text-sm bg-surface p-4 rounded-xl border border-border text-foreground italic">"{selectedSession.notes}"</p>
                           </div>
                        </div>

                        {/* Vertical Timeline */}
                        <div className="w-full md:w-64 bg-surface-2 p-6 rounded-3xl border border-border shrink-0">
                           <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-6">Riwayat Progres</p>
                           <div className="space-y-6 relative before:absolute before:inset-y-2 before:left-[11px] before:w-0.5 before:bg-border">
                              
                              {[
                                { step: 0, title: "Booking Dibuat" },
                                { step: 1, title: "Pembayaran DP Diterima" },
                                { step: 2, title: "Sesi Pemotretan" },
                                { step: 3, title: "Proses Editing Visual" },
                                { step: 4, title: "Hasil Akhir Dikirim" }
                              ].map((item, idx) => (
                                 <div key={idx} className="relative flex items-start gap-4 z-10">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-4 border-surface-2 ${
                                       selectedSession.progressStep >= item.step ? "bg-teal" : "bg-border"
                                    }`}>
                                       {selectedSession.progressStep >= item.step && <CheckCircle2 className="w-3 h-3 text-white" />}
                                    </div>
                                    <div>
                                       <p className={`text-sm font-bold ${selectedSession.progressStep >= item.step ? "text-foreground" : "text-text-muted"}`}>{item.title}</p>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>

                     {/* Gallery Preview Section (Only if step >= 3) */}
                     {selectedSession.progressStep >= 3 && (
                        <div className="border-t border-border pt-8">
                           <div className="flex items-center justify-between mb-4">
                              <h3 className="font-extrabold text-lg">Hasil Foto (Preview)</h3>
                              {selectedSession.progressStep === 4 && (
                                 <button className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg flex items-center gap-2 transition-colors">
                                    <Download className="w-4 h-4" /> Unduh Semua (Hi-Res)
                                 </button>
                              )}
                           </div>
                           
                           {selectedSession.gallery.length > 0 ? (
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                 {selectedSession.gallery.map((img, idx) => (
                                    <div key={idx} className="aspect-square rounded-xl overflow-hidden border border-border">
                                       <img src={img} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                                    </div>
                                 ))}
                              </div>
                           ) : (
                              <div className="bg-surface-2 border border-border border-dashed rounded-2xl p-8 text-center">
                                 <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2 opacity-50" />
                                 <p className="font-bold text-foreground">Fotografer sedang memilah dan mengedit foto.</p>
                                 <p className="text-sm text-text-muted">Hasil akan segera diunggah ke sini.</p>
                              </div>
                           )}
                        </div>
                     )}

                  </div>

                  {/* Modal Footer */}
                  <div className="px-5 py-4 border-t border-border shrink-0 flex flex-col-reverse sm:flex-row justify-end gap-3 bg-surface">
                     <button onClick={() => setSelectedSession(null)} className="w-full sm:w-auto px-6 py-2.5 bg-white border border-border hover:bg-surface-2 font-bold rounded-xl text-sm transition-colors">Tutup</button>
                     {selectedSession.status === "Completed" && (
                        <button className="w-full sm:w-auto px-6 py-2.5 bg-foreground text-white font-bold rounded-xl text-sm hover:bg-foreground/90 transition-colors">
                           Beri Ulasan
                        </button>
                     )}
                  </div>
               </motion.div>
            </>
         )}
      </AnimatePresence>

    </main>
  );
}
