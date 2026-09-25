import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Portfolio from "@/components/pages/Portfolio";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "@/components/molecules/ErrorBoundary";

function App() {
  const { i18n, t } = useTranslation();
  const language = i18n.resolvedLanguage?.startsWith("es") ? "es" : "en";
  const errorCopy = t("errorBoundary", { returnObjects: true });

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <ErrorBoundary language={language} copy={errorCopy}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
