import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import slideshowAi from "@/assets/slideshow-ai.jpg";
import slideshowQuantum from "@/assets/slideshow-quantum.jpg";
import slideshowCloud from "@/assets/slideshow-cloud.jpg";
import slideshowCode from "@/assets/slideshow-code.jpg";

const slides = [
  { image: slideshowAi, label: "AI & Neural Networks" },
  { image: slideshowQuantum, label: "Quantum Computing" },
  { image: slideshowCloud, label: "Cloud Infrastructure" },
  { image: slideshowCode, label: "Software Development" },
];

export function TechSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentIndex].image}
            alt={slides[currentIndex].label}
            className="w-full h-full object-cover rounded-xl"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent rounded-xl" />
          
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute bottom-4 left-4 right-4"
          >
            <span className="px-3 py-1.5 rounded-lg bg-card/80 backdrop-blur-sm border border-border/50 text-sm font-medium text-foreground">
              {slides[currentIndex].label}
            </span>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Slide indicators */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-primary w-6"
                : "bg-muted-foreground/50 hover:bg-muted-foreground"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
