import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import GoogleOAuth from "../services/GoogleOAuth";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import BackButton from "../components/common/BackButton";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import httpClient from "../services/httpClient";

export default function Login() {
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, setToken } = useAuth();
  const [loading, setLoading] = useState(false);

  const from = location.state?.from || "/";
  const productState = location.state?.product ? { product: location.state.product } : {};

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await httpClient.post("/api/auth/login", data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      setToken(res.data.token);
      navigate(from, { state: productState, replace: true });
    } catch (err) {
      setError("server", {
        message: err.response?.data?.message || err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-5 py-24 flex items-center justify-center">
      <BackButton />
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-subtle">
            Welcome back
          </p>
          <h1 className="text-3xl font-semibold text-heading">
            Sign in to continue
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <label className="block text-sm text-subtle space-y-2">
            Email
            <input
              type="email"
              placeholder="you@email.com"
              className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </label>

          <label className="block text-sm text-subtle space-y-2">
            Password
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-2xl border border-primary/15 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </label>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
          {errors.server && (
            <p className="text-center text-sm text-red-500">
              {errors.server.message}
            </p>
          )}
        </form>

        <div className="flex items-center gap-4">
          <span className="flex-1 h-px bg-border" />
          <span className="text-xs uppercase tracking-[0.3em] text-subtle">
            or
          </span>
          <span className="flex-1 h-px bg-border" />
        </div>

        <GoogleOAuth />

        <p className="text-center text-sm text-subtle">
          No account?{" "}
          <Link to="/register" className="text-primary font-semibold">
            Create one
          </Link>
        </p>
      </Card>
    </div>
  );
}
