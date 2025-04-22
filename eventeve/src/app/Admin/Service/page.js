"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Pencil,
  Trash2,
  Utensils,
  Flower2,
  Mic,
  Sofa,
  Sparkles,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import SideNav from "@/app/components/SideNav/page";

const iconMap = {
  CATERING: <Utensils size={28} />,
  FLOWER: <Flower2 size={28} />,
  KARAOKE: <Mic size={28} />,
  FURNITURE: <Sofa size={28} />,
  DECORATION: <Sparkles size={28} />,
};

const ServicesPage = () => {
  const router = useRouter();
  const [services, setServices] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("admin-services")) || [];

    if (stored.length === 0) {
      const defaultServices = Object.keys(iconMap).map((title) => ({
        id: uuidv4(),
        title,
      }));
      localStorage.setItem("admin-services", JSON.stringify(defaultServices));
      setServices(defaultServices);
    } else {
      setServices(stored);
    }
  }, []);

  const handleAddService = () => {
    router.push("/Admin/service/add");
  };

  const handleCardClick = (title) => {
    router.push(`/Admin/service/${title}`);
  };

  const handleEdit = (title) => {
    router.push(`/Admin/service/edit?title=${title}`);
  };

  const handleDelete = (title) => {
    const confirmDelete = confirm(`Are you sure you want to delete "${title}"?`);
    if (!confirmDelete) return;

    const updated = services.filter((s) => s.title !== title);
    localStorage.setItem("admin-services", JSON.stringify(updated));
    setServices(updated);
  };

  const sortedServices = services
    .filter((s) => s?.title)
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideNav />

      <div className="flex-1 p-10 max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-4xl font-bold">Service Management</h2>
          <p className="text-gray-500 mt-1">
            Add, edit or remove service categories below.
          </p>
        </div>

        {sortedServices.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">
            No services available. Click "Add Service" to begin.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sortedServices.map((service) => (
              <div
                key={service.title}
                className="relative bg-[#1a1f2b] text-white rounded-lg h-40 p-4 flex justify-center items-center hover:scale-105 hover:shadow-lg hover:bg-[#2a2f3d] transition-all duration-200 group"
              >
                <div
                  onClick={() => handleCardClick(service.title)}
                  className="flex flex-col items-center justify-center space-y-2 cursor-pointer"
                >
                  <div>{iconMap[service.title] || <Sparkles size={28} />}</div>
                  <div className="text-lg font-semibold">{service.title}</div>
                </div>

                <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <Pencil
                    size={18}
                    title="Edit"
                    className="cursor-pointer text-blue-400 hover:text-blue-600"
                    onClick={() => handleEdit(service.title)}
                  />
                  <Trash2
                    size={18}
                    title="Delete"
                    className="cursor-pointer text-red-400 hover:text-red-600"
                    onClick={() => handleDelete(service.title)}
                  />
                </div>
              </div>
            ))}

            {/* Add Service Card */}
            <div
              onClick={handleAddService}
              className="border-2 border-dashed border-gray-400 rounded-lg h-40 flex flex-col justify-center items-center text-gray-500 hover:bg-gray-100 cursor-pointer transition"
            >
              <Plus size={28} />
              <span className="mt-1 text-sm">Add Service</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
    