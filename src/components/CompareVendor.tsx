"use client";

import { motion } from "framer-motion";
import { GitCompareArrows, ArrowRight } from "lucide-react";

const vendorA = {
  name: "Adrianus Dewa",
  style: "Cinematic",
  price: "Rp 1.500.000",
  avatar: "https://i.pravatar.cc/100?img=11",
  img: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=500&auto=format&fit=crop",
};

const vendorB = {
  name: "Seno Visuals",
  style: "Moody Tone",
  price: "Rp 1.200.000",
  avatar: "https://i.pravatar.cc/100?img=12",
  img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=500&auto=format&fit=crop",
};

const comparisons = [
  {
    label: "Hasil Foto (Editan)",
    a: "150 Foto Pilihan",
    b: "100 Foto Pilihan",
    aBetter: true,
    bBetter: false,
  },
  {
    label: "Durasi Sesi Foto",
    a: "6 Jam Pemotretan",
    b: "4 Jam Pemotretan",
    aBetter: true,
    bBetter: false,
  },
  {
    label: "Batas Revisi Warna",
    a: "Maksimal 3x",
    b: "Maksimal 2x",
    aBetter: true,
    bBetter: false,
  },
  {
    label: "Waktu Pengerjaan",
    a: "7 Hari Kerja",
    b: "5 Hari Kerja",
    aBetter: false,
    bBetter: true,
  }
];

export default function CompareVendor() {
  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header - editorial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 text-center md:text-left"
        >
          <div>
            <div className="inline-flex items-center justify-center bg-[#FACC15] px-4 py-1.5 rounded-full mb-6 rotate-[-2deg]">
              <p className="text-[10px] font-black tracking-widest uppercase text-[#78350F]">Fitur Unggulan</p>
            </div>
            <h2 className="font-black text-[#0F172A] leading-tight tracking-tight" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
              Bandingkan sebelum<br />
              <span className="text-[#2563EB]">booking.</span>
            </h2>
          </div>
          <p className="text-slate-500 text-sm max-w-xs mx-auto md:mx-0 leading-relaxed font-medium">
            Bingung pilih yang mana? Jejerkan paket favoritmu dan bandingkan spesifikasinya head-to-head secara langsung.
          </p>
        </motion.div>

        {/* Head to Head Comparison Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden relative max-w-4xl mx-auto"
        >
          {/* The "VS" Badge */}
          <div className="absolute top-[200px] md:top-[120px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-[#FACC15] text-[#78350F] rounded-full flex items-center justify-center font-black z-30 shadow-lg rotate-12">
            VS
          </div>

          {/* Vendors Header */}
          <div className="flex flex-col md:flex-row">
            {/* Left Vendor */}
            <div className="flex-1 border-b md:border-b-0 md:border-r border-slate-200 relative">
              <div className="h-[200px] md:h-60 relative overflow-hidden group">
                <img src={vendorA.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={vendorA.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 flex items-center gap-3">
                  <img src={vendorA.avatar} className="w-12 h-12 rounded-full border-[3px] border-white shadow-md object-cover" alt={vendorA.name} />
                  <div>
                    <p className="text-white font-black text-base">{vendorA.name}</p>
                    <p className="text-white/90 text-[10px] font-bold uppercase tracking-wider">{vendorA.style}</p>
                  </div>
                </div>
                <div className="absolute top-4 left-4 md:left-auto md:right-4 bg-[#2563EB] text-white text-xs font-black px-4 py-2 rounded-xl shadow-md">
                  {vendorA.price}
                </div>
              </div>
            </div>
            
            {/* Right Vendor */}
            <div className="flex-1 relative">
              <div className="h-[200px] md:h-60 relative overflow-hidden group">
                <img src={vendorB.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={vendorB.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-5 right-5 md:left-5 md:right-auto flex items-center gap-3 flex-row-reverse md:flex-row text-right md:text-left">
                  <img src={vendorB.avatar} className="w-12 h-12 rounded-full border-[3px] border-white shadow-md object-cover" alt={vendorB.name} />
                  <div>
                    <p className="text-white font-black text-base">{vendorB.name}</p>
                    <p className="text-white/90 text-[10px] font-bold uppercase tracking-wider">{vendorB.style}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white text-[#0F172A] text-xs font-black px-4 py-2 rounded-xl shadow-md">
                  {vendorB.price}
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="flex flex-col bg-white">
            {comparisons.map((row, i) => (
              <div key={i} className="flex flex-col md:flex-row border-t border-slate-200 relative">
                {/* Central Label Desktop */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20 bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full border border-slate-200 shadow-sm items-center justify-center">
                  <span className="text-[10px] font-black tracking-widest uppercase">{row.label}</span>
                </div>

                {/* Mobile Label */}
                <div className="md:hidden w-full bg-slate-50 py-2 text-center border-b border-slate-200">
                   <span className="text-[10px] font-black tracking-widest uppercase text-slate-600">{row.label}</span>
                </div>

                {/* Left Side Data */}
                <div className="flex-1 p-4 md:p-6 flex items-center justify-between md:justify-center md:border-r border-slate-200 hover:bg-slate-50 transition-colors">
                   <span className="md:hidden text-[10px] font-bold text-slate-400">Vendor A</span>
                   <span className={`text-sm md:text-base font-bold text-center ${row.aBetter ? "text-[#2563EB] pr-8 md:pr-0" : "text-slate-500"}`}>
                      {row.a}
                   </span>
                   {row.aBetter && <span className="md:hidden text-[10px] font-black text-white bg-[#2563EB] px-2 py-1 rounded-md">Unggul</span>}
                </div>
                
                {/* Right Side Data */}
                <div className="flex-1 p-4 md:p-6 flex items-center justify-between md:justify-center border-t border-slate-200 md:border-t-0 hover:bg-slate-50 transition-colors">
                   <span className="md:hidden text-[10px] font-bold text-slate-400">Vendor B</span>
                   <span className={`text-sm md:text-base font-bold text-center ${row.bBetter ? "text-[#2563EB] pl-8 md:pl-0" : "text-slate-500"}`}>
                      {row.b}
                   </span>
                   {row.bBetter && <span className="md:hidden text-[10px] font-black text-white bg-[#2563EB] px-2 py-1 rounded-md">Unggul</span>}
                </div>
              </div>
            ))}
          </div>

          {/* Action Bottom */}
          <div className="p-6 border-t border-slate-200 flex justify-center bg-slate-50/50">
             <button className="flex items-center gap-2 px-8 py-4 bg-[#2563EB] hover:bg-blue-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-blue-500/25 hover:-translate-y-1 transition-all group">
               <GitCompareArrows className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" /> Coba Fitur Bandingkan
             </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="inline-flex items-center gap-1.5 text-sm font-black text-slate-500 hover:text-[#2563EB] group transition-colors">
            Lihat cara kerja fitur compare
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
