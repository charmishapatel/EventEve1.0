"use client";
import React, { useEffect, useState } from "react";
// import HeaderHomePage from "@/app/components/HeaderHomepage/page";
import Header from "@/app/components/Header/page";


export default function Homepage() {
  const [scrolling, setScrolling] = useState(false);

  const handleScroll = () => {
    // Update scrolling state based on window scroll position
    if (window.scrollY > 15) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative">
    <Header isHomePage={true} />

      {/* Hero Section with background image */}
      <div
        className="bg-cover bg-center flex items-center relative text-white"
        style={{
          backgroundImage: "url('/images/background.jpeg')",
          height: "100vh", // Takes the full viewport height
        }}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 pl-12 text-left">
          {/* EventEve Title */}
          <h1
            className={`text-7xl  transition-all duration-500 ease-in-out ${
              scrolling ? "absolute top-0 left-1/2 transform -translate-x-1/2 z-20 opacity-0" : "relative z-10"
            }`}
            style={{
              fontFamily: "Allura, cursive",
              fontSize: scrolling ? "3rem" : "7rem", // Reduce size on scroll
              transition: "font-size 0.5s ease, opacity 0.5s ease", // Smooth transition
            }}
          >
            EventEve
          </h1>

          {/* Slogan */}
          <p className="text-3xl font-light" style={{ fontFamily: "Montez, cursive" }}>
            Plan your event with us
          </p>
        </div>
      </div>

      {/* Scrollable Promotions Section */}
      {/* <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-semibold text-center mb-8">Exclusive Promotions</h2>
          <div className="flex flex-wrap justify-center gap-8">
           
            <div className="bg-gray-200 p-6 rounded-lg shadow-md max-w-xs w-full">
              <h3 className="text-2xl font-semibold mb-4">Spring Event Special</h3>
              <p className="text-lg">Get 20% off on all bookings made this month.</p>
            </div>
           
            <div className="bg-gray-200 p-6 rounded-lg shadow-md max-w-xs w-full">
              <h3 className="text-2xl font-semibold mb-4">Free Consultation</h3>
              <p className="text-lg">Book now and get a free event consultation.</p>
            </div>
          </div>
        </div>
      </div> */}
      
    </div>
  );
}
