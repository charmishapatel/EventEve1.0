"use client";
import { useState } from "react";
import ChatBotBox from "./ChatBotBox";

export default function ChatBotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen && <ChatBotBox onClose={() => setIsOpen(false)} />}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-purple-600 w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
      >
        <img src="/images/chatbot-avatar.jpg" alt="Chat Icon" className="w-8 h-8" />
      </button>
    </div>
  );
}
