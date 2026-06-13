import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function FooterV3() {
  return (
    <footer className="bg-[#0F172A] rounded-t-[48px] pt-20 px-8 md:px-20 overflow-hidden relative -mt-12 md:-mt-20 z-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-white mb-20 relative z-10">
        
        {/* Left Column */}
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-4xl font-black uppercase tracking-tight mb-6 leading-none">
            Temukan<br />
            Photographer<br />
            Sesuai Style-mu
          </h3>
          <p className="text-sm font-semibold text-white/50 max-w-xs leading-relaxed mb-8">
            Platform marketplace fotografi #1 di Indonesia. Booking vendor transparan dan terpercaya.
          </p>
        </div>

        {/* Right Columns (Links) */}
        <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8 md:ml-auto">
          {/* Col 1 */}
          <div className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest text-white/50">
            <h4 className="text-white mb-2">Platform</h4>
            <Link href="#" className="hover:text-white transition-colors text-left flex items-center gap-1 group">
              Explore <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link href="#" className="hover:text-white transition-colors text-left flex items-center gap-1 group">
              Bandingkan <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link href="#" className="hover:text-white transition-colors text-left flex items-center gap-1 group">
              AI Match <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest text-white/50">
            <h4 className="text-white mb-2">Company</h4>
            <Link href="#" className="hover:text-white transition-colors text-left">About</Link>
            <Link href="#" className="hover:text-white transition-colors text-left">Careers</Link>
            <Link href="#" className="hover:text-white transition-colors text-left">Contact</Link>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-4 text-xs font-bold uppercase tracking-widest text-white/50">
            <h4 className="text-white mb-2">Legal</h4>
            <Link href="#" className="hover:text-white transition-colors text-left">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors text-left">Terms</Link>
          </div>
        </div>

      </div>

      {/* Footer Bottom Bar (above the huge text) */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium uppercase tracking-widest text-white/30 relative z-10 mb-8 border-t border-white/10 pt-8">
        <p>© {new Date().getFullYear()} Lensora. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-white transition-colors">Instagram</Link>
          <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
          <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
        </div>
      </div>

      {/* Massive Background Text */}
      <h1 className="text-[15vw] md:text-[18vw] leading-[0.75] font-black text-[#1E293B] text-center uppercase tracking-tighter select-none relative z-0 translate-y-[20%]">
        LENSORA
      </h1>
    </footer>
  );
}
