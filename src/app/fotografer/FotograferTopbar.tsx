"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useFotografer } from "@/context/FotograferContext";

export default function FotograferTopbar({ children }: { children?: React.ReactNode }) {
  const { orders } = useFotografer();
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotif(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-border hidden md:flex items-center justify-between px-8 sticky top-0 z-40 no-print">
      {/* Search or Spacer */}
      {children ? children : <div className="flex-1"></div>}

      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setShowNotif(!showNotif)}
            className="relative p-2 text-text-muted hover:bg-surface-2 hover:text-foreground rounded-full transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          
          {/* Notification Dropdown */}
          {showNotif && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-border rounded-2xl shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 border-b border-border flex justify-between items-center bg-surface-2">
                <h3 className="font-bold text-sm text-foreground">Notifikasi</h3>
                <span className="text-[10px] font-bold text-primary bg-primary-light px-2 py-0.5 rounded-full">{orders.length} Baru</span>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {orders.slice(0, 3).map((order) => (
                  <div key={order.id} className="p-4 border-b border-border hover:bg-surface-1 cursor-pointer transition-colors bg-primary-light/10">
                    <p className="text-sm font-bold text-foreground">
                      {order.statusPesanan === 'Selesai' ? 'Sesi Selesai' : 
                       order.statusPesanan === 'Diterima' ? 'Pesanan Diterima' : 'Pesanan Baru'}
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">{order.package} - Klien: {order.client}</p>
                    <p className="text-[10px] text-text-muted font-bold mt-2">{order.dateDisplay}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-border bg-surface-2 text-center cursor-pointer hover:bg-surface-1 transition-colors text-xs font-bold text-primary">
                Tandai semua dibaca
              </div>
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-border"></div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setShowProfile(!showProfile)}
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">Fotografer Pro</p>
              <p className="text-xs text-text-muted">Vendor</p>
            </div>
            <img 
              src="https://i.pravatar.cc/100?img=33" 
              alt="Profile" 
              className="w-10 h-10 rounded-full border-2 border-white shadow-sm group-hover:ring-2 group-hover:ring-primary/20 transition-all" 
            />
          </div>

          {/* Profile Dropdown */}
          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-xl shadow-lg z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-4 border-b border-border bg-surface-2 md:hidden">
                <p className="text-sm font-bold text-foreground">Fotografer Pro</p>
                <p className="text-xs text-text-muted">Vendor</p>
              </div>
              <div className="py-1">
                <Link href="#" className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-surface-2 transition-colors">
                  <User className="w-4 h-4 text-text-muted" /> Profil Saya
                </Link>
                <Link href="#" className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-surface-2 transition-colors">
                  <Settings className="w-4 h-4 text-text-muted" /> Pengaturan
                </Link>
                <div className="h-px bg-border my-1"></div>
                <Link href="/" className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut className="w-4 h-4" /> Keluar
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
