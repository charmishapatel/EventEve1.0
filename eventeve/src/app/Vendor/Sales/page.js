"use client";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import dayjs from "dayjs";

import Header from "@/app/components/Header/page";
import { getAuth } from "firebase/auth"; // at top

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function SalesReport() {
  const [selectedTime, setSelectedTime] = useState("All time");
  const [sales, setSales] = useState([]);

  useEffect(() => {
  const fetchSales = async () => {
  try {
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/vendor/sales`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setSales(data.sales || []);
  } catch (err) {
    console.error("❌ Failed to fetch sales:", err);
  }
};


    fetchSales();
  }, []);

  const now = dayjs();
  const filteredSales = sales.filter((sale) => {
    const saleDate = dayjs(sale.report_month);
    if (selectedTime === "Last Month") {
      return saleDate.isSame(now.subtract(1, "month"), "month");
    } else if (selectedTime === "Last Week") {
      return saleDate.isAfter(now.subtract(7, "day"));
    }
    return true;
  });

  const totalIncome = filteredSales.reduce((sum, s) => sum + Number(s.total_income), 0);
  const customerCount = filteredSales.reduce((sum, s) => sum + Number(s.total_customers), 0);
  const rating = filteredSales.length ? Number(filteredSales.at(-1).rating) : 0;

  const uniqueLabels = [...new Set(filteredSales.map((s) => dayjs(s.report_month).format("MMM D")))];
  const salesData = {
    labels: uniqueLabels,
    datasets: [
      {
        label: "Income",
        backgroundColor: "#7C3AED",
        data: filteredSales.map((s) => Number(s.total_income)),
      },
    ],
  };

  return (
    <div className="relative">
      <Header />
      <div className="flex flex-col items-center justify-center bg-white min-h-screen p-8 border">
        <div className="w-full max-w-5xl bg-white p-8 shadow-md rounded-lg">
          <h2 className="text-3xl font-semibold mb-6">Sales Report</h2>

          {/* Rating Box */}
          <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg">
            <div>
              <h3 className="text-lg font-semibold">Your Current Rating</h3>
              <div className="bg-green-200 p-4 rounded-md text-2xl font-bold">
                {rating} <span className="text-lg">/ 5</span>
              </div>
              <p className="text-gray-500">Average</p>
            </div>
          </div>

          {/* Overview Section */}
          <div className="mt-6 bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Overview</h3>
            <div className="flex justify-between">
              <div className="border p-4 w-1/2 text-center">
                <p className="text-gray-600">Customers</p>
                <p className="text-2xl font-semibold">{customerCount}</p>
              </div>
              <div className="border p-4 w-1/2 text-center">
                <p className="text-gray-600">Income</p>
                <p className="text-2xl font-semibold">${totalIncome.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Monthly Income</h3>
            <select
              className="border rounded-md p-2 mb-2"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <option>All time</option>
              <option>Last Month</option>
              <option>Last Week</option>
            </select>
            <Bar data={salesData} />
          </div>
        </div>
      </div>
    </div>
  );
}