"use client";

import React from "react";
import { Eye, Check, X } from "lucide-react";
import SideNav from "@/app/components/SideNav/page";

const vendors = [
  {
    name: "John Doe",
    email: "john@example.com",
    contact: "123-456-7890",
    status: "Approved",
  },
  {
    name: "Mary Smith",
    email: "mary@example.com",
    contact: "234-557-9901",
    status: "Approved",
  },
  {
    name: "David Brown",
    email: "david@example.com",
    contact: "3035-67-9012",
    status: "Approved",
  },
  {
    name: "Emma Wilson",
    email: "emma@example.com",
    contact: "456-789-0123",
    status: "Pending",
  },
  {
    name: "John Doe",
    email: "email@example.com",
    contact: "0213-456-411",
    status: "Pending",
  },
  {
    name: "Emma Smith",
    email: "amma@example.com",
    contact: "456-789-0123",
    status: "Pending",
  },
];

const ViewVendorRequest = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SideNav />

      {/* Main Content */}
      <div className="flex-1 p-10 bg-white">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-black">View Vendor Request</h1>
          <div className="flex items-center space-x-3">
            <div className="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-sm font-medium">A</span>
            </div>
            <span className="text-lg text-black">Admin</span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-gray-50 p-4 rounded-xl shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr className="text-left text-sm font-semibold text-gray-700">
                <th className="py-3 px-4">Vendor Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, index) => (
                <tr
                  key={index}
                  className="border-b text-sm text-gray-800 hover:bg-gray-100"
                >
                  <td className="py-3 px-4">{vendor.name}</td>
                  <td className="py-3 px-4">{vendor.email}</td>
                  <td className="py-3 px-4">{vendor.contact}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold ${
                        vendor.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {vendor.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 space-x-3 flex">
                    <Eye className="w-5 h-5 text-blue-600 cursor-pointer" />
                    {vendor.status === "Pending" && (
                      <>
                        <Check className="w-5 h-5 text-green-500 cursor-pointer" />
                        <X className="w-5 h-5 text-red-500 cursor-pointer" />
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewVendorRequest;
