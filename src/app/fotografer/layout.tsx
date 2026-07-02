import { FotograferProvider } from "@/context/FotograferContext";
import FotograferSidebar from "./FotograferSidebar";

export default function FotograferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FotograferProvider>
      <div className="min-h-screen bg-surface-2 flex flex-col md:flex-row">
        <FotograferSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
          {children}
        </div>
      </div>
    </FotograferProvider>
  );
}
