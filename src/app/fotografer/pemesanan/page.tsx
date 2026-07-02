"use client";

import { useState } from "react";
import { Bell, Search, Filter, X, Calendar as CalendarIcon, MapPin, Package, User, Clock, FileText } from "lucide-react";
import { useFotografer, formatRupiah, StatusPesanan, Order } from "@/context/FotograferContext";

export default function PemesananPage() {
  const { orders, updateStatusPesanan } = useFotografer();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Filtering logic
  const filteredData = orders.filter((order) => {
    const matchesSearch =
      order.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.package.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "Semua" || order.statusPesanan === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statuses = ["Semua", "Menunggu Konfirmasi", "Diterima", "Selesai", "Ditolak"];

  const handleUpdateStatus = (id: string, newStatus: StatusPesanan) => {
    updateStatusPesanan(id, newStatus);
    // Also update the modal's reflected state
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder((prev) => prev ? { ...prev, statusPesanan: newStatus } : null);
    }
  };

  const statusBadgeClass = (status: string) => {
    if (status === "Menunggu Konfirmasi") return "bg-yellow-100 text-yellow-700";
    if (status === "Diterima") return "bg-blue-100 text-blue-700";
    if (status === "Ditolak") return "bg-red-100 text-red-700";
    return "bg-green-100 text-green-700";
  };

  return (
    <>
      <header className="h-16 bg-white border-b border-border hidden md:flex items-center justify-between px-8 sticky top-0 z-40">
        <div className="flex items-center gap-3 bg-surface-2 rounded-xl px-4 py-2 border border-border w-96">
          <Search className="w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Cari ID, Klien, atau Paket..."
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
            <h1 className="text-3xl font-extrabold text-foreground mb-1">Pemesanan</h1>
            <p className="text-text-muted">Kelola jadwal booking dari klien Anda.</p>
          </div>

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
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => { setFilterStatus(status); setIsFilterOpen(false); }}
                    className={`w-full text-left px-4 py-3 sm:py-2 text-sm hover:bg-surface-1 transition-colors ${filterStatus === status ? "font-bold text-primary" : "text-foreground"}`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mb-6">
          <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-border w-full">
            <Search className="w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Cari ID, Klien, atau Paket..."
              className="bg-transparent text-base outline-none w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-surface-2 border-b border-border text-sm text-text-muted">
                  <th className="p-4 font-bold uppercase tracking-wider">ID Pesanan</th>
                  <th className="p-4 font-bold uppercase tracking-wider">Klien</th>
                  <th className="p-4 font-bold uppercase tracking-wider">Tanggal</th>
                  <th className="p-4 font-bold uppercase tracking-wider">Paket</th>
                  <th className="p-4 font-bold uppercase tracking-wider">Status Pesanan</th>
                  <th className="p-4 font-bold uppercase tracking-wider text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((order) => (
                    <tr key={order.id} className="border-b border-border last:border-0 hover:bg-surface-1 transition-colors">
                      <td className="p-4 font-semibold">{order.id}</td>
                      <td className="p-4">{order.client}</td>
                      <td className="p-4">{order.dateDisplay}</td>
                      <td className="p-4">{order.package}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${statusBadgeClass(order.statusPesanan)}`}>
                          {order.statusPesanan}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-primary font-bold hover:underline text-sm whitespace-nowrap"
                        >
                          Lihat Detail
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center">
                      <div className="flex flex-col items-center justify-center text-text-muted">
                        <Search className="w-8 h-8 mb-3 opacity-50" />
                        <p className="font-semibold">Tidak ada data pesanan yang sesuai.</p>
                        <p className="text-sm mt-1">Coba sesuaikan kata kunci pencarian atau filter Anda.</p>
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
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-surface-2">
              <div>
                <h2 className="text-lg font-extrabold text-foreground">Detail Pesanan</h2>
                <p className="text-sm text-text-muted font-medium">{selectedOrder.id}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 bg-white rounded-full text-text-muted hover:text-foreground hover:bg-surface-1 transition-colors border border-border"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {/* Status Banner */}
              <div className={`mb-6 p-4 rounded-2xl flex items-center gap-3 border ${
                selectedOrder.statusPesanan === "Menunggu Konfirmasi" ? "bg-yellow-50 border-yellow-200 text-yellow-800" :
                selectedOrder.statusPesanan === "Diterima" ? "bg-blue-50 border-blue-200 text-blue-800" :
                selectedOrder.statusPesanan === "Ditolak" ? "bg-red-50 border-red-200 text-red-800" :
                "bg-green-50 border-green-200 text-green-800"
              }`}>
                <div className={`w-3 h-3 rounded-full ${
                  selectedOrder.statusPesanan === "Menunggu Konfirmasi" ? "bg-yellow-500" :
                  selectedOrder.statusPesanan === "Diterima" ? "bg-blue-500" :
                  selectedOrder.statusPesanan === "Ditolak" ? "bg-red-500" : "bg-green-500"
                }`}></div>
                <div>
                  <p className="font-bold text-sm">Status Saat Ini: {selectedOrder.statusPesanan}</p>
                  <p className="text-xs opacity-80 mt-0.5">
                    {selectedOrder.statusPesanan === "Menunggu Konfirmasi" ? "Segera konfirmasi apakah Anda bisa menerima pesanan ini." :
                     selectedOrder.statusPesanan === "Diterima" ? "Pesanan telah diterima. Persiapkan untuk sesi pemotretan." :
                     selectedOrder.statusPesanan === "Ditolak" ? "Anda telah menolak pesanan ini." :
                     "Pesanan telah diselesaikan."}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-2">Informasi Klien</h3>
                  <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center shrink-0"><User className="w-4 h-4" /></div>
                    <div>
                      <p className="text-xs text-text-muted font-medium">Nama Klien</p>
                      <p className="font-semibold text-foreground">{selectedOrder.client}</p>
                      <p className="text-sm text-text-muted mt-1">{selectedOrder.phone}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-primary-light text-primary flex items-center justify-center shrink-0"><Package className="w-4 h-4" /></div>
                    <div>
                      <p className="text-xs text-text-muted font-medium">Paket Terpilih</p>
                      <p className="font-semibold text-foreground">{selectedOrder.package}</p>
                      <p className="text-sm text-primary font-bold mt-1">{formatRupiah(selectedOrder.price)}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-text-muted uppercase tracking-wider mb-2">Jadwal & Lokasi</h3>
                  <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-surface-2 text-foreground flex items-center justify-center shrink-0"><CalendarIcon className="w-4 h-4" /></div>
                    <div>
                      <p className="text-xs text-text-muted font-medium">Tanggal Sesi</p>
                      <p className="font-semibold text-foreground">{selectedOrder.dateDisplay}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-surface-2 text-foreground flex items-center justify-center shrink-0"><Clock className="w-4 h-4" /></div>
                    <div>
                      <p className="text-xs text-text-muted font-medium">Waktu Sesi</p>
                      <p className="font-semibold text-foreground">{selectedOrder.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-surface-2 text-foreground flex items-center justify-center shrink-0"><MapPin className="w-4 h-4" /></div>
                    <div>
                      <p className="text-xs text-text-muted font-medium">Lokasi</p>
                      <p className="font-semibold text-foreground leading-tight mt-0.5">{selectedOrder.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-surface-2 text-foreground flex items-center justify-center shrink-0"><FileText className="w-4 h-4" /></div>
                  <div className="w-full">
                    <p className="text-xs text-text-muted font-medium mb-1">Catatan Klien</p>
                    <div className="bg-surface-2 rounded-xl p-4 w-full">
                      <p className="text-sm text-foreground">{selectedOrder.notes}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-border bg-surface-1 flex justify-end gap-3 rounded-b-3xl">
              {selectedOrder.statusPesanan === "Menunggu Konfirmasi" ? (
                <>
                  <button onClick={() => handleUpdateStatus(selectedOrder.id, "Ditolak")} className="px-6 py-2.5 rounded-xl font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors">
                    Tolak Pesanan
                  </button>
                  <button onClick={() => handleUpdateStatus(selectedOrder.id, "Diterima")} className="px-6 py-2.5 rounded-xl font-bold text-white bg-primary hover:bg-primary-dark transition-colors shadow-sm">
                    Terima Pesanan
                  </button>
                </>
              ) : selectedOrder.statusPesanan === "Diterima" ? (
                <>
                  <button onClick={() => setSelectedOrder(null)} className="px-6 py-2.5 rounded-xl font-bold text-foreground bg-white border border-border hover:bg-surface-2 transition-colors">
                    Tutup
                  </button>
                  <button onClick={() => handleUpdateStatus(selectedOrder.id, "Selesai")} className="px-6 py-2.5 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 transition-colors shadow-sm">
                    Tandai Selesai
                  </button>
                </>
              ) : (
                <button onClick={() => setSelectedOrder(null)} className="px-6 py-2.5 rounded-xl font-bold text-foreground bg-white border border-border hover:bg-surface-2 transition-colors">
                  Tutup
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
