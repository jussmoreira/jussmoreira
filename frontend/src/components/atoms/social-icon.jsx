import React from "react";
import { BadgeCheck, Github, Linkedin } from "lucide-react";

/* ORCID no existe en lucide: círculo con "iD" dibujado en trazo, con el mismo
   grosor y esquinas que los demás iconos del sitio. */
function OrcidIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 11v5" />
      <path d="M8 8h.01" />
      <path d="M11.5 8v8" />
      <path d="M11.5 8h2a4 4 0 0 1 0 8h-2" />
    </svg>
  );
}

const ICONS = {
  linkedin: Linkedin,
  github: Github,
  orcid: OrcidIcon,
  credly: BadgeCheck,
};

/* Icono de una red de contacto; decorativo, el nombre ya va en el enlace */
export function SocialIcon({ name, className = "h-[18px] w-[18px]" }) {
  const Icon = ICONS[name];
  if (!Icon) return null;
  return <Icon aria-hidden className={className} />;
}
