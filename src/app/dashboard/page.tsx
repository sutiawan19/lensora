"use client";

import { Camera, Search, Bell, Settings, LogOut, Calendar, MessageSquare, Plus } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-surface-2 flex flex-col md:flex-row">
      {/* Sidebar */}
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
             <Link href="/explore" className="flex items-center gap-3 px-3 py-2 bg-primary-light text-primary font-bold rounded-xl">
               <Search className="w-5 h-5" /> Cari Fotografer
             </Link>
             <Link href="/dashboard/sessions" className="flex items-center gap-3 px-3 py-2 text-text-muted hover:bg-surface-2 hover:text-foreground font-semibold rounded-xl transition-colors">
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
        <header className="md:hidden h-16 bg-white border-b border-border flex items-center justify-between px-4 sticky top-0 z-50">
          <Link href="/" className="flex items-center gap-2 text-foreground font-extrabold tracking-tight">
             <div className="w-7 h-7 rounded-md bg-primary text-white flex items-center justify-center">
               <Camera className="w-3.5 h-3.5" />
             </div>
             Lensora.
          </Link>
          <div className="flex gap-2">
            <button className="p-2 text-text-muted"><Bell className="w-5 h-5"/></button>
          </div>
        </header>

        {/* Dashboard Topbar (Desktop) */}
        <header className="hidden md:flex h-16 bg-white border-b border-border items-center justify-between px-8 sticky top-0 z-40">
           <div className="flex items-center gap-3 bg-surface-2 rounded-xl px-4 py-2 border border-border w-96">
              <Search className="w-4 h-4 text-text-muted" />
              <input type="text" placeholder="Cari..." className="bg-transparent text-sm outline-none w-full" />
           </div>
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
        <main className="flex-1 p-4 md:p-8">
           <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
             <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-1">Halo, Budi! 👋</h1>
             <p className="text-text-muted">Siap mengabadikan momen baru hari ini?</p>
           </motion.div>

           {/* Stats / Quick Actions */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Link href="/explore" className="bg-white p-6 rounded-3xl border border-border shadow-sm flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
                 <div>
                    <p className="text-sm font-bold text-text-muted mb-1">Cari Fotografer Baru</p>
                    <p className="text-xs text-primary font-semibold">Gunakan fitur Style Match</p>
                 </div>
                 <div className="w-12 h-12 bg-primary-light rounded-2xl flex items-center justify-center">
                    <Plus className="w-6 h-6 text-primary" />
                 </div>
              </Link>
              <div className="bg-white p-6 rounded-3xl border border-border shadow-sm">
                 <p className="text-sm font-bold text-text-muted mb-1">Sesi Aktif</p>
                 <p className="text-3xl font-extrabold text-foreground">1</p>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-border shadow-sm">
                 <p className="text-sm font-bold text-text-muted mb-1">Pesan Belum Dibaca</p>
                 <p className="text-3xl font-extrabold text-foreground">2</p>
              </div>
           </div>

           {/* Upcoming Sessions */}
           <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border flex justify-between items-center">
                 <h2 className="font-bold text-lg text-foreground">Sesi Mendatang</h2>
                 <Link href="/dashboard/sessions" className="text-sm font-semibold text-primary hover:text-primary-hover">Lihat Semua</Link>
              </div>
              <div className="p-6">
                 <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start p-4 rounded-2xl border border-border bg-surface-2">
                    <img src="https://images.unsplash.com/photo-1554046920-90dc5823ca20?q=80&w=300&auto=format&fit=crop" className="w-24 h-24 rounded-xl object-cover shadow-sm" alt="Photographer" />
                    <div className="flex-1 text-center sm:text-left">
                       <span className="inline-block px-2.5 py-1 bg-white border border-border text-xs font-bold rounded-lg mb-2">Cinematic Style</span>
                       <h3 className="font-bold text-foreground text-lg mb-1">Adrianus Dewa</h3>
                       <p className="text-sm text-text-muted flex items-center justify-center sm:justify-start gap-1">
                         <Calendar className="w-4 h-4" /> 15 Juni 2026 • 10:00 AM
                       </p>
                    </div>
                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                       <button className="flex-1 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-xl transition-colors">Detail</button>
                       <Link href="/dashboard/messages" className="flex-1 px-4 py-2 bg-white hover:bg-surface-2 border border-border text-foreground text-sm font-bold rounded-xl transition-colors text-center block">Chat</Link>
                    </div>
                 </div>
              </div>
           </div>
        </main>
      </div>
    </main>
  );
}
