import React from "react";
import Sidebar from "../components/Sidebar";
import Messages from "../components/Messages";
import Navbar from "../components/Navbar";
import Test from "../components/test";

const InboxPage = () => {
  return (
    <>
        <Navbar/>
    <div className="flex ">
        <Sidebar />
      <div className="w-full">
        <Messages />
        <Test/>
      </div>
    </div>
    </>

  );
};

export default InboxPage;
