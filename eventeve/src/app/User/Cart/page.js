"use client";
import Header from "@/app/components/Header/page";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter

const Cart = () => {
  const router = useRouter(); // Initialize router

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Sweet Cupcake",
      price: 35,
      quantity: 1,
      image: "/images/default.jpg",
    },
    {
      id: 2,
      name: "Chair",
      price: 99,
      quantity: 5,
      image: "/images/default.jpg",
    },
  ]);

  const handleIncrease = (id) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrease = (id) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleRequestBooking = () => {
    router.push(`/User/Booking`); // Navigate to Booking page
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header />

      <div>
        <h2 className="text-2xl font-semibold text-center">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center mt-4">Your cart is empty.</p>
        ) : (
          <div className="mt-4">
            {cartItems.map((item) => (
              <div 
                key={item.id}
                className="bg-white max-w-6xl mx-auto mt-8 p-4 border border-black mb-4 min-h-[150px] flex"
              >
                {/* Left Side - Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-27 rounded-lg object-cover border"
                />

                {/* Middle - Name and Counter */}
                <div className="flex-1 ml-4 flex flex-col justify-between">
                  {/* Item Name (Top Left) */}
                  <h3 className="text-lg font-medium">{item.name}</h3>

                  {/* Counter (Bottom Left) */}
                  <div className="flex items-center">
                    <button
                      className="bg-[#624DAD] text-white px-4 py-2 rounded-md"
                      onClick={() => handleDecrease(item.id)}
                    >
                      -
                    </button>
                    <span className="mx-4">{item.quantity}</span>
                    <button
                      className="bg-[#624DAD] text-white px-4 py-2 rounded-md"
                      onClick={() => handleIncrease(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Right Side - Delete Icon & Total Price */}
                <div className="flex flex-col justify-between text-right">
                  {/* Delete Icon (Top Right) */}
                  <button onClick={() => handleRemove(item.id)} className="self-end">
                    <img 
                      src="/images/delete.png" 
                      alt="Delete" 
                      className="w-6 h-6 cursor-pointer"
                    />
                  </button>

                  {/* Total Price Per Item (Bottom Right) */}
                  <p className="text-gray-700">{item.quantity} x ${item.price}</p>
                </div>
              </div>
            ))}

            {/* Total Amount */}
            <div className="text-center">
              <p className="text-xl font-semibold">Total: ${totalAmount}</p>
            </div>

            {/* Centered "Request Booking" Button */}
            <div className="flex justify-center mt-4">
              <button
                className="w-[250px] bg-[#624DAD] text-white py-3 rounded-lg text-lg font-semibold"
                onClick={handleRequestBooking}
              >
                Request Booking
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
