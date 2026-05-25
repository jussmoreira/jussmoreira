import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "./components/pages/Portfolio";
import { Toaster } from "./components/molecules/sonner";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "./components/molecules/ErrorBoundary";

function useReveal(dependency) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(".reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const revealIfVisible = (element) => {
      const rect = element.getBoundingClientRect();
      const visible = rect.top < window.innerHeight * 0.88 && rect.bottom > 0;

      if (visible) {
        element.classList.add("in-view");
        return true;
      }

      return false;
    };

    elements.forEach((element) => {
      if (!element.classList.contains("in-view") && !revealIfVisible(element)) {
        io.observe(element);
      }
    });

    return () => io.disconnect();
  }, [dependency]);
}

function Page() {
  const { i18n } = useTranslation();
  useReveal(i18n.resolvedLanguage);
  return <Portfolio />;
}

function App() {
  const { i18n, t } = useTranslation();
  const language = i18n.resolvedLanguage?.startsWith("es") ? "es" : "en";
  const errorCopy = t("errorBoundary", { returnObjects: true });

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div className="App">
      <ErrorBoundary language={language} copy={errorCopy}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Page />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
      <Toaster richColors position="bottom-right" />
    </div>
  );
}

export default App;
