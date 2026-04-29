"use client";
import { motion, useReducedMotion } from "framer-motion";

// Door opens to -18° rotateY then rests, then closes — full 8-second loop.
// Warm amber light spills through the gap while the door is open.
const DOOR_ROTATE_KEYFRAMES = [0, -18, -18, -8, 0] as const;
const DOOR_ROTATE_TIMES = [0, 0.28, 0.55, 0.78, 1] as const;

const LIGHT_OPACITY_KEYFRAMES = [0, 0.85, 0.85, 0.55, 0] as const;
const LIGHT_OPACITY_TIMES = [0, 0.25, 0.5, 0.75, 1] as const;

export function DoorFrame() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative" style={{ width: 180, height: 320 }}>
      {/* ── Static casing / surround (back layer) ── */}
      <svg
        width="180"
        height="320"
        viewBox="0 0 180 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, zIndex: 3 }}
      >
        <defs>
          {/* Dark aluminium casing */}
          <linearGradient id="df-casing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2C2C2C" />
            <stop offset="100%" stopColor="#1A1A1A" />
          </linearGradient>

          {/* Warm stone/concrete step */}
          <linearGradient id="df-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EAE0CC" />
            <stop offset="100%" stopColor="#D6C8AE" />
          </linearGradient>
        </defs>

        {/* Concrete step / threshold */}
        <rect x="0" y="296" width="180" height="24" rx="4" fill="url(#df-floor)" />
        <rect
          x="0"
          y="296"
          width="180"
          height="2"
          fill="white"
          fillOpacity="0.28"
        />

        {/* Outer door casing — dark frame */}
        <rect x="0" y="0" width="180" height="300" rx="6" fill="url(#df-casing)" />

        {/* Door opening aperture */}
        <rect x="12" y="8" width="156" height="288" rx="4" fill="#180E00" />

        {/* Ambient room glow always visible deep in the opening */}
        <rect
          x="12"
          y="8"
          width="156"
          height="288"
          rx="4"
          fill="#FFA832"
          fillOpacity="0.10"
        />

        {/* Casing inner edge highlight (top) */}
        <rect
          x="0"
          y="0"
          width="180"
          height="2"
          rx="2"
          fill="white"
          fillOpacity="0.07"
        />
      </svg>

      {/* ── Warm light spill on floor ── */}
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: "8%",
            width: "84%",
            height: 48,
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(255,192,74,0.45) 0%, transparent 72%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
          animate={{
            opacity: LIGHT_OPACITY_KEYFRAMES as unknown as number[],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            times: LIGHT_OPACITY_TIMES as unknown as number[],
          }}
        />
      )}

      {/* ── Animated door leaf ── */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 8,
          left: 12,
          width: 156,
          height: 288,
          transformOrigin: "left center",
          perspective: 900,
          zIndex: 4,
        }}
        animate={
          reduceMotion
            ? {}
            : {
                rotateY:
                  DOOR_ROTATE_KEYFRAMES as unknown as number[],
              }
        }
        transition={
          reduceMotion
            ? {}
            : {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                times: DOOR_ROTATE_TIMES as unknown as number[],
              }
        }
      >
        <svg
          width="156"
          height="288"
          viewBox="0 0 156 288"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Door body — very dark charcoal */}
            <linearGradient id="df-door-body" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1C1C1C" />
              <stop offset="100%" stopColor="#272727" />
            </linearGradient>

            {/* Recessed panel fill */}
            <linearGradient id="df-panel" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2B2B2B" />
              <stop offset="100%" stopColor="#1E1E1E" />
            </linearGradient>
          </defs>

          {/* Door slab */}
          <rect width="156" height="288" rx="4" fill="url(#df-door-body)" />

          {/* Upper decorative panel (raised) */}
          <rect
            x="12"
            y="12"
            width="132"
            height="82"
            rx="3"
            fill="url(#df-panel)"
            stroke="#383838"
            strokeWidth="0.6"
          />

          {/* Glazed vision panel inside upper rail */}
          <rect
            x="28"
            y="20"
            width="100"
            height="62"
            rx="2"
            fill="#7FB3C9"
            fillOpacity="0.22"
          />
          <rect
            x="28"
            y="20"
            width="100"
            height="62"
            rx="2"
            stroke="#505050"
            strokeWidth="0.5"
          />
          {/* Glass shine — narrow bright strip on left edge */}
          <rect
            x="30"
            y="22"
            width="18"
            height="58"
            rx="1"
            fill="white"
            fillOpacity="0.07"
          />

          {/* Lock rail */}
          <rect
            x="12"
            y="102"
            width="132"
            height="14"
            rx="2"
            fill="#222222"
            stroke="#383838"
            strokeWidth="0.5"
          />

          {/* Lower panel (large) */}
          <rect
            x="12"
            y="124"
            width="132"
            height="152"
            rx="3"
            fill="url(#df-panel)"
            stroke="#383838"
            strokeWidth="0.6"
          />

          {/* Lower panel sub-divisions */}
          <rect
            x="20"
            y="132"
            width="116"
            height="66"
            rx="2"
            fill="#1A1A1A"
            stroke="#2E2E2E"
            strokeWidth="0.5"
          />
          <rect
            x="20"
            y="204"
            width="116"
            height="64"
            rx="2"
            fill="#1A1A1A"
            stroke="#2E2E2E"
            strokeWidth="0.5"
          />

          {/* Handle escutcheon plate */}
          <rect
            x="120"
            y="138"
            width="18"
            height="44"
            rx="4"
            fill="#3A3A3A"
            stroke="#4A4A4A"
            strokeWidth="0.5"
          />

          {/* Handle lever */}
          <rect
            x="123"
            y="144"
            width="8"
            height="28"
            rx="4"
            fill="#8B7355"
          />
          <rect
            x="125"
            y="148"
            width="4"
            height="20"
            rx="2"
            fill="#A08060"
          />

          {/* Keyhole */}
          <circle cx="129" cy="178" r="3" fill="#1A1A1A" />

          {/* Door edge leading highlight (hinge side) */}
          <rect
            x="0"
            y="0"
            width="2"
            height="288"
            fill="white"
            fillOpacity="0.05"
          />

          {/* Bottom weatherstrip */}
          <rect
            x="0"
            y="283"
            width="156"
            height="5"
            rx="2"
            fill="black"
            fillOpacity="0.28"
          />
        </svg>
      </motion.div>
    </div>
  );
}
