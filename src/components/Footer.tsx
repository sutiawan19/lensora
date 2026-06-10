import { Camera } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight">Lensora<span className="text-primary">.</span></span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm">
              Platform marketplace fotografi pertama di Indonesia yang menghubungkan klien dengan visual creator secara transparan dan profesional.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-5 text-sm uppercase tracking-wider text-white/70">Produk</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li><a href="#" className="hover:text-primary transition-colors">Cari Fotografer</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Unggah Inspirasi</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Bandingkan Vendor</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Harga Vendor</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-5 text-sm uppercase tracking-wider text-white/70">Perusahaan</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li><a href="#" className="hover:text-primary transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Karier</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Kontak</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-5 text-sm uppercase tracking-wider text-white/70">Legal</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li><a href="#" className="hover:text-primary transition-colors">Syarat & Ketentuan</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pusat Bantuan</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Lensora Technologies. Hak Cipta Dilindungi.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Twitter</a>
            <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-primary transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
