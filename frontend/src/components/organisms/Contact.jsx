import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, MapPin, Linkedin, Github } from "lucide-react";
import { OrcidIcon } from "@/components/atoms/orcid-icon";
import { CredlyIcon } from "@/components/atoms/credly-icon";
import { ContactLink } from "@/components/atoms/contact-link";
import { contactValue } from "@/lib/contact";

const iconBox =
  "w-10 h-10 flex-none rounded bg-secondary border border-border flex items-center justify-center";
const cardClass =
  "flex items-center gap-3 rounded border border-border bg-card px-4 py-3 transition-colors hover:border-primary/40";

const socials = [
  { key: "linkedin", label: "LinkedIn", Icon: Linkedin },
  { key: "github", label: "GitHub", Icon: Github },
  { key: "orcid", label: "ORCID", Icon: OrcidIcon },
  { key: "credly", label: "Credly", Icon: CredlyIcon },
];

/* Único lugar del sitio con los datos de contacto. El texto se arma en el
   cliente, en partes, para que no aparezca completo en el HTML inicial. */
export default function Contact() {
  const { t } = useTranslation();
  const profile = t("profile", { returnObjects: true });
  const contact = t("contact", { returnObjects: true });
  const [data, setData] = useState({ user: "", domain: "" });

  useEffect(() => {
    const [user = "", domain = ""] = contactValue("email").split("@");
    setData({ user, domain });
  }, []);

  if (!contact || typeof contact !== "object") return null;

  return (
    <section id="contact" className="section-pad bg-secondary/40 border-t border-border">
      <div className="container-narrow max-w-3xl mx-auto text-center">
        <div className="reveal flex items-center justify-center gap-3 mb-3">
          <span className="eyebrow eyebrow-index">{contact.eyebrow}</span>
        </div>
        <h2 className="reveal section-title font-display text-4xl md:text-5xl text-foreground leading-tight">
          {contact.titleStart} <em className="not-italic text-primary">{contact.titleEmphasis}</em>
          {contact.titleEnd}
        </h2>
        <p className="reveal mt-5 text-muted-foreground leading-relaxed">
          {contact.description}
        </p>

        <div className="reveal mt-10 grid sm:grid-cols-2 gap-3 text-left">
          <ContactLink channel="email" className={cardClass}>
            <span className={iconBox}>
              <Mail className="w-4 h-4 text-primary" aria-hidden />
            </span>
            <span className="text-foreground link-underline break-all">
              {data.user && (
                <>
                  <bdi>{data.user}</bdi>
                  <span>&#64;</span>
                  <bdi>{data.domain}</bdi>
                </>
              )}
            </span>
          </ContactLink>

          <div className={`${cardClass}`}>
            <span className={iconBox}>
              <MapPin className="w-4 h-4 text-primary" aria-hidden />
            </span>
            <span className="text-foreground">{profile.location}</span>
          </div>
        </div>

        <ul className="reveal mt-3 flex flex-wrap justify-center gap-3">
          {socials.map(({ key, label, Icon }) => (
            <li key={key}>
              <ContactLink
                channel={key}
                className="inline-flex items-center gap-2 rounded border border-border bg-card px-4 py-2.5 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <Icon className="w-4 h-4 text-accent" aria-hidden />
                {label}
              </ContactLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
