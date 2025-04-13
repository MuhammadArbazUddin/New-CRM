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
        <SentMailMessages />
      </div>
    </>
  );
};

export default SentMailPage;
