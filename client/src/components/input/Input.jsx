import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const styles = {
  wrapper: `
    w-full
  `,

  label: `
    mb-1
    block
    text-[16px]
    font-medium
    text-white/90
    
  `,

  inputWrapper: `
    relative
  `,

inputBase: `
  w-full px-4 py-2 rounded-lg
  bg-white/80
  backdrop-blur-lg
text-[15px]
   text-black/80
  
  placeholder:text-slate-500
  font-medium

  /* Crisp Border */
  border border-white/20
  outline-none

  /* Inner shadow for "carved" look */
  inset-shadow-sm inset-shadow-black/30

  /* Focus States */
  focus:bg-white/80
  focus:border-white/50
  focus:outline-none
  focus:shadow-[0px_2px_18px_rgba(255,255,255,0.8)]
  

  transition-all duration-300
`,

  inputError: `
    border-rose-400/70
    focus:border-rose-400
    focus:ring-rose-400/35
  `,

  eyeButton: `
    absolute right-3 top-1/2 -translate-y-1/2
    text-slate-900/90
    hover:text-slate-800
    transition-colors
  `,
};

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
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.inputWrapper}>
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
            ${styles.inputBase}
            ${error ? styles.inputError : ""}
            ${className}
          `}
          autoComplete="off"
        />

        {type === "password" && (
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
