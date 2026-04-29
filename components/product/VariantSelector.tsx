"use client";
import { formatDimensions, formatNOK } from "@/lib/format";
import type { Product, ProductVariant } from "@/lib/types";

interface Props {
  product: Product;
  selectedVariant: ProductVariant;
  onSelect: (variant: ProductVariant) => void;
}

const colorSwatch: Record<string, string> = {
  Hvit: "#FFFFFF",
  Sort: "#111111",
  Antrasitt: "#4A4A4A",
  Eik: "#A0784A",
};

export function VariantSelector({ product, selectedVariant, onSelect }: Props) {
  return (
    <div className="space-y-5">
      {/* Size + glass variants */}
      <div>
        <label className="block text-sm font-semibold text-[#0E0F12]/70 mb-3 uppercase tracking-wide">
          Størrelse &amp; glass
        </label>
        <div className="grid grid-cols-1 gap-2">
          {product.variants.map((v) => {
            const isSelected = v.id === selectedVariant.id;
            return (
              <button
                key={v.id}
                onClick={() => onSelect(v)}
                disabled={!v.inStock}
                className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                  !v.inStock
                    ? "opacity-40 cursor-not-allowed border-[#E7E3DA]"
                    : isSelected
                    ? "border-[#B08A55] bg-[#B08A55]/[0.06] shadow-[0_0_0_1px_#B08A55]"
                    : "border-[#E7E3DA] hover:border-[#B08A55]/50 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full border-2 border-[#E7E3DA] flex-shrink-0"
                    style={{ backgroundColor: colorSwatch[v.color] ?? "#ccc" }}
                  />
                  <div>
                    <div className="text-sm font-medium text-[#0E0F12]">
                      {formatDimensions(v.width, v.height)} · {v.glass}
                    </div>
                    <div className="text-xs text-[#0E0F12]/50">
                      {v.color}
                      {!v.inStock ? " · Ikke på lager" : ""}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-[#0E0F12]">{formatNOK(v.price)}</div>
                  {v.comparePrice !== undefined && v.comparePrice > v.price && (
                    <div className="text-xs text-[#0E0F12]/40 line-through">
                      {formatNOK(v.comparePrice)}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
