import { notFound } from "next/navigation";
import { getProductsByCategory } from "@/lib/products";
import { TrustBar } from "@/components/layout/TrustBar";
import { CategoryPageClient } from "./CategoryPageClient";
import type { Category } from "@/lib/types";
import type { Metadata } from "next";

const categoryMeta: Record<
  string,
  { title: string; description: string; heroText: string }
> = {
  vindu: {
    title: "Vinduer",
    description:
      "PVC-vinduer med 3-lags glass og 25 års garanti. Fastkarm, toppsving, sidehengslet og mer.",
    heroText: "Energieffektive vinduer for norsk klima",
  },
  innerdor: {
    title: "Innerdører",
    description:
      "Innerdører i massiv eik, PVC og MDF med glass. Skyvedører og klassiske formpressede dører.",
    heroText: "Kvalitetsdører for hvert rom",
  },
  ytterdor: {
    title: "Ytterdører",
    description:
      "Solide ytterdører i vedlikeholdsfri PVC med 3-punkts lås. Sort, antrasitt og hvit.",
    heroText: "Sikker og eksklusiv entré",
  },
  balkongdor: {
    title: "Balkong & Skyvedører",
    description:
      "Balkongdører og skyvedører med 3-lags glass. Sømløs overgang mellom inne og ute.",
    heroText: "Åpne opp mot terrassen",
  },
};

const validCategories: Category[] = [
  "vindu",
  "innerdor",
  "ytterdor",
  "balkongdor",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ kategori: string }>;
}): Promise<Metadata> {
  const { kategori } = await params;
  const meta = categoryMeta[kategori];
  if (!meta) return { title: "Ikke funnet" };
  return { title: meta.title, description: meta.description };
}

export function generateStaticParams() {
  return validCategories.map((k) => ({ kategori: k }));
}

export default async function KategoriPage({
  params,
}: {
  params: Promise<{ kategori: string }>;
}) {
  const { kategori } = await params;
  if (!validCategories.includes(kategori as Category)) notFound();

  const meta = categoryMeta[kategori];
  const categoryProducts = getProductsByCategory(kategori as Category);

  return (
    <>
      <TrustBar />
      <div className="min-h-screen bg-[#F6F4EF] pt-header">
        {/* Hero banner */}
        <div className="bg-[#0E0F12] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-[#B08A55] text-sm font-semibold uppercase tracking-widest mb-3">
              Vinduskongen · {meta.title}
            </p>
            <h1
              className="text-white text-4xl lg:text-5xl font-bold mb-2"
              style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            >
              {meta.title}
            </h1>
            <p className="text-white/60 text-lg">{meta.heroText}</p>
            <p className="text-white/40 text-sm mt-2">
              {categoryProducts.length} produkter
            </p>
          </div>
        </div>

        <CategoryPageClient products={categoryProducts} maxPrice={30000} />
      </div>
    </>
  );
}
