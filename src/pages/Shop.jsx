// src/pages/Shop.jsx
import React from "react";
import Products from "./Products";

const Shop = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Título de la página */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
        Nuestros Productos
      </h2>

      {/* Renderizamos el componente Products */}
      <Products />
    </div>
  );
};

export default Shop;
