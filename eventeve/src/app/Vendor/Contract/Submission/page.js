"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header/page";

export default function SubmissionPage() {
  const router = useRouter();
  const [signature, setSignature] = useState(null);

  useEffect(() => {
    const fetchSignature = async () => {
      try {
        const res = await fetch("/api/vendor/contract");
        const data = await res.json();
        if (data.signature) {
          setSignature(data.signature);
        }
      } catch (err) {
        console.error("Failed to fetch signature:", err);
      }
    };

    fetchSignature();
  }, []);

  return (
    <div className="relative">
      <Header />
      <div className="flex flex-col items-center justify-center bg-white min-h-screen p-8 border">
        <div className="w-full max-w-3xl bg-white p-8 shadow-md rounded-lg text-center">
          <h2 className="text-3xl font-semibold mb-6">Submission Successful</h2>
          <p className="text-lg text-gray-700 mb-4">
            Your contract has been successfully submitted.
          </p>

          {signature && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Saved Signature</h3>
              <img
                src={signature}
                alt="Signature"
                className="mx-auto border p-2 rounded-md"
              />
            </div>
          )}

          <button
            onClick={() => router.push("/Vendor/vendorHomepage")}
            className="mt-6 bg-green-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-600"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
