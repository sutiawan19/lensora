"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [shouldShow, setShouldShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [textStage, setTextStage] = useState(0);

  useEffect(() => {
    // Cek apakah user sudah pernah buka di session ini
    const hasVisited = sessionStorage.getItem("lensora_visited");
    if (!hasVisited) {
      setShouldShow(true);
      setIsLoading(true);
      sessionStorage.setItem("lensora_visited", "true");
    }
  }, []);

  useEffect(() => {
    if (!isLoading) return;

    // Timeline Text Transition
    const t1 = setTimeout(() => setTextStage(1), 1500); // 1.5s
    const t2 = setTimeout(() => setTextStage(2), 3000); // 3.0s

    // Shutter reveal di 4.5s
    const t3 = setTimeout(() => {
      setIsLoading(false);
    }, 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isLoading]);

  const loadingTexts = [
    "Mencari fotografer sesuai gaya kamu...",
    "Menganalisis referensi visual...",
    "Menyiapkan pengalaman terbaik..."
  ];

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white overflow-hidden"
          // Efek shutter cinematic saat exit
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(15px)",
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
          }}
        >
          {/* Subtle Flash Transition di akhir animasi */}
          <motion.div
            className="absolute inset-0 bg-white z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.6, 0] }}
            transition={{ duration: 4.5, times: [0, 0.85, 0.95, 1] }}
          />

          <div className="relative flex flex-col items-center justify-center w-full max-w-lg px-6">

            {/* Cinematic Camera Lens / Focus Area (Giant) */}
            <motion.div
              className="relative w-64 h-64 md:w-[40vh] md:h-[40vh] max-w-[400px] max-h-[400px] flex items-center justify-center mb-16"
              initial={{ filter: "blur(20px)", scale: 1.1, opacity: 0 }}
              animate={{ filter: "blur(0px)", scale: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              {/* Outer Ring: Slow rotate */}
              <motion.div
                className="absolute inset-0 rounded-full border border-slate-200/60 shadow-[inset_0_0_60px_rgba(0,0,0,0.02)]"
                initial={{ rotate: -45 }}
                animate={{ rotate: 90 }}
                transition={{ duration: 5, ease: "linear" }}
              />

              {/* Inner Ring */}
              <motion.div
                className="absolute inset-4 rounded-full border border-slate-100 shadow-[0_0_40px_rgba(37,99,235,0.05)]"
                initial={{ rotate: 45 }}
                animate={{ rotate: -90 }}
                transition={{ duration: 5, ease: "linear" }}
              />

              {/* Crosshair / Focus Points [ ] */}
              <motion.div
                className="absolute flex items-center justify-center w-full h-full text-slate-300"
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              >
                {/* Frame kiri */}
                <div className="absolute left-4 md:left-8 w-4 h-8 border-l-2 border-y-2 border-slate-300 rounded-l-sm" />
                {/* Frame kanan */}
                <div className="absolute right-4 md:right-8 w-4 h-8 border-r-2 border-y-2 border-slate-300 rounded-r-sm" />

                {/* Center crosshair subtle */}
                <div className="absolute w-8 h-[1px] bg-slate-200" />
                <div className="absolute w-[1px] h-8 bg-slate-200" />
              </motion.div>

              {/* Focus Locked Indicator (Titik Biru + Pulse) muncul di detik ke 3 */}
              <motion.div
                className="absolute w-3 h-3 rounded-full bg-[#2563EB] shadow-[0_0_15px_rgba(37,99,235,0.6)]"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 3.2 }}
              />
              <motion.div
                className="absolute w-12 h-12 rounded-full border-2 border-[#2563EB]"
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: [0, 1, 0], scale: [0.2, 1.2, 1.8] }}
                transition={{ duration: 0.8, delay: 3.2 }}
              />

              {/* Center Lensora Branding (inside lens) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute flex flex-col items-center bg-white/40 backdrop-blur-md px-6 py-3 rounded-2xl"
              >
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl md:text-3xl font-black tracking-tight text-[#0F172A]">LENSORA</h1>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FACC15]" />
                </div>
              </motion.div>
            </motion.div>

            {/* Dynamic Loading Text */}
            <div className="h-8 flex items-center justify-center text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={textStage}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.5 }}
                  className="text-sm md:text-base font-bold text-slate-500"
                >
                  {loadingTexts[textStage]}
                </motion.p>
              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
