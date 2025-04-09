"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/app/components/Header/page";

export default function ServiceDetails() {
    const { id } = useParams();
    const router = useRouter();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const fetchItems = async () => {
            try {
                console.log(`Fetching items for service ID: ${id}`);
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/service/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Fetched Items:", data); // ✅ Debug API Response
                setItems(data.items || []);
            } catch (error) {
                console.error("Error fetching service items:", error);
            } finally {
                setLoading(false);
            }
        };
    
        if (id) {
            fetchItems();
        }
    }, [id]);
    

    return (
        <div className="py-16 bg-white">
            <div className="container mx-auto px-8">
                <Header isHomePage={false} />

                {/* ✅ Back Button */}
                <button 
                    onClick={() => router.back()} 
                    className="bg-gray-200 px-4 py-2 rounded-md mb-4"
                >
                    ← Back
                </button>

                <h2 className="text-4xl font-bold text-center mb-6">Service Items</h2>

                {loading ? (
                    <p className="text-center text-lg font-bold">Loading Items...</p>
                ) : items.length === 0 ? (
                    <p className="text-center text-lg font-bold text-red-600">No items found for this service.</p>
                ) : (
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {items.map((item, index) => (
                            <div 
                                key={item.id || `fallback-${index}`} 
                                className="group relative bg-white shadow-lg rounded-lg border border-black p-4 cursor-pointer"
                                onClick={() => {
                                    const itemName = item.furniturename || item.cakename || item.decorationname || item.bandname || item.mealname || item.flowername;
                                
                                    if (!itemName) {
                                        console.error("❌ Item name is missing!", item);
                                        return; // Prevent navigation if no name is found
                                    }
                                
                                    console.log("✅ Navigating to:", `/User/ItemDetails/${encodeURIComponent(itemName)}`);
                                    router.push(`/User/ItemDetails/${encodeURIComponent(itemName)}`);
                                }}
                                
                                                        
                            >
                                
                                {/* ✅ Display Image */}
                                <img
                                    src={item.imageurl1 || "/images/default.jpg"}
                                    alt={
                                        item.furniturename || item.cakename || item.decorationname || 
                                        item.bandname || item.mealname || item.flowername || "Unnamed Item"
                                    }
                                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-100 group-hover:opacity-80 rounded-md"
                                    onError={(e) => (e.target.src = "/images/default.jpg")}
                                />


                                {/* ✅ Display Name and Price */}
                                <div className="p-4 text-center">
                                <h3 className="text-xl font-bold">
                                    {item.furniturename || item.cakename || item.decorationname || 
                                    item.bandname || item.mealname || item.flowername || "Unnamed Item"}
                                </h3>

                                    <p className="text-gray-700 font-semibold">${item.price}</p>
                                </div>
                            </div>
                            
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
