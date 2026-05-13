import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  Upload as UploadIcon,
  FileText,
  CheckCircle2,
  Loader2,
  Sparkles,
  Plus,
  X,
  MousePointer2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useUploadMeeting } from "@/hooks/useMeetings";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [drag, setDrag] = useState(false);
  const [title, setTitle] = useState("");
  const [transcript, setTranscript] = useState("");
  const [participantInput, setParticipantInput] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();
  const navigate = useNavigate();
  const { mutate: uploadMeeting, isPending, isSuccess } = useUploadMeeting();

  const addParticipant = useCallback(() => {
    const val = participantInput.trim();
    if (val && !participants.includes(val)) {
      setParticipants((p) => [...p, val]);
      setParticipantInput("");
    }
  }, [participantInput, participants]);

  const addTag = useCallback(() => {
    const val = tagInput.trim().toLowerCase();
    if (val && !tags.includes(val)) {
      setTags((t) => [...t, val]);
      setTagInput("");
    }
  }, [tagInput, tags]);

  const handleFile = (file: File) => {
    const isText = file.type === "text/plain" || file.name.toLowerCase().endsWith(".txt");

    if (isText) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const content = ev.target?.result as string;
        if (content.length < 10) {
          toast({
            title: "File Too Short",
            description: "Transcript must be at least 10 characters long.",
            variant: "destructive",
          });
          return;
        }
        setTranscript(content);
        if (
          !title ||
          title.toLowerCase().includes("sync") ||
          title.toLowerCase().includes("meeting")
        ) {
          setTitle(file.name.replace(/\.[^/.]+$/, ""));
        }
        toast({ title: "File Ready", description: `${file.name} loaded successfully.` });
      };
      reader.readAsText(file);
    } else {
      toast({
        title: "Unsupported File",
        description: "Please upload a .txt transcript file.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = () => {
    if (!title.trim() || !transcript.trim()) {
      toast({
        title: "Missing Fields",
        description: "Title and transcript are required.",
        variant: "destructive",
      });
      return;
    }
    uploadMeeting(
      { title: title.trim(), transcript: transcript.trim(), participants, tags },
      {
        onSuccess: (data) => {
          toast({
            title: "Meeting Uploaded!",
            description: "AI is now processing your transcript.",
          });
          navigate(`/dashboard/meetings/${data.id}`);
        },
        onError: (err: Error) => {
          toast({ title: "Upload Failed", description: err.message, variant: "destructive" });
        },
      }
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".txt,text/plain"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          const file = e.dataTransfer.files[0];
          if (file) handleFile(file);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`rounded-[2rem] border-2 border-dashed transition-all duration-500 cursor-pointer group relative overflow-hidden ${
          drag
            ? "border-emerald bg-emerald/5 scale-[1.01]"
            : "border-white/10 bg-[#020617]/40 backdrop-blur-xl hover:border-primary/40 hover:bg-primary/5"
        } p-8 md:p-12 text-center`}
      >
        <div className="absolute inset-0 bg-gradient-brand opacity-5 pointer-events-none" />

        <motion.div
          animate={{ y: drag ? -10 : 0, scale: drag ? 1.05 : 1 }}
          className="w-20 h-20 rounded-3xl bg-gradient-brand mx-auto flex items-center justify-center mb-6 shadow-float group-hover:shadow-glow-primary transition-shadow"
        >
          <UploadIcon className="w-10 h-10 text-white" />
        </motion.div>

        <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 text-white/90">
          Import Meeting Transcript
        </h2>

        <div className="flex flex-col items-center gap-2 mb-4">
          <p className="text-white/40 text-sm max-w-sm mx-auto font-medium leading-relaxed">
            Drag & drop a <span className="text-primary/60">.txt</span> transcript file, or click to
            browse.
          </p>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/30 group-hover:text-primary/60 transition-colors">
            <MousePointer2 className="w-3 h-3" /> Click anywhere to select
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-6 text-[9px] font-black uppercase tracking-[0.2em] text-white/30">
          {["AI Summarization", "Action Items", "RAG Chat"].map((t) => (
            <div key={t} className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-primary/60" /> {t}
            </div>
          ))}
        </div>
      </motion.div>

      <Card className="rounded-[2rem] border-white/5 bg-[#020617]/40 backdrop-blur-xl p-6 md:p-8 shadow-glow-sm space-y-5">
        <h3 className="font-display font-bold text-lg uppercase tracking-tight text-white/90 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
            <FileText className="w-4 h-4 text-primary" />
          </div>
          Meeting Details
        </h3>

        {/* Title */}
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2 block">
            Title *
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Q4 Strategy Sync"
            className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 placeholder:text-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Transcript */}
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2 block">
            Transcript *
          </label>
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Paste your meeting transcript here..."
            rows={8}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/80 placeholder:text-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
          />
        </div>

        {/* Participants */}
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2 block">
            Participants
          </label>
          <div className="flex gap-2 mb-2">
            <input
              value={participantInput}
              onChange={(e) => setParticipantInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addParticipant())}
              placeholder="Add participant name..."
              className="flex-1 h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 placeholder:text-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Button
              onClick={addParticipant}
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-xl border-white/10 bg-white/5"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {participants.map((p) => (
              <span
                key={p}
                className="flex items-center gap-1.5 text-[10px] font-bold px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary uppercase"
              >
                {p}{" "}
                <button onClick={() => setParticipants((arr) => arr.filter((x) => x !== p))}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2 block">
            Tags
          </label>
          <div className="flex gap-2 mb-2">
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              placeholder="Add tag (e.g. strategy, engineering)..."
              className="flex-1 h-10 px-4 rounded-xl bg-white/5 border border-white/10 text-white/80 placeholder:text-white/20 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Button
              onClick={addTag}
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-xl border-white/10 bg-white/5"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="flex items-center gap-1.5 text-[10px] font-bold px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/40 uppercase"
              >
                {t}{" "}
                <button onClick={() => setTags((arr) => arr.filter((x) => x !== t))}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isPending || isSuccess}
          className="w-full h-12 rounded-xl bg-gradient-brand border-0 shadow-float hover:scale-[1.02] transition-all font-bold uppercase tracking-widest text-sm"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading & Processing...
            </>
          ) : isSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 mr-2" /> Uploaded!
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" /> Upload & Analyse with AI
            </>
          )}
        </Button>
      </Card>
    </div>
  );
};

export default Upload;
