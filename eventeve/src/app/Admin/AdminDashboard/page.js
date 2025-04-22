"use client";

import React from "react";
import Link from "next/link";
import SideNav from "@/app/components/SideNav/page";

export default function AdminDashboard() {
    return (
      <div className="flex min-h-screen">
        <SideNav />
        <div className="flex-1 p-10 bg-white">
          <h1 className="text-3xl font-bold mb-10">Admin Dashboard</h1>
          <div className="overflow-x-auto">
          </div>
        </div>
      </div>
    );
  }