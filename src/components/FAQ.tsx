"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  { q: "Bagaimana cara booking photographer?", a: "Cari photographer, pilih paket, tentukan tanggal via kalender, lalu bayar DP. Semua dilakukan di platform — tidak perlu chat manual." },
  { q: "Apakah bisa membandingkan beberapa photographer?", a: "Ya. Fitur Compare Vendor memungkinkan kamu melihat detail paket dari beberapa photographer secara berdampingan sebelum memutuskan." },
  { q: "Bagaimana keamanan pembayaran?", a: "Pembayaran DP melalui sistem escrow. Dana ditahan platform hingga sesi selesai, baru dicairkan ke vendor." },
  { q: "Apakah vendor sudah terverifikasi?", a: "Ya. Setiap photographer melewati verifikasi identitas dan review kualitas portofolio sebelum profil ditampilkan." },
  { q: "Bagaimana AI Style Matching bekerja?", a: "Upload foto referensi, AI menganalisis elemen visual seperti tone dan komposisi, lalu mencocokkan dengan photographer yang paling serupa." },
];

export default function FAQV3() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">

          {/* Header (Top Left) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className=""
          >
            <div className="inline-flex items-center justify-center bg-[#FACC15] px-4 py-1.5 rounded-full mb-4 rotate-[-2deg] shadow-sm">
              <p className="text-[10px] font-black tracking-widest uppercase text-[#78350F]">FAQ</p>
            </div>
            <h2 className="font-black text-[#0F172A] leading-tight tracking-tight mb-5" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Pertanyaan<br />yang sering<br /><span className="text-[#2563EB]">ditanyakan.</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Tidak menemukan jawaban? Hubungi kami langsung.
            </p>
          </motion.div>

          {/* Accordion */}
          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="border-b border-slate-200"
              >
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
                >
                  <h3 className={`font-black text-base pr-6 transition-colors ${openIdx === i ? "text-[#2563EB]" : "text-[#0F172A] group-hover:text-[#2563EB]"}`}>
                    {faq.q}
                  </h3>
                  <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center shrink-0 transition-all ${
                    openIdx === i ? "border-[#2563EB] bg-[#2563EB] text-white" : "border-slate-200 text-slate-400 group-hover:border-[#2563EB] group-hover:text-[#2563EB]"
                  }`}>
                    {openIdx === i ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                <AnimatePresence>
                  {openIdx === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                    >
                      <p className="text-slate-500 text-sm leading-relaxed pb-6">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
