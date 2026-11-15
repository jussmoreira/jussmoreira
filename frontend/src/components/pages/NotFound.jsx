import React, { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useContent } from "@/hooks/useContent";

/* 404 como una lámina faltante: mismo rótulo, regla y cifra condensada que
   el hero, con un solo camino de vuelta. */
export default function NotFound() {
  const copy = useContent("notFound") ?? {};
  const profile = useContent("profile") ?? {};

  useEffect(() => {
    const previous = document.title;
    document.title = `404 · ${profile.shortName}`;
    return () => {
      document.title = previous;
    };
  }, [profile.shortName]);

  return (
    <main className="flex min-h-[100dvh] flex-col">
      <div className="container-narrow flex w-full flex-1 flex-col pt-10 pb-12 md:pt-14">
        <div className="flex items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
          <span>{copy.sheet}</span>
          <span className="text-foreground">{profile.shortName}</span>
        </div>
        <div aria-hidden className="mt-3 h-px w-full bg-[hsl(var(--rule))]" />

        <div className="my-auto py-16">
          <p
            aria-hidden
            className="font-display font-condensed text-[min(42vw,20rem)] uppercase leading-[0.8] tracking-[-0.04em] text-foreground"
          >
            404<span className="text-accent">.</span>
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-12">
            <h1 className="text-[clamp(2rem,4vw,3rem)] leading-[0.95] text-foreground md:col-span-5">
              {copy.title}
            </h1>
            <div className="md:col-span-6 md:col-start-7">
              <p className="max-w-md leading-relaxed text-muted-foreground">{copy.body}</p>
              <a
                href="/"
                className="btn-warm mt-6 inline-flex h-11 items-center gap-2 rounded px-5 text-sm font-bold"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                {copy.back}
              </a>
            </div>
          </div>
        </div>

        {/* Cota al pie, como en la foto del hero */}
        <div aria-hidden className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
          <span className="h-2.5 w-px bg-current" />
          <span className="h-px flex-1 bg-current" />
          <span>FIG. 404</span>
          <span className="h-px flex-1 bg-current" />
          <span className="h-2.5 w-px bg-current" />
        </div>
      </div>
    </main>
  );
}
