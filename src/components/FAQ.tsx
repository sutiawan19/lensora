"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Bagaimana cara Lensora mencocokkan gaya foto?", a: "Sistem kami menggunakan tagging dan analisis visual untuk menganalisis referensi foto kamu, kemudian mencocokkannya dengan portofolio fotografer yang punya nuansa visual serupa." },
  { q: "Apakah harga yang tertera sudah final?", a: "Ya! Kami mewajibkan fotografer untuk transparan. Harga paket yang kamu lihat adalah harga final, tidak termasuk tambahan khusus di luar paket." },
  { q: "Bagaimana proses pembayaran DP-nya?", a: "Setelah fotografer menyetujui jadwal kamu, kamu bisa bayar DP secara aman lewat payment gateway kami. Uang ditahan sistem hingga sesi selesai." },
  { q: "Apakah fotografer di Lensora terverifikasi?", a: "Tentu! Setiap fotografer harus melewati verifikasi identitas dan kualitas portofolio oleh tim kami sebelum profil mereka ditayangkan." },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-28 bg-surface-2">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">Pertanyaan Umum</h2>
          <p className="text-lg text-text-muted">Jawaban atas pertanyaan yang paling sering ditanyakan.</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
              >
                <h3 className="font-bold text-foreground text-base pr-4">{faq.q}</h3>
                <motion.div animate={{ rotate: openIdx === idx ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-5 h-5 text-text-muted shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="px-6 pb-6 text-text-muted text-sm leading-relaxed">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
