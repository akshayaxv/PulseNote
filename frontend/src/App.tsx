import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Docs from "./pages/Docs.tsx";
import NotFound from "./pages/NotFound.tsx";
import { Login, Signup } from "./pages/Auth.tsx";
import About from "./pages/About.tsx";
import Blog from "./pages/Blog.tsx";
import Privacy from "./pages/Privacy.tsx";
import Terms from "./pages/Terms.tsx";
import BlogPost from "./pages/BlogPost.tsx";
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
import ScrollToTopOnRoute from "./components/ScrollToTopOnRoute.tsx";
import OAuthCallback from "./pages/OAuthCallback.tsx";
import { ProtectedRoute } from "./components/auth/ProtectedRoute.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTopOnRoute />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/auth/callback" element={<OAuthCallback />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route element={<ProtectedRoute />}>
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
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
