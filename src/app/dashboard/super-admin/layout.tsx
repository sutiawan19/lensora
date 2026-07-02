"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  TrendingUp, 
  FileText, 
  UserCog, 
  Settings, 
  LogOut,
  Camera
} from "lucide-react";

export default function SuperAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [adminName, setAdminName] = useState("Sutiawan");
  const [adminPhoto, setAdminPhoto] = useState<string | null>(null);

  const loadProfile = () => {
    const storedName = localStorage.getItem("adminName");
    const storedPhoto = localStorage.getItem("adminPhoto");
    if (storedName) setAdminName(storedName);
    setAdminPhoto(storedPhoto ?? null);
  };

  useEffect(() => {
    loadProfile();
    // Listen for profile updates dispatched by settings page
    window.addEventListener("admin-profile-updated", loadProfile);
    return () => window.removeEventListener("admin-profile-updated", loadProfile);
  }, []);

  const menuItems = [
    { name: "Dashboard Statistik", icon: <TrendingUp className="w-5 h-5" />, href: "/dashboard/super-admin" },
    { name: "List Transaksi", icon: <FileText className="w-5 h-5" />, href: "/dashboard/super-admin/transactions" },
    { name: "Manage Pengguna", icon: <UserCog className="w-5 h-5" />, href: "/dashboard/super-admin/users" },
    { name: "Pengaturan", icon: <Settings className="w-5 h-5" />, href: "/dashboard/super-admin/settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-50/50 dark:bg-zinc-950 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 flex flex-col transition-all duration-300 z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-xl">
            <Camera className="w-8 h-8 text-primary" />
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            Lensora
          </span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-zinc-800">
          <Link
            href="/login"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        
        {/* Header */}
        <header className="h-20 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between px-8 z-10">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Overview
          </h1>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{adminName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Super Admin</p>
            </div>
            {adminPhoto ? (
              <img
                src={adminPhoto}
                alt="Foto Profil"
                className="w-10 h-10 rounded-full object-cover shadow-md ring-2 ring-white dark:ring-zinc-800"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-primary flex items-center justify-center text-white font-bold shadow-md">
                {adminName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          {children}
        </main>
      </div>
    </div>
  );
}
