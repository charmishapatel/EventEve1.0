"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Login from "@/app/components/Popup/page";
import { useRouter } from "next/navigation"; // Import useRouter

export default function Header({ isHomePage }) {

  const router = useRouter(); // Initialize router
  const [isLoginPopupVisible, setLoginPopupVisible] = useState(false);

  const handleProfileClick = () => {
    setLoginPopupVisible(!isLoginPopupVisible);
  };

  const handleCartButton = () => {
    router.push(`/User/Cart`); 
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-8 py-4 z-50 transition-all duration-500 ease-in-out bg-transparent`}
      >
        {/* Logo */}
        <h1
          className={`text-3xl italic ${
            isHomePage ? "text-white" : "text-black"
          }`}
          style={{ fontFamily: "Allura, cursive" }}
        >
          EventEve
        </h1>

        {/* Navigation */}
        <div className="flex items-center space-x-5">
          <nav className="flex space-x-6 font-bold">
            <Link
              href="/User/HomePage"
              className={`${
                isHomePage ? "text-white hover:text-gray-300" : "text-black hover:text-gray-600"
              }`}
            >
              HOME
            </Link>
            <Link
              href="/User/Services"
              className={`${
                isHomePage ? "text-white hover:text-gray-300" : "text-black hover:text-gray-600"
              }`}
            >
              SERVICES
            </Link>
          </nav>

          {/* Icons */}
          <Image
            src="/images/search.png"
            alt="Search"
            width={24}
            height={24}
            className={`cursor-pointer hover:opacity-75 ${
              isHomePage ? "invert" : ""
            }`}
          />

          <Image
            src="/images/cart.png"
            alt="Shopping Cart"
            width={24}
            height={24}
            className={`cursor-pointer hover:opacity-75 ${
              isHomePage ? "invert" : ""
            }`}
            onClick={handleCartButton}
          />

          <Image
            src="/images/profile.png"
            alt="User Profile"
            width={24}
            height={24}
            className={`cursor-pointer hover:opacity-75 ${
              isHomePage ? "invert" : ""
            }`}
            onClick={handleProfileClick}
          />

        </div>
      </header>

      {/* Conditional rendering of login popup */}
      {isLoginPopupVisible && <Login />}
    </>
  );
}
