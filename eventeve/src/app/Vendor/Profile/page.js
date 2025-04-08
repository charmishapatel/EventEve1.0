"use client";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header/page";

export default function EditProfile() {
  const [isEditing, setIsEditing] = useState(false);
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

  // Fetch profile data
  const fetchData = async () => {
    try {
      const res = await fetch("/api/vendor/profile");
      const data = await res.json();
      setFormData({
        firstName: data.first_name || "",
        lastName: data.last_name || "",
        email: data.email || "",
        contact: data.contact_number || "",
        street: data.address || "",
        city: data.city || "",
        province: data.province || "",
        postalCode: data.postal_code || "",
      });
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Toggle Edit Mode & Save
  const handleEditClick = async (e) => {
    e.preventDefault();

    if (isEditing) {
      // Save profile
      try {
        const res = await fetch("/api/vendor/profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error("Failed to update profile");
        alert("Profile updated successfully");
      } catch (error) {
        alert("Error updating profile: " + error.message);
      }
    }

    setIsEditing((prev) => !prev);
  };

  // Cancel Editing
  const handleCancel = () => {
    fetchData(); // reset to original data
    setIsEditing(false);
  };

  // Handle field change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative">
      {/* Header */}
      <Header />

      {/* Form Section */}
      <div className="flex flex-col items-center justify-center bg-white min-h-screen p-8 border">
        <div className="w-full max-w-3xl bg-white p-8 shadow-md rounded-lg relative">
          <h2 className="text-3xl font-semibold mb-6">Profile</h2>

          {/* Edit/Save Button */}
          <button
            className="absolute top-8 right-8 text-gray-600 hover:text-black"
            onClick={handleEditClick}
          >
            {isEditing ? "💾 Save" : "✏️ Edit"}
          </button>

          {/* Form */}
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

            {/* Email & Contact Number */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="border p-2 w-full rounded-md"
                  disabled={!isEditing}
                  value={formData.email}
                  onChange={handleChange}
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

            {/* Buttons */}
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
