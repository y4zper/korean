import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import Cards from "../components/Cards";
import Banner from "./Banner";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  // leer categoría de la URL
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryFromUrl = params.get("category");

  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const headerVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const filterVariants = {
    hidden: { x: -30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const mobileFiltersVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.4, ease: "easeInOut" }
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  // Cargar productos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/products1.json");
        const data = await response.json();
        
        // Filtrar productos agotados
        const availableProducts = data.filter(
          (item) => item.status !== "Agotados"
        );
        
        setProducts(availableProducts);
        setFilteredItems(availableProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Filtrado con animación
  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? products
        : products.filter((item) => item.category === category);
    
    // Pequeño delay para suavizar la transición
    setTimeout(() => {
      setFilteredItems(filtered);
      setSelectedCategory(category);
    }, 100);
  };

  // Mostrar todos
  const showAll = () => {
    setTimeout(() => {
      setFilteredItems(products);
      setSelectedCategory("all");
    }, 100);
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

  // aplicar filtro si viene categoría en la URL
  useEffect(() => {
    if (products.length > 0) {
      if (categoryFromUrl && categoryFromUrl !== "all") {
        filterItems(categoryFromUrl);
      } else {
        showAll();
      }
    }
  }, [categoryFromUrl, products]);

  const categories = [
    { name: "Todo", value: "all" },
    { name: "Hidratantes", value: "Hidratantes" },
    { name: "Bloqueadores", value: "Bloqueadores" },
    { name: "Limpiadores", value: "Limpiadores" },
    { name: "Serums", value: "Serums" },
    { name: "Tónicos", value: "Tonicos" },
    { name: "Perfumes", value: "Perfumes" },

  ];

  return (
    <motion.div 
      className="mx-auto max-w-7xl px-4 py-16 pt-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div 
        className="mb-5 text-center"
        variants={headerVariants}
      >
        <motion.h1 
          className="text-2xl font-bold text-gray-900 mb-2"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {selectedCategory === "all"
            ? "Conoce nuestros productos"
            : `${selectedCategory}`}
        </motion.h1>
        <motion.p 
          className="text-gray-500 text-sm"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {filteredItems.length} productos
        </motion.p>
      </motion.div>

      {/* Filtros */}
      <motion.div 
        className="flex flex-row-reverse sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-gray-100"
        variants={filterVariants}
      >
        {/* Botón de filtros en móviles */}
        <div className="sm:hidden w-full">
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 w-full text-sm font-medium text-gray-700 bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              animate={{ rotate: showFilters ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaFilter />
            </motion.div>
            Ajustes
          </motion.button>

          {/* Categorías desplegables */}
          <AnimatePresence>
            {showFilters && (
              <motion.div 
                className="flex flex-wrap gap-2 mt-3 overflow-hidden"
                variants={mobileFiltersVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {categories.map((category, index) => (
                  <motion.button
                    key={category.value}
                    onClick={() => category.value === "all" ? showAll() : filterItems(category.value)}
                    className={`text-sm py-1 px-2 transition-all duration-200 ${
                      selectedCategory === category.value
                        ? "text-gray-900 border-b-2 border-gray-900"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category.name}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Categorías en escritorio */}
        <motion.div 
          className="hidden sm:flex flex-wrap gap-2"
          variants={containerVariants}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.value}
              onClick={() => category.value === "all" ? showAll() : filterItems(category.value)}
              className={`text-sm py-1 px-2 transition-all duration-200 ${
                selectedCategory === category.value
                  ? "text-gray-900 border-b-2 border-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Ordenamiento */}
        <motion.select
          onChange={(e) => handleSortChange(e.target.value)}
          value={sortOption}
          className="text-sm text-gray-700 bg-transparent border border-gray-200 rounded-md px-2 py-1 cursor-pointer hover:border-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#7FB069] focus:border-transparent"
          whileHover={{ scale: 1.02 }}
          whileFocus={{ scale: 1.02 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <option value="default">Ordenar por</option>
          <option value="A-Z">Nombre A-Z</option>
          <option value="Z-A">Nombre Z-A</option>
          <option value="low-to-high">Precio menor</option>
          <option value="high-to-low">Precio mayor</option>
        </motion.select>
      </motion.div>

      {/* Cards con animación */}
      <motion.div
        key={selectedCategory + sortOption} // Fuerza re-render con animación
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Cards filteredItems={filteredItems} />
      </motion.div>
      
    </motion.div>
  );
  
  
};

export default Products;