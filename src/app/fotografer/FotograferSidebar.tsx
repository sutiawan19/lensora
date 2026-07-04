"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, List, PieChart, MessageSquare, LogOut, Camera } from "lucide-react";

const SIDEBAR_ITEMS = [
  { href: "/fotografer",           label: "Dashboard",      icon: LayoutDashboard },
  { href: "/fotografer/pemesanan", label: "Pemesanan",      icon: Calendar },
  { href: "/fotografer/transaksi", label: "List Transaksi", icon: List },
  { href: "/fotografer/messages",  label: "Chat",           icon: MessageSquare },
  { href: "/fotografer/laporan",   label: "Laporan",        icon: PieChart },
];

export default function FotograferSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 bg-white border-r border-border shrink-0 md:sticky md:top-0 md:h-screen overflow-y-auto no-print">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm">
            <Camera className="w-6 h-6" />
          </div>
          <span className="text-2xl font-extrabold text-foreground tracking-tight">Lensora.</span>
        </Link>
      </div>

      <div className="px-4 py-2">
        <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4 px-2">Fotografer Panel</p>
        <nav className="space-y-1">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-primary text-white font-bold shadow-sm' 
                    : 'text-text-muted hover:bg-surface-2 hover:text-foreground font-semibold'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-4 py-6 mt-auto border-t border-border mt-8 md:absolute md:bottom-0 md:w-full bg-white">
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 text-text-muted hover:bg-red-50 hover:text-red-600 font-semibold rounded-xl transition-colors">
          <LogOut className="w-5 h-5" />
          Keluar
        </Link>
      </div>
    </aside>
  );
}
