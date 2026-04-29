"use client";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-label="Vinduskongen — fremside"
      className="relative flex items-center justify-center overflow-hidden w-full"
      style={{ height: "100svh", minHeight: 620 }}
    >
      {/* ── Video background ── */}
      <div className="absolute inset-0 bg-[#0E0F12]">
        <video
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover", objectPosition: "center center" }}
          autoPlay
          muted
          loop
          playsInline
          poster="/images/1ebd33e5287bb465c7f918b4156ebbd8.jpg"
          aria-hidden="true"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for text legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.38) 45%, rgba(0,0,0,0.65) 100%)",
          }}
        />
      </div>

      {/* ── Centered content ── */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">

        {/* Eyebrow */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="flex items-center justify-center gap-3 mb-7"
        >
          <div className="h-px w-12 bg-[#B08A55]" aria-hidden="true" />
          <span
            className="text-[#B08A55] text-xs font-bold tracking-[0.14em] uppercase"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Norsk produsent · 25 års garanti · Billigst på markedet
          </span>
          <div className="h-px w-12 bg-[#B08A55]" aria-hidden="true" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-white leading-[0.93] tracking-tight mb-6"
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(2.8rem, 7vw, 6rem)",
          }}
        >
          Norges billigste
          <span className="block" style={{ color: "#B08A55" }}>
            vinduer og dører
          </span>
        </motion.h1>

        {/* Body */}
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.52 }}
          className="text-white/80 leading-relaxed mb-9 max-w-2xl mx-auto"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
          }}
        >
          Vi produserer og selger alle typer vinduer og dører med 3-lags glass og
          vedlikeholdsfri PVC.{" "}
          <span className="text-white font-semibold">
            Best pris, best kvalitet — alltid garantert.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <Link
            href="/produkter/vindu"
            className="inline-flex items-center gap-2.5 px-8 py-4 font-semibold rounded-xl text-white text-base transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
            style={{
              backgroundColor: "#B08A55",
              boxShadow: "0 6px 30px -4px rgba(176,138,85,0.65)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Se vinduer
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <Link
            href="/produkter/ytterdor"
            className="inline-flex items-center gap-2.5 px-8 py-4 font-semibold rounded-xl border-2 border-white/45 text-white hover:bg-white/12 hover:border-white/70 transition-all duration-200 text-base"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Se dører
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.95 }}
          className="flex flex-wrap justify-center gap-5 sm:gap-8"
          aria-label="Produktfordeler"
        >
          {[
            "3-lags glass",
            "Vedlikeholdsfri PVC",
            "25 år garanti",
            "Montering tilgjengelig",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: "rgba(255,255,255,0.82)", fontFamily: "'Inter', sans-serif" }}
            >
              <CheckCircle2 size={15} className="flex-shrink-0" style={{ color: "#B08A55" }} aria-hidden="true" />
              {item}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade into page bg */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: "linear-gradient(to top, #F6F4EF, transparent)" }}
      />

      {/* Scroll cue */}
      {!reduceMotion && (
        <motion.div
          className="absolute bottom-9 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
            <div className="w-1.5 h-2.5 bg-white/45 rounded-full" />
          </div>
        </motion.div>
      )}
    </section>
  );
}
