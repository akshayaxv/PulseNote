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
          {["profile", "workspace", "billing", "notifications", "api"].map((t) => (
            <TabsTrigger
              key={t}
              value={t}
              className="rounded-xl px-4 md:px-6 py-2 md:py-3 text-[10px] md:text-xs font-black uppercase tracking-widest transition-all data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-glow"
            >
              {t === "api" ? "API Integration" : t}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <TabsContent value="profile" className="focus-visible:outline-none">
        <Card className="p-6 md:p-8 rounded-[2rem] bg-[#020617]/40 backdrop-blur-xl border-white/5 shadow-glow-sm">
          <h3 className="text-xl font-display font-bold mb-1 text-white/90 uppercase tracking-tight">
            Personal Core
          </h3>
          <p className="text-xs text-white/30 font-medium mb-8">
            Manage your identity and regional synchronization.
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
                Change Signature
              </Button>
              <p className="text-[10px] text-white/20 font-bold uppercase tracking-tighter">
                Vector or Raster · 2MB Max Load
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">
                Full Identifier
              </Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 rounded-xl bg-white/[0.03] border-white/5 focus:border-primary/40 focus:ring-primary/20 text-sm font-medium text-white/80 transition-all"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">
                Neural Email
              </Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl bg-white/[0.03] border-white/5 focus:border-primary/40 focus:ring-primary/20 text-sm font-medium text-white/80 transition-all"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">
                Functional Role
              </Label>
              <Input
                defaultValue="VP Product"
                className="h-12 rounded-xl bg-white/[0.03] border-white/5 focus:border-primary/40 focus:ring-primary/20 text-sm font-medium text-white/80 transition-all"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">
                Temporal Zone
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

      <TabsContent value="workspace" className="focus-visible:outline-none">
        <Card className="p-6 md:p-8 rounded-[2rem] bg-[#020617]/40 backdrop-blur-xl border-white/5 shadow-glow-sm">
          <h3 className="text-xl font-display font-bold mb-6 text-white/90 uppercase tracking-tight">
            Workspace Vector
          </h3>
          <div className="space-y-6">
            {[
              { l: "Entity Name", d: "Northwind" },
              { l: "Linguistic Default", d: "English (US)" },
              { l: "Temporal Retention", d: "12 Months" },
            ].map((f) => (
              <div key={f.l} className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 ml-1">
                  {f.l}
                </Label>
                <Input
                  defaultValue={f.d}
                  className="h-12 rounded-xl bg-white/[0.03] border-white/5 focus:border-primary/40 focus:ring-primary/20 text-sm font-medium text-white/80"
                />
              </div>
            ))}
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="billing" className="focus-visible:outline-none">
        <Card className="p-6 md:p-8 rounded-[2rem] bg-[#020617]/40 backdrop-blur-xl border-white/5 shadow-glow-sm">
          <h3 className="text-xl font-display font-bold mb-1 text-white/90 uppercase tracking-tight">
            Credit Ledger
          </h3>
          <p className="text-xs text-white/30 font-medium mb-8">
            Current Tier:{" "}
            <span className="font-black text-emerald uppercase tracking-widest">PRO STATUS</span>
          </p>

          <div className="rounded-2xl bg-gradient-brand p-6 md:p-8 mb-10 shadow-float relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity" />
            <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
              <div>
                <div className="text-[10px] text-white/60 font-black uppercase tracking-[0.2em] mb-2">
                  Next Ledger Cycle
                </div>
                <div className="text-4xl md:text-5xl font-display font-black text-white">
                  $29.00
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-white/60 font-black uppercase tracking-[0.2em] mb-3">
                  DUE MAY 28, 2026
                </div>
                <Button className="rounded-xl bg-white text-primary hover:bg-white/90 border-0 text-[10px] font-black uppercase tracking-widest shadow-soft">
                  SCALE TO ENTERPRISE
                </Button>
              </div>
            </div>
          </div>

          <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-4 ml-1">
            Active Payment Method
          </h4>
          <div className="flex flex-col sm:flex-row items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/10 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 border border-white/10 shadow-soft" />
              <div>
                <div className="text-sm font-bold text-white/80">VISA •••• 4242</div>
                <div className="text-[10px] font-bold text-white/20 uppercase">EXP 12/27</div>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full sm:w-auto rounded-xl border-white/10 text-[10px] font-black uppercase tracking-widest px-6"
            >
              UPDATE
            </Button>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="notifications" className="focus-visible:outline-none">
        <Card className="p-6 md:p-8 rounded-[2rem] bg-[#020617]/40 backdrop-blur-xl border-white/5 shadow-glow-sm">
          <h3 className="text-xl font-display font-bold mb-8 text-white/90 uppercase tracking-tight">
            Signal Matrix
          </h3>
          <div className="space-y-2">
            {[
              ["Synthesis Alerts", "Triggered when AI completes processing"],
              ["Neural Action Items", "Notifications for assigned tasks"],
              ["Weekly Intelligence", "Summary of weekly team knowledge"],
              ["System Updates", "Core OS updates and new features"],
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

      <TabsContent value="api" className="focus-visible:outline-none">
        <Card className="p-6 md:p-8 rounded-[2rem] bg-[#020617]/40 backdrop-blur-xl border-white/5 shadow-glow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
            <div>
              <h3 className="text-xl font-display font-bold text-white/90 uppercase tracking-tight">
                Access Tokens
              </h3>
              <p className="text-xs text-white/30 font-medium mt-1">
                Integrate Neural Intelligence into your ecosystem.
              </p>
            </div>
            <Button className="w-full sm:w-auto rounded-xl md:rounded-2xl h-11 md:h-12 px-6 bg-gradient-brand border-0 shadow-emerald text-xs font-black uppercase tracking-widest">
              <Plus className="w-4 h-4 mr-2" /> GENERATE KEY
            </Button>
          </div>

          <div className="space-y-4">
            {[
              { name: "PRODUCTION_ENV", key: "mm_prod_••••••••••••3a8f", date: "APR 12, 2026" },
              { name: "DEVELOPMENT_ENV", key: "mm_dev_••••••••••••8b2c", date: "MAR 03, 2026" },
            ].map((k) => (
              <div
                key={k.name}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <div className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">
                      {k.name}
                    </div>
                    <div className="text-sm font-mono font-bold text-white/60 group-hover:text-white transition-colors">
                      {k.key}
                    </div>
                    <div className="text-[9px] text-white/20 font-black uppercase tracking-widest mt-2">
                      ACTIVE SINCE {k.date}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-10 w-10 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10"
                    >
                      <Eye className="w-4 h-4 text-white/40" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-10 w-10 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10"
                    >
                      <Copy className="w-4 h-4 text-white/40" />
                    </Button>
                  </div>
                </div>
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
