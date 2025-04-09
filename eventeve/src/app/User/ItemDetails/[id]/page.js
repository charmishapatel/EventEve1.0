"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/app/components/Header/page";
import Counter from "../Counter";
import ImageSlider from "../ImageSlider";

export default function ItemDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE}/api/item/name/${encodeURIComponent(id)}`
        );
        if (!res.ok) throw new Error("Failed to fetch item");
        const data = await res.json();
        setItem(data);
      } catch (err) {
        console.error("❌ Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchItem();
  }, [id]);

  if (loading) {
    return <p className="text-center py-20 text-lg">Loading...</p>;
  }

  if (!item) {
    return (
      <p className="text-center py-20 text-lg text-red-600">
        Item not found.
      </p>
    );
  }

  const itemName = item.name || "Unnamed Item";
  const vendorName = `By Vendor ${item.vendorid || "Unknown"}`;

  const images = [item.imageurl1, item.imageurl2, item.imageurl3].filter(Boolean);


  return (
    <div className="min-h-screen bg-white">
      <Header isHomePage={false} />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 px-6 py-16">
        {/* ✅ LEFT: Item Details */}
        <div className="flex flex-col justify-center space-y-6">
          <h2 className="text-4xl font-bold text-gray-800">{itemName}</h2>
          <p className="text-xl text-[#624DAD] font-semibold">${item.price}</p>
          <p className="text-sm text-gray-600 italic">{vendorName}</p>
          <p className="text-gray-700 leading-relaxed">{item.description}</p>

          {/* ✅ Counter & Add to Cart */}
          <Counter />
        </div>

        <div className="w-full">
          {images.length > 1 ? (
            <ImageSlider images={images} />
          ) : (
            <img
              src={images[0] || "/images/default.jpg"}
              alt={item.name}
              className="w-full h-[500px] object-cover rounded-md"
            />
          )}
        </div>

      </div>
    </div>
  );
}
