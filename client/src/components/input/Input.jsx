import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({
  value,
  onChange,
  label,
  placeholder,
  type = "text",
  className = "",
  error = false,
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
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 rounded-lg
            bg-slate-200 text-slate-700
            placeholder:text-slate-400

            border-none outline-none ring-0
            focus:border-none focus:outline-none focus:ring-0

            shadow-[inset_4px_4px_8px_#b8bcc2,inset_-4px_-4px_8px_#ffffff]
            focus:shadow-[inset_2px_2px_4px_#b8bcc2,inset_-2px_-2px_4px_#ffffff]

            ${error
              ? "shadow-[inset_2px_2px_4px_#fca5a5,inset_-2px_-2px_4px_#ffffff]"
              : ""}

            transition-all duration-150
            ${className}
          `}
        />

        {type === "password" && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaRegEye className="text-slate-600" size={18} />
            ) : (
              <FaRegEyeSlash className="text-slate-400" size={18} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
