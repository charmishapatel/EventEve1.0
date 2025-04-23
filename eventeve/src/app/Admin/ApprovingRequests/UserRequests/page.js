"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import SideNav from "@/app/components/SideNav/page";

export default function ViewUserRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/admin/user-bookings`);
        const data = await res.json();
        setRequests(data);
      } catch (error) {
        console.error("❌ Failed to fetch booking data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen">
      <SideNav />
      <div className="flex-1 p-10 bg-white">
        <h1 className="text-3xl font-bold mb-10">View User Requests</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 border-b text-left">Name</th>
                <th className="py-3 px-6 border-b text-left">Service</th>
                <th className="py-3 px-6 border-b text-left">Description</th>
                <th className="py-3 px-6 border-b text-left">View</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.bookingid} className="border-t">
                  <td className="py-3 px-6">{`${req.firstname} ${req.lastname}`}</td>
                  <td className="py-3 px-6">{req.servicename}</td>
                  <td className="py-3 px-6">{req.otherinformation}</td>
                  <td className="py-3 px-6 text-blue-600 underline">
                    <Link href={`/Admin/ApprovingRequests/UserRequest/${req.bookingid}`}>
                      VIEW HERE
                    </Link>
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
