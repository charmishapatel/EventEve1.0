"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SideNav from "@/app/components/SideNav/page";

const AddService = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.toUpperCase().trim();

    if (!trimmedTitle) {
      setError("Service title cannot be empty.");
      return;
    }

    const existing = JSON.parse(localStorage.getItem("admin-services")) || [];

    // Check for duplicate titles
    const alreadyExists = existing.some(
      (s) => s.title.toUpperCase() === trimmedTitle
    );

    if (alreadyExists) {
      setError(`Service "${trimmedTitle}" already exists.`);
      return;
    }

    const newService = {
      id: uuidv4(),
      title: trimmedTitle,
    };

    localStorage.setItem("admin-services", JSON.stringify([...existing, newService]));
    router.push("/Admin/Service");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideNav />
      <div className="flex-1 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Add New Service</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Service Title (e.g., DJ, MAKEUP)"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError(""); // Clear error when typing
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md shadow transition"
            >
              Add Service
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddService;
    