"use client";

import Header from "@/app/components/Header/page";
import { useEffect } from "react";

export default function PaymentSuccess() {
  const userId = 1; // Replace with real user logic later

  useEffect(() => {
    const cleanupAfterPayment = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/payment/cleanup/${userId}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to clean up after payment");

        console.log("✅ Cart and item data cleaned up.");

        // 🧹 Clear cart counter in localStorage
        localStorage.setItem("cartCount", "0");
        window.dispatchEvent(new Event("cartCountUpdated"));

      } catch (error) {
        console.error("❌ Cleanup error:", error);
      }
    };

    cleanupAfterPayment();
  }, []);

  return (
    <div className="min-h-screen bg-green-50 py-16 text-center">
      <Header isHomePage={false} />
      <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful 🎉</h1>
      <p className="text-lg text-gray-700">Thank you for your booking!</p>
    </div>
  );
}