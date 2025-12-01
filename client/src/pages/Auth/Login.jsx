import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayouts from "../../components/layouts/AuthLayouts";
import Input from "../../components/input/Input";

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError("");
    navigate("/user/dashboard");
  };

  return (
    <AuthLayouts>
      <div className="w-full flex flex-col gap-6">

        {/* Heading */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white">Welcome Back <span className="">👋</span></h3>
          <p className="text-sm text-white/70 mt-2">
            Please enter your details to continue.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="mt-4 space-y-5">

          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

          {error && <p className="text-xs text-rose-400">{error}</p>}

          <button
            type="submit"
            className="
              w-full py-3 rounded-lg
              bg-gradient-to-r from-cyan-300 to-teal-300
              text-slate-900 font-semibold
              shadow-lg hover:shadow-xl hover:scale-[1.02]
              transition-all duration-200
            "
          >
            LOGIN
          </button>

          <div className="text-center">
            <p className="text-xs text-white/60">or continue with</p>
          </div>

          

          <p className="text-sm text-white/70 text-center mt-4">
            Don’t have an account?
            <Link className="text-white font-semibold underline ml-1" to="/signup">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </AuthLayouts>
  );
};

export default Login;
