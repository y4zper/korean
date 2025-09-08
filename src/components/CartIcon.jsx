import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const CartIcon = () => {
  const { totalItems, toggleCart } = useCart();

  return (
    <button 
      onClick={toggleCart}
      className="relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
      aria-label="Abrir carrito de compras"
    >
      <FaShoppingCart  
        size={24} 
        className="text-gray-700 hover:text-gray-900" 
        style={{ color: '#4A90A4' }}
      />
      
      {/* Contador animado */}
      {totalItems > 0 && (
        <span 
          className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center text-xs font-bold text-white rounded-full transform transition-all duration-300 ease-in-out animate-pulse"
          style={{ 
            backgroundColor: '#7FB069',
            animation: totalItems > 0 ? 'bounce 0.6s ease-in-out' : 'none'
          }}
        >
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
      
      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0,-8px,0);
          }
          70% {
            transform: translate3d(0,-4px,0);
          }
          90% {
            transform: translate3d(0,-2px,0);
          }
        }
      `}</style>
    </button>
  );
};

export default CartIcon;