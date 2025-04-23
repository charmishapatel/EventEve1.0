"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import SideNav from "@/app/components/SideNav/page";
import { Download } from "lucide-react";

const defaultReports = [
  { label: "All Users", icon: "👤", range: "All Time" },
  { label: "All Bookings", icon: "📅", range: "This Month" },
  { label: "All Services", icon: "💰", range: "This Year" },
  { label: "All Vendors", icon: "🏢", range: "All Time" },
];

const ReportsPage = () => {
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [users, setUsers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);

  const [showUsers, setShowUsers] = useState(false);
  const [showVendors, setShowVendors] = useState(false);
  const [showBookings, setShowBookings] = useState(false);
  const [showServices, setShowServices] = useState(false);

  const handleExport = (index) => {
    setLoadingIndex(index);
    setTimeout(() => {
      setLoadingIndex(null);
      alert("PDF exported successfully!");
    }, 1200);
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
      setShowUsers(true);
      setShowVendors(false);
      setShowBookings(false);
      setShowServices(false);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const fetchVendors = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/vendors");
      setVendors(res.data);
      setShowVendors(true);
      setShowUsers(false);
      setShowBookings(false);
      setShowServices(false);
    } catch (err) {
      console.error("Error fetching vendors:", err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/booking");
      setBookings(res.data);
      setShowBookings(true);
      setShowUsers(false);
      setShowVendors(false);
      setShowServices(false);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/services");
      setServices(res.data);
      setShowServices(true);
      setShowUsers(false);
      setShowVendors(false);
      setShowBookings(false);
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50" style={{ color: "black" }}>
      <SideNav />

      <div className="flex-1 p-10">
        <h1 className="text-4xl font-bold text-black mb-10">Reports</h1>

        <div className="space-y-6">
          {defaultReports.map((report, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow flex flex-col md:flex-row items-start md:items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-600">{report.icon}</span>
                <span className="text-lg font-semibold text-black">
                  {report.label}
                </span>
              </div>

              <div className="flex items-center gap-4 mt-4 md:mt-0">
                {report.label === "All Users" ? (
                  <button
                    onClick={fetchUsers}
                    className="bg-blue-500 hover:bg-green-600 text-white text-sm px-5 py-2 rounded"
                  >
                    View all data
                  </button>
                ) : report.label === "All Vendors" ? (
                  <button
                    onClick={fetchVendors}
                    className="bg-blue-500 hover:bg-green-600 text-white text-sm px-5 py-2 rounded"
                  >
                    View Vendors
                  </button>
                ) : report.label === "All Bookings" ? (
                  <button
                    onClick={fetchBookings}
                    className="bg-blue-500 hover:bg-green-600 text-white text-sm px-5 py-2 rounded"
                  >
                    View all data
                  </button>
                ) : report.label === "All Services" ? (
                  <button
                    onClick={fetchServices}
                    className="bg-blue-500 hover:bg-green-600 text-white text-sm px-5 py-2 rounded"
                  >
                    View all data
                  </button>
                ) : (
                  <button
                    onClick={() => handleExport(index)}
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-5 py-2 rounded flex items-center gap-2"
                  >
                    View all data
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Render User Table */}
        {showUsers && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">All Users</h2>
            <table className="w-full table-auto border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Username</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Phone</th>
                  <th className="p-2 border">Address</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={idx} className="text-center">
                    <td className="p-2 border">{user.username}</td>
                    <td className="p-2 border">{user.email}</td>
                    <td className="p-2 border">{user.phonenumber}</td>
                    <td className="p-2 border">{user.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Render Vendor Table */}
        {showVendors && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">All Vendors</h2>
            <table className="w-full table-auto border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">First Name</th>
                  <th className="p-2 border">Last Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Contact</th>
                  <th className="p-2 border">Address</th>
                  <th className="p-2 border">City</th>
                  <th className="p-2 border">Province</th>
                  <th className="p-2 border">Postal Code</th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((vendor, idx) => (
                  <tr key={idx} className="text-center">
                    <td className="p-2 border">{vendor.first_name}</td>
                    <td className="p-2 border">{vendor.last_name}</td>
                    <td className="p-2 border">{vendor.email}</td>
                    <td className="p-2 border">{vendor.contact_number}</td>
                    <td className="p-2 border">{vendor.address}</td>
                    <td className="p-2 border">{vendor.city}</td>
                    <td className="p-2 border">{vendor.province}</td>
                    <td className="p-2 border">{vendor.postal_code}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Render Bookings Table */}
        {showBookings && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">All Bookings</h2>
            <table className="w-full table-auto border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Booking ID</th>
                  <th className="p-2 border">Event Date</th>
                  <th className="p-2 border">Address</th>
                  <th className="p-2 border">Service</th>
                  <th className="p-2 border">Quantity</th>
                  <th className="p-2 border">Total Price</th>
                  <th className="p-2 border">Description</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, idx) => (
                  <tr key={idx} className="text-center">
                    <td className="p-2 border">{booking.firstname} {booking.lastname}</td>
                    <td className="p-2 border">{booking.bookingid}</td>
                    <td className="p-2 border">{booking.eventdate}</td>
                    <td className="p-2 border">{booking.deliveryaddress}</td>
                    <td className="p-2 border">{booking.servicename}</td>
                    <td className="p-2 border">{booking.quantity}</td>
                    <td className="p-2 border">{booking.totalprice}</td>
                    <td className="p-2 border">{booking.otherinformation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Render Services Table */}
        {showServices && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">All Services</h2>
            <table className="w-full table-auto border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Service Name</th>
                  <th className="p-2 border">Description</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, idx) => (
                  <tr key={idx} className="text-center">
                    <td className="p-2 border">{service.servicename}</td>
                    <td className="p-2 border">{service.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
