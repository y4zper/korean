import React, { useEffect, useState } from "react";
import { FaGift , FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Banner2 = () => {
  const promoSlides = [
    { id: 1, image: "./img/banner1.jpeg" },
    { id: 2, image: "./img/banner2.jpg" },
    { id: 3, image: "./img/banner3.jpeg" }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === promoSlides.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [promoSlides.length]);

  const nextSlide = () => {
    setCurrentSlide(
      currentSlide === promoSlides.length - 1 ? 0 : currentSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide(
      currentSlide === 0 ? promoSlides.length - 1 : currentSlide - 1
    );
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
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <img
                    src={slide.image}
                    alt={`Slide ${slide.id}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10"></div>
                </motion.div>
              )
          )}
        </AnimatePresence>

        {/* Controles */}
        <motion.button
          onClick={prevSlide}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 sm:p-3 rounded-full shadow-md z-20"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <FaChevronLeft className="text-sm sm:text-base" />
        </motion.button>

        <motion.button
          onClick={nextSlide}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 sm:p-3 rounded-full shadow-md z-20"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <FaChevronRight className="text-sm sm:text-base" />
        </motion.button>

        {/* Indicadores */}
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {promoSlides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? "bg-[#7FB069] scale-125 shadow-md"
                  : "bg-white/70 hover:bg-white/90"
              }`}
              whileTap={{ scale: 1.4 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            />
          ))}
        </motion.div>
      </div>

      {/* Franja Promo */}
      <motion.div
        className="bg-[#7FB069] p-2 sm:p-3 shadow-md"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-white text-sm sm:text-base font-semibold">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <FaGift className="text-base animate-pulse" />
            <span className="text-xs">¡Regalo Gratis!</span>
            <span className="text-xs hidden sm:inline opacity-100">
              Mascarilla con Cualquier Compra
            </span>
          </motion.div>

          <div className="h-4 w-px bg-white/40 hidden sm:block"></div>

          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <FaGift className="text-base animate-pulse" />
            <span className="text-xs">Producto Sorpresa</span>
            <span className="text-xs opacity-100">Por Compras + S/250</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Banner2;
