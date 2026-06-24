"use client";

import { usePathname } from "next/navigation";
import PromoModal from "@/components/PromoModal";

export default function PromoModalGate() {
  const pathname = usePathname();

  if (pathname.startsWith("/register")) {
    return null;
  }

  return <PromoModal />;
}
