"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, Calendar, List, PieChart, LogOut, Settings, LayoutDashboard } from "lucide-react";

const navItems = [
  { href: "/fotografer",          label: "Dashboard",      icon: LayoutDashboard, exact: true },
  { href: "/fotografer/pemesanan", label: "Pemesanan",     icon: Calendar },
  { href: "/fotografer/transaksi", label: "List Transaksi", icon: List },
  { href: "/fotografer/laporan",   label: "Laporan",        icon: PieChart },
];

export default function FotograferSidebar() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="w-full md:w-64 bg-white border-r border-border flex flex-col h-screen md:sticky md:top-0 shrink-0 hidden md:flex">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2 text-foreground font-extrabold tracking-tight text-xl">
          <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">
            <Camera className="w-4 h-4" />
          </div>
          Lensora<span className="text-primary">.</span>
        </Link>
      </div>

      {/* Nav */}
      <div className="p-4 flex-1">
        <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4 px-3">Fotografer Panel</p>
        <nav className="space-y-1">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const active = isActive(href, exact);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-colors ${
                  active
                    ? "bg-primary text-white"
                    : "text-text-muted hover:bg-surface-2 hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom */}
      <div className="p-4 border-t border-border">
        <Link
          href="#"
          className="flex items-center gap-3 px-3 py-2 text-text-muted hover:bg-surface-2 hover:text-foreground font-semibold rounded-xl transition-colors"
        >
          <Settings className="w-5 h-5" /> Pengaturan
        </Link>
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 text-text-muted hover:bg-red-50 hover:text-red-500 font-semibold rounded-xl transition-colors"
        >
          <LogOut className="w-5 h-5" /> Keluar
        </Link>
      </div>
    </aside>
  );
}
