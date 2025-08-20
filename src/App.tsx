import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FilesPage from "./pages/Files";
import SearchPage from "./pages/Search";
import PeersPage from "./pages/Peers";
import NetworkPage from "./pages/Network";
import { useWailsEvents } from "./hooks/useWailsEvents";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      retry: (failureCount, error) => {
        // Don't retry if we're not in Wails environment
        if (typeof window === 'undefined' || !window.go) {
          return false
        }
        return failureCount < 2
      },
    },
  },
});

function AppContent() {
  useWailsEvents() // Set up real-time event listeners
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/files" element={<FilesPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/peers" element={<PeersPage />} />
      <Route path="/network" element={<NetworkPage />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
