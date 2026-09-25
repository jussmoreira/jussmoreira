import * as React from "react";
import { useTranslation } from "react-i18next";

/**
 * Enlace que se abre en otra pestaña. Añade `rel` seguro y avisa a los
 * lectores de pantalla de que cambia de pestaña.
 */
const ExternalLink = React.forwardRef(({ children, ...props }, ref) => {
  const { t } = useTranslation();

  return (
    <a ref={ref} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span className="sr-only"> {t("a11y.opensInNewTab")}</span>
    </a>
  );
});
ExternalLink.displayName = "ExternalLink";

export { ExternalLink };
