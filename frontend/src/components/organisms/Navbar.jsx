import React, { useEffect, useState } from "react";
import { ArrowUpRight, Menu, Moon, SunMedium, X } from "lucide-react";
import { Button } from "../atoms/button";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../contexts/ThemeContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const { t, i18n } = useTranslation();
  const { isDark, toggleTheme } = useTheme();

  const navItems = t("nav.items", { returnObjects: true }) || [];
  const profile = t("profile", { returnObjects: true });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = (t("nav.items", { returnObjects: true }) || [])
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
  }, [i18n.resolvedLanguage, t]);

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
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container-narrow flex items-center justify-between h-16 md:h-20">
        <button
          onClick={() => go("home")}
          className="flex items-center gap-2 group"
          aria-label={t("nav.homeAria")}
        >
          <span className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-display text-sm tracking-wider">
            {profile.initials}
          </span>
          <span className="font-display text-lg leading-none">{profile.shortName}</span>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={`text-sm tracking-wide link-underline transition-colors ${
                active === item.id ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground"
            aria-label={isDark ? t("nav.themeToggleLight") : t("nav.themeToggleDark")}
          >
            {isDark ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={toggleLanguage}
            className="h-10 rounded-full px-4 border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground"
            aria-label={t("nav.language")}
          >
            {languageLabel}
          </Button>
          <Button
            onClick={() => go("contact")}
            className="btn-warm h-10 px-5 rounded-full font-medium"
          >
            {t("nav.cta")}
            <ArrowUpRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen((value) => !value)}
          aria-label={t("nav.toggleMenu")}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
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
              className="rounded-full border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground"
              aria-label={isDark ? t("nav.themeToggleLight") : t("nav.themeToggleDark")}
            >
              {isDark ? <SunMedium className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={toggleLanguage}
              className="h-10 rounded-full px-4 border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground"
              aria-label={t("nav.language")}
            >
              {languageLabel}
            </Button>
          </div>

          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className="text-left py-2 text-foreground hover:text-primary"
            >
              {item.label}
            </button>
          ))}

          <Button
            onClick={() => go("contact")}
            className="btn-warm rounded-full mt-2"
          >
            {t("nav.cta")} <ArrowUpRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </header>
  );
}
