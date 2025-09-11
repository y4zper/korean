import React, { useState, useEffect, useRef } from 'react';
import { FaBars, FaSearch, FaShoppingBag, FaTimes, FaUser, FaShoppingCart, FaChevronDown } from 'react-icons/fa';
import logo from "/img/logo1.png"; 
import logo1 from "/img/hyaluro.png"; 
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Banner2 from '../pages/Banner2';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBrandsDropdownOpen, setIsBrandsDropdownOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  
  const { totalItems, toggleCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const brandsDropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Cargar productos y extraer marcas
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/products1.json');
        const data = await response.json();
        setProducts(data);
        
        // Extraer marcas únicas de los productos disponibles (no agotados)
        const availableProducts = data.filter(item => item.status !== "Agotados");
        const uniqueBrands = [...new Set(availableProducts.map(product => product.marca))];
        setBrands(uniqueBrands.sort());
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Focus en el input cuando se abre
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (brandsDropdownRef.current && !brandsDropdownRef.current.contains(event.target)) {
        setIsBrandsDropdownOpen(false);
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
    setIsSearchOpen(false);
  };

  const handleSearchClose = () => {
    setSearchTerm('');
    setIsDropdownOpen(false);
    setIsSearchOpen(false);
  };

  const handleBrandClick = (brand) => {
    navigate(`/marca?marca=${brand}`);
    setIsBrandsDropdownOpen(false);
  };

  const navItems = [
    { title: "Hidratantes", path: "/shop?category=Hidratantes" },
    { title: "Bloqueadores", path: "/shop?category=Bloqueadores" },
    { title: "Limpiadores", path: "/shop?category=Limpiadores" },
    { title: "Serums", path: "/shop?category=Serums" },
    { title: "Tonicos", path: "/shop?category=Tonicos" },
    { title: "Perfumes", path: "/shop?category=Perfumes" },
    { title: "Preguntas Frecuentes", path: "/FAQ" },
    { title: "¿Qué tipo de Piel tengo?", path: "/TipoPiel" },
  ];

  const params = new URLSearchParams(location.search);
  const currentCategory = params.get("category") || "all";
  const currentBrand = params.get("marca") || "";

  return (
    <>
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50, damping: 20, duration: 0.8 }}
        className="w-full relative z-[60]"
      >
        {/* Franja promocional */}
        <div className="bg-gradient-to-r from-[#A8D5BA] to-[#B8E6E6] text-gray-800 py-2 overflow-hidden relative">
          <div className="animate-marquee whitespace-nowrap">
            <span className="text-sm font-medium mx-4">
              🎉 Aprovecha nuestros descuentos del 20% en skincare coreano - Envío gratis en compras mayores a S/160 🎉
            </span>
          </div>
        </div>

        {/* Header principal */}
        <header className="w-full xl:px-28 px-4 bg-[#F9F7F4] shadow-md top-0 relative z-[60]">
          <nav className="flex justify-between items-center py-4">
            {/* Ícono búsqueda */}
            <motion.div whileHover={{ scale: 1.1 }}>
              <FaSearch 
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-900 w-6 h-6 cursor-pointer hover:text-[#7FB069] transition-colors duration-300" 
              />
            </motion.div>

            {/* Logo central */}
            <div className="flex-1 flex justify-center">
              <Link to="/"><img className='h-12' src={logo} alt="Logo" /></Link>
              <Link to="/"><img className='h-10' src={logo1} alt="Logo" /></Link>
            </div>

            {/* Carrito + User (desktop) */}
            <div className="hidden sm:flex items-center gap-6">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleCart}
                className="flex items-center gap-2 text-gray-900 hover:text-[#7FB069] transition-colors duration-300 relative"
              >
                <div className="relative">
                  <FaShoppingCart className="w-6 h-6" />
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      className="absolute -top-2 -right-2 min-w-[18px] h-[18px] flex items-center justify-center text-xs font-bold text-white rounded-full"
                      style={{ backgroundColor: '#7FB069' }}
                    >
                      {totalItems > 99 ? '99+' : totalItems}
                    </motion.span>
                  )}
                </div>
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-900 hover:text-[#7FB069] transition-colors duration-300"
              >
                <FaUser className="w-6 h-6" />
              </motion.a>
            </div>

            {/* Íconos móviles */}
            <div className="sm:hidden flex items-center gap-3">
              <button onClick={toggleCart} className="relative cursor-pointer">
                <FaShoppingCart className="text-gray-900 w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[16px] h-[16px] flex items-center justify-center text-xs font-bold text-white rounded-full" style={{ backgroundColor: '#7FB069' }}>
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </button>

              <FaUser className="text-green-600 w-5 h-5 cursor-pointer" />
              <button onClick={toggleMenu} className="ml-2">
                {isMenuOpen ? <FaTimes className="text-gray-900 w-5 h-5" /> : <FaBars className="text-gray-900 w-5 h-5" />}
              </button>
            </div>
          </nav>

          {/* Navbar horizontal - Desktop */}
          <div className="py-4 hidden lg:block">
            <ul className="flex items-center justify-center gap-8 text-gray-900">
              {/* Dropdown de Marcas */}
              <motion.li 
                className="relative group" 
                whileHover={{ scale: 1.05 }}
                ref={brandsDropdownRef}
                onMouseEnter={() => setIsBrandsDropdownOpen(true)}
                onMouseLeave={() => setIsBrandsDropdownOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 text-xs font-medium py-2 px-3 rounded-md transition-colors duration-300 hover:text-[#7FB069] hover:bg-[#F5E6E8] ${
                    currentBrand ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-500"
                  }`}
                >
                  Marcas
                  <FaChevronDown className={`w-3 h-3 transition-transform duration-200 ${isBrandsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Dropdown de marcas con z-index alto */}
                <AnimatePresence>
                  {isBrandsDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-[9999] min-w-[200px] max-h-80 overflow-y-auto"
                      style={{ zIndex: 9999 }}
                    >
                      <div className="py-2">
                        <Link
                          to="/marca"
                          onClick={() => setIsBrandsDropdownOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F5E6E8] hover:text-[#7FB069] transition-colors duration-200 font-medium border-b border-gray-100"
                        >
                          Ver todas las marcas
                        </Link>
                        {brands.map((brand) => (
                          <button
                            key={brand}
                            onClick={() => handleBrandClick(brand)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-[#F5E6E8] hover:text-[#7FB069] transition-colors duration-200"
                          >
                            {brand}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#7FB069] group-hover:w-full transition-all duration-300"></div>
              </motion.li>

              {/* Resto de elementos del menú */}
              {navItems.map(({ title, path }) => {
                const isActive = path.includes(currentCategory) && !title.startsWith("Preguntas") && !title.startsWith("¿Qué");
                return (
                  <motion.li key={title} className="relative group" whileHover={{ scale: 1.05 }}>
                    <Link
                      to={path}
                      className={`text-xs font-medium py-2 px-3 rounded-md transition-colors duration-300 hover:text-[#7FB069] hover:bg-[#F5E6E8] ${
                        isActive ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-500"
                      }`}
                    >
                      {title}
                    </Link>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#7FB069] group-hover:w-full transition-all duration-300"></div>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* Menu móvil desplegable con animación */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="lg:hidden overflow-hidden"
              >
                <ul className="bg-[#F9F7F4] rounded-lg mx-4 my-4 py-2 shadow-inner">
                  {/* Marcas en móvil */}
                  <motion.li
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="border-b border-gray-200"
                  >
                    <Link
                      to="/marca"
                      onClick={toggleMenu}
                      className="block text-gray-700 hover:text-[#7FB069] hover:bg-[#F5E6E8] py-3 px-4 transition-all duration-300 text-sm font-medium"
                    >
                      Marcas
                    </Link>
                  </motion.li>

                  {/* Resto de elementos en móvil */}
                  {navItems.map(({ title, path }) => (
                    <motion.li
                      key={title}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="border-b border-gray-200 last:border-b-0"
                    >
                      <Link
                        to={path}
                        onClick={toggleMenu}
                        className="block text-gray-700 hover:text-[#7FB069] hover:bg-[#F5E6E8] py-3 px-4 transition-all duration-300 text-sm font-medium"
                      >
                        {title}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      </motion.div>

      {/* Modal de búsqueda */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-start justify-center pt-20"
            onClick={handleSearchClose}
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
                  onClick={handleSearchClose}
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
        )}
      </AnimatePresence>

      {/* Estilos CSS extra */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee { animation: marquee 15s linear infinite; }
      `}</style>
    </>
  );
};

export default NavBar;