import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Copy, Eye, Plus } from "lucide-react";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

const Settings = () => {
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await updateProfile(name, email);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl pb-20">
      <Tabs defaultValue="profile" className="space-y-6 md:space-y-8">
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          <TabsList className="bg-white/5 border border-white/5 rounded-2xl p-1 h-12 md:h-14 w-max md:w-auto">
            {["profile", "notifications"].map((t) => (
              <TabsTrigger
                key={t}
                value={t}
                className="rounded-xl px-4 md:px-6 py-2 md:py-3 text-[10px] md:text-xs font-black uppercase tracking-widest transition-all data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-glow"
              >
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="profile" className="focus-visible:outline-none">
          <Card className="p-6 md:p-8 rounded-[2rem] bg-[#020617]/40 backdrop-blur-xl border-white/5 shadow-glow-sm">
            <h3 className="text-xl font-display font-bold mb-1 text-white/90 uppercase tracking-tight">
              Personal Information
            </h3>
            <p className="text-xs text-white/30 font-medium mb-8">
              Manage your personal details and account preferences.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 mb-10">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] bg-gradient-brand text-white text-3xl font-black flex items-center justify-center shadow-float border-2 border-white/10">
                {user ? getInitials(user.name) : "??"}
              </div>
              <div className="flex flex-col items-center sm:items-start gap-3">
                <Button
                  variant="outline"
                  className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10 transition-all text-[10px] font-black uppercase tracking-widest px-6"
                >
                  Change Avatar
                </Button>
                <p className="text-[10px] text-white/20 font-bold uppercase tracking-tighter">
                  Vector or Raster · 2MB Max Load
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">
                  Full Name
                </Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 rounded-xl bg-white/[0.03] border-white/5 focus:border-primary/40 focus:ring-primary/20 text-sm font-medium text-white/80 transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">
                  Email Address
                </Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl bg-white/[0.03] border-white/5 focus:border-primary/40 focus:ring-primary/20 text-sm font-medium text-white/80 transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">
                  Job Title
                </Label>
                <Input
                  defaultValue="VP Product"
                  className="h-12 rounded-xl bg-white/[0.03] border-white/5 focus:border-primary/40 focus:ring-primary/20 text-sm font-medium text-white/80 transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">
                  Time Zone
                </Label>
                <Input
                  defaultValue="GMT-7 (PST)"
                  className="h-12 rounded-xl bg-white/[0.03] border-white/5 focus:border-primary/40 focus:ring-primary/20 text-sm font-medium text-white/80 transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-10">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="rounded-xl md:rounded-2xl h-12 px-8 bg-gradient-brand border-0 shadow-emerald hover:scale-[1.02] transition-transform text-xs font-black uppercase tracking-widest"
              >
                {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                {saveSuccess ? "SAVED!" : "COMMIT CHANGES"}
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  if (user) {
                    setName(user.name);
                    setEmail(user.email);
                  }
                }}
                className="rounded-xl md:rounded-2xl h-12 px-8 text-white/30 hover:text-white/60 text-xs font-black uppercase tracking-widest"
              >
                CANCEL
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="focus-visible:outline-none">
          <Card className="p-6 md:p-8 rounded-[2rem] bg-[#020617]/40 backdrop-blur-xl border-white/5 shadow-glow-sm">
            <h3 className="text-xl font-display font-bold mb-8 text-white/90 uppercase tracking-tight">
              Notifications
            </h3>
            <div className="space-y-2">
              {[
                ["Meeting Summaries", "Get notified when meeting summaries are ready"],
                ["Action Items", "Alerts when tasks are assigned to you"],
                ["Weekly Digest", "Receive a summary of your weekly meetings"],
                ["Product Updates", "Stay informed about new features"],
              ].map(([t, d], i) => (
                <div
                  key={t}
                  className="flex items-center justify-between py-5 border-b border-white/5 last:border-0"
                >
                  <div className="max-w-[70%]">
                    <div className="font-bold text-sm text-white/80 uppercase tracking-tight">
                      {t}
                    </div>
                    <div className="text-[10px] md:text-xs text-white/30 font-medium leading-relaxed mt-1">
                      {d}
                    </div>
                  </div>
                  <Switch defaultChecked={i < 3} className="data-[state=checked]:bg-emerald" />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Settings;
