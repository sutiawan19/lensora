"use client";

import { Bell, Search, Calendar, Users } from "lucide-react";
import Link from "next/link";
import { useFotografer } from "@/context/FotograferContext";
import FotograferTopbar from "./FotograferTopbar";

export default function FotograferDashboard() {
  const { orders } = useFotografer();
  
  // Ambil order pertama yang diterima atau menunggu konfirmasi sebagai jadwal terdekat
  const upcomingOrder = [...orders].sort((a, b) => new Date(a.sessionDate).getTime() - new Date(b.sessionDate).getTime())
    .find(o => o.statusPesanan === 'Diterima' || o.statusPesanan === 'Menunggu Konfirmasi') 
    || orders[0];

  // Hitung total transaksi (contoh: yang sudah Selesai)
  const totalTransaksi = orders.filter(o => o.statusPesanan === "Selesai").reduce((sum, o) => sum + o.price, 0);
  const formatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });

  // Hitung pemesanan aktif
  const activePesanan = orders.filter(o => o.statusPesanan === "Diterima" || o.statusPesanan === "Menunggu Konfirmasi").length;
  
  // Hitung tugas pending (Menunggu Konfirmasi)
  const pendingTasks = orders.filter(o => o.statusPesanan === "Menunggu Konfirmasi").length;

  // Order selesai untuk review
  const completedOrder = orders.find(o => o.statusPesanan === "Selesai") || orders[0];

  return (
    <>
      <FotograferTopbar />
      {/* Main Content */}
      <main className="p-4 md:p-8">
        <div className="mb-6 md:mb-8">
           <h1 className="text-3xl font-extrabold text-foreground mb-1 tracking-tight">Selamat Datang, Fotografer Pro!</h1>
           <p className="text-text-muted text-sm font-semibold">Berikut adalah ringkasan aktivitas dan metrik Anda hari ini.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
           <div className="bg-white p-6 rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 bg-primary-light rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Calendar className="w-6 h-6" />
                 </div>
                 <h3 className="font-bold text-text-muted text-sm uppercase tracking-wider">Pemesanan Aktif</h3>
              </div>
              <p className="text-4xl font-black text-foreground">{activePesanan}</p>
              <p className="text-xs text-text-muted font-bold mt-2"><span className="text-green-500">+12%</span> dari bulan lalu</p>
           </div>
           
           <div className="bg-white p-6 rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6" />
                 </div>
                 <h3 className="font-bold text-text-muted text-sm uppercase tracking-wider">Total Transaksi</h3>
              </div>
              <p className="text-4xl font-black text-foreground">{formatter.format(totalTransaksi)}</p>
              <p className="text-xs text-text-muted font-bold mt-2"><span className="text-green-500">+8%</span> dari bulan lalu</p>
           </div>

           <div className="bg-white p-6 rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                    <Bell className="w-6 h-6" />
                 </div>
                 <h3 className="font-bold text-text-muted text-sm uppercase tracking-wider">Tugas Pending</h3>
              </div>
              <p className="text-4xl font-black text-foreground">{pendingTasks}</p>
              <p className="text-xs text-text-muted font-bold mt-2">Perlu diselesaikan hari ini</p>
           </div>

           <div className="bg-white p-6 rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6" />
                 </div>
                 <h3 className="font-bold text-text-muted text-sm uppercase tracking-wider">Kunjungan Profil</h3>
              </div>
              <p className="text-4xl font-black text-foreground">142</p>
              <p className="text-xs text-text-muted font-bold mt-2"><span className="text-green-500">+24%</span> dalam minggu ini</p>
           </div>
        </div>

        {/* Schedule / Upcoming Order */}
        <div className="mb-8 bg-surface-2 p-6 rounded-3xl border border-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-5 w-full md:w-auto">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0 border border-border">
                 <Calendar className="w-8 h-8 text-primary" />
              </div>
              <div>
                 <p className="text-sm font-bold text-primary mb-1 tracking-wider uppercase">Jadwal Terdekat</p>
                 <h2 className="text-xl font-extrabold text-foreground mb-1">{upcomingOrder.package}</h2>
                 <p className="text-sm font-semibold text-text-muted">{upcomingOrder.sessionDateDisplay} • {upcomingOrder.client}</p>
              </div>
           </div>
           <div className="w-full md:w-auto flex flex-col gap-3">
              <Link href={`/fotografer/pemesanan?orderId=${upcomingOrder.id}`} className="w-full md:w-48 text-center bg-white border border-border text-foreground font-bold px-6 py-3 rounded-xl hover:bg-surface-1 transition-all shadow-sm">
                 Lihat Detail
              </Link>
              <Link href={`/fotografer/messages`} className="w-full md:w-48 text-center bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary-dark transition-all shadow-sm">
                 Hubungi Klien
              </Link>
           </div>
        </div>

        {/* Chart: Jumlah Pemesanan Perbulan */}
        <div className="mb-8 bg-white p-6 rounded-3xl border border-border shadow-sm">
           <h2 className="font-extrabold text-foreground text-lg mb-6">Jumlah Pemesanan (2026)</h2>
           <div className="relative h-64 flex pt-4 pb-4">
              {/* Y-axis */}
              <div className="flex flex-col justify-between h-full pr-4 text-xs font-medium text-text-muted border-r border-border w-10 text-right">
                 <span>25</span>
                 <span>20</span>
                 <span>15</span>
                 <span>10</span>
                 <span>5</span>
                 <span>0</span>
              </div>
              {/* Bars */}
              <div className="flex-1 flex items-end gap-2 sm:gap-4 px-2 sm:px-4 h-full relative">
                 {/* Grid lines */}
                 <div className="absolute inset-0 flex flex-col justify-between pointer-events-none px-4 py-4">
                    {[0, 1, 2, 3, 4].map((i) => (
                       <div key={i} className="w-full border-b border-dashed border-border opacity-50"></div>
                    ))}
                    <div className="w-full border-b border-border"></div>
                 </div>
                 {/* Chart Data */}
                 {[
                    { label: "Jan", val: 12 }, { label: "Feb", val: 15 }, { label: "Mar", val: 8 },
                    { label: "Apr", val: 20 }, { label: "Mei", val: 18 }, { label: "Jun", val: orders.filter(o => o.bookingDateDisplay.toLowerCase().includes("jun")).length || 0 },
                    { label: "Jul", val: orders.filter(o => o.bookingDateDisplay.toLowerCase().includes("jul")).length || 0 }, { label: "Ags", val: orders.filter(o => o.bookingDateDisplay.toLowerCase().includes("agu") || o.bookingDateDisplay.toLowerCase().includes("ags")).length || 0 },
                    { label: "Sep", val: 0 }, { label: "Okt", val: 0 }, { label: "Nov", val: 0 }, { label: "Des", val: 0 }
                 ].map((d, i) => (
                    <div key={i} className="flex-1 flex flex-col justify-end items-center h-full relative group z-10 cursor-pointer">
                       <div 
                          className={`w-full max-w-[40px] rounded-t-md transition-all ${d.val > 0 ? 'bg-primary-light group-hover:bg-primary' : 'bg-transparent'}`}
                          style={{ height: `${(d.val / 25) * 100}%` }}
                       >
                          {/* Tooltip */}
                          {d.val > 0 && (
                             <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs font-bold py-1 px-2 rounded pointer-events-none whitespace-nowrap transition-opacity">
                                {d.val} Pesanan
                             </div>
                          )}
                       </div>
                    </div>
                 ))}
              </div>
           </div>
           {/* X-axis labels */}
           <div className="flex justify-between text-[10px] sm:text-xs font-bold text-text-muted mt-2 ml-10 px-2 sm:px-4">
              {["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"].map(m => (
                 <span key={m} className="flex-1 text-center">{m}</span>
              ))}
           </div>
        </div>

        {/* Recent Activity / Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <div className="bg-white rounded-2xl border border-border shadow-sm p-4 md:p-6 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                 <h2 className="font-extrabold text-foreground text-lg">Aktivitas Terbaru</h2>
                 <Link href="/fotografer/pemesanan" className="text-primary text-sm font-bold hover:underline">Lihat Semua</Link>
              </div>
              <div className="flex-1 space-y-4">
                 {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex gap-4 p-3 rounded-xl hover:bg-surface-2 transition-colors border border-transparent hover:border-border cursor-pointer">
                       <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center shrink-0">
                          <Bell className="w-5 h-5 text-primary" />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-foreground">Pesanan: {order.client}</p>
                          <p className="text-xs text-text-muted mt-1">{order.package} - {order.statusPesanan}</p>
                          <p className="text-[10px] font-bold text-text-muted mt-2">{order.bookingDateDisplay}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
           <div className="bg-white p-6 rounded-3xl border border-border shadow-sm">
              <h2 className="font-bold text-lg text-foreground mb-4">Review Terbaru</h2>
              <div className="space-y-4">
                 <div className="p-4 bg-surface-2 rounded-2xl border border-border">
                    <div className="flex items-center gap-2 mb-2">
                       <div className="flex text-amber-400">★★★★★</div>
                       <span className="text-xs font-bold text-text-muted">Baru saja</span>
                    </div>
                    <p className="text-sm text-foreground font-medium mb-3">"Hasil foto sangat memuaskan, fotografernya asyik diajak ngobrol dan bisa mengarahkan gaya dengan baik."</p>
                    <p className="text-xs font-bold text-text-muted">— {completedOrder.client} ({completedOrder.package})</p>
                 </div>
              </div>
           </div>
        </div>
      </main>
    </>
  );
}
