import React, { useEffect, useState } from "react";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdDeleteOutline,
} from "react-icons/md";
import { motion } from "framer-motion";
import { useMailStore } from "../../../../store/useMailStore";
import { useNavigate } from "react-router-dom";
import { LuRefreshCcw } from "react-icons/lu";

const SentDraftMessages = () => {
  const { getDraftEmails, draftEmails, getMailById, searchQuery , removeDraft } =
    useMailStore();

  const [selectedEmails, setSelectedEmails] = useState([]);
  const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const fetchDrafts = async (pageNumber = 1) => {
    setLoading(true);
    await getDraftEmails(pageNumber);
    setPage(pageNumber);
    setLoading(false);
  };


  useEffect(() => {
    fetchDrafts(1);
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

  const removeDraftSelected = async (id) => {
    try {
      await removeDraft(id);
    } catch (err) {
      console.error("Failed to remove draft:", err.message);
    }
    fetchDrafts(page);
  };

  const { currentPage, totalPages, mails = [] } = draftEmails || {};

  const filteredEmails = mails.filter((email) => {
    if (!email) return false;
  
    const subject = email.subject?.toLowerCase() || "";
    const body = email.body?.toLowerCase() || "";
    const receiverName = email.receiver?.fullName?.toLowerCase() || "";
    const search = searchQuery.toLowerCase();
  
    return (
      subject.includes(search) ||
      body.includes(search) ||
      receiverName.includes(search)
    );
  });
  
  // const filteredEmails = draftEmails.filter(
  //   (email) =>
  //     email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     email.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     email.receiver?.fullName
  //       ?.toLowerCase()
  //       .includes(searchQuery.toLowerCase())
  // );

  return (
    <div className="p-4 max-w-full overflow-x-hidden">
      <div className="flex justify-between items-center mb-4">
        <div className="flex  items-center">
          <button
             className={`p-2 rounded-full hover:bg-gray-100 cursor-pointer transition duration-200 ease-in-out ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={!loading ? () => fetchDrafts(page) : undefined}
          >
            <LuRefreshCcw className={`${loading ? "animate-spin" : ""}`} size={"20px"} />
          </button>
          {loading && (
            <span className="ml-2 text-sm text-gray-500 animate-pulse">
              Refreshing...
            </span>
          )}
          <button
  onClick={async () => {
    for (const id of selectedEmails) {
      await removeDraftSelected(id);
    }
    setSelectedEmails([]);
  }}
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
          Loading drafts...
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

                 {/* Pagination Controls */}
                 {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={() => fetchDrafts(page - 1)}
            disabled={page <= 1 || loading}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
          >
            Prev
          </button>
          <span className="self-center text-sm font-medium text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => fetchDrafts(page + 1)}
            disabled={page >= totalPages || loading}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SentDraftMessages;
