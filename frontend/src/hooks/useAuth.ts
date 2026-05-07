import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { saveAuth, clearAuth, getStoredUser, AuthUser } from "@/lib/auth";

interface AuthResponse {
  access_token: string;
  token_type: string;
  user: AuthUser;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(getStoredUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post<AuthResponse>("/auth/login", { email, password });
      saveAuth(res.access_token, res.user);
      setUser(res.user);
      navigate("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post<AuthResponse>("/auth/register", { name, email, password });
      saveAuth(res.access_token, res.user);
      setUser(res.user);
      navigate("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const logout = useCallback(() => {
    clearAuth();
    setUser(null);
    navigate("/login");
  }, [navigate]);

  const loginWithGoogle = useCallback(() => {
    window.location.href = "http://localhost:8000/api/v1/auth/google/login";
  }, []);

  return { user, loading, error, login, signup, logout, loginWithGoogle };
}
