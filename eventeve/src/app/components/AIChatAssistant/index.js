"use client";
import { useState } from "react";
import ChatBotBox from "./ChatBotBox";
import Image from "next/image";

export default function ChatBotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && <ChatBotBox onClose={() => setIsOpen(false)} />}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 p-4 rounded-full shadow-lg z-50 flex items-center justify-center"
      >
        <Image
          src="/images/chatbot-avatar.jpg"
          alt="ChatBot Icon"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
      </button>
    </>
  );
}
