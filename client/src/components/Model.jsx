import React from "react";

const Model = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return;

 return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
      {/* Modal content */}
      <div className="">
        {/* Modal header */}
        <div className="">
          <h3 className="">
            {title}
          </h3>

          <button
            type="button"
            className=""
            onClick={onClose}
          >
            <svg
              className=""
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
                d="m1 1 6m0 0 6M7 7l6 6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>

        {/* Modal body */}
        <div className="">
          {children}
        </div>
      </div>
    </div>
  </div>
);
;
};

export default Model;
