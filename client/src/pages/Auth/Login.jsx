import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayouts from "../../components/layouts/AuthLayouts";
import Input from "../../components/input/Input";

const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!validateEmail(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate("/user/dashboard");
    }
  };

  return (
    <AuthLayouts title="Welcome back" subtitle="Sign in to continue">
      <form onSubmit={handleLogin} className="space-y-6">
        {/* Email */}
        <div>
          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`
              rounded-lg px-4 py-3
              bg-slate-200 text-slate-700
              placeholder:text-slate-400

              border-none outline-none ring-0
              focus:border-none focus:outline-none focus:ring-0

              shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff]
              focus:shadow-[inset_2px_2px_4px_#b8bcc2,inset_-2px_-2px_4px_#ffffff]

              ${errors.email ? "shadow-[inset_2px_2px_4px_#fca5a5,inset_-2px_-2px_4px_#ffffff]" : ""}
            `}
          />

          {errors.email && (
            <p className="mt-1 text-xs text-rose-500">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`
              rounded-lg px-4 py-3
              bg-slate-200 text-slate-700
              placeholder:text-slate-400

              border-none outline-none ring-0
              focus:border-none focus:outline-none focus:ring-0

              shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff]
              focus:shadow-[inset_2px_2px_4px_#b8bcc2,inset_-2px_-2px_4px_#ffffff]

              ${errors.password ? "shadow-[inset_2px_2px_4px_#fca5a5,inset_-2px_-2px_4px_#ffffff]" : ""}
            `}
          />

          {errors.password && (
            <p className="mt-1 text-xs text-rose-500">
              {errors.password}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="
            w-full py-3 rounded-lg
            bg-slate-200 text-slate-700 font-medium

            border-none outline-none ring-0
            focus:outline-none focus:ring-0

            shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff]
            hover:shadow-[12px_12px_24px_#b8bcc2,-12px_-12px_24px_#ffffff]
            active:shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff]
            active:scale-[0.98]

            transition-all duration-150
          "
        >
          Sign in
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-slate-600">
          Don’t have an account?
          <Link
            to="/signup"
            className="ml-1 font-medium text-slate-700 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayouts>
  );
};

export default Login;
