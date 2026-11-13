import React, { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Menu, Moon, SunMedium, X } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/contexts/ThemeContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("home");
  const { t, i18n } = useTranslation();
  const { isDark, toggleTheme } = useTheme();

  const navItems = useMemo(() => {
    const items = t("nav.items", { returnObjects: true });
    return Array.isArray(items) ? items : [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t, i18n.resolvedLanguage]);
  const profile = t("profile", { returnObjects: true });

  /* Se esconde al bajar y reaparece al subir (o al llegar arriba). Un umbral
     de 8 px evita que el temblor del trackpad lo parpadee. */
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - last) < 8) return;
      setHidden(y > last && y > 120);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((section) => io.observe(section));
    return () => io.disconnect();
  }, [navItems]);

  const go = (id) => {
    setOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.resolvedLanguage?.startsWith("es") ? "en" : "es");
  };

  const languageLabel = i18n.resolvedLanguage?.startsWith("es") ? "ES" : "EN";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-[transform,background-color] duration-300 focus-within:translate-y-0 ${
        scrolled ? "bg-background/85 backdrop-blur border-b border-border" : "bg-transparent"
      } ${hidden && !open ? "-translate-y-full" : ""}`}
    >
      <div className="container-narrow flex items-center justify-between h-16 md:h-20">
        <button
          onClick={() => go("home")}
          className="flex items-center gap-2 group"
          aria-label={t("nav.homeAria")}
        >
          <span aria-hidden className="h-2.5 w-2.5 bg-accent transition-transform duration-300 group-hover:rotate-45" />
          <span className="font-display font-condensed text-xl uppercase leading-none tracking-[-0.01em]">{profile.shortName}</span>
        </button>

        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              aria-current={active === item.id ? "true" : undefined}
              className={`text-sm link-underline transition-colors ${
                active === item.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {index > 0 && (
                <span className={`mr-1.5 font-mono text-[11px] ${active === item.id ? "text-signal" : ""}`}>
                  {String(index).padStart(2, "0")}
                </span>
              )}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded border-border bg-transparent text-foreground hover:bg-foreground hover:text-background"
            aria-label={isDark ? t("nav.themeToggleLight") : t("nav.themeToggleDark")}
          >
            {isDark ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={toggleLanguage}
            className="h-10 rounded px-3 font-mono text-xs border-border bg-transparent text-foreground hover:bg-foreground hover:text-background"
            aria-label={t("nav.language")}
          >
            {languageLabel}
          </Button>
          <Button
            onClick={() => go("contact")}
            className="btn-warm h-10 px-5 rounded font-bold"
          >
            {t("nav.cta")}
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setOpen((value) => !value)}
          aria-label={t("nav.toggleMenu")}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        inert={!open ? true : undefined}
        aria-hidden={!open}
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-background border-b border-border`}
      >
        <div className="container-narrow py-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 pb-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="rounded border-border bg-transparent text-foreground hover:bg-foreground hover:text-background"
              aria-label={isDark ? t("nav.themeToggleLight") : t("nav.themeToggleDark")}
            >
              {isDark ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={toggleLanguage}
              className="h-10 rounded px-3 font-mono text-xs border-border bg-transparent text-foreground hover:bg-foreground hover:text-background"
              aria-label={t("nav.language")}
            >
              {languageLabel}
            </Button>
          </div>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className="text-left py-2 text-foreground hover:text-signal"
            >
              {item.label}
            </button>
          ))}

          <Button
            onClick={() => go("contact")}
            className="btn-warm rounded mt-2"
          >
            {t("nav.cta")} <ArrowUpRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </header>
  );
}
