import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayouts from "../../components/layouts/AuthLayouts.jsx";
import Input from "../../components/input/Input.jsx";
import ProfilePhotoSelector from "../../components/input/ProfilePhotoSelector.jsx";

import { validateEmail } from "../../utils/helper.js";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPath.js";
import uploadImage from "../../utils/uploadImage.js";
import { UserContext } from "../../context/UserContext.jsx";

const styles = {
  container: `
    w-full flex flex-col items-center
  `,

  title: `
      text-[30px]
    font-semibold
    text-white/85
    tracking-tight
  `,

  subtitle: `
         text-[13px]
  text-white/85
   font-medium
   mb-2
  `,

  form: `
  space-y-2
  
  `,

  // Container for the two-column grid
  grid: `
    grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4
  `,

  /* THE CRYSTAL BUTTON */
  submitBtn: `
   mt-3
  w-full py-2 rounded-lg
  text-black/85 text-[16px] font-semibold 
  cursor-pointer
  /* High-Gloss Glass Gradient */
  bg-gradient-to-br from-white/80 via-white/40 to-white/20
  
  /* Frosting & Border */
  backdrop-blur-xl
  border border-white/60
  
  /* Shadow for Depth */
  shadow-[0_4px_20px_rgba(0,0,0,0.05)]

  /* Interactions */
  transition-all duration-300 ease-out
  hover:bg-gradient-to-br
  hover:from-black/90
    hover:via-black/10
    hover:to-black/10
    hover:text-[#ffffff]/90
  hover:scale-[1.02] 
  hover:shadow-[0px_5px_20px_rgba(255,255,255,0.8)]
  active:scale-[0.98]
  `,

  footer: `
   text-center
    text-md
    text-slate-200
  `,

  footerLink: `
      cursor-pointer
    ml-1
    text-[15px]
    font-medium
    text-[#ffffff]
    underline
  `,

  apiError: `text-center text-xs text-rose-600 font-semibold mb-4 bg-rose-50/50 py-2 rounded-lg`,
  fieldError: `mt-1 text-[11px] text-rose-600 font-medium ml-1`,
};

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";
    let profileImagePublicId = "";

    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!validateEmail(email)) newErrors.email = "Enter a valid email address";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    setApiError("");

    if (Object.keys(newErrors).length > 0) return;

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
        profileImagePublicId = imgUploadRes.publicId || "";
      }

      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        {
          name: fullName,
          email,
          password,
          adminInviteToken,
          profileImageUrl,
          profileImagePublicId,
        }
      );

      const { token, role, data } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(data);

        navigate(
          role === "admin"
            ? "/admin/dashboard"
            : "/user/dashboard"
        );
      }
    } catch (error) {
      setApiError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <AuthLayouts >
      <div className={styles.container}>
        <h3 className={styles.title}>Create an Account</h3>
        <p className={styles.subtitle}>
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp} className={styles.form}>
          {apiError && (
            <p className={styles.apiError}>{apiError}</p>
          )}

          <div className="flex justify-center">
            <ProfilePhotoSelector
              image={profilePic}
              setImage={setProfilePic}
            />
          </div>

          <div className={styles.grid}>
            <div>
              <Input
                label="Full Name"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                error={!!errors.fullName}
              />
              {errors.fullName && (
                <p className={styles.fieldError}>
                  {errors.fullName}
                </p>
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
                <p className={styles.fieldError}>
                  {errors.email}
                </p>
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
                <p className={styles.fieldError}>
                  {errors.password}
                </p>
              )}
            </div>

            <Input
              label="Admin Invite Token"
              placeholder="6 Digit Code (optional)"
              value={adminInviteToken}
              onChange={(e) =>
                setAdminInviteToken(e.target.value)
              }
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            SIGN UP
          </button>

          <p className={styles.footer}>
            Already have an account?
            <Link to="/login" className={styles.footerLink}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayouts>
  );
};

export default SignUp;
