import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
// import Test from "../components/test";
import Message from "../components/Message";

const InboxPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex ">
        <Sidebar />
        <div className="w-full">
          <Message />
          {/* <Test /> */}
        </div>
      </div>
    </>
  );
};

export default InboxPage;
