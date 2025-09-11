import React, { useEffect, useState } from "react";
import { FaShoppingBag, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Banner2 = () => {
  const promoSlides = [
    { id: 1, image: "./img/banner1.jpeg" },
    { id: 2, image: "./img/banner2.jpeg" },
    { id: 3, image: "./img/banner1.jpeg" }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === promoSlides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [promoSlides.length]);

  const nextSlide = () => {
    setCurrentSlide(currentSlide === promoSlides.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? promoSlides.length - 1 : currentSlide - 1);
  };

  return (
    <div className="w-full">
      {/* Banner */}
      <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 w-full overflow-hidden">
        <AnimatePresence>
          {promoSlides.map(
            (slide, index) =>
              index === currentSlide && (
                <motion.div
                  key={slide.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  <img
                    src={slide.image}
                    alt={`Slide ${slide.id}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                </motion.div>
              )
          )}
        </AnimatePresence>

        {/* Controles */}
        <button
          onClick={prevSlide}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 sm:p-3 rounded-full transition-transform duration-300 hover:scale-110 shadow-md z-20"
        >
          <FaChevronLeft className="text-sm sm:text-base" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 sm:p-3 rounded-full transition-transform duration-300 hover:scale-110 shadow-md z-20"
        >
          <FaChevronRight className="text-sm sm:text-base" />
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {promoSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? "bg-[#7FB069] scale-125 shadow-md"
                  : "bg-white/70 hover:bg-white/90"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Franja Promo */}
      <div className="bg-[#7FB069] p-2 sm:p-3 shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-white text-sm sm:text-base font-semibold">
          <div className="flex items-center gap-2">
            <FaShoppingBag className="text-base animate-pulse" />
            <span className="text-xs">¡Regalo Gratis!</span>
            <span className="text-xs hidden sm:inline opacity-80">
              Mascarilla con Cualquier Compra
            </span>
          </div>
          <div className="h-4 w-px bg-white/40 hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <FaShoppingBag className="text-base animate-pulse" />
            <span className="text-xs">Producto Sorpresa</span>
            <span className="text-xs opacity-80">con Compras + S/250</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner2;