"use client";
import React from "react";
import Link from "next/link";

export default function ApprovalPending() {
  return (
    <div className="flex items-center justify-center h-screen bg-yellow-100">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-md text-center">
        <h1 className="text-3xl font-bold text-yellow-600 mb-4">⏳ Pending Approval</h1>
        <p className="text-gray-700 mb-6">
          Your vendor account is currently under review. We'll notify you once it's approved!
        </p>
        <Link href="/">
          <button className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
