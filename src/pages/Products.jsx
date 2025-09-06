import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useLocation } from "react-router-dom"; // 👈 Importante para leer query params
import Cards from "../components/Cards";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  // 👇 leer categoría de la URL
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryFromUrl = params.get("category");

  // Cargar productos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/products1.json");
        const data = await response.json();
        setProducts(data);
        setFilteredItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Filtrado
  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? products
        : products.filter((item) => item.category === category);
    setFilteredItems(filtered);
    setSelectedCategory(category);
  };

  // Mostrar todos
  const showAll = () => {
    setFilteredItems(products);
    setSelectedCategory("all");
  };

  // Ordenamiento
  const handleSortChange = (option) => {
    setSortOption(option);
    let sortedItems = [...filteredItems];

    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setFilteredItems(sortedItems);
  };

  // 👇 aplicar filtro si viene categoría en la URL
  useEffect(() => {
    if (products.length > 0) {
      if (categoryFromUrl && categoryFromUrl !== "all") {
        filterItems(categoryFromUrl);
      } else {
        showAll();
      }
    }
  }, [categoryFromUrl, products]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 pt-10">
      {/* Header */}
      <div className="mb-5 text-center">
  <h1 className="text-2xl font-bold text-gray-900 mb-2">
    {selectedCategory === "all"
      ? "Conoce nuestros productos"
      : `${selectedCategory}`}
  </h1>
  <p className="text-gray-500 text-sm">
    {filteredItems.length} productos
  </p>
</div>


      {/* Filtros */}
      <div className="flex flex-row-reverse sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-gray-100">
        {/* Botón de filtros en móviles */}
        <div className="sm:hidden w-full">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 w-full text-sm font-medium text-gray-700 bg-gray-100 px-3 py-2 rounded-md"
          >
            <FaFilter />
            Ajustes
          </button>

          {/* Categorías desplegables */}
          {showFilters && (
            <div className="flex flex-wrap gap-2 mt-3">
              <button
                onClick={showAll}
                className={`text-sm py-1 px-2 ${
                  selectedCategory === "all"
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Todo
              </button>
              <button
                onClick={() => filterItems("Hidratantes")}
                className={`text-sm py-1 px-2 ${
                  selectedCategory === "Hidratantes"
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Hidratantes
              </button>
              <button
                onClick={() => filterItems("Bloqueadores")}
                className={`text-sm py-1 px-2 ${
                  selectedCategory === "Bloqueadores"
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Bloqueadores
              </button>
              <button
                onClick={() => filterItems("Limpiadores")}
                className={`text-sm py-1 px-2 ${
                  selectedCategory === "Limpiadores"
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Limpiadores
              </button>
              <button
                onClick={() => filterItems("Serums")}
                className={`text-sm py-1 px-2 ${
                  selectedCategory === "Serums"
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Serums
              </button>
              <button
                onClick={() => filterItems("Tonicos")}
                className={`text-sm py-1 px-2 ${
                  selectedCategory === "Tonicos"
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Tónicos
              </button>
              <button
                onClick={() => filterItems("Perfumes")}
                className={`text-sm py-1 px-2 ${
                  selectedCategory === "Perfumes"
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Perfumes
              </button>
            </div>
          )}
        </div>

        {/* Categorías en escritorio */}
        <div className="hidden sm:flex flex-wrap gap-2">
          <button
            onClick={showAll}
            className={`text-sm py-1 px-2 ${
              selectedCategory === "all"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Todo
          </button>
          <button
            onClick={() => filterItems("Hidratantes")}
            className={`text-sm py-1 px-2 ${
              selectedCategory === "Hidratantes"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Hidratantes
          </button>
          <button
            onClick={() => filterItems("Bloqueadores")}
            className={`text-sm py-1 px-2 ${
              selectedCategory === "Bloqueadores"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Bloqueadores
          </button>
          <button
            onClick={() => filterItems("Limpiadores")}
            className={`text-sm py-1 px-2 ${
              selectedCategory === "Limpiadores"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Limpiadores
          </button>
          <button
            onClick={() => filterItems("Serums")}
            className={`text-sm py-1 px-2 ${
              selectedCategory === "Serums"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Serums
          </button>
          <button
            onClick={() => filterItems("Tonicos")}
            className={`text-sm py-1 px-2 ${
              selectedCategory === "Tonicos"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Tónicos
          </button>
          <button
            onClick={() => filterItems("Perfumes")}
            className={`text-sm py-1 px-2 ${
              selectedCategory === "Perfumes"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Perfumes
          </button>
        </div>

        {/* Ordenamiento */}
        <select
          onChange={(e) => handleSortChange(e.target.value)}
          value={sortOption}
          className="text-sm text-gray-700 bg-transparent border border-gray-200 rounded-md px-2 py-1 cursor-pointer"
        >
          <option value="default">Ordenar por</option>
          <option value="A-Z">Nombre A-Z</option>
          <option value="Z-A">Nombre Z-A</option>
          <option value="low-to-high">Precio menor</option>
          <option value="high-to-low">Precio mayor</option>
        </select>
      </div>

      {/* Cards */}
      <Cards filteredItems={filteredItems} />
    </div>
  );
};

export default Products;
