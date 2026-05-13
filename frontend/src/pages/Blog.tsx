import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Sections";
import { ScrollToTop } from "@/components/landing/ScrollToTop";
import { BookOpen, Rss, ArrowRight, Tag, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

const posts = [
  {
    slug: "#",
    tag: "Engineering",
    tagColor: "text-primary bg-primary/10 border-primary/20",
    title: "How I Built a Real-Time Meeting Transcription Engine with Whisper",
    excerpt:
      "A deep dive into integrating OpenAI's Whisper model into a FastAPI backend, handling large audio files efficiently, and streaming results to the frontend.",
    date: "May 2025",
    readTime: "8 min read",
    featured: true,
  },
  {
    slug: "#",
    tag: "AI",
    tagColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    title: "Building Context-Aware RAG with Meeting Transcripts",
    excerpt:
      "Exploring Retrieval-Augmented Generation for semantic search over unstructured meeting data — and why naive keyword search fails miserably.",
    date: "April 2025",
    readTime: "6 min read",
    featured: false,
  },
  {
    slug: "#",
    tag: "Frontend",
    tagColor: "text-pink-400 bg-pink-500/10 border-pink-500/20",
    title: "Framer Motion Patterns I Wish I Knew Earlier",
    excerpt:
      "Performance-optimized animation patterns for React — from scroll-driven reveals to glassmorphism transitions without killing your GPU.",
    date: "March 2025",
    readTime: "5 min read",
    featured: false,
  },
  {
    slug: "#",
    tag: "Backend",
    tagColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    title: "FastAPI + SQLAlchemy: A Clean Architecture for Student Projects",
    excerpt:
      "How to structure a Python backend that scales beyond tutorial complexity — repository pattern, dependency injection, and async everything.",
    date: "February 2025",
    readTime: "7 min read",
    featured: false,
  },
  {
    slug: "#",
    tag: "Design",
    tagColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    title: "Dark Mode Design System from Scratch — No Tailwind Plugins",
    excerpt:
      "Building a cohesive dark-first design system with CSS variables, glassmorphism, and consistent spacing — without relying on third-party kits.",
    date: "January 2025",
    readTime: "4 min read",
    featured: false,
  },
  {
    slug: "#",
    tag: "Learnings",
    tagColor: "text-violet-400 bg-violet-500/10 border-violet-500/20",
    title: "What Building a Full-Stack AI App Taught Me About Software Engineering",
    excerpt:
      "The honest lessons from shipping MeetMind AI — mistakes made, patterns discovered, and why shipping imperfect code is better than not shipping.",
    date: "December 2024",
    readTime: "10 min read",
    featured: false,
  },
];

const Blog = () => {
  const [featured, ...rest] = posts;

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
              <Rss className="w-3.5 h-3.5" /> Dev Blog
            </div>
            <h1 className="text-4xl md:text-7xl font-black font-display mb-6 tracking-tighter">
              Thoughts on <span className="text-gradient">building things.</span>
            </h1>
            <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Writing about AI, full-stack engineering, design systems, and the real lessons from
              shipping MeetMind AI as a student project.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-10 border-t border-white/5">
        <div className="container max-w-5xl">
          <motion.div {...fade}>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-6 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" /> Featured Post
            </p>
            <Link
              to={featured.slug}
              className="group block p-8 md:p-12 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1"
            >
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest mb-6 ${featured.tagColor}`}
              >
                <Tag className="w-2.5 h-2.5" /> {featured.tag}
              </div>
              <h2 className="text-2xl md:text-4xl font-bold font-display mb-4 tracking-tight group-hover:text-primary transition-colors duration-300">
                {featured.title}
              </h2>
              <p className="text-white/40 text-base leading-relaxed mb-8 max-w-2xl">{featured.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-[10px] text-white/30 font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" /> {featured.readTime}
                  </span>
                  <span>{featured.date}</span>
                </div>
                <div className="flex items-center gap-1 text-primary text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  Read More <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16 border-t border-white/5">
        <div className="container max-w-5xl">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-8">
            All Articles
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {rest.map((post, i) => (
              <motion.div
                key={post.title}
                {...fade}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <Link
                  to={post.slug}
                  className="group flex flex-col h-full p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-primary/20 hover:-translate-y-1 transition-all duration-400"
                >
                  <div
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest mb-4 self-start ${post.tagColor}`}
                  >
                    <Tag className="w-2.5 h-2.5" /> {post.tag}
                  </div>
                  <h3 className="text-base font-bold mb-3 leading-snug group-hover:text-primary transition-colors duration-300 flex-1">
                    {post.title}
                  </h3>
                  <p className="text-white/30 text-xs leading-relaxed mb-5">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-[9px] text-white/20 font-bold uppercase tracking-widest mt-auto">
                    <span className="flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" /> {post.readTime}
                    </span>
                    <span>{post.date}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon notice */}
      <section className="py-16 border-t border-white/5">
        <div className="container max-w-2xl text-center">
          <motion.div {...fade}>
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5">
              <p className="text-white/20 text-xs font-bold uppercase tracking-[0.3em] mb-3">Status</p>
              <p className="text-white/40 text-sm leading-relaxed">
                Full blog posts are coming soon. These are planned articles — if you'd like to be
                notified when they're published, reach out via the{" "}
                <Link to="/about" className="text-primary hover:underline">
                  About
                </Link>{" "}
                page.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
