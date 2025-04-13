import React, { useEffect } from "react";
import { MdCropSquare, MdDeleteOutline } from "react-icons/md";
import { RiStarLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { useMailStore } from "../../../../store/useMailStore";
import { useNavigate } from "react-router-dom";
import { LuRefreshCcw } from "react-icons/lu";

const Message = () => {
  const {
    getSentEmails,
    sentEmails,
    getMailById,
    searchQuery, // Zustand state
  } = useMailStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (sentEmails.length === 0) {
      getSentEmails();
    }
  }, [getSentEmails, sentEmails.length]);

  const handleClick = (mailId) => {
    getMailById(mailId);
    navigate(`/mail/${mailId}`);
  };

  // Filter emails using search query
  const filteredEmails = sentEmails.filter((email) =>
    email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.receiver?.fullName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 max-w-full overflow-x-hidden">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-3">
          <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition duration-200 ease-in-out">
            <LuRefreshCcw size={"20px"} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition duration-200 ease-in-out">
            <MdDeleteOutline size={"20px"} />
          </div>
        </div>
      </div>

      {filteredEmails && filteredEmails.length > 0 ? (
        filteredEmails.map((email) => (
          <motion.div
            key={email._id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-start justify-between border-b border-gray-200 px-4 py-3 text-sm hover:cursor-pointer hover:bg-gray-50"
            onClick={() => handleClick(email._id)}
          >
            <div className="flex items-center gap-3">
              <div className="flex-none text-gray-300">
                <MdCropSquare className="w-5 h-5" />
              </div>
              <div className="flex-none text-gray-300">
                <RiStarLine className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-semibold">
                  {email.sender?.fullName || "Unknown Receiver"}
                </h1>
              </div>
            </div>
            <div className="flex-1 ml-4">
              <p className="text-gray-600 truncate max-w-full">
                {email.subject} —{" "}
                {email.body.length > 100
                  ? `${email.body.slice(0, 100)}...`
                  : email.body}
              </p>
            </div>
            <div className="flex-none text-gray-400 text-sm">
              <p>{new Date(email.createdAt).toLocaleDateString()}</p>
            </div>
          </motion.div>
        ))
      ) : (
        <p className="text-center text-gray-500 mt-4">No emails found</p>
      )}
    </div>
  );
};

export default Message;
