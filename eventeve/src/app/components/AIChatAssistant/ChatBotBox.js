"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import matchIntent from "./IntentMatcher";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

const ChatBotBox = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [cart, setCart] = useState([]);
  const messagesEndRef = useRef(null);
  const router = useRouter();

  const items = [
    { category: "cake", itemid: "themed_cake", name: "Themed Cake", price: 120 },
    { category: "cake", itemid: "wedding_cake", name: "Wedding Cake", price: 250 },
    { category: "cake", itemid: "birthday_cake", name: "Birthday Cake", price: 40 },
    { category: "cake", itemid: "cupcake_tower", name: "Cupcake Tower", price: 60 },
    { category: "decoration", itemid: "themed_backdrops", name: "Themed Backdrops", price: 150 },
    { category: "decoration", itemid: "balloon_decorations", name: "Balloon Decorations", price: 50 },
    { category: "decoration", itemid: "floral_archway", name: "Floral Archway", price: 200 },
    { category: "decoration", itemid: "stage_decorations", name: "Stage Decorations", price: 500 },
    { category: "furniture", itemid: "round_tables", name: "Round Tables", price: 50 },
    { category: "furniture", itemid: "banquet_chairs", name: "Banquet Chairs", price: 10 },
    { category: "furniture", itemid: "luxury_sofa", name: "Luxury Sofa", price: 500 },
    { category: "furniture", itemid: "wedding_thrones", name: "Wedding Thrones", price: 700 },
    { category: "flower", itemid: "rose_bouquet", name: "Rose Bouquet", price: 25 },
    { category: "flower", itemid: "orchid_arrangement", name: "Orchid Arrangement", price: 40 },
    { category: "flower", itemid: "mixed_flower_basket", name: "Mixed Floral Basket", price: 35 },
    { category: "flower", itemid: "table_centerpieces", name: "Table Centerpieces", price: 50 },
    { category: "catering", itemid: "dessert_bar", name: "Dessert Bar", price: 30 },
    { category: "catering", itemid: "vegetarian_meals", name: "Vegetarian Meals", price: 15 },
    { category: "catering", itemid: "buffet_package", name: "Buffet Package", price: 20 },
    { category: "catering", itemid: "gourmet_platter", name: "Gourmet Platter", price: 50 },
    { category: "music", itemid: "acoustic_band", name: "Acoustic Band", price: 500 },
    { category: "music", itemid: "jazz_band", name: "Jazz Band", price: 700 },
    { category: "music", itemid: "rock_band", name: "Rock Band", price: 800 },
    { category: "music", itemid: "live_dj", name: "Live DJ", price: 300 }
  ];

  useEffect(() => {
    const saved = localStorage.getItem("chatHistory");
    setMessages(saved ? JSON.parse(saved) : [{ sender: "bot", text: "👋 Hi! I'm Claude — your assistant. Ask me about services, bookings, or your cart." }]);
    const savedCart = localStorage.getItem("user-cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => localStorage.setItem("chatHistory", JSON.stringify(messages)), [messages]);
  useEffect(() => localStorage.setItem("user-cart", JSON.stringify(cart)), [cart]);
  useEffect(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages(prev => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setIsTyping(true);

    const lower = userMessage.toLowerCase();
    const priceMatch = lower.match(/(?:under|below)\s*\$?(\d+)/i);
    const allCategories = [...new Set(items.map(i => i.category))];
    const categoryMatch = allCategories.find(cat => lower.includes(cat));

    // ✅ Price + Category
    if (priceMatch && categoryMatch) {
      const limit = parseInt(priceMatch[1]);
      const filtered = items.filter(i => i.category === categoryMatch && i.price <= limit);

      if (filtered.length === 1) {
        setMessages(prev => [...prev, { sender: "bot", text: `🔍 Only one match found: ${filtered[0].name}. Redirecting to details...` }]);
        setTimeout(() => router.push(`/User/ItemDetails/${filtered[0].itemid}`), 1000);
      } else if (filtered.length > 1) {
        const reply = `🎯 ${categoryMatch.toUpperCase()} items under $${limit}:\n` + filtered.map(i => `• ${i.name} – $${i.price}`).join("\n");
        setMessages(prev => [...prev, { sender: "bot", text: reply }]);
      } else {
        setMessages(prev => [...prev, { sender: "bot", text: `❌ No ${categoryMatch} items found under $${limit}.` }]);
      }
      setIsTyping(false);
      return;
    }

    // ✅ Price only
    if (priceMatch && !categoryMatch) {
      const limit = parseInt(priceMatch[1]);
      const filtered = items.filter(i => i.price <= limit);

      if (filtered.length === 1) {
        setMessages(prev => [...prev, { sender: "bot", text: `🛒 Only one item under $${limit}: ${filtered[0].name}. Redirecting...` }]);
        setTimeout(() => router.push(`/User/ItemDetails/${filtered[0].itemid}`), 1000);
      } else if (filtered.length > 1) {
        const reply = `📦 Items under $${limit}:\n` + filtered.map(i => `• ${i.name} – $${i.price}`).join("\n");
        setMessages(prev => [...prev, { sender: "bot", text: reply }]);
      } else {
        setMessages(prev => [...prev, { sender: "bot", text: `❌ No items found under $${limit}.` }]);
      }
      setIsTyping(false);
      return;
    }

    // Add to cart
    const qtyMatch = lower.match(/add\s*(\d*)\s*(.*?)\s*(to cart)?$/i);
    if ((lower.includes("add") || lower.includes("cart")) && qtyMatch) {
      const quantity = qtyMatch[1] ? parseInt(qtyMatch[1]) : 1;
      const keyword = qtyMatch[2].trim();
      const item = items.find(i => i.name.toLowerCase().replace(/\s+/g, "").includes(keyword.toLowerCase().replace(/\s+/g, "")));
      if (item) {
        const existing = cart.find(c => c.name === item.name);
        const updatedCart = existing
          ? cart.map(c => c.name === item.name ? { ...c, quantity: c.quantity + quantity } : c)
          : [...cart, { ...item, quantity }];
        setCart(updatedCart);

        try {
          await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/cart`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userid: 1,
              itemid: item.itemid,
              name: item.name,
              price: item.price,
              imageurl: "/images/default.jpg",
              quantity
            })
          });
          setMessages(prev => [...prev, { sender: "bot", text: `🛒 Added ${quantity} x ${item.name} to your cart.` }]);
        } catch {
          setMessages(prev => [...prev, { sender: "bot", text: `❌ Failed to add ${item.name} to cart.` }]);
        }
        setIsTyping(false);
        return;
      } else {
        setMessages(prev => [...prev, { sender: "bot", text: `❌ Couldn't find or add that item.` }]);
        setIsTyping(false);
        return;
      }
    }

    // View Cart
    if (lower.includes("view cart") || lower.includes("show cart")) {
      const summary = cart.length
        ? cart.map(i => `🧺 ${i.quantity} x ${i.name} – $${i.price * i.quantity}`).join("\n")
        : "🛒 Your cart is empty.";
      setMessages(prev => [...prev, { sender: "bot", text: summary }]);
      setIsTyping(false);
      return;
    }

    // Direct item search
    const matchedItem = items.find(i => lower.includes(i.name.toLowerCase()));
    if (matchedItem) {
      setMessages(prev => [...prev, { sender: "bot", text: `🔍 Navigating to ${matchedItem.name} details page...` }]);
      setTimeout(() => router.push(`/User/ItemDetails/${matchedItem.itemid}`), 800);
      setIsTyping(false);
      return;
    }

    // Intent match
    const { reply, path } = matchIntent(userMessage);
    if (reply !== null && path === null) {
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: "bot", text: reply }]);
        setIsTyping(false);
      }, 700);
    } else if (path) {
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: "bot", text: reply }]);
        setIsTyping(false);
        setTimeout(() => router.push(path), 1000);
      }, 700);
    } else {
      try {
        const res = await fetch("/api/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: userMessage })
        });
        const data = await res.json();
        setMessages(prev => [...prev, { sender: "bot", text: data.answer || "I'm not sure how to help with that." }]);
      } catch {
        setMessages(prev => [...prev, { sender: "bot", text: "⚠️ Sorry, something went wrong." }]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const suggestions = [
    { label: "Show services", emoji: "📋" },
    { label: "Login", emoji: "🔐" },
    { label: "Book a service", emoji: "📅" },
    { label: "View cart", emoji: "🛒" },
  ];

  return (
    <div className="fixed bottom-24 right-6 w-80 max-h-[90vh] rounded-3xl shadow-xl bg-white border border-gray-200 z-50 flex flex-col overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-purple-400 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/images/chatbot-avatar.jpg" alt="Bot" className="w-8 h-8 rounded-full border" />
          <div>
            <div className="text-white font-semibold">Claude</div>
            <div className="text-xs text-purple-100">AI Assistant</div>
          </div>
        </div>
        <button onClick={onClose} className="text-white text-xl font-bold">×</button>
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-white text-sm">
        {messages.map((msg, i) => (
          <div key={i} className={`px-4 py-2 rounded-2xl max-w-[80%] ${msg.sender === "bot" ? "bg-gray-100 text-gray-800" : "ml-auto bg-gradient-to-r from-purple-600 to-purple-400 text-white"}`}>
            {msg.text}
          </div>
        ))}
        {isTyping && <div className="text-gray-400 text-xs pl-2 animate-pulse">Claude is typing...</div>}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t bg-white flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 text-sm"
        />
        <button onClick={sendMessage} className="text-purple-600 hover:text-purple-800">
          <PaperPlaneIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="p-3 pt-2 border-t bg-white flex flex-wrap gap-2">
        {suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => {
              setInput(s.label);
              sendMessage();
            }}
            className="flex items-center gap-1 text-xs bg-purple-50 border border-purple-200 px-3 py-1 rounded-full hover:bg-purple-100 transition"
          >
            <span>{s.emoji}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatBotBox;
