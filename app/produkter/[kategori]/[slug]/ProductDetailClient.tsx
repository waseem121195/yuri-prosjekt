"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  ChevronRight,
  Shield,
  CheckCircle2,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PriceDisplay } from "@/components/product/PriceDisplay";
import { VariantSelector } from "@/components/product/VariantSelector";
import { CustomSizeDialog } from "@/components/product/CustomSizeDialog";
import { useCartStore } from "@/lib/cart-store";
import { formatDimensions } from "@/lib/format";
import type { Product, ProductVariant } from "@/lib/types";

const categoryLabels: Record<string, string> = {
  vindu: "Vinduer",
  innerdor: "Innerdører",
  ytterdor: "Ytterdører",
  balkongdor: "Balkong & Skyvedør",
};

const badgeColors: Record<string, string> = {
  Bestselger: "bg-[#0E0F12] text-white",
  Nyhet: "bg-[#7FB3C9] text-white",
  Tilbud: "bg-[#C5443B] text-white",
  Premium: "bg-[#B08A55] text-white",
};

interface Props {
  product: Product;
}

export function ProductDetailClient({ product }: Props) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [activeImage, setActiveImage] = useState(0);
  const { addItem, openCart } = useCartStore();

  function handleAddToCart() {
    if (!selectedVariant || !selectedVariant.inStock) return;
    addItem({
      id: `${product.slug}-${selectedVariant.id}-${Date.now()}`,
      productSlug: product.slug,
      productName: product.name,
      variantId: selectedVariant.id,
      image: product.images[0] ?? "",
      price: selectedVariant.price,
      qty: 1,
      displayLabel: `${formatDimensions(selectedVariant.width, selectedVariant.height)} · ${selectedVariant.glass} · ${selectedVariant.color}`,
    });
    openCart();
  }

  const prevImage = () =>
    setActiveImage((i) => (i - 1 + product.images.length) % product.images.length);
  const nextImage = () =>
    setActiveImage((i) => (i + 1) % product.images.length);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#0E0F12]/50 mb-8">
        <Link href="/" className="hover:text-[#0E0F12] transition-colors cursor-pointer">
          Hjem
        </Link>
        <ChevronRight size={14} />
        <Link href="/produkter" className="hover:text-[#0E0F12] transition-colors cursor-pointer">
          Produkter
        </Link>
        <ChevronRight size={14} />
        <Link
          href={`/produkter/${product.category}`}
          className="hover:text-[#0E0F12] transition-colors cursor-pointer"
        >
          {categoryLabels[product.category] || product.category}
        </Link>
        <ChevronRight size={14} />
        <span className="text-[#0E0F12] font-medium line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
        {/* LEFT: Image gallery */}
        <div>
          {/* Main image */}
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#F6F4EF] border border-[#E7E3DA] mb-4">
            <Image
              key={activeImage}
              src={product.images[activeImage] ?? product.images[0] ?? ""}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Badges */}
            {product.badges && product.badges.length > 0 && (
              <div className="absolute top-4 left-4 flex gap-2">
                {product.badges.map((b) => (
                  <span
                    key={b}
                    className={`text-xs font-bold px-3 py-1.5 rounded-full ${badgeColors[b] || "bg-[#0E0F12] text-white"}`}
                  >
                    {b}
                  </span>
                ))}
              </div>
            )}
            {/* Nav arrows (only if multiple images) */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors cursor-pointer"
                  aria-label="Forrige bilde"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors cursor-pointer"
                  aria-label="Neste bilde"
                >
                  <ChevronRightIcon size={16} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    i === activeImage
                      ? "border-[#B08A55] shadow-md"
                      : "border-transparent hover:border-[#E7E3DA]"
                  }`}
                  aria-label={`Bilde ${i + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    className="object-contain"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Product info */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Category + material */}
            <p className="text-[#B08A55] text-sm font-semibold uppercase tracking-wider mb-2">
              {categoryLabels[product.category]} · {product.material}
            </p>

            {/* Product name */}
            <h1
              className="text-[#0E0F12] text-3xl lg:text-4xl font-bold mb-3 leading-tight"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              {product.name}
            </h1>

            {/* Short description */}
            <p className="text-[#0E0F12]/65 text-base leading-relaxed mb-6">
              {product.shortDescription}
            </p>

            {/* Price */}
            <div className="mb-6">
              <PriceDisplay
                price={selectedVariant?.price ?? 0}
                comparePrice={selectedVariant?.comparePrice}
                size="lg"
              />
              <p className="text-xs text-[#0E0F12]/40 mt-1">Inkl. 25% MVA · eks. frakt</p>
            </div>

            {/* Quick trust pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-[#B08A55]/10 text-[#8B6A3E] rounded-full border border-[#B08A55]/20">
                <Shield size={12} />
                {product.warrantyYears} års garanti
              </span>
            </div>

            {/* Variant selector */}
            <div className="mb-5">
              <VariantSelector
                product={product}
                selectedVariant={selectedVariant}
                onSelect={setSelectedVariant}
              />
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant?.inStock}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 bg-[#B08A55] text-white font-semibold rounded-xl hover:bg-[#9A7645] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer shadow-[0_4px_16px_-4px_rgba(176,138,85,0.5)]"
              >
                <ShoppingCart size={17} />
                {selectedVariant?.inStock ? "Legg i kurv" : "Ikke på lager"}
              </button>
              {product.customSizing.enabled && (
                <div className="flex-1">
                  <CustomSizeDialog product={product} />
                </div>
              )}
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-5 border border-[#E7E3DA] mb-6">
              <h3 className="text-sm font-semibold text-[#0E0F12]/60 uppercase tracking-wide mb-4">
                Egenskaper
              </h3>
              <ul className="space-y-2.5">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-[#0E0F12]/80">
                    <CheckCircle2 size={15} className="text-[#B08A55] flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold text-[#0E0F12]/60 uppercase tracking-wide mb-3">
                Produktbeskrivelse
              </h3>
              <p className="text-[#0E0F12]/70 text-sm leading-relaxed">{product.description}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
