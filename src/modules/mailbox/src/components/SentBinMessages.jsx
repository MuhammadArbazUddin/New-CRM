import React, { useEffect, useState } from "react";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdDeleteOutline,
  MdRestoreFromTrash,
  MdRestore,
} from "react-icons/md";
import { motion } from "framer-motion";
import { useMailStore } from "../../../../store/useMailStore";
import { useNavigate } from "react-router-dom";
import { LuArchiveRestore, LuRefreshCcw } from "react-icons/lu";

const SentBinMessages = () => {
  const {
    getTrashEmails,
    trashEmails,
    getMailById,
    searchQuery,
    removeTrash,
    toggleTrash,
  } = useMailStore();
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchTrash = async () => {
    setLoading(true);
    await getTrashEmails();
    setSelectedEmails([]);
    setLoading(false);
  };

  useEffect(() => {
    fetchTrash();
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
    for (const id of selectedEmails) {
      await toggleTrash(id);
    }
    fetchTrash();
  };
  const handleBulkDelete = async () => {
    if (selectedEmails.length === 0) return;

    for (let id of selectedEmails) {
      await removeTrash(id);
    }

    fetchTrash(); // Refresh after deletion
  };

  const filteredEmails = trashEmails.filter(
    (email) =>
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.receiver?.fullName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 max-w-full overflow-x-hidden">
      <div className="flex justify-between items-center mb-4">
        <div className="flex  items-center">
          <button
            className={`p-2 rounded-full hover:bg-gray-100 cursor-pointer transition duration-200 ease-in-out ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={fetchTrash}
          >
            <LuRefreshCcw
              className={`${loading ? "animate-spin" : ""}`}
              size={"20px"}
            />
          </button>
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
            <LuArchiveRestore size={"18px"} />
          </button>
          <button
            onClick={handleBulkDelete}
            disabled={selectedEmails.length === 0}
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

      {loading ? (
        <div className="text-center text-gray-400 mt-6 animate-pulse">
          Loading trash...
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
            >
              <div className="flex items-center gap-3">
              
                <div
                  className="text-gray-500 cursor-pointer"
                  onClick={() => toggleSelect(email._id)}
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
                >
                  <h1 className="font-semibold">
                    {email.sender?.fullName || "Unknown Receiver"}
                  </h1>
                </div>
              </div>
              <div
                className="flex-1 ml-4"
                onClick={() => handleClick(email._id)}
              >
                <p className="text-gray-600 truncate max-w-full cursor-pointer">
                  {email.subject} —{" "}
                  {email.body.length > 100
                    ? `${email.body.slice(0, 100)}...`
                    : email.body}
                </p>
              </div>
              <div className="text-gray-400 text-sm">
                <p>{new Date(email.createdAt).toLocaleDateString()}</p>
              </div>
            </motion.div>
          );
        })
      ) : (
        <p className="text-center text-gray-500 mt-4">No emails found</p>
      )}
    </div>
  );
};

export default SentBinMessages;
