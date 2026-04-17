"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
  {
    name: "Marcus T.",
    role: "Team Captain · FC Wolves",
    rating: 5,
    text: "KickOff changed how we book every weekend game. What used to take 20 phone calls now takes 30 seconds. Our squad is obsessed.",
    avatar: "MT",
    color: "#00E676",
    venue: "Futsal Arena Central",
  },
  {
    name: "Priya S.",
    role: "Recreational Player",
    rating: 5,
    text: "Found an amazing indoor court 5 minutes from my office. Booked it during lunch, played that evening. This app is genuinely a game-changer.",
    avatar: "PS",
    color: "#FFD600",
    venue: "The Cage — Westside",
  },
  {
    name: "Jordan M.",
    role: "Youth Coach",
    rating: 5,
    text: "Managing bookings for three youth teams used to be a nightmare. Now I handle everything from one screen. The team invite feature is pure gold.",
    avatar: "JM",
    color: "#00E5FF",
    venue: "ProTurf Sports Hub",
  },
  {
    name: "Diego F.",
    role: "5-a-side Regular",
    rating: 5,
    text: "The live availability is spot-on. I've never had a double booking issue once. Customer support is also crazy fast when I needed help.",
    avatar: "DF",
    color: "#FF6D00",
    venue: "Arena Norte FC",
  },
  {
    name: "Sophie L.",
    role: "Corporate League Organiser",
    rating: 5,
    text: "We run a company tournament every quarter. KickOff handles group payments, scheduling, and reminders. It's replaced three different tools.",
    avatar: "SL",
    color: "#C6FF00",
    venue: "TurfCity Premium",
  },
  {
    name: "Ravi K.",
    role: "Weekday Warrior",
    rating: 5,
    text: "The rewards programme is legitimately good — I've already earned two free sessions just by playing my regular Tuesday games. Highly recommend.",
    avatar: "RK",
    color: "#EA80FC",
    venue: "Fieldhouse Futsal",
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const track1Ref = useRef<HTMLDivElement>(null);
  const track2Ref = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title
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
          },
        }
      );

      // Marquee — row 1 scrolls left, row 2 scrolls right
      const tween1 = gsap.to(track1Ref.current, {
        x: "-50%",
        duration: 30,
        ease: "none",
        repeat: -1,
      });

      const tween2 = gsap.to(track2Ref.current, {
        x: "0%",
        duration: 35,
        ease: "none",
        repeat: -1,
        from: { x: "-50%" },
      });

      gsap.set(track2Ref.current, { x: "-50%" });
      gsap.to(track2Ref.current, {
        x: "0%",
        duration: 35,
        ease: "none",
        repeat: -1,
      });

      // Pause on hover
      sectionRef.current?.addEventListener("mouseenter", () => {
        tween1.pause();
        gsap.getTweensOf(track2Ref.current).forEach((t) => t.pause());
      });
      sectionRef.current?.addEventListener("mouseleave", () => {
        tween1.resume();
        gsap.getTweensOf(track2Ref.current).forEach((t) => t.resume());
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const row1 = [...TESTIMONIALS, ...TESTIMONIALS];
  const row2 = [...TESTIMONIALS.slice(3), ...TESTIMONIALS.slice(0, 3), ...TESTIMONIALS.slice(3), ...TESTIMONIALS.slice(0, 3)];

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #080f0a, #0a1a0d 50%, #080f0a)" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,230,118,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div ref={titleRef} className="text-center">
          <div className="section-label justify-center mb-4">Social Proof</div>
          <h2
            className="font-display text-white mb-4"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1 }}
          >
            12,000+ PLAYERS{" "}
            <span style={{ color: "#00E676" }}>LOVE US</span>
          </h2>
          <p style={{ color: "#7a9e7e", fontWeight: 300 }}>
            Real reviews from real players. No bots, no fake ratings.
          </p>
        </div>
      </div>

      {/* Marquee Row 1 */}
      <div className="relative overflow-hidden mb-4">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #080f0a, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #080f0a, transparent)" }} />

        <div ref={track1Ref} className="flex gap-4 w-max">
          {row1.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} />
          ))}
        </div>
      </div>

      {/* Marquee Row 2 */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #080f0a, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #080f0a, transparent)" }} />

        <div ref={track2Ref} className="flex gap-4 w-max">
          {row2.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} />
          ))}
        </div>
      </div>

      {/* Aggregate rating */}
      <div className="max-w-7xl mx-auto px-6 mt-16 flex flex-wrap justify-center gap-12">
        {[
          { value: "4.9/5", label: "Average Rating", sub: "Based on 3,200+ reviews" },
          { value: "98%", label: "Would Recommend", sub: "To friends and teammates" },
          { value: "< 30s", label: "Avg Booking Time", sub: "From search to confirmation" },
        ].map(({ value, label, sub }) => (
          <div key={label} className="text-center">
            <div
              className="font-display text-4xl mb-1"
              style={{ color: "#00E676", letterSpacing: "0.04em", textShadow: "0 0 30px rgba(0,230,118,0.4)" }}
            >
              {value}
            </div>
            <div className="text-white text-sm font-medium">{label}</div>
            <div className="text-xs" style={{ color: "#5a8060" }}>{sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: typeof TESTIMONIALS[0] }) {
  return (
    <div
      className="testimonial-card flex-shrink-0 w-80"
      style={{ borderColor: `${testimonial.color}15` }}
    >
      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <span key={i} style={{ color: "#FFD600", fontSize: "14px" }}>★</span>
        ))}
      </div>

      {/* Quote */}
      <p className="text-sm leading-relaxed mb-4" style={{ color: "#9abf9e", fontWeight: 300 }}>
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Venue tag */}
      <div
        className="text-xs font-mono mb-4 px-2 py-1 rounded inline-block"
        style={{ background: `${testimonial.color}10`, color: testimonial.color, border: `1px solid ${testimonial.color}20` }}
      >
        📍 {testimonial.venue}
      </div>

      {/* Author */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold"
          style={{ background: `${testimonial.color}20`, color: testimonial.color, border: `1px solid ${testimonial.color}40` }}
        >
          {testimonial.avatar}
        </div>
        <div>
          <div className="text-white text-sm font-medium">{testimonial.name}</div>
          <div className="text-xs" style={{ color: "#5a8060" }}>{testimonial.role}</div>
        </div>
      </div>
    </div>
  );
}