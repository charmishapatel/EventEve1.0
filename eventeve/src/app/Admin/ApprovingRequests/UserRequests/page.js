"use client";

import React from "react";
import Link from "next/link";
import SideNav from "@/app/components/SideNav/page";

const userRequests = [
  {
    name: "SHYAM",
    service: "FURNITURE",
    description: "NEEDS 5 ROUND TABLES, 20 CHAIRS, AND 3 STANDS FOR AN EXHIBITION BOOTH.",
    username: "shyam",
  },
  {
    name: "JOHN",
    service: "DECORATION",
    description: "WANTS A FLOWER DECORATED STAGE AND LIGHTING SETUP FOR AN EVENING FUNCTION.",
    username: "john",
  },
  {
    name: "KARL",
    service: "CATERING, CAKE",
    description: "REQUESTED TRADITIONAL GUJARATI FOOD FOR 50 GUESTS AND A TWO-LAYER CHOCOLATE CAKE.",
    username: "karl",
  },
];

export default function ViewUserRequests() {
  return (
    <div className="flex min-h-screen">
      <SideNav />
      <div className="flex-1 p-10 bg-white">
        <h1 className="text-3xl font-bold mb-10">View User Request</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 border-b text-left">NAME</th>
                <th className="py-3 px-6 border-b text-left">SERVICE</th>
                <th className="py-3 px-6 border-b text-left">DESCRIPTION</th>
                <th className="py-3 px-6 border-b text-left">VIEW ORDER</th>
              </tr>
            </thead>
            <tbody>
              {userRequests.map((user, index) => (
                <tr key={index} className="border-t">
                  <td className="py-3 px-6">{user.name}</td>
                  <td className="py-3 px-6">{user.service}</td>
                  <td className="py-3 px-6">{user.description}</td>
                  <td className="py-3 px-6 text-blue-600 underline">
                    <Link href={`/Admin/ApprovingRequests/UserRequest/${user.username}`}>
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
