import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import { Login, Signup } from "./pages/Auth.tsx";
import { AppLayout } from "./components/dashboard/AppLayout.tsx";
import Dashboard from "./pages/app/Dashboard.tsx";
import Meetings from "./pages/app/Meetings.tsx";
import MeetingDetail from "./pages/app/MeetingDetail.tsx";
import Upload from "./pages/app/Upload.tsx";
import Tasks from "./pages/app/Tasks.tsx";
import AIChat from "./pages/app/AIChat.tsx";
import Analytics from "./pages/app/Analytics.tsx";
import Integrations from "./pages/app/Integrations.tsx";
import Settings from "./pages/app/Settings.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="meetings" element={<Meetings />} />
            <Route path="meetings/:id" element={<MeetingDetail />} />
            <Route path="upload" element={<Upload />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="chat" element={<AIChat />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="integrations" element={<Integrations />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
