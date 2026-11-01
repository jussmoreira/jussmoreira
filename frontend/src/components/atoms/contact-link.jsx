import React, { useState } from "react";
import { contactHref } from "@/lib/contact";

const external = new Set(["linkedin", "github", "orcid", "credly"]);

/* Enlace de contacto protegido contra recolectores de spam:
   - el HTML inicial no trae href real (no hay mailto:/tel:/URL en texto plano);
   - el destino se resuelve al pasar el cursor, enfocar, tocar o hacer clic;
   - las redes externas llevan nofollow/noopener/noreferrer. */
export function ContactLink({ channel, children, className = "", ...rest }) {
  const [href, setHref] = useState(undefined);
  const isExternal = external.has(channel);

  const resolve = () => {
    if (href === undefined) setHref(contactHref(channel));
  };

  const onClick = (event) => {
    if (href !== undefined) return; // el navegador sigue el href ya resuelto
    event.preventDefault();
    const target = contactHref(channel);
    setHref(target);
    if (isExternal) {
      window.open(target, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = target;
    }
  };

  return (
    <a
      {...rest}
      href={href}
      role={href === undefined ? "link" : undefined}
      tabIndex={0}
      onMouseEnter={resolve}
      onFocus={resolve}
      onTouchStart={resolve}
      onClick={onClick}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "nofollow noopener noreferrer" : undefined}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </a>
  );
}
