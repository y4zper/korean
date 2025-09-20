import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingBag, FaStar, FaHeart } from 'react-icons/fa';

const Cards = ({ filteredItems }) => {
  const [favorites, setFavorites] = useState(new Set());
  const [hoveredCard, setHoveredCard] = useState(null);

  // Función para generar rating aleatorio entre 4.7 y 4.9
  const generateRandomRating = (id) => {
    const seed = id * 1000; // Usar ID como semilla para consistencia
    const random = (seed % 21) / 100; // Generar número entre 0 y 0.20
    return 4.7 + random; // Rating entre 4.7 y 4.9
  };

  // Función para generar número de reviews aleatorio
  const generateRandomReviews = (id) => {
    const seed = id * 123;
    return 50 + (seed % 200); // Reviews entre 50 y 250
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  // Función para generar estrellas (manteniendo tu estilo original)
  const renderStars = (rating = 5) => {
    return Array.from({ length: 5 }, (_, index) => ( 
      <FaStar 
        key={index} 
        className={`text-sm ${index < rating ? 'text-[#fc7600]' : 'text-gray-300'}`}
      />
    ));
  };

  const formatPrice = (price) => {
    return `S/${price.toFixed(2)}`;
  };

  const calculateDiscount = (price, comparePrice) => {
    if (!comparePrice) return 0;
    return Math.round(((comparePrice - price) / comparePrice) * 100);
  };

  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-5">
      {filteredItems.map((item) => {
        const isHovered = hoveredCard === item.id;
        const isFavorite = favorites.has(item.id);
        const itemRating = generateRandomRating(item.id);
        const itemReviews = generateRandomReviews(item.id);
        
        return (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group"
            onMouseEnter={() => setHoveredCard(item.id)}
            onMouseLeave={() => setHoveredCard(null)}
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

              {/* Ícono de favorito mejorado */}
              <button 
                onClick={() => toggleFavorite(item.id)}
                className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition-all duration-200 ${
                  isFavorite 
                    ? 'bg-pink-500 text-white' 
                    : 'bg-white text-gray-400 hover:bg-gray-50 hover:text-[#7FB069]'
                }`}
              >
                <FaHeart className={`text-sm transition-colors duration-200 ${
                  isFavorite ? 'text-white' : ''
                }`} />
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
  <div className="flex items-center justify-between">
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
    {/* Línea de ahorro a la derecha */}
    {item["comparison-price"] && item["comparison-price"] > item.price && (
      <span className="text-sm text-blue-600 font-semibold">
        Ahorra {formatPrice(item["comparison-price"] - item.price)}
      </span>
    )}
  </div>
</div>
                  
              {/* Estrellas y rating mejorado */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {renderStars(5)}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium text-gray-700">
                    {itemRating.toFixed(1)}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({itemReviews})
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;