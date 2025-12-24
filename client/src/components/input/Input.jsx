import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const styles = {
  wrapper: `
    w-full
  `,

  label: `
    mb-1
    block
    text-[13px]
    font-medium
    text-slate-700
    tracking-wide
  `,

  inputWrapper: `
    relative
  `,

inputBase: `
  w-full px-5 py-3.5 rounded-2xl

  /* Subtler Glass Base */
  bg-white/10
  backdrop-blur-md
  
  /* Typography */
  text-slate-800
  placeholder:text-slate-600/70
  font-medium

  /* Crisp Border */
  border border-white/20
  outline-none

  /* Inner shadow for "carved" look */
  shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]

  /* Focus States */
  focus:bg-white/30
  focus:border-white/50
  focus:ring-2
  focus:ring-white/20
  focus:shadow-lg

  transition-all duration-300
`,

  inputError: `
    border-rose-400/60
    focus:border-rose-400
    focus:ring-rose-400/35
  `,

  eyeButton: `
    absolute right-3 top-1/2 -translate-y-1/2
    text-slate-500/70
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
