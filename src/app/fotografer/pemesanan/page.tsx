"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Bell, Search, Filter, X, Calendar as CalendarIcon, MapPin, Package,
  User, Clock, FileText, Download, ChevronUp, ChevronDown as ChevronDownIcon,
  Clock3, CheckCircle2, XCircle, CheckCheck, AlertCircle, ChevronLeft, ChevronRight,
} from "lucide-react";
import { useFotografer, formatRupiah, StatusPesanan, Order } from "@/context/FotograferContext";
import FotograferTopbar from "../FotograferTopbar";
import { useSearchParams } from "next/navigation";

// ─── Badge configs ────────────────────────────────────────────────────────────
const PESANAN_BADGE: Record<StatusPesanan, { bg: string; text: string; Icon: any }> = {
  "Menunggu Konfirmasi": { bg: "bg-amber-100 text-amber-800 ring-1 ring-amber-300",   text: "Menunggu Konfirmasi", Icon: Clock3 },
  "Diterima":           { bg: "bg-blue-100 text-blue-800 ring-1 ring-blue-300",       text: "Diterima",           Icon: CheckCircle2 },
  "Selesai":            { bg: "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300", text: "Selesai",          Icon: CheckCheck },
  "Ditolak":            { bg: "bg-red-100 text-red-800 ring-1 ring-red-300",           text: "Ditolak",           Icon: XCircle },
};

const PAGE_SIZE = 5;

// ─── Component ────────────────────────────────────────────────────────────────
export default function PemesananPage() {
  const { orders, updateStatusPesanan } = useFotografer();

  const [searchQuery, setSearchQuery]   = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [sortDir, setSortDir]           = useState<"desc" | "asc">("desc");
  const [page, setPage]                 = useState(1);
  const searchParams = useSearchParams();

  const statuses = ["Semua", "Menunggu Konfirmasi", "Diterima", "Selesai", "Ditolak"];

  // Handle URL param for orderId
  useEffect(() => {
    const orderId = searchParams.get("orderId");
    if (orderId) {
      const order = orders.find(o => o.id === orderId);
      if (order) setSelectedOrder(order);
    }
  }, [searchParams, orders]);

  // ── Sort + filter ──
  // IMPORTANT: spread [...] before .sort() to avoid mutating the memoized cache
  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase();
    const filtered = orders.filter((o) => {
      const matchQ = o.client.toLowerCase().includes(q) || o.id.toLowerCase().includes(q) || o.package.toLowerCase().includes(q);
      const matchF = filterStatus === "Semua" || o.statusPesanan === filterStatus;
      return matchQ && matchF;
    });
    return [...filtered].sort((a, b) => {
      const valA = new Date(a.bookingDate).getTime();
      const valB = new Date(b.bookingDate).getTime();
      return sortDir === "asc" ? valA - valB : valB - valA;
    });
  }, [orders, searchQuery, filterStatus, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / PAGE_SIZE));
  const paginated  = filteredData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilterChange = (s: string) => { setFilterStatus(s); setIsFilterOpen(false); setPage(1); };
  const handleSearch = (v: string) => { setSearchQuery(v); setPage(1); };

  const handleUpdateStatus = (id: string, newStatus: StatusPesanan) => {
    updateStatusPesanan(id, newStatus);
    if (selectedOrder?.id === id) setSelectedOrder((p) => p ? { ...p, statusPesanan: newStatus } : null);
  };

  // Export CSV
  const handleExportCSV = () => {
    let csv = "ID Pesanan,Klien,Paket,Tanggal Booking,Tanggal Sesi,Status Sesi\n";
    filteredData.forEach((o) => {
      csv += `"${o.id}","${o.client}","${o.package}","${o.bookingDateDisplay}","${o.sessionDateDisplay}","${o.statusPesanan}"\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = `pemesanan_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  const SortIcon = sortDir === "desc" ? ChevronDownIcon : ChevronUp;

  return (
    <>
      <FotograferTopbar>
        <div className="flex items-center gap-3 bg-surface-2 rounded-xl px-4 py-2 border border-border w-96">
          <Search className="w-4 h-4 text-text-muted" />
          <input type="text" placeholder="Cari ID, klien, atau nama paket..." className="bg-transparent text-sm outline-none w-full"
            value={searchQuery} onChange={(e) => handleSearch(e.target.value)} />
        </div>
      </FotograferTopbar>
      <main className="p-4 md:p-8">
        {/* ── Page header + actions ── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground mb-1">Pemesanan</h1>
            <p className="text-text-muted">Kelola jadwal booking dari klien Anda.</p>
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {/* Sort button */}
            <button onClick={() => { setSortDir(d => d === "desc" ? "asc" : "desc"); setPage(1); }}
              className="flex items-center gap-2 bg-white border border-border px-3 py-2 rounded-xl font-semibold text-sm hover:bg-surface-2 transition-colors">
              <SortIcon className="w-4 h-4" /> Tanggal
            </button>

            {/* Filter */}
            <div className="relative">
              <button onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2 bg-white border border-border px-3 py-2 rounded-xl font-semibold text-sm hover:bg-surface-2 transition-colors">
                <Filter className="w-4 h-4" />
                {filterStatus !== "Semua" ? filterStatus : "Filter Status"}
              </button>
              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-border rounded-xl shadow-lg z-50 py-1">
                  {statuses.map((s) => (
                    <button key={s} onClick={() => handleFilterChange(s)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-surface-1 transition-colors ${filterStatus === s ? "font-bold text-primary" : "text-foreground"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Export CSV */}
            <button onClick={handleExportCSV}
              className="flex items-center gap-2 bg-primary text-white px-3 py-2 rounded-xl font-bold text-sm hover:bg-primary-dark transition-colors shadow-sm">
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mb-5">
          <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-border">
            <Search className="w-5 h-5 text-text-muted" />
            <input type="text" placeholder="Cari ID, klien, atau nama paket..." className="bg-transparent text-base outline-none w-full"
              value={searchQuery} onChange={(e) => handleSearch(e.target.value)} />
          </div>
        </div>

        {/* ── Table ── */}
        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[620px]">
              <thead>
                <tr className="bg-surface-2 border-b border-border text-xs text-text-muted">
                  <th className="p-4 font-bold uppercase tracking-wider">ID Pesanan</th>
                  <th className="p-4 font-bold uppercase tracking-wider">Klien</th>
                  <th className="p-4 font-bold uppercase tracking-wider cursor-pointer select-none" onClick={() => setSortDir(s => s === "asc" ? "desc" : "asc")}>
                    <span className="flex items-center gap-1">Tgl Booking <SortIcon className="w-3.5 h-3.5" /></span>
                  </th>
                  <th className="p-4 font-bold uppercase tracking-wider">Tgl Sesi</th>
                  <th className="p-4 font-bold uppercase tracking-wider">Paket</th>
                  <th className="p-4 font-bold uppercase tracking-wider">Status Sesi</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length > 0 ? paginated.map((order) => {
                  const badge = PESANAN_BADGE[order.statusPesanan];
                  return (
                    <tr key={order.id} className="border-b border-border last:border-0 hover:bg-surface-1 transition-colors">
                      <td className="p-4 font-semibold text-sm">{order.id}</td>
                      <td className="p-4 text-sm">{order.client}</td>
                      <td className="p-4 text-sm font-semibold text-text-muted">{order.bookingDateDisplay}</td>
                      <td className="p-4 text-sm font-semibold text-text-muted">{order.sessionDateDisplay}</td>
                      <td className="p-4 text-sm">{order.package}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap ${badge.bg}`}>
                          <badge.Icon className="w-3 h-3" /> {badge.text}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button onClick={() => setSelectedOrder(order)} className="text-primary font-bold hover:underline text-sm">
                          Lihat Detail
                        </button>
                      </td>
                    </tr>
                  );
                }) : (
                  /* ── Empty state ── */
                  <tr>
                    <td colSpan={7} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-3 text-text-muted">
                        <div className="w-16 h-16 rounded-2xl bg-surface-2 flex items-center justify-center">
                          <Search className="w-8 h-8 opacity-40" />
                        </div>
                        <p className="font-semibold text-base">Tidak ada pesanan yang sesuai</p>
                        <p className="text-sm">Coba ubah kata kunci atau filter yang digunakan.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ── */}
          {filteredData.length > PAGE_SIZE && (
            <div className="px-4 py-3 border-t border-border flex items-center justify-between text-sm text-text-muted bg-surface-1">
              <span>Menampilkan {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filteredData.length)} dari {filteredData.length} pesanan</span>
              <div className="flex items-center gap-1">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="p-1.5 rounded-lg hover:bg-surface-2 disabled:opacity-40 transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button key={n} onClick={() => setPage(n)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors ${n === page ? "bg-primary text-white" : "hover:bg-surface-2"}`}>
                    {n}
                  </button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="p-1.5 rounded-lg hover:bg-surface-2 disabled:opacity-40 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── Detail Modal ── */}
      {selectedOrder && (() => {
        const badge = PESANAN_BADGE[selectedOrder.statusPesanan];
        return (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200">
              <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-surface-2">
                <div>
                  <h2 className="text-lg font-extrabold text-foreground">Detail Pesanan</h2>
                  <p className="text-sm text-text-muted font-medium">{selectedOrder.id}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-2 bg-white rounded-full text-text-muted hover:text-foreground hover:bg-surface-1 transition-colors border border-border">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 max-h-[70vh] overflow-y-auto">
                {/* Status banner */}
                <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 border ${
                  selectedOrder.statusPesanan === "Menunggu Konfirmasi" ? "bg-amber-50 border-amber-200 text-amber-800" :
                  selectedOrder.statusPesanan === "Diterima"            ? "bg-blue-50 border-blue-200 text-blue-800" :
                  selectedOrder.statusPesanan === "Ditolak"             ? "bg-red-50 border-red-200 text-red-800" :
                                                                          "bg-emerald-50 border-emerald-200 text-emerald-800"
                }`}>
                  <badge.Icon className="w-5 h-5 shrink-0" />
                  <div>
                    <p className="font-bold text-sm">Status Sesi: {selectedOrder.statusPesanan}</p>
                    <p className="text-xs opacity-80 mt-0.5">
                      {selectedOrder.statusPesanan === "Menunggu Konfirmasi" ? "Segera konfirmasi apakah Anda bisa menerima pesanan ini." :
                       selectedOrder.statusPesanan === "Diterima"            ? "Pesanan diterima — persiapkan sesi pemotretan." :
                       selectedOrder.statusPesanan === "Ditolak"             ? "Anda telah menolak pesanan ini." :
                       "Sesi pemotretan telah selesai."}
                    </p>
                    <p className="text-xs opacity-70 mt-1 italic">
                      ⓘ Status sesi dan status pembayaran bersifat independen.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">Informasi Klien</h3>
                    <div className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center shrink-0"><User className="w-4 h-4" /></div>
                      <div>
                        <p className="text-xs text-text-muted font-medium">Nama Klien</p>
                        <p className="font-semibold text-foreground">{selectedOrder.client}</p>
                        <p className="text-sm text-text-muted mt-0.5">{selectedOrder.phone}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center shrink-0"><Package className="w-4 h-4" /></div>
                      <div>
                        <p className="text-xs text-text-muted font-medium">Paket</p>
                        <p className="font-semibold text-foreground">{selectedOrder.package}</p>
                        <p className="text-sm text-primary font-bold mt-0.5">{formatRupiah(selectedOrder.price)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">Jadwal & Lokasi</h3>
                    <div className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center shrink-0"><CalendarIcon className="w-4 h-4" /></div>
                      <div>
                        <p className="text-xs text-text-muted font-medium">Tgl Booking</p>
                        <p className="font-semibold">{selectedOrder.bookingDateDisplay}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center shrink-0"><CalendarIcon className="w-4 h-4 text-primary" /></div>
                      <div>
                        <p className="text-xs text-text-muted font-medium">Tgl Sesi</p>
                        <p className="font-semibold">{selectedOrder.sessionDateDisplay}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center shrink-0"><Clock className="w-4 h-4" /></div>
                      <div>
                        <p className="text-xs text-text-muted font-medium">Waktu</p>
                        <p className="font-semibold">{selectedOrder.time}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center shrink-0"><MapPin className="w-4 h-4" /></div>
                      <div>
                        <p className="text-xs text-text-muted font-medium">Lokasi</p>
                        <p className="font-semibold leading-snug">{selectedOrder.location}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center shrink-0"><FileText className="w-4 h-4" /></div>
                  <div className="w-full">
                    <p className="text-xs text-text-muted font-medium mb-1.5">Catatan Klien</p>
                    <div className="bg-surface-2 rounded-xl p-4">
                      <p className="text-sm text-foreground">{selectedOrder.notes}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-border bg-surface-1 flex justify-end gap-3 rounded-b-3xl">
                {selectedOrder.statusPesanan === "Menunggu Konfirmasi" ? (
                  <>
                    <button onClick={() => handleUpdateStatus(selectedOrder.id, "Ditolak")} className="px-5 py-2.5 rounded-xl font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors">
                      Tolak
                    </button>
                    <button onClick={() => handleUpdateStatus(selectedOrder.id, "Diterima")} className="px-5 py-2.5 rounded-xl font-bold text-white bg-primary hover:bg-primary-dark transition-colors shadow-sm">
                      Terima Pesanan
                    </button>
                  </>
                ) : selectedOrder.statusPesanan === "Diterima" ? (
                  <>
                    <button onClick={() => setSelectedOrder(null)} className="px-5 py-2.5 rounded-xl font-bold text-foreground bg-white border border-border hover:bg-surface-2 transition-colors">
                      Tutup
                    </button>
                    <button onClick={() => handleUpdateStatus(selectedOrder.id, "Selesai")} className="px-5 py-2.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm">
                      Tandai Selesai
                    </button>
                  </>
                ) : (
                  <button onClick={() => setSelectedOrder(null)} className="px-5 py-2.5 rounded-xl font-bold text-foreground bg-white border border-border hover:bg-surface-2 transition-colors">
                    Tutup
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
}
