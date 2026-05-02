import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { Topbar } from "./Topbar";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const title =
    titleMap[pathname] ||
    (pathname.startsWith("/dashboard/meetings") ? "Meeting Details" : "Dashboard");

  return (
    <div className="min-h-screen flex bg-background relative overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      <AppSidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 h-screen">
        <Topbar title={title} onMenuClick={() => setIsMobileMenuOpen(true)} />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto scrollbar-hide relative bg-[#020617]">
          <div className="max-w-[1600px] mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};
