import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { FaHeart, FaMinus, FaPlus, FaTrash, FaChevronDown, FaPaypal, FaCreditCard, FaWhatsapp } from 'react-icons/fa';

const Checkout = () => {
  const { items, totalPrice, updateQuantity, removeFromCart } = useCart();
  const [showPromoCode, setShowPromoCode] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    tipoEntrega: "", // "delivery" o "shalom"
    direccion: "",
    distrito: "",
    provincia: "",
    direccionShalom: ""
  });

  // Lógica de envío: gratuito si el subtotal es mayor a $160
  const ENVIO_MINIMO = 160;
  const COSTO_ENVIO_BASE = 8.0;
  const envio = totalPrice >= ENVIO_MINIMO ? 0 : COSTO_ENVIO_BASE;
  const envioGratuito = totalPrice >= ENVIO_MINIMO;
  
  const impuestos = 0;
  const descuentoPromo = 0; // Aquí puedes agregar lógica de descuentos
  const totalGeneral = totalPrice + envio + impuestos - descuentoPromo;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
      mensaje += `• Distrito: ${form.distrito}\n`;
      mensaje += `• Provincia: ${form.provincia}\n\n`;
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
      mensaje += `   • Subtotal: $${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    
    // Resumen de costos
    mensaje += '💰 *RESUMEN DEL PEDIDO*\n';
    mensaje += `• Subtotal: $${totalPrice.toFixed(2)}\n`;
    mensaje += `• Envío: ${envio === 0 ? 'Gratuito' : `$${envio.toFixed(2)}`}\n`;
    if (envioGratuito) {
      mensaje += '  ✅ Envío gratuito por compra mayor a $160\n';
    }
    if (descuentoPromo > 0) {
      mensaje += `• Descuento: -$${descuentoPromo.toFixed(2)}\n`;
    }
    mensaje += `• *TOTAL: $${totalGeneral.toFixed(2)}*\n\n`;
    
    // Información adicional
    mensaje += '⏰ Fecha del pedido: ' + new Date().toLocaleString('es-ES') + '\n';
    mensaje += '✅ Pedido generado automáticamente desde la web\n\n';
    mensaje += '¡Gracias por tu compra! 🙏';
    
    return mensaje;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar campos básicos
    if (!form.nombre.trim() || !form.telefono.trim() || !form.tipoEntrega) {
      alert('Por favor, completa todos los campos requeridos');
      return;
    }

    // Validar campos específicos según tipo de entrega
    if (form.tipoEntrega === 'delivery') {
      if (!form.direccion.trim() || !form.distrito.trim() || !form.provincia.trim()) {
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
    
    // Número de WhatsApp (CAMBIAR POR TU NÚMERO)
    const numeroWhatsApp = '51982498372'; // Formato: código país + número sin signos
    
    // Crear URL de WhatsApp
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    
    // Abrir WhatsApp
    window.open(urlWhatsApp, '_blank');
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header con envío gratuito */}
      <div className="mb-8 p-4 rounded-lg" style={{ backgroundColor: '#F9F7F4' }}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold" style={{ color: '#7FB069' }}>
              {envioGratuito ? '¡Felicidades! Tienes envío gratuito' : 'Envío gratuito disponible'}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {envioGratuito 
                ? 'Tu pedido califica para envío gratuito por ser mayor a $160' 
                : `Agrega $${(ENVIO_MINIMO - totalPrice).toFixed(2)} más para obtener envío gratuito`
              }
            </p>
          </div>
        </div>
      </div>

      {/* Barra de progreso para envío gratuito */}
      {!envioGratuito && totalPrice > 0 && (
        <div className="mb-6 p-4 rounded-lg border" style={{ borderColor: '#A8D5BA', backgroundColor: '#F9F7F4' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium" style={{ color: '#7FB069' }}>
              Progreso hacia envío gratuito
            </span>
            <span className="text-sm font-medium" style={{ color: '#7FB069' }}>
              ${totalPrice.toFixed(2)} / $${ENVIO_MINIMO.toFixed(2)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                backgroundColor: '#A8D5BA',
                width: `${Math.min((totalPrice / ENVIO_MINIMO) * 100, 100)}%`
              }}
            />
          </div>
          <p className="text-xs text-gray-600 mt-2">
            {totalPrice < ENVIO_MINIMO 
              ? `Te faltan $${(ENVIO_MINIMO - totalPrice).toFixed(2)} para envío gratuito`
              : '¡Ya tienes envío gratuito!'
            }
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Columna izquierda - Productos (Cesta) */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-6 text-gray-900">Cesta</h1>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
              <button 
                onClick={() => window.location.href = '/shop'}
                className="mt-4 px-6 py-3 text-white rounded-lg font-medium hover:opacity-90 transition-colors"
                style={{ backgroundColor: '#7FB069' }}
              >
                Ir a comprar
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-6 border-b border-gray-200">
                  {/* Imagen del producto */}
                  <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0" style={{ backgroundColor: '#F9F7F4' }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Detalles del producto */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">{item.category}</p>
                        <p className="text-gray-600 text-sm mt-1">{item.description || 'Disponible'}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Controles inferiores */}
                    <div className="flex items-center justify-between">
                      {/* Controles de cantidad */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border rounded-lg" style={{ borderColor: '#E8EAED' }}>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-50 rounded-l-lg transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <FaMinus size={12} className={item.quantity <= 1 ? 'text-gray-300' : 'text-gray-600'} />
                          </button>
                          <span className="px-4 py-2 font-medium min-w-[50px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-50 rounded-r-lg transition-colors"
                          >
                            <FaPlus size={12} className="text-gray-600" />
                          </button>
                        </div>
                      </div>

                      {/* Botones de acción */}
                      <div className="flex items-center gap-3">
                        <button 
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                          title="Agregar a favoritos"
                        >
                          <FaHeart size={16} className="text-gray-400 hover:text-red-500" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                          title="Eliminar producto"
                        >
                          <FaTrash size={16} className="text-gray-400 hover:text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Columna derecha - Resumen */}
        <div className="lg:col-span-1">
          <div className="bg-white sticky top-8">
            <h2 className="text-xl font-bold mb-6 text-gray-900">Resumen</h2>

            {/* Código promocional */}
            <div className="mb-6">
              <button
                onClick={() => setShowPromoCode(!showPromoCode)}
                className="flex items-center justify-between w-full py-3 text-left border-b border-gray-200"
              >
                <span className="font-medium text-gray-900">¿Tienes un código promocional?</span>
                <FaChevronDown 
                  className={`transform transition-transform ${showPromoCode ? 'rotate-180' : ''}`}
                  size={14}
                />
              </button>
              
              {showPromoCode && (
                <div className="mt-4 space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Código promocional"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <button
                      onClick={handlePromoCode}
                      className="px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Aplicar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Desglose de precios */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Subtotal</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-gray-700">Gastos de envío y gestión</span>
                  {envioGratuito && (
                    <span className="text-xs" style={{ color: '#7FB069' }}>
                      ¡Envío gratuito aplicado!
                    </span>
                  )}
                </div>
                <span className={`font-medium ${envioGratuito ? 'text-green-600' : ''}`}>
                  {envio === 0 ? 'Gratuito' : `$${envio.toFixed(2)}`}
                </span>
              </div>

              {descuentoPromo > 0 && (
                <div className="flex items-center justify-between text-green-600">
                  <span>Descuento promocional</span>
                  <span className="font-medium">-${descuentoPromo.toFixed(2)}</span>
                </div>
              )}

              <div className="border-t pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-gray-900">${totalGeneral.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Formulario de envío */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <div className="grid grid-cols-1 gap-4">
                {/* Nombre completo */}
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre completo *"
                  value={form.nombre}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
                
                {/* Teléfono */}
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Número de teléfono *"
                  value={form.telefono}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
                
                {/* Tipo de entrega */}
                <select
                  name="tipoEntrega"
                  value={form.tipoEntrega}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecciona tipo de entrega *</option>
                  <option value="delivery">Delivery</option>
                  <option value="shalom">Recojo en Shalom</option>
                </select>

                {/* Campos condicionales para Delivery */}
                {form.tipoEntrega === 'delivery' && (
                  <>
                    <input
                      type="text"
                      name="direccion"
                      placeholder="Dirección *"
                      value={form.direccion}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="distrito"
                        placeholder="Distrito *"
                        value={form.distrito}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                      <input
                        type="text"
                        name="provincia"
                        placeholder="Provincia *"
                        value={form.provincia}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </>
                )}

                {/* Campo condicional para Shalom */}
                {form.tipoEntrega === 'shalom' && (
                  <input
                      type="text"
                      name="direccionShalom"
                      placeholder="Dirección Exacta - Shalom*"
                      value={form.direccionShalom}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                )}
              </div>

              {/* Botón principal con WhatsApp */}
              <button
                type="submit"
                className="w-full text-white py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all transform hover:scale-[1.02] mb-4 flex items-center justify-center gap-3"
                style={{ backgroundColor: '#25D366' }}
                disabled={items.length === 0}
              >
                <FaWhatsapp size={24} />
                <span>Enviar pedido por WhatsApp</span>
              </button>
            </form>

            {/* Información adicional */}
            <div className="text-xs text-gray-500 space-y-2 border-t pt-4">
              <p>📱 Al hacer clic en "Enviar pedido por WhatsApp", se abrirá tu aplicación de WhatsApp con todos los detalles del pedido</p>
              <p>✅ Confirma tu pedido directamente con nuestro equipo de ventas</p>
              <p>🚚 Envío gratuito en pedidos de $160 o más</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;