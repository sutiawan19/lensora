"use client";

import Link from "next/link";
import { 
  CheckCircle2, ShieldCheck, Star, Search, Quote, Target, ArrowRight, X, AtSign, Globe, Zap, Users, Camera
} from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const TEAM = [
  {
    id: 1,
    name: "Sutiawan",
    role: "Product Manager & Full Stack Developer",
    image: "/images/team/Sutiawan.jpeg",
    bio: "Paling anti sama UI yang ribet. Mantan fotografer freelance yang ngerti banget susahnya ngurusin bookingan manual via DM IG.",
    skills: ["Product", "Full Stack", "Development"],
    ig: "@hiiwanzz_",
    web: "sutiawan.framer.app"
  },
  {
    id: 2,
    name: "Salwa",
    role: "Front-end Developer & QA Tester",
    image: "/images/team/Salwa.jpeg",
    bio: "Tukang sulap desain jadi kode. Suka bikin animasi yang smooth biar experience di Lensora kerasa premium dan gak kaku.",
    skills: ["React", "Next.js", "QA Testing"],
    ig: "@salwa",
    web: "salwa.dev"
  },
  {
    id: 3,
    name: "Athiyya",
    role: "Back-end Developer",
    image: "/images/team/Athiyya.jpeg",
    bio: "Penjaga server Lensora biar gak down pas lagi rame yang booking. Suka main Valorant kalau lagi nunggu compile selesai.",
    skills: ["Node.js", "PostgreSQL", "API Design"],
    ig: "@athiyya",
    web: "athiyya.dev"
  },
  {
    id: 4,
    name: "Rasya",
    role: "Social Media Specialist",
    image: "/images/team/Rasya.jpeg",
    bio: "Jembatan antara Lensora sama para fotografer. Paling asik diajak ngobrol soal tren fotografi jaman now dan ngadain event.",
    skills: ["Social Media", "Content", "Copywriting"],
    ig: "@rasya",
    web: "rasya.dev"
  },
  {
    id: 5,
    name: "Disti",
    role: "Business Analyst & Administrator",
    image: "/images/team/Disti.jpeg",
    bio: "Yang mastiin semua fotografer dapet bayaran tepat waktu. Si paling jago nego dan mikirin strategi bisnis Lensora ke depan.",
    skills: ["Analysis", "Operations", "Finance"],
    ig: "@disti",
    web: "disti.dev"
  }
];

const TRUST_ITEMS = [
  { icon: CheckCircle2, title: "Fotografer Terverifikasi", desc: "Semua fotografer udah lewat proses seleksi dan verifikasi KTP.", color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-100" },
  { icon: Search, title: "Harga Transparan", desc: "Gak ada biaya tersembunyi. Apa yang kamu lihat, itu yang kamu bayar.", color: "text-[#2563EB]", bg: "bg-blue-50", border: "border-blue-100" },
  { icon: Star, title: "Review Asli", desc: "Review cuma bisa dikasih sama klien yang beneran udah booking.", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
  { icon: ShieldCheck, title: "Pembayaran Aman", desc: "Uang aman di sistem kita sampai sesi foto selesai dengan baik.", color: "text-rose-500", bg: "bg-rose-50", border: "border-rose-100" }
];

const STATS = [
  { value: "3.200+", label: "Fotografer Aktif", icon: Camera },
  { value: "40.000+", label: "Sesi Selesai", icon: Star },
  { value: "5", label: "Kota Besar", icon: Users },
  { value: "4.9/5", label: "Rating Platform", icon: Zap },
];

export default function AboutPage() {
  const [selectedMember, setSelectedMember] = useState<typeof TEAM[0] | null>(null);

  return (
    <main className="min-h-screen bg-white text-[#0F172A] flex flex-col overflow-hidden">
      <Navbar />

      {/* ─── 1. HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-28 md:pt-36 pb-0 overflow-hidden bg-[#F8FAFF]">
        {/* background blobs */}
        <div className="absolute top-0 left-[-10%] w-[600px] h-[600px] bg-[#2563EB]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-[-5%] w-[400px] h-[400px] bg-[#2563EB]/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-20">
            {/* Left: text */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              {/* Landing-style badge */}
              <div className="inline-flex items-center gap-2 bg-[#FACC15] px-4 py-1.5 rounded-full mb-8 rotate-[-2deg] shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#78350F] animate-pulse" />
                <span className="text-[10px] font-black tracking-widest uppercase text-[#78350F]">About Lensora</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-[1.1] mb-6">
                Cara Baru Cari<br />Fotografer.<br />
                <span className="text-[#2563EB]">Gak Pake Ribet.</span>
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed font-medium max-w-lg mb-10">
                Lensora hadir buat ngebantu kamu nemuin fotografer yang pas, sekaligus bantu fotografer lokal ngembangin karir mereka. Transparan, aman, dan gak ada drama.
              </p>
            </motion.div>

            {/* Right: floating polaroid collage */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[420px] hidden lg:block"
            >
              <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-16 w-56 h-72 bg-white rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white rotate-[5deg]">
                <img src="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
              </motion.div>
              <motion.div animate={{ y: [0, 16, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-0 right-0 w-48 h-60 bg-white rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white rotate-[-4deg]">
                <img src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
              </motion.div>
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-12 left-0 w-44 h-56 bg-white rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white rotate-[-6deg]">
                <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" alt="" />
              </motion.div>
              {/* floating badge over collage */}
              <div className="absolute bottom-12 left-8 bg-white rounded-2xl px-4 py-3 shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0F172A]">Booking Sukses</p>
                  <p className="text-[10px] text-slate-400">3 menit lalu · Jakarta</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="w-full h-16 bg-white" style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }} />
      </section>

      {/* ─── 2. STATS STRIP ──────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[#F8FAFF] rounded-2xl p-6 text-center border border-slate-100"
              >
                <s.icon className="w-6 h-6 text-[#2563EB] mx-auto mb-3" />
                <p className="text-3xl font-black text-[#0F172A] mb-1">{s.value}</p>
                <p className="text-xs font-semibold text-slate-400">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. STORY (split layout) ─────────────────────────────── */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">

        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left: big quote card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-[#0F172A] rounded-[3rem] p-10 md:p-12 relative overflow-hidden">
              {/* <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#2563EB] via-teal-400 to-[#FACC15]" /> */}
              <Quote className="w-12 h-12 text-white/20 mb-6" />
              <p className="text-white text-xl md:text-2xl font-bold leading-relaxed">
                "Kita bikin Lensora buat jawab satu pertanyaan: kenapa booking fotografer masih harus sesusah ini?"
              </p>
              <div className="mt-8 flex items-center gap-3">
                <img src="https://i.pravatar.cc/60?img=11" className="w-10 h-10 rounded-full border-2 border-white/20" alt="" />
                <div>
                  <p className="text-white text-sm font-bold">Sutiawan</p>
                  <p className="text-slate-400 text-xs">Co-Founder & Product Designer</p>
                </div>
              </div>
            </div>
            {/* decorative floating card */}
            <div className="absolute -bottom-6 -right-6 bg-[#FACC15] rounded-2xl p-5 shadow-xl w-48">
              <p className="text-[#0F172A] text-sm font-bold leading-tight">Dibuat di Indonesia 🇮🇩 untuk fotografer lokal.</p>
            </div>
          </motion.div>

          {/* Right: story text */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 bg-[#FACC15] px-4 py-1.5 rounded-full mb-6 rotate-[-2deg] shadow-sm">
              <div className="w-2 h-2 rounded-full bg-[#78350F] animate-pulse" />
              <span className="text-[10px] font-black tracking-widest uppercase text-[#78350F]">Cerita Kita</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#0F172A] mb-6 leading-tight">Kenapa Ada<br />Lensora?</h2>
            <div className="space-y-5 text-base text-slate-600 leading-relaxed font-medium">
              <p>
                Awalnya kita capek banget liat proses booking fotografer yang ribet. Buat nyari yang pas aja harus DM IG satu-satu, nungguin balasan <em>price list</em>, terus ribet nyocokin jadwal. Keburu <em>mood</em> ilang.
              </p>
              <p>
                Di sisi lain, fotografer juga pusing. Waktu yang harusnya dipake buat motret malah habis buat ngurusin admin dan balas chat yang gak ada habisnya.
              </p>
              <p className="text-[#0F172A] font-extrabold text-lg">
                Makanya kita bikin Lensora — satu platform yang bikin semuanya jadi <span className="text-[#2563EB]">simple, transparan, dan fair.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 4. MEET THE TEAM ────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#FACC15] px-4 py-1.5 rounded-full mb-5 rotate-[-2deg] shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#78350F] animate-pulse" />
                <span className="text-[10px] font-black tracking-widest uppercase text-[#78350F]">Tim Kita</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] leading-tight">Orang-Orang di<br />Balik Layar</h2>
            </div>
            <p className="text-slate-500 text-base font-medium max-w-sm md:text-right">
              Tim kecil yang ambisius buat ngebangun ekosistem fotografi yang lebih baik.
            </p>
          </div>
        </div>

        {/* Team — 3 on top, 2 below centered layout */}
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6 md:gap-8 mt-4">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              onClick={() => setSelectedMember(member)}
              className="group cursor-pointer w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)] max-w-[340px]"
            >
              {/* Photo */}
              <div className="relative h-[380px] rounded-[2rem] overflow-hidden shadow-md group-hover:shadow-2xl transition-shadow duration-500 border border-slate-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/10 to-transparent" />

                {/* "Detail" pill — hover only */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0">
                  <div className="bg-white/95 backdrop-blur-sm text-[#0F172A] text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full flex items-center gap-1 shadow-md">
                    Detail <ArrowRight className="w-3 h-3" />
                  </div>
                </div>

                {/* Name + role at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white font-black text-2xl leading-tight mb-3">{member.name}</p>
                  <div className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#2563EB] text-white shadow-lg">
                    {member.role}
                  </div>
                </div>
              </div>

              {/* Skills strip attached below photo */}
              <div className="mx-4 -mt-2 rounded-b-2xl px-5 py-4 bg-slate-50 border border-t-0 border-slate-200 flex flex-wrap gap-2 relative z-[-1] pt-6">
                {member.skills.map(s => (
                  <span key={s} className="text-[10px] font-bold text-slate-600 bg-white border border-slate-200 px-2.5 py-1 rounded-full">{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* Team Member Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              
              <button 
                onClick={() => setSelectedMember(null)}
                className="absolute top-5 right-5 z-10 w-9 h-9 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 h-56 md:h-auto relative">
                  <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 to-transparent md:bg-gradient-to-r md:from-transparent md:to-transparent" />
                </div>
                
                <div className="md:w-3/5 p-8 md:p-10 flex flex-col">
                  <div className="inline-flex items-center gap-2 bg-[#FACC15] px-3 py-1 rounded-full mb-4 w-fit rotate-[-1deg]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#78350F]" />
                    <span className="text-[10px] font-black tracking-widest uppercase text-[#78350F]">{selectedMember.role}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] mb-4">{selectedMember.name}</h3>
                  <p className="text-slate-600 font-medium leading-relaxed mb-7 flex-1">
                    {selectedMember.bio}
                  </p>
                  
                  <div className="mb-7">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Superpowers</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.skills.map(skill => (
                        <span key={skill} className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-xl">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-6 border-t border-slate-100">
                    <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#2563EB] transition-colors">
                      <AtSign className="w-4 h-4" /> {selectedMember.ig}
                    </button>
                    <span className="text-slate-200">|</span>
                    <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#2563EB] transition-colors">
                      <Globe className="w-4 h-4" /> {selectedMember.web}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 5. TRUST GRID ───────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#F8FAFF] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* left: text */}
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 bg-[#FACC15] px-4 py-1.5 rounded-full mb-6 rotate-[-2deg] shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#78350F] animate-pulse" />
                <span className="text-[10px] font-black tracking-widest uppercase text-[#78350F]">Trust & Safety</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-[#0F172A] leading-tight mb-5">
                Aman.<br />Terpercaya.<br /><span className="text-[#2563EB]">Terjamin.</span>
              </h2>
              <p className="text-slate-500 font-medium leading-relaxed">
                Kita pastiin setiap transaksi aman, fotografernya asli, dan hasilnya sesuai ekspektasi. No drama, no hidden fees.
              </p>
            </div>
            
            {/* right: 2x2 card grid */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {TRUST_ITEMS.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={`bg-white p-6 rounded-[1.5rem] border ${item.border} flex flex-col shadow-sm hover:shadow-lg transition-all duration-300 group`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${item.bg} group-hover:scale-110 transition-transform`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <h3 className="font-extrabold text-base mb-2 text-[#0F172A]">{item.title}</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. VISION — style FinalCTA ─────────────────────────── */}
      <section className="pt-20 pb-32 md:pt-32 md:pb-48 bg-[#2563EB] overflow-hidden relative">
        {/* Decorative large background text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none">
          <p className="text-[20vw] font-black text-white/5 leading-none tracking-tighter whitespace-nowrap">LENSORA</p>
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0F172A] rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-14 lg:p-16 shadow-2xl relative overflow-hidden"
          >
            {/* Subtle yellow accent blob */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FACC15]/20 rounded-full blur-3xl pointer-events-none -mt-32 -mr-32" />

            {/* Landing-style badge */}
            <div className="inline-flex items-center gap-2 bg-[#FACC15] px-4 py-1.5 rounded-full mb-8 rotate-[-2deg] shadow-sm">
              <div className="w-2 h-2 rounded-full bg-[#78350F] animate-pulse" />
              <span className="text-[10px] font-black tracking-widest uppercase text-[#78350F]">Visi Kita</span>
            </div>

            <h2 className="font-black text-white leading-[1.05] tracking-tight mb-6" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}>
              Support Fotografer Lokal<br />
              <span className="text-[#FACC15]">Sampai Atas.</span>
            </h2>

            <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Kita pengen Lensora jadi rumah utama para kreator visual buat cari cuan dan tempat paling mudah buat siapa aja yang butuh jasa foto.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/explore" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FACC15] hover:bg-[#EAB308] text-[#78350F] font-black text-base rounded-2xl transition-all hover:-translate-y-1 group">
                Mulai Explore
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/vendor-onboarding" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white/20 hover:border-white text-white font-black text-base rounded-2xl transition-all hover:-translate-y-1">
                Daftar Jadi Vendor
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
