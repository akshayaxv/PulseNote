import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Sections";
import { ScrollToTop } from "@/components/landing/ScrollToTop";
import { FileText, AlertCircle, CheckCircle, XCircle } from "lucide-react";

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const allowed = [
  "Use MeetMind AI for personal, educational, or portfolio demonstration purposes.",
  "Upload meeting recordings or transcripts that you own or have permission to share.",
  "Share screenshots or recordings of the product for portfolio or showcase purposes.",
  "Provide feedback, suggestions, or bug reports to help improve the project.",
];

const notAllowed = [
  "Use the platform for any commercial purpose or charge others for access.",
  "Attempt to reverse-engineer, scrape, or extract proprietary systems or algorithms.",
  "Upload content that you do not own or do not have permission to process.",
  "Use the service to process sensitive personal data of others without their consent.",
];

const clauses = [
  {
    title: "No Warranty",
    content:
      "MeetMind AI is provided 'as is' without warranty of any kind. As a student project, it may contain bugs, have downtime, or be discontinued at any time without notice. Use at your own risk.",
  },
  {
    title: "Intellectual Property",
    content:
      "The codebase, design, and architecture of MeetMind AI are the intellectual property of the developer. AI-generated outputs (summaries, transcriptions) from your uploaded content belong to you.",
  },
  {
    title: "Limitation of Liability",
    content:
      "The developer is not liable for any data loss, errors in AI outputs, or issues arising from the use of this application. This is a learning project and should not be used for mission-critical or legally sensitive tasks.",
  },
  {
    title: "Third-Party Services",
    content:
      "This application uses third-party services including OpenAI and Supabase. Use of MeetMind AI implies acceptance of those services' own terms and privacy policies.",
  },
  {
    title: "Modifications to Terms",
    content:
      "These terms may be updated at any time. Continued use of the application after changes constitutes acceptance of the revised terms. The last-updated date will always be displayed.",
  },
];

const Terms = () => {
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
              <FileText className="w-3.5 h-3.5" /> Terms of Service
            </div>
            <h1 className="text-4xl md:text-7xl font-black font-display mb-6 tracking-tighter">
              Simple, <span className="text-gradient">honest</span> terms.
            </h1>
            <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              No legalese. Just a clear explanation of what you can do, what we ask you not to do,
              and the realities of using a student-built application.
            </p>
            <p className="text-white/20 text-xs uppercase tracking-widest mt-6">
              Last updated: May 2025 · Applies to all users
            </p>
          </motion.div>
        </div>
      </section>

      {/* Student Project Notice */}
      <section className="py-6 border-t border-white/5">
        <div className="container max-w-3xl">
          <motion.div {...fade}>
            <div className="flex gap-4 p-5 rounded-2xl bg-primary/5 border border-primary/20">
              <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-primary text-xs font-black uppercase tracking-widest mb-1">Student Portfolio Project</p>
                <p className="text-white/40 text-sm leading-relaxed">
                  This is a portfolio project built as part of a computer science program. It is
                  not a commercial product. By using this application, you acknowledge that it is
                  provided for educational and demonstration purposes only.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Allowed / Not Allowed */}
      <section className="py-20 border-t border-white/5">
        <div className="container max-w-3xl">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Allowed */}
            <motion.div {...fade} className="p-8 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <CheckCircle className="w-4.5 h-4.5 text-emerald-400" />
                </div>
                <h2 className="text-lg font-bold text-emerald-400">What's Allowed</h2>
              </div>
              <ul className="space-y-4">
                {allowed.map((item, i) => (
                  <li key={i} className="flex gap-3 text-white/50 text-sm leading-relaxed">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Not Allowed */}
            <motion.div {...fade} transition={{ duration: 0.7, delay: 0.1 }} className="p-8 rounded-2xl bg-red-500/5 border border-red-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <XCircle className="w-4.5 h-4.5 text-red-400" />
                </div>
                <h2 className="text-lg font-bold text-red-400">What's Not Allowed</h2>
              </div>
              <ul className="space-y-4">
                {notAllowed.map((item, i) => (
                  <li key={i} className="flex gap-3 text-white/50 text-sm leading-relaxed">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Legal Clauses */}
      <section className="py-10 border-t border-white/5">
        <div className="container max-w-3xl">
          <motion.div {...fade} className="mb-8">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Full Terms</p>
          </motion.div>
          <div className="space-y-5">
            {clauses.map((clause, i) => (
              <motion.div
                key={clause.title}
                {...fade}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"
              >
                <h3 className="text-sm font-black uppercase tracking-widest text-white/60 mb-3">
                  {String(i + 1).padStart(2, "0")} — {clause.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">{clause.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer notice */}
      <section className="py-16 border-t border-white/5">
        <div className="container max-w-3xl text-center">
          <motion.div {...fade}>
            <p className="text-white/20 text-xs leading-relaxed max-w-lg mx-auto">
              By using MeetMind AI you agree to these terms. Questions? Reach out at{" "}
              <a href="mailto:hello@example.com" className="text-primary hover:underline">
                hello@example.com
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;
