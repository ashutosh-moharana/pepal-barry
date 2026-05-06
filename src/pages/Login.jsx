import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import GoogleOAuth from "../services/GoogleOAuth";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import BackButton from "../components/common/BackButton";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
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
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      setToken("cookie_token");
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
    <div className="min-h-screen bg-background px-4 pt-20 pb-10 sm:px-5 sm:py-24 flex flex-col sm:items-center sm:justify-center relative">
      <div className="w-full max-w-md mb-6 sm:absolute sm:top-10 sm:left-10 sm:mb-0">
        <BackButton />
      </div>
      <Card className="w-full max-w-md p-6 sm:p-8 space-y-6 border-none sm:border-solid shadow-none sm:shadow-sm bg-transparent sm:bg-white">
        <div className="text-center space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-subtle">
            Welcome back
          </p>
          <h1 className="text-3xl font-semibold text-heading">
            Sign in to continue
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="you@email.com"
            error={errors.email?.message}
            {...register("email", { required: "Email is required" })}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password", { required: "Password is required" })}
          />

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
