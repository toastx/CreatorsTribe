import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { RainbowKitProviderWrapper } from "@/contexts/RainbowKitProvider";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";
import Content from "./pages/Content";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const App = () => (
  <RainbowKitProviderWrapper>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait" initial={false}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/content" element={<Content />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:username" element={<Profile />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </RainbowKitProviderWrapper>
);

export default App;
