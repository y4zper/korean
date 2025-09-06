import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaStar, FaArrowAltCircleRight, FaHeart, FaMinus, FaPlus, FaCheck } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const SingleProduct = () => {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [showAddedMessage, setShowAddedMessage] = useState(false);
    
    const { addToCart } = useCart();
    
    useEffect(() => {
        // Scroll to the top when the component mounts
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch("/products1.json");
                const data = await response.json();
                const foundProduct = data.find((p) => p.id == id);
                setProduct(foundProduct || {});
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        
        fetchData();
    }, [id]);

    const handleQuantityChange = (type) => {
        if (type === 'increment') {
            setQuantity(prev => prev + 1);
        } else if (type === 'decrement' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const handleAddToCart = () => {
        if (product.id) {
            addToCart(product, quantity);
            setShowAddedMessage(true);
            
            // Ocultar mensaje después de 3 segundos
            setTimeout(() => {
                setShowAddedMessage(false);
            }, 3000);
        }
    };

    if (loading) {
        return (
            <div className=" max-w-screen-2xl mx-auto xl:px-28 px-4">
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg">Cargando...</div>
                </div>
            </div>
        );
    }

    if (!product.id) {
        return (
            <div className=" max-w-screen-2xl mx-auto xl:px-28 px-4">
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg">Producto no encontrado</div>
                </div>
            </div>
        );
    }

    const {
        image, 
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

    return (
        <div className=" max-w-screen-2xl mx-auto xl:px-28 px-4">
            {/* Mensaje de producto agregado */}
            {showAddedMessage && (
                <div className="fixed top-20 right-4 z-[99997] bg-white border rounded-lg shadow-lg p-4 flex items-center gap-3 animate-slide-in-right"
                     style={{ borderColor: '#7FB069' }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center"
                         style={{ backgroundColor: '#7FB069' }}>
                        <FaCheck className="text-white" size={14} />
                    </div>
                    <div>
                        <p className="font-medium text-gray-900 text-sm">¡Producto agregado!</p>
                        <p className="text-xs text-gray-500">{quantity} {quantity === 1 ? 'unidad' : 'unidades'} de {title}</p>
                    </div>
                </div>
            )}

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 pt-8 text-gray-500 text-sm">
                <a href="/" className="hover:text-gray-700">Home</a> 
                <span>/</span>
                <a href="/shop" className="hover:text-gray-700">Shop</a>
                <span>/</span>
                <span className="text-gray-800 font-medium">{title}</span>
            </div>

            <div className="p-3 max-w-7xl m-auto">
                <div className="mt-6 sm:mt-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Product Image */}
                        <div className="relative">
                            {discount && (
                                <div className="absolute top-4 left-4 bg-emerald-600 text-white px-2 py-1 rounded text-sm font-semibold z-10"
                                     style={{ backgroundColor: '#7FB069' }}>
                                    {discount}
                                </div>
                            )}
                            <div className="overflow-hidden rounded-xl" 
                                 style={{ backgroundColor: '#F9F7F4' }}>
                                <img
                                    src={image}
                                    alt={title}
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-col space-y-4">
                            {/* Brand/Status */}
                            {status && (
                                <div className="text-sm text-gray-600 uppercase tracking-wide">
                                    {status}
                                </div>
                            )}
                            
                            {/* Product Title */}
                            <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 leading-tight">
                                {title}
                            </h1>

                            {/* Category */}
                            <div className="text-sm text-gray-500">
                                Categoría: <span className="font-medium" style={{ color: '#4A90A4' }}>{category}</span>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-2">
                                <div className="flex" style={{ color: '#7FB069' }}>
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <FaStar key={index} size={16} />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600">1 reseña</span>
                            </div>

                            {/* Price */}
                            <div className="flex items-center gap-3">
                                <span className="text-2xl font-bold" style={{ color: '#7FB069' }}>
                                    ${price?.toFixed(2)}
                                </span>
                                {comparisonPrice && (
                                    <span className="text-lg text-gray-500 line-through">
                                        ${comparisonPrice.toFixed(2)}
                                    </span>
                                )}
                                {discount && (
                                    <span className="px-2 py-1 rounded text-sm font-medium text-white" 
                                          style={{ backgroundColor: '#A8D5BA' }}>
                                        Ahorra {discount}
                                    </span>
                                )}
                            </div>

                            {/* Description */}
                            <div className="text-gray-600 text-sm leading-relaxed">
                                {description}
                            </div>

                            {/* Quantity and Add to Cart */}
                            <div className="space-y-4">
                                {/* Quantity */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Cantidad
                                    </label>
                                    <div className="flex items-center border rounded-lg w-32" 
                                         style={{ borderColor: '#E8EAED' }}>
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

                                {/* Add to Cart and Wishlist */}
                                <div className="flex gap-3">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Information Sections */}
            <div className="mt-12 space-y-8 max-w-4xl mx-auto">
                {/* Beneficios */}
                {beneficios.length > 0 && (
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Beneficios</h2>
                        <div className="space-y-3">
                            {beneficios.map((beneficio, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <span className="font-bold text-sm" style={{ color: '#A8D5BA' }}>•</span>
                                    <p className="text-sm text-gray-600 leading-relaxed">{beneficio}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Textura */}
                {textura.length > 0 && (
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Textura</h2>
                        <div className="space-y-3">
                            {textura.map((item, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <span className="font-bold text-sm" style={{ color: '#B8E6E6' }}>•</span>
                                    <p className="text-sm text-gray-600 leading-relaxed">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Ingredientes */}
                {ingredients.length > 0 && (
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ingredientes Principales</h2>
                        <div className="space-y-3">
                            {ingredients.map((ingredient, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <span className="font-bold text-sm" style={{ color: '#7FB069' }}>•</span>
                                    <p className="text-sm text-gray-600 leading-relaxed">{ingredient}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Estilos CSS adicionales */}
            <style jsx>{`
                @keyframes slide-in-right {
                    0% {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                    100% {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                .animate-slide-in-right {
                    animation: slide-in-right 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export default SingleProduct;