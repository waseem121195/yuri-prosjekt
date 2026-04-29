import type { GlassType, ColorOption, CustomSizingConfig } from "./types";

export function calculateCustomPrice(
  width: number,
  height: number,
  glass: GlassType,
  color: ColorOption,
  config: CustomSizingConfig
): number {
  const area = width * height;
  const base = config.basePricePerCm2 * area;
  const glassExtra = config.glassUpcharge[glass] ?? 0;
  const colorExtra = config.colorUpcharge[color] ?? 0;
  const total = base + glassExtra + colorExtra;
  // Round to nearest 10 NOK
  return Math.round(total / 10) * 10;
}

export function isValidSize(
  width: number,
  height: number,
  config: CustomSizingConfig
): boolean {
  return (
    width >= config.minWidth &&
    width <= config.maxWidth &&
    height >= config.minHeight &&
    height <= config.maxHeight
  );
}

export function getShippingCost(subtotal: number): number {
  return subtotal >= 5000 ? 0 : 499;
}

export function applyDiscount(
  subtotal: number,
  code: string
): { discount: number; valid: boolean; label: string } {
  if (code.toUpperCase() === "KONGE10") {
    return { discount: Math.round(subtotal * 0.1), valid: true, label: "10% rabatt (KONGE10)" };
  }
  return { discount: 0, valid: false, label: "" };
}
