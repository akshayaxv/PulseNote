import { motion } from "framer-motion";
import { Search, Sparkles, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: "search" | "folder" | "ai";
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState = ({
  icon = "folder",
  title,
  description,
  actionText,
  onAction,
}: EmptyStateProps) => {
  const Icon = icon === "search" ? Search : icon === "ai" ? Sparkles : FolderOpen;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center rounded-[3rem] bg-[#020617]/40 border border-white/5 backdrop-blur-md"
    >
      <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 relative group">
        <div className="absolute inset-0 bg-gradient-brand opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
        <Icon className="w-10 h-10 text-primary relative z-10" />
      </div>
      <h3 className="text-2xl font-display font-bold mb-3 text-white/90 uppercase tracking-tight">
        {title}
      </h3>
      <p className="text-sm text-white/40 max-w-xs mb-8 leading-relaxed font-medium">
        {description}
      </p>
      {actionText && (
        <Button
          onClick={onAction}
          className="rounded-2xl bg-gradient-brand border-0 shadow-emerald px-8 h-12 text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all"
        >
          {actionText}
        </Button>
      )}
    </motion.div>
  );
};
