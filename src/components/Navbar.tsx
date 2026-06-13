"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Aperture, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    fn(); // initialize state
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  const links = [
    { name: "Beranda", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "Tentang", href: "/about" },
    { name: "Vendor", href: "/register" },
  ];

  return (
    <>
      <nav className={`${pathname?.startsWith('/explore') ? 'absolute' : 'fixed'} top-0 w-full z-[100] transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]" : isOpen ? "bg-white/95 backdrop-blur-xl" : "bg-transparent py-2"
        }`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 md:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 z-50">
            <div className="w-8 h-8 rounded-xl bg-[#2563EB] flex items-center justify-center">
              <Aperture className="w-4 h-4 text-white" />
            </div>
            <span className="text-[16px] font-black tracking-tight text-[#0F172A]">
              Lens<span className="text-[#2563EB]">ora</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-[13px] font-bold text-slate-500 absolute left-1/2 -translate-x-1/2">
            {links.map(l => {
              const isActive = pathname === l.href || (l.href !== "/" && pathname?.startsWith(l.href));
              return (
                <Link key={l.name} href={l.href} className={`transition-colors py-1.5 ${isActive ? "text-[#2563EB]" : "hover:text-[#2563EB]"}`}>
                  {l.name}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3 z-50">
            <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-[#0F172A] px-3 py-2">Masuk</Link>
            <Link href="/register" className="px-5 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white text-sm font-black rounded-xl transition-all shadow-md shadow-blue-500/20">
              Daftar
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center z-50">
            {isOpen ? <X className="w-5 h-5 text-slate-600" /> : <Menu className="w-5 h-5 text-slate-600" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] bg-white pt-24 px-6 pb-8 flex flex-col md:hidden"
          >
            <div className="flex flex-col gap-2">
              {links.map((l, i) => {
                const isActive = pathname === l.href || (l.href !== "/" && pathname?.startsWith(l.href));
                return (
                  <motion.div key={l.name} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link href={l.href} className={`block py-4 px-5 text-lg font-black rounded-2xl transition-colors ${isActive ? "bg-blue-50 text-[#2563EB]" : "text-[#0F172A] hover:bg-slate-50"}`}>
                      {l.name}
                    </Link>
                  </motion.div>
                )
              })}
            </div>
            <div className="mt-auto flex flex-col gap-3">
              <Link href="/login" className="w-full py-4 bg-slate-50 text-[#0F172A] text-center font-bold rounded-2xl border border-slate-100">Masuk</Link>
              <Link href="/register" className="w-full py-4 bg-[#2563EB] text-white text-center font-black rounded-2xl shadow-lg shadow-blue-500/25">Daftar</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
