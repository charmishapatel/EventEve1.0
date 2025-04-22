"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SideNav() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    {
      label: "Dashboard",
      href: "/Admin/AdminDashboard",
      match: "/Admin/AdminDashboard",
    },
    {
      label: "Approving Request",
      href: "/Admin/ApprovingRequests",
      match: "/Admin/ApprovingRequests", // this will catch all subroutes like /approving/view-vendor
    },
    {
      label: "Services",
      href: "/Admin/Service",
      match: "/Admin/Service",
    },
    {
      label: "Reports",
      href: "/Admin/Reports",
      match: "/Admin/Reports",
    },
    {
      label: "Inventory",
      href: "/Admin/Inventory",
      match: "/Admin/Inventory",
    },
    {
      label: "Vendor Management",
      href: "/Admin/VendorRequests",
      match: "/Admin/VendorRequests", // use this ONLY for isolated pages
    },
    {
      label: "Contract",
      href: "/Admin/Contract",
      match: "/Admin/Contract",
    },
  ];

  return (
    <div
      className={`h-screen ${
        collapsed ? "w-20" : "w-64"
      } bg-[#0C0E1A] text-white px-6 py-4 transition-all duration-300 rounded-r-3xl shadow-xl flex flex-col`}
    >
      {/* Logo */}
      <div className="flex justify-between items-center mb-12">
        {!collapsed && (
          <h1 className="text-3xl font-semibold font-[cursive] tracking-wide">
            EventEve
          </h1>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-xl hover:text-blue-400 transition"
        >
          ↤I
        </button>
      </div>

      {/* Navigation */}
      <nav className={`flex flex-col ${collapsed ? "items-center" : "space-y-8"}`}>
        {navLinks.map(({ label, href, match }) => {
          const isActive = pathname.startsWith(match);
          return (
            <Link
              key={href}
              href={href}
              className={`text-lg ${
                isActive ? "text-blue-400 font-medium" : "text-white hover:text-blue-400"
              } transition`}
            >
              {collapsed ? label.charAt(0) : label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
