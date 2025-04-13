import React, { useEffect } from "react";
import { MdCropSquare, MdDeleteOutline } from "react-icons/md";
import { RiStarLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { useMailStore } from "../../../../store/useMailStore";
import { useNavigate } from "react-router-dom";
import { LuRefreshCcw } from "react-icons/lu";
import { Bookmark, Star } from "lucide-react";

const Message = () => {
  const {
    getInboxEmails,
    inboxEmails,
    getMailById,
    searchQuery,      
  } = useMailStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (inboxEmails.length === 0) {
      getInboxEmails();
    }
  }, [getInboxEmails, inboxEmails.length]);

  const handleClick = (mailId) => {
    getMailById(mailId);
    navigate(`/mail/${mailId}`);
  };

  const filteredEmails = inboxEmails.filter((email) => {
    if (!email) return false; // Skip invalid emails
  
    // Safe checks with optional chaining
    const subject = email?.subject?.toLowerCase() || '';
    const body = email?.body?.toLowerCase() || '';
    const senderName = email?.sender?.fullName?.toLowerCase() || '';
    const search = searchQuery.toLowerCase();
  
    return subject.includes(search) || body.includes(search) || senderName.includes(search);
  });
  
  

  return (
    <div className="p-4 max-w-full overflow-x-hidden">
      {/* Top Action Buttons */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex">
          <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition duration-200 ease-in-out">
            <LuRefreshCcw size={"20px"} />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition duration-200 ease-in-out">
            <MdDeleteOutline size={"20px"} />
          </div>
        </div>
      </div>

      {/* Email List */}
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
                <Star className="w-5 h-5" />
              </div>
              <div className="flex-none text-gray-300">
                <Bookmark className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-semibold">
                {email.sender?.fullName || "Unknown Sender"}
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
