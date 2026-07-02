"use client";

import { useState } from "react";
import { Bell, Search, Download, Filter, X, CreditCard, User, Package, Calendar as CalendarIcon, CheckCircle2 } from "lucide-react";
import { useFotografer, formatRupiah, Order } from "@/context/FotograferContext";

export default function TransaksiPage() {
  const { orders } = useFotografer();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTrx, setSelectedTrx] = useState<Order | null>(null);

  const statuses = ["Semua", "Menunggu Pembayaran", "DP Dibayar", "Lunas"];

  const filteredData = orders.filter((o) => {
    const matchesSearch =
      o.invoiceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "Semua" || o.statusPembayaran === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleExportCSV = () => {
    let csv = "Invoice,ID Pesanan,Klien,Paket,Total Tagihan,Nominal Dibayar,Tanggal,Status Pembayaran\n";
    filteredData.forEach((o) => {
      csv += `"${o.invoiceId}","${o.id}","${o.client}","${o.package}","${o.price}","${o.dpAmount}","${o.dateDisplay}","${o.statusPembayaran}"\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transaksi_${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const paymentBadgeClass = (status: string) => {
    if (status === "Menunggu Pembayaran") return "bg-red-100 text-red-700";
    if (status === "DP Dibayar") return "bg-blue-100 text-blue-700";
    return "bg-green-100 text-green-700";
  };

  return (
    <>
      <header className="h-16 bg-white border-b border-border hidden md:flex items-center justify-between px-8 sticky top-0 z-40">
        <div className="flex items-center gap-3 bg-surface-2 rounded-xl px-4 py-2 border border-border w-96">
          <Search className="w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Cari Invoice, ID Pesanan, Klien..."
            className="bg-transparent text-sm outline-none w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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

      <main className="p-4 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground mb-1">List Transaksi</h1>
            <p className="text-text-muted">Riwayat pembayaran dari klien Anda.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-border px-4 py-2 rounded-xl font-semibold hover:bg-surface-2 transition-colors"
              >
                <Filter className="w-4 h-4" />
                {filterStatus !== "Semua" ? filterStatus : "Filter Status"}
              </button>
              {isFilterOpen && (
                <div className="absolute right-0 sm:right-0 left-0 sm:left-auto mt-2 w-full sm:w-56 bg-white border border-border rounded-xl shadow-lg z-50 py-1">
                  {statuses.map((s) => (
                    <button key={s} onClick={() => { setFilterStatus(s); setIsFilterOpen(false); }}
                      className={`w-full text-left px-4 py-3 sm:py-2 text-sm hover:bg-surface-1 transition-colors ${filterStatus === s ? "font-bold text-primary" : "text-foreground"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={handleExportCSV} className="flex justify-center items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl font-bold hover:bg-primary-dark transition-colors shadow-sm w-full sm:w-auto">
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mb-6">
          <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-border w-full">
            <Search className="w-5 h-5 text-text-muted" />
            <input type="text" placeholder="Cari Invoice, Klien..." className="bg-transparent text-base outline-none w-full"
              value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </div>

        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-surface-2 border-b border-border text-sm text-text-muted">
                  <th className="p-4 font-bold uppercase tracking-wider">Invoice</th>
                  <th className="p-4 font-bold uppercase tracking-wider">Klien</th>
                  <th className="p-4 font-bold uppercase tracking-wider">Total Tagihan</th>
                  <th className="p-4 font-bold uppercase tracking-wider">Telah Dibayar</th>
                  <th className="p-4 font-bold uppercase tracking-wider">Tanggal</th>
                  <th className="p-4 font-bold uppercase tracking-wider">Status</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? filteredData.map((o) => (
                  <tr key={o.id} className="border-b border-border last:border-0 hover:bg-surface-1 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-foreground">{o.invoiceId}</div>
                      <div className="text-xs text-text-muted mt-0.5">Ref: {o.id}</div>
                    </td>
                    <td className="p-4">{o.client}</td>
                    <td className="p-4 font-bold text-foreground">{formatRupiah(o.price)}</td>
                    <td className="p-4">
                      {o.statusPembayaran === "DP Dibayar" ? (
                        <div className="flex flex-col">
                          <span className="font-bold text-blue-600">{formatRupiah(o.dpAmount)}</span>
                          <span className="text-xs text-text-muted">(Sisa: {formatRupiah(o.price - o.dpAmount)})</span>
                        </div>
                      ) : o.statusPembayaran === "Menunggu Pembayaran" ? (
                        <span className="text-text-muted font-medium">Rp 0</span>
                      ) : (
                        <span className="font-bold text-green-600">{formatRupiah(o.dpAmount)}</span>
                      )}
                    </td>
                    <td className="p-4">{o.dateDisplay}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${paymentBadgeClass(o.statusPembayaran)}`}>
                        {o.statusPembayaran}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button onClick={() => setSelectedTrx(o)} className="text-primary font-bold hover:underline text-sm whitespace-nowrap">
                        Detail
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="p-8 text-center">
                      <div className="flex flex-col items-center justify-center text-text-muted">
                        <Search className="w-8 h-8 mb-3 opacity-50" />
                        <p className="font-semibold">Tidak ada data transaksi yang sesuai.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Detail Modal */}
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
              <div className="flex flex-col items-center justify-center mb-6 text-center">
                <p className="text-sm font-bold text-text-muted uppercase tracking-wider mb-2">Total Telah Dibayar</p>
                <p className={`text-4xl font-extrabold ${selectedTrx.statusPembayaran === "Lunas" ? "text-green-600" : selectedTrx.statusPembayaran === "DP Dibayar" ? "text-blue-600" : "text-foreground"}`}>
                  {formatRupiah(selectedTrx.dpAmount)}
                </p>
                {selectedTrx.statusPembayaran === "DP Dibayar" && (
                  <p className="text-sm font-medium text-text-muted mt-2">
                    Sisa tagihan: {formatRupiah(selectedTrx.price - selectedTrx.dpAmount)}
                  </p>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <div className="flex items-center gap-3"><User className="w-4 h-4 text-text-muted" /><span className="text-sm font-medium text-text-muted">Klien</span></div>
                  <span className="text-sm font-bold text-foreground">{selectedTrx.client}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <div className="flex items-center gap-3"><Package className="w-4 h-4 text-text-muted" /><span className="text-sm font-medium text-text-muted">Paket</span></div>
                  <span className="text-sm font-bold text-foreground">{selectedTrx.package}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <div className="flex items-center gap-3"><CalendarIcon className="w-4 h-4 text-text-muted" /><span className="text-sm font-medium text-text-muted">Tanggal</span></div>
                  <span className="text-sm font-bold text-foreground">{selectedTrx.dateDisplay}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <div className="flex items-center gap-3"><CreditCard className="w-4 h-4 text-text-muted" /><span className="text-sm font-medium text-text-muted">Total Tagihan</span></div>
                  <span className="text-sm font-bold text-foreground">{formatRupiah(selectedTrx.price)}</span>
                </div>
              </div>

              <div className="bg-surface-2 p-4 rounded-2xl">
                <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-4">Riwayat Transaksi</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-white" /></div>
                      {selectedTrx.statusPembayaran !== "Menunggu Pembayaran" && <div className="w-0.5 flex-1 bg-border mt-1"></div>}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-bold text-foreground">Pesanan Dibuat</p>
                      <p className="text-xs text-text-muted">{selectedTrx.dateDisplay}</p>
                    </div>
                  </div>
                  {(selectedTrx.statusPembayaran === "DP Dibayar" || selectedTrx.statusPembayaran === "Lunas") && (
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-white" /></div>
                        {selectedTrx.statusPembayaran === "Lunas" && <div className="w-0.5 flex-1 bg-border mt-1"></div>}
                      </div>
                      <div className="pb-4">
                        <p className="text-sm font-bold text-foreground">Pembayaran DP ({formatRupiah(selectedTrx.dpAmount)})</p>
                        <p className="text-xs text-text-muted">{selectedTrx.dateDisplay}</p>
                      </div>
                    </div>
                  )}
                  {selectedTrx.statusPembayaran === "Lunas" && (
                    <div className="flex gap-4">
                      <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-white" /></div>
                      <div>
                        <p className="text-sm font-bold text-foreground">Lunas — {formatRupiah(selectedTrx.price)}</p>
                        <p className="text-xs text-text-muted">{selectedTrx.dateDisplay}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
