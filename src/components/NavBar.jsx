import React, { useState } from 'react';
import { FaBars, FaSearch, FaShoppingBag, FaTimes, FaUser,FaShoppingCart  } from 'react-icons/fa';
import logo from "/img/logo1.png"; 
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

  // 👇 extraer la categoría actual de la URL
  const params = new URLSearchParams(location.search);
  const currentCategory = params.get("category") || "all";

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 50, damping: 20, duration: 0.8 }}
      className="w-full"
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
      <header className="w-full xl:px-28 px-4 bg-[#F9F7F4] shadow-md sticky top-0 z-[50]">
        <nav className="flex justify-between items-center py-4">
          {/* Ícono búsqueda */}
          <motion.div whileHover={{ scale: 1.1 }}>
            <FaSearch className="text-gray-900 w-6 h-6 cursor-pointer hover:text-[#7FB069] transition-colors duration-300" />
          </motion.div>

          {/* Logo central */}
          <div className="flex-1 flex justify-center">
            <Link to="/"><img className='h-12' src={logo} alt="Logo" /></Link>
          </div>

          {/* Carrito + WhatsApp (desktop) */}
          <div className="hidden sm:flex items-center gap-6">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleCart}
              className="flex items-center gap-2 text-gray-900 hover:text-[#7FB069] transition-colors duration-300 relative"
            >
              <div className="relative">
                <FaShoppingCart  className="w-6 h-6" />
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
              href="https://wa.me/51999999999"
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

      {/* Estilos CSS extra */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee { animation: marquee 15s linear infinite; }
      `}</style>
    </motion.div>
  );
};

export default NavBar;
