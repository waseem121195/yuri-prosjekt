import { Hero } from "@/components/hero/Hero";
import { TrustBar } from "@/components/layout/TrustBar";
import { CategoryShowcase } from "@/components/marketing/CategoryShowcase";
import { USPSection } from "@/components/marketing/USPSection";
import { TestimonialCarousel } from "@/components/marketing/TestimonialCarousel";
import { CTABand } from "@/components/marketing/CTABand";
import { FeaturedProducts } from "@/components/marketing/FeaturedProducts";
import { getFeaturedProducts } from "@/lib/products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "Vinduskongen AS — Norges billigste vinduer og dører med 3-lags glass",
  },
  description:
    "PVC-vinduer og dører med 3-lags glass og 25 års garanti. Vi produserer og selger alle typer vinduer og dører med vedlikeholdsfri PVC. Best pris, best kvalitet — levert hjem til deg.",
};

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      <Hero />
      <TrustBar />
      <CategoryShowcase />
      <FeaturedProducts products={featuredProducts} />
      <USPSection />
      <TestimonialCarousel />
      <CTABand />
    </>
  );
}
