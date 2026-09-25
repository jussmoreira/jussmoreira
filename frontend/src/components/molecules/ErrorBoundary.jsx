import React from "react";
import { House, RotateCcw } from "lucide-react";

function ErrorFallback({ copy, error, onRetry, onHome }) {
  const title = copy?.title || "Something went wrong";
  const description = copy?.description || "Try again or go back to the home page.";
  const retryLabel = copy?.retry || "Try again";
  const homeLabel = copy?.home || "Go home";
  const detailsLabel = copy?.detailsLabel || "Technical details";
  const details = error?.message || copy?.fallbackDetails;

  return (
    <main className="container-narrow flex min-h-screen flex-col justify-center py-16">
      <h1 className="max-w-[20ch] text-4xl leading-tight md:text-5xl">{title}</h1>
      <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-muted-foreground">{description}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          {retryLabel}
        </button>
        <button
          type="button"
          onClick={onHome}
          className="inline-flex h-11 items-center gap-2 rounded-md border border-input px-5 text-sm font-medium transition-colors hover:bg-secondary"
        >
          <House className="size-4" aria-hidden="true" />
          {homeLabel}
        </button>
      </div>

      {details && (
        <details className="mt-10 max-w-[65ch] text-sm text-muted-foreground">
          <summary className="cursor-pointer">{detailsLabel}</summary>
          <pre className="mt-3 whitespace-pre-wrap break-words rounded-md border bg-secondary p-4 font-mono text-xs">{details}</pre>
        </details>
      )}
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