import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SentBinMessages from "../components/SentBinMessages";

const BinPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="w-full">
        <SentBinMessages />
        </div>
      </div>
    </>
  );
};

export default BinPage;
