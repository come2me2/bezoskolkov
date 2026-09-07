"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Phase = "intact" | "approach" | "blast" | "aftermath";

const SHARDS = [
  { d: "M118 34 L142 88 L96 82 Z", x: -130, y: -150, r: -42 },
  { d: "M142 90 L208 76 L168 128 Z", x: 150, y: -130, r: 36 },
  { d: "M88 138 L48 186 L110 176 Z", x: -170, y: 70, r: -48 },
  { d: "M176 188 L232 174 L210 230 Z", x: 165, y: 140, r: 40 },
  { d: "M114 170 L148 244 L96 220 Z", x: -55, y: 175, r: 28 },
  { d: "M210 78 L268 110 L232 130 Z", x: 185, y: -40, r: 22 },
  { d: "M48 188 L86 140 L70 210 Z", x: -155, y: 115, r: -20 },
  { d: "M168 128 L210 78 L190 160 Z", x: 95, y: -95, r: 30 },
  { d: "M112 168 L138 92 L150 200 Z", x: -20, y: 160, r: -15 },
];

/** Hold the UAV on screen long enough to read, then explode */
const APPROACH_MS = 1800;
const BLAST_MS = 1100;

/** Quadcopter-style UAV — drawn so it reads clearly through the glass */
function Drone({ phase }: { phase: Phase }) {
  const exploding = phase === "blast";
  const approaching = phase === "approach";

  return (
    <motion.g
      initial={false}
      animate={
        exploding
          ? { scale: [1.35, 1.45, 0.35], opacity: [1, 1, 0], rotate: [0, -10, 22], x: 0, y: 0 }
          : approaching
            ? { scale: 1.35, opacity: 1, rotate: 0, x: -12, y: [8, 2, 8] }
            : { scale: 1, opacity: 1, rotate: 0, x: 0, y: [0, -3, 0] }
      }
      transition={
        exploding
          ? { duration: 0.75, ease: "easeIn", times: [0, 0.35, 1] }
          : approaching
            ? { scale: { duration: 0.7 }, x: { duration: 0.7 }, y: { duration: 1.6, repeat: Infinity, ease: "easeInOut" } }
            : { y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } }
      }
      style={{ transformOrigin: "200px 88px" }}
    >
      {/* rotor wash */}
      <ellipse cx="152" cy="78" rx="18" ry="5" fill="rgba(245,245,242,0.12)" />
      <ellipse cx="248" cy="78" rx="18" ry="5" fill="rgba(245,245,242,0.12)" />
      <ellipse cx="152" cy="108" rx="18" ry="5" fill="rgba(245,245,242,0.1)" />
      <ellipse cx="248" cy="108" rx="18" ry="5" fill="rgba(245,245,242,0.1)" />

      {/* arms */}
      <line x1="168" y1="88" x2="140" y2="72" stroke="#c5cad3" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="232" y1="88" x2="260" y2="72" stroke="#c5cad3" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="168" y1="96" x2="140" y2="112" stroke="#c5cad3" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="232" y1="96" x2="260" y2="112" stroke="#c5cad3" strokeWidth="3.5" strokeLinecap="round" />

      {/* motors + props */}
      {[
        [140, 72],
        [260, 72],
        [140, 112],
        [260, 112],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="7" fill="#2a3340" stroke="#e6c35c" strokeWidth="1.2" />
          <motion.ellipse
            cx={cx}
            cy={cy}
            rx="16"
            ry="3.5"
            fill="rgba(245,245,242,0.35)"
            animate={exploding ? { opacity: 0 } : { rotate: 360 }}
            transition={exploding ? { duration: 0.35 } : { duration: 0.35, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
        </g>
      ))}

      {/* body */}
      <rect x="172" y="78" width="56" height="28" rx="8" fill="#1a222c" stroke="#e6c35c" strokeWidth="1.5" />
      <rect x="186" y="84" width="28" height="10" rx="2" fill="rgba(125,158,196,0.35)" />
      {/* camera / warhead hint */}
      <circle cx="200" cy="112" r="5" fill="#d35a4a" stroke="#f5f5f2" strokeWidth="1" />
      <path d="M194 118 L200 128 L206 118" fill="#3a4554" />
    </motion.g>
  );
}

function Explosion({ active, gradientId }: { active: boolean; gradientId: string }) {
  return (
    <AnimatePresence>
      {active ? (
        <motion.g key="explosion" style={{ transformOrigin: "200px 90px" }}>
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={`ring-${i}`}
              cx="200"
              cy="90"
              fill="none"
              stroke="rgba(245,245,242,0.75)"
              strokeWidth="3"
              initial={{ r: 12, opacity: 0.9 }}
              animate={{ r: 55 + i * 28, opacity: 0 }}
              transition={{ duration: 0.9, delay: i * 0.1, ease: "easeOut" }}
            />
          ))}

          <motion.circle
            cx="200"
            cy="90"
            r="28"
            fill={`url(#${gradientId})`}
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: [0.2, 1.35, 1.6], opacity: [0, 1, 0.15] }}
            transition={{ duration: 0.95, ease: "easeOut" }}
            style={{ transformOrigin: "200px 90px" }}
          />

          <motion.circle
            cx="200"
            cy="90"
            r="16"
            fill="#fff8e8"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: [0.4, 1.8, 0.6], opacity: [0, 1, 0] }}
            transition={{ duration: 0.45 }}
            style={{ transformOrigin: "200px 90px" }}
          />

          {Array.from({ length: 14 }).map((_, i) => {
            const a = (i / 14) * Math.PI * 2 + 0.2;
            const len = 48 + (i % 3) * 18;
            return (
              <motion.line
                key={`spark-${i}`}
                x1={200}
                y1={90}
                x2={200 + Math.cos(a) * 18}
                y2={90 + Math.sin(a) * 18}
                stroke={i % 2 ? "#e6c35c" : "#f5f5f2"}
                strokeWidth="2.6"
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  x2: 200 + Math.cos(a) * len,
                  y2: 90 + Math.sin(a) * len,
                }}
                transition={{ duration: 0.85, delay: 0.08 + (i % 4) * 0.03 }}
              />
            );
          })}

          {[
            { x: -55, y: -40, r: -40, d: "M0 0 L18 4 L14 14 Z" },
            { x: 60, y: -35, r: 35, d: "M0 0 L16 -6 L12 10 Z" },
            { x: -48, y: 45, r: -25, d: "M0 0 L14 8 L4 16 Z" },
            { x: 52, y: 50, r: 40, d: "M0 0 L20 2 L10 14 Z" },
            { x: 10, y: -60, r: 10, d: "M0 0 L12 -10 L22 0 Z" },
          ].map((p, i) => (
            <motion.path
              key={`debris-${i}`}
              d={p.d}
              fill="#3a4554"
              stroke="#e6c35c"
              strokeWidth="1"
              initial={{ x: 200, y: 90, opacity: 1, rotate: 0 }}
              animate={{ x: 200 + p.x, y: 90 + p.y, opacity: 0, rotate: p.r }}
              transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
            />
          ))}

          {[
            [-30, -20, 22],
            [35, -15, 26],
            [0, 25, 30],
            [-20, 30, 18],
          ].map(([dx, dy, r], i) => (
            <motion.circle
              key={`smoke-${i}`}
              cx={200 + Number(dx)}
              cy={90 + Number(dy)}
              r={r}
              fill="rgba(90,98,110,0.55)"
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: [0.3, 1.2, 1.5], opacity: [0, 0.7, 0] }}
              transition={{ duration: 0.75, delay: 0.12 + i * 0.05 }}
              style={{ transformOrigin: `${200 + Number(dx)}px ${90 + Number(dy)}px` }}
            />
          ))}
        </motion.g>
      ) : null}
    </AnimatePresence>
  );
}

function OutsideScene({ phase, uid }: { phase: Phase; uid: string }) {
  const blasting = phase === "blast";
  const showDrone = phase === "intact" || phase === "approach" || phase === "blast";

  return (
    <g>
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--window-sky-top)" />
          <stop offset="55%" stopColor="var(--window-sky-mid)" />
          <stop offset="100%" stopColor="var(--window-sky-bot)" />
        </linearGradient>
        <radialGradient id={`${uid}-blast`} cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#fff6d0" />
          <stop offset="35%" stopColor="#e6c35c" />
          <stop offset="70%" stopColor="#d35a4a" />
          <stop offset="100%" stopColor="rgba(211,90,74,0)" />
        </radialGradient>
        <clipPath id={`${uid}-pane`}>
          <rect x="36" y="32" width="248" height="216" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${uid}-pane)`}>
        <rect x="36" y="32" width="248" height="216" fill={`url(#${uid}-sky)`} />
        {/* distant buildings silhouette */}
        <g opacity={0.5} fill="var(--window-building)">
          <rect x="48" y="150" width="28" height="98" />
          <rect x="82" y="128" width="22" height="120" />
          <rect x="108" y="160" width="36" height="88" />
          <rect x="220" y="140" width="30" height="108" />
          <rect x="255" y="120" width="24" height="128" />
        </g>
        <g opacity={0.25} fill="#e6c35c">
          <rect x="54" y="160" width="4" height="4" />
          <rect x="66" y="172" width="4" height="4" />
          <rect x="88" y="140" width="4" height="4" />
          <rect x="228" y="155" width="4" height="4" />
          <rect x="262" y="135" width="4" height="4" />
        </g>

        {showDrone ? <Drone phase={phase} /> : null}
        <Explosion active={blasting} gradientId={`${uid}-blast`} />

        {phase === "aftermath" ? (
          <motion.g initial={{ opacity: 0.55 }} animate={{ opacity: 0.25 }} transition={{ duration: 1.2 }}>
            <ellipse cx="200" cy="95" rx="48" ry="28" fill="var(--window-smoke)" />
            <ellipse cx="175" cy="80" rx="28" ry="16" fill="var(--window-smoke)" opacity={0.8} />
            <ellipse cx="225" cy="105" rx="32" ry="18" fill="var(--window-smoke)" opacity={0.7} />
          </motion.g>
        ) : null}
      </g>
    </g>
  );
}

function GlassOverlay({ phase, scatter }: { phase: Phase; scatter: boolean }) {
  const aftermath = phase === "aftermath";
  if (aftermath && scatter) {
    return (
      <g>
        <rect x="42" y="40" width="110" height="92" fill="var(--window-pane-empty)" />
        <rect x="168" y="40" width="110" height="92" fill="var(--window-pane-empty)" opacity={0.85} />
        <rect x="42" y="148" width="110" height="92" fill="var(--window-pane-empty)" opacity={0.9} />
        <rect x="168" y="148" width="110" height="92" fill="var(--window-pane-empty)" opacity={0.75} />
      </g>
    );
  }

  return (
    <motion.rect
      x="36"
      y="32"
      width="248"
      height="216"
      initial={false}
      animate={{
        fill: aftermath
          ? "var(--window-glass-held)"
          : phase === "blast"
            ? "var(--window-glass-blast)"
            : "var(--window-glass-tint)",
      }}
    />
  );
}

function HeldCracks({ visible }: { visible: boolean }) {
  return (
    <motion.g
      stroke="var(--window-crack)"
      strokeWidth="1.4"
      fill="none"
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <path d="M120 28 L138 92 L112 168 L148 248" />
      <path d="M138 92 L210 78 L268 110" />
      <path d="M138 92 L86 140 L48 188" />
      <path d="M112 168 L176 190 L230 176" />
      <path d="M176 190 L168 246" />
      <path d="M210 78 L250 42" opacity={0.6} />
      <path d="M86 140 L40 96" opacity={0.6} />
      <path d="M230 176 L278 210" opacity={0.5} />
      <path d="M138 92 L160 140 L148 200" opacity={0.7} />
      <circle
        cx="138"
        cy="92"
        r="9"
        fill="var(--window-shard-fill)"
        stroke="var(--window-shard-stroke)"
      />
      {SHARDS.slice(0, 7).map((s, i) => (
        <path
          key={i}
          d={s.d}
          fill="var(--window-shard-fill)"
          stroke="var(--window-shard-stroke)"
          strokeWidth="0.9"
        />
      ))}
    </motion.g>
  );
}

function FlyingShards({
  phase,
  reduce,
}: {
  phase: Phase;
  reduce: boolean | null;
}) {
  const fly = phase === "aftermath" && !reduce;
  const start = phase === "blast" || phase === "aftermath";

  return (
    <g>
      {SHARDS.map((s, i) => (
        <motion.path
          key={i}
          d={s.d}
          fill="var(--cta)"
          stroke="var(--window-shard-stroke)"
          strokeWidth="1.1"
          opacity={0.85}
          initial={false}
          animate={
            fly
              ? { x: s.x, y: s.y, rotate: s.r, opacity: 1, scale: 1.05 }
              : { x: 0, y: 0, rotate: 0, opacity: start ? 1 : 0, scale: 1 }
          }
          transition={
            fly
              ? { duration: 0.95, ease: [0.15, 0.75, 0.2, 1], delay: i * 0.025 }
              : { duration: 0.2 }
          }
          style={{ filter: fly ? "drop-shadow(0 4px 6px rgba(0,0,0,0.25))" : undefined }}
        />
      ))}
    </g>
  );
}

export function WindowVisual({
  mode,
  label,
  caption,
  className,
}: {
  mode: "held" | "shattered";
  label: string;
  caption: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const scatter = mode === "shattered";
  const [phase, setPhase] = useState<Phase>("intact");
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  const play = useCallback(() => {
    clearTimers();
    if (reduce) {
      setPhase("aftermath");
      return;
    }
    setPhase("approach");
    timers.current.push(
      window.setTimeout(() => {
        setPhase("blast");
        timers.current.push(window.setTimeout(() => setPhase("aftermath"), BLAST_MS));
      }, APPROACH_MS),
    );
  }, [clearTimers, reduce]);

  const replay = useCallback(() => {
    clearTimers();
    setPhase("intact");
    if (reduce) {
      timers.current.push(window.setTimeout(() => setPhase("aftermath"), 80));
      return;
    }
    timers.current.push(
      window.setTimeout(() => {
        setPhase("approach");
        timers.current.push(
          window.setTimeout(() => {
            setPhase("blast");
            timers.current.push(window.setTimeout(() => setPhase("aftermath"), BLAST_MS));
          }, APPROACH_MS),
        );
      }, 120),
    );
  }, [clearTimers, reduce]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const aftermath = phase === "aftermath";
  const cracked = phase === "blast" || aftermath;
  const playing = phase === "approach" || phase === "blast";

  return (
    <figure
      className={cn(
        "relative flex flex-col rounded-2xl hairline bg-elevated",
        aftermath && (scatter ? "ring-1 ring-danger/50" : "ring-1 ring-ok/45"),
        className,
      )}
    >
      <button
        type="button"
        onClick={() => {
          if (playing) return;
          if (phase === "intact") play();
          else replay();
        }}
        className="group relative block w-full overflow-hidden rounded-t-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta/60"
        aria-label={
          phase === "intact"
            ? `${label}: нажмите`
            : `${label}: нажмите, чтобы повторить`
        }
      >
        <div
          className={cn(
            "absolute inset-0 transition-colors duration-500",
            aftermath && scatter && "bg-[radial-gradient(circle_at_50%_30%,rgba(211,90,74,0.18),transparent_55%)]",
            aftermath && !scatter && "bg-[radial-gradient(circle_at_50%_30%,rgba(125,206,160,0.16),transparent_55%)]",
            phase === "blast" && "bg-[radial-gradient(circle_at_62%_32%,rgba(230,195,92,0.28),transparent_50%)]",
          )}
        />

        <AnimatePresence>
          {phase === "blast" ? (
            <motion.div
              key="flash"
              className="pointer-events-none absolute inset-0 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.35, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, times: [0, 0.15, 0.45, 1] }}
              style={{
                background:
                  "radial-gradient(circle at 62% 32%, rgba(255,248,220,0.85), rgba(230,195,92,0.35) 28%, transparent 60%)",
              }}
            />
          ) : null}
        </AnimatePresence>

        <div className={cn("relative", scatter ? "min-h-[300px] md:min-h-[320px]" : "")}>
          <svg
            viewBox={scatter ? "-40 -50 400 360" : "0 0 320 280"}
            className="relative z-10 h-auto w-full"
            role="img"
            aria-hidden
          >
            {/* Frame back */}
            <rect
              x="18"
              y="14"
              width="284"
              height="252"
              rx="6"
              fill="var(--window-frame)"
              stroke="var(--window-mullion)"
              strokeWidth="10"
            />

            {/* Outside: city + UAV + explosion (behind glass) */}
            <OutsideScene phase={phase} uid={scatter ? "shatter" : "held"} />

            {/* Glass tint */}
            <GlassOverlay phase={phase} scatter={scatter} />

            {/* Mullions on top of glass */}
            <line x1="160" y1="32" x2="160" y2="248" stroke="var(--window-mullion)" strokeWidth="6" />
            <line x1="36" y1="140" x2="284" y2="140" stroke="var(--window-mullion)" strokeWidth="6" />

            {/* Glass surface effects */}
            {!scatter ? <HeldCracks visible={cracked} /> : null}
            {scatter ? <FlyingShards phase={phase} reduce={reduce} /> : null}

            {!scatter && aftermath ? (
              <motion.rect
                x="40"
                y="36"
                width="240"
                height="208"
                fill="none"
                stroke="rgba(125,206,160,0.55)"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            ) : null}
          </svg>
        </div>

        {phase === "intact" ? (
          <span className="pointer-events-none absolute inset-x-0 bottom-4 z-20 mx-auto w-fit rounded-full bg-ink/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-bone backdrop-blur-md">
            Нажмите
          </span>
        ) : null}

        <AnimatePresence>
          {phase === "approach" ? (
            <motion.span
              key="approach-label"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute left-1/2 top-[26%] z-30 -translate-x-1/2 rounded-full bg-ink/85 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-bone backdrop-blur-md"
            >
              БПЛА за окном
            </motion.span>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {phase === "blast" ? (
            <motion.span
              key="blast-label"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute left-1/2 top-[28%] z-30 -translate-x-1/2 rounded-full bg-cta px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-cta-ink shadow-[0_0_24px_rgba(230,195,92,0.45)]"
            >
              Взрыв
            </motion.span>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {aftermath ? (
            <motion.span
              key="result"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={cn(
                "pointer-events-none absolute left-3 right-3 top-3 z-20 rounded-lg px-3 py-2 text-center text-xs font-semibold uppercase tracking-wide backdrop-blur-md sm:left-4 sm:right-auto sm:text-left",
                scatter ? "bg-danger/90 text-bone" : "bg-ok/90 text-cta-ink",
              )}
            >
              {scatter ? "Осколки разлетелись" : "Осколки удержаны в раме"}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </button>

      <figcaption className="relative z-10 border-t border-line px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-bone">{label}</p>
            <p className="mt-1 text-xs leading-relaxed text-mute">{caption}</p>
          </div>
          <Button type="button" variant="secondary" size="sm" className="shrink-0" onClick={replay}>
            Ещё раз
          </Button>
        </div>
      </figcaption>
    </figure>
  );
}
