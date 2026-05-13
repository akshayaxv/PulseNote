import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Sections";
import { ScrollToTop } from "@/components/landing/ScrollToTop";
import { ShieldCheck, Lock, Eye, Server, AlertCircle } from "lucide-react";

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const sections = [
  {
    icon: Eye,
    title: "What We Collect",
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20",
    content: [
      "**Account Information**: Your email address and display name when you sign up via Google OAuth.",
      "**Meeting Data**: Audio files or transcripts you upload are processed solely to generate summaries and insights for your own use.",
      "**Usage Data**: Basic, anonymized analytics like page views and feature interactions to improve the product. No personal data is attached.",
    ],
  },
  {
    icon: Lock,
    title: "How We Use It",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
    content: [
      "Your meeting content is processed by third-party AI APIs (OpenAI) solely to perform transcription and summarization — it is never used to train models.",
      "We do not sell, rent, or share your personal data with any advertising networks or data brokers.",
      "Your data is used only to operate and improve the features you directly interact with.",
    ],
  },
  {
    icon: Server,
    title: "Data Storage & Security",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    content: [
      "All data is stored in secure, encrypted databases. We use industry-standard TLS/HTTPS for all data in transit.",
      "Audio files are processed in memory and are not permanently stored on our servers after processing completes.",
      "Access to production systems is strictly limited and protected by multi-factor authentication.",
    ],
  },
  {
    icon: AlertCircle,
    title: "Your Rights & Contact",
    color: "text-yellow-400",
    bg: "bg-yellow-500/10 border-yellow-500/20",
    content: [
      "You may delete your account and all associated data at any time from the Settings page.",
      "You may request a copy of all data we hold about you by contacting us at the email below.",
      "This is a student portfolio project. While we take privacy seriously, this is not a commercial service and comes with no guarantees.",
    ],
  },
];

const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-primary/30">
      <Navbar />
      <ScrollToTop />

      {/* Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
        <div className="container relative z-10 text-center">
          <motion.div {...fade}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark mb-6 text-[10px] font-black uppercase tracking-[0.3em] border border-white/10 text-primary">
              <ShieldCheck className="w-3.5 h-3.5" /> Privacy Policy
            </div>
            <h1 className="text-4xl md:text-7xl font-black font-display mb-6 tracking-tighter">
              Your data, <span className="text-gradient">your rules.</span>
            </h1>
            <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              We believe in radical transparency. This page explains exactly what data we collect,
              why, and how it's protected.
            </p>
            <p className="text-white/20 text-xs uppercase tracking-widest mt-6">
              Last updated: May 2025 · Effective immediately
            </p>
          </motion.div>
        </div>
      </section>

      {/* Student Project Notice */}
      <section className="py-6 border-t border-white/5">
        <div className="container max-w-3xl">
          <motion.div {...fade}>
            <div className="flex gap-4 p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
              <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-yellow-400 text-xs font-black uppercase tracking-widest mb-1">
                  Student Project Notice
                </p>
                <p className="text-white/40 text-sm leading-relaxed">
                  MeetMind AI is a student portfolio project built for learning and demonstration
                  purposes. It is not a commercial product. Use of this application is entirely at
                  your own discretion.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Policy Sections */}
      <section className="py-20 border-t border-white/5">
        <div className="container max-w-3xl">
          <div className="space-y-8">
            {sections.map((s, i) => (
              <motion.div
                key={s.title}
                {...fade}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-white/[0.03] border border-white/10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center ${s.bg}`}
                  >
                    <s.icon className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <h2 className="text-xl font-bold font-display">{s.title}</h2>
                </div>
                <ul className="space-y-4">
                  {s.content.map((item, j) => (
                    <li key={j} className="flex gap-3 text-white/50 text-sm leading-relaxed">
                      <div className={`w-1 h-1 rounded-full mt-2 shrink-0 ${s.color} bg-current`} />
                      <span
                        dangerouslySetInnerHTML={{
                          __html: item.replace(
                            /\*\*(.*?)\*\*/g,
                            '<strong class="text-white/80">$1</strong>'
                          ),
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 border-t border-white/5">
        <div className="container max-w-3xl text-center">
          <motion.div {...fade}>
            <p className="text-white/20 text-xs uppercase tracking-[0.3em] mb-4">Questions?</p>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              If you have any questions about this privacy policy or how your data is handled, reach
              out directly.
            </p>
            <a
              href="mailto:hello@example.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 text-white/60 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 text-xs font-bold uppercase tracking-widest"
            >
              hello@example.com
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;
