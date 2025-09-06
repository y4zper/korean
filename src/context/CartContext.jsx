import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Acciones del carrito
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  TOGGLE_CART: 'TOGGLE_CART'
};

// Estado inicial
const initialState = {
  items: [],
  isOpen: false,
  totalItems: 0,
  totalPrice: 0
};

// Reducer del carrito
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      let newItems;
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...state.items, { ...product, quantity }];
      }
      
      const newTotalItems = newItems.reduce((total, item) => total + item.quantity, 0);
      const newTotalPrice = newItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      return {
        ...state,
        items: newItems,
        totalItems: newTotalItems,
        totalPrice: newTotalPrice
      };
    }
    
    case CART_ACTIONS.REMOVE_ITEM: {
      const newItems = state.items.filter(item => item.id !== action.payload.id);
      const newTotalItems = newItems.reduce((total, item) => total + item.quantity, 0);
      const newTotalPrice = newItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      return {
        ...state,
        items: newItems,
        totalItems: newTotalItems,
        totalPrice: newTotalPrice
      };
    }
    
    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        return cartReducer(state, { type: CART_ACTIONS.REMOVE_ITEM, payload: { id } });
      }
      
      const newItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      
      const newTotalItems = newItems.reduce((total, item) => total + item.quantity, 0);
      const newTotalPrice = newItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      
      return {
        ...state,
        items: newItems,
        totalItems: newTotalItems,
        totalPrice: newTotalPrice
      };
    }
    
    case CART_ACTIONS.CLEAR_CART:
      return initialState;
    
    case CART_ACTIONS.TOGGLE_CART:
      return {
        ...state,
        isOpen: !state.isOpen
      };
    
    default:
      return state;
  }
};

// Context
const CartContext = createContext();

// Provider
export const CartProvider = ({ children }) => {
  // Cargar datos del localStorage al inicializar
  const getInitialState = () => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('shopping_cart');
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          // Recalcular totales por seguridad
          const totalItems = parsedCart.items.reduce((total, item) => total + item.quantity, 0);
          const totalPrice = parsedCart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
          return {
            ...parsedCart,
            totalItems,
            totalPrice
          };
        } catch (error) {
          console.error('Error parsing cart data:', error);
          return initialState;
        }
      }
    }
    return initialState;
  };

  const [state, dispatch] = useReducer(cartReducer, getInitialState());

  // Guardar en localStorage cada vez que cambie el estado
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('shopping_cart', JSON.stringify(state));
    }
  }, [state]);

  // Funciones para manipular el carrito
  const addToCart = (product, quantity = 1) => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { product, quantity }
    });
  };

  const removeFromCart = (id) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { id }
    });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { id, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const toggleCart = () => {
    dispatch({ type: CART_ACTIONS.TOGGLE_CART });
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider');
  }
  return context;
};