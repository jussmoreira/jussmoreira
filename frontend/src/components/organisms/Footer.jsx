import React from "react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="container-narrow flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-muted-foreground">
        <p>{t("footer.copyright", { year, name: t("profile.name") })}</p>
        <a href="#home" className="underline-offset-4 hover:text-foreground hover:underline">
          {t("footer.backToTop")}
        </a>
      </div>
    </footer>
  );
}
