"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';

export default function ImageSlider({ images }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };
  
  const previousSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: previousSlide,
    trackMouse: true
  });

  return (
    <div className="relative aspect-square w-full max-w-xl mx-auto" {...handlers}>
      {/* Navigation arrows */}
      <button 
        onClick={previousSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
      >
        ← 
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
      >
        →
      </button>

      {/* Images */}
      <div className="relative h-full overflow-hidden">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-300 ease-in-out transform ${
              index === currentSlide 
                ? 'translate-x-0' 
                : index < currentSlide 
                  ? '-translate-x-full' 
                  : 'translate-x-full'
            }`}
          >
            <Image
              src={img}
              alt={`Product image ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-opacity ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}