import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { Topbar } from "./Topbar";

const titleMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/meetings": "Meetings",
  "/dashboard/upload": "Upload",
  "/dashboard/tasks": "Tasks",
  "/dashboard/chat": "AI Chat",
  "/dashboard/analytics": "Analytics",
  "/dashboard/integrations": "Integrations",
  "/dashboard/settings": "Settings",
};

export const AppLayout = () => {
  const { pathname } = useLocation();
  // match by prefix for /meetings/:id
  const title =
    titleMap[pathname] ||
    (pathname.startsWith("/dashboard/meetings") ? "Meeting Details" : "Dashboard");
  return (
    <div className="min-h-screen flex bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar title={title} />
        <main className="flex-1 p-6 md:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
