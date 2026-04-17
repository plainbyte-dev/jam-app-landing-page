"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    icon: <LiveIcon />,
    title: "Real-Time Availability",
    desc: "Court slots update live across all venues. The moment a booking is confirmed, availability syncs instantly for every user.",
    tag: "Live Sync",
    color: "#00E676",
  },
  {
    icon: <VenueIcon />,
    title: "340+ Verified Venues",
    desc: "Every court on JAM is inspected and rated. Indoor, outdoor, turf, hardwood — find exactly the surface you need.",
    tag: "Premium Courts",
    color: "#FFD600",
  },
  {
    icon: <PaymentIcon />,
    title: "eSewa Payments",
    desc: "Pay via eSewa, card, or JAM credits. Encrypted checkout and instant e-receipt on booking confirmation.",
    tag: "256-bit SSL",
    color: "#FF6D00",
  },
  {
    icon: <TeamIcon />,
    title: "Team Management",
    desc: "Invite your squad, split payments via eSewa, and coordinate from one lobby link. Your whole team in one screen.",
    tag: "Group Booking",
    color: "#00E5FF",
  },
  {
    icon: <FlexIcon />,
    title: "Flexible Cancellations",
    desc: "Plans changed? Cancel up to 2 hours before your slot for a full refund — no questions asked.",
    tag: "Risk-Free",
    color: "#C6FF00",
  },
  {
    icon: <RewardIcon />,
    title: "JAM Rewards",
    desc: "Earn points every time you play. Redeem for free bookings, gear discounts, and exclusive tournament access.",
    tag: "Loyalty Points",
    color: "#EA80FC",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

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

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out",
            delay: (i % 3) * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    cardsRef.current.forEach((card) => {
      if (!card) return;
      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty("--mx", `${x}%`);
        card.style.setProperty("--my", `${y}%`);
      };
      card.addEventListener("mousemove", onMove);
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: "#060d08" }}
    >
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,230,118,0.04) 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div ref={titleRef} className="mb-14 max-w-2xl">
          <div className="section-label mb-4">Why JAM</div>
          <h2
            className="font-display text-white mb-4"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1, letterSpacing: "0.02em" }}
          >
            BUILT FOR{" "}
            <span style={{ color: "#00E676" }}>PLAYERS</span>
            <br />WHO DON'T WAIT
          </h2>
          <p style={{ color: "#7a9e7e", fontWeight: 300, lineHeight: 1.7 }}>
            Everything you need to go from couch to court in under 60 seconds. No calls, no emails, no wasted time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feat, i) => (
            <div
              key={feat.title}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="feature-card group"
              style={{ "--card-color": feat.color } as React.CSSProperties}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${feat.color}15`, border: `1px solid ${feat.color}30` }}
              >
                {feat.icon}
              </div>

              <div
                className="inline-block px-2 py-0.5 rounded-full text-xs font-mono tracking-widest mb-3"
                style={{ background: `${feat.color}12`, color: feat.color, border: `1px solid ${feat.color}25` }}
              >
                {feat.tag}
              </div>

              <h3
                className="font-display text-xl text-white mb-2"
                style={{ letterSpacing: "0.04em" }}
              >
                {feat.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#6a8e70", fontWeight: 300 }}>
                {feat.desc}
              </p>

              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl transition-all duration-300 group-hover:opacity-100 opacity-0"
                style={{ background: `linear-gradient(90deg, transparent, ${feat.color}, transparent)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Icons ─── */

function LiveIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <circle cx="12" cy="12" r="3" fill="#00E676" />
      <circle cx="12" cy="12" r="6" stroke="#00E676" strokeWidth="1" opacity="0.5" />
      <circle cx="12" cy="12" r="9" stroke="#00E676" strokeWidth="0.5" opacity="0.25" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2" stroke="#00E676" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function VenueIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <rect x="3" y="8" width="18" height="13" rx="2" stroke="#FFD600" strokeWidth="1.5" />
      <path d="M3 11h18M8 8V6a4 4 0 018 0v2" stroke="#FFD600" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 14v3M9 15.5h6" stroke="#FFD600" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PaymentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <rect x="2" y="5" width="20" height="14" rx="3" stroke="#FF6D00" strokeWidth="1.5" />
      <path d="M2 10h20" stroke="#FF6D00" strokeWidth="1.5" />
      <circle cx="7" cy="15" r="1.5" fill="#FF6D00" opacity="0.5" />
      <circle cx="11" cy="15" r="1.5" fill="#FF6D00" />
    </svg>
  );
}

function TeamIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <circle cx="9" cy="8" r="3" stroke="#00E5FF" strokeWidth="1.5" />
      <circle cx="17" cy="7" r="2.5" stroke="#00E5FF" strokeWidth="1.2" opacity="0.6" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 14c1.8.3 4 1.6 4 4" stroke="#00E5FF" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function FlexIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <path d="M3 12a9 9 0 1018 0 9 9 0 00-18 0z" stroke="#C6FF00" strokeWidth="1.5" />
      <path d="M12 7v5l3 3" stroke="#C6FF00" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function RewardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
      <polygon
        points="12,2 15.1,8.3 22,9.3 17,14.1 18.2,21 12,17.8 5.8,21 7,14.1 2,9.3 8.9,8.3"
        stroke="#EA80FC"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <polygon
        points="12,6 13.5,9 17,9.5 14.5,11.9 15.1,15.3 12,13.7 8.9,15.3 9.5,11.9 7,9.5 10.5,9"
        fill="#EA80FC"
        opacity="0.3"
      />
    </svg>
  );
}