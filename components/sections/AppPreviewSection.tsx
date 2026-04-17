"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Screen = "home" | "challenge" | "lobby" | "chat" | "profile";

const NAV_ITEMS: { id: Screen; label: string; icon: React.ReactNode }[] = [
  {
    id: "home",
    label: "Home",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="13" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="13" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "challenge",
    label: "Challenge",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <polygon
          points="12,2 15.1,8.3 22,9.3 17,14.1 18.2,21 12,17.8 5.8,21 7,14.1 2,9.3 8.9,8.3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "lobby",
    label: "Lobby",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M17 14c1.8.3 4 1.6 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: "chat",
    label: "Chat",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path
          d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "profile",
    label: "Profile",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const SLOTS = [
  { time: "6:00 PM", status: "booked" },
  { time: "7:00 PM", status: "available" },
  { time: "8:00 PM", status: "selected" },
  { time: "9:00 PM", status: "available" },
  { time: "10:00 PM", status: "booked" },
];

const CHALLENGES = [
  {
    team: "FC Wolves",
    initials: "FC",
    detail: "5v5 · Today 8PM · Futsal Arena Central",
    color: "#00E676",
  },
  {
    team: "Balaju Kings",
    initials: "BK",
    detail: "5v5 · Tomorrow 7PM · ProTurf Hub",
    color: "#00E5FF",
  },
  {
    team: "Lazimpat United",
    initials: "LU",
    detail: "5v5 · Sat 6PM · The Cage Westside",
    color: "#FFD600",
  },
];

const LOBBY_PLAYERS = [
  { name: "You (Captain)", num: 10, color: "#00E676", confirmed: true },
  { name: "Arun K.", num: 7, color: "#FFD600", confirmed: true },
  { name: "Bipin S.", num: 5, color: "#00E5FF", confirmed: true },
  { name: "Deepak R.", num: 9, color: "#FF6D00", confirmed: false },
  { name: "Waiting...", num: null, color: "#3a6040", confirmed: false },
];

const CHAT_MESSAGES = [
  { from: "Arun K.", text: "I'll be there by 7:45, warm up without me 😅", time: "7:02 PM", self: false },
  { from: "You", text: "No worries, just don't miss the kick-off", time: "7:04 PM", self: true },
  { from: "Bipin S.", text: "Court is confirmed, eSewa receipt sent ✅", time: "7:06 PM", self: false },
  { from: "You", text: "Legend. See you all at the gate 🔥", time: "7:08 PM", self: true },
];

export default function AppPreviewSection() {
  const [activeScreen, setActiveScreen] = useState<Screen>("home");
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
        }
      );
      gsap.fromTo(
        mockupRef.current,
        { y: 50, opacity: 0, scale: 0.97 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: mockupRef.current, start: "top 85%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 overflow-hidden"
      style={{ background: "#080f0a", borderTop: "1px solid rgba(0,230,118,0.07)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: copy */}
          <div ref={titleRef}>
            <div className="section-label mb-4">App Navigation</div>
            <h2
              className="font-display text-white mb-4"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1 }}
            >
              EVERYTHING IN{" "}
              <span style={{ color: "#00E676" }}>ONE APP</span>
            </h2>
            <p style={{ color: "#7a9e7e", fontWeight: 300, lineHeight: 1.7, marginBottom: "2rem" }}>
              Five screens, zero friction. Switch between booking courts, posting challenges,
              managing your lobby, chatting with your squad, and tracking your profile — all inside JAM.
            </p>

            {/* Screen descriptions */}
            <div className="space-y-3">
              {[
                { id: "home" as Screen,      color: "#00E676", label: "Home",       desc: "Browse venues, view slots, book instantly" },
                { id: "challenge" as Screen, color: "#FFD600", label: "Challenge",  desc: "Post or accept 5v5 match challenges" },
                { id: "lobby" as Screen,     color: "#00E5FF", label: "Game Lobby", desc: "Manage your squad and track confirmations" },
                { id: "chat" as Screen,      color: "#FF6D00", label: "Team Chat",  desc: "Coordinate with your team in real time" },
                { id: "profile" as Screen,   color: "#C6FF00", label: "Profile",    desc: "Stats, match history, rewards balance" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveScreen(item.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200"
                  style={{
                    background: activeScreen === item.id ? `${item.color}10` : "transparent",
                    border: `1px solid ${activeScreen === item.id ? item.color + "30" : "rgba(0,230,118,0.06)"}`,
                  }}
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: item.color, opacity: activeScreen === item.id ? 1 : 0.3 }}
                  />
                  <div>
                    <span
                      className="font-mono text-xs tracking-widest uppercase mr-2"
                      style={{ color: activeScreen === item.id ? item.color : "#5a8060" }}
                    >
                      {item.label}
                    </span>
                    <span className="text-xs" style={{ color: "#6a8e70" }}>
                      {item.desc}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: phone mockup */}
          <div ref={mockupRef} className="flex justify-center">
            <div
              className="w-[320px] rounded-[32px] overflow-hidden"
              style={{ background: "#0a1a0d", border: "1.5px solid rgba(0,230,118,0.18)" }}
            >
              {/* Status bar */}
              <div
                className="h-11 flex items-center justify-between px-5 font-mono text-xs"
                style={{ background: "#060d08", color: "#5a8060" }}
              >
                <span>9:41</span>
                <span style={{ color: "#00E676" }}>● JAM</span>
                <span>4G ▮▮▮</span>
              </div>

              {/* Screen content */}
              <div style={{ background: "#080f0a", minHeight: "460px" }}>
                {activeScreen === "home" && <HomeScreen />}
                {activeScreen === "challenge" && <ChallengeScreen />}
                {activeScreen === "lobby" && <LobbyScreen />}
                {activeScreen === "chat" && <ChatScreen />}
                {activeScreen === "profile" && <ProfileScreen />}
              </div>

              {/* Bottom nav */}
              <div
                className="h-14 flex items-center justify-around"
                style={{ background: "#060d08", borderTop: "1px solid rgba(0,230,118,0.1)" }}
              >
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveScreen(item.id)}
                    className="flex flex-col items-center gap-0.5 px-3 py-1 transition-opacity duration-200"
                    style={{
                      color: activeScreen === item.id ? "#00E676" : "#3a6040",
                      opacity: activeScreen === item.id ? 1 : 0.5,
                    }}
                  >
                    {item.icon}
                    <span className="font-mono text-[9px] tracking-widest uppercase">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Screen Components ─── */

function HomeScreen() {
  return (
    <div>
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: "1px solid rgba(0,230,118,0.08)" }}
      >
        <span
          className="font-display text-xl"
          style={{ color: "#00E676", letterSpacing: "0.04em", fontFamily: "'Bebas Neue', sans-serif" }}
        >
          JAM
        </span>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs" style={{ color: "#5a8060" }}>Kathmandu</span>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
            style={{ background: "rgba(0,230,118,0.1)", border: "1px solid rgba(0,230,118,0.2)" }}
          >
            🔔
          </div>
        </div>
      </div>
      {/* Venue card */}
      <div className="mx-4 mt-4 rounded-xl overflow-hidden" style={{ background: "#0d1a0f", border: "1px solid rgba(0,230,118,0.12)" }}>
        <div className="h-20 relative flex items-center justify-center" style={{ background: "linear-gradient(135deg,#0d2010,#1a3a1a)" }}>
          <svg viewBox="0 0 280 80" fill="none" className="w-full h-full absolute inset-0">
            <rect x="20" y="10" width="240" height="60" rx="3" fill="none" stroke="#00E676" strokeWidth="0.8" opacity="0.4"/>
            <line x1="140" y1="10" x2="140" y2="70" stroke="#00E676" strokeWidth="0.8" opacity="0.4"/>
            <circle cx="140" cy="40" r="16" stroke="#00E676" strokeWidth="0.8" opacity="0.4" fill="none"/>
            <circle cx="140" cy="40" r="2" fill="#00E676" opacity="0.5"/>
          </svg>
          <div
            className="absolute top-2 right-2 flex items-center gap-1 font-mono text-[9px] px-2 py-0.5 rounded"
            style={{ background: "rgba(255,50,50,0.85)", color: "#fff" }}
          >
            <span style={{ animation: "pulse 1s infinite" }}>●</span> LIVE
          </div>
        </div>
        <div className="p-3">
          <div className="font-medium text-sm text-white mb-1">Futsal Arena Central</div>
          <div className="flex gap-3 text-xs" style={{ color: "#6a8e70" }}>
            <span>⭐ 4.9</span><span>1.2km away</span><span style={{ color: "#00E676" }}>6 slots open</span>
          </div>
        </div>
      </div>
      {/* Slot picker */}
      <div className="px-4 pt-3 pb-1 font-mono text-[10px] tracking-widest uppercase" style={{ color: "#5a8060" }}>
        Today's slots
      </div>
      <div className="flex gap-2 px-4 pb-3 flex-wrap">
        {SLOTS.map((s) => (
          <div
            key={s.time}
            className="px-2.5 py-1.5 rounded font-mono text-[11px]"
            style={{
              border: s.status === "selected" ? "1px solid #00E676" : s.status === "booked" ? "1px solid rgba(255,107,107,0.2)" : "1px solid rgba(0,230,118,0.3)",
              background: s.status === "selected" ? "#00E676" : s.status === "booked" ? "rgba(255,107,107,0.04)" : "rgba(0,230,118,0.06)",
              color: s.status === "selected" ? "#060d08" : s.status === "booked" ? "rgba(255,107,107,0.4)" : "#00E676",
              fontWeight: s.status === "selected" ? 700 : 400,
            }}
          >
            {s.time}
          </div>
        ))}
      </div>
    </div>
  );
}

function ChallengeScreen() {
  return (
    <div>
      <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(0,230,118,0.08)" }}>
        <div className="font-display text-xl" style={{ color: "#FFD600", letterSpacing: "0.04em", fontFamily: "'Bebas Neue',sans-serif" }}>
          CHALLENGES
        </div>
        <div className="text-xs mt-0.5" style={{ color: "#5a8060" }}>Browse open challenges or post your own</div>
      </div>
      <div className="p-4 space-y-3">
        {CHALLENGES.map((c) => (
          <div
            key={c.team}
            className="flex items-center justify-between p-3 rounded-xl"
            style={{ background: "#0d1a0f", border: "1px solid rgba(0,230,118,0.1)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold flex-shrink-0"
                style={{ background: `${c.color}18`, color: c.color, border: `1px solid ${c.color}30` }}
              >
                {c.initials}
              </div>
              <div>
                <div className="text-sm font-medium text-white">{c.team}</div>
                <div className="text-xs mt-0.5" style={{ color: "#6a8e70" }}>{c.detail}</div>
              </div>
            </div>
            <button
              className="px-3 py-1.5 rounded-lg font-mono text-xs font-bold flex-shrink-0"
              style={{ background: "#00E676", color: "#060d08" }}
            >
              Accept
            </button>
          </div>
        ))}
        <button
          className="w-full py-3 rounded-xl font-mono text-xs tracking-widest uppercase flex items-center justify-center gap-2"
          style={{ background: "rgba(255,214,0,0.08)", border: "1px solid rgba(255,214,0,0.2)", color: "#FFD600" }}
        >
          <span>⚡</span> Post a Challenge
        </button>
      </div>
    </div>
  );
}

function LobbyScreen() {
  return (
    <div>
      <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(0,230,118,0.08)" }}>
        <div className="font-display text-xl" style={{ color: "#00E5FF", letterSpacing: "0.04em", fontFamily: "'Bebas Neue',sans-serif" }}>
          GAME LOBBY
        </div>
        <div className="text-xs mt-0.5" style={{ color: "#5a8060" }}>Futsal Arena Central · Today 8:00 PM</div>
      </div>
      <div className="p-4">
        <div className="font-mono text-[10px] tracking-widest uppercase mb-3" style={{ color: "#5a8060" }}>
          Squad ({LOBBY_PLAYERS.filter(p => p.confirmed).length}/5 confirmed)
        </div>
        <div className="space-y-2">
          {LOBBY_PLAYERS.map((p, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg"
              style={{ background: "#0d1a0f", border: `1px solid ${p.confirmed ? p.color + "20" : "rgba(255,255,255,0.04)"}` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold"
                  style={{ background: `${p.color}15`, color: p.color }}
                >
                  {p.num ?? "?"}
                </div>
                <span className="text-sm" style={{ color: p.confirmed ? "#fff" : "#4a6a50" }}>{p.name}</span>
              </div>
              <div
                className="font-mono text-[10px] px-2 py-0.5 rounded"
                style={{
                  background: p.confirmed ? "rgba(0,230,118,0.1)" : "rgba(255,255,255,0.04)",
                  color: p.confirmed ? "#00E676" : "#3a6040",
                }}
              >
                {p.confirmed ? "✓ Ready" : "Pending"}
              </div>
            </div>
          ))}
        </div>
        <button
          className="w-full mt-4 py-3 rounded-xl font-mono text-xs tracking-widest uppercase"
          style={{ background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)", color: "#00E5FF" }}
        >
          + Invite Player
        </button>
      </div>
    </div>
  );
}

function ChatScreen() {
  return (
    <div className="flex flex-col" style={{ height: "460px" }}>
      <div className="px-5 py-4 flex-shrink-0" style={{ borderBottom: "1px solid rgba(0,230,118,0.08)" }}>
        <div className="font-display text-xl" style={{ color: "#FF6D00", letterSpacing: "0.04em", fontFamily: "'Bebas Neue',sans-serif" }}>
          TEAM CHAT
        </div>
        <div className="text-xs mt-0.5" style={{ color: "#5a8060" }}>FC Wolves · 4 members</div>
      </div>
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {CHAT_MESSAGES.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.self ? "items-end" : "items-start"}`}>
            {!msg.self && (
              <span className="font-mono text-[10px] mb-1" style={{ color: "#5a8060" }}>{msg.from}</span>
            )}
            <div
              className="px-3 py-2 rounded-2xl text-xs max-w-[80%]"
              style={{
                background: msg.self ? "rgba(0,230,118,0.12)" : "#0d1a0f",
                border: msg.self ? "1px solid rgba(0,230,118,0.2)" : "1px solid rgba(255,255,255,0.05)",
                color: msg.self ? "#00E676" : "#9abf9e",
              }}
            >
              {msg.text}
            </div>
            <span className="font-mono text-[9px] mt-0.5" style={{ color: "#3a6040" }}>{msg.time}</span>
          </div>
        ))}
      </div>
      <div
        className="px-4 pb-4 flex gap-2 flex-shrink-0"
        style={{ borderTop: "1px solid rgba(0,230,118,0.06)", paddingTop: "12px" }}
      >
        <div
          className="flex-1 rounded-xl px-3 py-2 text-xs font-mono"
          style={{ background: "#0d1a0f", border: "1px solid rgba(0,230,118,0.1)", color: "#3a6040" }}
        >
          Say something to your team...
        </div>
        <button
          className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "#00E676", color: "#060d08", fontSize: "14px" }}
        >
          ↑
        </button>
      </div>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div>
      <div className="px-5 pt-6 pb-4 flex flex-col items-center" style={{ borderBottom: "1px solid rgba(0,230,118,0.08)" }}>
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center font-mono text-lg font-bold mb-3"
          style={{ background: "rgba(0,230,118,0.12)", border: "2px solid rgba(0,230,118,0.3)", color: "#00E676" }}
        >
          YK
        </div>
        <div className="font-medium text-white text-sm">Yash Kapali</div>
        <div className="font-mono text-xs mt-0.5" style={{ color: "#5a8060" }}>Team Captain · FC Wolves</div>
        <div
          className="mt-3 flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-xs"
          style={{ background: "rgba(198,255,0,0.08)", border: "1px solid rgba(198,255,0,0.2)", color: "#C6FF00" }}
        >
          ★ 1,240 JAM Points
        </div>
      </div>
      <div className="p-4 grid grid-cols-3 gap-3">
        {[
          { val: "48", lbl: "Matches" },
          { val: "4.8★", lbl: "Rating" },
          { val: "12", lbl: "Free Hrs" },
        ].map((s) => (
          <div
            key={s.lbl}
            className="text-center p-3 rounded-xl"
            style={{ background: "#0d1a0f", border: "1px solid rgba(0,230,118,0.08)" }}
          >
            <div className="font-display text-lg" style={{ color: "#00E676", fontFamily: "'Bebas Neue',sans-serif", letterSpacing: "0.04em" }}>
              {s.val}
            </div>
            <div className="font-mono text-[10px] mt-0.5" style={{ color: "#5a8060" }}>{s.lbl}</div>
          </div>
        ))}
      </div>
      <div className="px-4 space-y-2">
        {["Match History", "My Teams", "Saved Venues", "Payment Methods", "Settings"].map((item) => (
          <div
            key={item}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg"
            style={{ background: "#0d1a0f", border: "1px solid rgba(0,230,118,0.06)" }}
          >
            <span className="text-sm" style={{ color: "#9abf9e" }}>{item}</span>
            <span style={{ color: "#3a6040" }}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
}