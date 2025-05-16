import React, { useState, useEffect, useRef } from "react";
import { useMailStore } from "../../../../store/useMailStore";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";

const SendEmail = () => {
  const {
    isOpen,
    toggleModal,
    sendMail,
    sendDraft,
    getAllUser,
    users,
  } = useMailStore();

  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    message: "",
  });
  const [receiverId, setReceiverId] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    getAllUser();
  }, [getAllUser]);

  useEffect(() => {
    console.log("Loaded users in component:", users);
  }, [users]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "to") {
      const inputValue = value.trim().toLowerCase();
      setDropdownVisible(true);
      console.log("Input value:", inputValue);

      if (inputValue.length >= 1 && Array.isArray(users)) {
        const filtered = users.filter((user) => {
          const email = user.Email?.toLowerCase() || "";
          return email.includes(inputValue);
        });

        setFilteredUsers(filtered);
        console.log("Filtered users:", filtered);
      } else {
        setFilteredUsers([]);
      }
    }
  };

  const handleSelectUser = (user) => {
    setFormData((prev) => ({ ...prev, to: user.Email }));
    setReceiverId(user._id);
    setDropdownVisible(false);
    toast.success(`Recipient selected: ${user.Email}`);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!receiverId) {
      toast.error("Please select a recipient from the dropdown");
      return;
    }
    if (!formData.subject.trim()) {
      toast.error("Subject cannot be empty");
      return;
    }
    if (!formData.message.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    const sendMailData = {
      receiverIds: [receiverId],
      subject: formData.subject,
      body: formData.message,
      attachments: "",
    };

    try {
      await sendMail(sendMailData);
      toast.success("Email sent successfully!");
      setFormData({ to: "", subject: "", message: "" });
      setReceiverId(null);
      toggleModal();
    } catch (error) {
      toast.error("Failed to send email. Please try again.");
      console.error("Failed to send email:", error);
    }
  };

  const handleSendDraft = async (e) => {
    e.preventDefault();

    if (!receiverId) {
      toast.error("Please select a recipient from the dropdown");
      return;
    }
    if (!formData.subject.trim()) {
      toast.error("Subject cannot be empty");
      return;
    }
    if (!formData.message.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    const sendDraftData = {
      receiverIds: [receiverId],
      subject: formData.subject,
      body: formData.message,
      attachments: "",
    };

    try {
      await sendDraft(sendDraftData);
      toast.success("Draft saved successfully!");
      setFormData({ to: "", subject: "", message: "" });
      setReceiverId(null);
      toggleModal();
    } catch (error) {
      toast.error("Failed to save draft. Please try again.");
      console.error("Failed to send draft:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 w-[420px] bg-white rounded-lg overflow-hidden z-50 border border-gray-200">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
        <span className="text-sm font-medium text-gray-700">New Message</span>
        <button onClick={toggleModal} type="button">
          <IoClose className="text-gray-500 hover:text-gray-700" size={20} />
        </button>
      </div>

      <form onSubmit={submitHandler} className="flex flex-col gap-2 px-4 py-3">
        <div className="relative">
          <input
            ref={inputRef}
            name="to"
            value={formData.to}
            onChange={changeHandler}
            onFocus={() => setDropdownVisible(true)}
            placeholder="To"
            className="text-sm border-none focus:ring-0 p-1 outline-none placeholder-gray-500 w-full"
            autoComplete="off"
          />

          {dropdownVisible && (
            <div
              ref={dropdownRef}
              className="absolute top-10 left-0 right-0 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg z-10"
            >
              {filteredUsers.length > 0 ? (
                <ul className="text-sm">
                  {filteredUsers.map((user) => (
                    <li
                      key={user._id}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSelectUser(user)}
                    >
                      {user.Email}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-3 py-2 text-gray-500">No users found</p>
              )}
            </div>
          )}
        </div>

        <input
          name="subject"
          value={formData.subject}
          onChange={changeHandler}
          placeholder="Subject"
          className="text-sm border-none focus:ring-0 p-1 outline-none placeholder-gray-500"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={changeHandler}
          rows={8}
          placeholder="Message"
          className="text-sm border-none focus:ring-0 p-1 outline-none placeholder-gray-500 resize-none"
        />

        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={handleSendDraft}
            className="bg-blue-600 text-white text-sm font-medium px-4 py-1.5 rounded-md hover:bg-blue-700"
          >
            Send Draft
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white text-sm font-medium px-4 py-1.5 rounded-md hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendEmail;
