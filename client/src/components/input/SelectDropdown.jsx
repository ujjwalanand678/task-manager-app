import React, { useState } from "react";
import { LuChevronDown } from "react-icons/lu";

const SelectDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=""
      >
        {value
          ? options.find((opt) => opt.value === value)?.label
          : placeholder}

        <span className="">
          <LuChevronDown className="" />
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className=""
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
