import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu.jsx";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <>
      {/* Navbar */}
      <div
        className="
        
          relative z-50
          mr-4 ml-4 mb-2
          flex items-center justify-between
          gap-5 px-4 py-2
          backdrop-blur-xl
          border border-white/10
          rounded-lg
          bg-white/5
        "
      >
        {/* Mobile menu toggle */}
        <button
         aria-label={openSideMenu ? "Close menu" : "Open menu"}
          className="block lg:hidden text-white/95 hover:text-white transition"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
       {openSideMenu ? <HiOutlineX className="text-2xl" /> : <HiOutlineMenu className="text-2xl" />}
        </button>

        {/* Title */}
        <h2 className="text-xl font-medium text-white/95">
          Task Manager
        </h2>
      </div>

      {/* Overlay + Mobile Side Menu */}
      {openSideMenu && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40 "
            onClick={() => setOpenSideMenu(false)}
          />

          {/* Mobile Side Menu */}
          <div
            className="
              fixed top-[74px] left-9
              z-60
              backdrop-blur-2xl
              backdrop-saturate-150

              border border-white/20
              rounded-3xl

              shadow-[0_30px_80px_rgba(0,0,0,0.45)]
            "
            role="dialog"
            aria-modal="true"
          >
            <SideMenu activeMenu={activeMenu} isMobile onClose={() => setOpenSideMenu(false)} />
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
