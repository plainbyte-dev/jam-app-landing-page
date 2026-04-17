"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const illustrationRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(
      badgeRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
    )
      .fromTo(
        headlineRef.current!.children,
        { y: 80, opacity: 0, skewY: 4 },
        { y: 0, opacity: 1, skewY: 0, duration: 0.9, stagger: 0.12, ease: "power4.out" },
        "-=0.2"
      )
      .fromTo(
        subRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        illustrationRef.current,
        { x: 60, opacity: 0, scale: 0.95 },
        { x: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo(
        statsRef.current!.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out" },
        "-=0.3"
      );

    // Floating ball animation
    gsap.to(".hero-ball", {
      y: -16,
      duration: 2.2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Pulse rings
    gsap.to(".hero-ring", {
      scale: 1.08,
      opacity: 0.4,
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      stagger: 0.4,
    });

    // Scan line
    gsap.to(".scan-line", {
      y: "100%",
      duration: 2.5,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center pitch-lines overflow-hidden"
      style={{ background: "linear-gradient(135deg, #060d08 0%, #080f0a 50%, #0a150c 100%)" }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 70% 50%, rgba(0,230,118,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-64 h-64 pointer-events-none opacity-30">
        <svg viewBox="0 0 200 200" fill="none">
          <path d="M0 100 L0 0 L100 0" stroke="#00E676" strokeWidth="0.5" opacity="0.5" />
          <path d="M0 60 L0 0 L60 0" stroke="#00E676" strokeWidth="1" />
          <circle cx="0" cy="0" r="40" stroke="#00E676" strokeWidth="0.5" opacity="0.3" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div className="relative z-10">
            {/* Badge */}
            <div ref={badgeRef} className="opacity-0 mb-6 inline-flex items-center gap-2">
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase"
                style={{ background: "rgba(0,230,118,0.1)", border: "1px solid rgba(0,230,118,0.25)", color: "#00E676" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-neon animate-pulse" />
                500+ Courts Available Now
              </div>
            </div>
            {/* {JAM — Join A Match | Futsal Booking App Nepal} */}
            {/* Headline */}
            <div ref={headlineRef} className="overflow-hidden mb-6">
              <div
                className="font-display leading-none text-white opacity-0"
                style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", lineHeight: 0.92 }}
              >
                JAM
              </div>
              <div
                className="font-display leading-none opacity-0 glow-text"
                style={{
                  fontSize: "clamp(3.5rem, 8vw, 7rem)",
                  lineHeight: 0.92,
                  color: "#00E676",
                  WebkitTextStroke: "1px rgba(0,230,118,0.3)",
                }}
              >
                JOIN A MATCH
              </div>
              <div
                className="font-display leading-none text-white opacity-0"
                style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", lineHeight: 0.92 }}
              >
                Futsal Booking App Nepal
              </div>
            </div>

            {/* Sub */}
            <p
              ref={subRef}
              className="opacity-0 text-lg leading-relaxed mb-8 max-w-md"
              style={{ color: "#7a9e7e", fontWeight: 300 }}
            >
              Discover premium futsal courts nearby, grab your preferred time slot,
              and get confirmed instantly — all before you finish tying your laces.
            </p>

            {/* CTA Row */}
            <div ref={ctaRef} className="opacity-0 flex flex-wrap items-center gap-4 mb-10">
              <a href="#" className="btn-primary">
                <span>Start Booking</span>
                <span>⚽</span>
              </a>
              <a href="#" className="btn-ghost">
                <span>Watch How It Works</span>
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs"
                  style={{ background: "rgba(0,230,118,0.15)" }}
                >
                  ▶
                </span>
              </a>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="flex items-center gap-8">
              {[
                { value: "12K+", label: "Players" },
                { value: "340+", label: "Venues" },
                { value: "4.9★", label: "Rating" },
              ].map(({ value, label }) => (
                <div key={label} className="opacity-0">
                  <div
                    className="font-display text-2xl"
                    style={{ color: "#00E676", letterSpacing: "0.05em" }}
                  >
                    {value}
                  </div>
                  <div className="text-xs font-mono tracking-widest uppercase" style={{ color: "#5a8060" }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Illustration */}
          <div ref={illustrationRef} className="opacity-0 relative flex justify-center items-center">
            <FutsalCourtIllustration />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "#3a6040" }}
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 relative overflow-hidden" style={{ background: "rgba(0,230,118,0.15)" }}>
          <div
            className="scan-line w-full h-4 absolute top-0"
            style={{ background: "linear-gradient(to bottom, transparent, #00E676, transparent)" }}
          />
        </div>
      </div>
    </section>
  );
}

function FutsalCourtIllustration() {
  return (
    <div className="relative w-full max-w-lg">
      {/* Glow rings */}
      <div
        className="hero-ring absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,230,118,0.12) 0%, transparent 70%)",
          transform: "scale(1.1)",
        }}
      />
      <div
        className="hero-ring absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,230,118,0.06) 0%, transparent 70%)",
          transform: "scale(1.4)",
        }}
      />

      {/* Main court SVG */}
      <svg viewBox="0 0 520 420" fill="none" className="w-full h-auto relative z-10">
        {/* Court background */}
        <rect x="40" y="60" width="440" height="300" rx="6" fill="#0a1a0d" />
        <rect x="40" y="60" width="440" height="300" rx="6" stroke="#00E676" strokeWidth="1.5" opacity="0.6" />

        {/* Pitch markings */}
        {/* Center circle */}
        <circle cx="260" cy="210" r="55" stroke="#00E676" strokeWidth="1" opacity="0.35" />
        <circle cx="260" cy="210" r="4" fill="#00E676" opacity="0.6" />
        {/* Center line */}
        <line x1="260" y1="60" x2="260" y2="360" stroke="#00E676" strokeWidth="1" opacity="0.35" />
        {/* Penalty arcs */}
        <path d="M 40 165 Q 110 210 40 255" stroke="#00E676" strokeWidth="1" opacity="0.35" fill="none" />
        <path d="M 480 165 Q 410 210 480 255" stroke="#00E676" strokeWidth="1" opacity="0.35" fill="none" />
        {/* Penalty areas */}
        <rect x="40" y="165" width="70" height="90" stroke="#00E676" strokeWidth="1" opacity="0.35" fill="none" />
        <rect x="410" y="165" width="70" height="90" stroke="#00E676" strokeWidth="1" opacity="0.35" fill="none" />
        {/* Goal areas */}
        <rect x="40" y="185" width="28" height="50" stroke="#00E676" strokeWidth="1.5" opacity="0.5" fill="none" />
        <rect x="452" y="185" width="28" height="50" stroke="#00E676" strokeWidth="1.5" opacity="0.5" fill="none" />
        {/* Corner arcs */}
        <path d="M40 60 Q55 60 55 75" stroke="#00E676" strokeWidth="1" opacity="0.4" fill="none" />
        <path d="M480 60 Q465 60 465 75" stroke="#00E676" strokeWidth="1" opacity="0.4" fill="none" />
        <path d="M40 360 Q55 360 55 345" stroke="#00E676" strokeWidth="1" opacity="0.4" fill="none" />
        <path d="M480 360 Q465 360 465 345" stroke="#00E676" strokeWidth="1" opacity="0.4" fill="none" />

        {/* Field color fill with slight gradient */}
        <defs>
          <linearGradient id="fieldGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d2010" />
            <stop offset="100%" stopColor="#081508" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="ballGrad" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#cccccc" />
          </radialGradient>
        </defs>
        <rect x="41" y="61" width="438" height="298" rx="5" fill="url(#fieldGrad)" opacity="0.7" />

        {/* Stripe pattern on field */}
        {[0,1,2,3,4,5,6,7].map(i => (
          <rect key={i} x={41 + i * 55} y={61} width={27} height={298} fill="#00E676" opacity="0.015" />
        ))}

        {/* Player 1 — left side attacker */}
        <g transform="translate(155, 185)" filter="url(#glow)">
          {/* Body */}
          <ellipse cx="0" cy="38" rx="10" ry="14" fill="#1a4d26" />
          {/* Shirt number */}
          <text x="0" y="42" textAnchor="middle" fill="#00E676" fontSize="8" fontFamily="monospace">7</text>
          {/* Head */}
          <circle cx="0" cy="20" r="11" fill="#d4956a" />
          {/* Hair */}
          <path d="M-9 18 Q0 10 9 18 Q8 12 0 10 Q-8 12 -9 18Z" fill="#2a1a0a" />
          {/* Arms */}
          <line x1="-10" y1="35" x2="-20" y2="46" stroke="#1a4d26" strokeWidth="5" strokeLinecap="round" />
          <line x1="10" y1="35" x2="20" y2="30" stroke="#1a4d26" strokeWidth="5" strokeLinecap="round" />
          {/* Legs */}
          <line x1="-4" y1="52" x2="-6" y2="70" stroke="#0a2010" strokeWidth="6" strokeLinecap="round" />
          <line x1="4" y1="52" x2="8" y2="68" stroke="#0a2010" strokeWidth="6" strokeLinecap="round" />
          {/* Boots */}
          <ellipse cx="-6" cy="73" rx="6" ry="3" fill="#111" />
          <ellipse cx="9" cy="71" rx="6" ry="3" fill="#111" />
          {/* Shadow */}
          <ellipse cx="0" cy="78" rx="14" ry="4" fill="black" opacity="0.2" />
        </g>

        {/* Player 2 — right side defender */}
        <g transform="translate(345, 220)" filter="url(#glow)">
          <ellipse cx="0" cy="38" rx="10" ry="14" fill="#4a1a1a" />
          <text x="0" y="42" textAnchor="middle" fill="#ff6b6b" fontSize="8" fontFamily="monospace">5</text>
          <circle cx="0" cy="20" r="11" fill="#c8784a" />
          <path d="M-9 18 Q0 8 9 18 Q6 10 0 9 Q-6 10 -9 18Z" fill="#111" />
          <line x1="-10" y1="35" x2="-18" y2="28" stroke="#4a1a1a" strokeWidth="5" strokeLinecap="round" />
          <line x1="10" y1="35" x2="22" y2="40" stroke="#4a1a1a" strokeWidth="5" strokeLinecap="round" />
          <line x1="-4" y1="52" x2="-8" y2="70" stroke="#2a0a0a" strokeWidth="6" strokeLinecap="round" />
          <line x1="4" y1="52" x2="6" y2="70" stroke="#2a0a0a" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="-7" cy="73" rx="6" ry="3" fill="#222" />
          <ellipse cx="7" cy="73" rx="6" ry="3" fill="#222" />
          <ellipse cx="0" cy="78" rx="14" ry="4" fill="black" opacity="0.2" />
        </g>

        {/* Player 3 — center midfielder running */}
        <g transform="translate(230, 155)">
          <ellipse cx="0" cy="38" rx="10" ry="14" fill="#1a3a4a" />
          <text x="0" y="42" textAnchor="middle" fill="#4dd0e1" fontSize="8" fontFamily="monospace">10</text>
          <circle cx="0" cy="20" r="11" fill="#e8b88a" />
          <path d="M-8 15 Q0 9 8 14 Q5 9 0 8 Q-5 9 -8 15Z" fill="#3a2a0a" />
          <line x1="-10" y1="35" x2="-22" y2="42" stroke="#1a3a4a" strokeWidth="5" strokeLinecap="round" />
          <line x1="10" y1="35" x2="18" y2="26" stroke="#1a3a4a" strokeWidth="5" strokeLinecap="round" />
          {/* Running pose — one leg forward */}
          <line x1="-4" y1="52" x2="-12" y2="68" stroke="#0a1a2a" strokeWidth="6" strokeLinecap="round" />
          <line x1="4" y1="52" x2="14" y2="62" stroke="#0a1a2a" strokeWidth="6" strokeLinecap="round" />
          <ellipse cx="-11" cy="71" rx="6" ry="3" fill="#222" />
          <ellipse cx="15" cy="65" rx="6" ry="3" fill="#222" />
          <ellipse cx="0" cy="77" rx="14" ry="4" fill="black" opacity="0.2" />
        </g>

        {/* Ball — floating near player 1 */}
        <g className="hero-ball" transform="translate(193, 245)">
          <circle cx="0" cy="0" r="12" fill="url(#ballGrad)" />
          {/* Ball pentagon pattern */}
          <path d="M0 -10 L8 -4 L5 7 L-5 7 L-8 -4Z" fill="#222" opacity="0.7" />
          <path d="M9 -7 L14 1 L10 9" fill="none" stroke="#222" strokeWidth="0.5" opacity="0.5" />
          <path d="M-9 -7 L-14 1 L-10 9" fill="none" stroke="#222" strokeWidth="0.5" opacity="0.5" />
          {/* Shine */}
          <circle cx="-3" cy="-4" r="3" fill="white" opacity="0.4" />
          {/* Shadow */}
          <ellipse cx="0" cy="16" rx="10" ry="4" fill="black" opacity="0.25" />
        </g>

        {/* Goal posts left */}
        <rect x="40" y="185" width="5" height="50" fill="#00E676" opacity="0.8" rx="1" />
        <rect x="40" y="185" width="28" height="4" fill="#00E676" opacity="0.8" rx="1" />
        <rect x="40" y="231" width="28" height="4" fill="#00E676" opacity="0.8" rx="1" />
        {/* Goal net */}
        {[0,1,2,3,4].map(i => (
          <line key={`gv${i}`} x1={45 + i * 5} y1={189} x2={45 + i * 5} y2={231} stroke="#00E676" strokeWidth="0.5" opacity="0.2" />
        ))}
        {[0,1,2,3,4,5,6,7].map(i => (
          <line key={`gh${i}`} x1={40} y1={190 + i * 6} x2={68} y2={190 + i * 6} stroke="#00E676" strokeWidth="0.5" opacity="0.2" />
        ))}

        {/* Goal posts right */}
        <rect x="475" y="185" width="5" height="50" fill="#ff6b6b" opacity="0.8" rx="1" />
        <rect x="452" y="185" width="28" height="4" fill="#ff6b6b" opacity="0.8" rx="1" />
        <rect x="452" y="231" width="28" height="4" fill="#ff6b6b" opacity="0.8" rx="1" />

        {/* Score board */}
        <rect x="200" y="14" width="120" height="34" rx="6" fill="#0d1a0f" stroke="#00E676" strokeWidth="1" opacity="0.8" />
        <text x="235" y="36" fill="#00E676" fontSize="16" fontFamily="'Bebas Neue', cursive" letterSpacing="2">2</text>
        <text x="255" y="36" fill="#5a8060" fontSize="14" fontFamily="'Bebas Neue', cursive">:</text>
        <text x="268" y="36" fill="#ff6b6b" fontSize="16" fontFamily="'Bebas Neue', cursive" letterSpacing="2">1</text>
        <text x="260" y="22" textAnchor="middle" fill="#3a5a40" fontSize="7" fontFamily="monospace">LIVE</text>
        <circle cx="247" cy="18" r="2" fill="#ff3333">
          <animate attributeName="opacity" values="1;0;1" dur="1.2s" repeatCount="indefinite" />
        </circle>

        {/* Timer */}
        <rect x="380" y="14" width="70" height="22" rx="4" fill="#0d1a0f" stroke="#333" strokeWidth="1" />
        <text x="415" y="29" textAnchor="middle" fill="#7a9e7e" fontSize="9" fontFamily="monospace">32:14</text>

        {/* Motion lines for player running */}
        <line x1="195" y1="198" x2="215" y2="196" stroke="#00E676" strokeWidth="0.5" opacity="0.3" strokeDasharray="3 2" />
        <line x1="192" y1="203" x2="212" y2="202" stroke="#00E676" strokeWidth="0.5" opacity="0.2" strokeDasharray="3 2" />
      </svg>

      {/* Floating UI chips */}
      <div
        className="absolute top-4 -right-4 px-3 py-2 rounded-lg text-xs font-mono"
        style={{ background: "#0d1a0f", border: "1px solid rgba(0,230,118,0.25)", color: "#00E676" }}
      >
        <div className="text-pitch-300 text-xs mb-0.5" style={{ color: "#5a8060" }}>Next slot</div>
        <div className="font-semibold">Today, 7:00 PM</div>
      </div>

      <div
        className="absolute bottom-8 -left-4 px-3 py-2 rounded-lg text-xs font-mono"
        style={{ background: "#0d1a0f", border: "1px solid rgba(0,230,118,0.15)", color: "#7a9e7e" }}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-neon animate-pulse" />
          <span style={{ color: "#00E676" }}>Futsal Arena Central</span>
        </div>
        <div className="mt-0.5">⭐ 4.9 · 1.2km away</div>
      </div>
    </div>
  );
}