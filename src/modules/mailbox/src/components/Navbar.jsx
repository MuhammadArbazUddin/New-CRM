import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";

const Navbar = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex items-center justify-between px-6 h-16  bg-white">
      {/* Logo / Brand */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-semibold text-blue-600 tracking-wide">
          CRM Mail
        </h1>
      </div>

      {/* Search Input */}
      <div className="hidden md:flex w-[50%] max-w-xl relative">
        <div className="flex items-center w-full bg-[#EAF1FB] px-4 py-2 rounded-full  focus-within:ring-2 focus-within:ring-blue-400 transition">
          <IoIosSearch size="22px" className="text-gray-600" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search mail"
            className="w-full bg-transparent outline-none ml-2 placeholder:text-gray-500 text-sm"
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Navbar;
