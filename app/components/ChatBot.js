"use client";
import React, { useEffect, useRef, useState } from "react";
import { Bot, Send, X } from "lucide-react";
import { getChatResponse } from "@/app/api/chat/gemini";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatBotRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatBotRef.current && !chatBotRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formatResponse = (response) => {
    return response
      .replace(/(?:\r\n|\r|\n)/g, "<br>")
      .trim();
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      const userMessage = { id: Date.now(), sender: "user", text: input };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInput("");
      setIsLoading(true);

      try {
        const botResponse = await getChatResponse(input);
        const formattedResponse = formatResponse(botResponse);

        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now(), sender: "bot", text: formattedResponse },
        ]);
      } catch (error) {
        console.error("Error fetching bot response:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now(), sender: "bot", text: "Sorry, something went wrong!" },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50" ref={chatBotRef}>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#075E54] p-4 rounded-full shadow-lg text-white"
        >
          <Bot size={26} />
        </button>
      )}

      {isOpen && (
        <div className="w-80 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-[#075E54] p-4 flex justify-between items-center">
            <h2 className="text-white font-semibold text-lg font-montserratMedium">
              Ask AI
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-300"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-4 space-y-4 h-80 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "bot" ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`${
                    msg.sender === "bot"
                      ? "bg-gray-200 text-black"
                      : "bg-black text-white"
                  } p-3 rounded-lg max-w-xs font-montserratRegular text-sm`}
                  dangerouslySetInnerHTML={{ __html: msg.text }} // Support HTML for formatting
                />
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-black p-3 rounded-lg max-w-xs font-montserratRegular text-sm">
                  Typing...
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="w-full px-4 py-2 border rounded-md font-montserratRegular text-sm"
            />
            <button
              onClick={handleSendMessage}
              className="bg-[#075E54] text-white px-4 py-[10px] rounded-lg"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;