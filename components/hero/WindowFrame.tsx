"use client";
import { motion, useReducedMotion } from "framer-motion";

// Sky gradient phases cycling through a full 18-second day/night loop:
// morning amber → day blue → deep noon → late afternoon → sunset orange → dusk red → night dark → deep night → back to morning
const SKY_COLORS = [
  "#FFD580",
  "#87CEEB",
  "#4A90D9",
  "#2C5F8A",
  "#FF8C42",
  "#FF4500",
  "#0A0E1A",
  "#0A0E1A",
  "#FFD580",
] as const;

const SKY_TIMES = [0, 0.1, 0.25, 0.38, 0.5, 0.6, 0.72, 0.9, 1] as const;

// Night interior glow opacity keyframes — matches sky transition timing
const GLOW_OPACITY = [0, 0, 0, 0, 0, 0, 0.18, 0.22, 0] as const;

// Dust particle positions (deterministic, avoids hydration mismatch)
const DUST_PARTICLES = [0, 1, 2, 3, 4, 5, 6, 7] as const;

export function WindowFrame() {
  const reduceMotion = useReducedMotion();

  const skyColors = reduceMotion
    ? (["#87CEEB", "#87CEEB"] as string[])
    : (SKY_COLORS as unknown as string[]);

  const skyTimes = reduceMotion
    ? ([0, 1] as number[])
    : (SKY_TIMES as unknown as number[]);

  return (
    <div className="relative" style={{ width: 220, height: 280 }}>
      {/* SVG window — glass pane behind, frame on top */}
      <svg
        width="220"
        height="280"
        viewBox="0 0 220 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ position: "relative", zIndex: 2 }}
      >
        <defs>
          {/* Clip glass to inner pane region */}
          <clipPath id="wf-glass-clip">
            <rect x="20" y="20" width="180" height="220" rx="4" />
          </clipPath>

          {/* Soft diagonal shine across glass */}
          <linearGradient id="wf-glass-shine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.18" />
            <stop offset="48%" stopColor="white" stopOpacity="0.05" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          {/* PVC frame gradient — off-white with subtle warm shadow */}
          <linearGradient id="wf-frame-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F2EFE9" />
            <stop offset="100%" stopColor="#D8D3CA" />
          </linearGradient>
        </defs>

        {/* ── Glass Scene (clipped to inner pane) ── */}
        <g clipPath="url(#wf-glass-clip)">
          {/* Animated sky background */}
          <motion.rect
            x="20"
            y="20"
            width="180"
            height="220"
            fill="#87CEEB"
            animate={reduceMotion ? {} : { fill: skyColors }}
            transition={
              reduceMotion
                ? {}
                : {
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                    times: skyTimes,
                  }
            }
          />

          {/* Cloud group 1 — slow drift right */}
          {!reduceMotion && (
            <motion.g
              animate={{ x: [0, 60, 0] }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            >
              <ellipse
                cx="60"
                cy="68"
                rx="30"
                ry="13"
                fill="white"
                fillOpacity="0.82"
              />
              <ellipse
                cx="80"
                cy="64"
                rx="22"
                ry="11"
                fill="white"
                fillOpacity="0.9"
              />
              <ellipse
                cx="44"
                cy="71"
                rx="17"
                ry="9"
                fill="white"
                fillOpacity="0.7"
              />
            </motion.g>
          )}

          {/* Cloud group 2 — slower drift left */}
          {!reduceMotion && (
            <motion.g
              animate={{ x: [40, -30, 40] }}
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: "linear",
                delay: 4,
              }}
            >
              <ellipse
                cx="130"
                cy="50"
                rx="24"
                ry="10"
                fill="white"
                fillOpacity="0.62"
              />
              <ellipse
                cx="148"
                cy="47"
                rx="16"
                ry="8"
                fill="white"
                fillOpacity="0.72"
              />
            </motion.g>
          )}

          {/* Ground horizon — muted grass/earth strip */}
          <rect
            x="20"
            y="198"
            width="180"
            height="22"
            fill="#2D5016"
            fillOpacity="0.14"
          />
          <rect
            x="20"
            y="214"
            width="180"
            height="26"
            fill="#1A3A0A"
            fillOpacity="0.18"
          />

          {/* Warm interior glow during night phase */}
          {!reduceMotion && (
            <motion.rect
              x="20"
              y="20"
              width="180"
              height="220"
              fill="#FFC04A"
              animate={{
                opacity: GLOW_OPACITY as unknown as number[],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
                times: skyTimes,
              }}
            />
          )}

          {/* Floating dust/pollen particles */}
          {!reduceMotion &&
            DUST_PARTICLES.map((i) => (
              <motion.circle
                key={i}
                cx={40 + ((i * 23) % 150)}
                cy={220}
                r={1 + (i % 2) * 0.5}
                fill="white"
                fillOpacity={0.4 + (i % 3) * 0.1}
                animate={{ y: [-120, 0, -120], opacity: [0, 0.5, 0] }}
                transition={{
                  duration: 8 + i * 1.5,
                  repeat: Infinity,
                  delay: i * 1.2,
                  ease: "linear",
                }}
              />
            ))}

          {/* Glass shine overlay — diagonal streak */}
          <rect
            x="20"
            y="20"
            width="180"
            height="220"
            fill="url(#wf-glass-shine)"
          />

          {/* 3-layer edge reflection lines (classic triple-glazing look) */}
          <line
            x1="23"
            y1="20"
            x2="23"
            y2="240"
            stroke="white"
            strokeOpacity="0.2"
            strokeWidth="1"
          />
          <line
            x1="25"
            y1="20"
            x2="25"
            y2="240"
            stroke="white"
            strokeOpacity="0.12"
            strokeWidth="0.6"
          />
          <line
            x1="27"
            y1="20"
            x2="27"
            y2="240"
            stroke="white"
            strokeOpacity="0.06"
            strokeWidth="0.5"
          />
        </g>

        {/* ── PVC Frame ── */}

        {/* Outer frame body */}
        <rect
          x="0"
          y="0"
          width="220"
          height="280"
          rx="8"
          ry="8"
          fill="url(#wf-frame-gradient)"
        />

        {/* Inner reveal line */}
        <rect
          x="14"
          y="14"
          width="192"
          height="252"
          rx="5"
          ry="5"
          fill="none"
          stroke="#C9C4BB"
          strokeWidth="1"
        />

        {/* Glass rebate line */}
        <rect
          x="18"
          y="18"
          width="184"
          height="244"
          rx="4"
          ry="4"
          fill="none"
          stroke="#BAB5AB"
          strokeWidth="0.8"
        />

        {/* Horizontal mid-rail (splits upper and lower sash) */}
        <rect x="0" y="133" width="220" height="11" fill="url(#wf-frame-gradient)" />
        <rect x="14" y="135" width="192" height="1" fill="#C9C4BB" />

        {/* Vertical centre mullion */}
        <rect x="104" y="0" width="12" height="280" fill="url(#wf-frame-gradient)" />
        <rect x="107" y="14" width="1" height="252" fill="#C9C4BB" />

        {/* Window handle assembly */}
        <rect
          x="97"
          y="124"
          width="26"
          height="30"
          rx="5"
          fill="#ABA5A0"
        />
        <rect
          x="103"
          y="128"
          width="14"
          height="20"
          rx="3"
          fill="#7A7470"
        />

        {/* Subtle bottom shadow strip */}
        <rect
          x="0"
          y="270"
          width="220"
          height="10"
          rx="0"
          fill="black"
          fillOpacity="0.05"
        />
      </svg>

      {/* Soft ambient glow halo behind frame */}
      {!reduceMotion && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ zIndex: 1 }}
          animate={{ opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 rounded-xl bg-[#7FB3C9] opacity-10 blur-2xl" />
        </motion.div>
      )}
    </div>
  );
}
