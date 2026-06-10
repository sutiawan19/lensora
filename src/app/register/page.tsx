"use client";

import { motion } from "framer-motion";
import { Camera, ArrowRight, Mail, Lock, User, Briefcase, Globe } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [accountType, setAccountType] = useState<"client" | "vendor">("client");

  return (
    <main className="min-h-screen flex bg-surface-2">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-border"
        >
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            <span className="text-xl font-extrabold tracking-tight">Lensora<span className="text-primary">.</span></span>
          </div>

          <h2 className="text-3xl font-extrabold text-foreground mb-2">Buat Akun Baru ✨</h2>
          <p className="text-text-muted mb-8">Bergabunglah dan mulai jelajahi gaya fotografi terbaik.</p>

          <form className="space-y-5">
            {/* Account Type Toggle */}
            <div className="flex p-1 bg-surface-2 rounded-xl mb-6">
              <button
                type="button"
                onClick={() => setAccountType("client")}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                  accountType === "client" ? "bg-white text-foreground shadow-sm" : "text-text-muted hover:text-foreground"
                }`}
              >
                Saya Klien
              </button>
              <button
                type="button"
                onClick={() => setAccountType("vendor")}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                  accountType === "vendor" ? "bg-white text-foreground shadow-sm" : "text-text-muted hover:text-foreground"
                }`}
              >
                Saya Fotografer
              </button>
            </div>

            <div>
              <label className="block text-sm font-bold text-foreground mb-2">Nama Lengkap</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-text-muted" />
                </div>
                <input 
                  type="text" 
                  className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-surface-2 focus:ring-primary focus:border-primary transition-colors outline-none text-foreground text-sm"
                  placeholder="Budi Santoso"
                />
              </div>
            </div>

            {accountType === "vendor" && (
              <div>
                <label className="block text-sm font-bold text-foreground mb-2">Nama Studio (Opsional)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-text-muted" />
                  </div>
                  <input 
                    type="text" 
                    className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-surface-2 focus:ring-primary focus:border-primary transition-colors outline-none text-foreground text-sm"
                    placeholder="Budi Visuals"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-foreground mb-2">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-text-muted" />
                </div>
                <input 
                  type="email" 
                  className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-surface-2 focus:ring-primary focus:border-primary transition-colors outline-none text-foreground text-sm"
                  placeholder="nama@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-foreground mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-text-muted" />
                </div>
                <input 
                  type="password" 
                  className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-surface-2 focus:ring-primary focus:border-primary transition-colors outline-none text-foreground text-sm"
                  placeholder="Minimal 8 karakter"
                />
              </div>
            </div>

            <Link href="/dashboard" className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 mt-6">
              Daftar Sekarang <ArrowRight className="w-4 h-4" />
            </Link>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-text-muted font-medium">Atau daftar dengan</span>
            </div>
          </div>

          <div className="mt-6">
             <Link href="/dashboard" className="w-full flex items-center justify-center gap-2 bg-white border border-border hover:bg-surface-2 text-foreground font-bold py-3 rounded-xl transition-colors">
              <Globe className="w-5 h-5" />
              Google
            </Link>
          </div>

          <p className="mt-8 text-center text-sm text-text-muted">
            Sudah punya akun?{' '}
            <Link href="/login" className="font-bold text-primary hover:text-primary-hover transition-colors">
              Masuk di sini
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Visual/Branding */}
      <div className="hidden lg:flex w-1/2 bg-surface flex-col justify-center items-center p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -ml-40 -mb-40 pointer-events-none" />

        <div className="relative z-10 w-full max-w-lg">
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative"
           >
             <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=800&auto=format&fit=crop" alt="Photography" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
             <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-bold text-xl mb-1">Lebih dari sekadar platform.</p>
                <p className="text-sm text-white/80">Kami menghubungkan estetika dengan kenangan yang tak terlupakan.</p>
             </div>
           </motion.div>
        </div>
      </div>
    </main>
  );
}
