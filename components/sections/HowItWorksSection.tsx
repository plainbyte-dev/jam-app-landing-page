"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    icon: "🔍",
    title: "Find a Venue",
    desc: "Browse 340+ verified futsal courts near you by location, surface type, or live availability.",
    tag: "Home Screen",
    route: "/main",
    color: "#00E676",
  },
  {
    num: "02",
    icon: "📅",
    title: "Pick a Slot",
    desc: "See real-time slot availability. Select your date and time — slots sync instantly across all users.",
    tag: "Slot Detail",
    route: "/slot-detail",
    color: "#FFD600",
  },
  {
    num: "03",
    icon: "💸",
    title: "Pay via eSewa",
    desc: "Secure checkout through eSewa. Split the cost with your team or pay the full amount yourself.",
    tag: "Checkout",
    route: "/slot-detail",
    color: "#FF6D00",
  },
  {
    num: "04",
    icon: "👥",
    title: "Open a Lobby",
    desc: "Create your game lobby, invite your squad, assign positions, and track who's confirmed.",
    tag: "Game Lobby",
    route: "/game-lobby",
    color: "#00E5FF",
  },
  {
    num: "05",
    icon: "⚽",
    title: "Play & Earn",
    desc: "Show up, play, and earn JAM reward points redeemable for free bookings, gear, and tournaments.",
    tag: "Rewards",
    route: "/main",
    color: "#C6FF00",
  },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      stepsRef.current.forEach((step, i) => {
        if (!step) return;
        gsap.fromTo(
          step,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: step,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: "#080f0a" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,230,118,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={titleRef} className="mb-16 max-w-2xl">
          <div className="section-label mb-4">The Journey</div>
          <h2
            className="font-display text-white mb-4"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1 }}
          >
            COUCH TO{" "}
            <span style={{ color: "#00E676" }}>PITCH</span>
            <br />IN 5 STEPS
          </h2>
          <p style={{ color: "#7a9e7e", fontWeight: 300, lineHeight: 1.7 }}>
            From searching for a venue to playing your match — here's exactly how JAM works end to end.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div
            className="absolute top-9 left-[9%] right-[9%] h-px hidden lg:block"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(0,230,118,0.2) 15%, rgba(0,230,118,0.2) 85%, transparent)",
            }}
          />

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                ref={(el) => { if (el) stepsRef.current[i] = el; }}
                className="flex flex-col items-center text-center relative"
              >
                {/* Number circle */}
                <div
                  className="w-[72px] h-[72px] rounded-full flex items-center justify-center mb-4 font-display text-xl relative z-10"
                  style={{
                    background: `${step.color}15`,
                    border: `1px solid ${step.color}40`,
                    color: step.color,
                    letterSpacing: "0.04em",
                  }}
                >
                  {step.num}
                </div>

                <div className="text-2xl mb-3">{step.icon}</div>

                <h3
                  className="font-medium text-white text-sm mb-2"
                  style={{ letterSpacing: "0.02em" }}
                >
                  {step.title}
                </h3>

                <p
                  className="text-xs leading-relaxed mb-3"
                  style={{ color: "#6a8e70", fontWeight: 300 }}
                >
                  {step.desc}
                </p>

                {/* Screen tag */}
                <span
                  className="text-xs font-mono px-2 py-0.5 rounded-full"
                  style={{
                    background: `${step.color}10`,
                    color: step.color,
                    border: `1px solid ${step.color}25`,
                    letterSpacing: "0.06em",
                  }}
                >
                  {step.tag}
                </span>

                {/* Arrow between steps (desktop) */}
                {i < STEPS.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-9 -right-4 z-20 text-sm"
                    style={{ color: "#3a6040" }}
                  >
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* eSewa callout */}
        <div
          className="mt-14 flex items-center justify-center gap-3 flex-wrap"
          style={{ color: "#5a8060" }}
        >
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono"
            style={{
              background: "rgba(96,168,32,0.08)",
              border: "1px solid rgba(96,168,32,0.2)",
              color: "#6ca820",
            }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#6ca820" }} />
            Payments powered by eSewa — Nepal's most trusted digital wallet
          </div>
        </div>
      </div>
    </section>
  );
}