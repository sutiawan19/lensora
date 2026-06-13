import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import ExplorePhotographers from "@/components/ExplorePhotographers";
import CompareVendor from "@/components/CompareVendor";
import AIStyleMatch from "@/components/AIStyleMatch";
import BookingFlow from "@/components/BookingFlow";
import ForVendors from "@/components/ForVendors";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

import LoadingScreen from "@/components/LoadingScreen";

export const metadata: Metadata = {
  title: "Lensora — Temukan Photographer Sesuai Style Kamu",
  description:
    "Platform untuk mempermudah mencari vendor photography sesuai harga & style yang diinginkan, sekaligus mempermudah vendor mengelola booking secara lebih profesional.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#0F172A] flex flex-col overflow-x-hidden">
      <LoadingScreen />
      <Navbar />
      <Hero />
      <ProblemSolution />
      <ExplorePhotographers />
      <CompareVendor />
      <AIStyleMatch />
      <BookingFlow />
      <ForVendors />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
