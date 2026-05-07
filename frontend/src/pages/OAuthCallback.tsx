import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { saveAuth } from "@/lib/auth";

const OAuthCallback = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");
    const name = params.get("name") ?? "";
    const email = params.get("email") ?? "";
    const id = params.get("id") ?? "";

    if (token) {
      saveAuth(token, { id, name, email, created_at: new Date().toISOString() });
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [params, navigate]);

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
      <div className="text-white/60 text-sm font-medium animate-pulse">Signing you in...</div>
    </div>
  );
};

export default OAuthCallback;
