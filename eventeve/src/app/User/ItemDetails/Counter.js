// "use client";

// import { useState } from 'react';

// export default function Counter() {
//   const [quantity, setQuantity] = useState(1);

//   const increment = () => {
//     setQuantity(prev => prev + 1);
//   };

//   const decrement = () => {
//     if (quantity > 1) {
//       setQuantity(prev => prev - 1);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center w-full max-w-[200px]">
//       <div className="flex items-center bg-[#624DAD] w-full text-white">
//         <button  
//           onClick={decrement}
//           className="px-6 py-2 text-xl font-light hover:bg-[#9747FF] transition-colors"
//         >
//           -
//         </button>
//         <div className="flex-1 text-center py-2">{quantity}</div>
//         <button 
//           onClick={increment}
//           className="px-6 py-2 text-xl font-light hover:bg-[#9747FF] transition-colors"
//         >
//           +
//         </button>
//       </div>

//       <button className="w-full bg-[#624DAD] text-white py-2 mt-4 hover:bg-[#9747FF] transition-colors">
//         Add to cart
//       </button>
//     </div>
//   );
// }


"use client";
import { useState } from 'react';
export default function Counter({ item, userId, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => quantity > 1 && setQuantity((prev) => prev - 1);
  const handleAddToCart = async () => {
    if (!item || !userId) {
      console.error("Item or User ID is missing");
      return;
    }
    setAdding(true);
    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userid: userId,
          itemid: item.id,
          name: item.name,
          price: item.price,
          imageurl: item.imageurl1,
          quantity,
        }),
      });
      if (!res.ok) throw new Error("Failed to add to cart");
      alert("✅ Item added to cart");
      if (onAddToCart) onAddToCart(quantity);
    } catch (err) {
      console.error("❌ Add to cart error:", err);
    } finally {
      setAdding(false);
    }
    // After POST succeeds
const currentCount = localStorage.getItem("cartCount") || 0;
localStorage.setItem("cartCount", parseInt(currentCount) + quantity);
window.dispatchEvent(new Event("cartCountUpdated"));
  };
  return (
    <div className="flex flex-col items-center w-full max-w-[200px]">
      <div className="flex items-center bg-[#624DAD] w-full text-white">
        <button onClick={decrement} className="px-6 py-2 text-xl font-light hover:bg-[#9747FF] transition-colors">-</button>
        <div className="flex-1 text-center py-2">{quantity}</div>
        <button onClick={increment} className="px-6 py-2 text-xl font-light hover:bg-[#9747FF] transition-colors">+</button>
      </div>
      <button
        onClick={handleAddToCart}
        disabled={adding}
        className="w-full bg-[#624DAD] text-white py-2 mt-4 hover:bg-[#9747FF] transition-colors disabled:opacity-50"
      >
        {adding ? "Adding..." : "Add to cart"}
      </button>
    </div>
  );
}