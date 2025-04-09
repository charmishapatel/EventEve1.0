"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Login from "@/app/components/Popup/page";
import { useRouter } from "next/navigation";

export default function Header({ isHomePage }) {
  const router = useRouter();
  const [isLoginPopupVisible, setLoginPopupVisible] = useState(false);

  const handleProfileClick = () => {
    setLoginPopupVisible(!isLoginPopupVisible);
  };

  const handleCartButton = () => {
    router.push(`/User/Cart`);
  };

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const count = parseInt(localStorage.getItem("cartCount") || "0");
      setCartCount(count);
    };

    updateCount(); // Initial load
    window.addEventListener("cartCountUpdated", updateCount);

    return () => {
      window.removeEventListener("cartCountUpdated", updateCount);
    };
  }, []);

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

          {/* Search Icon */}
          <Image
            src="/images/search.png"
            alt="Search"
            width={24}
            height={24}
            className={`cursor-pointer hover:opacity-75 ${isHomePage ? "invert" : ""}`}
          />

          {/* Cart Icon with Count */}
          <div className="relative cursor-pointer" onClick={handleCartButton}>
            <Image
              src="/images/cart.png"
              alt="Shopping Cart"
              width={24}
              height={24}
              className={`hover:opacity-75 ${isHomePage ? "invert" : ""}`}
            />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2">
                {cartCount}
              </span>
            )}
          </div>

          {/* Profile Icon */}
          <Image
            src="/images/profile.png"
            alt="User Profile"
            width={24}
            height={24}
            className={`cursor-pointer hover:opacity-75 ${isHomePage ? "invert" : ""}`}
            onClick={handleProfileClick}
          />
        </div>
      </header>

      {/* Conditional rendering of login popup */}
      {isLoginPopupVisible && <Login />}
    </>
  );
}