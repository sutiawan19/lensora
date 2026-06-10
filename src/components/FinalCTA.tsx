"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary rounded-3xl p-12 md:p-20 text-center text-white relative overflow-hidden"
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-12 -mb-12 pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
              Siap Menemukan Fotografer Impian Kamu?
            </h2>
            <p className="text-lg text-white/80 mb-10 max-w-xl mx-auto">
              Bergabung dengan ribuan klien yang sudah menemukan fotografer terbaik lewat Lensora. Mulai sekarang, gratis!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-white/90 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2">
                Cari Fotografer <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-8 py-4 bg-transparent text-white font-bold rounded-xl border-2 border-white/30 hover:bg-white/10 transition-all flex items-center justify-center">
                Daftar Jadi Vendor
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
