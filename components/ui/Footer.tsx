"use client";

export default function Footer() {
  return (
    <footer
      className="relative border-t py-16"
      style={{ background: "#060d08", borderColor: "rgba(0,230,118,0.08)" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
                <polygon points="16,2 30,10 30,22 16,30 2,22 2,10" fill="none" stroke="#00E676" strokeWidth="1.5" />
                <circle cx="16" cy="16" r="4" fill="#00E676" />
              </svg>
              <span className="font-display text-xl tracking-wider text-white">
                KICK<span style={{ color: "#00E676" }}>OFF</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#4a7a50", fontWeight: 300 }}>
              The fastest way to book futsal courts near you. Built for players who love the game.
            </p>
            <div className="flex gap-3">
              {["TW", "IG", "FB", "YT"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-mono transition-all duration-200"
                  style={{
                    background: "rgba(0,230,118,0.08)",
                    border: "1px solid rgba(0,230,118,0.15)",
                    color: "#5a8060",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(0,230,118,0.15)";
                    (e.currentTarget as HTMLElement).style.color = "#00E676";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(0,230,118,0.08)";
                    (e.currentTarget as HTMLElement).style.color = "#5a8060";
                  }}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              heading: "Platform",
              links: ["Browse Courts", "How It Works", "Pricing", "For Venues", "Team Bookings"],
            },
            {
              heading: "Company",
              links: ["About Us", "Blog", "Careers", "Press", "Contact"],
            },
            {
              heading: "Legal",
              links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Refund Policy"],
            },
          ].map(({ heading, links }) => (
            <div key={heading}>
              <h4
                className="font-mono text-xs tracking-widest uppercase mb-4"
                style={{ color: "#00E676" }}
              >
                {heading}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-colors duration-200"
                      style={{ color: "#4a7a50" }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#9abf9e")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#4a7a50")}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(0,230,118,0.06)" }}
        >
          <p className="text-xs font-mono" style={{ color: "#2a4a2e" }}>
            © 2026 KickOff Technologies Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#00E676" }} />
            <span className="text-xs font-mono" style={{ color: "#2a5a30" }}>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}