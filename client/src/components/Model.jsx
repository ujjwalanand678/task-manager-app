import React from "react";

const Model = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/80
        backdrop-blur-sm
      "
    >
      {/* Modal Card */}
      <div
        className="
          relative
          w-full max-w-md mx-4
          bg-white/10
          backdrop-blur-xl
          border border-white/20
          rounded-2xl
          shadow-[0_20px_60px_rgba(0,0,0,0.7)]
          p-6
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold text-white/90">
            {title}
          </h3>

          <button
            type="button"
            onClick={onClose}
            className="
            cursor-pointer
              p-1.5 rounded-md
              text-white/90
              hover:text-white
              hover:bg-white/10
              transition
            "
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1l12 12M13 1L1 13"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="text-white/90">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Model;
