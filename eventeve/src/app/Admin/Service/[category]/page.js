"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import SideNav from "@/app/components/SideNav/page";

const CategoryVariety = () => {
  const { category } = useParams();
  const router = useRouter();

  const [varieties, setVarieties] = useState([]);

  // Load varieties from localStorage
  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("admin-varieties")) || [];
    const filtered = all.filter((item) => item.category === category);
    setVarieties(filtered);
  }, [category]);

  // Handle delete
  const handleDelete = (idToDelete) => {
    const existing = JSON.parse(localStorage.getItem("admin-varieties")) || [];
    const updated = existing.filter((item) => item.id !== idToDelete);
    localStorage.setItem("admin-varieties", JSON.stringify(updated));
    setVarieties(updated);
  };

  // Handle edit
  const handleEdit = (idToEdit) => {
    router.push(`/Admin/service/AddVariety?id=${idToEdit}&category=${category}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideNav />
      <div className="flex-1 p-10 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{category} Varieties</h1>
          <button
            onClick={() =>
              router.push(`/Admin/service/AddVariety?category=${category}`)
            }
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Add Variety
          </button>
        </div>

        {varieties.length === 0 ? (
          <p className="text-gray-500">No varieties added yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {varieties.map((v) => (
              <div
                key={v.id}
                className="relative p-4 bg-white border rounded-lg shadow hover:shadow-md transition"
              >
                <h2 className="text-lg font-semibold text-gray-800">{v.name}</h2>
                <p className="text-sm text-gray-600 mt-1">{v.description}</p>

                <div className="absolute top-2 right-2 flex gap-2">
                  <Pencil
                    size={18}
                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                    onClick={() => handleEdit(v.id)}
                  />
                  <Trash2
                    size={18}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => handleDelete(v.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryVariety;
