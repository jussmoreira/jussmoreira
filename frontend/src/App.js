import React, { useEffect } from "react";
import "@/App.css";
import Portfolio from "@/components/pages/Portfolio";
import NotFound from "@/components/pages/NotFound";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "@/components/molecules/ErrorBoundary";
import { ScrollProgress } from "@/components/atoms/scroll-progress";
import { useReveal } from "@/hooks/useReveal";

function Page() {
  const { i18n } = useTranslation();
  useReveal(i18n.resolvedLanguage);
  return <Portfolio />;
}

/* Una sola página y una 404: no hace falta un enrutador. Vercel reescribe
   cualquier ruta a index.html (vercel.json) y aquí se decide qué mostrar. */
const isHome = ["/", "/index.html"].includes(window.location.pathname);

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
      <ErrorBoundary language={language} copy={errorCopy}>
        {isHome ? <Page /> : <NotFound />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
