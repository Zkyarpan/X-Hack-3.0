import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const SellerChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "farmer",
      text: "Hello! I have freshly harvested tomatoes. Would you be interested in purchasing?",
      time: "09:30 AM",
    },
    {
      id: 2,
      sender: "seller",
      text: "Hi! Yes, I'm interested. What's the quantity and price per kg?",
      time: "09:31 AM",
    },
    {
      id: 3,
      sender: "farmer",
      text: "I have 100 kg available at ₹40 per kg. They're organic and Grade A quality.",
      time: "09:32 AM",
    },
    {
      id: 4,
      sender: "seller",
      text: "Can you do ₹35 per kg if I take the entire lot?",
      time: "09:33 AM",
    },
    {
      id: 5,
      sender: "farmer",
      text: "How about ₹38? They're really fresh and high quality.",
      time: "09:34 AM",
    },
  ]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "seller",
          text: message,
          time: new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
        },
      ]);
      setMessage("");
    }
  };

  // Updated theme-related classes for light mode
  return (
    <div className="flex gap-1 bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="flex h-[calc(100vh-64px)]">
          {/* Chat List */}
          <div className="w-80 bg-white border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search chats..."
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <svg
                  className="w-5 h-5 absolute right-3 top-3.5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <div className="overflow-y-auto">
              {["Farmer John", "Farmer Sarah", "Farmer Mike"].map(
                (name, idx) => (
                  <div
                    key={idx}
                    className={`p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-all
                  ${idx === 0 ? "bg-blue-50" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 
                    flex items-center justify-center text-white font-medium shadow-sm"
                      >
                        {name[0]}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{name}</h3>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <p className="text-sm text-gray-600">Active now</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-white">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 
                  flex items-center justify-center text-white shadow-sm"
                  >
                    F
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Farmer John</h3>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <p className="text-sm text-gray-600">Typing...</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "seller" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] ${
                      msg.sender === "seller"
                        ? "bg-blue-600 text-white rounded-l-2xl rounded-tr-2xl"
                        : "bg-white text-gray-900 rounded-r-2xl rounded-tl-2xl border border-gray-200"
                    } p-4 shadow-sm`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                    <p
                      className={`text-xs mt-2 ${
                        msg.sender === "seller"
                          ? "text-blue-100"
                          : "text-gray-500"
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={sendMessage}
              className="p-4 bg-white border-t border-gray-200"
            >
              <div className="flex gap-3 items-center">
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 rounded-xl bg-gray-100 text-gray-800 placeholder-gray-500
                  focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700
                  transform hover:scale-[1.02] transition-all flex items-center gap-2 shadow-sm"
                >
                  <span>Send</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerChat;
