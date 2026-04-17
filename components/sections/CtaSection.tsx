"use client";



/* ─────────────────────────────────────────────
   CtaSection.tsx
───────────────────────────────────────────── */
export default function CtaSection() {
  return (
    <section
      className="relative py-28 text-center overflow-hidden"
      style={{ background: "#060d08", borderTop: "1px solid rgba(0,230,118,0.07)" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(0,230,118,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 font-mono text-xs tracking-widest uppercase"
          style={{ background: "rgba(0,230,118,0.1)", border: "1px solid rgba(0,230,118,0.25)", color: "#00E676" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-neon animate-pulse" />
          Nepal's #1 Futsal App
        </div>

        <h2
          className="font-display text-white mb-4"
          style={{ fontSize: "clamp(3rem, 7vw, 6rem)", lineHeight: 0.95 }}
        >
          READY TO{" "}
          <span style={{ color: "#00E676" }}>PLAY?</span>
        </h2>

        <p className="mb-2" style={{ color: "#7a9e7e", fontWeight: 300, fontSize: "15px" }}>
          Book your first court in under 60 seconds.
        </p>

        {/* eSewa badge */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded font-mono text-xs"
            style={{
              background: "rgba(96,168,32,0.1)",
              border: "1px solid rgba(96,168,32,0.3)",
              color: "#6ca820",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#6ca820" }}
            />
            Payments via eSewa
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-medium transition-opacity duration-200 hover:opacity-90"
            style={{ background: "#00E676", color: "#060d08", fontSize: "15px" }}
          >
            Book a Court Now <span>⚽</span>
          </button>
          <button
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium transition-colors duration-200"
            style={{
              background: "transparent",
              color: "#00E676",
              border: "1px solid rgba(0,230,118,0.3)",
              fontSize: "15px",
            }}
          >
            Post a Challenge <span>⚡</span>
          </button>
        </div>

        <p
          className="mt-5 font-mono text-xs tracking-wide"
          style={{ color: "#3a6040" }}
        >
          Free to download · No hidden fees · Cancel anytime
        </p>
      </div>
    </section>
  );
}