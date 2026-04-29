"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    name: "Lars Eriksen",
    location: "Oslo",
    rating: 5,
    text: "Bestilte 8 fastkarm vinduer til nybygg. Levering på under 2 uker, perfekt passform og montering gikk knirkefritt. Anbefales på det varmeste!",
    product: "Fastkarm vindu 100×120",
  },
  {
    name: "Karin Haugen",
    location: "Bergen",
    rating: 5,
    text: "Byttet ut alle vinduer i huset. Enormt forskjell på varme og støy — naboveien hører jeg knapt lenger. PVC-rammen ser fortsatt splitter ny ut etter 2 vintre.",
    product: "Toppsving vindu 80×100",
  },
  {
    name: "Bjørn Andersen",
    location: "Trondheim",
    rating: 5,
    text: "Ytterdøren i sort er en drøm. Alle naboer spør om den! Prisen var vesentlig bedre enn lokale butikker, og servicen var upåklagelig.",
    product: "Ytterdør med glass 100×210",
  },
];

export function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return;
    const t = setInterval(() => setCurrent((c) => (c + 1) % reviews.length), 5000);
    return () => clearInterval(t);
  }, [reduceMotion]);

  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);
  const next = () => setCurrent((c) => (c + 1) % reviews.length);

  return (
    <section className="py-20 lg:py-24 bg-[#E7E3DA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[#B08A55] text-sm font-semibold uppercase tracking-widest mb-3">Hva kundene sier</p>
        <h2
          className="text-[#0E0F12] text-3xl lg:text-4xl mb-12"
          style={{ fontFamily: "'Fraunces', Georgia, serif" }}
        >
          Fornøyde kunder i hele Norge
        </h2>

        <div className="relative min-h-[240px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? {} : { opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: reviews[current].rating }).map((_, i) => (
                  <Star key={i} size={18} className="text-[#B08A55] fill-[#B08A55]" />
                ))}
              </div>

              <blockquote
                className="text-[#0E0F12] text-xl lg:text-2xl font-medium leading-relaxed mb-6"
                style={{ fontFamily: "'Fraunces', Georgia, serif" }}
              >
                &ldquo;{reviews[current].text}&rdquo;
              </blockquote>

              <div className="flex flex-col items-center gap-1">
                <p className="font-semibold text-[#0E0F12]">{reviews[current].name}</p>
                <p className="text-[#0E0F12]/50 text-sm">
                  {reviews[current].location} · {reviews[current].product}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            aria-label="Forrige"
            className="w-10 h-10 rounded-full border border-[#0E0F12]/20 flex items-center justify-center hover:bg-[#0E0F12] hover:text-white hover:border-[#0E0F12] transition-all duration-200 cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Gå til anmeldelse ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === current ? "bg-[#B08A55] w-6" : "bg-[#0E0F12]/20 w-2"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Neste"
            className="w-10 h-10 rounded-full border border-[#0E0F12]/20 flex items-center justify-center hover:bg-[#0E0F12] hover:text-white hover:border-[#0E0F12] transition-all duration-200 cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
