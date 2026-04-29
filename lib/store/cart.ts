// TODO: Wave 2 — Implement Zustand cart store
// State: items: CartItem[], isOpen: boolean
// Actions: addItem, removeItem, incrementQty, decrementQty, clearCart, openCart, closeCart
// Persistence: zustand/middleware persist to localStorage

import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  price: number; // NOK, in øre (smallest unit)
  quantity: number;
  imageUrl: string;
  slug: string;
  kategori: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  incrementQty: (id: string) => void;
  decrementQty: (id: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

// stub — Wave 2 agent implements this
export const useCartStore = create<CartStore>(() => ({
  items: [],
  isOpen: false,
  addItem: () => {},
  removeItem: () => {},
  incrementQty: () => {},
  decrementQty: () => {},
  clearCart: () => {},
  openCart: () => {},
  closeCart: () => {},
  totalItems: () => 0,
  totalPrice: () => 0,
}));
