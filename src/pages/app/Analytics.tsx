import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Counter } from "@/components/dashboard/Counter";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
  Sparkles,
  Brain,
  Target,
  MessageCircle,
} from "lucide-react";

const hours = [
  { d: "Mon", h: 4.2 },
  { d: "Tue", h: 6.5 },
  { d: "Wed", h: 8.1 },
  { d: "Thu", h: 5.3 },
  { d: "Fri", h: 7.8 },
  { d: "Sat", h: 1.2 },
  { d: "Sun", h: 0.8 },
];
const participation = [
  { name: "Sarah", v: 32 },
  { name: "Marcus", v: 28 },
  { name: "Aisha", v: 22 },
  { name: "Jordan", v: 18 },
  { name: "Priya", v: 15 },
];
const completion = [
  { d: "W1", done: 12, pending: 3 },
  { d: "W2", done: 18, pending: 5 },
  { d: "W3", done: 22, pending: 4 },
  { d: "W4", done: 26, pending: 6 },
];
const trend = [
  { m: "Jan", v: 62 },
  { m: "Feb", v: 68 },
  { m: "Mar", v: 74 },
  { m: "Apr", v: 82 },
  { m: "May", v: 92 },
];
const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--cyan))",
  "hsl(var(--emerald))",
  "hsl(var(--sky))",
  "hsl(var(--muted-foreground))",
];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number | string;
    color?: string;
    payload?: unknown;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass p-3 rounded-2xl shadow-float border-white/60">
        <p className="text-xs font-bold mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="text-xs font-medium" style={{ color: p.payload?.color || p.color }}>
            {p.name}: <span className="font-bold">{p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const Analytics = () => {
  const [range, setRange] = useState("Weekly");
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-display font-bold">Intelligence Analytics</h2>
          <p className="text-sm text-muted-foreground">
            Detailed insights into your team's meeting performance
          </p>
        </div>
        <div className="flex gap-1 p-1 rounded-full bg-muted/60 backdrop-blur-sm">
          {["Daily", "Weekly", "Monthly"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${range === r ? "bg-primary text-white shadow-glow" : "text-white/40 hover:text-white"}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {[
          { l: "Meeting hours", v: 33.9, s: "h", icon: Clock, color: "text-blue-500" },
          { l: "Avg participation", v: 4.6, s: "", icon: Users, color: "text-cyan-500" },
          { l: "Tasks completed", v: 162, s: "", icon: CheckCircle2, color: "text-emerald-500" },
          { l: "Productivity", v: 92, s: "%", icon: TrendingUp, color: "text-primary" },
        ].map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-5 rounded-2xl bg-gradient-card border-border/60 hover-lift relative overflow-hidden group">
              <div className="absolute -right-2 -top-2 opacity-5 group-hover:opacity-10 transition-opacity">
                <s.icon className="w-16 h-16" />
              </div>
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
                {s.l}
              </div>
              <div className="text-3xl font-display font-bold flex items-baseline gap-1">
                <Counter to={s.v} decimals={s.v % 1 ? 1 : 0} />
                <span className="text-sm font-medium text-muted-foreground">{s.s}</span>
              </div>
              <div className="text-[10px] text-emerald font-bold mt-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> 12.4% INCREASE
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 rounded-3xl bg-gradient-card border-border/60 shadow-soft">
            <h3 className="font-display font-bold mb-6 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              Time Investment
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={hours}>
                <defs>
                  <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="d"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                  dy={10}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="h"
                  name="Hours"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  fill="url(#g1)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 rounded-3xl bg-gradient-card border-border/60 shadow-soft">
            <h3 className="font-display font-bold mb-6 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald/10 flex items-center justify-center">
                <Users className="w-4 h-4 text-emerald" />
              </div>
              Voice Distribution
            </h3>
            <div className="flex items-center">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={participation}
                    dataKey="v"
                    nameKey="name"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={8}
                    stroke="none"
                  >
                    {participation.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    verticalAlign="middle"
                    align="right"
                    layout="vertical"
                    iconType="circle"
                    wrapperStyle={{ fontSize: 12, fontWeight: 600 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 rounded-3xl bg-gradient-card border-border/60 shadow-soft">
            <h3 className="font-display font-bold mb-6 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan/10 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-cyan" />
              </div>
              Velocity Tracking
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={completion} barGap={8}>
                <XAxis
                  dataKey="d"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                  dy={10}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="done"
                  name="Completed"
                  fill="hsl(var(--emerald))"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="pending"
                  name="In Progress"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6 rounded-3xl bg-gradient-card border-border/60 shadow-soft">
            <h3 className="font-display font-bold mb-6 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-navy/10 flex items-center justify-center">
                <Brain className="w-4 h-4 text-primary" />
              </div>
              Meeting Health Trend
            </h3>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={trend}>
                <XAxis
                  dataKey="m"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 12 }}
                  dy={10}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94A3B8", fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="v"
                  name="Health Score"
                  stroke="hsl(var(--emerald))"
                  strokeWidth={4}
                  dot={{ fill: "hsl(var(--emerald))", r: 6, strokeWidth: 0 }}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid md:grid-cols-3 gap-5"
      >
        <Card className="p-6 rounded-3xl bg-navy text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-brand opacity-20" />
          <div className="relative">
            <Sparkles className="w-6 h-6 text-emerald mb-3" />
            <h4 className="font-display font-bold mb-2 text-lg">AI Insight</h4>
            <p className="text-sm text-white/70 leading-relaxed">
              Your team's <b>Decision Velocity</b> increased by 18% this month. Strategy meetings
              are becoming more concise, saving approx. 4.2 hours per week.
            </p>
          </div>
        </Card>

        <Card className="p-6 rounded-3xl bg-gradient-card border-border/60">
          <Target className="w-6 h-6 text-primary mb-3" />
          <h4 className="font-display font-bold mb-2">Focus Areas</h4>
          <div className="space-y-3">
            {[
              { l: "Product Strategy", v: 64 },
              { l: "Technical Specs", v: 42 },
              { l: "Customer Success", v: 28 },
            ].map((f) => (
              <div key={f.l}>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>{f.l}</span>
                  <span>{f.v}%</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${f.v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 rounded-3xl bg-gradient-card border-border/60">
          <MessageCircle className="w-6 h-6 text-cyan mb-3" />
          <h4 className="font-display font-bold mb-2">Top Keywords</h4>
          <div className="flex flex-wrap gap-2">
            {[
              "Q4 Roadmap",
              "API Integration",
              "User Feedback",
              "Retention",
              "Scalability",
              "Onboarding",
              "Market Fit",
            ].map((k) => (
              <span
                key={k}
                className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-primary/10 text-primary border border-primary/10"
              >
                {k.toUpperCase()}
              </span>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
export default Analytics;
