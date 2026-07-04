"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, MoreHorizontal, Eye, CheckCircle, XCircle, X, Calendar, User, Camera, CreditCard } from "lucide-react";

const initialTransactions = [
  { id: "TRX-001", user: "Andi Saputra", photographer: "Budi Photography", date: "2026-07-01", amount: "Rp 1.500.000", status: "Selesai" },
  { id: "TRX-002", user: "Citra Lestari", photographer: "Studio 8", date: "2026-07-02", amount: "Rp 2.000.000", status: "Menunggu" },
  { id: "TRX-003", user: "Dewi Ayu", photographer: "Candra Visuals", date: "2026-07-02", amount: "Rp 850.000", status: "Dibatalkan" },
  { id: "TRX-004", user: "Eko Pratama", photographer: "Budi Photography", date: "2026-07-03", amount: "Rp 1.200.000", status: "Selesai" },
  { id: "TRX-005", user: "Fajar Nugraha", photographer: "LensMaster", date: "2026-07-04", amount: "Rp 3.500.000", status: "Selesai" },
];

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [selectedTrx, setSelectedTrx] = useState<typeof initialTransactions[0] | null>(null);

  const filteredTransactions = initialTransactions.filter((trx) => {
    const matchesSearch = trx.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          trx.photographer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          trx.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "Semua" || trx.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Selesai":
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1 w-max"><CheckCircle className="w-3 h-3"/> {status}</span>;
      case "Menunggu":
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800 flex items-center gap-1 w-max"><MoreHorizontal className="w-3 h-3"/> {status}</span>;
      case "Dibatalkan":
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800 flex items-center gap-1 w-max"><XCircle className="w-3 h-3"/> {status}</span>;
      default:
        return <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">List Transaksi</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola semua transaksi antara user dan fotografer.</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/20 dark:border-zinc-800/50 rounded-2xl shadow-xl shadow-black/5 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 dark:border-zinc-800 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50 dark:bg-zinc-900/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Cari ID, User, atau Fotografer..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-gray-500" />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
            >
              <option value="Semua">Semua Status</option>
              <option value="Selesai">Selesai</option>
              <option value="Menunggu">Menunggu</option>
              <option value="Dibatalkan">Dibatalkan</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-200 dark:border-zinc-800 text-gray-500 dark:text-gray-400 bg-gray-50/30 dark:bg-zinc-900/30">
                <th className="py-4 px-6 font-medium text-sm">ID Transaksi</th>
                <th className="py-4 px-6 font-medium text-sm">User</th>
                <th className="py-4 px-6 font-medium text-sm">Fotografer</th>
                <th className="py-4 px-6 font-medium text-sm">Tanggal</th>
                <th className="py-4 px-6 font-medium text-sm">Total Biaya</th>
                <th className="py-4 px-6 font-medium text-sm">Status</th>
                <th className="py-4 px-6 font-medium text-sm text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((trx, idx) => (
                  <tr key={trx.id} className="border-b border-gray-100 dark:border-zinc-800/50 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <td className="py-4 px-6 text-sm font-semibold text-gray-900 dark:text-gray-200">{trx.id}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-300 font-medium">{trx.user}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-300">{trx.photographer}</td>
                    <td className="py-4 px-6 text-sm text-gray-500 dark:text-gray-400">{trx.date}</td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900 dark:text-gray-200">{trx.amount}</td>
                    <td className="py-4 px-6 text-sm">{getStatusBadge(trx.status)}</td>
                    <td className="py-4 px-6 text-sm text-right">
                      <button 
                        onClick={() => setSelectedTrx(trx)}
                        className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors inline-flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="sr-only sm:not-sr-only sm:text-xs font-medium">Detail</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500 dark:text-gray-400">
                    Tidak ada transaksi yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Dummy */}
        <div className="p-4 border-t border-gray-200 dark:border-zinc-800 flex justify-between items-center bg-gray-50/50 dark:bg-zinc-900/50">
          <p className="text-sm text-gray-500 dark:text-gray-400">Menampilkan <span className="font-medium text-gray-900 dark:text-white">{filteredTransactions.length}</span> data</p>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 rounded-lg border border-gray-200 dark:border-zinc-700 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 disabled:opacity-50" disabled>Sebelumnnya</button>
            <button className="px-3 py-1 rounded-lg bg-blue-600 text-white text-sm font-medium shadow-sm shadow-blue-500/20">1</button>
            <button className="px-3 py-1 rounded-lg border border-gray-200 dark:border-zinc-700 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800">2</button>
            <button className="px-3 py-1 rounded-lg border border-gray-200 dark:border-zinc-700 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800">Selanjutnya</button>
          </div>
        </div>
      </motion.div>

      {/* Modal Detail Transaksi */}
      <AnimatePresence>
        {selectedTrx && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-gray-200 dark:border-zinc-800"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-zinc-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Detail Transaksi</h2>
                <button 
                  onClick={() => setSelectedTrx(null)} 
                  className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">ID Transaksi</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{selectedTrx.id}</p>
                  </div>
                  <div>
                    {getStatusBadge(selectedTrx.status)}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex gap-3 p-4 rounded-xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800">
                    <User className="w-5 h-5 text-blue-500 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">User</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedTrx.user}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 rounded-xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800">
                    <Camera className="w-5 h-5 text-purple-500 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Fotografer</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedTrx.photographer}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 rounded-xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800">
                    <Calendar className="w-5 h-5 text-amber-500 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Tanggal Sesi</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedTrx.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-4 rounded-xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-800">
                    <CreditCard className="w-5 h-5 text-emerald-500 shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Total Biaya</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedTrx.amount}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-zinc-800 flex justify-end gap-3">
                  <button 
                    onClick={() => setSelectedTrx(null)}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
