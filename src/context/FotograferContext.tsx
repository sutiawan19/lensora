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
  dpAmount: number;     // dp paid so far (independent of session status)
  bookingDate: string;  // "2026-07-01" ISO format
  bookingDateDisplay: string; // "1 Juli 2026"
  sessionDate: string;  // "2026-07-24" ISO format
  sessionDateDisplay: string; // "24 Juli 2026"
  time: string;
  location: string;
  notes: string;
  statusPesanan: StatusPesanan;
  statusPembayaran: StatusPembayaran;
}

// ─── Seed Data ────────────────────────────────────────────────────────────────
// NOTE: statusPesanan (sesi) and statusPembayaran (payment) are INDEPENDENT.
// A session can be "Selesai" (done) while payment is still "DP Dibayar" (partial) —
// this is a valid real-world case where the photographer has finished the shoot
// but hasn't received full payment yet.

const initialOrders: Order[] = [
  {
    id: "ORD-001",
    invoiceId: "INV-001",
    client: "Budi Santoso",
    phone: "+62 812 3456 7890",
    package: "Pre-Wedding Basic",
    price: 1500000,
    dpAmount: 0,
    bookingDate: "2026-07-01",
    bookingDateDisplay: "1 Juli 2026",
    sessionDate: "2026-07-24",
    sessionDateDisplay: "24 Juli 2026",
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
    bookingDate: "2026-07-05",
    bookingDateDisplay: "5 Juli 2026",
    sessionDate: "2026-07-26",
    sessionDateDisplay: "26 Juli 2026",
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
    bookingDate: "2026-07-20",
    bookingDateDisplay: "20 Juli 2026",
    sessionDate: "2026-07-28",
    sessionDateDisplay: "28 Juli 2026",
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
    // Sesi sudah selesai, tapi klien belum melunasi — ini valid & independen
    bookingDate: "2026-06-25",
    bookingDateDisplay: "25 Juni 2026",
    sessionDate: "2026-07-15",
    sessionDateDisplay: "15 Juli 2026",
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
    bookingDate: "2026-08-01",
    bookingDateDisplay: "1 Agustus 2026",
    sessionDate: "2026-08-15",
    sessionDateDisplay: "15 Agustus 2026",
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
        // Only auto-advance payment when accepting (not on complete),
        // keeping the two statuses clearly independent.
        let statusPembayaran = o.statusPembayaran;
        if (status === "Diterima" && statusPembayaran === "Menunggu Pembayaran") {
          statusPembayaran = "DP Dibayar";
        }
        // NOTE: marking "Selesai" does NOT auto-set Lunas —
        // payment must be confirmed separately in List Transaksi.
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
