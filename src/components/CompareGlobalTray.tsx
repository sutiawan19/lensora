"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Minus, ChevronDown, ChevronUp, Star, CalendarCheck, CalendarX, Sparkles, CheckCircle2, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useCompare } from "@/context/CompareContext";
import { useEffect, useState } from "react";

const parsePrice = (priceStr: string) => {
  if (!priceStr) return 0;
  return parseInt(priceStr.replace(/[^0-9]/g, ""), 10);
};

const formatPrice = (num: number) => {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);
};

export default function CompareGlobalTray() {
  const { compareList, showCompareModal, setShowCompareModal, removeCompare, clearCompare } = useCompare();
  const [mounted, setMounted] = useState(false);
  const [showIdentical, setShowIdentical] = useState(false);
  const [showDetails, setShowDetails] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // 1. Analyze Features
  const allFeatures = Array.from(new Set(compareList.flatMap(p => Object.keys(p.features || {}))));
  
  const identicalFeatures = allFeatures.filter(feat => {
    if (compareList.length < 2) return true;
    const values = new Set(compareList.map(p => !!p.features?.[feat]));
    return values.size === 1;
  });

  const differentFeatures = allFeatures.filter(feat => {
    if (compareList.length < 2) return false;
    const values = new Set(compareList.map(p => !!p.features?.[feat]));
    return values.size > 1;
  });

  // 2. Analyze Details
  const allDetailKeys = Array.from(new Set(compareList.flatMap(p => Object.keys(p.details || {}))));
  const isDifferentDetail = (key: string) => {
    if (compareList.length < 2) return false;
    const values = new Set(compareList.map(p => p.details?.[key]));
    return values.size > 1;
  };

  // 3. Analyze Price & Insights
  let priceInsight = "";
  let priceDiff = 0;
  let cheapestName = "";
  let expensiveName = "";

  if (compareList.length === 2) {
    const p1 = parsePrice(compareList[0].price);
    const p2 = parsePrice(compareList[1].price);
    priceDiff = Math.abs(p1 - p2);
    
    if (p1 > p2) {
      expensiveName = compareList[0].name;
      cheapestName = compareList[1].name;
    } else if (p2 > p1) {
      expensiveName = compareList[1].name;
      cheapestName = compareList[0].name;
    }

    if (priceDiff > 0) priceInsight = `Selisih mulai ${formatPrice(priceDiff)}`;
  }

  // 4. Recommendation
  const recommendedPkg = compareList.find(p => p.recommended) || compareList[0];
  const getExtraFeatures = (pkg: any) => differentFeatures.filter(f => pkg.features?.[f]);
  const recommendedExtraFeatures = recommendedPkg ? getExtraFeatures(recommendedPkg) : [];

  return (
    <>
      {/* Floating Tray */}
      <AnimatePresence>
        {compareList.length > 0 && !showCompareModal && (
          <motion.div
            initial={{ y: 150, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 150, opacity: 0 }}
            className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-[#2563EB] text-white p-3 md:p-4 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_20px_40px_rgba(37,99,235,0.4)] flex flex-col md:flex-row items-center gap-4 md:gap-6 w-[95%] max-w-4xl border border-blue-400/30"
          >
            <div className="flex-1 flex flex-col gap-3 w-full overflow-hidden">
              {priceInsight && (
                <div className="flex items-center gap-2 text-blue-200 text-[10px] md:text-xs font-bold tracking-widest uppercase ml-1">
                  <Sparkles className="w-3.5 h-3.5" /> {compareList.length} Paket Dipilih • {priceInsight}
                </div>
              )}
              <div className="flex gap-3 overflow-x-auto hide-scrollbar snap-x w-full">
                {compareList.map(p => (
                   <div key={`${p.vendorName}-${p.name}`} className="snap-start bg-white/10 px-4 py-2.5 rounded-[1rem] shrink-0 flex items-center gap-3 min-w-[160px] max-w-[200px]">
                     <div className="flex flex-col min-w-0">
                       <span className="text-[10px] text-blue-200 font-bold leading-tight uppercase tracking-wider truncate">{p.vendorName}</span>
                       <span className="text-sm font-black truncate">{p.name}</span>
                     </div>
                     <button onClick={() => removeCompare(p.name, p.vendorName)} className="p-1.5 hover:bg-white/20 rounded-full ml-auto shrink-0 transition-colors"><X className="w-3 h-3 text-white"/></button>
                   </div>
                ))}
                {compareList.length < 3 && (
                   <div className="snap-start px-4 py-2 flex items-center justify-center text-[10px] text-blue-300 font-bold border border-dashed border-blue-400/50 rounded-[1rem] whitespace-nowrap min-w-[120px]">
                     + Tambah ({3 - compareList.length})
                   </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2 w-full md:w-auto shrink-0 border-t border-blue-400/30 md:border-t-0 pt-3 md:pt-0">
               <button onClick={clearCompare} className="p-3 md:p-2.5 rounded-xl text-blue-300 hover:text-white hover:bg-white/10 transition-colors" title="Hapus Semua">
                 <X className="w-4 h-4 md:w-5 md:h-5" />
               </button>
               <button 
                 onClick={() => setShowCompareModal(true)}
                 disabled={compareList.length < 2}
                 className={`flex-1 md:flex-none px-6 py-3.5 md:py-3 rounded-xl font-black text-sm transition-all whitespace-nowrap shadow-lg ${compareList.length >= 2 ? "bg-white text-[#2563EB] hover:bg-blue-50 hover:-translate-y-1 shadow-blue-900/20" : "bg-blue-600/50 text-blue-300 cursor-not-allowed shadow-none"}`}
               >
                 Bandingkan Sekarang
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Compare Modal */}
      <AnimatePresence>
        {showCompareModal && (
          <motion.div
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
             className="fixed inset-0 z-[110] bg-[#0F172A]/70 backdrop-blur-md flex items-end md:items-center justify-center p-0 md:p-6"
          >
             <motion.div
                initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="bg-[#F8FAFF] w-full md:max-w-7xl h-[95vh] md:h-[90vh] rounded-t-[2.5rem] md:rounded-[3rem] shadow-2xl flex flex-col overflow-hidden relative"
             >
                {/* Header */}
                <div className="p-5 md:p-8 border-b border-slate-200 flex items-center justify-between bg-white z-20 shrink-0">
                   <div>
                     <h2 className="text-xl md:text-3xl font-black text-[#0F172A] tracking-tight">Smart Compare</h2>
                     <p className="text-xs md:text-sm font-bold text-slate-500 mt-1">Pilih yang paling cocok buatmu tanpa ribet.</p>
                   </div>
                   <button onClick={() => setShowCompareModal(false)} className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-500 transition-colors shadow-sm">
                     <X className="w-5 h-5 md:w-6 md:h-6" />
                   </button>
                </div>
                
                <div className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col hide-scrollbar">
                   {/* Top Banner: Recommendation */}
                   {recommendedPkg && compareList.length > 1 && (
                      <div className="p-5 md:p-8 bg-gradient-to-br from-blue-50 to-[#F8FAFF] border-b border-blue-100/50 flex flex-col md:flex-row gap-5 md:gap-6 md:items-center">
                         <div className="shrink-0 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl shadow-[0_10px_20px_rgba(37,99,235,0.1)] border border-blue-100">
                            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-[#2563EB]" />
                         </div>
                         <div>
                            <div className="flex items-center gap-2 mb-2">
                               <span className="bg-[#2563EB] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">Lensora Merekomendasikan</span>
                            </div>
                            <h3 className="text-lg md:text-xl font-black text-[#0F172A] mb-2">{recommendedPkg.name} oleh {recommendedPkg.vendorName}</h3>
                            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs md:text-sm font-bold text-slate-600">
                               <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#2563EB]"/> Harga sangat worth it</span>
                               {recommendedExtraFeatures.length > 0 && (
                                  <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#2563EB]"/> Benefit ekstra: {recommendedExtraFeatures.slice(0, 2).join(', ')}</span>
                               )}
                               <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#2563EB]"/> Rating sangat memuaskan ({recommendedPkg.rating})</span>
                            </div>
                         </div>
                      </div>
                   )}

                   {/* Cards Container */}
                   <div className="p-5 md:p-8 flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory flex-1 items-start">
                     {compareList.map(p => {
                        const isExpensive = p.name === expensiveName;
                        const isCheapest = p.name === cheapestName && priceDiff > 0;
                        const extraFeats = getExtraFeatures(p);
                        const isUnavailable = p.details?.availableDates?.toLowerCase().includes("tidak");

                        return (
                           <div key={`${p.vendorName}-${p.name}`} className={`snap-center shrink-0 w-[85vw] md:w-[400px] bg-white rounded-[2rem] border transition-all duration-300 flex flex-col overflow-hidden ${p.recommended ? "border-[#2563EB] shadow-[0_15px_40px_rgba(37,99,235,0.12)] ring-4 ring-blue-50" : "border-slate-200 shadow-sm"}`}>
                              
                              <div className="p-6 md:p-8 border-b border-slate-100 bg-white sticky top-0 z-10 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.02)]">
                                 {/* Availability UX */}
                                 <div className={`mb-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-black tracking-wide ${isUnavailable ? "bg-red-50 border-red-100 text-red-600" : "bg-green-50 border-green-100 text-green-700"}`}>
                                    {isUnavailable ? <CalendarX className="w-4 h-4"/> : <CalendarCheck className="w-4 h-4"/>}
                                    {isUnavailable ? "Tanggal Penuh" : (p.details?.availableDates || "Tersedia")}
                                 </div>

                                 <div className="flex items-center justify-between mb-3">
                                    <span className="text-[10px] md:text-xs font-black text-slate-400 tracking-widest uppercase truncate max-w-[150px]">{p.vendorName}</span>
                                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
                                       <Star className="w-3 h-3 fill-yellow-500 text-yellow-500"/>
                                       <span className="text-xs font-bold text-yellow-700">{p.rating || "4.9"}</span>
                                    </div>
                                 </div>
                                 <h3 className="text-2xl font-black text-[#0F172A] leading-tight mb-2">{p.name}</h3>
                                 <p className="text-3xl font-black text-[#2563EB] mb-4">{p.price}</p>
                                 
                                 {/* Price Difference Insight */}
                                 {priceDiff > 0 && compareList.length === 2 && (
                                    <div className={`p-3 md:p-4 rounded-xl border mb-6 ${isExpensive ? "bg-blue-50/50 border-blue-100" : "bg-green-50/50 border-green-100"}`}>
                                       <div className="flex items-start gap-3">
                                          <TrendingUp className={`w-5 h-5 shrink-0 mt-0.5 ${isExpensive ? "text-[#2563EB]" : "text-green-600 rotate-180"}`} />
                                          <div>
                                             <p className={`text-sm font-black mb-1 ${isExpensive ? "text-[#0F172A]" : "text-green-700"}`}>
                                                {isExpensive ? `+${formatPrice(priceDiff)} lebih mahal` : `Lebih hemat ${formatPrice(priceDiff)}`}
                                             </p>
                                             {isExpensive && extraFeats.length > 0 && (
                                                <p className="text-xs font-bold text-slate-500 leading-relaxed">
                                                   Namun dapat: <span className="text-[#2563EB]">{extraFeats.join(', ')}</span>
                                                </p>
                                             )}
                                          </div>
                                       </div>
                                    </div>
                                 )}

                                 <Link 
                                    href={`/book/${encodeURIComponent(p.vendorName)}?pkg=${encodeURIComponent(p.name)}`} 
                                    onClick={() => setShowCompareModal(false)}
                                    className={`w-full block py-4 rounded-xl font-black transition-all text-center text-sm shadow-md hover:-translate-y-1 ${p.recommended ? "bg-[#2563EB] text-white hover:bg-blue-700 shadow-blue-500/25" : "bg-white text-[#0F172A] border border-slate-200 hover:bg-slate-50"}`}
                                 >
                                    Booking Paket Ini
                                 </Link>
                              </div>

                              <div className="p-6 md:p-8 flex-1 flex flex-col gap-8 bg-slate-50/30">
                                 {/* Perbedaan Utama */}
                                 {differentFeatures.length > 0 && (
                                    <div>
                                       <h4 className="text-[10px] font-black text-slate-400 tracking-widest uppercase mb-4 flex items-center gap-2">
                                          <span className="w-3 h-[1px] bg-slate-200"></span> Perbedaan Utama
                                       </h4>
                                       <div className="flex flex-col gap-3">
                                          {differentFeatures.map(feat => {
                                             const hasFeature = p.features?.[feat];
                                             return (
                                                <div key={feat} className={`flex items-center gap-3 p-3 rounded-xl border ${hasFeature ? "bg-white border-blue-100 shadow-sm" : "bg-slate-50 border-slate-100"}`}>
                                                   <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 shadow-sm ${hasFeature ? "bg-[#2563EB]" : "bg-slate-200"}`}>
                                                      {hasFeature ? <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} /> : <Minus className="w-3.5 h-3.5 text-slate-400" strokeWidth={3} />}
                                                   </div>
                                                   <span className={`text-sm font-bold ${hasFeature ? "text-[#0F172A]" : "text-slate-400"}`}>{feat}</span>
                                                </div>
                                             )
                                          })}
                                       </div>
                                    </div>
                                 )}

                                 {/* Fitur Sama */}
                                 {identicalFeatures.length > 0 && (
                                    <div className="border-t border-slate-200 pt-6">
                                       <button onClick={() => setShowIdentical(!showIdentical)} className="w-full flex items-center justify-between text-sm font-black text-slate-600 hover:text-[#2563EB] transition-colors mb-2">
                                          Fitur Bawaan (Sama)
                                          {showIdentical ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
                                       </button>
                                       <AnimatePresence>
                                          {showIdentical && (
                                             <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="flex flex-col gap-2 overflow-hidden pt-3">
                                                {identicalFeatures.map(feat => {
                                                   const hasFeature = p.features?.[feat];
                                                   if(!hasFeature) return null;
                                                   return (
                                                      <div key={feat} className="flex items-center gap-2">
                                                         <Check className="w-4 h-4 text-slate-400" strokeWidth={3} />
                                                         <span className="text-xs font-bold text-slate-500">{feat}</span>
                                                      </div>
                                                   )
                                                })}
                                             </motion.div>
                                          )}
                                       </AnimatePresence>
                                    </div>
                                 )}

                                 {/* Detail Tambahan */}
                                 <div className="border-t border-slate-200 pt-6">
                                    <button onClick={() => setShowDetails(!showDetails)} className="w-full flex items-center justify-between text-sm font-black text-slate-600 hover:text-[#2563EB] transition-colors mb-2">
                                       Informasi Teknis
                                       {showDetails ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
                                    </button>
                                    <AnimatePresence>
                                       {showDetails && (
                                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="flex flex-col gap-2 overflow-hidden pt-3">
                                             {allDetailKeys.filter(k => k !== 'availableDates').map(key => {
                                                const val = p.details?.[key];
                                                const diff = isDifferentDetail(key);
                                                const displayKey = key.replace(/([A-Z])/g, ' $1').trim().replace(/^./, str => str.toUpperCase());
                                                return (
                                                   <div key={key} className={`p-3 rounded-xl flex items-center justify-between gap-4 transition-colors ${diff ? "bg-blue-50/50 border border-blue-100/50" : "bg-white border border-slate-100 shadow-sm"}`}>
                                                      <span className="text-[10px] font-black text-slate-400 tracking-wider uppercase shrink-0">{displayKey}</span>
                                                      <span className="text-xs font-black text-[#0F172A] text-right">{val || "-"}</span>
                                                   </div>
                                                )
                                             })}
                                          </motion.div>
                                       )}
                                    </AnimatePresence>
                                 </div>
                              </div>

                           </div>
                        )
                     })}
                   </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
