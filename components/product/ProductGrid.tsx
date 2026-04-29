import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/types";

interface Props {
  products: Product[];
  emptyMessage?: string;
}

export function ProductGrid({ products, emptyMessage = "Ingen produkter funnet." }: Props) {
  if (products.length === 0) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#E7E3DA] flex items-center justify-center mb-4">
          <span className="text-3xl text-[#0E0F12]/30">&#8709;</span>
        </div>
        <p className="text-[#0E0F12]/50 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
