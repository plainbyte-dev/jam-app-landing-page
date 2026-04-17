"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type CursorState = "default" | "link" | "view" | "play";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [label, setLabel] = useState("");
  const [cursorState, setCursorState] = useState<CursorState>("default");

  useEffect(() => {
    const dot = dotRef.current!;
    const ring = ringRef.current!;

    // Hide native cursor globally
    document.documentElement.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      // Dot snaps instantly
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: "power2.out",
      });
      // Ring lags behind with magnetic feel
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.45,
        ease: "power3.out",
      });
    };

    // Collect all interactive elements and their cursor types
    const bindElements = () => {
      // Generic links & buttons
      document.querySelectorAll<HTMLElement>("a, button").forEach((el) => {
        // Check for data-cursor-label first
        const customLabel = el.getAttribute("data-cursor-label");
        const cursorType = (el.getAttribute("data-cursor") as CursorState) || "link";

        el.style.cursor = "none";

        el.addEventListener("mouseenter", () => {
          const resolvedLabel = customLabel || (cursorType === "view" ? "View" : cursorType === "play" ? "Play" : "");
          setLabel(resolvedLabel);
          setCursorState(resolvedLabel ? (cursorType as CursorState) : "link");

          if (resolvedLabel) {
            // Expand ring into a filled pill with label
            gsap.to(ring, { scale: 3.5, duration: 0.35, ease: "back.out(1.4)" });
            gsap.to(dot, { scale: 0, duration: 0.2 });
          } else {
            // Simple ring expansion
            gsap.to(ring, { scale: 2, duration: 0.3, ease: "back.out(1.4)" });
            gsap.to(dot, { scale: 0, duration: 0.2 });
          }
        });

        el.addEventListener("mouseleave", () => {
          setLabel("");
          setCursorState("default");
          gsap.to(ring, { scale: 1, duration: 0.35, ease: "power3.out" });
          gsap.to(dot, { scale: 1, duration: 0.2 });
        });
      });

      // Images / work cards — show "View"
      document.querySelectorAll<HTMLElement>("[data-cursor='view']").forEach((el) => {
        el.style.cursor = "none";
        el.addEventListener("mouseenter", () => {
          setLabel("View");
          setCursorState("view");
          gsap.to(ring, { scale: 4, duration: 0.4, ease: "back.out(1.4)" });
          gsap.to(dot, { scale: 0, duration: 0.2 });
        });
        el.addEventListener("mouseleave", () => {
          setLabel("");
          setCursorState("default");
          gsap.to(ring, { scale: 1, duration: 0.35, ease: "power3.out" });
          gsap.to(dot, { scale: 1, duration: 0.2 });
        });
      });
    };

    window.addEventListener("mousemove", onMove);

    // Run after DOM is ready, and re-bind on route changes
    bindElements();
    const observer = new MutationObserver(bindElements);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
      document.documentElement.style.cursor = "";
    };
  }, []);

  return (
    <>
      {/* Small dot — snaps to cursor */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "#fff",
          pointerEvents: "none",
          zIndex: 99999,
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
          willChange: "transform",
        }}
      />

      {/* Lagging ring — morphs on hover */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.85)",
          backgroundColor: label ? "rgba(255,255,255,1)" : "transparent",
          pointerEvents: "none",
          zIndex: 99998,
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
          willChange: "transform",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background-color 0.2s ease, border-color 0.2s ease",
        }}
      >
        {label && (
          <span
            ref={labelRef}
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#000",
              userSelect: "none",
              whiteSpace: "nowrap",
              mixBlendMode: "normal",
            }}
          >
            {label}
          </span>
        )}
      </div>
    </>
  );
}