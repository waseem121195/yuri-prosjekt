import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartSheet } from "@/components/cart/CartSheet";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Vinduskongen AS",
    default: "Vinduskongen AS — Norges billigste vinduer og dører",
  },
  description:
    "PVC-vinduer og dører med 3-lags glass og 25 års garanti. Vi produserer og selger alle typer vinduer og dører med vedlikeholdsfri PVC. Best pris, best kvalitet.",
  keywords: [
    "vinduer",
    "dører",
    "PVC",
    "3-lags glass",
    "energivinduer",
    "vinduskongen",
  ],
  openGraph: {
    type: "website",
    locale: "nb_NO",
    siteName: "Vinduskongen AS",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nb" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;1,9..144,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#F6F4EF] text-[#0E0F12] antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <CartSheet />
      </body>
    </html>
  );
}
