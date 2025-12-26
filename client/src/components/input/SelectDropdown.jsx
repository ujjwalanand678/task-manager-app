import React, { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

const styles = {
  cardBtn: `
    w-full
    cursor-pointer
    px-3 py-2
    text-white/90
    rounded-md
    font-medium
    border border-white/20
    text-nowrap
    flex items-center justify-between
    bg-white/10
    backdrop-blur-md
    transition-all
    hover:bg-white/20
    hover:border-white/30
    focus:outline-none
  `,
};

const SelectDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative mt-1 z-20">
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={styles.cardBtn}
      >
        <span className="truncate">
          {value
            ? options.find((opt) => opt.value === value)?.label
            : placeholder}
        </span>

        <LuChevronDown
          className={`
            ml-2 text-white/70 transition-transform duration-200
            ${isOpen ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="
            absolute z-20 mt-2 w-full
            bg-white backdrop-blur-3xl
            border border-white/20
            rounded-md
            shadow-[0_4px_20px_rgba(255,255,255,0.3)]
            overflow-hidden
          "
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="
                px-3 py-2
                font-medium
                text-[15px] text-black/90
                cursor-pointer
                hover:bg-black/80
                hover:text-white
                
              "
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
