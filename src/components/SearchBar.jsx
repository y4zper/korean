import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Cargar productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/products1.json');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Focus en el input cuando se abre
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtrar productos
  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered.slice(0, 6)); // Limitar a 6 resultados
      setIsDropdownOpen(true);
    } else {
      setFilteredProducts([]);
      setIsDropdownOpen(false);
    }
  }, [searchTerm, products]);

  const handleProductClick = (productId) => {
    navigate(`/shop/${productId}`);
    setSearchTerm('');
    setIsDropdownOpen(false);
    onClose();
  };

  const handleClose = () => {
    setSearchTerm('');
    setIsDropdownOpen(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-start justify-center pt-20"
        onClick={handleClose}
      >
        <motion.div
          ref={searchRef}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Barra de búsqueda */}
          <div className="flex items-center p-4 border-b">
            <FaSearch className="text-gray-400 mr-3" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar productos..."
              className="flex-1 outline-none text-gray-700 placeholder-gray-400"
            />
            <button
              onClick={handleClose}
              className="ml-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaTimes className="text-gray-500" />
            </button>
          </div>

          {/* Resultados de búsqueda */}
          <AnimatePresence>
            {isDropdownOpen && filteredProducts.length > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="max-h-96 overflow-y-auto"
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleProductClick(product.id)}
                    className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0 transition-colors"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                        {product.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {product.category}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-semibold" style={{ color: '#7FB069' }}>
                          S/ {product.price.toFixed(2)}
                        </span>
                        {product.discount && (
                          <span className="text-xs px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: '#7FB069' }}>
                            -{product.discount}%
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mensaje cuando no hay resultados */}
          {isDropdownOpen && searchTerm && filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 text-center text-gray-500"
            >
              <p>No se encontraron productos para "{searchTerm}"</p>
            </motion.div>
          )}

          {/* Sugerencias cuando no hay búsqueda */}
          {!searchTerm && (
            <div className="p-4 text-sm text-gray-500">
              <p className="mb-2">Búsquedas populares:</p>
              <div className="flex flex-wrap gap-2">
                {['Bloqueadores', 'Serums', 'Hidratantes', 'TOCOBO', 'COSRX'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchTerm(term)}
                    className="px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-xs"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchBar;