"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { PriceDisplay } from "./PriceDisplay";
import { useCartStore } from "@/lib/cart-store";
import { formatDimensions } from "@/lib/format";
import type { Product } from "@/lib/types";

const badgeColors: Record<string, string> = {
  Bestselger: "bg-[#0E0F12] text-white",
  Nyhet: "bg-[#7FB3C9] text-white",
  Tilbud: "bg-[#C5443B] text-white",
  Premium: "bg-[#B08A55] text-white",
};

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const { addItem, openCart } = useCartStore();
  const defaultVariant = product.variants[0];

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!defaultVariant) return;
    addItem({
      id: `${product.slug}-${defaultVariant.id}-${Date.now()}`,
      productSlug: product.slug,
      productName: product.name,
      variantId: defaultVariant.id,
      image: product.images[0] ?? "",
      price: defaultVariant.price,
      qty: 1,
      displayLabel: `${formatDimensions(defaultVariant.width, defaultVariant.height)} · ${defaultVariant.glass} · ${defaultVariant.color}`,
    });
    openCart();
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group bg-white rounded-2xl overflow-hidden border border-[#E7E3DA] hover:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.15)] transition-shadow duration-300"
    >
      <Link href={`/produkter/${product.category}/${product.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[#F6F4EF]">
          <Image
            src={product.images[0] ?? ""}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          />
          {/* Badges */}
          {product.badges && product.badges.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
              {product.badges.map((badge) => (
                <span
                  key={badge}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColors[badge] ?? "bg-[#0E0F12] text-white"}`}
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
          {/* Add to cart overlay button */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleAddToCart}
              aria-label="Legg i kurv"
              className="w-10 h-10 bg-[#B08A55] text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-[#9A7645] active:scale-95 transition-all duration-150 cursor-pointer"
            >
              <ShoppingCart size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="text-xs text-[#B08A55] font-semibold uppercase tracking-wide mb-1">
            {product.material} · {product.warrantyYears} år garanti
          </div>
          <h3 className="text-[#0E0F12] font-semibold text-base leading-tight mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-[#0E0F12]/55 text-sm leading-snug mb-4 line-clamp-2">{product.shortDescription}</p>

          {/* Variant pills */}
          {defaultVariant && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              <span className="text-xs px-2 py-1 bg-[#F6F4EF] border border-[#E7E3DA] rounded-full text-[#0E0F12]/70">
                {formatDimensions(defaultVariant.width, defaultVariant.height)}
              </span>
              <span className="text-xs px-2 py-1 bg-[#F6F4EF] border border-[#E7E3DA] rounded-full text-[#0E0F12]/70">
                {defaultVariant.glass}
              </span>
              <span className="text-xs px-2 py-1 bg-[#F6F4EF] border border-[#E7E3DA] rounded-full text-[#0E0F12]/70">
                {defaultVariant.color}
              </span>
            </div>
          )}

          <PriceDisplay
            price={defaultVariant?.price ?? 0}
            comparePrice={defaultVariant?.comparePrice}
            size="sm"
          />
        </div>
      </Link>
    </motion.div>
  );
}
