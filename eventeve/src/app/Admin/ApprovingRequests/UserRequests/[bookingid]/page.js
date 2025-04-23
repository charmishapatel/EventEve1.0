"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SideNav from "@/app/components/SideNav/page";

export default function UserRequestDetail() {
  const { bookingid } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/admin/booking/${bookingid}`);
        const data = await res.json();
        setBooking(data);
      } catch (error) {
        console.error("Failed to fetch booking:", error);
      }
    };

    if (bookingid) fetchBooking();
  }, [bookingid]);

  if (!booking) {
    return (
      <div className="flex min-h-screen">
        <SideNav />
        <div className="flex-1 p-10 bg-white">
          <h1 className="text-3xl font-bold">Loading or Booking not found...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <SideNav />
      <div className="flex-1 p-10 bg-white">
        <h1 className="text-4xl font-bold mb-4">Request Details for {booking.firstname} {booking.lastname}</h1>
        <div className="text-lg space-y-2">
          <p><strong>Service:</strong> {booking.servicename}</p>
          <p><strong>Description:</strong> {booking.otherinformation}</p>
          <p><strong>Event Date:</strong> {booking.eventdate}</p>
          <p><strong>Address:</strong> {booking.deliveryaddress}</p>
        </div>

        <div className="mt-6 flex gap-4">
          <button className="px-4 py-2 bg-green-500 text-white rounded-md">Approve</button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md">Decline</button>
        </div>
      </div>
    </div>
  );
}
