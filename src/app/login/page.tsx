"use client";

import { motion } from "framer-motion";
import { Camera, ArrowRight, Mail, Lock, Globe } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "me.sutiawan@gmail.com") {
      router.push("/dashboard/super-admin");
    } else {
      router.push("/dashboard");
    }
  };
  return (
    <main className="min-h-screen flex bg-surface-2">
      {/* Left Side - Visual/Branding */}
      <div className="hidden lg:flex w-1/2 bg-primary flex-col justify-between p-12 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -ml-40 -mb-40 pointer-events-none" />

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 text-white mb-12">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight">Lensora<span className="text-accent">.</span></span>
          </Link>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-extrabold text-white leading-tight mb-6"
          >
            Temukan kembali <br/> momen terbaikmu.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-primary-light text-lg max-w-md"
          >
            Masuk untuk terhubung dengan ribuan fotografer berbakat atau kelola bisnis fotografimu.
          </motion.p>
        </div>

        {/* Floating cards animation to make it dynamic */}
        <div className="relative z-10 h-64">
           <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute right-10 bottom-10 bg-white rounded-2xl p-4 shadow-xl border border-white/20 w-64"
            >
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-accent-light flex items-center justify-center">
                    <span className="text-accent font-bold text-lg">📸</span>
                 </div>
                 <div>
                    <p className="text-sm font-bold text-foreground">Sesi Terkonfirmasi</p>
                    <p className="text-xs text-text-muted">Besok, 10:00 AM</p>
                 </div>
              </div>
           </motion.div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
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

          <h2 className="text-3xl font-extrabold text-foreground mb-2">Selamat Datang! 👋</h2>
          <p className="text-text-muted mb-8">Silakan masukkan detail akun kamu untuk melanjutkan.</p>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-foreground mb-2">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-text-muted" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-surface-2 focus:ring-primary focus:border-primary transition-colors outline-none text-foreground text-sm"
                  placeholder="nama@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-foreground">Password</label>
                <a href="#" className="text-xs font-semibold text-primary hover:text-primary-hover transition-colors">Lupa Password?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-text-muted" />
                </div>
                <input 
                  type="password" 
                  className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl bg-surface-2 focus:ring-primary focus:border-primary transition-colors outline-none text-foreground text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button type="submit" onClick={handleLogin} className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 mt-6">
              Masuk <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-text-muted font-medium">Atau masuk dengan</span>
            </div>
          </div>

          <div className="mt-6">
            <Link href="/dashboard" className="w-full flex items-center justify-center gap-2 bg-white border border-border hover:bg-surface-2 text-foreground font-bold py-3 rounded-xl transition-colors">
              <Globe className="w-5 h-5" />
              Google
            </Link>
          </div>

          <p className="mt-8 text-center text-sm text-text-muted">
            Belum punya akun?{' '}
            <Link href="/register" className="font-bold text-primary hover:text-primary-hover transition-colors">
              Daftar sekarang
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
