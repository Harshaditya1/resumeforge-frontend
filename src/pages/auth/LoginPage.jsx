import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  FiEye,
  FiEyeOff,
  FiMail,
  FiLock,
  FiLogIn,
} from "react-icons/fi";
import { toast } from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import authService from "../../services/authService";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (data) => {
  if (loading) return;

  try {
    setLoading(true);

    const response = await authService.login({
      email: data.email.trim(),
      password: data.password,
    });

    // Save JWT in Context + LocalStorage
    login(response.token);

    toast.success("Login successful");

    navigate("/dashboard", {
      replace: true,
    });
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      "Unable to login. Please try again.";

    toast.error(message);
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#091413] px-6 py-10">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-[-100px] h-80 w-80 rounded-full bg-[#408A71]/20 blur-3xl" />
        <div className="absolute bottom-[-150px] right-[-120px] h-96 w-96 rounded-full bg-[#285A48]/25 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#408A71]/10 blur-[140px]" />
      </div>

      <motion.section
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          {/* Logo */}
          <div className="mb-10 flex flex-col items-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#408A71]/20 ring-1 ring-[#408A71]/30">
              <FiLogIn className="text-3xl text-[#B0E4CC]" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white">
              Welcome Back
            </h1>

            <p className="mt-2 text-center text-sm text-gray-400">
              Sign in to continue to ResumeForge AI
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#B0E4CC]"
              >
                Email
              </label>

              <div className="relative">
                <FiMail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#408A71]" />

                <input
                  id="email"
                  type="email"
                  disabled={loading}
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-invalid={errors.email ? "true" : "false"}
                  className={`w-full rounded-xl border bg-white/5 py-3 pl-12 pr-4 text-white placeholder:text-gray-500 outline-none transition
                  ${
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-white/10 focus:border-[#408A71]"
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Enter a valid email",
                    },
                  })}
                />
              </div>

              {errors.email && (
                <p
                  role="alert"
                  className="mt-2 text-sm text-red-400"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#B0E4CC]"
              >
                Password
              </label>

              <div className="relative">
                <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#408A71]" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  disabled={loading}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  aria-invalid={errors.password ? "true" : "false"}
                  className={`w-full rounded-xl border bg-white/5 py-3 pl-12 pr-12 text-white placeholder:text-gray-500 outline-none transition
                  ${
                    errors.password
                      ? "border-red-500 focus:border-red-500"
                      : "border-white/10 focus:border-[#408A71]"
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters",
                    },
                  })}
                />

                <button
                  type="button"
                  disabled={loading}
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#B0E4CC]"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {errors.password && (
                <p
                  role="alert"
                  className="mt-2 text-sm text-red-400"
                >
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember */}
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  disabled={loading}
                  className="h-4 w-4 rounded border-white/20 accent-[#408A71]"
                  {...register("remember")}
                />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-sm text-[#B0E4CC] transition hover:text-white"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-xl bg-[#408A71] px-5 py-3 font-semibold text-white transition hover:bg-[#4c9a7e] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <span className="flex items-center gap-3">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </motion.button>

            {/* Register */}
            <p className="text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-[#B0E4CC] transition hover:text-white"
              >
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </motion.section>
    </main>
  );
}