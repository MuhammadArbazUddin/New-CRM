import React, { useEffect } from "react";
import { MdCropSquare } from "react-icons/md";
import { RiStarLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { useMailStore } from "../../../../store/useMailStore";

const Message = () => {
  const getInboxEmails = useMailStore((state) => state.getInboxEmails);
  const inboxEmails = useMailStore((state) => state.inboxEmails);

  useEffect(() => {
    getInboxEmails();
  }, [getInboxEmails]);

  return (
    <div>
      {inboxEmails && inboxEmails.length > 0 ? (
        inboxEmails.map((email) => (
          <motion.div
            key={email._id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-start justify-between border-b border-gray-200 px-4 py-3 text-sm hover:cursor-pointer hover:shadow-md"
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
            <div className="flex-1 ml-4">
              <p className="text-gray-600 truncate inline-block max-w-full">
                {email.subject} — {email.body}
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
