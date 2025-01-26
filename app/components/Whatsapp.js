"use client";
import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

const Whatsapp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const chatBoxRef = useRef(null);

  const suggestions = [
    "Can you tell me more about your services?",
    "What are your pricing options?",
    "How do I get started?",
    "Can I schedule a consultation?",
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatBoxRef.current && !chatBoxRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSend = () => {
    if (inputMessage.trim()) {
      const whatsappNumber = "+971502100626"; // Replace with your WhatsApp number
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        inputMessage
      )}`;
      window.open(whatsappURL, "_blank");
      setInputMessage("");
    }
  };

  const handleSuggestionClick = (text) => {
    setInputMessage(text);
  };

  return (
    <div className="fixed md:bottom-[10%] bottom-[12%] right-5 z-50" ref={chatBoxRef}>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#075E54] p-4 rounded-full shadow-lg text-white"
        >
          <MessageCircle size={26} />
        </button>
      )}

      {isOpen && (
        <div className="w-80 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-[#075E54] p-4 flex justify-between items-center">
            <h2 className="text-white text-lg font-montserratMedium">WhatsApp</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-300"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-4">
            <p className="text-gray-700 mb-3 font-montserratSemiBold text-sm">
              Quick Suggestions:
            </p>
            <div className="grid grid-cols-1 gap-3">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="block w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-200 hover:shadow-md transition-all font-montserratRegular text-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 border-t flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#075E54] font-montserratRegular text-sm"
            />
            <button
              onClick={handleSend}
              className="bg-[#075E54] text-white px-4 py-[10px] rounded-lg transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Whatsapp;