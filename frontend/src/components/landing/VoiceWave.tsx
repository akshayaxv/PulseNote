import { motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

const BAR_COUNT = 48;

export const VoiceWave = () => {
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Initialize audio element
    const audio = new Audio("/interstellar.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    return () => {
      window.removeEventListener("resize", checkMobile);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const barCount = isMobile ? 24 : BAR_COUNT;
  const particleCount = isMobile ? 3 : 14;

  // Desktop: hover to play
  const handleMouseEnter = useCallback(() => {
    if (isMobile || !audioRef.current) return;
    audioRef.current
      .play()
      .then(() => setPlaying(true))
      .catch((e) => console.log("Audio play blocked:", e));
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (isMobile || !audioRef.current) return;
    audioRef.current.pause();
    setPlaying(false);
  }, [isMobile]);

  // Mobile: tap to toggle play/pause
  const handleTap = useCallback(() => {
    if (!isMobile || !audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch((e) => console.log("Mobile audio blocked:", e));
    }
  }, [isMobile, playing]);

  // Stop audio on unmount / when no longer hovered on desktop
  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.1,
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // pre-compute pseudo-random heights so SSR stays stable
  const bars = Array.from({ length: barCount }, (_, i) => {
    const seed = Math.sin(i * 1.7) * 0.5 + 0.5;
    return {
      base: 30 + seed * 70,
      delay: (i * 0.04) % 1.2,
      duration: 1.2 + (i % 5) * 0.18,
    };
  });

  const particles = Array.from({ length: particleCount }, (_, i) => i);

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTap}
      className="relative w-full h-48 md:h-56 rounded-3xl bg-[#030816] md:glass-dark border border-white/10 overflow-hidden cursor-pointer group"
      style={{ willChange: "transform" }}
    >
      {/* Glow */}
      <motion.div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, hsl(199 89% 60% / 0.35), transparent 60%)",
        }}
        animate={{ opacity: playing ? 0.95 : 0.55, scale: playing ? 1.1 : 1 }}
        transition={{ duration: 0.6 }}
      />

      {/* Floating particles */}
      {particles.map((p) => {
        const colors = ["#60A5FA", "#38BDF8", "#10B981"];
        return (
          <motion.div
            key={p}
            className="absolute rounded-full blur-[1px]"
            style={{
              width: isMobile ? 3 : 4 + (p % 3) * 2,
              height: isMobile ? 3 : 4 + (p % 3) * 2,
              left: `${(p * (isMobile ? 15 : 7.3)) % 100}%`,
              bottom: 0,
              background: colors[p % 3],
              boxShadow: isMobile ? "none" : `0 0 12px ${colors[p % 3]}`,
            }}
            animate={{
              y: [0, -180 - (p % 4) * 20],
              x: [0, (p % 2 ? 1 : -1) * 20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: isMobile ? 6 : 4 + (p % 3),
              repeat: Infinity,
              delay: p * 0.4,
              ease: "easeOut",
            }}
          />
        );
      })}

      {/* Wave bars */}
      <div
        className="absolute inset-0 flex items-center justify-center gap-[3px] md:gap-1.5 px-6"
        style={{ willChange: "transform" }}
      >
        {visible &&
          bars.map((bar, i) => (
            <motion.div
              key={i}
              className="w-1 md:w-1.5 rounded-full origin-center will-change-transform"
              style={{
                background: `linear-gradient(180deg, hsl(217 91% 68%), hsl(199 89% 60%) 50%, hsl(160 84% 45%))`,
                height: `${bar.base}%`,
                boxShadow:
                  playing && !isMobile
                    ? "0 0 10px hsl(199 89% 60% / 0.7)"
                    : playing
                      ? "0 0 6px hsl(199 89% 60% / 0.4)"
                      : "none",
              }}
              animate={{
                scaleY: [0.3, playing ? 1.15 : 1, 0.5, playing ? 1.05 : 0.9, 0.3],
              }}
              transition={{
                duration: bar.duration,
                repeat: Infinity,
                delay: bar.delay,
                ease: "easeInOut",
              }}
            />
          ))}
      </div>

      {/* Ripple when playing */}
      {playing && (
        <motion.div
          className="absolute left-1/2 top-1/2 rounded-full border border-primary/40 pointer-events-none"
          initial={{ width: 40, height: 40, opacity: 0.8, x: "-50%", y: "-50%" }}
          animate={{ width: 400, height: 400, opacity: 0 }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
      )}

      {/* Mobile tap-to-play hint */}
      {isMobile && !playing && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none"
        >
          <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
            {/* Play icon */}
            <svg
              className="w-5 h-5 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">
            Tap to play
          </span>
        </motion.div>
      )}

      {/* Label */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
        <div className="flex items-center gap-2 text-white/50">
          <span className="relative flex h-2 w-2">
            <span
              className={`${playing ? "animate-ping" : ""} absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75`}
            />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald" />
          </span>
          <span>{playing ? "Listening · AI Processing" : "AI Processing · Idle"}</span>
        </div>
        <span className="font-mono text-white/30">00:04:21</span>
      </div>
    </div>
  );
};
