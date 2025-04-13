import React from "react";
import SentDraftMessages from "../components/SentDraftMessages";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const DraftPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="w-full">
        <SentDraftMessages />
        </div>
      </div>
    </>
  );
};

export default DraftPage;
