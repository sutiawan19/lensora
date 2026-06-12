"use client";

import Link from "next/link";
import { 
  Camera, CheckCircle2, ShieldCheck, Star, Search, Quote, Target, ArrowRight
} from "lucide-react";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const TEAM = [
  {
    id: 1,
    name: "Alex Pratama",
    role: "Product Designer",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
    bio: "Obsessed with creating frictionless experiences. Former freelance photographer who understands the pain of manual bookings."
  },
  {
    id: 2,
    name: "Sarah Wijaya",
    role: "Frontend Engineer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    bio: "Turning coffee into clean, performant interfaces. Passionate about building tools that empower independent creators."
  },
  {
    id: 3,
    name: "Dimas Anggara",
    role: "Business & Operations",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
    bio: "Ensuring every photographer gets paid on time and every client gets exactly what they booked. The glue of Lensora."
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-foreground">
            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center shadow-md">
              <Camera className="w-4 h-4" />
            </div>
            Lensora<span className="text-primary">.</span>
          </Link>
          <div className="hidden md:flex gap-8 items-center text-sm font-semibold text-text-muted absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <Link href="/explore" className="hover:text-primary transition-colors">Explore Photographer</Link>
            <Link href="/about" className="text-primary transition-colors">About</Link>
            <Link href="/vendor-onboarding" className="hover:text-primary transition-colors">Become Vendor</Link>
          </div>
          <div className="flex gap-3 items-center">
            <Link href="/login" className="text-sm font-bold text-text-muted hover:text-foreground transition-colors hidden sm:block">Masuk</Link>
            <Link href="/register" className="px-5 py-2 bg-primary hover:bg-primary-hover rounded-xl text-white text-sm font-bold transition-colors shadow-sm">Daftar</Link>
          </div>
        </div>
      </nav>

      {/* 1. Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative min-h-[85vh] flex items-center justify-center bg-[#FAFAFB]">
         {/* Background Blobs for Visual Depth */}
         <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
         <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-amber/10 rounded-full blur-[80px] pointer-events-none"></div>
         
         {/* Floating Elements (Background) */}
         <motion.div 
            animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute hidden lg:block top-40 left-[10%] w-32 h-40 rounded-3xl overflow-hidden shadow-2xl border-4 border-white rotate-[-6deg]"
         >
            <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=300&auto=format&fit=crop" className="w-full h-full object-cover" />
         </motion.div>
         <motion.div 
            animate={{ y: [0, 20, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute hidden lg:block bottom-32 right-[10%] w-40 h-48 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white rotate-[8deg]"
         >
            <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" />
         </motion.div>

         <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
               <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/60 backdrop-blur-md border border-primary/20 rounded-full text-xs font-bold text-primary mb-8 shadow-sm">
                  <ShieldCheck className="w-4 h-4" /> Trusted Photography Marketplace
               </div>
               <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-8 leading-[1.1]">
                  Building a Better Way to <br className="hidden md:block"/> Find Photographers.
               </h1>
               <p className="text-xl text-text-muted leading-relaxed font-medium max-w-2xl mx-auto">
                  Lensora was created to help people discover photographers more easily while helping photographers grow their business professionally.
               </p>
            </motion.div>
         </div>
      </section>

      {/* 2. The Story Behind Lensora */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative bg-white">
         <div className="max-w-4xl mx-auto">
            <motion.div 
               initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
               className="bg-white rounded-[3rem] p-10 md:p-16 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-border relative overflow-hidden"
            >
               {/* Decorative Gradient Line */}
               <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-teal to-amber"></div>
               
               <div className="flex items-center gap-4 mb-10">
                  <div className="w-14 h-14 bg-primary-light/50 rounded-2xl flex items-center justify-center shrink-0">
                     <Quote className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-black text-foreground">The Story Behind Lensora</h2>
               </div>
               
               <div className="space-y-6 text-lg text-text-muted leading-relaxed font-medium">
                  <p>
                     It started when we realized how broken the photography booking process was. We noticed that incredibly talented photographers were spending hours managing DMs, negotiating prices, and organizing schedules manually instead of doing what they love—taking photos.
                  </p>
                  <p>
                     On the other side, clients were frustrated. Finding the right photographer meant endless Instagram scrolling, trying to guess if their style matched, and dealing with unclear "DM for price" games. Comparing two photographers felt impossible.
                  </p>
                  <p className="text-foreground font-bold">
                     We built Lensora to bridge this gap. We wanted a transparent, human-centric platform where style and budget align perfectly, and where independent photographers can run their business with dignity and efficiency.
                  </p>
               </div>
            </motion.div>
         </div>
      </section>

      {/* 3. Meet The Team */}
      <section className="py-32 bg-[#FAFAFB] px-4 sm:px-6 lg:px-8 relative">
         <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2"></div>
         
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
               <h2 className="text-4xl font-extrabold mb-4 text-foreground">Meet The Team</h2>
               <p className="text-text-muted text-xl max-w-2xl mx-auto font-medium">A small group of passionate builders working to empower creators.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
               {TEAM.map((member, i) => (
                  <motion.div 
                     key={member.id} 
                     initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                     whileHover={{ y: -10 }}
                     className="bg-white rounded-[2.5rem] p-6 shadow-xl shadow-primary/5 border border-border group relative overflow-hidden"
                  >
                     <div className="aspect-[4/5] rounded-[2rem] overflow-hidden relative mb-8">
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                           <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl text-xs font-black text-primary uppercase tracking-widest shadow-lg">
                              {member.role}
                           </div>
                        </div>
                     </div>
                     <div className="px-2 text-center">
                        <h3 className="font-extrabold text-2xl text-foreground mb-3">{member.name}</h3>
                        <p className="text-sm font-medium text-text-muted leading-relaxed">{member.bio}</p>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* 4. Why Trust Lensora */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
         <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-20">
               <h2 className="text-4xl font-extrabold mb-4">Built on Trust</h2>
               <p className="text-text-muted text-xl font-medium max-w-2xl mx-auto">We don't just connect people, we ensure every session is safe, reliable, and exactly as promised.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {[
                  { icon: CheckCircle2, title: "Verified Photographer", desc: "Every professional is curated and identity-verified.", color: "text-teal", bg: "bg-teal/10" },
                  { icon: Search, title: "Transparent Pricing", desc: "Clear packages, upfront costs, and zero hidden fees.", color: "text-primary", bg: "bg-primary-light/50" },
                  { icon: Star, title: "Trusted Reviews", desc: "Authentic feedback strictly from real completed clients.", color: "text-amber", bg: "bg-amber/10" },
                  { icon: ShieldCheck, title: "Safe Booking", desc: "Secure payments and protected dates for your peace of mind.", color: "text-red-500", bg: "bg-red-50" }
               ].map((item, i) => (
                  <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                     whileHover={{ y: -8, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)" }}
                     className="bg-white p-8 rounded-[2rem] border border-border flex flex-col shadow-sm transition-all duration-300"
                  >
                     <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${item.bg}`}>
                        <item.icon className={`w-7 h-7 ${item.color}`} />
                     </div>
                     <h3 className="font-extrabold text-lg mb-3 leading-tight">{item.title}</h3>
                     <p className="text-sm text-text-muted font-medium leading-relaxed">{item.desc}</p>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* 5. Vision */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-surface-2 text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-5"></div>
         <div className="max-w-4xl mx-auto relative z-10">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
               <Target className="w-16 h-16 text-primary mx-auto mb-8 drop-shadow-md" />
               <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-8 text-foreground leading-tight">
                  Building The Future of <br className="hidden sm:block" /> Photography Booking.
               </h2>
               <p className="text-xl md:text-2xl text-text-muted leading-relaxed font-medium max-w-3xl mx-auto">
                  Our vision is simple: to become the default home for independent photographers to run their entire business, and the most reliable place for anyone to capture their most important memories.
               </p>
            </motion.div>
         </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white text-center">
         <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-10 tracking-tight">Ready To Find Your Photographer?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
               <Link href="/explore" className="w-full sm:w-auto px-10 py-5 bg-primary hover:bg-primary-hover text-white text-lg font-extrabold rounded-2xl transition-all shadow-[0_10px_30px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_15px_40px_-10px_rgba(37,99,235,0.5)] hover:-translate-y-1 flex items-center justify-center gap-2">
                  Explore Photographer <ArrowRight className="w-5 h-5" />
               </Link>
               <Link href="/vendor-onboarding" className="w-full sm:w-auto px-10 py-5 bg-white hover:bg-surface-2 border-2 border-border text-foreground text-lg font-extrabold rounded-2xl transition-all">
                  Become Photographer
               </Link>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
