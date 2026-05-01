import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";


export const BrandReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Animation values
  const opacity = useTransform(scrollYProgress, [0.1, 0.4, 1], [0, 1, 1]);

  const scale = useTransform(scrollYProgress, [0.1, 0.4], [0.8, 1]);
  const letterSpacing = useTransform(scrollYProgress, [0.1, 0.5], ["0.5em", "-0.02em"]);

  // Shutter panels
  const leftPanelX = useTransform(scrollYProgress, [0.1, 0.4], ["0%", "-100%"]);
  const rightPanelX = useTransform(scrollYProgress, [0.1, 0.4], ["0%", "100%"]);

  return (
    <div
      ref={containerRef}
      className="relative h-[400px] w-full mb-16 rounded-[4rem] flex items-center justify-center overflow-hidden bg-[#020617] border border-emerald/20 shadow-glow-emerald"
    >










      {/* The Reveal Shutter */}
      <div className="absolute inset-0 z-20 pointer-events-none flex">
        <motion.div
          style={{ x: leftPanelX }}
          className="h-full w-[51%] bg-[#020617] border-r border-emerald/10"
        />
        <motion.div
          style={{ x: rightPanelX }}
          className="h-full w-[51%] bg-[#020617] ml-auto border-l border-emerald/10"
        />
      </div>





      {/* Content behind shutter */}
      <motion.div
        style={{ opacity, scale, letterSpacing }}
        className="relative z-10 text-center"
      >

        <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-display font-black leading-none tracking-tighter">
          MeetMind <span className="text-gradient block md:inline">AI</span>
        </h2>


        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,hsl(160_84%_45%/0.15),transparent_70%)] -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[radial-gradient(circle,hsl(199_89%_60%/0.1),transparent_70%)] -z-10" />
      </motion.div>
    </div>
  );
};
