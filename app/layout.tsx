import type { Metadata, Viewport } from "next";
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
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/android-icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon-57x57.png", sizes: "57x57" },
      { url: "/apple-icon-60x60.png", sizes: "60x60" },
      { url: "/apple-icon-72x72.png", sizes: "72x72" },
      { url: "/apple-icon-76x76.png", sizes: "76x76" },
      { url: "/apple-icon-114x114.png", sizes: "114x114" },
      { url: "/apple-icon-120x120.png", sizes: "120x120" },
      { url: "/apple-icon-144x144.png", sizes: "144x144" },
      { url: "/apple-icon-152x152.png", sizes: "152x152" },
      { url: "/apple-icon-180x180.png", sizes: "180x180" },
    ],
  },
  other: {
    "msapplication-TileColor": "#ffffff",
    "msapplication-TileImage": "/ms-icon-144x144.png",
  },
  openGraph: {
    title: "AL Biology | Mostafa Khalifa",
    description:
      "Register for free chapter notes and the Nov 2026 A2 Biology course.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${caveat.variable}`}
    >
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
