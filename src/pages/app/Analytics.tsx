import { Card } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import { Counter } from "@/components/dashboard/Counter";
import { useState } from "react";

const hours = [
  { d: "Mon", h: 4.2 }, { d: "Tue", h: 6.5 }, { d: "Wed", h: 8.1 }, { d: "Thu", h: 5.3 }, { d: "Fri", h: 7.8 }, { d: "Sat", h: 1.2 }, { d: "Sun", h: 0.8 }
];
const participation = [{ name: "Sarah", v: 32 }, { name: "Marcus", v: 28 }, { name: "Aisha", v: 22 }, { name: "Jordan", v: 18 }, { name: "Priya", v: 15 }];
const completion = [{ d: "W1", done: 12, pending: 3 }, { d: "W2", done: 18, pending: 5 }, { d: "W3", done: 22, pending: 4 }, { d: "W4", done: 26, pending: 6 }];
const trend = [{ m: "Jan", v: 62 }, { m: "Feb", v: 68 }, { m: "Mar", v: 74 }, { m: "Apr", v: 82 }, { m: "May", v: 92 }];
const COLORS = ["#60A5FA", "#38BDF8", "#10B981", "#0F172A", "#94A3B8"];

const Analytics = () => {
  const [range, setRange] = useState("Weekly");
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-3">
        <div className="flex gap-1 p-1 rounded-full bg-muted">
          {["Daily", "Weekly", "Monthly"].map(r => (
            <button key={r} onClick={() => setRange(r)} className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${range === r ? "bg-white shadow-soft text-foreground" : "text-muted-foreground"}`}>{r}</button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {[
          { l: "Meeting hours", v: 33.9, s: "h" },
          { l: "Avg participation", v: 4.6, s: "" },
          { l: "Tasks completed", v: 162, s: "" },
          { l: "Productivity", v: 92, s: "%" },
        ].map(s => (
          <Card key={s.l} className="p-5 rounded-2xl bg-gradient-card border-border/60">
            <div className="text-xs text-muted-foreground mb-1">{s.l}</div>
            <div className="text-2xl font-display font-bold"><Counter to={s.v} suffix={s.s} decimals={s.v % 1 ? 1 : 0} /></div>
            <div className="text-xs text-emerald font-semibold mt-1">↑ 12% vs last {range.toLowerCase()}</div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card className="p-6 rounded-3xl bg-gradient-card border-border/60">
          <h3 className="font-display font-bold mb-4">Meeting hours</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={hours}>
              <defs>
                <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#60A5FA" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#60A5FA" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="d" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB" }} />
              <Area type="monotone" dataKey="h" stroke="#60A5FA" strokeWidth={3} fill="url(#g1)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 rounded-3xl bg-gradient-card border-border/60">
          <h3 className="font-display font-bold mb-4">Participation</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={participation} dataKey="v" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={3}>
                {participation.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Legend />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB" }} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 rounded-3xl bg-gradient-card border-border/60">
          <h3 className="font-display font-bold mb-4">Task completion</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={completion}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="d" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB" }} />
              <Bar dataKey="done" stackId="a" fill="#10B981" radius={[0,0,8,8]} />
              <Bar dataKey="pending" stackId="a" fill="#60A5FA" radius={[8,8,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 rounded-3xl bg-gradient-card border-border/60">
          <h3 className="font-display font-bold mb-4">Productivity trend</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="m" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #E5E7EB" }} />
              <Line type="monotone" dataKey="v" stroke="#10B981" strokeWidth={3} dot={{ fill: "#10B981", r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};
export default Analytics;
