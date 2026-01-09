import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import DashboardHome from "./pages/dashboard/DashboardHome";
import TemplatesList from "./pages/dashboard/TemplatesList";
import NewTemplate from "./pages/dashboard/NewTemplate";
import TemplateEditor from "./pages/dashboard/TemplateEditor";
import GeneratePage from "./pages/dashboard/GeneratePage";
import AssetsPage from "./pages/dashboard/AssetsPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/dashboard/templates" element={<TemplatesList />} />
          <Route path="/dashboard/templates/new" element={<NewTemplate />} />
          <Route path="/dashboard/templates/:templateId" element={<TemplateEditor />} />
          <Route path="/dashboard/generate" element={<GeneratePage />} />
          <Route path="/dashboard/assets" element={<AssetsPage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
