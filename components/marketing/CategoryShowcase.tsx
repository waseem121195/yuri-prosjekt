"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useCallback, useEffect } from "react";

const categories = [
  {
    label: "Vinduer",
    sub: "Fastkarm · Toppsving · Sidehengslet",
    href: "/produkter/vindu",
    image: "/images/55fdb808f45eb594f813e970e9b859a8.jpg",
    count: 12,
  },
  {
    label: "Innerdører",
    sub: "Massiv · Med glass · Formpresset",
    href: "/produkter/innerdor",
    image: "/images/1cb530fc53e64539d12a77facebad7ff.jpg",
    count: 4,
  },
  {
    label: "Ytterdører",
    sub: "Enkel · Med glass · Med sidefelt",
    href: "/produkter/ytterdor",
    image: "/images/1ebd33e5287bb465c7f918b4156ebbd8.jpg",
    count: 4,
  },
  {
    label: "Balkong & Skyvedør",
    sub: "Balkong · Skyvedør · Foldedør",
    href: "/produkter/balkongdor",
    image: "/images/6fa1352a6a87c1b80b48fdfb820a7675.jpg",
    count: 4,
  },
];

export function CategoryShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const reduceMotion = useReducedMotion();

  const checkBounds = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    checkBounds();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkBounds, { passive: true });
    window.addEventListener("resize", checkBounds);
    return () => {
      el.removeEventListener("scroll", checkBounds);
      window.removeEventListener("resize", checkBounds);
    };
  }, [checkBounds]);

  const scroll = (dir: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.72;
    el.scrollBy({ left: dir === "next" ? step : -step, behavior: "smooth" });
  };

  return (
    <section className="py-16 lg:py-24 bg-[#F6F4EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header row */}
        <div className="flex items-end justify-between mb-8 lg:mb-10">
          <div>
            <p
              className="text-[#B08A55] text-sm font-semibold uppercase tracking-widest mb-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Våre kategorier
            </p>
            <h2
              className="text-[#0E0F12] text-3xl lg:text-5xl leading-tight"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              Finn ditt perfekte valg
            </h2>
          </div>

          {/* Arrow navigation */}
          <div className="flex gap-2.5 flex-shrink-0">
            <button
              onClick={() => scroll("prev")}
              disabled={atStart}
              aria-label="Forrige kategori"
              className="w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
              style={{ borderColor: "#0E0F12", color: "#0E0F12" }}
              onMouseEnter={(e) => {
                if (!atStart) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#0E0F12";
                  (e.currentTarget as HTMLButtonElement).style.color = "#F6F4EF";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = "#0E0F12";
              }}
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            <button
              onClick={() => scroll("next")}
              disabled={atEnd}
              aria-label="Neste kategori"
              className="w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all duration-200 disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer"
              style={{ borderColor: "#0E0F12", color: "#0E0F12" }}
              onMouseEnter={(e) => {
                if (!atEnd) {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#0E0F12";
                  (e.currentTarget as HTMLButtonElement).style.color = "#F6F4EF";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                (e.currentTarget as HTMLButtonElement).style.color = "#0E0F12";
              }}
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Scrollable cards row */}
        <div
          ref={scrollRef}
          className="flex gap-4 lg:gap-5 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {categories.map((cat, i) => (
            <motion.div
              key={cat.href}
              initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="relative group overflow-hidden rounded-2xl cursor-pointer flex-shrink-0"
              style={{ width: "clamp(270px, 28vw, 400px)", height: 380 }}
            >
              <Link href={cat.href} className="block h-full">
                {/* Background image */}
                <div className="absolute inset-0">
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0F12]/90 via-[#0E0F12]/30 to-transparent" />
                </div>

                {/* Text content */}
                <div className="relative h-full flex flex-col justify-end p-7">
                  <div
                    className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {cat.count} produkter
                  </div>
                  <h3
                    className="text-white text-2xl lg:text-3xl font-bold mb-2"
                    style={{ fontFamily: "'Fraunces', Georgia, serif" }}
                  >
                    {cat.label}
                  </h3>
                  <p
                    className="text-white/55 text-sm mb-5"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {cat.sub}
                  </p>
                  <div
                    className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 group-hover:gap-3"
                    style={{ color: "#B08A55", fontFamily: "'Inter', sans-serif" }}
                  >
                    Se alle
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile: see all link */}
        <div className="text-center mt-6 lg:hidden">
          <Link
            href="/produkter"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E0F12] hover:text-[#B08A55] transition-colors cursor-pointer"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Se alle produkter
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
