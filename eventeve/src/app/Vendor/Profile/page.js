"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import Header from "../../components/Header/page";

export default function EditProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
  });

  const apiBase = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

  // ✅ Fetch vendor profile data
  const fetchData = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.error("User not logged in.");
        alert("Please log in first.");
        return;
      }

      const token = await user.getIdToken();

      const res = await axios.get(`${apiBase}/api/vendor/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;

      setFormData({
        firstName: data.first_name || "",
        lastName: data.last_name || "",
        email: data.email || "",
        contact: data.phonenumber || "",
        street: data.address || "",
        city: data.city || "",
        province: data.province || "",
        postalCode: data.postal_code || "",
      });
    } catch (error) {
      console.error("❌ Error fetching profile:", error);
      alert("Could not fetch profile data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Handle Save / Edit toggle
  const handleEditClick = async (e) => {
    e.preventDefault();
    if (isEditing) {
      try {
        const auth = getAuth();
        const token = await auth.currentUser.getIdToken();

        await axios.put(`${apiBase}/api/vendor/profile`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("✅ Profile updated successfully");
      } catch (error) {
        console.error("❌ Error updating profile:", error);
        alert("Error updating profile");
      }
    }
    setIsEditing((prev) => !prev);
  };

  const handleCancel = () => {
    fetchData();
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="relative">
      <Header />
      <div className="flex flex-col items-center justify-center bg-white min-h-screen p-8 border">
        <div className="w-full max-w-3xl bg-white p-8 shadow-md rounded-lg relative">
          <h2 className="text-3xl font-semibold mb-6">Profile</h2>

          <button
            className="absolute top-8 right-8 text-gray-600 hover:text-black"
            onClick={handleEditClick}
          >
            {isEditing ? "💾 Save" : "✏ Edit"}
          </button>

          <form className="space-y-6" onSubmit={handleEditClick}>
            {/* Name */}
            <div>
              <label className="block font-semibold mb-1">Name</label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  className="border p-2 w-full rounded-md"
                  disabled={!isEditing}
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  className="border p-2 w-full rounded-md"
                  disabled={!isEditing}
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email & Contact */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="border p-2 w-full rounded-md"
                  disabled
                  value={formData.email}
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Contact Number</label>
                <input
                  type="text"
                  name="contact"
                  placeholder="Contact number"
                  className="border p-2 w-full rounded-md"
                  disabled={!isEditing}
                  value={formData.contact}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block font-semibold mb-1">Address</label>
              <input
                type="text"
                name="street"
                placeholder="Street Name"
                className="border p-2 w-full rounded-md mb-2"
                disabled={!isEditing}
                value={formData.street}
                onChange={handleChange}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="border p-2 w-full rounded-md"
                  disabled={!isEditing}
                  value={formData.city}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="province"
                  placeholder="Province"
                  className="border p-2 w-full rounded-md"
                  disabled={!isEditing}
                  value={formData.province}
                  onChange={handleChange}
                />
              </div>
              <input
                type="text"
                name="postalCode"
                placeholder="Postal / Zip Code"
                className="border p-2 w-full rounded-md mt-2"
                disabled={!isEditing}
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>

            {isEditing && (
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-purple-500 text-white w-1/2 py-2 rounded-md shadow-md hover:bg-purple-600"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-black w-1/2 py-2 rounded-md shadow-md hover:bg-gray-400 ml-2"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
