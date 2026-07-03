"use client";

import { useState, useMemo } from "react";
import {
  Bell, Search, Download, Filter, X, CreditCard, User, Package,
  Calendar as CalendarIcon, CheckCircle2, AlertCircle, Clock3,
  ChevronUp, ChevronDown as ChevronDownIcon, ChevronLeft, ChevronRight,
} from "lucide-react";
import { useFotografer, formatRupiah, StatusPembayaran, Order } from "@/context/FotograferContext";

// ─── Badge configs ────────────────────────────────────────────────────────────
const PAY_BADGE: Record<StatusPembayaran, { bg: string; Icon: any }> = {
  "Menunggu Pembayaran": { bg: "bg-red-100 text-red-800 ring-1 ring-red-300",       Icon: AlertCircle },
  "DP Dibayar":          { bg: "bg-blue-100 text-blue-800 ring-1 ring-blue-300",     Icon: Clock3 },
  "Lunas":               { bg: "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300", Icon: CheckCircle2 },
};

const PAGE_SIZE = 5;

// ─── Component ────────────────────────────────────────────────────────────────
export default function TransaksiPage() {
  const { orders } = useFotografer();

  const [searchQuery, setSearchQuery]   = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTrx, setSelectedTrx]  = useState<Order | null>(null);
  const [sortDir, setSortDir]           = useState<"desc" | "asc">("desc");
  const [page, setPage]                 = useState(1);

  const statuses: (StatusPembayaran | "Semua")[] = ["Semua", "Menunggu Pembayaran", "DP Dibayar", "Lunas"];

  // ── Sort + filter ──
  // IMPORTANT: spread [...] before .sort() to avoid mutating the memoized cache
  const filteredData = useMemo(() => {
    const q = searchQuery.toLowerCase();
    const filtered = orders.filter((o) => {
      const matchQ =
        o.invoiceId.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q) ||
        o.client.toLowerCase().includes(q);
      const matchF = filterStatus === "Semua" || o.statusPembayaran === filterStatus;
      return matchQ && matchF;
    });
    return [...filtered].sort((a, b) => {
      const aTime = new Date(a.date).getTime();
      const bTime = new Date(b.date).getTime();
      return sortDir === "desc" ? bTime - aTime : aTime - bTime;
    });
  }, [orders, searchQuery, filterStatus, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / PAGE_SIZE));
  const paginated  = filteredData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilterChange = (s: string) => { setFilterStatus(s); setIsFilterOpen(false); setPage(1); };
  const handleSearch = (v: string) => { setSearchQuery(v); setPage(1); };

  const SortIcon = sortDir === "desc" ? ChevronDownIcon : ChevronUp;

  // Export CSV
  const handleExportCSV = () => {
    let csv = "Invoice,ID Pesanan,Klien,Paket,Total Tagihan,Dibayar,Sisa,Tanggal,Status Pembayaran\n";
    filteredData.forEach((o) => {
      const sisa = o.price - o.dpAmount;
      csv += `"${o.invoiceId}","${o.id}","${o.client}","${o.package}","${o.price}","${o.dpAmount}","${sisa}","${o.dateDisplay}","${o.statusPembayaran}"\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = `transaksi_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  };

  return (
    <>
      {/* ── Topbar ── */}
      <header className="h-16 bg-white border-b border-border hidden md:flex items-center justify-between px-8 sticky top-0 z-40">
        <div className="flex items-center gap-3 bg-surface-2 rounded-xl px-4 py-2 border border-border w-96">
          <Search className="w-4 h-4 text-text-muted" />
          <input type="text" placeholder="Cari invoice, ID pesanan, atau klien..." className="bg-transparent text-sm outline-none w-full"
            value={searchQuery} onChange={(e) => handleSearch(e.target.value)} />
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-text-muted hover:bg-surface-2 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <div className="w-px h-6 bg-border"></div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-foreground">Fotografer Pro</p>
              <p className="text-xs text-text-muted">Vendor</p>
            </div>
            <img src="https://i.pravatar.cc/100?img=33" alt="Profile" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
          </div>
        </div>
      </header>

      <main className="p-4 md:p-8">
        {/* ── Page header + actions ── */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground mb-1">List Transaksi</h1>
            <p className="text-text-muted">Riwayat pembayaran dari klien Anda.</p>
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {/* Sort */}
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
                <div className="absolute right-0 mt-2 w-56 bg-white border border-border rounded-xl shadow-lg z-50 py-1">
                  {statuses.map((s) => (
                    <button key={s} onClick={() => handleFilterChange(s)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-surface-1 transition-colors ${filterStatus === s ? "font-bold text-primary" : "text-foreground"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Export */}
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
            <input type="text" placeholder="Cari invoice, ID pesanan, atau klien..." className="bg-transparent text-base outline-none w-full"
              value={searchQuery} onChange={(e) => handleSearch(e.target.value)} />
          </div>
        </div>

        {/* ── Table ── */}
        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[720px]">
              <thead>
                <tr className="bg-surface-2 border-b border-border text-xs text-text-muted">
                  <th className="p-4 font-bold uppercase tracking-wider">Invoice</th>
                  <th className="p-4 font-bold uppercase tracking-wider">Klien</th>
                  <th className="p-4 font-bold uppercase tracking-wider">Total Tagihan</th>
                  <th className="p-4 font-bold uppercase tracking-wider">Pembayaran</th>
                  <th className="p-4 font-bold uppercase tracking-wider cursor-pointer select-none" onClick={() => { setSortDir(d => d === "desc" ? "asc" : "desc"); setPage(1); }}>
                    <span className="flex items-center gap-1">Tanggal <SortIcon className="w-3.5 h-3.5" /></span>
                  </th>
                  <th className="p-4 font-bold uppercase tracking-wider">Status Bayar</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length > 0 ? paginated.map((o) => {
                  const badge = PAY_BADGE[o.statusPembayaran];
                  const sisa  = o.price - o.dpAmount;
                  return (
                    <tr key={o.id} className="border-b border-border last:border-0 hover:bg-surface-1 transition-colors">
                      <td className="p-4">
                        <div className="font-semibold text-sm">{o.invoiceId}</div>
                        <div className="text-xs text-text-muted mt-0.5">Ref: {o.id}</div>
                      </td>
                      <td className="p-4 text-sm">{o.client}</td>
                      <td className="p-4 font-bold text-sm">{formatRupiah(o.price)}</td>

                      {/* ── Pembayaran column: clear two-line layout ── */}
                      <td className="p-4">
                        {o.statusPembayaran === "Menunggu Pembayaran" ? (
                          <span className="text-sm text-text-muted">Belum ada pembayaran</span>
                        ) : o.statusPembayaran === "DP Dibayar" ? (
                          <div className="flex flex-col gap-1">
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-sm font-bold text-blue-700">{formatRupiah(o.dpAmount)}</span>
                              <span className="text-xs text-text-muted font-medium">dibayar</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                              <span className="text-xs text-amber-700 font-semibold">Sisa {formatRupiah(sisa)}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-bold text-emerald-700">{formatRupiah(o.dpAmount)}</span>
                            <span className="text-xs text-emerald-600 font-medium">Lunas ✓</span>
                          </div>
                        )}
                      </td>

                      <td className="p-4 text-sm">{o.dateDisplay}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap ${badge.bg}`}>
                          <badge.Icon className="w-3 h-3" /> {o.statusPembayaran}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button onClick={() => setSelectedTrx(o)} className="text-primary font-bold hover:underline text-sm">
                          Detail
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
                        <p className="font-semibold text-base">Tidak ada transaksi yang sesuai</p>
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
              <span>Menampilkan {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filteredData.length)} dari {filteredData.length} transaksi</span>
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
      {selectedTrx && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-surface-2">
              <div>
                <h2 className="text-lg font-extrabold text-foreground">Rincian Pembayaran</h2>
                <p className="text-sm text-text-muted font-medium">{selectedTrx.invoiceId}</p>
              </div>
              <button onClick={() => setSelectedTrx(null)} className="p-2 bg-white rounded-full text-text-muted hover:text-foreground hover:bg-surface-1 transition-colors border border-border">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {/* ─ Nominal summary ─ */}
              <div className="flex flex-col items-center text-center mb-6 pb-6 border-b border-border">
                <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Total Telah Dibayar</p>
                <p className={`text-4xl font-extrabold ${selectedTrx.statusPembayaran === "Lunas" ? "text-emerald-600" : selectedTrx.statusPembayaran === "DP Dibayar" ? "text-blue-600" : "text-foreground"}`}>
                  {formatRupiah(selectedTrx.dpAmount)}
                </p>
                {selectedTrx.statusPembayaran === "DP Dibayar" && (
                  <div className="mt-3 px-4 py-2 bg-amber-50 border border-amber-200 rounded-xl">
                    <p className="text-sm font-semibold text-amber-800">
                      Sisa tagihan: <strong>{formatRupiah(selectedTrx.price - selectedTrx.dpAmount)}</strong>
                    </p>
                  </div>
                )}
              </div>

              {/* ─ Info rows ─ */}
              <div className="space-y-3 mb-6">
                {[
                  { Icon: User, label: "Klien", value: selectedTrx.client },
                  { Icon: Package, label: "Paket", value: selectedTrx.package },
                  { Icon: CalendarIcon, label: "Tanggal Sesi", value: selectedTrx.dateDisplay },
                  { Icon: CreditCard, label: "Total Tagihan", value: formatRupiah(selectedTrx.price) },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                    <div className="flex items-center gap-3"><Icon className="w-4 h-4 text-text-muted" /><span className="text-sm font-medium text-text-muted">{label}</span></div>
                    <span className="text-sm font-bold text-foreground">{value}</span>
                  </div>
                ))}
              </div>

              {/* ─ Timeline ─ */}
              <div className="bg-surface-2 p-4 rounded-2xl">
                <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Riwayat Transaksi</h3>
                <div className="space-y-3">
                  {[
                    { show: true, color: "bg-primary", label: "Pesanan Dibuat", sub: selectedTrx.dateDisplay },
                    { show: selectedTrx.statusPembayaran !== "Menunggu Pembayaran", color: "bg-blue-500", label: `Pembayaran DP — ${formatRupiah(selectedTrx.dpAmount)}`, sub: selectedTrx.dateDisplay },
                    { show: selectedTrx.statusPembayaran === "Lunas", color: "bg-emerald-500", label: `Pelunasan — ${formatRupiah(selectedTrx.price)}`, sub: selectedTrx.dateDisplay },
                  ].filter(t => t.show).map((t, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-4 h-4 rounded-full ${t.color} flex items-center justify-center shrink-0 mt-0.5`}>
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">{t.label}</p>
                        <p className="text-xs text-text-muted">{t.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
