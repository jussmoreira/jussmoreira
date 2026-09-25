import React, { useEffect, useRef } from "react";

export function CursorSpotlight() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = ({ clientX, clientY }) => {
      el.style.setProperty("--cx", `${clientX}px`);
      el.style.setProperty("--cy", `${clientY}px`);
      el.style.opacity = "1";
    };
    const onLeave = () => { el.style.opacity = "0"; };

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 hidden md:block"
      style={{
        opacity: 0,
        transition: "opacity 400ms ease",
        background:
          "radial-gradient(600px circle at var(--cx, 50%) var(--cy, 50%), hsl(var(--accent) / 0.07), transparent 40%)",
      }}
    />
  );
}
