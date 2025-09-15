import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaArrowAltCircleRight, FaHeart, FaMinus, FaPlus, FaCheck } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const SingleProduct = () => {
  const { slug  } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/products1.json");
        const data = await response.json();
        const foundProduct = data.find((p) => p.slug === slug);
        setProduct(foundProduct || {});
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (product.slug) {
      addToCart(product, quantity);
      setShowAddedMessage(true);

      setTimeout(() => {
        setShowAddedMessage(false);
      }, 3000);
    }
  };

  if (loading) {
    return (
      <div className="max-w-screen-2xl mx-auto xl:px-28 px-4">
        <div className="flex justify-center items-center h-64">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg"
          >
            Cargando...
          </motion.div>
        </div>
      </div>
    );
  }

  if (!product.slug) {
    return (
      <div className="max-w-screen-2xl mx-auto xl:px-28 px-4">
        <div className="flex justify-center items-center h-64">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg"
          >
            Producto no encontrado
          </motion.div>
        </div>
      </div>
    );
  }

  const {
    image,
    image2,
    title,
    category,
    price,
    "comparison-price": comparisonPrice,
    discount,
    description,
    ingredients = [],
    beneficios = [],
    textura = [],
    status
  } = product;

  const productImages = [image, image2].filter(Boolean);

  // Variantes
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.div
      className="max-w-screen-2xl mx-auto xl:px-28 px-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1 }
        }
      }}
    >
      {/* Mensaje de producto agregado */}
      {showAddedMessage && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.3 }}
          className="fixed top-20 right-4 z-[99997] bg-white border rounded-lg shadow-lg p-4 flex items-center gap-3"
          style={{ borderColor: '#7FB069' }}
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#7FB069' }}>
            <FaCheck className="text-white" size={14} />
          </div>
          <div>
            <p className="font-medium text-gray-900 text-sm">¡Producto agregado!</p>
            <p className="text-xs text-gray-500">{quantity} {quantity === 1 ? 'unidad' : 'unidades'} de {title}</p>
          </div>
        </motion.div>
      )}

      {/* Breadcrumb */}
      <motion.div className="flex items-center gap-2 pt-8 text-gray-500 text-sm" variants={fadeInUp}>
        <a href="/" className="hover:text-gray-700">Home</a>
        <span>/</span>
        <a href="/shop" className="hover:text-gray-700">Shop</a>
        <span>/</span>
        <span className="text-gray-800 font-medium">{title}</span>
      </motion.div>

      <div className="p-3 max-w-7xl m-auto">
        <div className="mt-6 sm:mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image Gallery */}
            <motion.div className="space-y-4" variants={fadeInUp}>
              <div className="relative">
                {discount && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="absolute top-4 left-4 px-3 py-2 rounded-lg text-sm font-semibold text-white z-10 shadow-lg"
                    style={{ backgroundColor: '#7FB069' }}
                  >
                    -{discount}% OFF
                  </motion.div>
                )}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="overflow-hidden rounded-2xl shadow-sm"
                  style={{ backgroundColor: '#F9F7F4' }}
                >
                  <img
                    src={productImages[selectedImage] || image}
                    alt={`${title} - vista ${selectedImage + 1}`}
                    className="w-full h-auto object-contain"
                    style={{ minHeight: '400px' }}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div className="flex flex-col space-y-4" variants={fadeInUp}>
              {status && (
                <div className="text-sm uppercase tracking-wide" style={{ color: '#7FB069' }}>
                  {status}
                </div>
              )}

              <motion.h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 leading-tight" variants={fadeInUp}>
                {title}
              </motion.h1>

              <motion.div className="text-sm text-gray-500" variants={fadeInUp}>
                Categoría: <span className="font-medium" style={{ color: '#4A90A4' }}>{category}</span>
              </motion.div>

              <motion.div className="flex items-center gap-2" variants={fadeInUp}>
                <div className="flex" style={{ color: '#7FB069' }}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar key={index} size={16} />
                  ))}
                </div>
                <span className="text-sm text-gray-600">1 reseña</span>
              </motion.div>

              <motion.div className="flex items-center gap-3" variants={fadeInUp}>
                <span className="text-2xl font-bold" style={{ color: '#7FB069' }}>
                  S/{price?.toFixed(2)}
                </span>
                {comparisonPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    S/{comparisonPrice.toFixed(2)}
                  </span>
                )}
              </motion.div>

              <motion.div className="text-gray-600 text-sm leading-relaxed" variants={fadeInUp}>
                {description}
              </motion.div>

              <motion.div className="space-y-4" variants={fadeInUp}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cantidad
                  </label>
                  <div className="flex items-center border rounded-lg w-32" style={{ borderColor: '#E8EAED' }}>
                    <button
                      onClick={() => handleQuantityChange('decrement')}
                      className="p-2 hover:bg-gray-50 rounded-l-lg"
                      disabled={quantity <= 1}
                    >
                      <FaMinus size={12} className={quantity <= 1 ? 'text-gray-300' : 'text-gray-600'} />
                    </button>
                    <span className="flex-1 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange('increment')}
                      className="p-2 hover:bg-gray-50 rounded-r-lg"
                    >
                      <FaPlus size={12} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                <motion.div className="flex gap-3" variants={fadeInUp}>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 flex justify-center items-center gap-2 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-colors active:scale-95 transform"
                    style={{ backgroundColor: '#7FB069' }}
                  >
                    <span>AGREGAR AL CARRITO</span>
                    <FaArrowAltCircleRight />
                  </button>
                  <button className="p-3 border rounded-lg hover:opacity-80 transition-colors"
                    style={{
                      borderColor: '#A8D5BA',
                      backgroundColor: '#F9F7F4'
                    }}>
                    <FaHeart style={{ color: '#7FB069' }} />
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Secciones adicionales */}
      <div className="mt-12 space-y-8 max-w-4xl mx-auto">
        {beneficios.length > 0 && (
          <motion.div variants={fadeInUp}>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Beneficios</h2>
            <div className="space-y-3">
              {beneficios.map((beneficio, index) => (
                <motion.div key={index} className="flex items-start gap-3" variants={fadeInUp}>
                  <span className="font-bold text-sm" style={{ color: '#A8D5BA' }}>•</span>
                  <p className="text-sm text-gray-600 leading-relaxed">{beneficio}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {textura.length > 0 && (
          <motion.div variants={fadeInUp}>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Textura</h2>
            <div className="space-y-3">
              {textura.map((item, index) => (
                <motion.div key={index} className="flex items-start gap-3" variants={fadeInUp}>
                  <span className="font-bold text-sm" style={{ color: '#B8E6E6' }}>•</span>
                  <p className="text-sm text-gray-600 leading-relaxed">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {ingredients.length > 0 && (
          <motion.div variants={fadeInUp}>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Ingredientes Principales</h2>
            <div className="space-y-3 mb-5">
              {ingredients.map((ingredient, index) => (
                <motion.div key={index} className="flex items-start gap-3" variants={fadeInUp}>
                  <span className="font-bold text-sm" style={{ color: '#7FB069' }}>•</span>
                  <p className="text-sm text-gray-600 leading-relaxed">{ingredient}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SingleProduct;




