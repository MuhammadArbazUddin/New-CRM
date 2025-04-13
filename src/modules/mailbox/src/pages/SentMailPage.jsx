import React from "react";
import SentMailMessages from "../components/SentMailMessage";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
const SentMailPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="w-full">
        <SentMailMessages />
        </div>
      </div>
    </>
  );
};

export default SentMailPage;
