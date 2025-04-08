"use client";
import React, { useState } from "react";
import Header from "@/app/components/Header/page";

export default function DocumentUploadPage() {
  const [documents, setDocuments] = useState({
    license: null,
    govId: null,
    cheque: null,
  });

  // Handle file selection
  const handleFileChange = (e, type) => {
    setDocuments({ ...documents, [type]: e.target.files[0] });
  };

  // Handle view functionality for the uploaded file
  const handleView = (file) => {
    if (file) {
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, "_blank");
    }
  };

  // Handle download functionality for the uploaded file
  const handleDownload = (file) => {
    if (file) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(file);
      link.download = file.name;
      link.click();
    }
  };

  // Handle file deletion
  const handleDelete = (type) => {
    setDocuments({ ...documents, [type]: null });
  };

  // Submit the form
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("vendorId", 1); // You can dynamically change this later
      formData.append("business_license", documents.license);
      formData.append("government_id", documents.govId);
      formData.append("void_cheque", documents.cheque);

      // API request to handle document upload
      const res = await fetch("/api/vendor/document", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        alert("Documents submitted successfully!");
      } else {
        alert("Upload failed: " + result.error);
      }
    } catch (err) {
      alert("An error occurred: " + err.message);
    }
  };

  return (
    <div className="relative">
      <Header />
      <div className="flex flex-col items-center justify-center bg-white min-h-screen p-8">
        <div className="w-full max-w-4xl bg-white p-8 shadow-md rounded-lg">
          <h2 className="text-3xl font-semibold mb-6 text-center">Documents</h2>

          {/* Business License */}
          <div className="mb-6">
            <label className="font-semibold mb-2 block">Business License</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileChange(e, "license")}
              className="mb-2"
            />
            {documents.license && (
              <div className="flex flex-wrap items-center justify-between bg-gray-100 p-2 rounded">
                <span>{documents.license.name}</span>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button onClick={() => handleView(documents.license)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded">View</button>
                  <button onClick={() => handleDownload(documents.license)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">Download</button>
                  <button onClick={() => handleDelete("license")} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                </div>
              </div>
            )}
          </div>

          {/* Government ID */}
          <div className="mb-6">
            <label className="font-semibold mb-2 block">Government ID</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileChange(e, "govId")}
              className="mb-2"
            />
            {documents.govId && (
              <div className="flex flex-wrap items-center justify-between bg-gray-100 p-2 rounded">
                <span>{documents.govId.name}</span>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button onClick={() => handleView(documents.govId)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded">View</button>
                  <button onClick={() => handleDownload(documents.govId)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">Download</button>
                  <button onClick={() => handleDelete("govId")} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                </div>
              </div>
            )}
          </div>

          {/* Void Cheque */}
          <div className="mb-6">
            <label className="font-semibold mb-2 block">Void Cheque (Banking Details)</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileChange(e, "cheque")}
              className="mb-2"
            />
            {documents.cheque && (
              <div className="flex flex-wrap items-center justify-between bg-gray-100 p-2 rounded">
                <span>{documents.cheque.name}</span>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button onClick={() => handleView(documents.cheque)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded">View</button>
                  <button onClick={() => handleDownload(documents.cheque)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">Download</button>
                  <button onClick={() => handleDelete("cheque")} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md shadow">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
