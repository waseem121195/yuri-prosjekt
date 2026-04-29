import { notFound } from "next/navigation";
import { getProductBySlug, getAllSlugs } from "@/lib/products";
import { TrustBar } from "@/components/layout/TrustBar";
import { ProductDetailClient } from "./ProductDetailClient";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ kategori: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Ikke funnet" };
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export function generateStaticParams() {
  return getAllSlugs().map(({ kategori, slug }) => ({ kategori, slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ kategori: string; slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <TrustBar />
      <div className="min-h-screen bg-[#F6F4EF] pt-header">
        <ProductDetailClient product={product} />
      </div>
    </>
  );
}
