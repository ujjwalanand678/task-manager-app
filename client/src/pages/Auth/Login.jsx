import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayouts from "../../components/layouts/AuthLayouts.jsx";
import Input from "../../components/input/Input.jsx";
import { validateEmail } from "../../utils/helper.js";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPath.js";
import { UserContext } from "../../context/UserContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
const {updateUser} = useContext(UserContext)

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!validateEmail(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    setApiError("");

    // Stop here if validation fails
    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data)

        if (role?.toLowerCase() === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Something went wrong. Please try again.";

      setApiError(message);
    }
  };

  return (
    <AuthLayouts title="Welcome back" subtitle="Sign in to continue">
      <form onSubmit={handleLogin} className="space-y-6">

        {/* API Error */}
        {apiError && (
          <p className="text-center text-sm text-rose-500">
            {apiError}
          </p>
        )}

        {/* Email */}
        <div>
          <Input
            label="Email address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
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
            error={!!errors.password}
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
