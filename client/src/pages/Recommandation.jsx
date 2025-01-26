import React, { useState } from "react";
import { Send, Loader, Leaf, Sun, Cloud, Droplets } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import axios from "axios";

const Recommendation = () => {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content:
        "Welcome to AgriFriend! I'm here to help with crop recommendations, soil analysis, weather patterns, and sustainable farming practices. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const categories = [
    { icon: <Leaf className="w-5 h-5" />, label: "Crops" },
    { icon: <Sun className="w-5 h-5" />, label: "Weather" },
    { icon: <Cloud className="w-5 h-5" />, label: "Soil" },
    { icon: <Droplets className="w-5 h-5" />, label: "Irrigation" },
  ];

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/tunedModels/tunev3-xpqcltpc3vjs:generateContent?key=AIzaSyA6qieUZi_5Zl6yE_LpsW3sOStNqm1m5fE",
        {
          contents: [
            {
              parts: [
                {
                  text: input,
                },
              ],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const aiResponseContent =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response received.";
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: aiResponseContent },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: "Sorry, there was an error processing your request.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    setInput(`Tell me about ${category.label.toLowerCase()} in agriculture`);
  };

  return (
    <div className="flex gap-1 bg-gradient-to-br from-green-50 to-gray-50 h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Topbar />
        <div className="flex-1 p-4 flex flex-col">
          <div className="grid grid-cols-4 gap-4 mb-4">
            {categories.map((category) => (
              <button
                key={category.label}
                onClick={() => handleCategoryClick(category)}
                className="flex items-center justify-center gap-2 p-3 bg-white rounded-lg shadow-sm hover:bg-green-50 transition-colors"
              >
                <div className="text-green-600">{category.icon}</div>
                <span className="font-medium text-gray-700">
                  {category.label}
                </span>
              </button>
            ))}
          </div>

          <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-4 overflow-y-auto mb-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {message.role === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                      <Leaf className="w-4 h-4 text-green-600" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-green-600 text-white"
                        : "bg-gradient-to-r from-green-50 to-gray-50 text-gray-800 border border-green-100"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gradient-to-r from-green-50 to-gray-50 rounded-lg p-3">
                    <Loader className="w-5 h-5 animate-spin text-green-600" />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask about crops, soil health, weather patterns, or sustainable farming..."
                className="flex-1 p-2 border border-green-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/50"
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
