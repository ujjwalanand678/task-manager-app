import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayouts from "../../components/layouts/AuthLayouts.jsx";
import Input from "../../components/input/Input.jsx";
import { validateEmail } from "../../utils/helper.js";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPath.js";
import { UserContext } from "../../context/UserContext.jsx";

const styles = {
  form: `
    space-y-6
  `,

  apiError: `
    text-center
    text-xs
    text-rose-500
  `,

  fieldError: `
    mt-1
    text-xs
    text-rose-500
  `,
submitBtn: `
  w-full py-3.5 rounded-2xl
  text-[#003465] text-lg font-semibold tracking-wide
  
  /* High-Gloss Glass Gradient */
  bg-gradient-to-br from-white/80 via-white/40 to-white/20
  
  /* Frosting & Border */
  backdrop-blur-xl
  border border-white/60
  
  /* Shadow for Depth */
  shadow-[0_4px_20px_rgba(0,0,0,0.05)]

  /* Interactions */
  transition-all duration-300 ease-out
  hover:bg-white/60
  hover:scale-[1.02] 
  hover:shadow-[0_8px_25px_rgba(0,0,0,0.1)]
  active:scale-[0.98]
`,

  footer: `
    text-center
    text-sm
    text-slate-700
  `,

  footerLink: `
    ml-1
    font-medium
    text-[#0085FF]
    hover:underline
  `,
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const { updateUser } = useContext(UserContext);

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

    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, role } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        navigate(
          role?.toLowerCase() === "admin"
            ? "/admin/dashboard"
            : "/user/dashboard"
        );
      }
    } catch (err) {
      setApiError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <AuthLayouts title="Welcome back" subtitle="Sign in to continue">
      <form onSubmit={handleLogin} className={styles.form}>
        {apiError && <p className={styles.apiError}>{apiError}</p>}

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
            <p className={styles.fieldError}>{errors.email}</p>
          )}
        </div>

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
            <p className={styles.fieldError}>{errors.password}</p>
          )}
        </div>

        <button type="submit" className={styles.submitBtn}>
          Sign in
        </button>

        <p className={styles.footer}>
          Don’t have an account?
          <Link to="/signup" className={styles.footerLink}>
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayouts>
  );
};

export default Login;
