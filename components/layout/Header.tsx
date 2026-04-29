"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { MegaMenu } from "./MegaMenu";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const categories = [
  {
    label: "Vinduer",
    href: "/produkter/vindu",
    sub: [
      "Fastkarm",
      "Toppsving",
      "Sidehengslet",
      "Topphengslet",
      "Rømningsvindu",
    ],
  },
  {
    label: "Innerdører",
    href: "/produkter/innerdor",
    sub: ["Massiv", "Med glass", "Formpresset", "Skyvedør"],
  },
  {
    label: "Ytterdører",
    href: "/produkter/ytterdor",
    sub: ["Enkel", "Med glass", "Med sidefelt", "Dobbel"],
  },
  {
    label: "Balkong & Skyvedør",
    href: "/produkter/balkongdor",
    sub: ["Balkongdør", "Dobbel balkong", "Skyvedør", "Foldedør"],
  },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { getItemCount, openCart } = useCartStore();
  const count = getItemCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[#F6F4EF]/90 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 lg:py-8">
            {/* Logo */}
            <Link href="/" className="flex items-center cursor-pointer">
              <Image
                src="/logo.png"
                alt="Vinduskongen AS"
                width={800}
                height={533}
                className="h-14 lg:h-[200px] w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {categories.map((cat) => (
                <div
                  key={cat.href}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(cat.label)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    href={cat.href}
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg cursor-pointer",
                      "text-[#0E0F12] hover:bg-[#E7E3DA] transition-colors duration-200"
                    )}
                  >
                    {cat.label}
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform duration-200",
                        activeMenu === cat.label && "rotate-180"
                      )}
                    />
                  </Link>
                  <AnimatePresence>
                    {activeMenu === cat.label && (
                      <MegaMenu
                        category={cat}
                        onClose={() => setActiveMenu(null)}
                      />
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Cart */}
              <button
                onClick={openCart}
                aria-label="Åpne handlekurv"
                className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#E7E3DA] transition-colors duration-200 cursor-pointer"
              >
                <ShoppingCart size={20} className="text-[#0E0F12]" />
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#B08A55] text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                  >
                    {count > 9 ? "9+" : count}
                  </motion.span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#E7E3DA] transition-colors cursor-pointer"
                aria-label="Meny"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-[#F6F4EF] shadow-2xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-[#E7E3DA]">
                <Image
                  src="/logo.png"
                  alt="Vinduskongen AS"
                  width={400}
                  height={267}
                  className="h-12 w-auto"
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#E7E3DA] cursor-pointer"
                  aria-label="Lukk meny"
                >
                  <X size={18} />
                </button>
              </div>
              <nav className="p-4 space-y-1">
                {categories.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 rounded-lg font-medium hover:bg-[#E7E3DA] transition-colors cursor-pointer"
                  >
                    {cat.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-[#E7E3DA]">
                  <Link
                    href="/om-oss"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-600 hover:text-[#0E0F12] cursor-pointer"
                  >
                    Om oss
                  </Link>
                  <Link
                    href="/kontakt"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-600 hover:text-[#0E0F12] cursor-pointer"
                  >
                    Kontakt
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
