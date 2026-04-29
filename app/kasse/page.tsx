"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock, ArrowRight, Loader2 } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { formatNOK } from "@/lib/format";
import { getShippingCost } from "@/lib/pricing";
import { TrustBar } from "@/components/layout/TrustBar";
import Image from "next/image";

const schema = z.object({
  fullName: z.string().min(2, "Skriv inn fullt navn"),
  email: z.string().email("Ugyldig e-postadresse"),
  phone: z
    .string()
    .regex(
      /^(\+47)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{3}$/,
      "Ugyldig telefonnummer (norsk +47)"
    ),
  address: z.string().min(5, "Skriv inn gateadresse"),
  postalCode: z.string().regex(/^\d{4}$/, "Postnummer må være 4 siffer"),
  city: z.string().min(2, "Skriv inn poststed"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function KassePage() {
  const router = useRouter();
  const { items, getSubtotal, discountCode, discountAmount } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const subtotal = getSubtotal();
  const shipping = getShippingCost(subtotal - discountAmount);
  const total = subtotal - discountAmount + shipping;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (items.length === 0) router.push("/handlekurv");
  }, [items.length, router]);

  async function onSubmit(_data: FormData) {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          discountCode,
          discountAmount,
          shippingCost: shipping,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.sessionUrl) {
        throw new Error(json.error || "Noe gikk galt");
      }
      window.location.href = json.sessionUrl;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Noe gikk galt. Prøv igjen."
      );
      setIsLoading(false);
    }
  }

  const field =
    "px-4 py-3 border border-[#E7E3DA] rounded-xl text-sm bg-white focus:outline-none focus:border-[#B08A55] focus:ring-2 focus:ring-[#B08A55]/15 transition-all w-full";
  const labelCls =
    "block text-xs font-semibold text-[#0E0F12]/60 uppercase tracking-wide mb-1.5";
  const errCls = "text-xs text-[#C5443B] mt-1";

  return (
    <>
      <TrustBar />
      <div className="min-h-screen bg-[#F6F4EF] pt-header">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1
            className="text-3xl font-bold text-[#0E0F12] mb-8"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Kasse
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form — 3 cols */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="bg-white rounded-2xl p-6 border border-[#E7E3DA]">
                  <h2
                    className="font-bold text-[#0E0F12] mb-5"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    Leveringsinformasjon
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className={labelCls}>Fullt navn *</label>
                      <input
                        {...register("fullName")}
                        className={field}
                        placeholder="Ola Nordmann"
                      />
                      {errors.fullName && (
                        <p className={errCls}>{errors.fullName.message}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>E-post *</label>
                        <input
                          {...register("email")}
                          type="email"
                          className={field}
                          placeholder="ola@eksempel.no"
                        />
                        {errors.email && (
                          <p className={errCls}>{errors.email.message}</p>
                        )}
                      </div>
                      <div>
                        <label className={labelCls}>Telefon *</label>
                        <input
                          {...register("phone")}
                          type="tel"
                          className={field}
                          placeholder="+47 900 00 000"
                        />
                        {errors.phone && (
                          <p className={errCls}>{errors.phone.message}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Gateadresse *</label>
                      <input
                        {...register("address")}
                        className={field}
                        placeholder="Karl Johans gate 1"
                      />
                      {errors.address && (
                        <p className={errCls}>{errors.address.message}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Postnummer *</label>
                        <input
                          {...register("postalCode")}
                          className={field}
                          placeholder="0162"
                          maxLength={4}
                        />
                        {errors.postalCode && (
                          <p className={errCls}>{errors.postalCode.message}</p>
                        )}
                      </div>
                      <div>
                        <label className={labelCls}>Poststed *</label>
                        <input
                          {...register("city")}
                          className={field}
                          placeholder="Oslo"
                        />
                        {errors.city && (
                          <p className={errCls}>{errors.city.message}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Merknad (valgfritt)</label>
                      <textarea
                        {...register("notes")}
                        className={`${field} resize-none`}
                        rows={3}
                        placeholder="Leveringsinstruksjoner, portkode, etc."
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="bg-[#C5443B]/10 border border-[#C5443B]/30 rounded-xl px-4 py-3 text-sm text-[#C5443B]">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-[#B08A55] text-white font-bold rounded-xl hover:bg-[#9A7645] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer shadow-[0_4px_20px_-4px_rgba(176,138,85,0.5)] text-base"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sender til Stripe...
                    </>
                  ) : (
                    <>
                      <Lock size={16} />
                      Betal {formatNOK(total)}
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-[#0E0F12]/40">
                  Sikker betaling via Stripe. Testkort: 4242 4242 4242 4242
                </p>
              </form>
            </div>

            {/* Order summary — 2 cols */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-5 border border-[#E7E3DA] sticky top-24">
                <h2
                  className="font-bold text-[#0E0F12] mb-4"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  Din ordre
                </h2>
                <div className="space-y-3 mb-5">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#F6F4EF] flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.productName}
                          fill
                          className="object-contain"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-[#0E0F12] line-clamp-1">
                          {item.productName}
                        </p>
                        <p className="text-xs text-[#0E0F12]/40">
                          {item.displayLabel} · ×{item.qty}
                        </p>
                      </div>
                      <p className="text-sm font-semibold flex-shrink-0">
                        {formatNOK(item.price * item.qty)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#E7E3DA] pt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-[#0E0F12]/60">
                    <span>Subtotal</span>
                    <span>{formatNOK(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#C5443B]">
                      <span>Rabatt</span>
                      <span>-{formatNOK(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#0E0F12]/60">
                    <span>Frakt</span>
                    <span>{shipping === 0 ? "Gratis" : formatNOK(shipping)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-base border-t border-[#E7E3DA] pt-2">
                    <span>Totalt</span>
                    <span>{formatNOK(total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
