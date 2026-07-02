"use client";

import { Bell, Search } from "lucide-react";
import Link from "next/link";

export default function FotograferDashboard() {
  return (
    <>
      {/* Topbar */}
      <header className="h-16 bg-white border-b border-border hidden md:flex items-center justify-between px-8 sticky top-0 z-40">
        <div className="flex items-center gap-3 bg-surface-2 rounded-xl px-4 py-2 border border-border w-96">
          <Search className="w-4 h-4 text-text-muted" />
          <input type="text" placeholder="Cari pemesanan, transaksi..." className="bg-transparent text-sm outline-none w-full" />
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-text-muted hover:bg-surface-2 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-accent rounded-full border-2 border-white"></span>
          </button>
          <div className="w-px h-6 bg-border"></div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-foreground">Fotografer Pro</p>
              <p className="text-xs text-text-muted">Vendor</p>
            </div>
            <img src="https://i.pravatar.cc/100?img=33" alt="Profile" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 md:p-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl font-extrabold text-foreground mb-1">Dashboard</h1>
          <p className="text-text-muted">Ringkasan aktivitas dan performa Anda hari ini.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
            <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-2">Pemesanan Aktif</h3>
            <p className="text-3xl font-extrabold text-foreground">12</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
            <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-2">Total Transaksi</h3>
            <p className="text-3xl font-extrabold text-foreground">Rp 5.400.000</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
            <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-2">Review Baru</h3>
            <p className="text-3xl font-extrabold text-foreground">4.8 <span className="text-sm font-medium text-text-muted">/ 5.0</span></p>
          </div>
        </div>
      </main>
    </>
  );
}
