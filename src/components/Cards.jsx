import React from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingBag, FaStar , FaHeart  } from 'react-icons/fa';

const Cards = ({ filteredItems }) => {
 // Función para generar estrellas
 const renderStars = (rating = 5) => {
   return Array.from({ length: 5 }, (_, index) => ( 
     <FaStar 
       key={index} 
className={`text-sm ${index < rating ? 'text-[#fc7600]' : 'text-gray-300'}`}     />
   ));
 };

 // Función para formatear precio
 const formatPrice = (price) => {
   return `S/${price.toFixed(2)}`;
 };

 return ( 
  <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-5">
    {filteredItems.map((item) => (
      <div
        key={item.id}
        className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group"
      >
        {/* Contenedor de imagen con badges */}
        <div className="relative overflow-hidden">
          <Link to={`/shop/${item.slug}`}>
            <img
              src={item.image}
              alt={item.title}
              className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Badge de descuento */}
          {item.discount && (
            <div className="absolute top-2 left-2 bg-pink-600 text-white px-2 py-1 rounded text-xs font-bold shadow">
              -{item.discount}% OFF
            </div>
          )}

          {/* Ícono de favorito */}
          <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200">
<FaHeart className="text-gray-400 hover:text-[#7FB069] transition-colors duration-200 text-sm" />
          </button>

          {/* Badge de estado (Best Sellers, etc.) */}
          {item.status && (
<div className="absolute bottom-2 left-2 bg-[#4A90A4] text-white px-2 py-1 rounded text-xs font-medium">
              {item.status}
            </div>
          )}
        </div>

        {/* Contenido del producto */}
        <div className="p-3">
          {/* Etiqueta de oferta flash */}
          {item.flash && (
            <div className="mb-1">
<span className="text-xs text-[#7FB069] font-medium uppercase tracking-wide">
                OFERTA FLASH
              </span>
            </div>
          )}

          {/* Título del producto */}
          <Link to={`/shop/${item.slug}`}>
<h4 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 hover:text-[#7FB069] transition-colors duration-200">
              {item.title}
            </h4>
          </Link>

          {/* Precios */}
          <div className="mb-3">
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
              
          {/* Estrellas y rating */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {renderStars(5)}
            </div>
            <span className="text-xs text-gray-500"></span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

};


export default Cards