"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

export function CTABand() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-20 lg:py-24 bg-[#B08A55] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full border-2 border-white" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full border border-white" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-white/70 text-sm font-semibold uppercase tracking-widest mb-4">
            Klar for å bytte?
          </p>
          <h2
            className="text-white text-4xl lg:text-5xl font-bold leading-tight mb-6"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          >
            Få et uforpliktende tilbud
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            Vi hjelper deg finne riktig vindu eller dør til ditt hjem. Kontakt oss i dag — helt gratis og uforpliktende.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/produkter"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#B08A55] font-bold rounded-xl hover:bg-[#F6F4EF] active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-lg"
            >
              Se alle produkter
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white font-bold rounded-xl border-2 border-white/50 hover:bg-white/10 hover:border-white transition-all duration-200 cursor-pointer"
            >
              <Phone size={16} />
              Kontakt oss
            </Link>
          </div>

          <p className="text-white/60 text-sm mt-8">
            Ring oss: <span className="font-semibold text-white">+47 22 33 44 55</span> · Mandag–fredag 08–16
          </p>
        </motion.div>
      </div>
    </section>
  );
}
