"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, UserPlus, Filter, Edit2, Trash2, Shield, Camera, User } from "lucide-react";

const initialUsers = [
  { id: "USR-101", name: "Andi Saputra", email: "andi@gmail.com", role: "User", status: "Aktif", joinDate: "2026-01-15" },
  { id: "PHO-201", name: "Budi Photography", email: "budi@photo.com", role: "Fotografer", status: "Aktif", joinDate: "2026-02-20" },
  { id: "PHO-202", name: "Citra Studio", email: "citra@studio.id", role: "Fotografer", status: "Nonaktif", joinDate: "2026-03-10" },
  { id: "USR-102", name: "Dewi Lestari", email: "dewi@gmail.com", role: "User", status: "Aktif", joinDate: "2026-04-05" },
  { id: "ADM-001", name: "Sutiawan", email: "me.sutiawan@gmail.com", role: "Super Admin", status: "Aktif", joinDate: "2025-12-01" },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("Semua");

  const filteredUsers = initialUsers.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "Semua" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Super Admin": return <Shield className="w-4 h-4 text-purple-600" />;
      case "Fotografer": return <Camera className="w-4 h-4 text-blue-600" />;
      default: return <User className="w-4 h-4 text-gray-600" />;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Super Admin":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border border-purple-200 dark:border-purple-800";
      case "Fotografer":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-zinc-800 dark:text-gray-300 border border-gray-200 dark:border-zinc-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Pengguna</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola data user, fotografer, dan hak akses admin.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-500/20 transition-all font-medium text-sm">
          <UserPlus className="w-4 h-4" />
          Tambah Pengguna
        </button>
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
              placeholder="Cari Nama atau Email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-gray-500" />
            <select 
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
            >
              <option value="Semua">Semua Role</option>
              <option value="User">User</option>
              <option value="Fotografer">Fotografer</option>
              <option value="Super Admin">Super Admin</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-200 dark:border-zinc-800 text-gray-500 dark:text-gray-400 bg-gray-50/30 dark:bg-zinc-900/30">
                <th className="py-4 px-6 font-medium text-sm">Nama Lengkap</th>
                <th className="py-4 px-6 font-medium text-sm">Email</th>
                <th className="py-4 px-6 font-medium text-sm">Role</th>
                <th className="py-4 px-6 font-medium text-sm">Tanggal Bergabung</th>
                <th className="py-4 px-6 font-medium text-sm">Status</th>
                <th className="py-4 px-6 font-medium text-sm text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 dark:border-zinc-800/50 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-100 to-blue-50 dark:from-zinc-800 dark:to-zinc-700 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs shadow-sm">
                          {user.name.charAt(0)}
                        </div>
                        <span className="text-sm font-semibold text-gray-900 dark:text-gray-200">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-400">{user.email}</td>
                    <td className="py-4 px-6 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 w-max ${getRoleBadge(user.role)}`}>
                        {getRoleIcon(user.role)}
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-500 dark:text-gray-400">{user.joinDate}</td>
                    <td className="py-4 px-6 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === 'Aktif' 
                          ? 'text-emerald-700 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400' 
                          : 'text-red-700 bg-red-100 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500 dark:text-gray-400">
                    Tidak ada pengguna yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
