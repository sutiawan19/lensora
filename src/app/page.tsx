import { Camera } from "lucide-react";
import Hero from "@/components/Hero";
import WhyLensora from "@/components/WhyLensora";
import CoreFeatures from "@/components/CoreFeatures";
import HowItWorks from "@/components/HowItWorks";
import Categories from "@/components/Categories";
import FeaturedPhotographers from "@/components/FeaturedPhotographers";
import Statistics from "@/components/Statistics";
import VendorCTA from "@/components/VendorCTA";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-foreground">
            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            Lensora<span className="text-primary">.</span>
          </div>
          <div className="hidden md:flex gap-8 items-center text-sm font-semibold text-text-muted">
            <a href="#" className="hover:text-primary transition-colors">Fitur</a>
            <Link href="/explore" className="hover:text-primary transition-colors">Fotografer</Link>
            <a href="#" className="hover:text-primary transition-colors">Harga</a>
          </div>
          <div className="flex gap-3 items-center">
            <Link href="/login" className="text-sm font-bold text-text-muted hover:text-foreground transition-colors hidden sm:block">Masuk</Link>
            <Link href="/register" className="px-5 py-2 bg-primary hover:bg-primary-hover rounded-xl text-white text-sm font-bold transition-colors shadow-sm">Daftar</Link>
          </div>
        </div>
      </nav>

      <Hero />
      <WhyLensora />
      <CoreFeatures />
      <HowItWorks />
      <Categories />
      <FeaturedPhotographers />
      <Statistics />
      <Testimonials />
      <VendorCTA />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
