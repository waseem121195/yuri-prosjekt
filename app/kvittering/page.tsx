"use client";
import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";

function KvitteringContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCartStore();

  useEffect(() => {
    if (sessionId) clearCart();
  }, [sessionId, clearCart]);

  return (
    <div className="min-h-screen bg-[#F6F4EF] pt-header flex flex-col items-center justify-start lg:justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-[#B08A55]/15 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-[#B08A55]" />
        </div>
        <h1
          className="text-3xl font-bold text-[#0E0F12] mb-3"
          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
        >
          Takk for din bestilling!
        </h1>
        <p className="text-[#0E0F12]/65 mb-2">
          Din ordre er bekreftet og vi behandler den snarest.
        </p>
        {sessionId && (
          <p className="text-xs text-[#0E0F12]/40 font-mono bg-[#E7E3DA] rounded-lg px-3 py-2 mb-6 break-all">
            Ordre-ID: {sessionId.slice(0, 32)}...
          </p>
        )}
        <p className="text-sm text-[#0E0F12]/60 mb-8">
          Du vil motta en e-post med ordrebekreftelse. Levering normalt innen
          5–10 virkedager. Har du spørsmål? Ring oss:{" "}
          <span className="font-semibold text-[#0E0F12]">+47 22 33 44 55</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/produkter"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#B08A55] text-white font-semibold rounded-xl hover:bg-[#9A7645] transition-colors cursor-pointer"
          >
            Fortsett å handle
            <ArrowRight size={15} />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-[#E7E3DA] text-[#0E0F12] font-medium rounded-xl hover:bg-[#E7E3DA] transition-colors cursor-pointer"
          >
            Hjem
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function KvitteringPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F6F4EF] pt-header" />}>
      <KvitteringContent />
    </Suspense>
  );
}
