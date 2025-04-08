"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import Next.js router
import Header from "../../components/Header/page";

const sections = [
  { title: "Profile", icon: "/images/user.png", path: "/Vendor/Profile" },
  { title: "Document", icon: "/images/docs.png", path: "/Vendor/Document" },
  { title: "Contract", icon: "/images/contract.png", path: "/Vendor/Contract" },
  { title: "Sales", icon: "/images/sale.png", path: "/Vendor/Sales" },
  { title: "Support", icon: "/images/support.png", path: "/Vendor/Support" },
];

export default function Dashboard() {
  const [scrolling, setScrolling] = useState(false);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative">
      <Header showLogo={scrolling} />

      <div className="flex flex-col items-center justify-center bg-white min-h-screen p-8 border">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center w-40 h-40 bg-white shadow-lg rounded-lg p-4 border hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => router.push(section.path)} // Navigate when clicked
            >
              <img src={section.icon} alt={section.title} className="w-16 h-16 mb-2" />
              <h3 className="text-lg font-semibold">{section.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
