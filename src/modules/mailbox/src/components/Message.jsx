import React, { useEffect, useState } from "react";
import { MdCropSquare, MdDeleteOutline } from "react-icons/md";
import { RiStarLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { useMailStore } from "../../../../store/useMailStore"; 
import { useNavigate } from "react-router-dom";
import { LuRefreshCcw, LuTrash } from "react-icons/lu";

const Message = () => {
  const { getInboxEmails, inboxEmails, getMailById } = useMailStore();
  const navigate = useNavigate();
  const [expandedEmailId, setExpandedEmailId] = useState(null);

  useEffect(() => {
    if (inboxEmails.length === 0) {
      getInboxEmails(); // Load emails if empty
    }
  }, [getInboxEmails, inboxEmails.length]);

  const handleClick = (mailId) => {
    getMailById(mailId); // Fetch email details by ID
    navigate(`/mail/${mailId}`); // Navigate to detailed email page
  };

  const handleExpand = (mailId) => {
    setExpandedEmailId(expandedEmailId === mailId ? null : mailId); // Toggle expand/collapse
  };

  return (
    <div className="p-4   max-w-full overflow-x-hidden">
      {/* Refresh and Delete icons */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-3">
          <div
            className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition duration-200 ease-in-out"
          >
            <LuRefreshCcw size={"20px"} />
          </div>
          <div
            className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition duration-200 ease-in-out"
          >
            <MdDeleteOutline size={"20px"} />
          </div>
        </div>
      </div>

      {/* Map through emails and display them */}
      {inboxEmails && inboxEmails.length > 0 ? (
        inboxEmails.map((email) => (
          <motion.div
            key={email._id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-start justify-between border-b border-gray-200 px-4 py-3 text-sm hover:cursor-pointer hover:bg-gray-50"
            onClick={() => handleClick(email._id)} // Navigate on email click
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
                  {email.sender?.fullName || "Unknown Sender"}
                </h1>
              </div>
            </div>

            {/* Subject and Body with truncation for long text */}
            <div className="flex-1 ml-4">
              <p className="text-gray-600 truncate max-w-full">
                {email.subject} — {email.body.length > 100 ? `${email.body.slice(0, 100)}...` : email.body}
              </p>
            </div>

            {/* Date */}
            <div className="flex-none text-gray-400 text-sm">
              <p>{new Date(email.createdAt).toLocaleDateString()}</p>
            </div>
          </motion.div>
        ))
      ) : (
        <p className="text-center text-gray-500 mt-4">No emails found</p>
      )}

      {/* Read more/less toggle for email body */}
      {expandedEmailId && (
        <div className="mt-4 text-sm text-gray-700">
          <p>{inboxEmails.find(email => email._id === expandedEmailId)?.body}</p>
        </div>
      )}
    </div>
  );
};

export default Message;
