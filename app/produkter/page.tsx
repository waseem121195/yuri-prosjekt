import { products } from "@/lib/products";
import { TrustBar } from "@/components/layout/TrustBar";
import { AllProductsClient } from "./AllProductsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alle produkter",
  description:
    "Se alle våre vinduer og dører. PVC med 3-lags glass og 25 års garanti.",
};

export default function ProdukterPage() {
  return (
    <>
      <TrustBar />
      <div className="min-h-screen bg-[#F6F4EF] pt-header">
        {/* Header */}
        <div className="bg-[#0E0F12] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-[#B08A55] text-sm font-semibold uppercase tracking-widest mb-3">
              Katalog
            </p>
            <h1
              className="text-white text-4xl lg:text-5xl font-bold"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              Alle produkter
            </h1>
            <p className="text-white/60 mt-3 text-lg">
              {products.length} produkter · Vinduer og dører
            </p>
          </div>
        </div>
        <AllProductsClient allProducts={products} />
      </div>
    </>
  );
}
