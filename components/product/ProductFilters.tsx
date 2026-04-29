"use client";
import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import type { GlassType, ColorOption } from "@/lib/types";

export interface FilterState {
  glass: GlassType[];
  colors: ColorOption[];
  maxPrice: number;
}

interface Props {
  onFilter: (filters: FilterState) => void;
  maxPriceLimit?: number;
}

const glassOptions: GlassType[] = ["2-lags", "3-lags"];
const colorOptions: ColorOption[] = ["Hvit", "Sort", "Antrasitt", "Eik"];

export function ProductFilters({ onFilter, maxPriceLimit = 30000 }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [glass, setGlass] = useState<GlassType[]>([]);
  const [colors, setColors] = useState<ColorOption[]>([]);
  const [maxPrice, setMaxPrice] = useState(maxPriceLimit);

  function toggleGlass(g: GlassType) {
    const next = glass.includes(g) ? glass.filter((x) => x !== g) : [...glass, g];
    setGlass(next);
    onFilter({ glass: next, colors, maxPrice });
  }

  function toggleColor(c: ColorOption) {
    const next = colors.includes(c) ? colors.filter((x) => x !== c) : [...colors, c];
    setColors(next);
    onFilter({ glass, colors: next, maxPrice });
  }

  function handlePriceChange(val: number) {
    setMaxPrice(val);
    onFilter({ glass, colors, maxPrice: val });
  }

  function clearAll() {
    setGlass([]);
    setColors([]);
    setMaxPrice(maxPriceLimit);
    onFilter({ glass: [], colors: [], maxPrice: maxPriceLimit });
  }

  const activeCount = glass.length + colors.length + (maxPrice < maxPriceLimit ? 1 : 0);

  const colorMap: Record<ColorOption, string> = {
    Hvit: "#FFFFFF",
    Sort: "#111111",
    Antrasitt: "#4A4A4A",
    Eik: "#A0784A",
  };

  return (
    <div>
      {/* Mobile toggle */}
      <div className="flex items-center justify-between mb-4 lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E7E3DA] rounded-xl text-sm font-medium hover:border-[#B08A55] transition-colors cursor-pointer"
        >
          <SlidersHorizontal size={15} />
          Filtrer
          {activeCount > 0 && (
            <span className="w-5 h-5 bg-[#B08A55] text-white text-xs rounded-full flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </button>
        {activeCount > 0 && (
          <button onClick={clearAll} className="text-sm text-[#C5443B] hover:underline cursor-pointer">
            Nullstill
          </button>
        )}
      </div>

      {/* Filter panel */}
      <div className={`${isOpen ? "block" : "hidden"} lg:block space-y-6`}>
        {/* Header (desktop) */}
        <div className="hidden lg:flex items-center justify-between">
          <h3 className="font-semibold text-[#0E0F12]">Filtre</h3>
          {activeCount > 0 && (
            <button
              onClick={clearAll}
              className="text-xs text-[#C5443B] hover:underline cursor-pointer flex items-center gap-1"
            >
              <X size={12} />
              Nullstill
            </button>
          )}
        </div>

        {/* Glass type */}
        <div>
          <h4 className="text-sm font-semibold text-[#0E0F12]/60 uppercase tracking-wide mb-3">
            Glasstype
          </h4>
          <div className="space-y-2">
            {glassOptions.map((g) => (
              <label key={g} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={glass.includes(g)}
                  onChange={() => toggleGlass(g)}
                  className="w-4 h-4 rounded border-[#E7E3DA] accent-[#B08A55] cursor-pointer"
                />
                <span className="text-sm text-[#0E0F12]/80 group-hover:text-[#0E0F12] transition-colors">
                  {g}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Color */}
        <div>
          <h4 className="text-sm font-semibold text-[#0E0F12]/60 uppercase tracking-wide mb-3">
            Farge
          </h4>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((c) => (
              <button
                key={c}
                onClick={() => toggleColor(c)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-150 cursor-pointer ${
                  colors.includes(c)
                    ? "border-[#B08A55] bg-[#B08A55]/10 text-[#B08A55]"
                    : "border-[#E7E3DA] text-[#0E0F12]/70 hover:border-[#B08A55]/50"
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full border border-[#0E0F12]/10"
                  style={{ backgroundColor: colorMap[c] }}
                />
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Price range */}
        <div>
          <h4 className="text-sm font-semibold text-[#0E0F12]/60 uppercase tracking-wide mb-3">
            Maks pris
          </h4>
          <input
            type="range"
            min={1000}
            max={maxPriceLimit}
            step={500}
            value={maxPrice}
            onChange={(e) => handlePriceChange(Number(e.target.value))}
            className="w-full accent-[#B08A55] cursor-pointer"
          />
          <div className="flex justify-between text-xs text-[#0E0F12]/50 mt-1">
            <span>1 000 kr</span>
            <span className="font-medium text-[#0E0F12]">
              {maxPrice === maxPriceLimit
                ? "Alle priser"
                : `Inntil ${maxPrice.toLocaleString("nb-NO")} kr`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
