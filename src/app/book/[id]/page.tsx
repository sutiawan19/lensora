"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, Clock, MapPin, Camera, Calendar as CalendarIcon, 
  ChevronRight, UploadCloud, FileText, CreditCard, Wallet, Smartphone, ChevronLeft, X
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// --- Mock Data ---
const PHOTOGRAPHER = {
  id: 1,
  name: "Adrianus Dewa",
  avatar: "https://i.pravatar.cc/150?img=11",
  rating: 4.9,
  location: "Jakarta Selatan"
};

const PACKAGES = [
  { id: "pkg_1", name: "Essential Story", price: 1500000, duration: "4 Jam", photos: "50 Foto Edit", desc: "Cocok untuk sesi singkat seperti kelulusan atau personal portrait." },
  { id: "pkg_2", name: "Cinematic Journey", price: 3500000, duration: "8 Jam (Full Day)", photos: "120 Foto Edit + Album", desc: "Paket lengkap untuk pre-wedding atau dokumentasi event penting." }
];

// Mock calendar logic
const CALENDAR_DAYS = Array.from({ length: 14 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i + 1); // start tomorrow
  return {
    date: d.getDate(),
    day: d.toLocaleDateString("id-ID", { weekday: "short" }),
    fullDate: d.toISOString(),
    available: i !== 2 && i !== 5 // random unavailable
  };
});

const SHIFTS = [
  { id: "shift_pagi", label: "Shift Pagi", time: "09.00 - 13.00" },
  { id: "shift_siang", label: "Shift Siang", time: "13.00 - 17.00" },
  { id: "shift_malam", label: "Shift Malam", time: "17.00 - 21.00" }
];

export default function BookingFlow() {
  const params = useParams();
  
  // State Machine
  const [step, setStep] = useState(1);
  
  // Booking Data
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [locationStr, setLocationStr] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  const selectedShift = SHIFTS.find(s => s.id === selectedTime);

  // Image Upload State
  const [uploadedImages, setUploadedImages] = useState<{ id: string; url: string; file: File }[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFiles = (files: FileList) => {
    setValidationError(null);
    const newImages: { id: string; url: string; file: File }[] = [];

    // Check if total files exceed 5
    if (uploadedImages.length + files.length > 5) {
      setValidationError("Maksimal 5 gambar yang diperbolehkan.");
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) {
        setValidationError("Hanya file gambar yang diperbolehkan.");
        return;
      }
      newImages.push({
        id: Math.random().toString(36).substring(2, 9),
        url: URL.createObjectURL(file),
        file
      });
    }

    setUploadedImages(prev => [...prev, ...newImages]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFiles(e.target.files);
    }
  };

  const removeImage = (idToRemove: string) => {
    setUploadedImages(prev => {
      const toRemove = prev.find(img => img.id === idToRemove);
      if (toRemove) {
        URL.revokeObjectURL(toRemove.url);
      }
      return prev.filter(img => img.id !== idToRemove);
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Constants
  const DP_PERCENTAGE = 0.3; // 30%
  const dpAmount = selectedPackage ? selectedPackage.price * DP_PERCENTAGE : 0;

  const nextStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(prev => Math.min(prev + 1, 6));
  };
  
  const prevStep = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(prev => Math.max(prev - 1, 1));
  };

  // Validate step completion
  const isStep1Valid = selectedPackage !== null;
  const isStep2Valid = selectedDate !== null && selectedTime !== null;
  const isStep3Valid = locationStr.trim().length > 5;
  const isStep5Valid = true; // summary always valid to proceed
  const isStep6Valid = paymentMethod !== null;

  // Render Functions for Steps
  const renderStep1 = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h2 className="text-2xl font-extrabold mb-2">Pilih Paket</h2>
      <p className="text-text-muted mb-8">Pilih paket layanan yang sesuai dengan kebutuhan Anda.</p>
      
      <div className="space-y-4">
        {PACKAGES.map(pkg => (
          <div 
            key={pkg.id} 
            onClick={() => setSelectedPackage(pkg)}
            className={`p-6 rounded-3xl border-2 cursor-pointer transition-all ${
              selectedPackage?.id === pkg.id ? "border-primary bg-primary-light/20 shadow-md" : "border-border bg-white hover:border-primary/50"
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-extrabold text-lg text-foreground">{pkg.name}</h3>
                <p className="text-text-muted text-sm mt-1">{pkg.desc}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedPackage?.id === pkg.id ? "border-primary bg-primary text-white" : "border-border"}`}>
                {selectedPackage?.id === pkg.id && <CheckCircle2 className="w-4 h-4" />}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-1.5 text-sm font-semibold"><Clock className="w-4 h-4 text-primary" /> {pkg.duration}</div>
              <div className="flex items-center gap-1.5 text-sm font-semibold"><Camera className="w-4 h-4 text-primary" /> {pkg.photos}</div>
            </div>
            
            <p className="text-xl font-black text-foreground">Rp {pkg.price.toLocaleString('id-ID')}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button 
          onClick={nextStep} 
          disabled={!isStep1Valid}
          className="w-full py-4 bg-primary hover:bg-primary-hover disabled:bg-surface-2 disabled:text-text-muted text-white font-bold rounded-xl transition-all"
        >
          Lanjutkan ke Jadwal
        </button>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h2 className="text-2xl font-extrabold mb-2">Tentukan Jadwal</h2>
      <p className="text-text-muted mb-8">Pilih tanggal dan jam pemotretan.</p>

      <h3 className="font-bold text-foreground mb-4">Pilih Tanggal</h3>
      <div className="grid grid-cols-7 gap-2 text-center mb-8">
        {["Min","Sen","Sel","Rab","Kam","Jum","Sab"].map(d => <div key={d} className="text-xs font-bold text-text-muted mb-2">{d}</div>)}
        {CALENDAR_DAYS.map((day, i) => (
          <button 
            key={i} 
            disabled={!day.available}
            onClick={() => setSelectedDate(day.fullDate)}
            className={`aspect-square flex items-center justify-center rounded-xl text-sm font-bold border-2 transition-colors relative ${
              !day.available ? "bg-surface border-transparent text-text-muted/40 cursor-not-allowed" : 
              selectedDate === day.fullDate ? "bg-primary text-white border-primary shadow-md" : 
              "bg-white border-border text-foreground hover:border-primary/50"
            }`}
          >
            {day.date}
            {!day.available && <div className="absolute w-full h-px bg-text-muted/30 -rotate-45"></div>}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {selectedDate && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
            <h3 className="font-bold text-foreground mb-4">Pilih Shift ({selectedPackage?.duration})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {SHIFTS.map(shift => (
                <button
                  key={shift.id}
                  onClick={() => setSelectedTime(shift.id)}
                  className={`py-4 rounded-xl border-2 font-bold transition-all flex flex-col items-center justify-center gap-1 ${
                    selectedTime === shift.id ? "bg-primary text-white border-primary" : "bg-white border-border text-text-muted hover:border-primary/50"
                  }`}
                >
                  <span className="text-sm font-extrabold">{shift.label}</span>
                  <span className={`text-xs font-medium ${selectedTime === shift.id ? "text-white/80" : "text-text-muted"}`}>{shift.time}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 flex gap-3">
        <button onClick={prevStep} className="px-6 py-4 bg-white border border-border text-foreground font-bold rounded-xl">Kembali</button>
        <button 
          onClick={nextStep} 
          disabled={!isStep2Valid}
          className="flex-1 py-4 bg-primary hover:bg-primary-hover disabled:bg-surface-2 disabled:text-text-muted text-white font-bold rounded-xl transition-all"
        >
          Lanjutkan ke Lokasi
        </button>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h2 className="text-2xl font-extrabold mb-2">Detail Lokasi</h2>
      <p className="text-text-muted mb-8">Di mana sesi pemotretan akan dilakukan?</p>

      {/* Mock Map */}
      <div className="w-full h-48 bg-surface-2 rounded-3xl border border-border mb-6 relative overflow-hidden flex items-center justify-center">
        <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale" alt="Map" />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
        <div className="relative z-10 bg-white px-4 py-2 rounded-full font-bold text-sm shadow-md flex items-center gap-2">
           <MapPin className="w-4 h-4 text-primary" /> Pilih Titik di Peta
        </div>
      </div>

      <div className="space-y-5 mb-8">
        <div>
          <label className="block text-sm font-bold text-foreground mb-2">Alamat Lengkap / Titik Temu</label>
          <div className="relative">
             <MapPin className="w-5 h-5 absolute left-3 top-3.5 text-text-muted" />
             <input 
               type="text" 
               value={locationStr}
               onChange={e => setLocationStr(e.target.value)}
               placeholder="Contoh: Taman Literasi, Blok M"
               className="w-full pl-10 pr-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors"
             />
          </div>
        </div>
        <div>
           <label className="block text-sm font-bold text-foreground mb-2">Kota</label>
           <select className="w-full px-4 py-3 bg-white border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors text-foreground">
              <option>Jakarta Selatan</option>
              <option>Jakarta Pusat</option>
              <option>Jakarta Barat</option>
           </select>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <button onClick={prevStep} className="px-6 py-4 bg-white border border-border text-foreground font-bold rounded-xl">Kembali</button>
        <button 
          onClick={nextStep} 
          disabled={!isStep3Valid}
          className="flex-1 py-4 bg-primary hover:bg-primary-hover disabled:bg-surface-2 disabled:text-text-muted text-white font-bold rounded-xl transition-all"
        >
          Lanjutkan ke Catatan
        </button>
      </div>
    </motion.div>
  );

  const renderStep4 = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h2 className="text-2xl font-extrabold mb-2">Catatan & Inspirasi</h2>
      <p className="text-text-muted mb-8">Bantu fotografer memahami ekspektasi visual kamu.</p>

      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-bold text-foreground mb-2">Deskripsi Gaya Fotografi</label>
          <textarea 
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={4}
            placeholder="I want cinematic graduation vibes. Fokus ke candid dan pencahayaan natural ya..."
            className="w-full p-4 bg-white border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors resize-none"
          ></textarea>
        </div>

        <div>
           <label className="block text-sm font-bold text-foreground mb-2">Unggah Referensi (Opsional)</label>
           
           <input 
             ref={fileInputRef}
             type="file"
             accept="image/*"
             multiple
             onChange={handleChange}
             className="hidden"
           />

           <div 
             onClick={triggerFileInput}
             onDragEnter={handleDrag}
             onDragOver={handleDrag}
             onDragLeave={handleDrag}
             onDrop={handleDrop}
             className={`w-full border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-colors cursor-pointer group ${
               dragActive 
                 ? "border-primary bg-primary-light/10" 
                 : "border-border bg-surface-2 hover:bg-surface"
             }`}
           >
              <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                 <UploadCloud className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm font-bold text-foreground mb-1">Klik atau Drop gambar di sini</p>
              <p className="text-xs text-text-muted">Maksimal 5 foto (JPG/PNG, max 5MB)</p>
           </div>

           {validationError && (
             <p className="text-xs text-red-500 font-bold mt-2">{validationError}</p>
           )}

           {uploadedImages.length > 0 && (
             <div className="grid grid-cols-5 gap-3 mt-4">
               {uploadedImages.map(img => (
                 <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden border border-border bg-surface shadow-sm group/thumb">
                   <img src={img.url} alt="Reference Preview" className="w-full h-full object-cover" />
                   <button 
                     type="button"
                     onClick={(e) => {
                       e.stopPropagation();
                       removeImage(img.id);
                     }}
                     className="absolute top-1.5 right-1.5 p-1 bg-white hover:bg-red-500 hover:text-white rounded-full text-slate-400 border border-slate-200 transition-colors shadow-md md:opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center"
                   >
                     <X className="w-3 h-3" />
                   </button>
                 </div>
               ))}
             </div>
           )}
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <button onClick={prevStep} className="px-6 py-4 bg-white border border-border text-foreground font-bold rounded-xl">Kembali</button>
        <button 
          onClick={nextStep} 
          className="flex-1 py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-all"
        >
          Lihat Ringkasan
        </button>
      </div>
    </motion.div>
  );

  const renderStep5 = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h2 className="text-2xl font-extrabold mb-2">Ringkasan Pemesanan</h2>
      <p className="text-text-muted mb-8">Periksa kembali detail pesanan Anda sebelum lanjut ke pembayaran.</p>

      {/* Main Details */}
      <div className="bg-white border border-border rounded-3xl p-6 shadow-sm mb-6 space-y-5">
         <div className="flex gap-4 items-center pb-5 border-b border-border">
            <img src={PHOTOGRAPHER.avatar} alt="Avatar" className="w-14 h-14 rounded-full object-cover border-2 border-surface-2" />
            <div>
               <p className="text-xs text-text-muted font-bold uppercase tracking-wider mb-0.5">Fotografer</p>
               <p className="font-extrabold text-foreground">{PHOTOGRAPHER.name}</p>
            </div>
         </div>
         <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-surface-2 flex items-center justify-center shrink-0"><FileText className="w-5 h-5 text-text-muted" /></div>
            <div>
               <p className="text-xs text-text-muted font-bold uppercase tracking-wider mb-0.5">Paket</p>
               <p className="font-bold text-foreground text-sm">{selectedPackage?.name}</p>
            </div>
         </div>
         <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-surface-2 flex items-center justify-center shrink-0"><CalendarIcon className="w-5 h-5 text-text-muted" /></div>
            <div>
               <p className="text-xs text-text-muted font-bold uppercase tracking-wider mb-0.5">Jadwal</p>
               <p className="font-bold text-foreground text-sm">
                  {selectedDate ? new Date(selectedDate).toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : ""} • {selectedShift ? `${selectedShift.label} (${selectedShift.time})` : ""}
               </p>
            </div>
         </div>
         <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-surface-2 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-text-muted" /></div>
            <div>
               <p className="text-xs text-text-muted font-bold uppercase tracking-wider mb-0.5">Lokasi</p>
               <p className="font-bold text-foreground text-sm">{locationStr}</p>
            </div>
         </div>
      </div>

      {/* Pricing Breakdown */}
      <div className="bg-white border border-border rounded-3xl p-6 shadow-sm mb-8">
         <h3 className="font-bold text-foreground mb-4">Rincian Pembayaran</h3>
         <div className="space-y-3 mb-4 text-sm font-semibold">
            <div className="flex justify-between"><span className="text-text-muted">Harga Paket</span><span className="text-foreground">Rp {selectedPackage?.price.toLocaleString('id-ID')}</span></div>
            <div className="flex justify-between"><span className="text-text-muted">Biaya Layanan</span><span className="text-foreground">Rp 10.000</span></div>
         </div>
         <div className="border-t border-border pt-4 mb-4">
            <div className="flex justify-between items-center">
               <span className="font-bold text-foreground">Total Keseluruhan</span>
               <span className="text-lg font-black text-foreground">Rp {(selectedPackage?.price + 10000).toLocaleString('id-ID')}</span>
            </div>
         </div>
         <div className="bg-primary-light/50 border border-primary/20 rounded-xl p-4 flex justify-between items-center">
            <div>
               <p className="font-extrabold text-primary text-sm">Pembayaran DP (30%)</p>
               <p className="text-xs text-primary/70 font-semibold mt-0.5">Sisa dibayar setelah sesi selesai</p>
            </div>
            <p className="text-xl font-black text-primary">Rp {dpAmount.toLocaleString('id-ID')}</p>
         </div>
      </div>

      <div className="mt-8 flex gap-3">
        <button onClick={prevStep} className="px-6 py-4 bg-white border border-border text-foreground font-bold rounded-xl">Edit</button>
        <button 
          onClick={nextStep} 
          className="flex-1 py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-all shadow-md"
        >
          Lanjut ke Pembayaran
        </button>
      </div>
    </motion.div>
  );

  const renderStep6 = () => (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
      <h2 className="text-2xl font-extrabold mb-2">Pembayaran</h2>
      <p className="text-text-muted mb-8">Selesaikan pembayaran DP untuk mengamankan jadwal kamu.</p>

      <div className="space-y-4 mb-8">
         <label className={`flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-colors ${paymentMethod === 'bank' ? 'border-primary bg-primary-light/10' : 'border-border bg-white'}`}>
            <input type="radio" name="payment" className="hidden" onChange={() => setPaymentMethod('bank')} />
            <div className="w-10 h-10 rounded-xl bg-surface-2 flex items-center justify-center mr-4"><CreditCard className="w-5 h-5 text-text-muted"/></div>
            <div className="flex-1"><p className="font-bold text-foreground text-sm">Transfer Bank</p><p className="text-xs text-text-muted">BCA, Mandiri, BNI, BRI</p></div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'bank' ? 'border-primary' : 'border-border'}`}>
               {paymentMethod === 'bank' && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
            </div>
         </label>
         
         <label className={`flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-colors ${paymentMethod === 'ewallet' ? 'border-primary bg-primary-light/10' : 'border-border bg-white'}`}>
            <input type="radio" name="payment" className="hidden" onChange={() => setPaymentMethod('ewallet')} />
            <div className="w-10 h-10 rounded-xl bg-surface-2 flex items-center justify-center mr-4"><Smartphone className="w-5 h-5 text-text-muted"/></div>
            <div className="flex-1"><p className="font-bold text-foreground text-sm">E-Wallet</p><p className="text-xs text-text-muted">GoPay, OVO, Dana</p></div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'ewallet' ? 'border-primary' : 'border-border'}`}>
               {paymentMethod === 'ewallet' && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
            </div>
         </label>

         <label className={`flex items-center p-4 border-2 rounded-2xl cursor-pointer transition-colors ${paymentMethod === 'va' ? 'border-primary bg-primary-light/10' : 'border-border bg-white'}`}>
            <input type="radio" name="payment" className="hidden" onChange={() => setPaymentMethod('va')} />
            <div className="w-10 h-10 rounded-xl bg-surface-2 flex items-center justify-center mr-4"><Wallet className="w-5 h-5 text-text-muted"/></div>
            <div className="flex-1"><p className="font-bold text-foreground text-sm">Virtual Account</p><p className="text-xs text-text-muted">Pembayaran otomatis</p></div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'va' ? 'border-primary' : 'border-border'}`}>
               {paymentMethod === 'va' && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
            </div>
         </label>
      </div>

      <div className="mt-8 flex gap-3">
        <button onClick={prevStep} className="px-6 py-4 bg-white border border-border text-foreground font-bold rounded-xl">Kembali</button>
        <button 
          onClick={() => setStep(7)} // Success state
          disabled={!isStep6Valid}
          className="flex-1 py-4 bg-primary hover:bg-primary-hover disabled:bg-surface-2 disabled:text-text-muted text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
        >
          Bayar DP Rp {dpAmount.toLocaleString('id-ID')}
        </button>
      </div>
    </motion.div>
  );

  const renderSuccess = () => (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
       <div className="w-24 h-24 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-teal" />
       </div>
       <h2 className="text-3xl font-extrabold text-foreground mb-3">Pemesanan Berhasil! 🎉</h2>
       <p className="text-text-muted mb-8 max-w-md mx-auto leading-relaxed">
          Pembayaran DP Anda telah kami terima. Jadwal pemotretan telah diamankan dan notifikasi telah dikirimkan ke fotografer.
       </p>
       <div className="bg-surface-2 border border-border rounded-2xl p-4 max-w-sm mx-auto mb-10 text-sm font-bold text-foreground">
          ID Pesanan: #LSR-{Math.floor(Math.random() * 1000000)}
       </div>
       <Link href="/dashboard" className="px-8 py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-all shadow-md">
          Lihat Pesanan Saya
       </Link>
    </motion.div>
  );

  return (
    <main className="min-h-screen bg-surface flex flex-col md:flex-row">
      
      {/* Left Area (Dynamic Forms) */}
      <div className="flex-1 flex flex-col">
         {/* Top Navbar */}
         <nav className="h-20 flex items-center px-6 border-b border-border bg-white">
            <Link href={`/photographer/${PHOTOGRAPHER.id}`} className="flex items-center gap-2 text-text-muted hover:text-foreground font-bold text-sm transition-colors">
               <ChevronLeft className="w-4 h-4" /> Batal & Kembali
            </Link>
         </nav>

         <div className="flex-1 overflow-y-auto p-6 md:p-12 lg:px-24">
            <div className="max-w-xl mx-auto">
               
               {/* Stepper Header (only show if not success) */}
               {step < 7 && (
                  <div className="mb-12 flex items-center">
                     {[1,2,3,4,5,6].map(s => (
                        <div key={s} className="flex items-center flex-1 last:flex-none">
                           <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                              step === s ? "bg-primary text-white shadow-md" : 
                              step > s ? "bg-primary-light text-primary" : "bg-surface-2 text-text-muted"
                           }`}>
                              {step > s ? <CheckCircle2 className="w-4 h-4" /> : s}
                           </div>
                           {s < 6 && (
                              <div className={`h-1 flex-1 mx-2 rounded-full transition-colors ${step > s ? "bg-primary-light" : "bg-surface-2"}`}></div>
                           )}
                        </div>
                     ))}
                  </div>
               )}

               {/* Step Content */}
               <AnimatePresence mode="wait">
                  {step === 1 && renderStep1()}
                  {step === 2 && renderStep2()}
                  {step === 3 && renderStep3()}
                  {step === 4 && renderStep4()}
                  {step === 5 && renderStep5()}
                  {step === 6 && renderStep6()}
                  {step === 7 && renderSuccess()}
               </AnimatePresence>

            </div>
         </div>
      </div>

      {/* Right Area (Sticky Summary) - hidden on mobile and on success screen */}
      {step < 7 && (
         <aside className="hidden lg:flex w-[400px] xl:w-[450px] bg-white border-l border-border flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.02)]">
            <div className="p-10 sticky top-0">
               <h3 className="font-extrabold text-xl mb-6 text-foreground">Ringkasan Pesanan</h3>
               
               {/* Photographer Info */}
               <div className="flex gap-4 items-center mb-8 bg-surface-2 p-4 rounded-2xl border border-border">
                  <img src={PHOTOGRAPHER.avatar} className="w-12 h-12 rounded-full object-cover shadow-sm border-2 border-white" />
                  <div>
                     <p className="font-bold text-foreground text-sm">{PHOTOGRAPHER.name}</p>
                     <p className="text-xs text-text-muted flex items-center gap-1 mt-0.5"><MapPin className="w-3 h-3" /> {PHOTOGRAPHER.location}</p>
                  </div>
               </div>

               {/* Selected Items Timeline */}
               <div className="relative pl-4 space-y-6 before:absolute before:inset-y-2 before:left-[19px] before:w-px before:bg-border">
                  
                  <div className="relative flex items-start gap-4">
                     <div className={`w-3 h-3 rounded-full mt-1.5 shrink-0 z-10 shadow-sm border-2 border-white ${step > 1 ? "bg-primary" : "bg-surface-2"}`}></div>
                     <div className="flex-1">
                        <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Paket Terpilih</p>
                        {selectedPackage ? (
                           <div className="bg-white border border-border p-3 rounded-xl shadow-sm">
                              <p className="font-bold text-foreground text-sm">{selectedPackage.name}</p>
                              <p className="text-primary font-black text-sm mt-1">Rp {selectedPackage.price.toLocaleString('id-ID')}</p>
                           </div>
                        ) : (
                           <p className="text-sm font-semibold text-text-muted/50">Belum ada paket yang dipilih.</p>
                        )}
                     </div>
                  </div>

                  <div className="relative flex items-start gap-4">
                     <div className={`w-3 h-3 rounded-full mt-1.5 shrink-0 z-10 shadow-sm border-2 border-white ${step > 2 ? "bg-primary" : "bg-surface-2"}`}></div>
                     <div className="flex-1">
                        <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Jadwal</p>
                        {selectedDate && selectedTime ? (
                           <p className="font-bold text-foreground text-sm">
                              {new Date(selectedDate).toLocaleDateString("id-ID", { day: 'numeric', month: 'short' })} • {selectedShift ? `${selectedShift.label} (${selectedShift.time})` : ""}
                           </p>
                        ) : (
                           <p className="text-sm font-semibold text-text-muted/50">Belum diatur.</p>
                        )}
                     </div>
                  </div>

               </div>

            </div>
         </aside>
      )}
    </main>
  );
}
