"use client";
import React, { useEffect, useState } from "react";
import Header from "@/app/components/Header/page";
import { FaLinkedin } from "react-icons/fa";

export default function Homepage() {
  const [scrolling, setScrolling] = useState(false);

  const handleScroll = () => {
    setScrolling(window.scrollY > 15);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const people = [
    {
      name: "Arsalan Fahim",
      role: "Supporter",
      image: "/images/default.jpg",
      phone: "+1-437-868-1010",
      email: "patelsahaj1430@gmail.com",
      linkedin: "https://linkedin.com/in/sahajpatel",
    },
    {
      name: "Charmisha Patel",
      role: "Team Lead / Full Stack Developer",
      image: "/images/charmisha.jpg",
      phone: "+1-368-299-0025",
      email: "charmisha0109@gmail.com",
      linkedin: "https://www.linkedin.com/in/charmisha-patel",
    },
    {
      name: "Harsh Golakhiya",
      role: "Backend Developer",
      image: "/images/default.jpg",
      phone: "+1-000-000-0002",
      email: "raj@example.com",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Harshdeep Kaur",
      role: "Full Stack Developer",
      image: "/images/default.jpg",
      phone: "+1-000-000-0003",
      email: "milan@example.com",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Khushpreet Kaur",
      role: "Supporter",
      image: "/images/default.jpg",
      phone: "+1-000-000-0004",
      email: "dhruvil@example.com",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Prabhjot Kaur",
      role: "Supporter",
      image: "/images/default.jpg",
      phone: "+1-000-000-0005",
      email: "purva@example.com",
      linkedin: "https://linkedin.com",
    },
  ];

  return (
    <div className="relative">
      <Header isHomePage={true} />

      {/* Hero Section */}
      <div
        className="bg-cover bg-center flex items-center relative text-white"
        style={{
          backgroundImage: "url('/images/background.jpeg')",
          height: "100vh",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 pl-12 text-left">
          <h1
            className={`text-7xl transition-all duration-500 ease-in-out ${
              scrolling
                ? "absolute top-0 left-1/2 transform -translate-x-1/2 z-20 opacity-0"
                : "relative z-10"
            }`}
            style={{
              fontFamily: "Allura, cursive",
              fontSize: scrolling ? "3rem" : "7rem",
              transition: "font-size 0.5s ease, opacity 0.5s ease",
            }}
          >
            EventEve
          </h1>
          <p className="text-3xl font-light" style={{ fontFamily: "Montez, cursive" }}>
            Plan your event with us
          </p>
        </div>
      </div>

      {/* Promotions Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8 text-blue-600">🎉 Exclusive Promotions</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-gray-100 p-6 rounded-xl shadow-md max-w-xs w-full hover:shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">Spring Event Special</h3>
              <p className="text-gray-700">Get 20% off on all bookings made this month.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-xl shadow-md max-w-xs w-full hover:shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">Free Consultation</h3>
              <p className="text-gray-700">Book now and get a free event consultation.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-xl shadow-md max-w-xs w-full hover:shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">Vendor Welcome Deal</h3>
              <p className="text-gray-700">Vendors get 1-month listing free on sign-up!</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">💼 About Us</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            At <strong>EventEve</strong>, we specialize in curating unforgettable experiences — whether it's a birthday bash, a corporate gala, or a dream wedding.
            Our team is passionate about transforming ideas into vibrant realities with a focus on creativity, precision, and personalization.
          </p>
        </div>
      </div>

      {/* Our History Section */}
      <div className="bg-blue-50 py-20">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h2 className="text-4xl font-bold text-blue-700 mb-6">🕰️ Our Journey</h2>
          <p className="text-blue-800 text-lg leading-relaxed">
            Founded in 2024 by a group of passionate developers and event planners, <strong>EventEve</strong> started as a college project with a mission to simplify event planning.
            Within a year, it evolved into a powerful platform, helping dozens of users connect with trusted vendors to plan events seamlessly.
          </p>
        </div>
      </div>

      {/* Meet Our Team Section */}
      <div className="bg-gray-100 py-16">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">🌟 Meet Our Team</h2>
          <p className="text-gray-600 text-lg">Connect with the people behind EventEve</p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {people.map((person, index) => (
            <div
              key={index}
              className="bg-white shadow-xl rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition"
            >
              <img
                src={person.image}
                alt={person.name}
                className="w-24 h-24 object-cover rounded-full border-4 border-blue-500 mb-4"
                onError={(e) => (e.target.src = "/images/default.jpg")}
              />
              <h3 className="text-xl font-bold text-gray-900">{person.name}</h3>
              <p className="text-purple-600 text-sm font-semibold mb-1">{person.role}</p>
              <p className="text-gray-700 text-sm">{person.phone}</p>
              <p className="text-gray-600 text-sm mb-2">{person.email}</p>
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
