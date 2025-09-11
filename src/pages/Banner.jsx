import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaSearch, FaTimes, FaFilter, FaCheck, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Variantes de animación reutilizables
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const slideDown = {
  initial: { opacity: 0, y: -10, scale: 0.95 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    scale: 0.95,
    transition: { duration: 0.2 }
  }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const BrandsDropdown = ({ onBrandSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const dropdownRef = useRef(null);

  // Cargar productos para obtener marcas dinámicamente
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Obtener marcas únicas de los productos disponibles
  const brands = React.useMemo(() => {
    const uniqueBrands = [...new Set(products.map(product => product.marca))];
    return uniqueBrands.map(marca => {
      // Encontrar un producto de esta marca para usar su imagen de marca
      const brandProduct = products.find(product => product.marca === marca);
      return {
        id: marca,
        name: marca,
        category: "Cosmética Coreana", // Categoría por defecto
        image: brandProduct ? brandProduct.marcaimage : `/img/brands/${marca.toLowerCase().replace(/\s+/g, '-')}.png`
      };
    });
  }, [products]);

  const categories = [...new Set(brands.map(brand => brand.category))];

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedBrands = categories.reduce((acc, category) => {
    acc[category] = filteredBrands.filter(brand => brand.category === category);
    return acc;
  }, {});

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleBrandSelection = (brand) => {
    setSelectedBrands(prev => {
      const isSelected = prev.find(b => b.id === brand.id);
      if (isSelected) {
        return prev.filter(b => b.id !== brand.id);
      } else {
        return [...prev, brand];
      }
    });
  };

  const clearSelection = () => {
    setSelectedBrands([]);
    if (onBrandSelect) {
      onBrandSelect([]);
    }
  };

  const applySelection = () => {
    setIsOpen(false);
    if (onBrandSelect) {
      onBrandSelect(selectedBrands);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto" ref={dropdownRef}>
      {/* Dropdown Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center justify-between hover:border-[#7FB069] focus:outline-none focus:ring-2 focus:ring-[#7FB069] focus:border-transparent transition-colors duration-200"
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {selectedBrands.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1 flex-wrap"
            >
              <span className="text-sm font-medium text-gray-700">
                {selectedBrands.length === 1 
                  ? selectedBrands[0].name 
                  : `${selectedBrands.length} marcas seleccionadas`}
              </span>
              {selectedBrands.length > 0 && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    clearSelection();
                  }}
                  className="ml-1 p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaTimes className="text-xs text-gray-500" />
                </motion.button>
              )}
            </motion.div>
          ) : (
            <span className="text-gray-500">Seleccionar marcas</span>
          )}
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FaChevronDown className="text-gray-400" />
        </motion.div>
      </motion.button>

      {/* Dropdown Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            {...slideDown}
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-hidden flex flex-col"
          >
            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="p-3 border-b border-gray-100"
            >
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  placeholder="Buscar marca..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7FB069] focus:border-transparent text-sm"
                />
                <AnimatePresence>
                  {searchTerm && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <FaTimes className="text-sm" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Brands List */}
            <div className="overflow-y-auto flex-1">
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {Object.entries(groupedBrands).map(([category, categoryBrands]) => (
                  categoryBrands.length > 0 && (
                    <motion.div 
                      key={category} 
                      variants={fadeInUp}
                      className="border-b border-gray-50 last:border-b-0"
                    >
                      {/* Category Header */}
                      <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                        <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                          {category}
                        </h4>
                      </div>
                      
                      {/* Brands Grid */}
                      <div className="p-3">
                        <motion.div 
                          variants={staggerContainer}
                          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2"
                        >
                          {categoryBrands.map((brand) => {
                            const isSelected = selectedBrands.find(b => b.id === brand.id);
                            return (
                              <motion.label
                                key={brand.id}
                                variants={fadeInUp}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                                  isSelected ? 'bg-[#7FB069]/10 border border-[#7FB069]/20' : ''
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={!!isSelected}
                                  onChange={() => toggleBrandSelection(brand)}
                                  className="rounded border-gray-300 text-[#7FB069] focus:ring-[#7FB069] focus:ring-offset-0"
                                />
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                  {/* Brand Image */}
                                  <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 overflow-hidden bg-gray-100">
                                    {brand.image ? (
                                      <img 
                                        src={brand.image} 
                                        alt={brand.name}
                                        className="w-full h-full object-contain"
                                        onError={(e) => {
                                          e.target.style.display = 'none';
                                          e.target.nextSibling.style.display = 'flex';
                                        }}
                                      />
                                    ) : null}
                                    <div className="hidden w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 text-gray-400 text-xs items-center justify-center">
                                      {brand.name.charAt(0)}
                                    </div>
                                  </div>
                                  <span className="text-sm font-medium text-gray-700 truncate">
                                    {brand.name}
                                  </span>
                                </div>
                              </motion.label>
                            );
                          })}
                        </motion.div>
                      </div>
                    </motion.div>
                  )
                ))}
              </motion.div>
              
              {/* No Results */}
              {filteredBrands.length === 0 && searchTerm && (
                <motion.div 
                  {...fadeIn}
                  className="p-4 text-center text-gray-500"
                >
                  <p className="text-sm">No se encontraron marcas para "{searchTerm}"</p>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-3 bg-gray-50 border-t border-gray-100"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {selectedBrands.length} marca{selectedBrands.length !== 1 ? 's' : ''} seleccionada{selectedBrands.length !== 1 ? 's' : ''}
                </span>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearSelection}
                    className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors"
                  >
                    Limpiar
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={applySelection}
                    className="px-3 py-1.5 text-xs bg-[#7FB069] text-white rounded hover:bg-[#6fa057] transition-colors flex items-center gap-1"
                  >
                    <FaCheck className="text-xs" />
                    Aplicar
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-40 md:hidden" 
            onClick={() => setIsOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Componente de producto individual mejorado
const ProductCard = ({ product, index }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/shop/${product.id}`);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-lg p-4 shadow-sm border hover:shadow-md transition-all duration-300 group cursor-pointer"
      onClick={handleProductClick}
    >
      <div className="aspect-square bg-gray-200 rounded mb-3 overflow-hidden relative">
        {product.image ? (
          <>
            <motion.img 
              src={product.image} 
              alt={product.title}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 text-gray-400 text-xs items-center justify-center flex-col">
              <div className="text-2xl mb-1">{product.marca.charAt(0)}</div>
              <div>Sin imagen</div>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-400 text-xs flex-col">
            <div className="text-2xl mb-1">{product.marca.charAt(0)}</div>
            <div>Sin imagen</div>
          </div>
        )}
        
        {/* Badge de descuento */}
        <AnimatePresence>
          {product.discount && (
            <motion.span 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 500,
                delay: 0.2
              }}
              className="absolute top-2 left-0.5 px-2 py-1 bg-purple-600 text-white text-xs rounded-full font-semibold"
            >
              -{product.discount}%
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      
      <motion.h3 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-sm font-medium text-gray-800 mb-1 line-clamp-2 leading-tight group-hover:text-[#7FB069] transition-colors duration-200"
      >
        {product.title}
      </motion.h3>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xs text-gray-500 mb-2 font-medium"
      >
        {product.marca}
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-2 mb-2"
      >
        <p className="text-sm font-bold text-[#7FB069]">S/ {product.price.toFixed(2)}</p>
        {product['comparison-price'] && (
          <p className="text-xs text-gray-400 line-through">S/ {product['comparison-price'].toFixed(2)}</p>
        )}
      </motion.div>
      
      {/* Categoría */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-between"
      >
        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {product.category}
        </span>
      </motion.div>
    </motion.div>
  );
};

const BrandStats = ({ products, selectedBrands, onBrandSelect }) => {
  const stats = React.useMemo(() => {
    const brandStats = {};
    
    products.forEach(product => {
      if (!brandStats[product.marca]) {
        brandStats[product.marca] = {
          name: product.marca,
          count: 0,
          categories: new Set(),
          image: product.marcaimage // Usar la imagen de marca
        };
      }
      brandStats[product.marca].count++;
      brandStats[product.marca].categories.add(product.category);
    });

    return Object.values(brandStats)
      .sort((a, b) => b.count - a.count);
  }, [products]);

  const sliderRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleBrandClick = (brandName) => {
    // Crear objeto de marca similar al que espera onBrandSelect
    const brand = {
      id: brandName,
      name: brandName,
      image: stats.find(b => b.name === brandName)?.image
    };
    
    // Filtrar automáticamente por esta marca
    onBrandSelect([brand]);
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const checkScrollPosition = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition(); // Check initial position
      return () => slider.removeEventListener('scroll', checkScrollPosition);
    }
  }, [stats.length]);

  if (selectedBrands.length > 0) return null;

  return (
    <motion.div 
      {...fadeInUp}
      className="bg-white rounded-lg p-6 mb-6 border shadow-sm relative"
    >
      <motion.h3 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"
      >
        <motion.span 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-2 h-2 bg-[#7FB069] rounded-full"
        ></motion.span>
        Todas nuestras marcas
      </motion.h3>

      {/* Flechas de navegación */}
      <AnimatePresence>
        {showLeftArrow && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-200"
            aria-label="Deslizar hacia la izquierda"
          >
            <FaChevronLeft className="text-[#444444]" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showRightArrow && (
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollRight}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-200"
            aria-label="Deslizar hacia la derecha"
          >
            <FaChevronRight className="text-[#444444]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Contenedor del slider */}
      <motion.div 
        ref={sliderRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex overflow-x-auto scrollbar-hide space-x-4 py-2 px-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {stats.map((brand, index) => (
          <motion.div 
            key={brand.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: index * 0.1,
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            whileHover={{ 
              scale: 1.05,
              y: -5,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 w-32 h-32 relative group rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer"
            onClick={() => handleBrandClick(brand.name)}
            title={`Filtrar por ${brand.name}`}
          >
            {/* Imagen de fondo que ocupa todo el recuadro */}
            <div className="w-full h-full bg-gray-50">
              {brand.image ? (
                <motion.img 
                  src={brand.image} 
                  alt={brand.name}
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="hidden w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 items-center justify-center text-gray-400 font-bold text-xl">
                {brand.name.charAt(0)}
              </div>
            </div>
            
            {/* Efecto de overlay al pasar el mouse */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-black/10 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileHover={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white/90 rounded-full p-2"
              >
                <FaFilter className="text-[#7FB069] text-sm" />
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Estilos para ocultar la barra de scroll */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </motion.div>
  );
};

// Componente Banner principal - Modificado para pasar la función onBrandSelect
const Banner = () => {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('featured'); // 'featured', 'filtered', 'all'

  // Cargar productos
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/products1.json");
        const data = await response.json();
        
        // Filtrar productos agotados
        const availableProducts = data.filter(
          (item) => item.status !== "Agotados"
        );
        
        setProducts(availableProducts);
        // Mostrar productos destacados inicialmente
        setFilteredProducts(availableProducts.filter(p => 
          p.status === "Best Selers" || p.status === "Mas vendidos"
        ).slice(0, 12));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtrar productos por marcas seleccionadas
  useEffect(() => {
    if (selectedBrands.length === 0) {
      // Sin filtros, mostrar productos destacados
      setViewMode('featured');
      setFilteredProducts(products.filter(p => 
        p.status === "Best Selers" || p.status === "Mas vendidos"
      ).slice(0, 12));
    } else {
      // Filtrar por marcas seleccionadas
      setViewMode('filtered');
      const filtered = products.filter(product => 
        selectedBrands.some(brand => brand.name === product.marca)
      );
      setFilteredProducts(filtered.slice(0, 12));
    }
  }, [selectedBrands, products]);

  const handleBrandSelect = (brands) => {
    setSelectedBrands(brands);
  };

  const handleViewAllProducts = () => {
    if (selectedBrands.length > 0) {
      // Mostrar todos los productos filtrados
      const filtered = products.filter(product => 
        selectedBrands.some(brand => brand.name === product.marca)
      );
      setFilteredProducts(filtered);
      setViewMode('filtered');
    } else {
      // Mostrar todos los productos
      setFilteredProducts(products);
      setViewMode('all');
    }
  };

  const resetToFeatured = () => {
    setSelectedBrands([]);
    setViewMode('featured');
    setFilteredProducts(products.filter(p => 
      p.status === "Best Selers" || p.status === "Mas vendidos"
    ).slice(0, 12));
  };

  if (loading) {
    return (
      <div className="w-full py-6 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="animate-pulse"
          >
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-lg p-4 border"
                >
                  <div className="aspect-square bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full py-6 px-4 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          {...fadeInUp}
          className="mb-6"
        >
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-gray-800 mb-2"
          >
            Nuestras Marcas
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600"
          >
            Encuentra productos de tus marcas favoritas
          </motion.p>
        </motion.div>
        
        {/* Estadísticas de marcas */}
        <BrandStats products={products} selectedBrands={selectedBrands} onBrandSelect={handleBrandSelect} />
        
        {/* Desktop: Inline dropdown */}
        <motion.div 
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="hidden md:block"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium text-gray-700">Filtrar por marca:</span>
            <div className="flex-1 max-w-md">
              <BrandsDropdown onBrandSelect={handleBrandSelect} />
            </div>
          </div>
        </motion.div>

        {/* Mobile: Full width dropdown */}
        <motion.div 
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="block md:hidden"
        >
          <div className="space-y-3 mb-6">
            <span className="block text-sm font-medium text-gray-700">Filtrar por marca:</span>
            <BrandsDropdown onBrandSelect={handleBrandSelect} />
          </div>
        </motion.div>

        {/* Título de sección */}
        <motion.div 
          {...fadeInUp}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between mb-4"
        >
          <div>
            <AnimatePresence mode="wait">
              {viewMode === 'featured' && (
                <motion.div
                  key="featured"
                  {...fadeIn}
                >
                  <h3 className="text-lg font-semibold text-gray-800">Productos Destacados</h3>
                  <p className="text-sm text-gray-500">Los más vendidos y mejor valorados</p>
                </motion.div>
              )}
              {viewMode === 'filtered' && selectedBrands.length > 0 && (
                <motion.div
                  key="filtered"
                  {...fadeIn}
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {selectedBrands.map(b => b.name).join(', ')}
                  </h3>
                  <p className="text-sm text-gray-500">{filteredProducts.length} productos encontrados</p>
                </motion.div>
              )}
              {viewMode === 'all' && (
                <motion.div
                  key="all"
                  {...fadeIn}
                >
                  <h3 className="text-lg font-semibold text-gray-800">Todos los productos</h3>
                  <p className="text-sm text-gray-500">{filteredProducts.length} productos disponibles</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Botón reset */}
          <AnimatePresence>
            {(viewMode !== 'featured' || selectedBrands.length > 0) && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetToFeatured}
                className="text-sm text-[#7FB069] hover:text-[#6fa057] font-medium flex items-center gap-1"
              >
                <FaTimes className="text-xs" />
                Ver destacados
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Grid de productos */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewMode}-${selectedBrands.map(b => b.id).join('-')}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, staggerChildren: 0.05 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6"
          >
            {filteredProducts.map((product, index) => (
              <ProductCard key={`${product.id}-${viewMode}`} product={product} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Botones de acción */}
        <motion.div 
          {...fadeInUp}
          transition={{ delay: 0.5 }}
          className="text-center space-y-3"
        >
          {/* Botón ver más - solo si no estamos mostrando todo */}
          <AnimatePresence>
            {(viewMode === 'featured' || (viewMode === 'filtered' && filteredProducts.length === 12)) && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleViewAllProducts}
                className="inline-flex items-center px-6 py-3 bg-[#7FB069] text-white font-medium rounded-lg hover:bg-[#6fa057] transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                {selectedBrands.length > 0 
                  ? `Ver todos los productos de ${selectedBrands.length === 1 ? selectedBrands[0].name : 'estas marcas'}`
                  : 'Ver todos los productos'
                }
              </motion.button>
            )}
          </AnimatePresence>
          
          {/* Información adicional */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-sm text-gray-500"
          >
            <p>Más de {products.length} productos disponibles de {[...new Set(products.map(p => p.marca))].length} marcas</p>
          </motion.div>
        </motion.div>

        {/* Sin resultados */}
        <AnimatePresence>
          {selectedBrands.length > 0 && filteredProducts.length === 0 && (
            <motion.div 
              {...fadeInUp}
              className="text-center py-12 bg-white rounded-lg border"
            >
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-4xl text-gray-300 mb-4"
              >
                🔍
              </motion.div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No se encontraron productos</h3>
              <p className="text-gray-500 mb-4">
                No hay productos disponibles para las marcas seleccionadas
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetToFeatured}
                className="inline-flex items-center px-4 py-2 text-[#7FB069] hover:text-[#6fa057] font-medium border border-[#7FB069] hover:border-[#6fa057] rounded-lg transition-colors duration-200"
              >
                <FaTimes className="mr-2" />
                Limpiar filtros
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Banner;