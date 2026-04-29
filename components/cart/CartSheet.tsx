"use client";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag, X } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

function formatNOK(amount: number) {
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function CartSheet() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQty,
    getSubtotal,
    discountAmount,
  } = useCartStore();

  const subtotal = getSubtotal();
  const freeShippingThreshold = 5000;
  const shippingFee = subtotal >= freeShippingThreshold ? 0 : 490;
  const total = subtotal - discountAmount + shippingFee;
  const remaining = freeShippingThreshold - subtotal;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md flex flex-col p-0 bg-[#F6F4EF] border-l border-[#E7E3DA]"
      >
        {/* Header */}
        <SheetHeader className="flex flex-row items-center justify-between px-6 py-4 border-b border-[#E7E3DA] space-y-0">
          <SheetTitle className="font-display text-lg font-semibold text-[#0E0F12]">
            Handlekurv
          </SheetTitle>
          <button
            onClick={closeCart}
            aria-label="Lukk handlekurv"
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#E7E3DA] transition-colors cursor-pointer"
          >
            <X size={16} className="text-[#0E0F12]" />
          </button>
        </SheetHeader>

        {/* Free shipping progress */}
        {subtotal > 0 && subtotal < freeShippingThreshold && (
          <div className="px-6 py-3 bg-[#E7E3DA]/60">
            <p className="text-xs text-[#0E0F12]/70 mb-1.5">
              Legg til{" "}
              <span className="font-semibold text-[#B08A55]">
                {formatNOK(remaining)}
              </span>{" "}
              for fri frakt
            </p>
            <div className="h-1 bg-[#E7E3DA] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#B08A55] rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`,
                }}
              />
            </div>
          </div>
        )}

        {subtotal >= freeShippingThreshold && subtotal > 0 && (
          <div className="px-6 py-3 bg-[#B08A55]/10 border-b border-[#B08A55]/20">
            <p className="text-xs font-semibold text-[#B08A55]">
              Du har fri frakt på denne bestillingen
            </p>
          </div>
        )}

        {/* Item list */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-[#E7E3DA] flex items-center justify-center">
                <ShoppingBag size={28} className="text-[#0E0F12]/40" />
              </div>
              <div>
                <p className="font-semibold text-[#0E0F12] mb-1">
                  Handlekurven er tom
                </p>
                <p className="text-sm text-[#0E0F12]/50">
                  Legg til produkter for å komme i gang
                </p>
              </div>
              <button
                onClick={closeCart}
                className="mt-2 px-6 py-2.5 bg-[#0E0F12] text-white text-sm font-medium rounded-xl hover:bg-[#1F2A37] transition-colors cursor-pointer"
              >
                Se alle produkter
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 bg-white rounded-xl p-3 border border-[#E7E3DA]"
              >
                {/* Thumbnail */}
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#E7E3DA]">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.productName}
                      fill
                      sizes="64px"
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag size={20} className="text-[#0E0F12]/30" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#0E0F12] leading-snug truncate">
                    {item.productName}
                  </p>
                  {item.displayLabel && (
                    <p className="text-xs text-[#0E0F12]/50 mt-0.5 truncate">
                      {item.displayLabel}
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    {/* Quantity controls */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        aria-label="Reduser antall"
                        className={cn(
                          "w-6 h-6 rounded-md flex items-center justify-center transition-colors cursor-pointer",
                          "bg-[#E7E3DA] hover:bg-[#0E0F12] hover:text-white text-[#0E0F12]"
                        )}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-6 text-center text-sm font-medium tabular-nums">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        aria-label="Øk antall"
                        className={cn(
                          "w-6 h-6 rounded-md flex items-center justify-center transition-colors cursor-pointer",
                          "bg-[#E7E3DA] hover:bg-[#0E0F12] hover:text-white text-[#0E0F12]"
                        )}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Price + remove */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#0E0F12]">
                        {formatNOK(item.price * item.qty)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label="Fjern produkt"
                        className="w-6 h-6 rounded-md flex items-center justify-center text-[#0E0F12]/30 hover:text-[#C5443B] hover:bg-[#C5443B]/10 transition-colors cursor-pointer"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer summary + CTA */}
        {items.length > 0 && (
          <div className="border-t border-[#E7E3DA] px-6 py-5 bg-white space-y-3">
            {/* Line items */}
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-[#0E0F12]/70">
                <span>Delsum</span>
                <span>{formatNOK(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#C5443B]">
                  <span>Rabatt</span>
                  <span>-{formatNOK(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#0E0F12]/70">
                <span>Frakt</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-[#B08A55] font-medium">Gratis</span>
                  ) : (
                    formatNOK(shippingFee)
                  )}
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-2 border-t border-[#E7E3DA]">
              <span className="font-semibold text-[#0E0F12]">Totalt</span>
              <span className="font-bold text-lg text-[#0E0F12]">
                {formatNOK(total)}
              </span>
            </div>

            {/* Checkout button */}
            <Link
              href="/kasse"
              onClick={closeCart}
              className="block w-full text-center py-3.5 bg-[#B08A55] text-white font-semibold rounded-xl hover:bg-[#9a7848] transition-colors cursor-pointer text-sm"
            >
              Gå til kassen
            </Link>
            <button
              onClick={closeCart}
              className="block w-full text-center py-2 text-sm text-[#0E0F12]/50 hover:text-[#0E0F12] transition-colors cursor-pointer"
            >
              Fortsett å handle
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
