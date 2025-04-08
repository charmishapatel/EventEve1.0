"use client";
import React, { useState } from "react";
import Header from "@/app/components/Header/page";

export default function SupportPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/vendor/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setResponse("✅ Submitted successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setResponse(`❌ ${data.error}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      setResponse("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <Header />
      <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Support</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Frequently Asked Questions</h2>
          <details className="mb-2">
            <summary className="font-medium text-indigo-600">How do I reset my password?</summary>
            <p className="text-gray-600 mt-1">Click "Forgot password" on the login page to receive a reset link.</p>
          </details>
          <details>
            <summary className="font-medium text-indigo-600">How do I contact support?</summary>
            <p className="text-gray-600 mt-1">Fill out the form below, and our team will respond shortly.</p>
          </details>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full p-2 border rounded-md"
              placeholder="Describe your issue..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {response && (
          <div className="mt-4 text-center text-sm font-medium text-blue-600">{response}</div>
        )}
      </div>
    </div>
  );
}
