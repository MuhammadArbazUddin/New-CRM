import React, { useState } from "react";
import { Pencil, Inbox, Star, Bookmark, Send, FileText, Trash } from "lucide-react";
import { useMailStore } from "../../../../store/useMailStore";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SendEmail from "./SendEmail";

const sidebarItems = [
  {
    icon: <Inbox size={20} />,
    text: "Inbox",
    link: "/mail",
  },
  {
    icon: <Star size={20} />,
    text: "Starred",
    link: "/mail/starred",
  },
  {
    icon: <Bookmark size={20} />,
    text: "Important",
    link: "/mail/important",
  },
  {
    icon: <Send size={20} />,
    text: "Sent",
    link: "/mail/sent",
  },
  {
    icon: <FileText size={20} />,
    text: "Drafts",
    link: "/mail/drafts",
  },
  {
    icon: <Trash size={20} />,
    text: "Bin",
    link: "/mail/bin",
  },
];

const Sidebar = () => {
  const { toggleModal } = useMailStore();
  const location = useLocation();

  return (
    <div className=" min-h-screen bg-white  rounded-tr-3xl rounded-br-3xl p-4 flex flex-col">
     <SendEmail />
      <div className="mb-6">
        <button
          onClick={() => {
            toggleModal();
          }}
          className="flex items-center cursor-pointer justify-center gap-3 w-full bg-gradient-to-r from-blue-400 to-blue-300 text-white font-semibold py-3 rounded-2xl shadow-md hover:brightness-110 transition duration-200"
        >
          <Pencil size={22} />
          Compose
        </button>
      </div>
      <div className="text-gray-600 flex flex-col gap-1">
        {sidebarItems.map((item, idx) => {
          const isSelected = location.pathname === item.link;

          return (
            <Link
              to={item.link}
              key={idx}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition duration-200 font-medium ${
                isSelected
                  ? "bg-blue-100 text-blue-900"
                  : "hover:bg-gray-100 hover:text-black"
              }`}
            >
              <span className={`${isSelected ? "text-blue-600" : ""}`}>
                {item.icon}
              </span>
              <p className="text-sm">{item.text}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
