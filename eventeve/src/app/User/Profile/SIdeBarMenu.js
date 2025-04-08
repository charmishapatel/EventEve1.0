'use client';

import { useState, useEffect } from "react";
import Header from "@/app/components/Header/page";

function MenuItem({ label, selected, setSelected }) {
  return (
    <div
      className={`flex items-center justify-between cursor-pointer py-4 px-6 text-xl font-semibold transition duration-500 ease-in-out hover:bg-gray-100 ${
        selected === label ? "bg-blue-500 text-white rounded-lg" : "text-gray-700"
      }`}
      onClick={() => setSelected(label)}
    >
      {label}
      <span className="text-gray-500 text-2xl">{">"}</span> {/* Larger ">" icon */}
    </div>
  );
}

export default function SidebarMenu() {
  const [selected, setSelected] = useState("");
  const [menuExpanded, setMenuExpanded] = useState(true); // State to control menu size
  const [bookings, setBookings] = useState([]);
  const [userInfo, setUserInfo] = useState({ username: "", email: "" });
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    if (selected === "Request Status") {
      setBookings([
        { id: "abvdbvhb134", status: "Pending" },
        { id: "2763762bsx", status: "Pending" },
      ]);
    } else {
      setBookings([]);
    }

    // Collapse menu when an item is selected
    setMenuExpanded(selected === "" ? true : false);
  }, [selected]);

  useEffect(() => {
    setTimeout(() => {
      const fetchedData = { username: "JohnDoe", email: "johndoe@example.com" };
      setUserInfo(fetchedData);
    }, 1000);
  }, []);

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    console.log("User logged out!");
  };

  return (
    <div className="w-full h-screen flex flex-col bg-white">
      <Header isHomePage={false} />

      <div className="flex flex-grow p-6 mt-5">
        {/* Sidebar Navigation with Black Border */}
        <div
          className={`transition-all duration-500 ease-in-out ${
            menuExpanded ? "w-2/3 p-12" : "w-2/5 p-4"
          }`}
        >
          <nav className="flex flex-col space-y-6 bg-white shadow-xl rounded-lg p-6 border-2 border-black">
            <MenuItem label="Personal Information" selected={selected} setSelected={setSelected} />
            <MenuItem label="Request Status" selected={selected} setSelected={setSelected} />
            <MenuItem label="Log out" selected={selected} setSelected={() => setShowLogoutConfirm(true)} />
            <MenuItem label="Settings" selected={selected} setSelected={setSelected} />
          </nav>
        </div>

        {/* Content Section */}
        <div className="w-4/5 p-6">
          {selected === "Personal Information" && (
            <div>
              <h2 className="text-4xl font-semibold text-gray-800 mb-8">Personal Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-700">Username</label>
                  <p className="text-lg font-semibold text-black">{userInfo.username}</p>
                </div>
                <div>
                  <label className="block text-lg font-semibold text-gray-700">Email</label>
                  <p className="text-lg font-semibold text-black">{userInfo.email}</p>
                </div>
              </div>
            </div>
          )}

          {selected === "Request Status" && bookings?.length > 0 && (
            <div>
              <h2 className="text-4xl font-semibold text-gray-800 mb-8">Booking Requests</h2>
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="p-6 border border-gray-300 rounded-lg shadow-md bg-white">
                    <p className="text-lg font-semibold text-gray-700">Booking Id : {booking.id}</p>
                    <p className="text-lg text-gray-600">
                      Status : <span className="font-semibold">{booking.status}</span>
                    </p>
                    <button className="mt-4 bg-purple-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-600">
                      View booking
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showLogoutConfirm && (
            <div className="p-8 border border-gray-300 rounded-lg shadow-md bg-white w-1/2 mx-auto text-center">
              <p className="text-xl text-red-600 font-semibold">Are you sure you want to log out?</p>
              <div className="flex justify-center space-x-6 mt-6">
                <button className="bg-gray-300 px-6 py-3 rounded-lg shadow-md text-lg" onClick={() => setShowLogoutConfirm(false)}>
                  No
                </button>
                <button className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 text-lg" onClick={handleLogout}>
                  Yes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
