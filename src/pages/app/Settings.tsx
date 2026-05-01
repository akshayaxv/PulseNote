import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Copy, Eye, Plus } from "lucide-react";

const Settings = () => (
  <div className="max-w-4xl">
    <Tabs defaultValue="profile" className="space-y-6">
      <TabsList className="bg-muted rounded-full p-1 h-11">
        {["profile","workspace","billing","notifications","api"].map(t => (
          <TabsTrigger key={t} value={t} className="rounded-full px-4 capitalize data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-glow">
            {t === "api" ? "API Keys" : t}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="profile">
        <Card className="p-7 rounded-3xl bg-gradient-card border-border/60">
          <h3 className="font-display font-bold mb-1">Profile</h3>
          <p className="text-sm text-muted-foreground mb-6">Manage your personal information.</p>
          <div className="flex items-center gap-5 mb-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-brand text-white text-3xl font-bold flex items-center justify-center">SC</div>
            <div className="space-y-2">
              <Button variant="outline" className="rounded-full">Upload photo</Button>
              <p className="text-xs text-muted-foreground">JPG or PNG · 1MB max</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div><Label className="text-xs font-semibold">Full name</Label><Input defaultValue="Sarah Chen" className="mt-1.5 rounded-xl bg-white/5 border-white/10" /></div>
            <div><Label className="text-xs font-semibold">Email</Label><Input defaultValue="sarah@northwind.io" className="mt-1.5 rounded-xl bg-white/5 border-white/10" /></div>
            <div><Label className="text-xs font-semibold">Role</Label><Input defaultValue="VP Product" className="mt-1.5 rounded-xl bg-white/5 border-white/10" /></div>
            <div><Label className="text-xs font-semibold">Timezone</Label><Input defaultValue="GMT-7 (PST)" className="mt-1.5 rounded-xl bg-white/5 border-white/10" /></div>
          </div>
          <div className="flex gap-2 mt-6">
            <Button className="rounded-full bg-gradient-brand border-0">Save changes</Button>
            <Button variant="ghost" className="rounded-full">Cancel</Button>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="workspace">
        <Card className="p-7 rounded-3xl bg-gradient-card border-border/60">
          <h3 className="font-display font-bold mb-6">Workspace</h3>
          <div className="space-y-4">
            <div><Label className="text-xs font-semibold">Workspace name</Label><Input defaultValue="Northwind" className="mt-1.5 rounded-xl bg-white/5 border-white/10" /></div>
            <div><Label className="text-xs font-semibold">Default language</Label><Input defaultValue="English (US)" className="mt-1.5 rounded-xl bg-white/5 border-white/10" /></div>
            <div><Label className="text-xs font-semibold">Data retention</Label><Input defaultValue="12 months" className="mt-1.5 rounded-xl bg-white/5 border-white/10" /></div>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="billing">
        <Card className="p-7 rounded-3xl bg-gradient-card border-border/60">
          <h3 className="font-display font-bold mb-1">Billing</h3>
          <p className="text-sm text-muted-foreground mb-6">You're on the <span className="font-semibold text-emerald">Pro</span> plan.</p>
          <div className="rounded-2xl bg-navy text-white p-6 mb-6">
            <div className="flex justify-between items-end mb-4">
              <div>
                <div className="text-xs text-white/60 mb-1">Next invoice</div>
                <div className="text-3xl font-display font-black">$29.00</div>
              </div>
              <div className="text-xs text-white/60">May 28, 2026</div>
            </div>
            <Button className="rounded-full bg-emerald hover:bg-emerald/90 border-0">Upgrade to Enterprise</Button>
          </div>
          <h4 className="font-semibold mb-3">Payment method</h4>
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-7 rounded bg-gradient-brand" />
              <div>
                <div className="text-sm font-semibold">Visa ending in 4242</div>
                <div className="text-xs text-muted-foreground">Expires 12/27</div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="rounded-full">Change</Button>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card className="p-7 rounded-3xl bg-gradient-card border-border/60">
          <h3 className="font-display font-bold mb-6">Notifications</h3>
          {[
            ["Meeting summaries ready", "Get notified when AI finishes processing"],
            ["New action items assigned", "When tasks are created from a meeting you joined"],
            ["Weekly digest", "Summary of your week every Monday morning"],
            ["Product updates", "New features, releases, and tips"],
          ].map(([t, d], i) => (
            <div key={t} className="flex items-center justify-between py-4 border-b border-border/40 last:border-0">
              <div>
                <div className="font-semibold text-sm">{t}</div>
                <div className="text-xs text-muted-foreground">{d}</div>
              </div>
              <Switch defaultChecked={i < 3} />
            </div>
          ))}
        </Card>
      </TabsContent>

      <TabsContent value="api">
        <Card className="p-7 rounded-3xl bg-gradient-card border-border/60">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-display font-bold">API Keys</h3>
              <p className="text-sm text-muted-foreground">Use these keys to integrate MeetMind into your apps.</p>
            </div>
            <Button className="rounded-full bg-gradient-brand border-0"><Plus className="w-4 h-4 mr-1.5" /> Create key</Button>
          </div>
          {[
            { name: "Production", key: "mm_prod_••••••••••••3a8f", created: "Apr 12, 2026" },
            { name: "Development", key: "mm_dev_••••••••••••8b2c", created: "Mar 03, 2026" },
          ].map(k => (
            <div key={k.name} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 mb-3">
              <div>
                <div className="font-semibold text-sm">{k.name}</div>
                <div className="text-xs font-mono text-muted-foreground mt-1">{k.key}</div>
                <div className="text-xs text-muted-foreground mt-1">Created {k.created}</div>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" className="rounded-full"><Eye className="w-4 h-4" /></Button>
                <Button size="icon" variant="ghost" className="rounded-full"><Copy className="w-4 h-4" /></Button>
              </div>
            </div>
          ))}
        </Card>
      </TabsContent>
    </Tabs>
  </div>
);
export default Settings;
