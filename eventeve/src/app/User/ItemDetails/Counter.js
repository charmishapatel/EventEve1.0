"use client";

import { useState } from 'react';

export default function Counter() {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity(prev => prev + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[200px]">
      <div className="flex items-center bg-[#624DAD] w-full text-white">
        <button  
          onClick={decrement}
          className="px-6 py-2 text-xl font-light hover:bg-[#9747FF] transition-colors"
        >
          -
        </button>
        <div className="flex-1 text-center py-2">{quantity}</div>
        <button 
          onClick={increment}
          className="px-6 py-2 text-xl font-light hover:bg-[#9747FF] transition-colors"
        >
          +
        </button>
      </div>

      <button className="w-full bg-[#624DAD] text-white py-2 mt-4 hover:bg-[#9747FF] transition-colors">
        Add to cart
      </button>
    </div>
  );
}