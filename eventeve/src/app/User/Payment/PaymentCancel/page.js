// src/app/User/Payment/PaymentCancel/page.js
"use client";
import Header from "@/app/components/Header/page";

export default function PaymentCancel() {
  return (
    <div className="min-h-screen bg-red-50 py-16 text-center">
      <Header isHomePage={false} />
      <h1 className="text-4xl font-bold text-red-600 mb-4">Payment Cancelled ❌</h1>
      <p className="text-lg text-gray-700">It looks like your payment was not completed.</p>
    </div>
  );
}