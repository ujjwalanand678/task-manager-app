import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4 w-full">
      {/* Label */}
      <label className="text-[13px] text-slate-800">{label}</label>

      {/* Input Box */}
      <div className="input-box relative mt-1">
        <input
          type={
            type === "password"
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          className="w-full bg-transparent outline-none border-b border-slate-400 py-2 pr-10"
          value={value}
          onChange={(e) => onChange(e)}
        />

        {/* Password Toggle Icon */}
        {type === "password" && (
          <div className="absolute right-2 top-2 cursor-pointer">
            {showPassword ? (
              <FaRegEye
                size={22}
                className="text-primary"
                onClick={toggleShowPassword}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="text-slate-400"
                onClick={toggleShowPassword}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
