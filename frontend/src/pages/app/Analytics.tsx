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
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { AnalyticsSkeleton } from "@/components/dashboard/Skeletons";
import { useAnalytics } from "@/hooks/useAnalytics";
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
      <div className="bg-[#020617]/90 backdrop-blur-xl p-4 rounded-2xl shadow-glow-sm border border-white/10 min-w-[140px]">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2 font-display">
          {label}
        </p>
        <div className="space-y-1.5">
          {payload.map((p, i) => (
            <div key={i} className="flex items-center justify-between gap-4">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">
                {p.name}
              </span>
              <span
                className="text-sm font-bold font-mono"
                style={{
                  color:
                    (p.payload as { color?: string })?.color || p.color || "hsl(var(--primary))",
                }}
              >
                {p.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const Analytics = () => {
  const [range, setRange] = useState("Weekly");
  const { data, isLoading: loading } = useAnalytics();

  if (loading || !data) {
    return (
      <div className="space-y-6 md:space-y-10 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-white/90 uppercase">
              Performance Analytics
            </h2>
            <p className="text-xs md:text-sm text-white/40 mt-1 font-medium leading-relaxed">
              Detailed insights into your team's meeting performance.
            </p>
          </div>
        </div>
        <AnalyticsSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-white/90 uppercase">
            Performance Analytics
          </h2>
          <p className="text-xs md:text-sm text-white/40 mt-1 font-medium leading-relaxed">
            Detailed insights into your team's meeting performance.
          </p>
        </div>
        <div className="flex gap-1 p-1 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm self-start md:self-auto">
          {["Daily", "Weekly", "Monthly"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-4 md:px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${range === r ? "bg-primary text-white shadow-glow" : "text-white/20 hover:text-white"}`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {[
          { l: "Meeting hours", v: data.overview.total_hours, s: "H", icon: Clock },
          { l: "Participation", v: data.overview.participation_score, s: "P", icon: Users },
          { l: "Completed", v: data.overview.completed, s: "✓", icon: CheckCircle2 },
          { l: "Productivity", v: data.overview.productivity, s: "%", icon: TrendingUp },
        ].map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-5 md:p-6 rounded-[2rem] bg-[#020617]/40 backdrop-blur-md border-white/5 hover-lift relative overflow-hidden group shadow-glow-sm">
              <div className="absolute -right-2 -top-2 opacity-5 group-hover:opacity-10 transition-opacity">
                <s.icon className="w-16 h-16 md:w-20 md:h-20" />
              </div>
              <div className="text-[9px] md:text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2 md:mb-3">
                {s.l}
              </div>
              <div className="text-2xl md:text-4xl font-display font-bold flex items-baseline gap-1 text-white/90">
                <Counter to={s.v} decimals={s.v % 1 ? 1 : 0} />
                <span className="text-[10px] font-black text-white/20 uppercase font-sans">
                  {s.s}
                </span>
              </div>
              <div className="text-[8px] md:text-[9px] text-emerald font-black mt-3 flex items-center gap-1 tracking-widest uppercase truncate">
                <TrendingUp className="w-3 h-3" /> +12% BOOST
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-[#020617]/40 backdrop-blur-md border-white/5 shadow-glow-sm">
            <h3 className="font-display font-bold text-lg md:text-xl mb-6 md:mb-8 flex items-center gap-3 text-white/90 uppercase tracking-tight">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              Time Investment
            </h3>
            <div className="h-[220px] md:h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
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
                    tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 9, fontWeight: 900 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 9, fontWeight: 900 }}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 2 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="h"
                    name="Hours"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    fill="url(#g1)"
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-[#020617]/40 backdrop-blur-md border-white/5 shadow-glow-sm">
            <h3 className="font-display font-bold text-lg md:text-xl mb-6 md:mb-8 flex items-center gap-3 text-white/90 uppercase tracking-tight">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald" />
              </div>
              Voice Distribution
            </h3>
            <div className="h-[220px] md:h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.participation}
                    dataKey="v"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={8}
                    stroke="none"
                  >
                    {data.participation.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                    wrapperStyle={{
                      fontSize: 9,
                      fontWeight: 900,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      opacity: 0.4,
                      paddingTop: 20,
                    }}
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
          <Card className="p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-[#020617]/40 backdrop-blur-md border-white/5 shadow-glow-sm">
            <h3 className="font-display font-bold text-lg md:text-xl mb-6 md:mb-8 flex items-center gap-3 text-white/90 uppercase tracking-tight">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-cyan" />
              </div>
              Velocity Tracking
            </h3>
            <div className="h-[220px] md:h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[data.velocity]} barGap={6}>
                  <XAxis
                    dataKey="d"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 9, fontWeight: 900 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 9, fontWeight: 900 }}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "rgba(255,255,255,0.02)" }}
                  />
                  <Bar
                    dataKey="done"
                    name="Done"
                    fill="hsl(var(--emerald))"
                    radius={[4, 4, 0, 0]}
                    barSize={25}
                  />
                  <Bar
                    dataKey="pending"
                    name="Pending"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                    barSize={25}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-[#020617]/40 backdrop-blur-md border-white/5 shadow-glow-sm">
            <h3 className="font-display font-bold text-lg md:text-xl mb-6 md:mb-8 flex items-center gap-3 text-white/90 uppercase tracking-tight">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              Engagement Trend
            </h3>
            <div className="h-[220px] md:h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.trend}>
                  <XAxis
                    dataKey="m"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 9, fontWeight: 900 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "rgba(255,255,255,0.2)", fontSize: 9, fontWeight: 900 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="v"
                    name="Health"
                    stroke="hsl(var(--emerald))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--emerald))", r: 4, strokeWidth: 0 }}
                    activeDot={{ r: 6, strokeWidth: 4, stroke: "rgba(16, 185, 129, 0.2)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid md:grid-cols-3 gap-5"
      >
        <Card className="p-8 rounded-[2.5rem] bg-[#020617]/60 backdrop-blur-xl border border-white/5 relative overflow-hidden shadow-glow-sm group">
          <div className="absolute inset-0 bg-gradient-brand opacity-10" />
          <div className="relative">
            <Sparkles className="w-8 h-8 text-emerald mb-4 animate-pulse" />
            <h4 className="font-display font-bold mb-3 text-xl text-white/90 uppercase tracking-tight">
              Smart Insight
            </h4>
            <p className="text-sm text-white/40 leading-relaxed font-medium">
              Your team's <b className="text-emerald">DECISION SPEED</b> increased by 18% this
              month. Strategy sessions are becoming more concise, saving approx. 4.2 hours per week.
            </p>
          </div>
        </Card>

        <Card className="p-8 rounded-[2.5rem] bg-[#020617]/40 backdrop-blur-md border-white/5 shadow-glow-sm">
          <Target className="w-8 h-8 text-primary mb-4" />
          <h4 className="font-display font-bold mb-5 text-xl text-white/90 uppercase tracking-tight">
            Key Focus Areas
          </h4>
          <div className="space-y-4">
            {[
              { l: "Product Strategy", v: 64 },
              { l: "Technical Specs", v: 42 },
              { l: "Customer Success", v: 28 },
            ].map((f) => (
              <div key={f.l}>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">
                  <span>{f.l}</span>
                  <span className="font-mono">{f.v}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary shadow-glow-sm" style={{ width: `${f.v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-8 rounded-[2.5rem] bg-[#020617]/40 backdrop-blur-md border-white/5 shadow-glow-sm">
          <MessageCircle className="w-8 h-8 text-cyan mb-4" />
          <h4 className="font-display font-bold mb-5 text-xl text-white/90 uppercase tracking-tight">
            Top Keywords
          </h4>
          <div className="flex flex-wrap gap-2.5">
            {data.keywords.map((k) => (
              <span
                key={k}
                className="text-[9px] font-black px-3 py-1.5 rounded-xl bg-white/5 text-white/40 border border-white/10 hover:border-primary/40 hover:text-primary transition-all uppercase tracking-widest"
              >
                {k}
              </span>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
export default Analytics;
