
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Login from "@/app/components/Popup/page";
import { useRouter } from "next/navigation";


export default function Header({ isHomePage }) {
  const router = useRouter();
  const [isLoginPopupVisible, setLoginPopupVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleProfileClick = () => {
    setLoginPopupVisible(!isLoginPopupVisible);
  };

  const handleCartButton = () => {
    router.push(`/User/Cart`);
  };

  useEffect(() => {
    const updateCount = () => {
      const count = parseInt(localStorage.getItem("cartCount") || "0");
      setCartCount(count);
    };

    updateCount();
    window.addEventListener("cartCountUpdated", updateCount);
    return () => window.removeEventListener("cartCountUpdated", updateCount);
  }, []);

  return (
    <>
      {/* Header bar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-transparent px-4 sm:px-8 py-4 flex items-center">
        {/* Logo */}
        <h1
          className={`text-3xl italic ${isHomePage ? "text-white" : "text-black"}`}
          style={{ fontFamily: "Allura, cursive" }}
        >
          EventEve
        </h1>

        {/* RIGHT SIDE (Nav + Icons - only on md and up) */}
        <div className="ml-auto hidden md:flex items-center space-x-6 font-bold">
          {/* Nav Links */}
          <Link
            href="/User/HomePage"
            className={`${isHomePage ? "text-white hover:text-gray-300" : "text-black hover:text-gray-600"}`}
          >
            HOME
          </Link>
          <Link
            href="/User/Services"
            className={`${isHomePage ? "text-white hover:text-gray-300" : "text-black hover:text-gray-600"}`}
          >
            SERVICES
          </Link>

          {/* Search */}
          <Image
            src="/images/search.png"
            alt="Search"
            width={24}
            height={24}
            className={`cursor-pointer hover:opacity-75 ${isHomePage ? "invert" : ""}`}
          />

          {/* Cart */}
          <div className="relative cursor-pointer" onClick={handleCartButton}>
            <Image
              src="/images/cart.png"
              alt="Cart"
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

          {/* Profile */}
          <Image
            src="/images/profile.png"
            alt="Profile"
            width={24}
            height={24}
            className={`cursor-pointer hover:opacity-75 ${isHomePage ? "invert" : ""}`}
            onClick={handleProfileClick}
          />
        </div>

        {/* Hamburger (mobile only) */}
        <div className="ml-auto md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <svg
              className={`w-6 h-6 ${isHomePage ? "text-white" : "text-black"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

{menuOpen && (
  <div className="md:hidden absolute top-20 right-4 w-60 bg-white rounded-xl shadow-xl z-50 flex flex-col items-center py-6 space-y-6">
    {/* Links */}
    <Link href="/User/HomePage" className="text-base font-semibold text-black hover:text-purple-600">
      HOME
    </Link>
    <Link href="/User/Services" className="text-base font-semibold text-black hover:text-purple-600">
      SERVICES
    </Link>

    {/* Icons */}
    <div className="flex items-center space-x-5">
      {/* Search */}
      <button className="hover:opacity-75">
        <Image src="/images/search.png" alt="Search" width={24} height={24} />
      </button>

      {/* Cart */}
      <div className="relative hover:opacity-75 cursor-pointer" onClick={handleCartButton}>
        <Image src="/images/cart.png" alt="Cart" width={24} height={24} />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2">
            {cartCount}
          </span>
        )}
      </div>

      {/* Profile */}
      <button onClick={handleProfileClick} className="hover:opacity-75">
        <Image src="/images/profile.png" alt="Profile" width={24} height={24} />
      </button>
    </div>
  </div>
)}



      {/* Login Popup */}
      {isLoginPopupVisible && <Login />}
    </>
  );
}