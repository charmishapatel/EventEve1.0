"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/app/components/Header/page";

export default function ServiceDetails() {
  const { id } = useParams(); // e.g., "cake" or "6"
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const serviceMap = {
    furniture: 1,
    catering: 2,
    karaoke: 3,
    decoration: 4,
    flower: 5,
    cake: 6,
  };

  const serviceId = serviceMap[id?.toLowerCase()] || parseInt(id);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        console.log(`Fetching items for service ID: ${serviceId}`);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/service/${serviceId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched Items:", data);
        setItems(data.items || []);
      } catch (error) {
        console.error("Error fetching service items:", error);
      } finally {
        setLoading(false);
      }
    };

    if (serviceId) {
      fetchItems();
    }
  }, [serviceId]);

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-8">
        <Header isHomePage={false} />
        <button
          onClick={() => router.back()}
          className="bg-gray-200 text-black px-4 py-2 rounded-md mb-4"
        >
          ← Back
        </button>
        <h2 className="text-4xl font-bold text-center mb-6 text-black">
          Service Items
        </h2>
        {loading ? (
          <p className="text-center text-lg font-bold">Loading Items...</p>
        ) : items.length === 0 ? (
          <p className="text-center text-lg font-bold text-red-600">
            No items found for this service.
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {items.map((item, index) => {
              const itemName =
                item.furniturename ||
                item.cakename ||
                item.decorationname ||
                item.bandname ||
                item.mealname ||
                item.flowername;

              return (
                <div
                  key={item.id || `fallback-${index}`}
                  className="group relative bg-white shadow-lg text-black rounded-lg border border-black p-4 cursor-pointer"
                  onClick={() => {
                    if (!itemName) {
                      console.error("❌ Item name is missing!", item);
                      return;
                    }
                    router.push(
                      `/User/ItemDetails/${encodeURIComponent(itemName)}`
                    );
                  }}
                >
                  {/* ✅ Multiple images */}
                  <div className="w-full h-80 overflow-hidden rounded-md space-y-2">
                    {item.imageurl1 && (
                      <img
                        src={item.imageurl1}
                        alt={`${itemName} View 1`}
                        className="w-full h-full object-cover rounded-md"
                        onError={(e) => (e.target.src = "/images/default.jpg")}
                      />
                    )}
                    {item.imageurl2 && (
                      <img
                        src={item.imageurl2}
                        alt={`${itemName} View 2`}
                        className="w-full h-full object-cover rounded-md"
                        onError={(e) => (e.target.src = "/images/default.jpg")}
                      />
                    )}
                    {item.imageurl3 && (
                      <img
                        src={item.imageurl3}
                        alt={`${itemName} View 3`}
                        className="w-full h-full object-cover rounded-md"
                        onError={(e) => (e.target.src = "/images/default.jpg")}
                      />
                    )}
                  </div>

                  {/* 📝 Name + Price */}
                  <div className="p-4 text-center">
                    <h3 className="text-xl font-bold">{itemName}</h3>
                    <p className="text-gray-700 font-semibold">
                      ${item.price}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
