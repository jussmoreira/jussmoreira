import React, { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Portfolio from "@/components/pages/Portfolio";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "@/components/molecules/ErrorBoundary";
import { ScrollProgress } from "@/components/atoms/scroll-progress";
import { CursorSpotlight } from "@/components/atoms/cursor-spotlight";
import { useReveal } from "@/hooks/useReveal";

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
      <ScrollProgress />
      <CursorSpotlight />
      <ErrorBoundary language={language} copy={errorCopy}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Page />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
}

export default App;
