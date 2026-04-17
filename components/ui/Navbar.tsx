"use client";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-6 h-15"
      style={{
        background: "rgba(6,13,8,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,230,118,0.1)",
      }}
    >
      {/* Logo */}
      <div>
        <Image src="/jam_logo.png" alt="Logo" width={55} height={55} loading="eager" />
      </div>
 
      {/* Links */}
      <div className="hidden md:flex items-center gap-7">
        {["How It Works", "Features", "Venues", "Challenges", "Rewards"].map((link) => (
          <a
            key={link}
            href="#"
            className="text-sm transition-colors duration-200 hover:text-green-neon"
            style={{ color: "#7a9e7e", textDecoration: "none" }}
          >
            {link}
          </a>
        ))}
      </div>
 
      {/* CTA */}
      <button
        className="px-5 py-2 rounded-lg font-medium text-sm transition-opacity duration-200 hover:opacity-90"
        style={{ background: "#00E676", color: "#060d08" }}
      >
        Book a Court
      </button>
    </nav>
  );
}
 