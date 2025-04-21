"use client";

import Header from "@/app/components/Header/page";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51RBMQyRvozgqRzKOJw9aNhBfrgkptKFExmyx3giiFADMehxcVW4OtjzHwE5AubqLko2f3aEYWpT94zBtso4D9IpJ00JIRqxIwp");

const Cart = () => {
  const router = useRouter();
  const userId = 1; // Static user for now

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/payment/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cartItems }),
    });

    const { id } = await res.json();
    await stripe.redirectToCheckout({ sessionId: id });
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/cart/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch cart items");
        const data = await res.json();
        console.log("🛒 Cart items fetched:", data);
        setCartItems(data);
      } catch (err) {
        console.error("❌ Error loading cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleRemove = async (itemid) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/cart/${userId}/${itemid}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to remove item");

      setCartItems((prev) => prev.filter((item) => item.itemid !== itemid));

      const newCount = cartItems
        .filter((item) => item.itemid !== itemid)
        .reduce((total, item) => total + item.quantity, 0);

      localStorage.setItem("cartCount", newCount);
      window.dispatchEvent(new Event("cartCountUpdated"));
    } catch (err) {
      console.error("❌ Error removing item:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black p-6">
      <Header />
      <h2 className="text-2xl font-semibold text-center">Your Cart</h2>

      {loading ? (
        <p className="text-center mt-4">Loading...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">Your cart is empty.</p>
      ) : (
        <div className="mt-6">
          {cartItems.map((item) => (
            <div
              key={item.cartid}
              className="bg-white max-w-6xl mx-auto mt-6 p-4 border border-black mb-4 min-h-[150px] flex"
            >
              <img
                src={item.imageurl || "/images/default.jpg"}
                alt={item.name}
                className="w-24 h-28 rounded-lg object-cover border"
              />
              <div className="flex-1 ml-4 flex flex-col justify-between">
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <div className="flex flex-col justify-between text-right">
                <button
                  onClick={() => handleRemove(item.itemid)}
                  className="self-end mb-2"
                  title="Remove from cart"
                >
                  <img
                    src="/images/delete.png"
                    alt="Remove"
                    className="w-6 h-6 cursor-pointer"
                  />
                </button>
                <p className="text-gray-700">
                  {item.quantity} x ${item.price}
                </p>
                <p className="text-md font-bold">
                  = ${(item.quantity * item.price).toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          <div className="text-center mt-6">
            <p className="text-xl font-semibold">
              Total: ${totalAmount.toFixed(2)}
            </p>
          </div>

          <div className="flex justify-center mt-4">
            <button
              className="w-[250px] bg-[#624DAD] text-white py-3 rounded-lg text-lg font-semibold"
              onClick={() => router.push("/User/Booking")}
            >
              Request Booking
            </button>
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={handleCheckout}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg"
            >
              Proceed to payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
