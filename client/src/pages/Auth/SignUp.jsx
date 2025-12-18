import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayouts from "../../components/layouts/AuthLayouts";
import Input from "../../components/input/Input";
import ProfilePhotoSelector from "../../components/input/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!fullName) {
      newErrors.fullName = "Full name is required";
    }

    if (!validateEmail(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // 👉 API call here
      navigate("/login");
    }
  };

  return (
    <AuthLayouts>
      <div className="w-full max-w-4xl xl:max-w-5xl mx-auto flex flex-col">
        <h3 className="text-xl font-semibold text-slate-800">
          Create an Account
        </h3>

        <p className="text-xs text-slate-600 mt-1 mb-6">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp} className="space-y-6 px-2 md:px-0">
          {/* Profile Photo */}
          <div className="flex justify-center">
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label="Full Name"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                error={!!errors.fullName}
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-rose-500">{errors.fullName}</p>
              )}
            </div>

            <div>
              <Input
                label="Email Address"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-rose-500">{errors.email}</p>
              )}
            </div>

            <div>
              <Input
                label="Password"
                type="password"
                placeholder="Min 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-rose-500">{errors.password}</p>
              )}
            </div>

            <Input
              label="Admin Invite Token"
              placeholder="6 Digit Code (optional)"
              value={adminInviteToken}
              onChange={(e) => setAdminInviteToken(e.target.value)}
            />
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
            SIGN UP
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-slate-600">
            Already have an account?
            <Link
              to="/login"
              className="ml-1 font-medium text-slate-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayouts>
  );
};

export default SignUp;
