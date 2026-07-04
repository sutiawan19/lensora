"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, UserPlus, Filter, Edit2, Trash2, Shield, Camera, User, X } from "lucide-react";

const initialUsers = [
  { id: "USR-101", name: "Andi Saputra", email: "andi@gmail.com", role: "User", status: "Aktif", joinDate: "2026-01-15" },
  { id: "PHO-201", name: "Budi Photography", email: "budi@photo.com", role: "Fotografer", status: "Aktif", joinDate: "2026-02-20" },
  { id: "PHO-202", name: "Citra Studio", email: "citra@studio.id", role: "Fotografer", status: "Nonaktif", joinDate: "2026-03-10" },
  { id: "USR-102", name: "Dewi Lestari", email: "dewi@gmail.com", role: "User", status: "Aktif", joinDate: "2026-04-05" },
  { id: "ADM-001", name: "Sutiawan", email: "me.sutiawan@gmail.com", role: "Super Admin", status: "Aktif", joinDate: "2025-12-01" },
];

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("Semua");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "User", status: "Aktif" });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "Semua" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    
    const id = `USR-${Math.floor(Math.random() * 900) + 100}`;
    const date = new Date().toISOString().split('T')[0];
    
    setUsers([{
      id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status,
      joinDate: date
    }, ...users]);
    
    setNewUser({ name: "", email: "", role: "User", status: "Aktif" });
    setIsAddModalOpen(false);
  };

  const handleDeleteUser = (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pengguna ini?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const handleEditClick = (user: any) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

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
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-500/20 transition-all font-medium text-sm"
        >
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
                        <button 
                          onClick={() => handleEditClick(user)}
                          className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user.id)}
                          className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
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

      {/* Add User Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsAddModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-zinc-800"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-zinc-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tambah Pengguna Baru</h2>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddUser} className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    placeholder="Masukkan nama lengkap..."
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input
                    type="email"
                    required
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="nama@email.com"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
                    >
                      <option value="User">User</option>
                      <option value="Fotografer">Fotografer</option>
                      <option value="Super Admin">Super Admin</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                    <select
                      value={newUser.status}
                      onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
                    >
                      <option value="Aktif">Aktif</option>
                      <option value="Nonaktif">Nonaktif</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-gray-100 dark:border-zinc-800 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl shadow-md shadow-blue-500/20 transition-all"
                  >
                    Simpan Pengguna
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit User Modal */}
      <AnimatePresence>
        {isEditModalOpen && editingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsEditModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-zinc-800"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-zinc-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Pengguna</h2>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateUser} className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input
                    type="email"
                    required
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                    <select
                      value={editingUser.role}
                      onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
                    >
                      <option value="User">User</option>
                      <option value="Fotografer">Fotografer</option>
                      <option value="Super Admin">Super Admin</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                    <select
                      value={editingUser.status}
                      onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
                    >
                      <option value="Aktif">Aktif</option>
                      <option value="Nonaktif">Nonaktif</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-gray-100 dark:border-zinc-800 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl shadow-md shadow-blue-500/20 transition-all"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
