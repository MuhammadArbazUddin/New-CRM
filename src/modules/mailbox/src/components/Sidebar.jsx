import React, { useState } from "react";
import { LuPencil } from "react-icons/lu";
import { IoMdStar } from "react-icons/io";
import { MdOutlineDrafts, MdInbox, MdLabelImportant } from "react-icons/md";
import { TbSend2 } from "react-icons/tb";
import { useMailStore } from "../../../../store/useMailStore";

const sidebarItems = [
  {
    icon: <MdInbox size={20} />,
    text: "Inbox",
    link: "/",
  },
  {
    icon: <IoMdStar size={20} />,
    text: "Starred",
    link: "/starred",
  },
  {
    icon: <MdLabelImportant size={20} />,
    text: "Important",
    link: "/important",
  },
  {
    icon: <TbSend2 size={20} />,
    text: "Sent",
    link: "/mail/sent",
  },
  {
    icon: <MdOutlineDrafts size={20} />,
    text: "Drafts",
    link: "/mail/drafts",
  },
];

const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  const toggleModal = useMailStore((state) => state.toggleModal);

  return (
    <div className="w-[17%] min-h-screen bg-white  rounded-tr-3xl rounded-br-3xl p-4 flex flex-col">
      <div className="mb-6">
        <button
          onClick={() => {
            toggleModal();
          }}
          className="flex items-center cursor-pointer justify-center gap-3 w-full bg-gradient-to-r from-blue-400 to-blue-300 text-white font-semibold py-3 rounded-2xl shadow-md hover:brightness-110 transition duration-200"
        >
          <LuPencil size={22} />
          Compose
        </button>
      </div>
      <div className="text-gray-600 flex flex-col gap-1">
        {sidebarItems.map((item, idx) => {
          const isSelected = selected === idx;
          return (
            <a
              href={item.link}
              key={idx}
              onClick={() => setSelected(idx)}
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
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
