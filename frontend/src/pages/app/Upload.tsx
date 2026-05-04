import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Upload as UploadIcon, FileAudio, CheckCircle2, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const Upload = () => {
  const [drag, setDrag] = useState(false);
  const [files, setFiles] = useState<
    { name: string; size: string; progress: number; done: boolean }[]
  >([]);
  const { toast } = useToast();

  const addFile = useCallback(
    (name: string) => {
      const file = {
        name,
        size: `${(2 + Math.random() * 80).toFixed(1)} MB`,
        progress: 0,
        done: false,
      };
      setFiles((f) => [file, ...f]);
      let p = 0;
      const intv = setInterval(() => {
        p += 7 + Math.random() * 12;
        setFiles((curr) =>
          curr.map((x) =>
            x.name === name ? { ...x, progress: Math.min(100, p), done: p >= 100 } : x
          )
        );
        if (p >= 100) {
          clearInterval(intv);
          toast({ title: "Intelligence Ready", description: `${name} has been processed.` });
        }
      }, 220);
    },
    [toast]
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
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
          Array.from(e.dataTransfer.files).forEach((f) => addFile(f.name));
        }}
        className={`rounded-[2rem] md:rounded-[2.5rem] border-2 border-dashed transition-all duration-500 ${drag ? "border-emerald bg-emerald/5 scale-[1.01]" : "border-white/10 bg-[#020617]/40 backdrop-blur-xl"} p-8 md:p-16 text-center relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-gradient-brand opacity-5 pointer-events-none" />

        <motion.div
          animate={{
            y: drag ? -10 : 0,
            scale: drag ? 1.05 : 1,
          }}
          className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-brand mx-auto flex items-center justify-center mb-6 shadow-float relative overflow-hidden"
        >
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-white/20 blur-xl"
          />
          <UploadIcon className="w-8 h-8 md:w-10 md:h-10 text-white relative z-10" />
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 text-white/90">
          Import recordings
        </h2>
        <p className="text-white/40 text-sm mb-8 max-w-sm mx-auto font-medium leading-relaxed">
          Upload your audio or video recordings and let our AI transform them into intelligence.
        </p>
        <Button
          onClick={() => addFile(`meeting-${Date.now().toString().slice(-4)}.mp3`)}
          className="rounded-xl md:rounded-full bg-gradient-brand border-0 h-11 md:h-12 px-8 text-sm md:text-base shadow-float hover:scale-105 transition-all"
        >
          CHOOSE FILES
        </Button>
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-12 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
          {["High-Accuracy AI", "Intelligent Context", "Secure Processing"].map((t) => (
            <div key={t} className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-primary/60" /> {t}
            </div>
          ))}
        </div>
      </motion.div>

      {files.length > 0 && (
        <Card className="rounded-[2rem] border-white/5 bg-[#020617]/40 backdrop-blur-xl p-6 md:p-8 shadow-glow-sm">
          <h3 className="font-display font-bold text-lg md:text-xl uppercase tracking-tight text-white/90 mb-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileAudio className="w-4 h-4 text-primary" />
            </div>
            Active Intelligence Flow
          </h3>
          <div className="space-y-4">
            {files.map((f) => (
              <div
                key={f.name}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:shadow-glow transition-all"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-brand text-white flex items-center justify-center shrink-0 shadow-soft">
                    <FileAudio className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-end mb-1">
                      <span className="font-bold text-sm truncate">{f.name}</span>
                      <span className="text-[10px] font-mono text-muted-foreground">{f.size}</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold flex items-center gap-2">
                      {f.done ? (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-emerald flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3" /> AI ANALYSIS IN PROGRESS
                        </motion.span>
                      ) : (
                        `UPLOADING ${Math.round(f.progress)}%`
                      )}
                    </div>
                  </div>
                  {f.done ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-5 h-5 text-primary" />
                    </motion.div>
                  ) : (
                    <button className="text-muted-foreground hover:text-red-500 transition-colors p-2">
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${f.progress}%` }}
                    className={`absolute inset-y-0 left-0 rounded-full ${f.done ? "bg-gradient-brand" : "bg-primary"}`}
                  />
                  {f.done && (
                    <motion.div
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    />
                  )}
                </div>

                {f.done && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 pt-4 border-t border-border/40 grid grid-cols-2 gap-3"
                  >
                    {[
                      "Generating Transcription",
                      "Identifying Speakers",
                      "Summarizing Context",
                      "Extracting Action Items",
                    ].map((step, i) => (
                      <div
                        key={step}
                        className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground"
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${i < 2 ? "bg-emerald" : "bg-muted animate-pulse"}`}
                        />
                        {step.toUpperCase()}
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
export default Upload;
