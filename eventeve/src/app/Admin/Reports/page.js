"use client";

import { useState } from "react";
import SideNav from "@/app/components/SideNav/page";
import { Download, Users, Store, Package, Layers, DollarSign } from "lucide-react";

const exportOptions = ["PDF", "Excel", "CSV"];

const reports = [
  { label: "All Users", icon: <Users />, range: "Last 7 Days" },
  { label: "All Vendors", icon: <Store />, range: "This Month" },
  { label: "All Items", icon: <Package />, range: "Custom" },
  { label: "All Services", icon: <Layers />, range: "All Time" },
  { label: "All Revenue", icon: <DollarSign />, range: "This Year" },
];

const ReportsPage = () => {
  const [loadingIndex, setLoadingIndex] = useState(null);

  const handleExport = (index) => {
    setLoadingIndex(index);
    setTimeout(() => {
      setLoadingIndex(null);
      alert("PDF exported successfully!");
    }, 1200);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideNav />

      <div className="flex-1 p-10">
        <h1 className="text-4xl font-bold text-black mb-10">Reports</h1>

        <div className="space-y-6">
          {reports.map((report, index) => (
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
                <select
                  defaultValue={report.range}
                  className="border rounded px-3 py-2 text-sm text-gray-700"
                >
                  <option>Last 7 Days</option>
                  <option>This Month</option>
                  <option>Custom</option>
                  <option>All Time</option>
                  <option>This Year</option>
                </select>

                <button
                  onClick={() => handleExport(index)}
                  className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-5 py-2 rounded flex items-center gap-2"
                >
                  <Download size={16} />
                  {loadingIndex === index ? "Exporting..." : "Export PDF"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;