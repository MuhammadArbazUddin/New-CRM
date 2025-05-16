import React, { useState } from "react";
import { MdDashboard, MdMail, MdMenu, MdPeople, MdKeyboardArrowDown, MdBook, MdExitToApp } from "react-icons/md";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [hrmDropdownOpen, setHrmDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { authUser, logout } = useAuthStore();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleHrmDropdown = () => {
    setHrmDropdownOpen(!hrmDropdownOpen);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: <MdDashboard size={20} />, label: "Dashboard", to: "/" },
    { icon: <MdMail size={20} />, label: "Mailbox", to: "/mail" },
    {
      icon: <MdPeople size={20} />,
      label: "HRM",
      to: "#",
      isDropdown: true,
      subLinks: [
        { icon: <MdBook size={20} />, label: "Staff", to: "/hrm/staff" },
      ],
    },
  ];

  return (
    <div
      className={`bg-blue-600 text-white transition-all duration-300 ease-in-out ${isExpanded ? "w-64" : "w-20"} p-4 flex flex-col min-h-screen`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between mb-6">
        {isExpanded && <NavLink to="/" className="text-xl font-bold">CRM</NavLink>}
        <button onClick={toggleSidebar}>
          <MdMenu className="ml-2 cursor-pointer" size={24} />
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-2">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.to;

          if (item.isDropdown) {
            return (
              <div key={index}>
                <button
                  onClick={toggleHrmDropdown}
                  className={`w-full flex items-center gap-4 p-2 rounded-lg transition cursor-pointer relative group ${isActive || location.pathname.startsWith("/hrm")
                    ? "bg-blue-700"
                    : "hover:bg-blue-500"
                    }`}
                >
                  {item.icon}
                  {isExpanded ? (
                    <>
                      <span className="flex-1 text-left whitespace-nowrap">{item.label}</span>
                      <MdKeyboardArrowDown
                        className={`transform transition-transform ${hrmDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </>
                  ) : (
                    <span className="absolute left-full ml-2 bg-white text-blue-600 px-2 py-1 text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.label}
                    </span>
                  )}
                </button>

                {/* Dropdown links */}
                {hrmDropdownOpen && isExpanded && (
                  <div className="ml-8 mt-1 flex flex-col gap-1 text-sm">
                    {item.subLinks.map((subItem, subIndex) => (
                      <NavLink
                        key={subIndex}
                        to={subItem.to}
                        className={({ isActive }) =>
                          `pl-2 py-1 rounded-md hover:bg-blue-500 flex gap-3 ${isActive ? "bg-blue-700 font-medium" : ""}`
                        }
                      >
                        {subItem.icon}
                        {subItem.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={index}
              to={item.to}
              className={`flex items-center gap-4 p-2 rounded-lg transition cursor-pointer relative group ${isActive ? "bg-blue-700" : "hover:bg-blue-500"}`}
            >
              {item.icon}
              {isExpanded ? (
                <span className="whitespace-nowrap">{item.label}</span>
              ) : (
                <span className="absolute left-full ml-2 bg-white text-blue-600 px-2 py-1 text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Profile */}
      <div className="flex flex-col items-center mt-auto py-4">
        {authUser ? (
          <div className="flex items-center gap-4 px-4">
            {/* User Avatar */}
            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-blue-600 font-semibold text-xl">
            {authUser?.FullName?.[0]?.toUpperCase() || ''}
            </div>

            {/* User Info */}
            {isExpanded && (
              <div className="flex flex-col items-start">
                <span className="font-semibold text-sm">{authUser?.FullName}</span>
                <button
                  onClick={handleLogout}
                  className="mt-2 text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                >
                  <MdExitToApp size={18} /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="mt-4 cursor-pointer text-blue-400 hover:text-blue-300 text-sm"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
