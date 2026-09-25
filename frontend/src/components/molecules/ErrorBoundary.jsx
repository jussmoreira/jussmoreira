import React from "react";
import { AlertTriangle, House, RotateCcw } from "lucide-react";

function ErrorFallback({ copy, error, onRetry, onHome }) {
  const title = copy?.title || "Something went wrong";
  const description = copy?.description || "The page ran into an unexpected problem.";
  const retryLabel = copy?.retry || "Try again";
  const homeLabel = copy?.home || "Go home";
  const detailsLabel = copy?.detailsLabel || "Technical details";

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(120,92,68,0.18),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(198,163,117,0.16),_transparent_34%)]" />
      <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -right-24 bottom-8 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-4xl items-center px-6 py-16">
        <section className="w-full rounded-3xl border border-border bg-card/90 p-8 shadow-2xl backdrop-blur md:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/70 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                <AlertTriangle className="h-4 w-4 text-primary" />
                {copy?.eyebrow || "Error"}
              </div>

              <h1 className="mt-5 font-display text-4xl leading-tight md:text-5xl">
                {title}
              </h1>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {description}
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={onRetry}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <RotateCcw className="h-4 w-4" />
                  {retryLabel}
                </button>
                <button
                  type="button"
                  onClick={onHome}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  <House className="h-4 w-4" />
                  {homeLabel}
                </button>
              </div>
            </div>

            <aside className="w-full max-w-md rounded-2xl border border-border bg-secondary/50 p-5">
              <p className="text-sm font-semibold text-foreground">{detailsLabel}</p>
              <div className="mt-3 rounded-xl border border-border bg-background/80 p-4 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">{error?.name || "Runtime error"}</p>
                <p className="mt-2 break-words font-mono text-xs leading-relaxed">
                  {error?.message || copy?.fallbackDetails || "Unknown error"}
                </p>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Unhandled application error:", error, errorInfo);
  }

  handleRetry = () => {
    window.location.reload();
  };

  handleHome = () => {
    window.location.assign("/");
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          copy={this.props.copy}
          error={this.state.error}
          onRetry={this.handleRetry}
          onHome={this.handleHome}
        />
      );
    }

    return this.props.children;
  }
}