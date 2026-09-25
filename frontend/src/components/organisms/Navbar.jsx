import React, { useEffect, useState } from "react";
import { Menu, Moon, SunMedium, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/atoms/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const nav = t("nav", { returnObjects: true });
  const navItems = Array.isArray(nav?.items) ? nav.items : [];
  const activeId = useActiveSection(navItems.map((item) => item.id));

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const onKeyDown = (event) => event.key === "Escape" && setIsMenuOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.resolvedLanguage?.startsWith("es") ? "en" : "es");
  };

  const linkClass = (id) =>
    cn(
      "rounded-md px-2.5 py-1.5 text-sm transition-colors",
      activeId === id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
    );

  const settings = (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        aria-label={isDark ? nav.themeToggleLight : nav.themeToggleDark}
      >
        {isDark ? <SunMedium aria-hidden="true" /> : <Moon aria-hidden="true" />}
      </Button>
      <Button type="button" variant="ghost" size="icon" onClick={toggleLanguage} aria-label={nav.switchLanguage}>
        {nav.languageShort}
      </Button>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <div className="container-narrow flex h-16 items-center justify-between gap-6">
        <a href="#home" className="font-display text-xl font-medium" aria-label={nav.homeAria}>
          {t("profile.shortName")}
        </a>

        <nav aria-label={nav.label} className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={activeId === item.id ? "location" : undefined}
              className={linkClass(item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">{settings}</div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={nav.toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </div>

      {isMenuOpen && (
        <div id="mobile-menu" className="container-narrow border-t py-3 md:hidden">
          <nav aria-label={nav.label} className="flex flex-col">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={() => setIsMenuOpen(false)} className={cn(linkClass(item.id), "py-3 text-base")}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-2 border-t pt-3">{settings}</div>
        </div>
      )}
    </header>
  );
}
