"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Bell, Search, BarChart3, TrendingUp, Users, Calendar, ChevronDown, Package, Printer, Star, Receipt, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useFotografer, formatRupiah, Order } from "@/context/FotograferContext";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parseDate(isoStr: string): Date {
  const [y, m, d] = isoStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatDateInput(d: Date): string {
  return d.toISOString().split("T")[0];
}

function displayRange(from: Date, to: Date): string {
  return `${from.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })} - ${to.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}`;
}

// Map month display name → ISO date range
const MONTH_RANGES: Record<string, { from: string; to: string }> = {
  "Mei 2026":    { from: "2026-05-01", to: "2026-05-31" },
  "Juni 2026":   { from: "2026-06-01", to: "2026-06-30" },
  "Juli 2026":   { from: "2026-07-01", to: "2026-07-31" },
  "Agustus 2026":{ from: "2026-08-01", to: "2026-08-31" },
};

const PLATFORM_FEE = 0.05;

// ─── Component ────────────────────────────────────────────────────────────────

export default function LaporanPage() {
  const { orders } = useFotografer();

  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("Juli 2026");
  const [isPeriodSelectOpen, setIsPeriodSelectOpen] = useState(false);
  const [customFrom, setCustomFrom] = useState("2026-07-01");
  const [customTo, setCustomTo] = useState("2026-07-31");

  const searchRef = useRef<HTMLDivElement>(null);

  // Section refs for smooth scroll jump
  const sectionRefs = {
    ringkasan: useRef<HTMLDivElement>(null),
    grafik:    useRef<HTMLDivElement>(null),
    paket:     useRef<HTMLDivElement>(null),
    klien:     useRef<HTMLDivElement>(null),
    transaksi: useRef<HTMLDivElement>(null),
  };

  // ─── Derived active date range ────────────────────────────────────────────
  const { activeFrom, activeTo } = useMemo(() => {
    if (selectedPeriod === "Custom Range") {
      return { activeFrom: parseDate(customFrom), activeTo: parseDate(customTo) };
    }
    const range = MONTH_RANGES[selectedPeriod] ?? MONTH_RANGES["Juli 2026"];
    return { activeFrom: parseDate(range.from), activeTo: parseDate(range.to) };
  }, [selectedPeriod, customFrom, customTo]);

  const periodLabel = useMemo(() => displayRange(activeFrom, activeTo), [activeFrom, activeTo]);

  // ─── Filtered Orders in period ────────────────────────────────────────────
  const periodOrders = useMemo(
    () => orders.filter((o) => {
      const d = parseDate(o.date);
      return d >= activeFrom && d <= activeTo;
    }),
    [orders, activeFrom, activeTo]
  );

  // ─── Computed Metrics ─────────────────────────────────────────────────────
  const grossRevenue = useMemo(
    () => periodOrders.filter(o => o.statusPesanan === "Selesai").reduce((s, o) => s + o.price, 0),
    [periodOrders]
  );
  const netRevenue = Math.round(grossRevenue * (1 - PLATFORM_FEE));
  const totalOrders = periodOrders.length;
  const uniqueClients = useMemo(() => new Set(periodOrders.map(o => o.client)).size, [periodOrders]);

  // Revenue per package (only Selesai orders count as income)
  const packageStats = useMemo(() => {
    const map: Record<string, { revenue: number; bookings: number }> = {};
    periodOrders.filter(o => o.statusPesanan === "Selesai").forEach(o => {
      if (!map[o.package]) map[o.package] = { revenue: 0, bookings: 0 };
      map[o.package].revenue += o.price;
      map[o.package].bookings += 1;
    });
    return Object.entries(map)
      .map(([name, v]) => ({ name, ...v }))
      .sort((a, b) => b.revenue - a.revenue);
  }, [periodOrders]);

  // Top clients by total spend
  const topClients = useMemo(() => {
    const map: Record<string, { spent: number; orders: number }> = {};
    periodOrders.forEach(o => {
      if (!map[o.client]) map[o.client] = { spent: 0, orders: 0 };
      map[o.client].spent += o.dpAmount;
      map[o.client].orders += 1;
    });
    return Object.entries(map)
      .map(([name, v]) => ({ name, ...v }))
      .sort((a, b) => b.spent - a.spent)
      .slice(0, 3);
  }, [periodOrders]);

  const paymentStats = useMemo(() => ({
    lunas: periodOrders.filter(o => o.statusPembayaran === "Lunas").length,
    dp:    periodOrders.filter(o => o.statusPembayaran === "DP Dibayar").length,
    pending: periodOrders.filter(o => o.statusPembayaran === "Menunggu Pembayaran").length,
  }), [periodOrders]);

  // ─── Bar chart: weekly split ──────────────────────────────────────────────
  // Divide the period into 4 equal bands and sum revenue per band
  const chartBars = useMemo(() => {
    const totalMs = activeTo.getTime() - activeFrom.getTime();
    const bandMs = totalMs / 4;
    const bands = [0, 0, 0, 0];
    periodOrders.filter(o => o.statusPesanan === "Selesai").forEach(o => {
      const d = parseDate(o.date);
      const idx = Math.min(3, Math.floor((d.getTime() - activeFrom.getTime()) / bandMs));
      bands[idx] += o.price;
    });
    const max = Math.max(...bands, 1);
    return bands.map(v => ({ value: v, pct: Math.round((v / max) * 100) }));
  }, [periodOrders, activeFrom, activeTo]);

  // ─── Search suggestions ───────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setShowSuggestions(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const suggestions = useMemo(() => {
    if (!searchQuery) return [];
    const q = searchQuery.toLowerCase();
    const results: { type: string; text: string; ref: keyof typeof sectionRefs }[] = [];
    if ("grafik".includes(q)) results.push({ type: "section", text: "Grafik Pendapatan", ref: "grafik" });
    if ("paket".includes(q))  results.push({ type: "section", text: "Pendapatan Paket", ref: "paket" });
    if ("klien".includes(q))  results.push({ type: "section", text: "Klien Teratas", ref: "klien" });
    if ("transaksi".includes(q)) results.push({ type: "section", text: "Preview Transaksi", ref: "transaksi" });
    periodOrders.forEach(o => {
      if (o.client.toLowerCase().includes(q) || o.invoiceId.toLowerCase().includes(q))
        results.push({ type: "transaction", text: `${o.invoiceId} – ${o.client}`, ref: "transaksi" });
    });
    return results.slice(0, 6);
  }, [searchQuery, periodOrders]);

  const handleSuggestion = (ref: keyof typeof sectionRefs) => {
    setShowSuggestions(false);
    sectionRefs[ref]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ─── Filtered transaction preview (search query) ──────────────────────────
  const previewOrders = useMemo(() => {
    if (!searchQuery) return periodOrders;
    const q = searchQuery.toLowerCase();
    return periodOrders.filter(o =>
      o.client.toLowerCase().includes(q) ||
      o.invoiceId.toLowerCase().includes(q) ||
      o.package.toLowerCase().includes(q)
    );
  }, [searchQuery, periodOrders]);

  const periodOptions = ["Mei 2026", "Juni 2026", "Juli 2026", "Agustus 2026", "Custom Range"];

  const payBadge = (s: string) =>
    s === "Lunas" ? "bg-green-100 text-green-700" : s === "DP Dibayar" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700";

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * { visibility: hidden; }
          #printable-report, #printable-report * { visibility: visible; }
          #printable-report { position: absolute; left: 0; top: 0; width: 100%; padding: 20px; }
          .no-print { display: none !important; }
          .print-header { display: block !important; margin-bottom: 24px; border-bottom: 2px solid #eaeaea; padding-bottom: 16px; }
          .print-break { page-break-before: always; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
        .print-header { display: none; }
      `}} />

      {/* Topbar */}
      <header className="h-16 bg-white border-b border-border hidden md:flex items-center justify-between px-8 sticky top-0 z-40 no-print">
        <div className="relative w-96" ref={searchRef}>
          <div className="flex items-center gap-3 bg-surface-2 rounded-xl px-4 py-2 border border-border focus-within:border-primary transition-colors">
            <Search className="w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Cari klien, invoice, atau 'grafik'..."
              className="bg-transparent text-sm outline-none w-full"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
              onFocus={() => setShowSuggestions(true)}
            />
          </div>
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-xl shadow-lg z-50 overflow-hidden">
              {suggestions.map((s, i) => (
                <button key={i} onClick={() => handleSuggestion(s.ref)}
                  className="w-full text-left px-4 py-2 hover:bg-surface-1 text-sm flex items-center gap-2 border-b border-border last:border-0"
                >
                  {s.type === "section" ? <BarChart3 className="w-4 h-4 text-primary" /> : <Receipt className="w-4 h-4 text-text-muted" />}
                  <span className="truncate">{s.type === "section" ? `Navigasi ke: ${s.text}` : `Transaksi: ${s.text}`}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-text-muted hover:bg-surface-2 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
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

      <main className="p-4 md:p-8" id="printable-report">
        {/* PDF Header (hidden on screen) */}
        <div className="print-header">
          <h1 className="text-2xl font-extrabold text-foreground">Laporan Bisnis — Fotografer Pro</h1>
          <div className="flex gap-8 text-sm text-text-muted mt-2">
            <p><strong>Periode:</strong> {periodLabel}</p>
            <p><strong>Tanggal Cetak:</strong> {new Date().toLocaleDateString("id-ID")}</p>
          </div>
        </div>

        {/* Page Header */}
        <div className="mb-6 md:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 no-print">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground mb-1">Laporan & Statistik</h1>
            <p className="text-text-muted">Pantau performa bisnis fotografi Anda.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-start sm:items-center">
            {/* Single combined period picker */}
            <div className="relative flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setIsPeriodSelectOpen(!isPeriodSelectOpen)}
                className="flex items-center gap-2 bg-white border border-border px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-surface-2 transition-colors whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 text-text-muted" />
                {selectedPeriod}
                <ChevronDown className="w-4 h-4 text-text-muted" />
              </button>

              {/* Custom date inputs — only visible when Custom Range selected */}
              {selectedPeriod === "Custom Range" && (
                <div className="flex items-center gap-1 bg-white border border-border rounded-xl px-3 py-2 text-sm">
                  <input type="date" className="outline-none bg-transparent text-text-muted" value={customFrom}
                    onChange={(e) => setCustomFrom(e.target.value)} />
                  <span className="text-border mx-1">–</span>
                  <input type="date" className="outline-none bg-transparent text-text-muted" value={customTo}
                    onChange={(e) => setCustomTo(e.target.value)} />
                </div>
              )}

              {isPeriodSelectOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-border rounded-xl shadow-lg z-50 py-1">
                  {periodOptions.map((opt) => (
                    <button key={opt} onClick={() => { setSelectedPeriod(opt); setIsPeriodSelectOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-surface-1 transition-colors ${selectedPeriod === opt ? "font-bold text-primary" : "text-foreground"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => window.print()}
              className="flex justify-center items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-primary-dark transition-colors shadow-sm w-full sm:w-auto"
            >
              <Printer className="w-4 h-4" /> Cetak PDF
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mb-6 no-print">
          <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-border w-full">
            <Search className="w-5 h-5 text-text-muted" />
            <input type="text" placeholder="Cari dalam laporan..." className="bg-transparent text-base outline-none w-full"
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </div>

        {/* ── 4 Summary Cards ─────────────────────────────────────────────── */}
        <div ref={sectionRefs.ringkasan} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center"><TrendingUp className="w-5 h-5" /></div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">+12%</span>
            </div>
            <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-1">Pendapatan Bersih</h3>
            <p className="text-2xl font-extrabold text-foreground">{formatRupiah(netRevenue)}</p>
            <p className="text-xs text-text-muted mt-2 border-t border-border pt-2">
              Kotor: {formatRupiah(grossRevenue)} (Fee 5%)<br/>
              <span className="text-green-600 font-medium">vs periode sebelumnya</span>
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center"><BarChart3 className="w-5 h-5" /></div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">+5%</span>
            </div>
            <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-1">Total Pemesanan</h3>
            <p className="text-2xl font-extrabold text-foreground">{totalOrders}</p>
            <p className="text-xs text-text-muted mt-2 border-t border-border pt-2"><span className="text-green-600 font-medium">vs periode sebelumnya</span></p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center"><Users className="w-5 h-5" /></div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">+8%</span>
            </div>
            <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-1">Klien Aktif</h3>
            <p className="text-2xl font-extrabold text-foreground">{uniqueClients}</p>
            <p className="text-xs text-text-muted mt-2 border-t border-border pt-2"><span className="text-green-600 font-medium">vs periode sebelumnya</span></p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center"><Star className="w-5 h-5" /></div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">+0.1</span>
            </div>
            <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-1">Rating Rata-rata</h3>
            <p className="text-2xl font-extrabold text-foreground">4.9</p>
            <p className="text-xs text-text-muted mt-2 border-t border-border pt-2"><span className="text-green-600 font-medium">vs periode sebelumnya</span></p>
          </div>
        </div>

        {/* Payment Status Row */}
        <div className="bg-surface-2 p-4 rounded-xl border border-border mb-8 flex flex-wrap gap-6 items-center">
          <p className="text-sm font-bold text-foreground">Ringkasan Status Pembayaran ({periodLabel}):</p>
          <div className="flex gap-2 items-center"><div className="w-3 h-3 rounded-full bg-green-500"></div><span className="text-sm text-text-muted">Lunas: <strong className="text-foreground">{paymentStats.lunas}</strong></span></div>
          <div className="flex gap-2 items-center"><div className="w-3 h-3 rounded-full bg-blue-500"></div><span className="text-sm text-text-muted">DP: <strong className="text-foreground">{paymentStats.dp}</strong></span></div>
          <div className="flex gap-2 items-center"><div className="w-3 h-3 rounded-full bg-red-500"></div><span className="text-sm text-text-muted">Pending: <strong className="text-foreground">{paymentStats.pending}</strong></span></div>
        </div>

        {/* ── Chart + Breakdowns ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bar Chart */}
          <div ref={sectionRefs.grafik} className="bg-white border border-border rounded-2xl p-6 shadow-sm lg:col-span-2">
            <h2 className="text-lg font-bold text-foreground mb-6">Grafik Pendapatan ({periodLabel})</h2>
            <div className="relative h-64 flex pt-4 pb-4">
              {/* Y-axis */}
              <div className="flex flex-col justify-between h-full pr-4 text-xs font-medium text-text-muted border-r border-border">
                {grossRevenue > 0 ? (
                  [1, 0.75, 0.5, 0.25, 0].map((f, i) => (
                    <span key={i}>{formatRupiah(Math.round(grossRevenue * f))}</span>
                  ))
                ) : (
                  ["5jt", "3.75jt", "2.5jt", "1.25jt", "0"].map((l, i) => <span key={i}>{l}</span>)
                )}
              </div>
              {/* Bars */}
              <div className="flex-1 flex items-end gap-3 px-4 h-full relative">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none px-4 py-4">
                  {[0,1,2,3].map(i => <div key={i} className="w-full border-b border-dashed border-border opacity-50"></div>)}
                  <div className="w-full border-b border-border"></div>
                </div>
                {chartBars.map((bar, i) => (
                  <div key={i} className="w-full bg-primary-light rounded-t-md relative group cursor-pointer z-10" style={{ height: `${bar.pct || 2}%` }}>
                    <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity rounded-t-md"></div>
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs font-bold py-1 px-2 rounded pointer-events-none whitespace-nowrap transition-opacity no-print z-20">
                      {formatRupiah(bar.value)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between text-xs font-bold text-text-muted uppercase tracking-wider mt-2 pt-2 ml-24">
              <span>Pekan 1</span>
              <span>Pekan 2</span>
              <span>Pekan 3</span>
              <span>Pekan 4</span>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {/* Package Revenue */}
            <div ref={sectionRefs.paket} className="bg-white border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-foreground">Pendapatan Paket</h2>
                <div className="p-2 bg-primary-light/30 rounded-lg text-primary no-print"><Package className="w-5 h-5" /></div>
              </div>
              {packageStats.length === 0 ? (
                <p className="text-sm text-text-muted text-center py-4">Belum ada transaksi selesai pada periode ini.</p>
              ) : (
                <div className="space-y-5">
                  {packageStats.map((pkg, i) => {
                    const pct = grossRevenue > 0 ? Math.round((pkg.revenue / grossRevenue) * 100) : 0;
                    return (
                      <div key={i}>
                        <div className="flex justify-between items-end mb-2">
                          <div>
                            <p className="font-bold text-foreground">{pkg.name}</p>
                            <p className="text-xs text-text-muted">{pkg.bookings} pesanan ({pct}%)</p>
                          </div>
                          <p className="font-extrabold text-primary">{formatRupiah(pkg.revenue)}</p>
                        </div>
                        <div className="w-full bg-surface-2 rounded-full h-2 no-print">
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${pct}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Top Clients */}
            <div ref={sectionRefs.klien} className="bg-white border border-border rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-foreground mb-4">Klien Teratas</h2>
              {topClients.length === 0 ? (
                <p className="text-sm text-text-muted text-center py-4">Tidak ada data klien di periode ini.</p>
              ) : (
                <div className="space-y-4">
                  {topClients.map((c, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-border pb-3 last:border-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center font-bold text-xs text-text-muted">{i + 1}</div>
                        <div>
                          <p className="font-bold text-sm text-foreground">{c.name}</p>
                          <p className="text-xs text-text-muted">{c.orders} Pesanan</p>
                        </div>
                      </div>
                      <p className="font-bold text-sm text-foreground">{formatRupiah(c.spent)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Insight */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
          <p className="text-sm text-blue-800 leading-relaxed">
            <span className="font-bold block mb-1">Insight Periode {periodLabel}:</span>
            {packageStats.length > 0
              ? <>Paket <strong>{packageStats[0].name}</strong> menjadi kontributor pendapatan terbesar ({Math.round((packageStats[0].revenue / grossRevenue) * 100)}%). {topClients.length > 0 && <>Klien teratas: <strong>{topClients[0].name}</strong> dengan {topClients[0].orders} pesanan.</>}</>
              : "Belum ada transaksi selesai pada periode ini. Terima dan selesaikan pesanan agar laporan terisi."}
          </p>
        </div>

        {/* ── Preview Transactions ─────────────────────────────────────────── */}
        <div ref={sectionRefs.transaksi} className="mt-8 bg-white border border-border rounded-2xl overflow-hidden shadow-sm print-break">
          <div className="p-6 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h2 className="text-lg font-bold text-foreground">Preview Transaksi</h2>
              <p className="text-xs text-text-muted mt-0.5">Cuplikan {Math.min(previewOrders.length, 5)} dari {periodOrders.length} transaksi pada periode ini</p>
            </div>
            {searchQuery && <span className="text-sm text-primary font-medium no-print">Hasil pencarian: {previewOrders.length} data</span>}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="bg-surface-2 border-b border-border text-sm text-text-muted">
                  <th className="p-4 font-bold uppercase tracking-wider">Invoice</th>
                  <th className="p-4 font-bold uppercase tracking-wider">Klien</th>
                  <th className="p-4 font-bold uppercase tracking-wider">Paket</th>
                  <th className="p-4 font-bold uppercase tracking-wider">Nominal</th>
                  <th className="p-4 font-bold uppercase tracking-wider">Status Bayar</th>
                </tr>
              </thead>
              <tbody>
                {previewOrders.slice(0, 5).length > 0 ? previewOrders.slice(0, 5).map((o) => (
                  <tr key={o.id} className="border-b border-border last:border-0 hover:bg-surface-1 transition-colors">
                    <td className="p-4 font-semibold">{o.invoiceId}</td>
                    <td className="p-4">{o.client}</td>
                    <td className="p-4">{o.package}</td>
                    <td className="p-4 font-bold">{formatRupiah(o.price)}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${payBadge(o.statusPembayaran)}`}>{o.statusPembayaran}</span>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={5} className="p-8 text-center text-text-muted">Tidak ada transaksi di periode ini.</td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-surface-1 border-t border-border flex justify-center no-print">
            <Link href="/fotografer/transaksi" className="flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-dark transition-colors">
              Lihat Semua Transaksi <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
