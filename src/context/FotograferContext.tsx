"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type StatusPesanan = "Menunggu Konfirmasi" | "Diterima" | "Selesai" | "Ditolak";
export type StatusPembayaran = "Menunggu Pembayaran" | "DP Dibayar" | "Lunas";

export interface Order {
  id: string;           // ORD-001
  invoiceId: string;    // INV-001
  client: string;
  phone: string;
  package: string;
  price: number;        // total price in rupiah
  dpAmount: number;     // dp paid so far
  date: string;         // "2026-07-10" ISO format for filtering
  dateDisplay: string;  // "10 Juli 2026"
  time: string;
  location: string;
  notes: string;
  statusPesanan: StatusPesanan;
  statusPembayaran: StatusPembayaran;
}

// ─── Seed Data ────────────────────────────────────────────────────────────────

const initialOrders: Order[] = [
  {
    id: "ORD-001",
    invoiceId: "INV-001",
    client: "Budi Santoso",
    phone: "+62 812 3456 7890",
    package: "Pre-Wedding Basic",
    price: 1500000,
    dpAmount: 0,
    date: "2026-07-24",
    dateDisplay: "24 Juli 2026",
    time: "08:00 - 12:00 WIB",
    location: "Taman Hutan Raya, Bandung",
    notes: "Mohon siapkan konsep casual outdoor. Referensi foto sudah dikirim via WhatsApp.",
    statusPesanan: "Menunggu Konfirmasi",
    statusPembayaran: "Menunggu Pembayaran",
  },
  {
    id: "ORD-002",
    invoiceId: "INV-002",
    client: "Siti Aminah",
    phone: "+62 856 7890 1234",
    package: "Graduation Premium",
    price: 2000000,
    dpAmount: 1000000,
    date: "2026-07-26",
    dateDisplay: "26 Juli 2026",
    time: "10:00 - 14:00 WIB",
    location: "Universitas Padjadjaran, Jatinangor",
    notes: "Foto bareng keluarga inti saja. Bawa lensa wide ya mas.",
    statusPesanan: "Diterima",
    statusPembayaran: "DP Dibayar",
  },
  {
    id: "ORD-003",
    invoiceId: "INV-003",
    client: "Agus Pratama",
    phone: "+62 811 2222 3333",
    package: "Personal Portrait",
    price: 800000,
    dpAmount: 800000,
    date: "2026-07-28",
    dateDisplay: "28 Juli 2026",
    time: "15:00 - 17:00 WIB",
    location: "Studio Lensora, Jakarta",
    notes: "Untuk foto profile LinkedIn dan CV.",
    statusPesanan: "Selesai",
    statusPembayaran: "Lunas",
  },
  {
    id: "ORD-004",
    invoiceId: "INV-004",
    client: "Dimas Anggara",
    phone: "+62 813 9988 7766",
    package: "Pre-Wedding Basic",
    price: 1500000,
    dpAmount: 750000,
    date: "2026-07-15",
    dateDisplay: "15 Juli 2026",
    time: "09:00 - 13:00 WIB",
    location: "Pantai Pandawa, Bali",
    notes: "Outdoor session, sore hari kalau bisa.",
    statusPesanan: "Selesai",
    statusPembayaran: "DP Dibayar",
  },
  {
    id: "ORD-005",
    invoiceId: "INV-005",
    client: "Rina Dewi",
    phone: "+62 878 5544 3322",
    package: "Graduation Premium",
    price: 2000000,
    dpAmount: 2000000,
    date: "2026-07-10",
    dateDisplay: "10 Juli 2026",
    time: "07:00 - 11:00 WIB",
    location: "Universitas Indonesia, Depok",
    notes: "Wisuda pagi, mohon tepat waktu.",
    statusPesanan: "Selesai",
    statusPembayaran: "Lunas",
  },
];

// ─── Context ──────────────────────────────────────────────────────────────────

interface FotograferContextType {
  orders: Order[];
  updateStatusPesanan: (id: string, status: StatusPesanan) => void;
  updateStatusPembayaran: (id: string, status: StatusPembayaran) => void;
}

const FotograferContext = createContext<FotograferContextType | null>(null);

export function FotograferProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const updateStatusPesanan = (id: string, status: StatusPesanan) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        // Auto update payment status when order is completed
        let statusPembayaran = o.statusPembayaran;
        if (status === "Selesai") statusPembayaran = "Lunas";
        if (status === "Diterima" && statusPembayaran === "Menunggu Pembayaran") statusPembayaran = "DP Dibayar";
        return { ...o, statusPesanan: status, statusPembayaran };
      })
    );
  };

  const updateStatusPembayaran = (id: string, status: StatusPembayaran) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, statusPembayaran: status } : o))
    );
  };

  return (
    <FotograferContext.Provider value={{ orders, updateStatusPesanan, updateStatusPembayaran }}>
      {children}
    </FotograferContext.Provider>
  );
}

export function useFotografer() {
  const ctx = useContext(FotograferContext);
  if (!ctx) throw new Error("useFotografer must be used within FotograferProvider");
  return ctx;
}

// ─── Helper Utilities ─────────────────────────────────────────────────────────

export function formatRupiah(amount: number): string {
  return "Rp " + amount.toLocaleString("id-ID");
}
