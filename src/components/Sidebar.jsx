import { Home, Mail, MailIcon, Menu, Settings, User } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const menuItems = [
    { icon: <MailIcon size={20} />, label: "Mailbox", to: "/mail" },
  ];

  return (
    <div
      className={`bg-blue-600 text-white transition-all duration-300 ease-in-out ${
        isExpanded ? "w-64" : "w-20"
      } p-4 flex flex-col min-h-screen`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between mb-6">
        {isExpanded && <h1 className="text-xl font-bold">Dashboard</h1>}
        <button onClick={toggleSidebar}>
          <Menu className="ml-2 cursor-pointer" size={24} />
        </button>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-4">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.to;

          return (
            <Link
              key={index}
              to={item.to}
              className={`flex items-center gap-4 p-2 rounded-lg transition cursor-pointer relative group
                ${isActive ? "bg-blue-700" : "hover:bg-blue-500"}`}
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
    </div>
  );
};

export default Sidebar;
