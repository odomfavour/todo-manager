import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  signupSchema,
  type LoginFormData,
  type SignupFormData,
} from "../schemas/authSchema.ts";
import { api } from "../lib/axios.ts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  // Dynamic schema switching
  const schema = !showLogin ? signupSchema : loginSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData | SignupFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const endpoint = showLogin ? "login" : "register";
      const res = await api.post(`/auth/${endpoint}`, data);
      if (showLogin && res.data.token) {
        // Save token to localStorage for future requests
        localStorage.setItem("todo-token", res.data.token);
      }

      toast.success(showLogin ? "Logged in successfully!" : "Account created!");
      navigate("/");
    } catch (err: any) {
      const message = err.response?.data?.message || "Something went wrong!";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl">
        <button
          onClick={() => setShowLogin(true)}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
            showLogin ? "bg-white text-purple-600 shadow-sm" : "text-gray-600"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setShowLogin(false)}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
            !showLogin ? "bg-white text-purple-600 shadow-sm" : "text-gray-600"
          }`}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {!showLogin && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              {...register("name")}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message as string}
              </p>
            )}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message as string}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message as string}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white py-3 rounded-xl font-semibold transition-all
    ${
      loading
        ? "opacity-70 cursor-not-allowed"
        : "hover:shadow-lg transform hover:scale-105"
    }`}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              <span>{showLogin ? "Logging in..." : "Creating account..."}</span>
            </>
          ) : (
            <span>{showLogin ? "Login" : "Create Account"}</span>
          )}
        </button>
      </form>
    </div>
  );
};

export default AuthPage;
