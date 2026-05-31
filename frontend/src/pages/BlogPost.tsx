import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Sections";
import { ScrollToTop } from "@/components/landing/ScrollToTop";
import { ArrowLeft, Clock, Tag, Calendar, User, Share2 } from "lucide-react";

const fade = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

interface BlogPostContent {
  title: string;
  tag: string;
  readTime: string;
  author: string;
  content: string;
}

const blogContent: Record<string, BlogPostContent> = {
  "meeting-transcription-whisper": {
    title: "How I Built a Real-Time Meeting Transcription Engine with Whisper",
    tag: "Engineering",
    readTime: "8 min read",
    author: "Student Developer",
    content: `
      <p>Building a reliable transcription engine is one of the most challenging parts of creating a meeting assistant. For MeetMind AI, I chose OpenAI's <strong>Whisper</strong> model due to its incredible accuracy across different accents and technical terminologies.</p>

      <h2>The Architecture</h2>
      <p>The system is split into three main components: the React frontend, a FastAPI gateway, and a dedicated worker service for audio processing. When a user uploads a recording, the following flow occurs:</p>
      <ul>
        <li>Frontend chunks the file and uploads it via a signed URL to secure storage.</li>
        <li>FastAPI triggers a background task using Celery.</li>
        <li>The transcription worker pulls the file, processes it using <code>faster-whisper</code>, and saves the segments to the database.</li>
      </ul>

      <h2>Overcoming Latency</h2>
      <p>Initial tests with the base Whisper model were slow. By switching to the C++ implementation (faster-whisper) and utilizing GPU acceleration on the backend, I reduced processing time from 4x the audio length to roughly 0.2x. This means a 60-minute meeting is transcribed in about 12 minutes.</p>

      <h2>Lessons Learned</h2>
      <p>Audio normalization is key. Before sending audio to the model, I implemented a preprocessing step using <code>pydub</code> to normalize volume levels and remove silence, which improved word error rates (WER) by nearly 15%.</p>
    `,
  },
  "rag-meeting-transcripts": {
    title: "Building Context-Aware RAG with Meeting Transcripts",
    tag: "AI",
    readTime: "2 min read",
    author: "Student Developer",
    content: `
      <p>Transcription is only the first step. The real value lies in being able to ask questions about your meetings. This is where Retrieval-Augmented Generation (RAG) comes in.</p>

      <h2>Why Keyword Search Fails</h2>
      <p>Meeting speech is messy. People use synonyms, partial phrases, and fillers. If you search for "budget," you might miss a discussion about "quarterly spending." Vector embeddings allow us to search for the <em>meaning</em> rather than the specific letters.</p>

      <h2>The Implementation</h2>
      <p>For this project, I used <strong>Pinecone</strong> as the vector database and <strong>OpenAI's text-embedding-3-small</strong> for generating vectors. The process involves:</p>
      <ol>
        <li>Splitting transcripts into overlapping chunks (500 tokens).</li>
        <li>Generating embeddings for each chunk.</li>
        <li>Storing them with metadata (meeting ID, timestamp).</li>
        <li>At query time, embedding the question and finding the top 3 relevant chunks.</li>
      </ol>

      <h2>The Result</h2>
      <p>Users can now ask complex questions like "What was the final decision on the marketing strategy?" and get a direct answer cited from the specific minute of the meeting.</p>
    `,
  },
  "framer-motion-patterns": {
    title: "Framer Motion Patterns I Wish I Knew Earlier",
    tag: "Frontend",
    readTime: "2 min read",
    author: "Student Developer",
    content: `
      <p>Animations can make or break a modern web app. In MeetMind AI, I used Framer Motion to create a premium, "living" interface. Here are the three patterns that had the biggest impact.</p>

      <h2>1. The Staggered Reveal</h2>
      <p>Instead of showing everything at once, use <code>staggerChildren</code>. This creates a natural flow that guides the eye from top to bottom. It's used in the pricing section and the meeting list.</p>

      <h2>2. Viewport-Aware Triggers</h2>
      <p>Don't run animations that the user can't see. Using <code>whileInView</code> with <code>viewport={{ once: true }}</code> ensures the site feels snappy and saves CPU cycles for background tasks.</p>

      <h2>3. The Glassmorphism Transition</h2>
      <p>Animating <code>backdrop-filter</code> is expensive. To keep it smooth at 60fps, I animate the opacity of a background layer instead of the blur value itself. This maintains the "premium" feel without the performance hit.</p>
    `,
  },
  "fastapi-clean-architecture": {
    title: "FastAPI + SQLAlchemy: A Clean Architecture for Student Projects",
    tag: "Backend",
    readTime: "2 min read",
    author: "Student Developer",
    content: `
      <p>Many student projects start as a single <code>main.py</code> file. This article explains how I structured the MeetMind AI backend to remain maintainable as it grew to 20+ endpoints.</p>

      <h2>Separation of Concerns</h2>
      <p>I followed a simplified version of the Repository Pattern:</p>
      <ul>
        <li><strong>Schemas (Pydantic)</strong>: For data validation and serialization.</li>
        <li><strong>Models (SQLAlchemy)</strong>: For database structure.</li>
        <li><strong>Repositories</strong>: For actual database queries.</li>
        <li><strong>Services</strong>: For business logic (e.g., calling OpenAI API).</li>
        <li><strong>Routes</strong>: To handle HTTP requests and dependencies.</li>
      </ul>

      <h2>Why This Matters</h2>
      <p>By keeping logic out of the route handlers, I could easily write unit tests for the core features without needing to mock complex HTTP request objects. It also made it trivial to switch from one AI provider to another during development.</p>
    `,
  },
  "dark-mode-design-system": {
    title: "Dark Mode Design System from Scratch — No Tailwind Plugins",
    tag: "Design",
    readTime: "2 min read",
    author: "Student Developer",
    content: `
      <p>While many developers reach for Tailwind plugins or external component libraries, I wanted to understand the fundamentals of a truly dark-first design system for this portfolio project.</p>

      <h2>The Color Palette</h2>
      <p>Pure black (#000000) often looks "dead" on modern OLED screens. I used a deep navy-tinted black (<code>#020617</code>) as the base. For the accents, I chose a vibrant primary blue and a cyan-to-emerald gradient to give the UI a "digital neon" feel without being overwhelming.</p>

      <h2>Glassmorphism & Depth</h2>
      <p>In a dark UI, depth is created through subtle borders and translucency rather than heavy shadows. Each card in MeetMind AI uses a 3% white background with a 10% white border and a <code>backdrop-blur-xl</code> filter. This makes the UI feel like layers of glass floating over the background.</p>

      <h2>Consistency is Key</h2>
      <p>I defined a set of semantic CSS variables for background, foreground, border, and primary colors. This ensured that every component—from the navbar to the settings dashboard—felt like part of the same cohesive world.</p>
    `,
  },
  "learnings-software-engineering": {
    title: "What Building a Full-Stack AI App Taught Me About Software Engineering",
    tag: "Learnings",
    readTime: "2 min read",
    author: "Student Developer",
    content: `
      <p>MeetMind AI started as a simple transcription script. Converting it into a full-stack SaaS-style application was a journey that taught me more than any classroom project ever could.</p>

      <h2>Perfect is the Enemy of Shipped</h2>
      <p>I spent two weeks trying to make the transcription "perfect" before I even had a login page. I eventually realized that a working app with 90% accuracy is more valuable for feedback than a broken script with 99% accuracy. Shipping early allowed me to identify the <em>real</em> bottlenecks.</p>

      <h2>The Importance of Observability</h2>
      <p>When the backend failed during an audio upload, I initially had no idea why. Implementing structured logging and simple health checks saved me hours of debugging time later on. If you can't see what's happening inside your code, you can't fix it.</p>

      <h2>System Design Over Syntax</h2>
      <p>I realized that while knowing the latest React hooks or Python syntax is helpful, understanding how data flows between services is what truly matters. Building the real-time websocket connection for the voice wave visualizer taught me more about concurrency and state management than any tutorial.</p>
    `,
  },
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogContent[slug || ""] || blogContent["meeting-transcription-whisper"];

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-primary/30">
      <Navbar />
      <ScrollToTop />

      <main className="pt-32 pb-20">
        <div className="container max-w-4xl">
          {/* Back button */}
          <motion.div {...fade} className="mb-12">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-white/40 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div {...fade} transition={{ delay: 0.1, ...fade.transition }} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                {post.tag}
              </span>
              <span className="text-white/20 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Clock className="w-3 h-3" /> {post.readTime}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black font-display mb-8 tracking-tighter leading-[1.1]">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 border-y border-white/5 py-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-cyan-500/20 border border-white/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary/60" />
                </div>
                <div>
                  <p className="text-white/80 text-xs font-bold">{post.author}</p>
                  <p className="text-white/30 text-[10px] uppercase tracking-widest">
                    Lead Developer
                  </p>
                </div>
              </div>

              <div className="h-8 w-px bg-white/5 hidden sm:block" />

              <div className="flex items-center gap-4"></div>

              <div className="ml-auto flex items-center gap-2">
                <button className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary/20 transition-all duration-300">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            {...fade}
            transition={{ delay: 0.2, ...fade.transition }}
            className="prose prose-invert prose-primary max-w-none 
              prose-h2:text-2xl prose-h2:font-black prose-h2:font-display prose-h2:tracking-tight prose-h2:mt-12 prose-h2:mb-6
              prose-p:text-white/50 prose-p:text-lg prose-p:leading-relaxed prose-p:mb-6
              prose-strong:text-white/90 prose-strong:font-bold
              prose-ul:list-disc prose-ul:pl-6 prose-ul:text-white/50 prose-ul:space-y-3 prose-ul:mb-8
              prose-li:text-white/50
              prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm
              prose-ol:list-decimal prose-ol:pl-6 prose-ol:text-white/50 prose-ol:space-y-3 prose-ol:mb-8
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Student Portfolio Footer */}
          <motion.div
            {...fade}
            transition={{ delay: 0.3, ...fade.transition }}
            className="mt-24 p-8 rounded-3xl glass-dark border border-white/10 text-center"
          >
            <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
              Project Note
            </p>
            <p className="text-white/40 text-sm leading-relaxed max-w-xl mx-auto mb-8">
              This article was written to document the technical decisions made during the
              development of
              <strong> MeetMind AI</strong>. This is a student project intended to showcase system
              design and full-stack engineering skills.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 text-[10px] font-black uppercase tracking-[0.2em]"
            >
              View Developer Portfolio
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
