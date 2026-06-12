"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface ComparePackage {
  id: string; // format: "photographerId-packageId"
  photographerName: string;
  photographerAvatar: string;
  packageName: string;
  packagePrice: string;
}

export const getCompareList = (): ComparePackage[] => {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem("lensora_compare");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const setCompareList = (list: ComparePackage[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("lensora_compare", JSON.stringify(list));
  window.dispatchEvent(new Event("compare-updated"));
};

export const addPackageToCompare = (pkg: ComparePackage) => {
  const current = getCompareList();
  if (current.find(p => p.id === pkg.id)) {
    // remove if already exists (toggle)
    setCompareList(current.filter(p => p.id !== pkg.id));
  } else {
    if (current.length < 3) {
      setCompareList([...current, pkg]);
    } else {
      alert("Maksimal membandingkan 3 paket sekaligus.");
    }
  }
};

export default function CompareTray() {
  const [list, setList] = useState<ComparePackage[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    setList(getCompareList());
    
    const handleUpdate = () => {
      setList(getCompareList());
    };

    window.addEventListener("compare-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate); // For cross-tab syncing
    
    return () => {
      window.removeEventListener("compare-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  // Do not show on compare page
  if (pathname === "/compare") return null;

  return (
    <AnimatePresence>
       {list.length > 0 && (
          <motion.div 
             initial={{ y: 100, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             exit={{ y: 100, opacity: 0 }}
             className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-2xl bg-white rounded-3xl shadow-2xl border border-border p-4 flex flex-col md:flex-row items-center justify-between gap-4"
          >
             <div className="flex flex-col w-full md:w-auto overflow-hidden">
                <p className="text-xs font-bold text-text-muted mb-3 text-center md:text-left">{list.length}/3 Paket Dipilih</p>
                <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
                   {list.map(pkg => (
                      <div key={pkg.id} className="flex items-center gap-2 bg-surface-2 pr-4 rounded-full border border-border shrink-0 hover:border-primary/50 transition-colors">
                         <img src={pkg.photographerAvatar} alt={pkg.photographerName} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm shrink-0" />
                         <div className="flex flex-col py-1">
                            <span className="text-[10px] font-extrabold text-text-muted leading-none uppercase tracking-wide">{pkg.photographerName}</span>
                            <span className="text-xs font-bold text-foreground leading-tight mt-0.5">{pkg.packageName}</span>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
             <div className="flex items-center gap-4 w-full md:w-auto justify-end shrink-0 pt-2 md:pt-0 border-t border-border md:border-0 mt-2 md:mt-0">
                <button onClick={() => setCompareList([])} className="text-xs font-bold text-text-muted hover:text-foreground transition-colors px-2">Reset</button>
                <Link href={`/compare?packages=${list.map(l => l.id).join(',')}`} className="px-6 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl text-sm transition-colors shadow-sm text-center flex-1 md:flex-none">
                   Bandingkan
                </Link>
             </div>
          </motion.div>
       )}
    </AnimatePresence>
  );
}
