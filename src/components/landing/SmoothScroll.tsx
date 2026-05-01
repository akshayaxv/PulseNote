import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const { scrollY } = useScroll();

  // The "Rope" feel: stiffness and damping control the elasticity
  const smoothY = useSpring(scrollY, {
    stiffness: 45,
    damping: 18,
    restDelta: 0.001,
  });

  const y = useTransform(smoothY, (value) => -value);

  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Initial check
    const timer = setTimeout(handleResize, 500);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, [children]);

  return (
    <>
      <div style={{ height: contentHeight }} className="w-full pointer-events-none" />
      <motion.div
        ref={contentRef}
        style={{ y }}
        className="fixed top-0 left-0 w-screen flex flex-col pointer-events-auto"

      >
        {children}
      </motion.div>
    </>
  );
};
