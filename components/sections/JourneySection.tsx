"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: "01",
    title: "Discover Courts",
    desc: "Browse verified futsal venues near you. Filter by distance, surface type, indoor/outdoor, and real-time availability. Every listing shows live slot counts, photos, and player reviews so you always know what you're booking.",
    color: "#00E676",
    tag: "Search & Filter",
    bullets: ["GPS-based proximity search", "Surface & amenity filters", "Verified venue ratings"],
    icon: <SearchIllustration />,
  },
  {
    number: "02",
    title: "Choose Your Time Slot",
    desc: "Pick your perfect game time from a live availability calendar. Slots update the instant a booking is made — no double bookings, no guesswork, no waiting for a callback.",
    color: "#FFD600",
    tag: "Live Calendar",
    bullets: ["Real-time slot sync", "1-hour & half-day blocks", "Recurring weekly bookings"],
    icon: <CalendarIllustration />,
  },
  {
    number: "03",
    title: "Confirm & Pay Instantly",
    desc: "Secure your court in one tap. Pay by card, mobile wallet, or KickOff credits. Your confirmation lands in your inbox seconds later — with court address, gate code, and a shareable link for your squad.",
    color: "#FF6D00",
    tag: "Instant Confirmation",
    bullets: ["256-bit encrypted checkout", "Split payments for teams", "Instant e-receipt & QR pass"],
    icon: <ConfirmIllustration />,
  },
  {
    number: "04",
    title: "Show Up & Play",
    desc: "Walk in, warm up, and own the pitch. After the final whistle, rate the venue and earn KickOff Points redeemable for free sessions, gear discounts, and tournament entries.",
    color: "#00E5FF",
    tag: "Play & Earn",
    bullets: ["No check-in hassle", "Post-match venue rating", "Earn KickOff reward points"],
    icon: <PlayIllustration />,
  },
];

export default function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const illustrationsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Vertical spine draws down on scroll
      gsap.fromTo(
        spineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 0.8,
          },
        }
      );

      // Each row: text from one side, illustration from the other
      stepsRef.current.forEach((step, i) => {
        if (!step) return;
        const isEven = i % 2 === 0;

        // Text block slides in from left or right
        gsap.fromTo(
          step,
          { opacity: 0, x: isEven ? -60 : 60 },
          {
            opacity: 1,
            x: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 95%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Illustration slides from opposite side
        const illus = illustrationsRef.current[i];
        if (illus) {
          gsap.fromTo(
            illus,
            { opacity: 0, x: isEven ? 60 : -60, scale: 0.94 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: illus,
                start: "top 95%",
                toggleActions: "play none none reverse",
              },
              delay: 0.1,
            }
          );
        }

        // Spine dot pops in
        const dot = dotsRef.current[i];
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: step,
                start: "top 95%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #080f0a 0%, #0a1a0d 50%, #080f0a 100%)" }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 pitch-lines opacity-30 pointer-events-none" />

      {/* Ambient glows */}
      <div className="absolute left-0 top-1/4 w-96 h-96 pointer-events-none rounded-full" style={{ background: "radial-gradient(circle, rgba(0,230,118,0.05) 0%, transparent 70%)" }} />
      <div className="absolute right-0 bottom-1/4 w-96 h-96 pointer-events-none rounded-full" style={{ background: "radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-24">
          <div className="section-label justify-center mb-4">The Journey</div>
          <h2
            className="font-display text-white mb-4"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1 }}
          >
            FROM SEARCH TO{" "}
            <span style={{ color: "#00E676" }}>KICKOFF</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#7a9e7e", fontWeight: 300 }}>
            Four simple steps stand between you and the perfect game. We handle the logistics — you handle the goals.
          </p>
        </div>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Center spine */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px pointer-events-none"
            style={{ background: "rgba(0,230,118,0.08)" }}>
            {/* The drawing spine */}
            <div
              ref={spineRef}
              className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, #00E676, #FFD600, #FF6D00, #00E5FF)", transformOrigin: "top" }}
            />
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-0">
            {STEPS.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={step.number} className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-16 lg:py-20">

                  {/* Center dot on spine */}
                  <div
                    ref={(el) => { dotsRef.current[i] = el; }}
                    className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full items-center justify-center"
                    style={{
                      background: "#080f0a",
                      border: `2px solid ${step.color}`,
                      boxShadow: `0 0 20px ${step.color}50, 0 0 40px ${step.color}20`,
                    }}
                  >
                    <span
                      className="font-mono text-xs font-bold"
                      style={{ color: step.color }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Left column */}
                  <div className={isEven ? "order-1" : "order-1 lg:order-2"}>
                    {isEven ? (
                      /* Even: text on LEFT */
                      <TextBlock step={step} innerRef={(el) => { stepsRef.current[i] = el; }} />
                    ) : (
                      /* Odd: illustration on LEFT */
                      <IllustrationBlock step={step} innerRef={(el) => { illustrationsRef.current[i] = el; }} align="right" />
                    )}
                  </div>

                  {/* Right column */}
                  <div className={isEven ? "order-2" : "order-2 lg:order-1"}>
                    {isEven ? (
                      /* Even: illustration on RIGHT */
                      <IllustrationBlock step={step} innerRef={(el) => { illustrationsRef.current[i] = el; }} align="left" />
                    ) : (
                      /* Odd: text on RIGHT */
                      <TextBlock step={step} innerRef={(el) => { stepsRef.current[i] = el; }} />
                    )}
                  </div>

                  {/* Connector arrow to next step */}
                  {i < STEPS.length - 1 && (
                    <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 -bottom-3 z-20 flex-col items-center">
                      <div className="w-px h-6" style={{ background: `linear-gradient(to bottom, ${step.color}60, ${STEPS[i+1].color}60)` }} />
                      <div style={{ color: STEPS[i+1].color, fontSize: "10px", opacity: 0.6 }}>▼</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Sub-components ─── */

function TextBlock({
  step,
  innerRef,
}: {
  step: typeof STEPS[0];
  innerRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div ref={innerRef} className="max-w-lg">
      {/* Tag */}
      <div
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest mb-4"
        style={{ background: `${step.color}12`, color: step.color, border: `1px solid ${step.color}30` }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: step.color }} />
        {step.tag}
      </div>

      {/* Step number — mobile only */}
      <div className="lg:hidden font-mono text-xs tracking-widest mb-2" style={{ color: step.color }}>
        STEP {step.number}
      </div>

      {/* Headline */}
      <h3
        className="font-display text-white mb-4"
        style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1, letterSpacing: "0.03em" }}
      >
        {step.title}
      </h3>

      {/* Description */}
      <p className="text-base leading-relaxed mb-6" style={{ color: "#7a9e7e", fontWeight: 300 }}>
        {step.desc}
      </p>

      {/* Bullet list */}
      <ul className="space-y-2">
        {step.bullets.map((b) => (
          <li key={b} className="flex items-center gap-3 text-sm" style={{ color: "#9abf9e" }}>
            <span
              className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center text-xs"
              style={{ background: `${step.color}15`, color: step.color }}
            >
              ✓
            </span>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function IllustrationBlock({
  step,
  innerRef,
  align,
}: {
  step: typeof STEPS[0];
  innerRef: (el: HTMLDivElement | null) => void;
  align: "left" | "right";
}) {
  return (
    <div
      ref={innerRef}
      className={`flex ${align === "right" ? "lg:justify-end" : "lg:justify-start"} justify-center`}
    >
      <div className="relative w-full max-w-sm">
        {/* Glow backdrop */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${step.color}12 0%, transparent 70%)`,
            transform: "scale(1.15)",
          }}
        />

        {/* Card */}
        <div
          className="relative rounded-3xl overflow-hidden p-2"
          style={{
            background: "linear-gradient(145deg, #0d1a0f, #0a150c)",
            border: `1px solid ${step.color}25`,
            boxShadow: `0 24px 60px rgba(0,0,0,0.5), 0 0 40px ${step.color}10`,
          }}
        >
          {/* Inner illustration area */}
          <div
            className="rounded-2xl flex items-center justify-center p-4"
            style={{
              background: `${step.color}06`,
              border: `1px solid ${step.color}12`,
              aspectRatio: "4/3",
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              {step.icon}
            </div>
          </div>

          {/* Bottom info strip */}
          <div className="flex items-center justify-between px-3 py-3">
            <div
              className="font-display text-sm tracking-widest"
              style={{ color: step.color }}
            >
              STEP {step.number}
            </div>
            <div
              className="text-xs font-mono px-2 py-0.5 rounded-full"
              style={{ background: `${step.color}15`, color: step.color }}
            >
              {step.tag}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Step Illustrations ─── */

function SearchIllustration() {
  return (
    <svg viewBox="0 0 160 160" fill="none" className="w-4/5 h-4/5">
      <circle cx="80" cy="80" r="60" fill="#00E67608" />
      {/* Map pin */}
      <path d="M80 35 C66 35, 56 45, 56 58 C56 75, 80 100, 80 100 C80 100, 104 75, 104 58 C104 45 94 35 80 35Z" fill="#00E67630" stroke="#00E676" strokeWidth="1.5" />
      <circle cx="80" cy="58" r="8" fill="#00E676" />
      {/* Search rings */}
      <circle cx="80" cy="80" r="30" stroke="#00E676" strokeWidth="0.8" opacity="0.2" strokeDasharray="4 3" />
      <circle cx="80" cy="80" r="45" stroke="#00E676" strokeWidth="0.5" opacity="0.1" strokeDasharray="3 4" />
      {/* Mini venue cards */}
      <rect x="20" y="112" width="35" height="22" rx="4" fill="#152018" stroke="#00E67640" strokeWidth="1" />
      <rect x="63" y="115" width="35" height="22" rx="4" fill="#1a2b1d" stroke="#00E67660" strokeWidth="1" />
      <rect x="106" y="112" width="35" height="22" rx="4" fill="#152018" stroke="#00E67430" strokeWidth="1" />
      <text x="37" y="126" textAnchor="middle" fill="#00E676" fontSize="8" fontFamily="monospace">4.9★</text>
      <text x="80" y="129" textAnchor="middle" fill="#00E676" fontSize="9" fontFamily="monospace">★ 4.8</text>
      <text x="123" y="126" textAnchor="middle" fill="#5a8060" fontSize="8" fontFamily="monospace">4.7★</text>
    </svg>
  );
}

function CalendarIllustration() {
  return (
    <svg viewBox="0 0 160 160" fill="none" className="w-4/5 h-4/5">
      {/* Calendar base */}
      <rect x="25" y="35" width="110" height="90" rx="8" fill="#1a2b1d" stroke="#FFD600" strokeWidth="1.5" />
      {/* Header */}
      <rect x="25" y="35" width="110" height="28" rx="8" fill="#FFD60020" />
      <rect x="25" y="55" width="110" height="8" fill="#1a2b1d" />
      <text x="80" y="53" textAnchor="middle" fill="#FFD600" fontSize="10" fontFamily="monospace" fontWeight="bold">MARCH 2026</text>
      {/* Day headers */}
      {["M","T","W","T","F","S","S"].map((d, i) => (
        <text key={i} x={35 + i * 15} y={77} textAnchor="middle" fill="#5a8060" fontSize="7" fontFamily="monospace">{d}</text>
      ))}
      {/* Day cells */}
      {[...Array(28)].map((_, i) => {
        const col = i % 7;
        const row = Math.floor(i / 7);
        const selected = i === 10 || i === 11;
        const booked = i === 3 || i === 8 || i === 15;
        return (
          <g key={i}>
            {selected && <rect x={30 + col * 15} y={82 + row * 13} width="12" height="11" rx="3" fill="#FFD60030" stroke="#FFD600" strokeWidth="1" />}
            <text
              x={36 + col * 15}
              y={91 + row * 13}
              textAnchor="middle"
              fill={selected ? "#FFD600" : booked ? "#3a4a3a" : "#7a9e7e"}
              fontSize="7"
              fontFamily="monospace"
            >
              {i + 1}
            </text>
          </g>
        );
      })}
      {/* Time chip */}
      <rect x="42" y="130" width="76" height="18" rx="4" fill="#FFD60015" stroke="#FFD60060" strokeWidth="1" />
      <text x="80" y="142" textAnchor="middle" fill="#FFD600" fontSize="9" fontFamily="monospace">7:00 PM — 8:00 PM</text>
    </svg>
  );
}

function ConfirmIllustration() {
  return (
    <svg viewBox="0 0 160 160" fill="none" className="w-4/5 h-4/5">
      {/* Ticket shape */}
      <path
        d="M20 55 L20 105 Q20 110 25 110 L75 110 Q75 118 80 118 Q85 118 85 110 L135 110 Q140 110 140 105 L140 55 Q140 50 135 50 L85 50 Q85 42 80 42 Q75 42 75 50 L25 50 Q20 50 20 55Z"
        fill="#1a2b1d"
        stroke="#FF6D00"
        strokeWidth="1.5"
      />
      {/* Dashed center */}
      <line x1="80" y1="50" x2="80" y2="110" stroke="#FF6D0040" strokeWidth="1" strokeDasharray="3 3" />
      {/* Check mark */}
      <circle cx="56" cy="80" r="16" fill="#FF6D0020" stroke="#FF6D00" strokeWidth="1.5" />
      <path d="M48 80 L54 86 L64 73" stroke="#FF6D00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Info */}
      <text x="105" y="70" textAnchor="middle" fill="#FF6D00" fontSize="8" fontFamily="monospace">CONFIRMED</text>
      <rect x="88" y="73" width="34" height="1" fill="#FF6D0030" />
      <text x="105" y="84" textAnchor="middle" fill="#7a9e7e" fontSize="7" fontFamily="monospace">#KO-4892</text>
      <text x="105" y="95" textAnchor="middle" fill="#7a9e7e" fontSize="7" fontFamily="monospace">Arena Central</text>
      <text x="105" y="105" textAnchor="middle" fill="#5a8060" fontSize="6" fontFamily="monospace">7:00 PM · Court 3</text>
      {/* Stars */}
      <text x="56" y="108" textAnchor="middle" fill="#FF6D00" fontSize="9">✦</text>
    </svg>
  );
}

function PlayIllustration() {
  return (
    <svg viewBox="0 0 160 160" fill="none" className="w-4/5 h-4/5">
      {/* Celebration burst */}
      {[0,45,90,135,180,225,270,315].map((angle, i) => (
        <line
          key={i}
          x1={80 + 28 * Math.cos((angle * Math.PI) / 180)}
          y1={75 + 28 * Math.sin((angle * Math.PI) / 180)}
          x2={80 + 45 * Math.cos((angle * Math.PI) / 180)}
          y2={75 + 45 * Math.sin((angle * Math.PI) / 180)}
          stroke="#00E5FF"
          strokeWidth={i % 2 === 0 ? 2 : 1}
          opacity="0.5"
          strokeLinecap="round"
        />
      ))}
      {/* Player jumping */}
      <circle cx="80" cy="50" r="10" fill="#d4956a" />
      <rect x="72" y="60" width="16" height="20" rx="4" fill="#00E5FF40" stroke="#00E5FF" strokeWidth="1" />
      {/* Arms up */}
      <line x1="72" y1="68" x2="58" y2="56" stroke="#00E5FF" strokeWidth="4" strokeLinecap="round" />
      <line x1="88" y1="68" x2="102" y2="56" stroke="#00E5FF" strokeWidth="4" strokeLinecap="round" />
      {/* Legs spread */}
      <line x1="76" y1="80" x2="64" y2="96" stroke="#1a3a4a" strokeWidth="5" strokeLinecap="round" />
      <line x1="84" y1="80" x2="96" y2="96" stroke="#1a3a4a" strokeWidth="5" strokeLinecap="round" />
      {/* Ball in air */}
      <circle cx="112" cy="44" r="10" fill="white" opacity="0.9" />
      <path d="M112 35 L118 40 L116 49 L108 49 L106 40Z" fill="#222" opacity="0.5" />
      <circle cx="109" cy="40" r="2" fill="white" opacity="0.4" />
      {/* Trophy */}
      <rect x="48" y="110" width="20" height="16" rx="3" fill="#FFD600" opacity="0.8" />
      <rect x="53" y="126" width="10" height="4" rx="1" fill="#FFD600" opacity="0.8" />
      <rect x="50" y="130" width="16" height="2" rx="1" fill="#FFD600" opacity="0.6" />
      {/* Confetti dots */}
      {[[30,30],[130,40],[25,110],[140,100],[100,130],[40,140]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill={["#00E676","#FFD600","#FF6D00","#00E5FF"][i % 4]} opacity="0.7" />
      ))}
      <text x="80" y="148" textAnchor="middle" fill="#00E5FF" fontSize="8" fontFamily="monospace" opacity="0.7">MATCH COMPLETE</text>
    </svg>
  );
}