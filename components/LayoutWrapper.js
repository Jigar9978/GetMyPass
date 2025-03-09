"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const shouldApplyPadding = !isAdminRoute;

  return (
    <>
      {!isAdminRoute && <Navbar />} {/* Admin page pe nahi dikhega */}
      <main style={{ paddingTop: shouldApplyPadding ? '80px' : '0px' }}>{children}</main>
      {!isAdminRoute && <Footer />} {/* Admin page pe nahi dikhega */}
    </>
  );
}
