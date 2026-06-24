import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Caveat } from "next/font/google";
import { RegisterProvider } from "@/components/RegisterModal";
import { CourseRegisterProvider } from "@/components/CourseRegisterModal";
import PromoModalGate from "@/components/PromoModalGate";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AL Biology | Mostafa Khalifa",
  description:
    "Unlock your A* in AL Biology with comprehensive notes, live classes, and dedicated support from Mostafa Khalifa — 99% student success rate.",
  keywords: [
    "A2 Biology",
    "AL Biology",
    "Cambridge Biology",
    "Mostafa Khalifa",
    "Biology notes",
    "A* Biology",
  ],
  openGraph: {
    title: "AL Biology | Mostafa Khalifa",
    description:
      "Register for free chapter notes and the Nov 2026 A2 Biology course.",
    type: "website",
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${caveat.variable}`}>
      <body className="font-sans">
        <RegisterProvider>
          <CourseRegisterProvider>
            <PromoModalGate />
            {children}
          </CourseRegisterProvider>
        </RegisterProvider>
      </body>
    </html>
  );
}
