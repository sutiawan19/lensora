"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ComparePackage = {
  vendorName: string;
  name: string;
  price: string;
  duration: string;
  photos: string;
  revision: string;
  delivery: string;
  recommended: boolean;
  rating: number;
  summary: string;
  features: Record<string, boolean>;
  details: {
    duration: string;
    photos: string;
    revision: string;
    delivery: string;
    locationCoverage?: string;
    rawFiles?: string;
    availableDates?: string;
    [key: string]: string | undefined;
  };
};

interface CompareContextType {
  compareList: ComparePackage[];
  showCompareModal: boolean;
  setShowCompareModal: (show: boolean) => void;
  toggleCompare: (pkg: ComparePackage) => void;
  removeCompare: (pkgName: string, vendorName: string) => void;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareList, setCompareList] = useState<ComparePackage[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem("lensora_compare");
    if (saved) {
      try {
        setCompareList(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse compare list");
      }
    }
    setIsInitialized(true);
  }, []);

  // Sync to sessionStorage when updated
  useEffect(() => {
    if (isInitialized) {
      sessionStorage.setItem("lensora_compare", JSON.stringify(compareList));
    }
  }, [compareList, isInitialized]);

  const toggleCompare = (pkg: ComparePackage) => {
    setCompareList(prev => {
      const exists = prev.find(p => p.name === pkg.name && p.vendorName === pkg.vendorName);
      if (exists) {
        return prev.filter(p => !(p.name === pkg.name && p.vendorName === pkg.vendorName));
      }
      if (prev.length < 3) {
        return [...prev, pkg];
      } else {
        alert("Maksimal 3 paket untuk dibandingkan");
        return prev;
      }
    });
  };

  const removeCompare = (pkgName: string, vendorName: string) => {
    setCompareList(prev => prev.filter(p => !(p.name === pkgName && p.vendorName === vendorName)));
  };

  const clearCompare = () => {
    setCompareList([]);
    setShowCompareModal(false);
  };

  return (
    <CompareContext.Provider value={{ compareList, showCompareModal, setShowCompareModal, toggleCompare, removeCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
}
