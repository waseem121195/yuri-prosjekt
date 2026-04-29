"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Ruler, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { calculateCustomPrice, isValidSize } from "@/lib/pricing";
import { formatNOK, formatDimensions } from "@/lib/format";
import { useCartStore } from "@/lib/cart-store";
import type { Product, GlassType, ColorOption } from "@/lib/types";

const glassOptions: GlassType[] = ["2-lags", "3-lags"];
const colorOptions: ColorOption[] = ["Hvit", "Sort", "Antrasitt", "Eik"];

const swatchMap: Record<ColorOption, string> = {
  Hvit: "#FFFFFF",
  Sort: "#111111",
  Antrasitt: "#4A4A4A",
  Eik: "#A0784A",
};

interface Props {
  product: Product;
}

export function CustomSizeDialog({ product }: Props) {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [glass, setGlass] = useState<GlassType>("3-lags");
  const [color, setColor] = useState<ColorOption>("Hvit");
  const { addItem, openCart } = useCartStore();

  const cfg = product.customSizing;
  const w = parseInt(width) || 0;
  const h = parseInt(height) || 0;
  const valid = w > 0 && h > 0 && isValidSize(w, h, cfg);
  const price = valid ? calculateCustomPrice(w, h, glass, color, cfg) : 0;

  function handleAdd() {
    if (!valid) return;
    addItem({
      id: `${product.slug}-custom-${w}x${h}-${glass}-${color}-${Date.now()}`,
      productSlug: product.slug,
      productName: product.name,
      customSize: { width: w, height: h, glass, color },
      image: product.images[0] ?? "",
      price,
      qty: 1,
      displayLabel: `${formatDimensions(w, h)} · ${glass} · ${color} (på mål)`,
    });
    openCart();
    setOpen(false);
    setWidth("");
    setHeight("");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full gap-2 border-[#B08A55] text-[#B08A55] hover:bg-[#B08A55] hover:text-white transition-all duration-200 cursor-pointer"
        >
          <Ruler size={15} />
          Bestill på mål
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-[#F6F4EF] border-[#E7E3DA]">
        <DialogHeader>
          <DialogTitle
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
            className="text-[#0E0F12] text-xl"
          >
            Bestill på mål
          </DialogTitle>
          <p className="text-sm text-[#0E0F12]/60 mt-1">
            Oppgi ønsket størrelse i cm ({cfg.minWidth}–{cfg.maxWidth} × {cfg.minHeight}–
            {cfg.maxHeight} cm)
          </p>
        </DialogHeader>

        <div className="space-y-5 mt-2">
          {/* Dimensions */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs font-semibold uppercase tracking-wide text-[#0E0F12]/60 mb-2 block">
                Bredde (cm)
              </Label>
              <Input
                type="number"
                placeholder={`${cfg.minWidth}–${cfg.maxWidth}`}
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="border-[#E7E3DA] focus:border-[#B08A55] focus:ring-[#B08A55]/20"
                min={cfg.minWidth}
                max={cfg.maxWidth}
              />
            </div>
            <div>
              <Label className="text-xs font-semibold uppercase tracking-wide text-[#0E0F12]/60 mb-2 block">
                Høyde (cm)
              </Label>
              <Input
                type="number"
                placeholder={`${cfg.minHeight}–${cfg.maxHeight}`}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="border-[#E7E3DA] focus:border-[#B08A55] focus:ring-[#B08A55]/20"
                min={cfg.minHeight}
                max={cfg.maxHeight}
              />
            </div>
          </div>

          {/* Glass type */}
          <div>
            <Label className="text-xs font-semibold uppercase tracking-wide text-[#0E0F12]/60 mb-2 block">
              Glasstype
            </Label>
            <div className="flex gap-2">
              {glassOptions.map((g) => (
                <button
                  key={g}
                  onClick={() => setGlass(g)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all duration-150 cursor-pointer ${
                    glass === g
                      ? "bg-[#0E0F12] text-white border-[#0E0F12]"
                      : "bg-white border-[#E7E3DA] text-[#0E0F12] hover:border-[#B08A55]/50"
                  }`}
                >
                  {g}
                  {g === "3-lags" && <span className="ml-1 text-[#B08A55]">★</span>}
                </button>
              ))}
            </div>
            {glass === "2-lags" && (
              <p className="text-xs text-[#0E0F12]/50 mt-1">
                3-lags anbefales for best energiytelse
              </p>
            )}
          </div>

          {/* Color */}
          <div>
            <Label className="text-xs font-semibold uppercase tracking-wide text-[#0E0F12]/60 mb-2 block">
              Farge
            </Label>
            <div className="flex gap-2 flex-wrap">
              {colorOptions.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                    color === c
                      ? "border-[#B08A55] bg-[#B08A55]/10 text-[#B08A55]"
                      : "border-[#E7E3DA] text-[#0E0F12]/70"
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-[#0E0F12]/10"
                    style={{ backgroundColor: swatchMap[c] }}
                  />
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Live price */}
          {valid && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-4 border border-[#E7E3DA]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#0E0F12]/50 mb-0.5">Estimert pris på mål</div>
                  <div
                    className="text-2xl font-bold text-[#0E0F12]"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    {formatNOK(price)}
                  </div>
                  <div className="text-xs text-[#0E0F12]/40 mt-0.5">
                    {formatDimensions(w, h)} · {glass} · {color}
                  </div>
                </div>
                <div className="text-right text-xs text-[#0E0F12]/40">
                  <div>Inkl. MVA</div>
                  <div>eks. frakt</div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Validation error */}
          {(w > 0 || h > 0) && !valid && (
            <p className="text-sm text-[#C5443B]">
              Størrelse må være mellom {cfg.minWidth}–{cfg.maxWidth} cm bredde og {cfg.minHeight}–
              {cfg.maxHeight} cm høyde.
            </p>
          )}

          <Button
            onClick={handleAdd}
            disabled={!valid}
            className="w-full gap-2 bg-[#B08A55] hover:bg-[#9A7645] text-white font-semibold py-3 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={16} />
            Legg i kurv — {valid ? formatNOK(price) : "oppgi mål"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
