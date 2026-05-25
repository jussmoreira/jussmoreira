import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Linkedin, Github, Send } from "lucide-react";
import { Input } from "../atoms/input";
import { Textarea } from "../atoms/textarea";
import { Button } from "../atoms/button";
import { Label } from "../atoms/label";
import { toast } from "sonner";
import { portfolioAssets, CONTACT_STORAGE_KEY } from "../../mock";

const empty = { name: "", email: "", subject: "", message: "" };

function buildMailtoLink(profileEmail, form) {
  const subject = form.subject.trim() || "Contacto desde el portafolio";
  const body = [
    `Nombre: ${form.name.trim()}`,
    `Correo: ${form.email.trim()}`,
    "",
    form.message.trim(),
  ].join("\n");

  return `mailto:${profileEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function Contact() {
  const { t } = useTranslation();
  const profile = t("profile", { returnObjects: true });
  const contact = t("contact", { returnObjects: true });
  const socialLabels =
    contact && typeof contact === "object"
      ? contact.socialLabels || t("footer.socialLabels", { returnObjects: true })
      : t("footer.socialLabels", { returnObjects: true });
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);

  if (!contact || typeof contact !== "object") return null;

  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  const onSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error(contact.validation.required);
      return;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!emailOk) {
      toast.error(contact.validation.invalidEmail);
      return;
    }

    setLoading(true);

    try {
      const existing = JSON.parse(window.localStorage.getItem(CONTACT_STORAGE_KEY) || "[]");
      existing.unshift({
        ...form,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      });
      window.localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(existing));

      window.location.href = buildMailtoLink(profile.email, form);

      setTimeout(() => {
        setLoading(false);
        setForm(empty);
        toast.success(contact.validation.success);
      }, 700);
    } catch (_error) {
      setLoading(false);
      toast.error(contact.validation.error);
    }
  };

  return (
    <section
      id="contact"
      className="section-pad bg-secondary/40 border-t border-border"
    >
      <div className="container-narrow grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 reveal">
          <div className="flex items-center gap-3 mb-3">
            <span className="divider-dot" />
            <span className="eyebrow">{contact.eyebrow}</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-foreground leading-tight">
            {contact.titleStart} <em className="text-primary">{contact.titleEmphasis}</em>
            {contact.titleEnd}
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            {contact.description}
          </p>

          <div className="mt-8 space-y-3">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 group"
            >
              <span className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center group-hover:bg-border transition-colors">
                <Mail className="w-4 h-4 text-primary" />
              </span>
              <span className="text-foreground link-underline">{profile.email}</span>
            </a>
            <a href={`tel:${profile.phoneRaw}`} className="flex items-center gap-3 group">
              <span className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center group-hover:bg-border transition-colors">
                <Phone className="w-4 h-4 text-primary" />
              </span>
              <span className="text-foreground link-underline">{profile.phone}</span>
            </a>
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center">
                <MapPin className="w-4 h-4 text-primary" />
              </span>
              <span className="text-foreground">{profile.location}</span>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={portfolioAssets.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg border border-border bg-card flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label={socialLabels.linkedin}
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={portfolioAssets.socials.github}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg border border-border bg-card flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label={socialLabels.github}
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="reveal lg:col-span-7 card-warm rounded-2xl p-6 md:p-8"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-muted-foreground">
                {contact.labels.name}
              </Label>
              <Input
                id="name"
                value={form.name}
                onChange={update("name")}
                placeholder={contact.placeholders.name}
                className="bg-background border-border focus-visible:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-muted-foreground">
                {contact.labels.email}
              </Label>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={update("email")}
                placeholder={contact.placeholders.email}
                className="bg-background border-border focus-visible:ring-primary"
              />
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <Label htmlFor="subject" className="text-muted-foreground">
              {contact.labels.subject}
            </Label>
            <Input
              id="subject"
              value={form.subject}
              onChange={update("subject")}
              placeholder={contact.placeholders.subject}
              className="bg-background border-border focus-visible:ring-primary"
            />
          </div>
          <div className="space-y-2 mt-4">
            <Label htmlFor="message" className="text-muted-foreground">
              {contact.labels.message}
            </Label>
            <Textarea
              id="message"
              value={form.message}
              onChange={update("message")}
              placeholder={contact.placeholders.message}
              rows={6}
              className="bg-background border-border focus-visible:ring-primary resize-none"
            />
          </div>
          <div className="mt-6 flex items-center justify-between flex-wrap gap-3">
            <p className="text-xs text-muted-foreground">
              {contact.localNote}
            </p>
            <Button type="submit" disabled={loading} className="btn-warm rounded-full px-6 h-11">
              {loading ? (
                contact.sending
              ) : (
                <>
                  {contact.submit} <Send className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}