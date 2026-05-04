import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Github, Sparkles } from "lucide-react";
import { VoiceWave } from "@/components/landing/VoiceWave";

const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A10.99 10.99 0 0 0 12 23Z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.83Z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38Z"
    />
  </svg>
);

const Card = ({ mode }: { mode: "login" | "signup" }) => {
  const navigate = useNavigate();
  const isLogin = mode === "login";
  return (
    <motion.form
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={(e) => {
        e.preventDefault();
        navigate("/dashboard");
      }}
      className="w-full max-w-md glass-dark rounded-3xl p-8 shadow-glow border-white/10"
    >
      <div className="mb-6">
        <h1 className="text-3xl font-display font-bold mb-2">
          {isLogin ? "Welcome back" : "Create your account"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isLogin
            ? "Sign in to your MeetMind workspace"
            : "Start turning meetings into action — free for 14 days"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <Button
          type="button"
          variant="outline"
          className="rounded-xl bg-white/5 border-white/10 text-white h-11 hover:bg-white/10 transition-colors"
        >
          <GoogleIcon /> <span className="ml-2 text-sm font-medium">Google</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          className="rounded-xl bg-white/5 border-white/10 text-white h-11 hover:bg-white/10 transition-colors"
        >
          <Github className="w-4 h-4" /> <span className="ml-2 text-sm font-medium">GitHub</span>
        </Button>
      </div>

      <div className="flex items-center gap-3 my-5">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">or with email</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="space-y-3 mb-5">
        {!isLogin && (
          <div>
            <Label className="text-xs font-semibold">Full name</Label>
            <Input
              className="mt-1.5 h-11 rounded-xl bg-white/5 border-white/10 text-white"
              placeholder="Sarah Chen"
            />
          </div>
        )}
        <div>
          <Label className="text-xs font-semibold">Email</Label>
          <Input
            type="email"
            className="mt-1.5 h-11 rounded-xl bg-white/5 border-white/10 text-white"
            placeholder="you@company.com"
          />
        </div>
        <div>
          <Label className="text-xs font-semibold">Password</Label>
          <Input
            type="password"
            className="mt-1.5 h-11 rounded-xl bg-white/5 border-white/10 text-white"
            placeholder="••••••••"
          />
        </div>
      </div>

      {isLogin && (
        <div className="flex justify-end mb-5">
          <a href="#" className="text-xs font-semibold text-primary hover:underline">
            Forgot password?
          </a>
        </div>
      )}

      <Button
        type="submit"
        className="w-full h-11 rounded-xl bg-gradient-brand border-0 text-white font-semibold shadow-soft"
      >
        {isLogin ? "Sign in" : "Create account"} <ArrowRight className="ml-2 w-4 h-4" />
      </Button>

      <p className="text-center text-sm text-muted-foreground mt-6">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <Link
          to={isLogin ? "/signup" : "/login"}
          className="font-semibold text-primary hover:underline"
        >
          {isLogin ? "Sign up" : "Sign in"}
        </Link>
      </p>
    </motion.form>
  );
};

export const Login = () => (
  <AuthLayout>
    <Card mode="login" />
  </AuthLayout>
);
export const Signup = () => (
  <AuthLayout>
    <Card mode="signup" />
  </AuthLayout>
);

const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
    <div className="absolute top-32 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
    <div className="absolute bottom-0 -right-32 w-96 h-96 rounded-full bg-emerald/20 blur-3xl" />
    <div className="relative grid lg:grid-cols-2 min-h-screen">
      <div className="flex flex-col p-8 lg:p-12">
        <Logo />
        <div className="flex-1 flex items-center justify-center py-10">{children}</div>
      </div>
      <div className="hidden lg:flex flex-col justify-center p-12 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-dark text-xs font-semibold mb-5 border-white/10 text-white">
            <Sparkles className="w-3 h-3 text-primary" /> AI-powered meeting intelligence
          </div>
          <h2 className="text-4xl font-display font-bold mb-4 leading-tight">
            Every meeting, <span className="text-gradient">distilled into action</span>.
          </h2>
          <p className="text-muted-foreground mb-8">
            Join 12,000+ teams shipping faster with MeetMind AI.
          </p>
          <div className="rounded-3xl glass-dark p-6 shadow-glow border-white/10">
            <div className="flex items-center justify-between text-xs text-white/40 mb-3">
              <span className="font-semibold">Live transcription</span>
              <span className="font-mono">00:12:48</span>
            </div>
            <VoiceWave />
          </div>
        </motion.div>
      </div>
    </div>
  </div>
);
