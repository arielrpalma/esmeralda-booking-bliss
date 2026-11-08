import { Component, type ReactNode } from "react";

// Catches failed page downloads (e.g. a network drop on mobile) and offers a retry
// instead of leaving a blank screen.
const RELOAD_KEY = "chunk-reload-at";

export default class RouteErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error) {
    const isChunkError = /dynamically imported module|Importing a module script failed|ChunkLoadError|Loading chunk/i.test(
      error?.message ?? "",
    );
    // Auto-reload once per minute for stale/failed chunks after a new deploy.
    const last = Number(sessionStorage.getItem(RELOAD_KEY) || 0);
    if (isChunkError && Date.now() - last > 60_000) {
      sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
      window.location.reload();
    }
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background px-6 text-center">
        <p className="font-display text-2xl text-foreground">No pudimos cargar la página</p>
        <p className="font-body text-muted-foreground">Revisá tu conexión e intentá de nuevo.</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-full bg-primary px-6 py-3 font-body text-sm text-primary-foreground"
        >
          Reintentar
        </button>
      </div>
    );
  }
}
