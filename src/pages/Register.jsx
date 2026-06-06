import { useForm } from "react-hook-form";
import GoogleOAuth from "../services/GoogleOAuth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/common/BackButton";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Input from "../components/common/Input";
import httpClient from "../services/httpClient";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();
  const [serverError, setServerError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setServerError(null);
    try {
      const res = await httpClient.post("/api/auth/register", data);
      const safeUser = {
        _id: res.data.user._id,
        name: res.data.user.name,
        email: res.data.user.email,
        picture: res.data.user.picture
      };
      localStorage.setItem("user", JSON.stringify(safeUser));
      setUser(safeUser);
      setToken("cookie_token");
      navigate("/");
    } catch (err) {
      setServerError(err.response?.data?.message || "Failed to register.");
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
            Join the pantry club
          </p>
          <h1 className="text-3xl font-semibold text-heading">
            Create an account
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Name"
            placeholder="Full name"
            error={errors.name?.message}
            {...register("name", { required: "Name is required" })}
          />
          <Input
            label="Email"
            placeholder="you@email.com"
            type="email"
            error={errors.email?.message}
            {...register("email", { required: "Email is required" })}
          />
          <Input
            label="Password"
            placeholder="••••••••"
            type="password"
            error={errors.password?.message}
            {...register("password", { required: "Password is required" })}
          />
          {serverError && (
            <p className="text-sm text-red-500 text-center">{serverError}</p>
          )}
          <Button type="submit" className="w-full">
            Create account
          </Button>
        </form>

        <div className="flex items-center gap-4">
          <span className="flex-1 h-px bg-border" />
          <span className="text-xs uppercase tracking-[0.3em] text-subtle">
            or
          </span>
          <span className="flex-1 h-px bg-border" />
        </div>

        <GoogleOAuth />
      </Card>
    </div>
  );
}


