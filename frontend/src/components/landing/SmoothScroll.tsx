import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollY } = useScroll();

  const smoothY = useSpring(scrollY, {
    stiffness: 45,
    damping: 18,
    restDelta: 0.001,
  });

  const y = useTransform(smoothY, (value) => -value);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const handleResize = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    const timer = setTimeout(handleResize, 500);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, [children, isMobile]);

  if (isMobile) {
    return <div className="w-full flex flex-col">{children}</div>;
  }

  return (
    <>
      <div style={{ height: contentHeight }} className="w-full pointer-events-none" />
      <motion.div
        ref={contentRef}
        style={{ y }}
        className="fixed top-0 left-0 w-screen flex flex-col pointer-events-auto will-change-transform"
      >
        {children}
      </motion.div>
    </>
  );
};
