import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";  
import { FaStar, FaHeart, FaArrowRight } from 'react-icons/fa';

const BestSellers = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("products1.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // 🔹 Filtrar Best Sellers
  const bestSellers = products.filter((item) => item.status === "Mas vendidos");

  // 🔹 Función para estrellas
  const renderStars = (rating = 5) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`text-sm ${index < rating ? 'text-[#fc7600]' : 'text-gray-300'}`}
      />
    ));
  };

  // 🔹 Formatear precios
  const formatPrice = (price) => `S/${price.toFixed(2)}`;

  return (
    <section className="w-full mx-auto xl:px-28 px-4 py-20 bg-gradient-to-b from-white via-blue-50/30 to-green-50/30">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center justify-between mb-12"> 
  <div> 
    <h2 className="text-2xl md:text-3xl font-light tracking-wide text-gray-900 font-serif"> 
      Lo más <span className="text-[#7FB069] font-normal">nuevo</span> 
    </h2> 
    {/* Separador */} 
    <div className="mt-2 h-1 w-20 bg-gradient-to-r from-[#7FB069] to-[#4A90A4] rounded-full"></div> 
    <p className="mt-4 text-gray-600 text-base md:text-lg max-w-md font-light tracking-wide leading-relaxed"> 
      Descubre las últimas novedades en skincare coreano seleccionadas para ti
    </p> 
  </div>
</div>


        {/* Botón “Ver todos” */}
        <Link 
          to="/shop"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2 border-2 border-[#7FB069] text-[#7FB069] rounded-full text-xs font-medium hover:bg-[#7FB069] hover:text-white transition-all duration-300"
        >
          Ver todos
          <FaArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Carrusel */}
      <div className="relative">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 15 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 25 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
            1280: { slidesPerView: 5, spaceBetween: 30 },
          }}
          navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
          modules={[Autoplay, Pagination, Navigation]}
          className="!pb-12"
        >
          {bestSellers.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group h-full flex flex-col">
                {/* Imagen con badges */}
<div className="relative overflow-hidden flex justify-center items-center bg-gray-50 h-60 sm:h-64 md:h-56">
  <Link to={`/shop/${item.id}`} className="w-full h-full">
    <img
      src={item.image}
      alt={item.title}
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
  </Link>

  {/* Badge descuento */}
  {item.discount && (
    <div className="absolute top-2 left-2 bg-pink-600 text-white px-2 py-1 rounded text-xs font-bold shadow">
      -{item.discount}% OFF
    </div>
  )}

  {/* Botón favorito */}
  <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200">
    <FaHeart className="text-gray-400 hover:text-[#7FB069] transition-colors duration-200 text-sm" />
  </button>

  {/* Badge estado */}
  {item.status && (
    <div className="absolute bottom-2 left-2 bg-[#4A90A4] text-white px-2 py-1 rounded text-xs font-medium">
      {item.status}
    </div>
  )}
</div>


                {/* Contenido */}
                <div className="p-3 flex flex-col flex-grow">
                  {item.flash && (
                    <span className="text-xs text-[#7FB069] font-medium uppercase tracking-wide mb-1">
                      OFERTA FLASH
                    </span>
                  )}

                  {/* Título */}
                  <Link to={`/shop/${item.id}`}>
                    <h4 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 hover:text-[#7FB069] transition-colors duration-200">
                      {item.title}
                    </h4>
                  </Link>

                  {/* Precios */}
                  <div className="mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">
                        {formatPrice(item.price)}
                      </span>
                      {item["comparison-price"] && (
                        <span className="text-sm text-gray-500 line-through">
                          {formatPrice(item["comparison-price"])}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Estrellas */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1">
                      {renderStars(5)}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BestSellers;
