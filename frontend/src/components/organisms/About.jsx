import React from "react";
import { useCountUp } from "@/hooks/useCountUp";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { SectionBar } from "@/components/molecules/SectionBar";
import { asList, useContent } from "@/hooks/useContent";

function Stat({ label, value, suffix, inView }) {
  const animatedValue = useCountUp(value, inView, 850);

  return (
    <div className="border-t border-[hsl(var(--rule))] pt-3">
      <div className="font-display font-condensed stat-number text-5xl leading-none text-foreground md:text-6xl">
        {animatedValue}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="mt-2 font-mono text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}

export default function About() {
  const about = useContent("about");
  const { ref, inView } = useInViewOnce({ threshold: 0.25 });

  if (!about) return null;

  const paragraphs = asList(about.paragraphs);
  const stats = asList(about.stats);
  const [lead, ...body] = paragraphs;

  return (
    <section id="about" className="section-pad">
      <div className="container-narrow">
        <SectionBar label={about.eyebrow} />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <h2 className="reveal text-[clamp(2.4rem,5vw,4rem)] text-foreground lg:col-span-5">
            {about.titleStart} <em className="not-italic text-signal">{about.titleEmphasis}</em>{" "}
            {about.titleEnd}
          </h2>

          <div className="reveal lg:col-span-6 lg:col-start-7">
            {lead && <p className="text-xl leading-relaxed text-foreground">{lead}</p>}
            <div className="mt-5 space-y-5 text-[17px] leading-relaxed text-muted-foreground">
              {body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        <div ref={ref} className="reveal mt-16 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
          {stats.map(({ label, value }) => {
            const match = String(value).match(/^(\d+)(.*)$/);

            return (
              <Stat
                key={label}
                label={label}
                value={Number(match?.[1] || 0)}
                suffix={match?.[2] || ""}
                inView={inView}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
