import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { clusters } from "./content/hub";

// Secondary pages are code-split so the home page ships a small initial bundle.
const Gracias = lazy(() => import("./pages/Gracias"));
const Pago = lazy(() => import("./pages/Pago"));
const PagoStatus = lazy(() => import("./pages/PagoStatus"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Trabajo = lazy(() => import("./pages/personas/Trabajo"));
const Torneo = lazy(() => import("./pages/personas/Torneo"));
const Ruta9 = lazy(() => import("./pages/personas/Ruta9"));
const Familia = lazy(() => import("./pages/personas/Familia"));
const HubIndex = lazy(() => import("./pages/hub/HubIndex"));
const ClusterPage = lazy(() => import("./pages/hub/ClusterPage"));
const HubEntryPage = lazy(() => import("./pages/hub/HubEntryPage"));
const Motoviajeros = lazy(() => import("./pages/Motoviajeros"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/gracias" element={<Gracias />} />
            <Route path="/posnet" element={<Pago />} />
            <Route path="/pago/success" element={<PagoStatus status="success" />} />
            <Route path="/pago/pending" element={<PagoStatus status="pending" />} />
            <Route path="/pago/failure" element={<PagoStatus status="failure" />} />
            <Route path="/motoviajeros" element={<Motoviajeros />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/alojamiento/trabajo" element={<Trabajo />} />
            <Route path="/alojamiento/torneo" element={<Torneo />} />
            <Route path="/alojamiento/ruta-9" element={<Ruta9 />} />
            <Route path="/alojamiento/familia" element={<Familia />} />
            {/* Topic clusters: pillar page + entries */}
            <Route path="/guias" element={<HubIndex />} />
            {clusters.map((c) => (
              <Route key={c.slug} path={`/${c.slug}`} element={<ClusterPage clusterSlug={c.slug} />} />
            ))}
            {clusters.map((c) => (
              <Route
                key={`${c.slug}-entry`}
                path={`/${c.slug}/:slug`}
                element={<HubEntryPage clusterSlug={c.slug} />}
              />
            ))}

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
