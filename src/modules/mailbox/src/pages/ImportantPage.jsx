import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SentImportantMessages from "../components/SentImportantMessages";

const ImportantPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <SentImportantMessages />
        </div>
      </div>
    </>
  );
};

export default ImportantPage;
