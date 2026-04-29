"use client";
import { useState, useMemo } from "react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductFilters, type FilterState } from "@/components/product/ProductFilters";
import type { Product } from "@/lib/types";

interface Props {
  allProducts: Product[];
}

export function AllProductsClient({ allProducts }: Props) {
  const [filters, setFilters] = useState<FilterState>({
    glass: [],
    colors: [],
    maxPrice: 30000,
  });

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      const variantMatch = p.variants.some((v) => {
        const glassOk =
          filters.glass.length === 0 || filters.glass.includes(v.glass);
        const colorOk =
          filters.colors.length === 0 || filters.colors.includes(v.color);
        const priceOk = v.price <= filters.maxPrice;
        return glassOk && colorOk && priceOk;
      });
      return variantMatch;
    });
  }, [allProducts, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex gap-8 lg:gap-12">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="sticky top-24">
            <ProductFilters onFilter={setFilters} maxPriceLimit={30000} />
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Mobile filters */}
          <div className="lg:hidden mb-6">
            <ProductFilters onFilter={setFilters} maxPriceLimit={30000} />
          </div>
          <div className="flex items-center justify-between mb-6">
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
