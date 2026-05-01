import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const BAR_COUNT = 48;

export const VoiceWave = () => {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const source = useRef<AudioBufferSourceNode | null>(null);
  const filter = useRef<BiquadFilterNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const barCount = isMobile ? 24 : BAR_COUNT;
  const particleCount = isMobile ? 6 : 14;

  const startSound = () => {
    if (isMobile) return; // Skip audio synthesis on mobile for performance
    try {
      if (!audioContext.current) {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContext.current = new AudioContextClass();
      }
      if (audioContext.current.state === "suspended") audioContext.current.resume();

      // Create noise
      const bufferSize = audioContext.current.sampleRate * 2;
      const buffer = audioContext.current.createBuffer(
        1,
        bufferSize,
        audioContext.current.sampleRate
      );
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

      source.current = audioContext.current.createBufferSource();
      source.current.buffer = buffer;
      source.current.loop = true;

      filter.current = audioContext.current.createBiquadFilter();
      filter.current.type = "lowpass";

      gainRef.current = audioContext.current.createGain();
      gainRef.current.gain.setValueAtTime(0, audioContext.current.currentTime);
      gainRef.current.gain.linearRampToValueAtTime(0.25, audioContext.current.currentTime + 0.5);

      source.current.connect(filter.current);
      filter.current.connect(gainRef.current);
      gainRef.current.connect(audioContext.current.destination);

      source.current.start();

      // Animate filter to match wave feel
      const animate = () => {
        if (!filter.current || !audioContext.current) return;
        const now = audioContext.current.currentTime;
        filter.current.frequency.exponentialRampToValueAtTime(1400, now + 1);
        filter.current.frequency.exponentialRampToValueAtTime(300, now + 2);
        setTimeout(animate, 2000);
      };
      animate();
    } catch (e) {
      console.log(e);
    }
  };

  const stopSound = () => {
    const gn = gainRef.current;
    if (gn && audioContext.current) {
      gn.gain.linearRampToValueAtTime(0, audioContext.current.currentTime + 0.3);
      const src = source.current;
      setTimeout(() => {
        src?.stop();
        src?.disconnect();
      }, 300);
      source.current = null;
      gainRef.current = null;
    }
  };

  useEffect(() => {
    const unlock = () => {
      if (audioContext.current?.state === "suspended") {
        audioContext.current.resume();
      }
    };
    window.addEventListener("click", unlock);
    return () => window.removeEventListener("click", unlock);
  }, []);

  useEffect(() => {
    if (hovered) startSound();
    else stopSound();
    return () => stopSound();
  }, [hovered]);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), {
      threshold: 0.2,
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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-full h-48 md:h-56 rounded-3xl glass-dark border border-white/10 overflow-hidden cursor-pointer group"
      style={{ willChange: "transform" }}
    >
      {/* Glow */}
      <motion.div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, hsl(199 89% 60% / 0.35), transparent 60%)",
        }}
        animate={{ opacity: hovered ? 0.95 : 0.55, scale: hovered ? 1.1 : 1 }}
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
      <div className="absolute inset-0 flex items-center justify-center gap-[3px] md:gap-1.5 px-6">
        {visible &&
          bars.map((bar, i) => (
            <motion.div
              key={i}
              className="w-1 md:w-1.5 rounded-full origin-center"
              style={{
                background: `linear-gradient(180deg, hsl(217 91% 68%), hsl(199 89% 60%) 50%, hsl(160 84% 45%))`,
                boxShadow: hovered
                  ? "0 0 10px hsl(199 89% 60% / 0.7)"
                  : "0 0 6px hsl(199 89% 60% / 0.4)",
              }}
              animate={{
                height: [
                  `${bar.base * 0.3}%`,
                  `${bar.base * (hovered ? 1.15 : 1)}%`,
                  `${bar.base * 0.5}%`,
                  `${bar.base * (hovered ? 1.05 : 0.9)}%`,
                  `${bar.base * 0.3}%`,
                ],
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

      {/* Ripple on hover */}
      {hovered && (
        <motion.div
          className="absolute left-1/2 top-1/2 rounded-full border border-primary/40 pointer-events-none"
          initial={{ width: 40, height: 40, opacity: 0.8, x: "-50%", y: "-50%" }}
          animate={{ width: 400, height: 400, opacity: 0 }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
      )}

      {/* Label */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
        <div className="flex items-center gap-2 text-white/50">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald" />
          </span>
          <span>Listening · AI Processing</span>
        </div>
        <span className="font-mono text-white/30">00:04:21</span>
      </div>
    </div>
  );
};
