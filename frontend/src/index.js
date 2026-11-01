import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource-variable/bricolage-grotesque/wght.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/700.css";
import "@/index.css";
import "@/i18n";
import App from "@/App";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Aplica el tema antes del primer render para evitar parpadeo (FOUC).
// Misma prioridad que ThemeContext: valor guardado -> prefers-color-scheme -> claro.
try {
  const storedTheme = window.localStorage.getItem("jm_theme_v1");
  const prefersDark =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = storedTheme === "dark" || (!storedTheme && prefersDark);

  document.documentElement.classList.toggle("dark", isDark);
  document.documentElement.style.colorScheme = isDark ? "dark" : "light";
} catch (_error) {
  // Ignore storage access issues and fall back to the provider state.
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
