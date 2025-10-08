import React, { useState, useEffect } from "react";
import "./../css/Slideshow.css";

const Slideshow = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="slideshow-container">
      <img
        src={images[currentIndex]}
        alt={`slide-${currentIndex}`}
        className="slideshow-image"
      />
    </div>
  );
};

export default Slideshow;
