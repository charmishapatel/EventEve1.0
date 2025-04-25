"use client";

import React from "react";
import SideNav from "@/app/components/SideNav/page";

export default function AdminDashboard() {
  // Static dummy values
  const dashboardStats = [
    { title: "Total Users", value: "20" },
    { title: "Total Vendors", value: "10" },
    { title: "Pending Requests", value: "5" },
    { title: "Reports Filed", value: "4" },
    { title: "Active Bookings", value: "6" },
  ];

  const recentRequests = [
    { vendor: "Elegant Decor", service: "Decoration", status: "Pending" },
    { vendor: "Sweet Bites", service: "Cake", status: "Approved" },
    { vendor: "Party Blasters", service: "Entertainment", status: "Pending" },
    { vendor: "Royal Furniture", service: "Furniture", status: "Rejected" },
  ];

  return (
    <div className="flex min-h-screen">
      <SideNav />
      <div className="flex-1 p-10 bg-gray-50">
        <h1 className="text-3xl font-bold mb-10">Admin Dashboard</h1>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {dashboardStats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md flex flex-col items-center justify-center hover:scale-105 transition"
            >
              <div className="text-xl font-semibold">{stat.title}</div>
              <div className="text-4xl font-bold text-blue-500 mt-2">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Recent Vendor Requests Table */}
        <div className="bg-white rounded-2xl p-6 shadow-md overflow-x-auto">
          <h2 className="text-2xl font-semibold mb-6">Recent Vendor Requests</h2>
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="p-4">Vendor Name</th>
                <th className="p-4">Service</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.map((request, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-4">{request.vendor}</td>
                  <td className="p-4">{request.service}</td>
                  <td
                    className={`p-4 font-semibold ${
                      request.status === "Pending"
                        ? "text-yellow-500"
                        : request.status === "Approved"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {request.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
