"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Tag, X } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { formatNOK } from "@/lib/format";
import { getShippingCost, applyDiscount } from "@/lib/pricing";
import { TrustBar } from "@/components/layout/TrustBar";

export default function HandlekurvPage() {
  const {
    items,
    removeItem,
    updateQty,
    getSubtotal,
    discountCode,
    discountAmount,
    applyDiscount: storeApplyDiscount,
    removeDiscount,
  } = useCartStore();
  const [codeInput, setCodeInput] = useState("");
  const [codeError, setCodeError] = useState("");

  const subtotal = getSubtotal();
  const shipping = getShippingCost(subtotal - discountAmount);
  const total = subtotal - discountAmount + shipping;

  function handleApplyCode() {
    const result = applyDiscount(subtotal, codeInput);
    if (result.valid) {
      storeApplyDiscount(codeInput.toUpperCase(), result.discount);
      setCodeInput("");
      setCodeError("");
    } else {
      setCodeError("Ugyldig rabattkode. Prøv KONGE10.");
    }
  }

  if (items.length === 0) {
    return (
      <>
        <TrustBar />
        <div className="min-h-screen bg-[#F6F4EF] pt-header flex flex-col items-center justify-center text-center px-4">
          <div className="w-20 h-20 rounded-2xl bg-[#E7E3DA] flex items-center justify-center mb-6">
            <ShoppingCart size={32} className="text-[#0E0F12]/30" />
          </div>
          <h1
            className="text-2xl font-bold text-[#0E0F12] mb-2"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Handlekurven er tom
          </h1>
          <p className="text-[#0E0F12]/60 mb-8">
            Du har ikke lagt til noen produkter ennå.
          </p>
          <Link
            href="/produkter"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#B08A55] text-white font-semibold rounded-xl hover:bg-[#9A7645] transition-colors cursor-pointer"
          >
            Se produkter
            <ArrowRight size={16} />
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <TrustBar />
      <div className="min-h-screen bg-[#F6F4EF] pt-header">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1
            className="text-3xl font-bold text-[#0E0F12] mb-8"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Handlekurv ({items.reduce((s, i) => s + i.qty, 0)} varer)
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -16, height: 0, marginBottom: 0 }}
                    transition={{ duration: 0.25 }}
                    className="bg-white rounded-2xl p-4 border border-[#E7E3DA] flex gap-4"
                  >
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[#F6F4EF] flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.productName}
                        fill
                        className="object-contain"
                        sizes="80px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#0E0F12] text-sm mb-0.5 line-clamp-1">
                        {item.productName}
                      </p>
                      <p className="text-xs text-[#0E0F12]/50 mb-2">{item.displayLabel}</p>
                      <p className="font-bold text-[#0E0F12]">{formatNOK(item.price * item.qty)}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#C5443B]/10 text-[#C5443B] transition-colors cursor-pointer"
                        aria-label="Fjern"
                      >
                        <Trash2 size={13} />
                      </button>
                      <div className="flex items-center gap-2 border border-[#E7E3DA] rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-[#E7E3DA] transition-colors cursor-pointer"
                          aria-label="Minsk antall"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-semibold w-5 text-center">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-[#E7E3DA] transition-colors cursor-pointer"
                          aria-label="Øk antall"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order summary */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 border border-[#E7E3DA]">
                <h2
                  className="font-bold text-[#0E0F12] mb-5 text-lg"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  Ordresammendrag
                </h2>

                <div className="space-y-3 text-sm mb-5">
                  <div className="flex justify-between">
                    <span className="text-[#0E0F12]/60">Subtotal</span>
                    <span className="font-medium">{formatNOK(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#C5443B]">
                      <span className="flex items-center gap-1">
                        Rabatt ({discountCode})
                        <button
                          onClick={removeDiscount}
                          className="hover:text-[#C5443B]/70 cursor-pointer"
                          aria-label="Fjern rabattkode"
                        >
                          <X size={12} />
                        </button>
                      </span>
                      <span>-{formatNOK(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-[#0E0F12]/60">Frakt</span>
                    <span className={shipping === 0 ? "text-green-600 font-medium" : "font-medium"}>
                      {shipping === 0 ? "Gratis" : formatNOK(shipping)}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-[#0E0F12]/40">
                      Fri frakt fra {formatNOK(5000)} (mangler{" "}
                      {formatNOK(5000 - (subtotal - discountAmount))})
                    </p>
                  )}
                  <div className="border-t border-[#E7E3DA] pt-3 flex justify-between font-bold text-base">
                    <span>Totalt</span>
                    <span>{formatNOK(total)}</span>
                  </div>
                </div>

                {/* Discount code input */}
                {!discountCode && (
                  <div className="mb-5">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Rabattkode"
                        value={codeInput}
                        onChange={(e) => {
                          setCodeInput(e.target.value);
                          setCodeError("");
                        }}
                        onKeyDown={(e) => e.key === "Enter" && handleApplyCode()}
                        className="flex-1 px-3 py-2 text-sm border border-[#E7E3DA] rounded-lg focus:outline-none focus:border-[#B08A55] transition-colors"
                      />
                      <button
                        onClick={handleApplyCode}
                        className="px-3 py-2 bg-[#0E0F12] text-white text-sm font-medium rounded-lg hover:bg-[#1F2A37] transition-colors cursor-pointer"
                        aria-label="Bruk rabattkode"
                      >
                        <Tag size={14} />
                      </button>
                    </div>
                    {codeError && (
                      <p className="text-xs text-[#C5443B] mt-1">{codeError}</p>
                    )}
                  </div>
                )}

                <Link
                  href="/kasse"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#B08A55] text-white font-semibold rounded-xl hover:bg-[#9A7645] transition-colors cursor-pointer shadow-[0_4px_16px_-4px_rgba(176,138,85,0.4)]"
                >
                  Til kassen
                  <ArrowRight size={16} />
                </Link>
                <p className="text-xs text-center text-[#0E0F12]/40 mt-3">
                  Sikker betaling med Stripe
                </p>
              </div>

              <Link
                href="/produkter"
                className="block text-center text-sm text-[#0E0F12]/60 hover:text-[#0E0F12] transition-colors cursor-pointer"
              >
                ← Fortsett å handle
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
