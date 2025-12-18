import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({
  value,
  onChange,
  label,
  placeholder,
  type = "text",
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full">
      {label && (
        <label className="text-sm font-medium text-slate-600">
          {label}
        </label>
      )}

      <div className="relative mt-1">
        <input
          type={
            type === "password"
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`
            w-full
            border-none outline-none ring-0
            focus:border-none focus:outline-none focus:ring-0
            transition-all duration-150
            ${className}
          `}
        />

        {type === "password" && (
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaRegEye size={20} className="text-slate-600" />
            ) : (
              <FaRegEyeSlash size={20} className="text-slate-400" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
