import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu.jsx";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div
      className="mr-4 ml-4 mb-2 gap-5 px-4 py-2 backdrop-blur-xl
   border border-white/10 rounded-lg bg-white/5
"  >
      {/* Mobile menu toggle */}
      <button
        className="block lg:hidden text-white/85 hover:text-white transition"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      {/* Title */}
      <h2
        className="
        text-center
      text-xl font-medium
      text-white/90
      
      
      "
      >
        Task Manager
      </h2>

      {/* Mobile Side Menu */}
      {openSideMenu && (
        <div
          className="
          fixed top-[64px] left-4
          z-30

          bg-white/15
          backdrop-blur-2xl
          backdrop-saturate-150

          border border-white/20
          rounded-2xl

          shadow-[0_30px_80px_rgba(0,0,0,0.45)]
        "
        >
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
