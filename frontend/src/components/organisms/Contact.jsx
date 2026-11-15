import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { ContactLink } from "@/components/atoms/contact-link";
import { SocialIcon } from "@/components/atoms/social-icon";
import { SectionBar } from "@/components/molecules/SectionBar";
import { contactValue } from "@/lib/contact";

const socials = [
  { key: "linkedin", label: "LinkedIn" },
  { key: "github", label: "GitHub" },
  { key: "orcid", label: "ORCID" },
  { key: "credly", label: "Credly" },
];

/* Único lugar del sitio con los datos de contacto. El texto se arma en el
   cliente, en partes, para que no aparezca completo en el HTML inicial.
   Es el cierre de la página: un bloque en tinta que continúa en el pie. */
export default function Contact() {
  const { t } = useTranslation();
  const contact = t("contact", { returnObjects: true });
  const [data, setData] = useState({ user: "", domain: "" });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const [user = "", domain = ""] = contactValue("email").split("@");
    setData({ user, domain });
  }, []);

  useEffect(() => {
    if (!copied) return undefined;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copyEmail = async () => {
    const email = contactValue("email");
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      /* Sin permiso de portapapeles: el enlace mailto sigue disponible */
    }
  };

  if (!contact || typeof contact !== "object") return null;

  return (
    <section
      id="contact"
      className="section-pad bg-[hsl(var(--inverse))] text-[hsl(var(--inverse-foreground))]"
    >
      <div className="container-narrow">
        <SectionBar label={contact.eyebrow} inverse />

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="reveal lg:col-span-7">
            <h2 className="text-[clamp(2.8rem,7vw,6rem)] leading-[0.92]">
              {contact.titleStart} <em className="not-italic text-[hsl(var(--inverse-accent))]">{contact.titleEmphasis}</em>
              {contact.titleEnd}
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-[hsl(var(--inverse-muted))]">
              {contact.description}
            </p>

            {/* Placa de estado: lo que hago, lo que busco y a qué estoy abierto */}
            {contact.status && Array.isArray(contact.status.items) && (
              <section
                aria-label={contact.status.title}
                className="mt-10 max-w-lg border border-[hsl(var(--inverse-border))]"
              >
                <div className="flex items-center gap-2 border-b border-[hsl(var(--inverse-border))] px-4 py-2 font-mono text-[11px] text-[hsl(var(--inverse-muted))]">
                  <span aria-hidden className="status-dot h-2 w-2 bg-[hsl(var(--inverse-accent))]" />
                  {contact.status.title}
                </div>
                <dl>
                  {contact.status.items.map((row) => (
                    <div
                      key={row.label}
                      className="grid gap-1 border-b border-[hsl(var(--inverse-border))] px-4 py-3 last:border-b-0 sm:grid-cols-[7.5rem_1fr] sm:gap-4"
                    >
                      <dt className="font-mono text-[11px] uppercase text-[hsl(var(--inverse-accent))]">
                        {row.label}
                      </dt>
                      <dd className="text-[15px] leading-snug">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
          </div>

          <div className="reveal lg:col-span-5 lg:self-end">
            <div className="font-mono text-[11px] text-[hsl(var(--inverse-muted))]">{contact.emailLabel}</div>
            <ContactLink
              channel="email"
              className="arrow-link group mt-2 inline-flex items-start gap-2 font-display text-xl leading-tight [overflow-wrap:anywhere] hover:text-[hsl(var(--inverse-accent))] sm:text-2xl"
            >
              <span className="relative">
                {data.user && (
                  <>
                    <bdi>{data.user}</bdi>
                    <span>&#64;</span>
                    <bdi>{data.domain}</bdi>
                  </>
                )}
                <span aria-hidden data-on={copied} className="email-rule" />
              </span>
              <ArrowUpRight className="mt-1 h-6 w-6 flex-none" aria-hidden />
            </ContactLink>
            <div className="mt-3">
              <button
                type="button"
                onClick={copyEmail}
                aria-label={contact.copyAria}
                data-copied={copied}
                className="copy-btn inline-flex min-w-[92px] items-center justify-center gap-1.5 rounded-sm border px-2.5 py-1 font-mono text-[11px]"
              >
                {copied ? (
                  <Check className="check-draw h-3.5 w-3.5" aria-hidden />
                ) : (
                  <Copy className="h-3.5 w-3.5" aria-hidden />
                )}
                <span key={copied ? "on" : "off"} className={copied ? "copy-swap" : ""}>
                  {copied ? contact.copied : contact.copy}
                </span>
              </button>
              <span role="status" className="sr-only">
                {copied ? contact.copied : ""}
              </span>
            </div>

            <div className="mt-10 font-mono text-[11px] text-[hsl(var(--inverse-muted))]">{contact.elsewhere}</div>
            <ul className="mt-2 border-t border-[hsl(var(--inverse-border))]">
              {socials.map(({ key, label }) => (
                <li key={key} className="row-sweep border-b border-[hsl(var(--inverse-border))]">
                  <ContactLink
                    channel={key}
                    className="arrow-link group relative flex items-center justify-between px-3 py-3 font-bold transition-colors hover:text-[hsl(var(--inverse-accent))]"
                  >
                    <span className="inline-flex items-center gap-3">
                      <SocialIcon
                        name={key}
                        className="h-[18px] w-[18px] text-[hsl(var(--inverse-muted))] transition-colors group-hover:text-[hsl(var(--inverse-accent))]"
                      />
                      {label}
                    </span>
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </ContactLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
