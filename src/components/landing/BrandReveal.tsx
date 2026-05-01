import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sparkles } from "lucide-react";

export const BrandReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Animation values
  const opacity = useTransform(scrollYProgress, [0.3, 0.45, 0.6, 0.8], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.3, 0.5], [0.8, 1]);
  const letterSpacing = useTransform(scrollYProgress, [0.3, 0.6], ["0.5em", "-0.02em"]);

  // Shutter panels
  const leftPanelX = useTransform(scrollYProgress, [0.3, 0.5], ["0%", "-100%"]);
  const rightPanelX = useTransform(scrollYProgress, [0.3, 0.5], ["0%", "100%"]);

  return (
    <div
      ref={containerRef}
      className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-background"
    >
      {/* The Reveal Shutter */}
      <div className="absolute inset-0 z-20 pointer-events-none flex">
        <motion.div
          style={{ x: leftPanelX }}
          className="h-full w-1/2 bg-[#020617] border-r border-white/5"
        />
        <motion.div
          style={{ x: rightPanelX }}
          className="h-full w-1/2 bg-[#020617] border-l border-white/5"
        />
      </div>

      {/* Content behind shutter */}
      <motion.div
        style={{ opacity, scale, letterSpacing }}
        className="relative z-10 text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-dark border-white/10 mb-8 text-[10px] font-black uppercase tracking-[0.3em] text-emerald shadow-glow"
        >
          <Sparkles className="w-3 h-3" /> Future of Intelligence
        </motion.div>

        <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-display font-black leading-none tracking-tighter">
          MeetMind <span className="text-gradient block md:inline">AI</span>
        </h2>

        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="w-1 h-20 rounded-full bg-gradient-to-b from-emerald to-transparent opacity-50" />
          <p className="text-sm font-bold uppercase tracking-[0.4em] text-white/20">
            The End of Ordinary Meetings
          </p>
        </div>

        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,hsl(160_84%_45%/0.15),transparent_70%)] -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[radial-gradient(circle,hsl(199_89%_60%/0.1),transparent_70%)] -z-10" />
      </motion.div>
    </div>
  );
};
