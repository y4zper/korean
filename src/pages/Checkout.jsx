import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { FaHeart, FaMinus, FaPlus, FaTrash, FaChevronDown, FaPaypal, FaCreditCard, FaWhatsapp } from 'react-icons/fa';

const Checkout = () => {

  
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const { items, totalPrice, updateQuantity, removeFromCart , clearCart } = useCart();
  const [showPromoCode, setShowPromoCode] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    tipoEntrega: "", // "delivery" o "shalom"
    direccion: "",
    departamento: "",
    distrito: "",
    provincia: "",
    direccionShalom: ""
  });

  const peruData = {
  departamentos: [
    "Amazonas","Áncash","Apurímac","Arequipa","Ayacucho",
    "Cajamarca","Cusco","Huancavelica","Huánuco","Ica",
    "Junín","La Libertad","Lambayeque","Lima","Loreto",
    "Madre de Dios","Moquegua","Pasco","Piura","Puno",
    "San Martín","Tacna","Tumbes","Ucayali","Callao"
  ],
};

  // Lógica de envío: gratuito si el subtotal es mayor a $160
  const ENVIO_MINIMO = 160;
  const COSTO_ENVIO_BASE = 8.0;
  const envio = totalPrice >= ENVIO_MINIMO ? 0 : COSTO_ENVIO_BASE;
  const envioGratuito = totalPrice >= ENVIO_MINIMO;
  
  const impuestos = 0;
  const descuentoPromo = 0; // Aquí puedes agregar lógica de descuentos
  const totalGeneral = totalPrice + envio + impuestos - descuentoPromo;

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
    exit: {
      opacity: 0,
      x: -100,
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  };

  const progressVariants = {
    initial: { width: 0 },
    animate: { 
      width: `${Math.min((totalPrice / ENVIO_MINIMO) * 100, 100)}%`,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        duration: 1
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { 
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };

  const summaryVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.2
      }
    }
  };


  const validatePhone = (phone) => {
  const phoneRegex = /^[0-9]{9}$/;
  return phoneRegex.test(phone);
};


  const handleChange = (e) => {
  const { name, value } = e.target;
  
  // Validación especial para teléfono
  if (name === 'telefono') {
    // Solo permitir números y máximo 9 dígitos
    const numericValue = value.replace(/\D/g, '').slice(0, 9);
    setForm({ ...form, [name]: numericValue });
  } else {
    setForm({ ...form, [name]: value });
  }
};

  const crearMensajeWhatsApp = () => {
    let mensaje = '🛒 *NUEVO PEDIDO* 🛒\n\n';
  
  // Información del cliente
  mensaje += '👤 *DATOS DEL CLIENTE*\n';
  mensaje += `• Nombre: ${form.nombre}\n`;
  mensaje += `• Teléfono: ${form.telefono}\n\n`;
  
  // Información de entrega
  mensaje += '🚚 *TIPO DE ENTREGA*\n';
  if (form.tipoEntrega === 'delivery') {
    mensaje += '• Delivery\n';
    mensaje += `• Dirección: ${form.direccion}\n`;
    mensaje += `• Departamento: ${form.departamento}\n`;
    mensaje += `• Provincia: ${form.provincia}\n`;
    mensaje += `• Distrito: ${form.distrito}\n\n`;
  } else if (form.tipoEntrega === 'shalom') {
    mensaje += '• Recojo en Shalom\n';
    mensaje += `• Dirección Shalom: ${form.direccionShalom}\n\n`;
  }
    
    // Productos del pedido
    mensaje += '📦 *PRODUCTOS SOLICITADOS*\n';
    items.forEach((item, index) => {
      mensaje += `${index + 1}. ${item.title}\n`;
      mensaje += `   • Categoría: ${item.category}\n`;
      mensaje += `   • Cantidad: ${item.quantity}\n`;
      mensaje += `   • Precio unitario: $${item.price?.toFixed(2)}\n`;
      mensaje += `   • Subtotal: S/${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    
    // Resumen de costos
    mensaje += '💰 *RESUMEN DEL PEDIDO*\n';
    mensaje += `• Subtotal: S/${totalPrice.toFixed(2)}\n`;
    mensaje += `• Envío: ${envio === 0 ? 'Gratuito' : `S/${envio.toFixed(2)}`}\n`;
    if (envioGratuito) {
      mensaje += '  ✅ Envío gratuito por compra mayor a $160\n';
    }
    if (descuentoPromo > 0) {
      mensaje += `• Descuento: -$${descuentoPromo.toFixed(2)}\n`;
    }
    mensaje += `• *TOTAL: S/${totalGeneral.toFixed(2)}*\n\n`;
    
    // Información adicional
    mensaje += '⏰ Fecha del pedido: ' + new Date().toLocaleString('es-ES') + '\n';
    mensaje += '✅ Pedido generado automáticamente desde la web\n\n';
    mensaje += '¡Gracias por tu compra! 🙏';
    
    return mensaje;
  };


  const limpiarFormulario = () => {
  setForm({
    nombre: "",
    telefono: "",
    tipoEntrega: "",
    direccion: "",
    departamento: "",
    distrito: "",
    provincia: "",
    direccionShalom: ""
  });
};

  const handleSubmit = (e) => {
  e.preventDefault();

  // Validar teléfono (9 dígitos)
  if (!validatePhone(form.telefono)) {
    alert('Por favor, ingresa un número de teléfono válido de 9 dígitos');
    return;
  }
  
  // Validar campos básicos
  if (!form.nombre.trim() || !form.telefono.trim() || !form.tipoEntrega) {
    alert('Por favor, completa todos los campos requeridos');
    return;
  }

   // Validar campos específicos según tipo de entrega
  if (form.tipoEntrega === 'delivery') {
    if (!form.direccion.trim() || !form.departamento.trim() || 
        !form.provincia.trim() || !form.distrito.trim()) {
      alert('Por favor, completa todos los campos de delivery');
      return;
    }
  } else if (form.tipoEntrega === 'shalom') {
    if (!form.direccionShalom.trim()) {
      alert('Por favor, selecciona la dirección del Shalom');
      return;
    }
  }

   if (items.length === 0) {
    alert('Tu carrito está vacío');
    return;
  }
  
  // Crear mensaje para WhatsApp
  const mensaje = crearMensajeWhatsApp();
  
  // Número de WhatsApp
  const numeroWhatsApp = '51982498372';
  
  // Crear URL de WhatsApp
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
  
  // Guardar la URL y mostrar el modal de confirmación
  setWhatsappUrl(url);
  setShowConfirmationModal(true);
};

// Nueva función para confirmar y redirigir
const confirmWhatsAppRedirect = () => {
  window.open(whatsappUrl, '_blank');
  setShowConfirmationModal(false);

  clearCart();
  limpiarFormulario();
};

  const handlePromoCode = () => {
    // Aquí puedes agregar la lógica para validar códigos promocionales
    if (promoCode.trim()) {
      alert(`Código "${promoCode}" aplicado (funcionalidad de ejemplo)`);
    } else {
      alert('Por favor, ingresa un código promocional');
    }
  };

  return (
    <motion.div 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header con envío gratuito */}
      <motion.div 
        className="mb-8 p-4 rounded-lg" 
        style={{ backgroundColor: '#F9F7F4' }}
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h3 className="font-semibold" style={{ color: '#7FB069' }}>
              {envioGratuito ? '¡Felicidades! Tienes envío gratuito' : 'Envío gratuito disponible'}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {envioGratuito 
                ? 'Tu pedido califica para envío gratuito por ser mayor a S/160' 
                : `Agrega S/${(ENVIO_MINIMO - totalPrice).toFixed(2)} más para obtener envío gratuito`
              }
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Barra de progreso para envío gratuito */}
      <AnimatePresence>
        {!envioGratuito && totalPrice > 0 && (
          <motion.div 
            className="mb-6 p-4 rounded-lg border" 
            style={{ borderColor: '#A8D5BA', backgroundColor: '#F9F7F4' }}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium" style={{ color: '#7FB069' }}>
                Progreso hacia envío gratuito
              </span>
              <motion.span 
                className="text-sm font-medium" 
                style={{ color: '#7FB069' }}
                key={totalPrice}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                S/{totalPrice.toFixed(2)} / S/{ENVIO_MINIMO.toFixed(2)}
              </motion.span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <motion.div 
                className="h-2 rounded-full"
                style={{ backgroundColor: '#A8D5BA' }}
                variants={progressVariants}
                initial="initial"
                animate="animate"
              />
            </div>
            <motion.p 
              className="text-xs text-gray-600 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {totalPrice < ENVIO_MINIMO 
                ? `Te faltan S/${(ENVIO_MINIMO - totalPrice).toFixed(2)} para envío gratuito`
                : '¡Ya tienes envío gratuito!'
              }
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Columna izquierda - Productos (Cesta) */}
        <motion.div 
          className="lg:col-span-2"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-2xl font-bold mb-6 text-gray-900"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Cesta
          </motion.h1>

          {items.length === 0 ? (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
              <motion.button 
                onClick={() => window.location.href = '/shop'}
                className="mt-4 px-6 py-3 text-white rounded-lg font-medium hover:opacity-90 transition-colors"
                style={{ backgroundColor: '#7FB069' }}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Ir a comprar
              </motion.button>
            </motion.div>
          ) : (
            <motion.div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {items.map((item, index) => (
                  <motion.div 
                    key={item.id} 
                    className="flex gap-4 pb-6 border-b border-gray-200"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Imagen del producto */}
                    <motion.div 
                      className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0" 
                      style={{ backgroundColor: '#F9F7F4' }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    </motion.div>

                    {/* Detalles del producto */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">{item.category}</p>
                          <p className="text-gray-600 text-sm mt-1">{item.description || 'Disponible'}</p>
                        </motion.div>
                        <motion.div 
                          className="text-right"
                          key={item.quantity}
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <p className="font-semibold text-lg text-gray-900">
                            S/{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </motion.div>
                      </div>

                      {/* Controles inferiores */}
                      <div className="flex items-center justify-between">
                        {/* Controles de cantidad */}
                        <div className="flex items-center gap-4">
                          <motion.div 
                            className="flex items-center border rounded-lg" 
                            style={{ borderColor: '#E8EAED' }}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <motion.button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-gray-50 rounded-l-lg transition-colors"
                              disabled={item.quantity <= 1}
                              whileHover={{ backgroundColor: '#f9fafb' }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <FaMinus size={12} className={item.quantity <= 1 ? 'text-gray-300' : 'text-gray-600'} />
                            </motion.button>
                            <motion.span 
                              className="px-4 py-2 font-medium min-w-[50px] text-center"
                              key={item.quantity}
                              initial={{ scale: 1.2, color: '#7FB069' }}
                              animate={{ scale: 1, color: '#000' }}
                              transition={{ duration: 0.2 }}
                            >
                              {item.quantity}
                            </motion.span>
                            <motion.button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-gray-50 rounded-r-lg transition-colors"
                              whileHover={{ backgroundColor: '#f9fafb' }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <FaPlus size={12} className="text-gray-600" />
                            </motion.button>
                          </motion.div>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex items-center gap-3">
                          <motion.button 
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            title="Agregar a favoritos"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FaHeart size={16} className="text-gray-400 hover:text-red-500" />
                          </motion.button>
                          <motion.button
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            title="Eliminar producto"
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <FaTrash size={16} className="text-gray-400 hover:text-red-500" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </motion.div>

        {/* Columna derecha - Resumen */}
        <motion.div 
          className="lg:col-span-1"
          variants={summaryVariants}
        >
          <div className="bg-white sticky top-8">
            <motion.h2 
              className="text-xl font-bold mb-6 text-gray-900"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              Resumen
            </motion.h2>

            {/* Código promocional */}
            <motion.div 
              className="mb-6"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => setShowPromoCode(!showPromoCode)}
                className="flex items-center justify-between w-full py-3 text-left border-b border-gray-200"
                whileHover={{ backgroundColor: '#f9fafb' }}
                whileTap={{ scale: 0.99 }}
              >
                <span className="font-medium text-gray-900">¿Tienes un código promocional?</span>
                <motion.div
                  animate={{ rotate: showPromoCode ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown size={14} />
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {showPromoCode && (
                  <motion.div 
                    className="mt-4 space-y-3"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex gap-2">
                      <motion.input
                        type="text"
                        placeholder="Código promocional"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        whileFocus={{ scale: 1.02 }}
                      />
                      <motion.button
                        onClick={handlePromoCode}
                        className="px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        Aplicar
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Desglose de precios */}
            <motion.div 
              className="space-y-3 mb-6"
              variants={itemVariants}
            >
              <motion.div 
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-gray-700">Subtotal</span>
                <div className="flex items-center gap-2">
                  <motion.span 
                    className="font-medium"
                    key={totalPrice}
                    initial={{ scale: 1.1, color: '#7FB069' }}
                    animate={{ scale: 1, color: '#000' }}
                    transition={{ duration: 0.3 }}
                  >
                    S/{totalPrice.toFixed(2)}
                  </motion.span>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center justify-between"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex flex-col">
                  <span className="text-gray-700">Gastos de envío y gestión</span>
                  <AnimatePresence>
                    {envioGratuito && (
                      <motion.span 
                        className="text-xs" 
                        style={{ color: '#7FB069' }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        ¡Envío gratuito aplicado!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <motion.span 
                  className={`font-medium ${envioGratuito ? 'text-green-600' : ''}`}
                  key={envio}
                  initial={{ scale: envioGratuito ? 1.2 : 1, color: envioGratuito ? '#16a34a' : '#000' }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {envio === 0 ? 'Gratuito' : `S/${envio.toFixed(2)}`}
                </motion.span>
              </motion.div>

              <AnimatePresence>
                {descuentoPromo > 0 && (
                  <motion.div 
                    className="flex items-center justify-between text-green-600"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: 0.7 }}
                  >
                    <span>Descuento promocional</span>
                    <span className="font-medium">-S/{descuentoPromo.toFixed(2)}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div 
                className="border-t pt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <motion.span 
                    className="text-lg font-bold text-gray-900"
                    key={totalGeneral}
                    initial={{ scale: 1.2, color: '#7FB069' }}
                    animate={{ scale: 1, color: '#000' }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    S/{totalGeneral.toFixed(2)}
                  </motion.span>
                </div>
              </motion.div>
            </motion.div>

            {/* Formulario de envío */}
            <motion.form 
              onSubmit={handleSubmit} 
              className="space-y-4 mb-6"
              variants={itemVariants}
            >
              <motion.div 
                className="grid grid-cols-1 gap-4"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                {/* Nombre completo */}
                <motion.input
                  type="text"
                  name="nombre"
                  placeholder="Nombre completo *"
                  value={form.nombre}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                  variants={itemVariants}
                  whileFocus={{ scale: 1.02 }}
                />
                
                {/* Teléfono con mensaje de validación */}
<motion.div variants={itemVariants}>
  <motion.input
    type="tel"
    name="telefono"
    placeholder="Número de teléfono * (9 dígitos)"
    value={form.telefono}
    onChange={handleChange}
    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
    required
    maxLength={9}
    pattern="[0-9]{9}"
    whileFocus={{ scale: 1.02 }}
  />
  {form.telefono && !validatePhone(form.telefono) && (
    <motion.p 
      className="text-red-500 text-xs mt-1"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      El teléfono debe tener exactamente 9 dígitos
    </motion.p>
  )}
</motion.div>
                
                {/* Tipo de entrega */}
                <motion.select
                  name="tipoEntrega"
                  value={form.tipoEntrega}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                  variants={itemVariants}
                  whileFocus={{ scale: 1.02 }}
                >
                  <option value="">Selecciona tipo de entrega *</option>
                  <option value="delivery">Delivery</option>
                  <option value="shalom">Recojo en Shalom</option>
                </motion.select>

               {/* Campos condicionales para Delivery */}
<AnimatePresence>
  {form.tipoEntrega === 'delivery' && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.input
        type="text"
        name="direccion"
        placeholder="Dirección *"
        value={form.direccion}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4"
        required
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        whileFocus={{ scale: 1.02 }}
      />
      
      {/* Departamento */}
      <motion.select
        name="departamento"
        value={form.departamento}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4"
        required
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        whileFocus={{ scale: 1.02 }}
      >
        <option value="">Selecciona Departamento *</option>
        {peruData.departamentos.map((depto) => (
          <option key={depto} value={depto}>{depto}</option>
        ))}
      </motion.select>

      {/* Provincia */}
      <motion.input
  type="text"
  name="provincia"
  placeholder="Provincia *"
  value={form.provincia}
  onChange={handleChange}
  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4"
  required
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
  whileFocus={{ scale: 1.02 }}
/>


      {/* Distrito (ahora es texto libre) */}
      <motion.input
        type="text"
        name="distrito"
        placeholder="Distrito *"
        value={form.distrito}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4"
        required
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        whileFocus={{ scale: 1.02 }}
      />
    </motion.div>
  )}
</AnimatePresence>

                {/* Campo condicional para Shalom */}
                <AnimatePresence>
                  {form.tipoEntrega === 'shalom' && (
                    <motion.input
                      type="text"
                      name="direccionShalom"
                      placeholder="Dirección Exacta - Shalom*"
                      value={form.direccionShalom}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                      initial={{ opacity: 0, height: 0, y: 10 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      whileFocus={{ scale: 1.02 }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Botón principal con WhatsApp - Modificado para mostrar modal */}
<motion.button
  type="button" // Cambiado de "submit" a "button"
  onClick={handleSubmit} // Ahora muestra el modal
  className="w-full text-white py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all transform hover:scale-[1.02] mb-4 flex items-center justify-center gap-3"
  style={{ backgroundColor: '#25D366' }}
  disabled={items.length === 0}
  variants={buttonVariants}
  whileHover="hover"
  whileTap="tap"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ 
    delay: 1,
    type: "spring",
    stiffness: 100,
    damping: 15
  }}
>
  <motion.div
    animate={{ 
      rotate: [0, 10, -10, 0],
      scale: [1, 1.1, 1]
    }}
    transition={{ 
      duration: 2,
      repeat: Infinity,
      repeatDelay: 3
    }}
  >
    <FaWhatsapp size={24} />
  </motion.div>
  <span>Enviar pedido por WhatsApp</span>
</motion.button>
            </motion.form>

            {/* Información adicional */}
            <motion.div 
              className="text-xs text-gray-500 space-y-2 border-t pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
              >
                📱 Al hacer clic en "Enviar pedido por WhatsApp", se abrirá tu aplicación de WhatsApp con todos los detalles del pedido
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
              >
                ✅ Confirma tu pedido directamente con nuestro equipo de ventas
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 }}
              >
                🚚 Envío gratuito en pedidos de $160 o más
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>
      {/* Modal de confirmación */}
    <AnimatePresence>
      {showConfirmationModal && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowConfirmationModal(false)}
        >
          <motion.div 
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <motion.div 
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring" }}
              >
                <FaWhatsapp className="text-green-600 text-2xl" />
              </motion.div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                ¡Pedido Listo!
              </h3>
              
              <p className="text-gray-600 mb-4">
                ¿Deseas continuar a WhatsApp para confirmar tu pedido con nuestro equipo?
              </p>
              
              <div className="text-xs text-gray-500 mb-4 p-3 bg-gray-50 rounded-lg">
                📱 Se abrirá WhatsApp con todos los detalles de tu pedido
              </div>
            </div>

            <div className="flex gap-3">
              <motion.button
                onClick={() => setShowConfirmationModal(false)}
                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Revisar Pedido
              </motion.button>
              
              <motion.button
                onClick={confirmWhatsAppRedirect}
                className="flex-1 py-3 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaWhatsapp />
                Ir a WhatsApp
              </motion.button>
            </div>
            
            <p className="text-xs text-gray-500 text-center mt-4">
              Tu pedido será procesado una vez confirmado por nuestro equipo
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>



    </motion.div>

    
  );
};

export default Checkout;