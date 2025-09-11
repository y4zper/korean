// src/pages/Shop.jsx
import React from "react";
import ProductsMarca from "./ProductsMarca";

const Brands = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Título de la página */}
      <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
        Marcas
      </h2>

      {/* Renderizamos el componente Products */}
      <ProductsMarca/>
    </div>
  );
};

export default Brands;
