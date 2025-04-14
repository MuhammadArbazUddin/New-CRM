import React, { useEffect, useState } from "react";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdDeleteOutline,
} from "react-icons/md";
import { motion } from "framer-motion";
import { useMailStore } from "../../../../store/useMailStore";
import { useNavigate } from "react-router-dom";
import { LuRefreshCcw } from "react-icons/lu";

const SentStarredMessages = () => {
  const {
    getStarredEmails,
    starredEmails,
    getMailById,
    searchQuery,
  } = useMailStore();

  const [selectedEmails, setSelectedEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchStarredEmails = async () => {
    setLoading(true);
    await getStarredEmails();
    setLoading(false);
  };

  useEffect(() => {
    if (starredEmails.length === 0) {
      fetchStarredEmails();
    }
  }, [starredEmails.length]);

  useEffect(() => {
    fetchStarredEmails();
  }, []);

  const handleClick = (mailId) => {
    getMailById(mailId);
    navigate(`/mail/${mailId}`);
  };

  const toggleSelect = (id) => {
    setSelectedEmails((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const handleTrashSelected = async () => {
  console.log("Hi?");
  };

  const filteredEmails = starredEmails.filter((email) => {
    if (!email) return false;

    const subject = email?.subject?.toLowerCase() || "";
    const body = email?.body?.toLowerCase() || "";
    const senderName = email?.sender?.fullName?.toLowerCase() || "";
    const search = searchQuery.toLowerCase();

    return (
      subject.includes(search) ||
      body.includes(search) ||
      senderName.includes(search)
    );
  });

  return (
    <div className="p-4 max-w-full overflow-x-hidden">
      {/* Top Action Buttons */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div
            className={`p-2 rounded-full hover:bg-gray-100 cursor-pointer transition duration-200 ease-in-out ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={!loading ? fetchStarredEmails : undefined}
          >
            <LuRefreshCcw
              className={`${loading ? "animate-spin" : ""}`}
              size={"20px"}
            />
          </div>
          {loading && (
            <span className="ml-2 text-sm text-gray-500 animate-pulse">
              Refreshing...
            </span>
          )}
          <button
            onClick={handleTrashSelected}
            disabled={selectedEmails.length === 0 || loading}
            className={`p-2 rounded-full transition ${
              selectedEmails.length > 0
                ? "hover:bg-red-100 text-red-600 cursor-pointer"
                : "text-gray-300 cursor-not-allowed"
            }`}
          >
            <MdDeleteOutline size={"20px"} />
          </button>
        </div>
      </div>

      {/* Email List */}
      {loading ? (
        <div className="text-center text-gray-400 mt-6 animate-pulse">
          Loading mails...
        </div>
      ) : filteredEmails && filteredEmails.length > 0 ? (
        filteredEmails.map((email) => {
          const isSelected = selectedEmails.includes(email._id);
          return (
            <motion.div
              key={email._id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`flex items-start justify-between border-b border-gray-200 px-4 py-3 text-sm transition ${
                isSelected ? "bg-blue-50" : "hover:bg-gray-50"
              }`}
              onClick={() => handleClick(email._id)}
            >
              <div className="flex items-center gap-3">
                <div
                  className="text-gray-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSelect(email._id);
                  }}
                >
                  {isSelected ? (
                    <MdCheckBox className="w-5 h-5 text-blue-500" />
                  ) : (
                    <MdCheckBoxOutlineBlank className="w-5 h-5" />
                  )}
                </div>
                <div
                  onClick={() => handleClick(email._id)}
                  className="cursor-pointer"
                ></div>
              </div>

              <h1 className="font-semibold">
                {email.sender?.fullName || "Unknown Receiver"}
              </h1>
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
          );
        })
      ) : (
        <p className="text-center text-gray-500 mt-4">
          {loading ? "Loading emails..." : "No emails found"}
        </p>
      )}
    </div>
  );
};

export default SentStarredMessages;
