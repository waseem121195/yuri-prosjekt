"use client";
import { useState, useMemo } from "react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductFilters, type FilterState } from "@/components/product/ProductFilters";
import type { Product } from "@/lib/types";

interface Props {
  products: Product[];
  maxPrice: number;
}

export function CategoryPageClient({ products, maxPrice }: Props) {
  const [filters, setFilters] = useState<FilterState>({
    glass: [],
    colors: [],
    maxPrice,
  });

  const filtered = useMemo(() => {
    return products.filter((p) =>
      p.variants.some((v) => {
        const glassOk =
          filters.glass.length === 0 || filters.glass.includes(v.glass);
        const colorOk =
          filters.colors.length === 0 || filters.colors.includes(v.color);
        return glassOk && colorOk && v.price <= filters.maxPrice;
      })
    );
  }, [products, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex gap-8 lg:gap-12">
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-24">
            <ProductFilters onFilter={setFilters} maxPriceLimit={maxPrice} />
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="lg:hidden mb-6">
            <ProductFilters onFilter={setFilters} maxPriceLimit={maxPrice} />
          </div>
          <div className="mb-6">
            <p className="text-[#0E0F12]/60 text-sm">{filtered.length} produkter</p>
          </div>
          <ProductGrid
            products={filtered}
            emptyMessage="Ingen produkter matcher dine filtere."
          />
        </div>
      </div>
    </div>
  );
}
