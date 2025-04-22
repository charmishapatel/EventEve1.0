"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header/page";
import SignatureCanvas from "react-signature-canvas";
import { getAuth } from "firebase/auth"; 

export default function ContractPage() {
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const signatureRef = useRef();
  const router = useRouter();

  const clearSignature = () => signatureRef.current.clear();

const handleSubmit = async () => {
  if (!agreed) return alert("✅ Please agree to the terms before submitting.");
  if (signatureRef.current.isEmpty()) return alert("✍ Please sign before submitting.");

  const signatureData = signatureRef.current.getTrimmedCanvas().toDataURL("image/png");

  try {
    setIsSubmitting(true);

    // 🔐 Get Firebase token
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/vendor/contracts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ send token!
      },
      body: JSON.stringify({
        agreed: true,
        signature: signatureData,
      }),
    });

    const result = await res.json(); // only do this AFTER checking res.ok

    if (res.ok) {
      alert("✅ Contract submitted successfully!");
      router.push("/Vendor/Contract/Submission");
    } else {
      alert("❌ Error: " + result.error);
    }

  } catch (err) {
    console.error("❌ Submission failed:", err);
    alert("❌ Server error");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="relative">
      <Header />
      <div className="flex flex-col items-center justify-center bg-white min-h-screen p-8 border">
        <div className="w-full max-w-3xl bg-white p-8 shadow-md rounded-lg">
          <h2 className="text-3xl font-semibold mb-6">Service Agreement</h2>

          <a
            href="/documents/EventEve_Service_Agreement.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="block border p-4 text-lg font-medium text-blue-600 underline cursor-pointer hover:text-blue-800"
          >
            View Contract
          </a>

          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="mr-2 w-5 h-5"
            />
            <label htmlFor="agree" className="text-lg">Agree to terms and conditions</label>
          </div>

          <div className="mt-4">
            <label className="block font-semibold mb-1 text-lg">Signature</label>
            <div className="border border-gray-300 rounded-md p-2 bg-gray-100">
              <SignatureCanvas
                ref={signatureRef}
                penColor="black"
                canvasProps={{ className: "w-full h-20" }}
              />
            </div>
            <button
              onClick={clearSignature}
              className="mt-2 text-red-600 underline hover:text-red-800"
            >
              Clear Signature
            </button>
          </div>

          <button
            onClick={handleSubmit}
            className={`mt-6 bg-purple-500 text-white w-full py-2 rounded-md shadow-md hover:bg-purple-600 ${
              !agreed || isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!agreed || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}