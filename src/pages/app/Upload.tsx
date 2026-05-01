import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Upload as UploadIcon, FileAudio, CheckCircle2, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const Upload = () => {
  const [drag, setDrag] = useState(false);
  const [files, setFiles] = useState<{ name: string; size: string; progress: number; done: boolean }[]>([]);
  const { toast } = useToast();

  const addFile = useCallback((name: string) => {
    const file = { name, size: `${(2 + Math.random() * 80).toFixed(1)} MB`, progress: 0, done: false };
    setFiles(f => [file, ...f]);
    let p = 0;
    const intv = setInterval(() => {
      p += 7 + Math.random() * 12;
      setFiles(curr => curr.map(x => x.name === name ? { ...x, progress: Math.min(100, p), done: p >= 100 } : x));
      if (p >= 100) {
        clearInterval(intv);
        toast({ title: "Upload complete", description: `${name} is being processed by AI.` });
      }
    }, 220);
  }, [toast]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); Array.from(e.dataTransfer.files).forEach(f => addFile(f.name)); }}
        className={`rounded-3xl border-2 border-dashed transition-all ${drag ? "border-emerald bg-emerald/5 scale-[1.01]" : "border-primary/40 bg-gradient-card"} p-16 text-center`}
      >
        <motion.div animate={{ y: drag ? -6 : 0 }} className="w-20 h-20 rounded-3xl bg-gradient-brand mx-auto flex items-center justify-center mb-5 shadow-float">
          <UploadIcon className="w-9 h-9 text-white" />
        </motion.div>
        <h2 className="text-2xl font-display font-bold mb-2">Drop your meeting file here</h2>
        <p className="text-muted-foreground mb-6">Supports MP3, WAV, MP4 · up to 2GB · auto language detect</p>
        <Button onClick={() => addFile(`meeting-${Date.now()}.mp3`)} className="rounded-full bg-gradient-brand border-0 h-11 px-6">Choose file</Button>
        <div className="flex justify-center gap-6 mt-8 text-xs text-muted-foreground">
          {[".mp3", ".wav", ".mp4"].map(t => <span key={t} className="px-3 py-1 rounded-full bg-muted/60 font-mono font-semibold">{t}</span>)}
        </div>
      </motion.div>

      {files.length > 0 && (
        <Card className="rounded-3xl border-border/60 bg-gradient-card p-6">
          <h3 className="font-display font-bold mb-4">Uploads</h3>
          <div className="space-y-3">
            {files.map(f => (
              <div key={f.name} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-border/60">
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <FileAudio className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between mb-1.5">
                    <span className="font-semibold text-sm truncate">{f.name}</span>
                    <span className="text-xs text-muted-foreground">{f.size}</span>
                  </div>
                  <Progress value={f.progress} className="h-1.5" />
                  <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground">
                    {f.done ? (
                      <><Sparkles className="w-3 h-3 text-emerald" /> AI processing · transcribing audio</>
                    ) : (
                      <>Uploading · {Math.round(f.progress)}%</>
                    )}
                  </div>
                </div>
                {f.done ? <CheckCircle2 className="w-5 h-5 text-emerald" /> : <button className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
export default Upload;
