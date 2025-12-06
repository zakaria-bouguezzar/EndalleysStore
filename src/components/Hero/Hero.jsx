import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import hero1 from "../../assets/Endalleys-hero1.png";
import hero2 from "../../assets/Endalleys-hero2.png";

const Hero = () => {
  const images = [hero1, hero2];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const slideInterval = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (isPlaying) {
      slideInterval.current = setInterval(nextSlide, 4000);
    }
    return () => clearInterval(slideInterval.current);
  }, [isPlaying, currentIndex]);

  const togglePlay = () => setIsPlaying((prev) => !prev);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Full-height on desktop (≥ md), 80vh on mobile */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat transition-all duration-700 
                   md:h-screen h-[80vh]              
                   min-h-[500px]"                   
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      />

      {/* Optional dark overlay for better text readability (remove if you don’t need it) */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* Control Bar – now sits nicely on top of the image at the bottom */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center items-center gap-4 py-4 bg-white/90 backdrop-blur-sm shadow-lg md:py-5">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === currentIndex
                  ? "bg-black scale-125"
                  : "bg-gray-400 hover:bg-gray-600"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Play / Pause */}
        <button
          onClick={togglePlay}
          className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={22} /> : <Play size={22} />}
        </button>

        <button
          onClick={nextSlide}
          className="p-3 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default Hero;