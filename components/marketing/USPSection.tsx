"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Shield, Award, Thermometer } from "lucide-react";

function useCountUp(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [target, duration, start]);
  return value;
}

const stats = [
  {
    icon: Award,
    value: 10000,
    suffix: "+",
    label: "leverte vinduer",
    description: "Vi har levert over 10 000 vinduer og dører til norske hjem siden oppstarten.",
  },
  {
    icon: Shield,
    value: 25,
    suffix: " år",
    label: "garanti",
    description: "Vi er så trygge på kvaliteten vår at vi gir 25 års garanti på alle PVC-produkter.",
  },
  {
    icon: Thermometer,
    value: 100,
    suffix: "%",
    prefix: "",
    label: "fornøyde kunder",
    description: "Vi er stolte av tilbakemeldingene fra kundene våre — kvalitet og service som holder.",
  },
];

export function USPSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  const count0 = useCountUp(10000, 2000, isInView && !reduceMotion);
  const count1 = useCountUp(25, 1200, isInView && !reduceMotion);
  const count2 = useCountUp(65, 1000, isInView && !reduceMotion);
  const counts = [count0, count1, count2];

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-[#0E0F12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-[#B08A55] text-sm font-semibold uppercase tracking-widest mb-3">Hvorfor velge oss</p>
          <h2
            className="text-white text-4xl lg:text-5xl leading-tight"
            style={{ fontFamily: "'Fraunces', Georgia, serif" }}
          >
            Billigst og best — det er vår garanti
          </h2>
          <p className="text-white/50 text-base mt-4 max-w-xl mx-auto" style={{ fontFamily: "'Inter', sans-serif" }}>
            VINDUSKONGEN AS produserer og selger direkte til deg — ingen mellomledd, ingen skjulte kostnader.
            Vedlikeholdsfri PVC med 3-lags glass og montering via Østlandske Byggpartner AS.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={reduceMotion ? {} : { opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#B08A55]/15 mb-6">
                <stat.icon size={24} className="text-[#B08A55]" />
              </div>
              <div
                className="text-5xl lg:text-6xl font-bold text-white mb-2 tabular-nums"
                style={{ fontFamily: "'Fraunces', Georgia, serif" }}
              >
                {stat.prefix ?? ""}
                {reduceMotion ? stat.value.toLocaleString("nb-NO") : counts[i].toLocaleString("nb-NO")}
                {stat.suffix}
              </div>
              <div className="text-[#B08A55] text-sm font-semibold uppercase tracking-wider mb-3">{stat.label}</div>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Bottom features row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            "Vedlikeholdsfri PVC",
            "Energimerking A",
            "Norsk produksjon",
            "Montering inkludert",
          ].map((feat, i) => (
            <motion.div
              key={feat}
              initial={reduceMotion ? {} : { opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
              className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-3 border border-white/8"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#B08A55] flex-shrink-0" />
              <span className="text-white/70 text-sm font-medium">{feat}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
