import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
const styles = {
  base: `
    h-full
    flex flex-col
    backdrop-blur-2xl
    backdrop-saturate-150
    bg-white/10
  `,

  desktopGlass: `
    hidden lg:flex
    w-64
    border-r border-white/20
    rounded-l-3xl
    rounded-r-none
    sticky top-0
  `,

  mobileGlass: `
    flex lg:hidden
    w-full
    max-w-xs
    border-r border-white/20
    rounded-3xl
  `,
};

const SideMenu = ({ activeMenu, isMobile = false }) => {
  const { user, clearUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);

  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(
        user?.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA
      );
    }
    return () => {};
  }, [user]);

  return (
    <div
  className={`
    ${styles.base}
    ${isMobile ? styles.mobileGlass : styles.desktopGlass}
  `}
>

      <div className="flex flex-col items-center justify-center mb-7 pt-5">
        <div className="relative  justify-between  ">
          <img
            src={user?.profileImageUrl || ""}
            alt="Profile Image"
            className="w-20 h-20 bg-white/20 text-white text-center items-center rounded-full border border-white/20 object-cover"
          />
        </div>

        {user?.role === "admin" && (
          <div className="text-[14px] font-medium text-white bg-primary px-3 py-0.5 rounded mt-1">
            Admin
          </div>
        )}

        <h5 className="text-white/90 font-medium leading-6 mt-3">
          {" "}
          {/* Changed from gray-950 */}
          {user?.name || ""}
        </h5>
        <p className="text-white/80 text-[12px]">
          {" "}
          {/* Changed from gray-500 */}
          {user?.email || ""}
        </p>
      </div>

      <div>
        {sideMenuData.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center font-medium gap-4 text-[17px] transition-colors ${
              activeMenu === item.label
                ? "text-cyan-300 bg-white/10 border-r-2 border-cyan-300" // Improved visibility for dark mode
                : "text-white/80 hover:text-white hover:bg-white/5"
            } py-3 px-6 mb-3 cursor-pointer`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className="text-xl" />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
