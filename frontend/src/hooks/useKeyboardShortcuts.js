import { useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useList } from "@/hooks/useContent";

const isTyping = (target) =>
  target instanceof HTMLElement &&
  (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

/**
 * Atajos de una sola tecla para moverse por la página:
 * 0 inicio · 1-6 secciones (mismo número que la navegación) · T tema ·
 * / enfoca la terminal · ? muestra la ayuda.
 * No actúan al escribir en un campo, con Ctrl/Alt/Meta, ni con un diálogo abierto.
 */
export function useKeyboardShortcuts({ onToggleHelp }) {
  const { toggleTheme } = useTheme();
  const items = useList("nav.items");

  useEffect(() => {
    const ids = items.map((item) => item.id);

    const onKeyDown = (event) => {
      if (event.ctrlKey || event.altKey || event.metaKey || event.defaultPrevented) return;
      if (isTyping(event.target)) return;
      if (document.querySelector('[role="dialog"][aria-modal="true"], [data-state="open"][role="dialog"]')) return;

      const { key } = event;
      if (/^[0-6]$/.test(key) && ids[Number(key)]) {
        event.preventDefault();
        document.getElementById(ids[Number(key)])?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (key === "t" || key === "T") {
        toggleTheme();
      } else if (key === "/") {
        const input = document.getElementById("terminal-input");
        if (!input) return;
        event.preventDefault();
        document.getElementById("home")?.scrollIntoView({ behavior: "smooth", block: "start" });
        input.focus({ preventScroll: true });
      } else if (key === "?") {
        onToggleHelp();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [items, toggleTheme, onToggleHelp]);
}
