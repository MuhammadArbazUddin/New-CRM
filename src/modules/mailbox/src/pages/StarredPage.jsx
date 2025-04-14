import React from "react";
import Navbar from "../components/Navbar";
import SentStarredMessages from "../components/SentStarredMessages";
import Sidebar from "../components/Sidebar";

const StarredPage = () => {
  return (
    <>
      {" "}
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <SentStarredMessages />
        </div>
      </div>
    </>
  );
};

export default StarredPage;
