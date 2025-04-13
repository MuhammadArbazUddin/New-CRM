import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdMore, IoMdArrowBack } from "react-icons/io";
import {
  MdDeleteOutline,
  MdOutlineMarkEmailUnread,
  MdOutlineReport,
} from "react-icons/md";
import { motion } from "framer-motion";
import { useMailStore } from "../../../../store/useMailStore";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Mail = () => {
  const { mailId } = useParams();
  const navigate = useNavigate();
  const { currentEmail, getMailById } = useMailStore();

  useEffect(() => {
    if (mailId) {
      getMailById(mailId);
    }
  }, [mailId, getMailById]);

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 bg-white rounded-xl mx-5"
        >
          <div className="flex items-center justify-between">
            <div>
              <div
                onClick={() => navigate("/mail")}
                className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
              >
                <IoMdArrowBack size={"20px"} />
              </div>
            </div>
            <div>
              <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
                <MdDeleteOutline size={"20px"} />
              </div>
            </div>
          </div>

          <div className="h-[90vh] px-3 overflow-y-auto">
            <div className="flex justify-between bg-white items-center gap-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-medium">{currentEmail?.subject}</h1>
                <span className="text-sm bg-gray-200 rounded-md px-2">
                  {currentEmail?.detail?.starred ? "Starred" : "Inbox"}
                </span>
              </div>
              <div className="flex-none text-gray-400 my-5 text-sm">
                <p>{new Date(currentEmail?.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="text-gray-500 text-sm">
              <h1 className="font-medium">{currentEmail?.sender.fullName}</h1>
              <span className="text-sm">
                to {currentEmail?.receiver.map((r) => r.email).join(", ")}
              </span>
            </div>

            <div className="my-10">
              <p>{currentEmail?.body}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Mail;
