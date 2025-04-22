"use client";
import React, { useState } from "react";
import Header from "@/app/components/Header/page";
import { getAuth } from "firebase/auth";

export default function DocumentUploadPage() {
  const [documents, setDocuments] = useState({
    license: null,
    govId: null,
    cheque: null,
  });

  const apiBase = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

  const handleFileChange = (e, type) => {
    setDocuments({ ...documents, [type]: e.target.files[0] });
  };

  const handleView = (file) => {
    if (file) {
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, "_blank");
    }
  };

  const handleDownload = (file) => {
    if (file) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(file);
      link.download = file.name;
      link.click();
    }
  };

  const handleDelete = (type) => {
    setDocuments({ ...documents, [type]: null });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      if (documents.license) formData.append("business_license", documents.license);
      if (documents.govId) formData.append("government_id", documents.govId);
      if (documents.cheque) formData.append("void_cheque", documents.cheque);
  
      const auth = getAuth();
      const token = await auth.currentUser.getIdToken();
  
      const res = await fetch(`${apiBase}/api/vendor/documents/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      const text = await res.text(); // ⬅️ catch what server is sending back
      console.log("📦 Raw response:", text);
  
      try {
        const json = JSON.parse(text); // ⬅️ try to parse it
        if (res.ok) {
          alert("✅ Documents submitted successfully!");
        } else {
          alert("❌ Upload failed: " + json.error);
        }
      } catch (err) {
        console.error("🛑 Not valid JSON:", text);
        alert("❌ Server did not return valid JSON.");
      }
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  };
  

  return (
    <div className="relative">
      <Header />
      <div className="flex flex-col items-center justify-center bg-white min-h-screen p-8">
        <div className="w-full max-w-4xl bg-white p-8 shadow-md rounded-lg">
          <h2 className="text-3xl font-semibold mb-6 text-center">Documents</h2>

          {[ 
            { label: "Business License", key: "license" },
            { label: "Government ID", key: "govId" },
            { label: "Void Cheque (Banking Details)", key: "cheque" },
          ].map(({ label, key }) => (
            <div className="mb-6" key={key}>
              <label className="font-semibold mb-2 block">{label}</label>
              <input type="file" accept=".pdf" onChange={(e) => handleFileChange(e, key)} className="mb-2" />
              {documents[key] && (
                <div className="flex flex-wrap items-center justify-between bg-gray-100 p-2 rounded">
                  <span>{documents[key].name}</span>
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <button onClick={() => handleView(documents[key])} className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded">View</button>
                    <button onClick={() => handleDownload(documents[key])} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">Download</button>
                    <button onClick={() => handleDelete(key)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))}

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