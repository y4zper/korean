import React, { useEffect, useState } from 'react';
import { FaTimes, FaPlus, FaMinus, FaTrash, FaShoppingBag, FaCreditCard } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartSidebar = () => {
  const { 
    items, 
    isOpen, 
    toggleCart, 
    updateQuantity, 
    removeFromCart, 
    totalPrice,
    totalItems 
  } = useCart();
  
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationClass, setAnimationClass] = useState('');

  // Manejar animaciones de entrada y salida
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      setAnimationClass('animate-slide-in-right');
      document.body.style.overflow = 'hidden';
    } else {
      setAnimationClass('animate-slide-out-right');
      document.body.style.overflow = 'unset';
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleContinueShopping = () => {
    toggleCart();
    navigate('/shop');
  };

  const handleCheckoutClick = () => {
    toggleCart();
    navigate("/checkout");
  };

  // No renderizar si no está abierto ni animando
  if (!isOpen && !isAnimating) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black z-[99998] transition-all duration-300 ease-in-out ${
          isOpen ? 'bg-opacity-50 backdrop-blur-sm' : 'bg-opacity-0'
        }`}
        onClick={toggleCart}
      />
      
      {/* Sidebar con animación */}
      <div 
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[99999] ${animationClass}`}
      >
        {/* Header */}
        <div 
          className={`flex items-center justify-between p-4 border-b transition-all duration-500 delay-100 ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`} 
          style={{ borderColor: '#E8EAED' }}
        >
          <h2 className="text-xl font-semibold text-gray-900">
            Carrito ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})
          </h2>
          <button
            onClick={toggleCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <FaTimes size={18} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div 
              className={`flex-1 flex flex-col items-center justify-center p-8 text-center transition-all duration-700 delay-200 ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="animate-bounce mb-4">
                <FaShoppingBag size={64} className="text-gray-300" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tu carrito está vacío</h3>
              <p className="text-gray-500 mb-6">Agrega algunos productos para empezar</p>
              <button
                onClick={handleContinueShopping}
                className="px-6 py-3 text-white rounded-lg font-medium hover:opacity-90 transition-all duration-200 hover:scale-105 active:scale-95 transform"
                style={{ backgroundColor: '#7FB069' }}
              >
                Ir a Comprar
              </button>
            </div>
          ) : (
            <>
              {/* Lista de productos */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {items.map((item, index) => (
                  <div 
                    key={item.id} 
                    className={`flex gap-4 p-4 rounded-lg transition-all duration-500 hover:scale-[1.02] ${
                      isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                    }`}
                    style={{ 
                      backgroundColor: '#F9F7F4',
                      transitionDelay: `${200 + (index * 100)}ms`
                    }}
                  >
                    {/* Imagen */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transform transition-transform duration-200 hover:scale-105" style={{ backgroundColor: '#F0F0F0' }}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Detalles */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm leading-tight mb-1 truncate">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500 mb-2">{item.category}</p>
                      
                      {/* Precio */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold" style={{ color: '#7FB069' }}>
                          ${item.price?.toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-red-500 hover:text-red-700 transition-all duration-200 hover:scale-110 active:scale-90"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>

                      {/* Controles */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border rounded-lg overflow-hidden" style={{ borderColor: '#E8EAED' }}>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-50 transition-all duration-150 active:scale-90"
                            disabled={item.quantity <= 1}
                          >
                            <FaMinus size={10} className={item.quantity <= 1 ? 'text-gray-300' : 'text-gray-600'} />
                          </button>
                          <span className="px-3 py-2 text-sm font-medium min-w-[40px] text-center bg-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-50 transition-all duration-150 active:scale-90"
                          >
                            <FaPlus size={10} className="text-gray-600" />
                          </button>
                        </div>
                        
                        <span className="text-sm font-semibold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div 
                className={`border-t p-4 space-y-4 transition-all duration-600 delay-300 ${
                  isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`} 
                style={{ borderColor: '#E8EAED' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span 
                    className="text-2xl font-bold transition-all duration-300"
                    style={{ color: '#7FB069' }}
                  >
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleCheckoutClick}
                    className="w-full flex items-center justify-center gap-2 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-95 transform hover:shadow-lg"
                    style={{ backgroundColor: '#7FB069' }}
                  >
                    <FaCreditCard size={16} />
                    Ver Pedido
                  </button>
                  
                  <button
                    onClick={handleContinueShopping}
                    className="w-full py-3 px-4 border rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transform hover:shadow-md"
                    style={{ borderColor: '#A8D5BA', color: '#4A90A4' }}
                  >
                    <FaShoppingBag size={14} />
                    Seguir Comprando
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Animaciones CSS */}
      <style jsx>{`
        @keyframes slideInRight {
          0% { opacity: 0; transform: translateX(100%); }
          100% { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideOutRight {
          0% { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(100%); }
        }

        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out forwards;
        }
        
        .animate-slide-out-right {
          animation: slideOutRight 0.3s ease-in forwards;
        }
      `}</style>
    </>
  );
};

export default CartSidebar;
