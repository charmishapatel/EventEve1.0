"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header/page";

export default function ServicesSection() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/services`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Fetched Services:", data);
                setServices(data);
            } catch (error) {
                console.error("Error fetching services:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return (
        <div className="py-16 bg-white">
            <div className="container mx-auto px-8">
                <Header isHomePage={false} />

                {loading ? (
                    <p className="text-center text-lg font-bold">Loading Services...</p>
                ) : (
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <div
                                key={service.serviceid}
                                className="group relative overflow-hidden bg-white shadow-lg rounded-lg cursor-pointer"
                                onClick={() => router.push(`/User/ServiceDetails/${service.serviceid}`)}
                            >
                                {/* Image */}
                                <img
                                    src={`/images/${service.servicename.toLowerCase().replace(" ", "")}.jpg`}
                                    alt={service.servicename}
                                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110 group-hover:opacity-80"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity duration-500"></div>

                                {/* Title */}
                                <h3 className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                 style={{ fontFamily: "Redressed, cursive" }}>
                                    {service.servicename}
                                </h3>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
