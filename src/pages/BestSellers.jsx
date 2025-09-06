import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";  
import { FaHeart, FaShoppingBag, FaArrowRight } from 'react-icons/fa';

const BestSellers = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("products1.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const bestSellers = products.filter((item) => item.status === "Best Selers");

  return (
    <section className="w-full mx-auto xl:px-28 px-4 py-20 bg-gradient-to-br from-blue-50/30 via-white to-green-50/40" 
             style={{
               background: 'linear-gradient(135deg, #B8E6E6/10 0%, #FFFFFF 50%, #A8D5BA/15 100%)'
             }}>
      {/* Encabezado con colores de marca */}
      <div className="flex items-center justify-between mb-12">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium text-emerald-700 border border-emerald-200"
                  style={{
                    backgroundColor: '#A8D5BA/20',
                    borderColor: '#7FB069/30',
                    color: '#7FB069'
                  }}>
              ✨ LO NUEVO
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight">
            인기 제품
          </h2>
          <p className="text-lg text-gray-600 font-light max-w-lg">
            Descubre los productos más populares seleccionados especialmente para ti
          </p>
        </div>
        
        <Link 
          to="/"
          className="hidden md:flex items-center gap-2 px-6 py-3 text-gray-700 hover:text-blue-600 transition-colors group"
          style={{ '--hover-color': '#4A90A4' }}
        >
          <span className="font-medium">Ver todos</span>
          <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Carrusel con colores de marca */}
      <div className="relative">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ 
            clickable: true,
            bulletActiveClass: 'swiper-pagination-bullet-active'
          }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 3, spaceBetween: 25 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
            1280: { slidesPerView: 5, spaceBetween: 30 },
          }}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="!pb-12"
        >
          {bestSellers.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-2xl transition-all duration-500 h-full flex flex-col hover:-translate-y-2"
                   style={{
                     border: '1px solid #E8EAED',
                     '--hover-border': '#A8D5BA/50'
                   }}>
                {/* Imagen con overlay */}
                <div className="relative overflow-hidden">
                  {/* Badge LO NUEVO con colores de marca */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-bold text-white shadow-lg"
                          style={{ backgroundColor: '#7FB069' }}>
                      LO NUEVO
                    </span>
                  </div>
                  
                  {/* Botón de favoritos */}
                  <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="p-2 backdrop-blur-sm rounded-full text-gray-600 hover:text-white shadow-lg transition-all duration-300"
                            style={{
                              backgroundColor: 'rgba(255,255,255,0.9)',
                              '--hover-bg': '#4A90A4'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#4A90A4'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.9)'}>
                      <FaHeart className="w-4 h-4" />
                    </button>
                  </div>

                  <Link to={`/shop/${product.id}`} className="block">
                    <div className="aspect-[3/4] overflow-hidden"
                         style={{
                           background: 'linear-gradient(135deg, #F9F7F4 0%, #E8EAED 100%)'
                         }}>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  </Link>
                  
                  {/* Overlay gradient con tonos de marca */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                       style={{
                         background: 'linear-gradient(to top, rgba(168,213,186,0.1), transparent)'
                       }}></div>
                </div>

                {/* Contenido */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex-grow space-y-3">
                    {/* Marca con color de acento */}
                    <h3 className="text-sm font-semibold uppercase tracking-wide"
                        style={{ color: '#4A90A4' }}>
                      {product.category}
                    </h3>
                    
                    {/* Título del producto */}
                    <h4 className="text-base font-medium text-gray-900 leading-snug group-hover:text-gray-700 transition-colors line-clamp-2 min-h-[3rem]">
                      {product.title}
                    </h4>

                    {/* Precio */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-gray-900">
                          S/ {product.price}
                        </span>
                      </div>
                      
                      {/* Rating con estrellas */}
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-sm">⭐</span>
                        ))}
                        <span className="text-xs text-gray-500 ml-1">(4.8)</span>
                      </div>
                    </div>
                  </div>

                  {/* Botón de acción con colores de marca */}
                  <div className="mt-4 pt-4 border-t" style={{ borderColor: '#E8EAED' }}>
                    <Link
                      to={`/shop/${product.id}`}
                      className="w-full flex items-center justify-center gap-2 py-3 text-white text-sm font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        backgroundColor: '#7FB069'
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#4A90A4'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = '#7FB069'}
                    >
                      <FaShoppingBag className="w-4 h-4" />
                      <span>Ver Producto</span>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navegación personalizada con colores de marca */}
        <div className="hidden lg:block">
          <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center text-gray-600 transition-all duration-300 z-10 hover:shadow-2xl"
                  style={{
                    border: '1px solid #E8EAED'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#4A90A4';
                    e.target.style.borderColor = '#A8D5BA';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#6B7280';
                    e.target.style.borderColor = '#E8EAED';
                  }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="custom-next absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 w-12 h-12 bg-white shadow-xl rounded-full flex items-center justify-center text-gray-600 transition-all duration-300 z-10 hover:shadow-2xl"
                  style={{
                    border: '1px solid #E8EAED'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#4A90A4';
                    e.target.style.borderColor = '#A8D5BA';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#6B7280';
                    e.target.style.borderColor = '#E8EAED';
                  }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Botón Ver Más para móviles con colores de marca */}
      <div className="flex justify-center mt-8 md:hidden">
        <Link 
          to="/"
          className="flex items-center gap-2 px-8 py-3 text-white rounded-full transition-all duration-300"
          style={{
            backgroundColor: '#7FB069'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#4A90A4'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#7FB069'}
        >
          <span className="font-medium">Ver todos</span>
          <FaArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <style jsx>{`
        .swiper-pagination-bullet-active {
          background-color: #7FB069 !important;
        }
        .swiper-pagination-bullet {
          background-color: #E8EAED !important;
        }
      `}</style>
    </section>
  );
};

export default BestSellers;