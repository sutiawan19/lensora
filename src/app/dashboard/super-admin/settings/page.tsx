"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, User, Bell, Shield, Globe, Camera, X, CheckCircle } from "lucide-react";

type ToastMsg = { title: string; message: string } | null;

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [toast, setToast] = useState<ToastMsg>(null);

  // Profile state
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [name, setName] = useState("Sutiawan");
  const [email, setEmail] = useState("me.sutiawan@gmail.com");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Security state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFA, setTwoFA] = useState(false);

  // Notifications state
  const [notifEmail, setNotifEmail] = useState({
    transaksi: true,
    registrasi: true,
    laporan: false,
    pembaruan: true,
  });
  const [notifApp, setNotifApp] = useState({
    realtime: true,
    bunyi: false,
  });

  const showToast = (title: string, message: string) => {
    setToast({ title, message });
    setTimeout(() => setToast(null), 3500);
  };

  // Load saved data from localStorage on mount
  useEffect(() => {
    const storedName = localStorage.getItem("adminName");
    const storedEmail = localStorage.getItem("adminEmail");
    const storedPhoto = localStorage.getItem("adminPhoto");
    const stored2FA = localStorage.getItem("admin2FA");
    const storedNotifEmail = localStorage.getItem("adminNotifEmail");
    const storedNotifApp = localStorage.getItem("adminNotifApp");
    if (storedName) setName(storedName);
    if (storedEmail) setEmail(storedEmail);
    if (storedPhoto) setPhotoPreview(storedPhoto);
    if (stored2FA) setTwoFA(stored2FA === "true");
    if (storedNotifEmail) setNotifEmail(JSON.parse(storedNotifEmail));
    if (storedNotifApp) setNotifApp(JSON.parse(storedNotifApp));
  }, []);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran file maksimal 2MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setPhotoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("adminName", name);
    localStorage.setItem("adminEmail", email);
    if (photoPreview) {
      localStorage.setItem("adminPhoto", photoPreview);
    } else {
      localStorage.removeItem("adminPhoto");
    }
    window.dispatchEvent(new Event("admin-profile-updated"));
    showToast("Profil Disimpan", "Informasi profil berhasil diperbarui.");
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      showToast("Gagal", "Konfirmasi kata sandi tidak cocok.");
      return;
    }
    localStorage.setItem("admin2FA", String(twoFA));
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    showToast("Keamanan Disimpan", "Pengaturan keamanan berhasil diperbarui.");
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("adminNotifEmail", JSON.stringify(notifEmail));
    localStorage.setItem("adminNotifApp", JSON.stringify(notifApp));
    showToast("Notifikasi Disimpan", "Preferensi notifikasi berhasil disimpan.");
  };

  return (
    <div className="space-y-6">
      {/* Toast — bottom center, above everything */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-4 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white px-6 py-4 rounded-2xl shadow-2xl shadow-black/20 border border-gray-100 dark:border-zinc-700 min-w-[300px]"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{toast.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{toast.message}</p>
            </div>
            <button onClick={() => setToast(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pengaturan</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Kelola profil admin dan pengaturan platform.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Navigation */}
        <div className="w-full lg:w-64 space-y-1">
          <button 
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
              activeTab === "profile" 
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" 
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
            }`}
          >
            <User className="w-4 h-4" />
            Profil Admin
          </button>
          <button 
            onClick={() => setActiveTab("platform")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
              activeTab === "platform" 
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" 
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Globe className="w-4 h-4" />
            Pengaturan Platform
          </button>
          <button 
            onClick={() => setActiveTab("security")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
              activeTab === "security" 
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" 
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Shield className="w-4 h-4" />
            Keamanan
          </button>
          <button 
            onClick={() => setActiveTab("notifications")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
              activeTab === "notifications" 
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" 
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800"
            }`}
          >
            <Bell className="w-4 h-4" />
            Notifikasi
          </button>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/20 dark:border-zinc-800/50 rounded-2xl p-6 md:p-8 shadow-xl shadow-black/5"
          >
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-zinc-800 pb-4">
                  Informasi Profil
                </h2>
                
                <div className="flex items-center gap-6">
                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/gif,image/png"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />

                  {/* Avatar with camera overlay */}
                  <div className="relative group w-24 h-24">
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Foto Profil"
                        className="w-24 h-24 rounded-full object-cover shadow-lg ring-2 ring-white dark:ring-zinc-800"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-primary flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                        S
                      </div>
                    )}
                    {/* Overlay on hover */}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      title="Ubah Foto"
                    >
                      <Camera className="w-7 h-7 text-white" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 border border-gray-200 dark:border-zinc-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                      >
                        Ubah Foto
                      </button>
                      {photoPreview && (
                        <button
                          onClick={handleRemovePhoto}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                          title="Hapus Foto"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">JPG, GIF atau PNG. Maksimal 2MB.</p>
                  </div>
                </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Nama Lengkap</label>
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                      <input 
                        type="text" 
                        defaultValue="Super Admin"
                        disabled
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-100 dark:bg-zinc-900 text-gray-500 cursor-not-allowed"
                      />
                    </div>
                  </div>

                <form onSubmit={handleSaveProfile}>
                  <div className="pt-6 mt-6 border-t border-gray-200 dark:border-zinc-800 flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl shadow-md shadow-blue-500/20 transition-all font-medium"
                    >
                      <Save className="w-4 h-4" />
                      Simpan Perubahan
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "platform" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-zinc-800 pb-4">
                  Pengaturan Platform
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Pendaftaran Pengguna Baru</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Izinkan pengguna dan fotografer baru untuk mendaftar.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">Mode Maintenance</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Aktifkan untuk menampilkan halaman maintenance ke pengguna.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-zinc-800 pb-4">
                  Keamanan Akun
                </h2>

                <form onSubmit={handleSaveSecurity}>
                {/* Change Password */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">Ubah Kata Sandi</h3>
                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Kata Sandi Saat Ini</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Kata Sandi Baru</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Konfirmasi Kata Sandi Baru</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Two-Factor Auth */}
                <div className="border-t border-gray-200 dark:border-zinc-800 pt-6 space-y-4">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">Autentikasi Dua Faktor (2FA)</h3>
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-4 border border-gray-200 dark:border-zinc-700">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">Aktifkan 2FA</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Tambah lapisan keamanan ekstra saat login.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={twoFA}
                        onChange={(e) => setTwoFA(e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>

                {/* Active Sessions */}
                <div className="border-t border-gray-200 dark:border-zinc-800 pt-6 space-y-4">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">Sesi Aktif</h3>
                  <div className="space-y-3">
                    {[
                      { device: "Windows 11 — Chrome 127", location: "Jakarta, Indonesia", current: true },
                      { device: "iPhone 14 — Safari", location: "Bandung, Indonesia", current: false },
                    ].map((session, i) => (
                      <div key={i} className="flex items-center justify-between bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-4 border border-gray-200 dark:border-zinc-700">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{session.device}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{session.location}</p>
                        </div>
                        {session.current ? (
                          <span className="text-xs font-medium px-2 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-lg">Sesi ini</span>
                        ) : (
                          <button type="button" className="text-xs font-medium text-red-600 hover:text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-1 rounded-lg transition-colors">
                            Akhiri
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-zinc-800 flex justify-end">
                  <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl shadow-md shadow-blue-500/20 transition-all font-medium">
                    <Save className="w-4 h-4" />
                    Simpan Perubahan
                  </button>
                </div>
                </form>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-zinc-800 pb-4">
                  Pengaturan Notifikasi
                </h2>

                <form onSubmit={handleSaveNotifications}>
                {/* Email Notifications */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">Notifikasi Email</h3>
                  <div className="space-y-3">
                    {[
                      { id: "transaksi", label: "Transaksi Baru", desc: "Kirim email saat ada pemesanan baru masuk." },
                      { id: "registrasi", label: "Registrasi Pengguna", desc: "Kirim email saat ada pengguna atau fotografer baru mendaftar." },
                      { id: "laporan", label: "Laporan Harian", desc: "Ringkasan aktivitas platform setiap hari." },
                      { id: "pembaruan", label: "Pembaruan Sistem", desc: "Informasi pembaruan dan pengumuman platform." },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-4 border border-gray-200 dark:border-zinc-700">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={notifEmail[item.id as keyof typeof notifEmail]}
                            onChange={(e) => setNotifEmail({ ...notifEmail, [item.id]: e.target.checked })}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* In-App Notifications */}
                <div className="border-t border-gray-200 dark:border-zinc-800 pt-6 space-y-4">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">Notifikasi Dalam Aplikasi</h3>
                  <div className="space-y-3">
                    {[
                      { id: "realtime", label: "Notifikasi Real-time", desc: "Tampilkan notifikasi langsung di dashboard." },
                      { id: "bunyi", label: "Bunyi Notifikasi", desc: "Putar suara saat ada notifikasi baru." },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-4 border border-gray-200 dark:border-zinc-700">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={notifApp[item.id as keyof typeof notifApp]}
                            onChange={(e) => setNotifApp({ ...notifApp, [item.id]: e.target.checked })}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-zinc-800 flex justify-end">
                  <button type="submit" className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl shadow-md shadow-blue-500/20 transition-all font-medium">
                    <Save className="w-4 h-4" />
                    Simpan Perubahan
                  </button>
                </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
