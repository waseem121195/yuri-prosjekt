"use client";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/lib/types";
import { useRef, useState, useCallback, useEffect } from "react";

interface Props {
  products: Product[];
}

export function FeaturedProducts({ products }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

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

  if (products.length === 0) return null;

  const scroll = (dir: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "next" ? el.clientWidth : -el.clientWidth, behavior: "smooth" });
  };

  return (
    <section className="py-20 lg:py-24 bg-[#F6F4EF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p
              className="text-[#B08A55] text-sm font-semibold uppercase tracking-widest mb-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Populære valg
            </p>
            <h2
              className="text-[#0E0F12] text-3xl lg:text-5xl leading-tight"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              Utvalgte produkter
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/produkter"
              className="hidden lg:flex items-center gap-2 text-sm font-semibold text-[#0E0F12] hover:text-[#B08A55] transition-colors cursor-pointer mr-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Se alle produkter
              <ArrowRight size={14} aria-hidden="true" />
            </Link>

            {/* Prev / Next arrows */}
            <button
              onClick={() => scroll("prev")}
              disabled={atStart}
              aria-label="Forrige produkter"
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
              aria-label="Neste produkter"
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

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 lg:gap-5 overflow-x-auto pb-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {products.map((product) => (
            <div
              key={product.slug}
              className="snap-start flex-shrink-0"
              style={{ width: "clamp(230px, 22vw, 290px)" }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Mobile link */}
        <div className="lg:hidden text-center mt-6">
          <Link
            href="/produkter"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E0F12] hover:text-[#B08A55] transition-colors cursor-pointer"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Se alle produkter <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
