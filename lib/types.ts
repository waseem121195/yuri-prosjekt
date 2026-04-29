export type Category = "vindu" | "innerdor" | "ytterdor" | "balkongdor";

export type WindowType =
  | "fastkarm"
  | "toppsving"
  | "sidehengslet"
  | "topphengslet"
  | "romning"
  | "sprosser"
  | "2-rams";

export type GlassType = "2-lags" | "3-lags";

export type ColorOption = "Hvit" | "Sort" | "Antrasitt" | "Eik";

export type BadgeType = "Bestselger" | "Nyhet" | "Tilbud" | "Premium";

export interface ProductVariant {
  id: string;
  width: number; // cm
  height: number; // cm
  glass: GlassType;
  color: ColorOption;
  price: number; // NOK
  comparePrice?: number;
  inStock: boolean;
}

export interface CustomSizingConfig {
  enabled: boolean;
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  basePricePerCm2: number;
  glassUpcharge: Record<GlassType, number>;
  colorUpcharge: Record<ColorOption, number>;
}

export interface Product {
  slug: string;
  name: string;
  category: Category;
  type?: WindowType;
  shortDescription: string;
  description: string;
  uValue?: number;
  warrantyYears: number;
  material: string;
  images: string[];
  variants: ProductVariant[];
  customSizing: CustomSizingConfig;
  features: string[];
  badges?: BadgeType[];
}

export interface CartItem {
  id: string; // unique line id
  productSlug: string;
  productName: string;
  variantId?: string;
  customSize?: { width: number; height: number; glass: GlassType; color: ColorOption };
  image: string;
  price: number;
  qty: number;
  displayLabel: string; // "80×100 cm · 3-lags · Hvit"
}

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  notes?: string;
}
