"use client";

import { Camera, Search, Bell, Settings, LogOut, Calendar, MessageSquare, TrendingUp, Users, DollarSign, Activity } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const REPORT_DATA = [
  { bulan: 'Januari', kunjungan: 40, pemesanan: 24, pendapatan: 'Rp 1.800.000' },
  { bulan: 'Februari', kunjungan: 60, pemesanan: 38, pendapatan: 'Rp 2.850.000' },
  { bulan: 'Maret', kunjungan: 45, pemesanan: 30, pendapatan: 'Rp 2.250.000' },
  { bulan: 'April', kunjungan: 80, pemesanan: 50, pendapatan: 'Rp 3.750.000' },
  { bulan: 'Mei', kunjungan: 65, pemesanan: 40, pendapatan: 'Rp 3.000.000' },
  { bulan: 'Juni', kunjungan: 95, pemesanan: 70, pendapatan: 'Rp 5.250.000' },
];

function downloadCSV() {
  const headers = ['Bulan', 'Kunjungan Profil', 'Pemesanan', 'Estimasi Pendapatan'];
  const rows = REPORT_DATA.map(d => [d.bulan, d.kunjungan, d.pemesanan, d.pendapatan]);
  const csvContent = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'laporan_adrianus_juni2026.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default function PhotographerDashboard() {
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
               <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4 px-3">Photographer Panel</p>
               <nav className="space-y-1">
                  <Link href="/photographer-dashboard" className="flex items-center gap-3 px-3 py-2 bg-primary-light text-primary font-bold rounded-xl">
                     <TrendingUp className="w-5 h-5" /> Statistik & Overview
                  </Link>
                  <Link href="/photographer-dashboard/sessions" className="flex items-center gap-3 px-3 py-2 text-text-muted hover:bg-surface-2 hover:text-foreground font-semibold rounded-xl transition-colors">
                     <Calendar className="w-5 h-5" /> Jadwal Sesi
                  </Link>
                  <Link href="/photographer-dashboard/messages" className="flex items-center gap-3 px-3 py-2 text-text-muted hover:bg-surface-2 hover:text-foreground font-semibold rounded-xl transition-colors">
                     <MessageSquare className="w-5 h-5" /> Pesan <span className="ml-auto bg-accent text-white text-[10px] px-2 py-0.5 rounded-full font-bold">5</span>
                  </Link>
               </nav>
            </div>

            <div className="p-4 border-t border-border">
               <button onClick={() => alert("Fitur ini sedang dalam tahap pengembangan!")} className="w-full text-left flex items-center gap-3 px-3 py-2 text-text-muted hover:bg-surface-2 hover:text-foreground font-semibold rounded-xl transition-colors">
                  <Settings className="w-5 h-5" /> Pengaturan Profil
               </button>
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
                  <button className="p-2 text-text-muted"><Bell className="w-5 h-5" /></button>
               </div>
            </header>

            {/* Dashboard Topbar (Desktop) */}
            <header className="hidden md:flex h-16 bg-white border-b border-border items-center justify-between px-8 sticky top-0 z-40">
               <div className="flex items-center gap-3 bg-surface-2 rounded-xl px-4 py-2 border border-border w-96">
                  <Search className="w-4 h-4 text-text-muted" />
                  <input type="text" placeholder="Cari pemesanan atau klien..." className="bg-transparent text-sm outline-none w-full" />
               </div>
               <div className="flex items-center gap-4">
                  <button className="relative p-2 text-text-muted hover:bg-surface-2 rounded-full transition-colors">
                     <Bell className="w-5 h-5" />
                     <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-accent rounded-full border-2 border-white"></span>
                  </button>
                  <div className="w-px h-6 bg-border"></div>
                  <div className="flex items-center gap-3">
                     <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-foreground">Adrianus Dewa</p>
                        <p className="text-xs text-text-muted">Vendor Fotografer</p>
                     </div>
                     <img src="https://i.pravatar.cc/100?img=11" alt="Profile" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                  </div>
               </div>
            </header>

            {/* Dashboard Content */}
            <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 md:mb-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4">
                  <div className="w-full sm:w-auto text-center sm:text-left">
                     <h1 className="text-3xl md:text-3xl font-extrabold text-foreground mb-1">Halo, Adrianus! 📸</h1>
                     <p className="text-text-muted">Ini ringkasan performa bisnismu bulan ini.</p>
                  </div>
                   <button onClick={downloadCSV} className="w-full sm:w-auto flex items-center gap-2 px-4 py-2 bg-white border border-border text-foreground font-bold rounded-xl shadow-sm hover:bg-surface-2 transition-colors">
                      Download Laporan
                   </button>
               </motion.div>

               {/* Stats Section */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                  <div className="bg-white p-5 md:p-6 rounded-3xl border border-border shadow-sm flex flex-col justify-center">
                     <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center"><DollarSign className="w-5 h-5 text-green-600" /></div>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">+12%</span>
                     </div>
                     <p className="text-xs md:text-sm font-bold text-text-muted mb-1">Pendapatan</p>
                     <p className="text-2xl md:text-3xl font-extrabold text-foreground">Rp 8.5M</p>
                  </div>

                  <div className="bg-white p-5 md:p-6 rounded-3xl border border-border shadow-sm flex flex-col justify-center">
                     <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center"><Calendar className="w-5 h-5 text-blue-600" /></div>
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">4 Aktif</span>
                     </div>
                     <p className="text-xs md:text-sm font-bold text-text-muted mb-1">Total Sesi</p>
                     <p className="text-2xl md:text-3xl font-extrabold text-foreground">12 Sesi</p>
                  </div>

                  <div className="bg-white p-5 md:p-6 rounded-3xl border border-border shadow-sm flex flex-col justify-center">
                     <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center"><Users className="w-5 h-5 text-purple-600" /></div>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">+24%</span>
                     </div>
                     <p className="text-xs md:text-sm font-bold text-text-muted mb-1">Kunjungan Profil</p>
                     <p className="text-2xl md:text-3xl font-extrabold text-foreground">1,240</p>
                  </div>

                  <div className="bg-white p-5 md:p-6 rounded-3xl border border-border shadow-sm flex flex-col justify-center">
                     <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center"><Activity className="w-5 h-5 text-amber-600" /></div>
                        <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">Menunggu</span>
                     </div>
                     <p className="text-xs md:text-sm font-bold text-text-muted mb-1">Permintaan Baru</p>
                     <p className="text-2xl md:text-3xl font-extrabold text-foreground">3</p>
                  </div>
               </div>

               {/* Upcoming Sessions */}
               <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden mb-8">
                  <div className="p-6 border-b border-border flex justify-between items-center">
                     <h2 className="font-bold text-lg text-foreground">Jadwal Terdekat</h2>
                     <Link href="/photographer-dashboard/sessions" className="text-sm font-semibold text-primary hover:text-primary-hover">Lihat Semua</Link>
                  </div>
                  <div className="p-5 md:p-6">
                     <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center sm:items-start p-4 rounded-2xl border border-border bg-surface-2">
                        <img src="https://i.pravatar.cc/150?img=12" className="w-24 h-24 md:w-24 md:h-24 rounded-xl object-cover shadow-sm" alt="Client" />
                        <div className="flex-1 text-center sm:text-left">
                           <span className="inline-block px-2.5 py-1 bg-white border border-border text-xs font-bold rounded-lg mb-2">Pre-Wedding</span>
                           <h3 className="font-bold text-foreground text-lg mb-1">Klien: Budi & Sarah</h3>
                           <p className="text-sm text-text-muted flex items-center justify-center sm:justify-start gap-1">
                              <Calendar className="w-4 h-4" /> 16 Juni 2026 • 09:00 AM - 12:00 PM
                           </p>
                           <p className="text-sm text-text-muted flex items-center justify-center sm:justify-start gap-1 mt-1">
                              Lokasi: Kebun Raya Bogor
                           </p>
                        </div>
                        <div className="flex flex-col sm:flex-col gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                           <button className="w-full sm:w-auto px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-xl transition-colors">Detail Pemesanan</button>
                           <Link href="/photographer-dashboard/messages" className="w-full sm:w-auto px-6 py-2.5 bg-white hover:bg-surface-2 border border-border text-foreground text-sm font-bold rounded-xl transition-colors text-center block">Hubungi Klien</Link>
                        </div>
                     </div>
                  </div>
               </div>
               {/* Chart Section */}
               <div className="bg-white p-6 rounded-3xl border border-border shadow-sm mb-8">
                  <h2 className="font-bold text-lg text-foreground mb-6">Statistik Pengunjung & Pemesanan</h2>
                  <div className="h-64 flex items-end gap-2 md:gap-6 justify-between pt-4">
                     {[
                        { label: 'Jan', val1: 40, val2: 24 },
                        { label: 'Feb', val1: 60, val2: 38 },
                        { label: 'Mar', val1: 45, val2: 30 },
                        { label: 'Apr', val1: 80, val2: 50 },
                        { label: 'Mei', val1: 65, val2: 40 },
                        { label: 'Jun', val1: 95, val2: 70 },
                     ].map((data, i) => (
                        <div key={i} className="flex-1 flex flex-col justify-end items-center gap-2 group h-full relative">
                           <div className="w-full flex justify-center gap-1 md:gap-2 h-full items-end">
                              <div className="w-1/2 bg-surface-2 rounded-t-md relative group-hover:bg-primary-light transition-colors" style={{ height: `${data.val1}%` }}>
                                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">{data.val1} Kunjungan</div>
                              </div>
                              <div className="w-1/2 bg-primary rounded-t-md relative shadow-sm" style={{ height: `${data.val2}%` }}>
                                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">{data.val2} Pesanan</div>
                              </div>
                           </div>
                           <span className="text-xs font-bold text-text-muted mt-2">{data.label}</span>
                        </div>
                     ))}
                  </div>
                  <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-border">
                     <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-surface-2"></div><span className="text-xs font-semibold text-text-muted">Kunjungan Profil</span></div>
                     <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary"></div><span className="text-xs font-semibold text-text-muted">Pemesanan</span></div>
                  </div>
               </div>

               {/* Recent Activity / Reviews placeholder */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-3xl border border-border shadow-sm">
                     <h2 className="font-bold text-lg text-foreground mb-4">Aktivitas Terbaru</h2>
                     <div className="space-y-4">
                        <div className="flex gap-3">
                           <div className="w-2 h-2 mt-2 rounded-full bg-primary shrink-0"></div>
                           <div>
                              <p className="text-sm font-bold text-foreground">Pembayaran diterima</p>
                              <p className="text-xs text-text-muted">Pembayaran pelunasan dari Budi Santoso (Rp 1.500.000)</p>
                           </div>
                        </div>
                        <div className="flex gap-3">
                           <div className="w-2 h-2 mt-2 rounded-full bg-teal shrink-0"></div>
                           <div>
                              <p className="text-sm font-bold text-foreground">Booking baru dikonfirmasi</p>
                              <p className="text-xs text-text-muted">Sesi Pre-wedding oleh Sarah (16 Juni 2026)</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-border shadow-sm">
                     <div className="flex justify-between items-center mb-4">
                        <h2 className="font-bold text-lg text-foreground">Review Terbaru</h2>
                     </div>
                     <div className="p-4 rounded-xl bg-surface-2 border border-border">
                        <div className="flex items-center gap-2 mb-2">
                           <div className="flex text-amber-500 text-xs">★★★★★</div>
                           <p className="text-xs font-bold text-text-muted">5.0</p>
                        </div>
                        <p className="text-sm text-foreground italic">"Wah parah sih hasil foto mas Adrianus keren banget, tone warnanya sesuai banget sama yang aku mau!"</p>
                        <p className="text-xs text-text-muted mt-2">- Anita, Sesi Wisuda</p>
                     </div>
                  </div>
               </div>

            </main>
         </div>
      </main>
   );
}
