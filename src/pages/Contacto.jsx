import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const Contacto = () => {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    mensaje: "",
  });

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  // Paleta de colores actualizada para coincidir con la imagen de referencia
  const colors = {
    grisOscuro: "#333333",
    grisMedio: "#666666",
    grisClaro: "#888888",
    blanco: "#FFFFFF",
    verdeOscuro: "#2E7D32",  // Verde más oscuro como en la referencia
    verdeClaro: "#4CAF50",
    borde: "#E0E0E0",
    fondo: "#F8F8F8"
  };

  const validatePhone = (phone) => /^[0-9]{9}$/.test(phone);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "telefono") {
      const numericValue = value.replace(/\D/g, "").slice(0, 9);
      setForm({ ...form, [name]: numericValue });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre.trim() || !form.telefono.trim() || !form.mensaje.trim()) {
      alert("Por favor, completa todos los campos");
      return;
    }

    if (!validatePhone(form.telefono)) {
      alert("El teléfono debe tener 9 dígitos");
      return;
    }

    const mensaje = `👤 *Nuevo mensaje desde contacto*\n\n• Nombre: ${form.nombre}\n• Teléfono: ${form.telefono}\n• Mensaje: ${form.mensaje}`;

    const numeroWhatsApp = "51982498372";
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

    setWhatsappUrl(url);
    setShowConfirmationModal(true);
  };

  const confirmWhatsAppRedirect = () => {
    window.open(whatsappUrl, "_blank");
    setShowConfirmationModal(false);
  };

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const contactItemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const formItemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const iconHoverVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300
      }
    }
  };

  const inputFocusVariants = {
    focus: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Título principal con animación mejorada */}
      <motion.div 
        className="text-center mb-12"
        variants={itemVariants}
      >
        <motion.h1 
          className="text-2xl font-normal mb-4 tracking-wide" 
          style={{ color: colors.grisOscuro }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Contáctanos
        </motion.h1>
        <motion.p 
          className="text-base max-w-md mx-auto" 
          style={{ color: colors.grisMedio }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Estamos aquí para ayudarte. Envíanos tu consulta y te responderemos a la brevedad.
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Información de contacto con animaciones */}
        <motion.div variants={contactItemVariants}>
          <motion.h2 
            className="text-lg font-normal mb-6 tracking-wide" 
            style={{ color: colors.grisOscuro }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Información de contacto
          </motion.h2>
          
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="flex items-start gap-4 pb-6 border-b" 
              style={{ borderColor: colors.borde }}
              variants={contactItemVariants}
              whileHover={{ x: 5, transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1" 
                style={{ backgroundColor: colors.fondo }}
                variants={iconHoverVariants}
                whileHover="hover"
              >
                <Phone className="w-4 h-4" style={{ color: colors.grisOscuro }} />
              </motion.div>
              <div>
                <h3 className="font-medium mb-1 text-sm" style={{ color: colors.grisOscuro }}>
                  Teléfono / WhatsApp
                </h3>
                <p style={{ color: colors.grisMedio }}>
                  +51 982 498 372
                </p>
                <p className="text-xs mt-1" style={{ color: colors.grisClaro }}>
                  Lunes a viernes: 9:00 AM - 6:00 PM
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-start gap-4 pb-6 border-b" 
              style={{ borderColor: colors.borde }}
              variants={contactItemVariants}
              whileHover={{ x: 5, transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1" 
                style={{ backgroundColor: colors.fondo }}
                variants={iconHoverVariants}
                whileHover="hover"
              >
                <Mail className="w-4 h-4" style={{ color: colors.grisOscuro }} />
              </motion.div>
              <div>
                <h3 className="font-medium mb-1 text-sm" style={{ color: colors.grisOscuro }}>
                  Correo Electrónico
                </h3>
                <p style={{ color: colors.grisMedio }}>
                  hyaluro.pe@gmail.com
                </p>
                <p className="text-xs mt-1" style={{ color: colors.grisClaro }}>
                  Respuesta en menos de 24 horas
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-start gap-4"
              variants={contactItemVariants}
              whileHover={{ x: 5, transition: { duration: 0.3 } }}
            >
              <motion.div 
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1" 
                style={{ backgroundColor: colors.fondo }}
                variants={iconHoverVariants}
                whileHover="hover"
              >
                <MapPin className="w-4 h-4" style={{ color: colors.grisOscuro }} />
              </motion.div>
              <div>
                <h3 className="font-medium mb-1 text-sm" style={{ color: colors.grisOscuro }}>
                  Ubicación
                </h3>
                <p style={{ color: colors.grisMedio }}>
                  Lima, Perú
                </p>
                <p className="text-xs mt-1" style={{ color: colors.grisClaro }}>
                  Servicio a nivel nacional
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Formulario con animaciones mejoradas */}
        <motion.div variants={formItemVariants}>
          <motion.h2 
            className="text-lg font-normal mb-6 tracking-wide" 
            style={{ color: colors.grisOscuro }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Envíanos un mensaje
          </motion.h2>

          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={formItemVariants}>
              <label className="block mb-2 text-xs font-medium uppercase tracking-wide" style={{ color: colors.grisOscuro }}>
                Nombre completo *
              </label>
              <motion.input
                type="text"
                name="nombre"
                placeholder="Tu nombre completo"
                value={form.nombre}
                onChange={handleChange}
                className="w-full p-3 rounded border focus:outline-none transition-all duration-300 text-sm"
                style={{ 
                  backgroundColor: colors.blanco,
                  borderColor: colors.borde,
                  color: colors.grisOscuro
                }}
                variants={inputFocusVariants}
                whileFocus="focus"
                whileHover={{ borderColor: colors.verdeOscuro, transition: { duration: 0.2 } }}
                required
              />
            </motion.div>

            <motion.div variants={formItemVariants}>
              <label className="block mb-2 text-xs font-medium uppercase tracking-wide" style={{ color: colors.grisOscuro }}>
                Teléfono *
              </label>
              <motion.input
                type="tel"
                name="telefono"
                placeholder="987654321"
                value={form.telefono}
                onChange={handleChange}
                className="w-full p-3 rounded border focus:outline-none transition-all duration-300 text-sm"
                style={{ 
                  backgroundColor: colors.blanco,
                  borderColor: colors.borde,
                  color: colors.grisOscuro
                }}
                variants={inputFocusVariants}
                whileFocus="focus"
                whileHover={{ borderColor: colors.verdeOscuro, transition: { duration: 0.2 } }}
                required
                maxLength={9}
              />
              <AnimatePresence>
                {form.telefono && !validatePhone(form.telefono) && (
                  <motion.p 
                    className="text-red-500 text-xs mt-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    El teléfono debe tener exactamente 9 dígitos
                  </motion.p>
                )}
              </AnimatePresence>
              <p className="text-xs mt-2" style={{ color: colors.grisClaro }}>
                Ingresa 9 dígitos sin espacios
              </p>
            </motion.div>

            <motion.div variants={formItemVariants}>
              <label className="block mb-2 text-xs font-medium uppercase tracking-wide" style={{ color: colors.grisOscuro }}>
                Mensaje *
              </label>
              <motion.textarea
                name="mensaje"
                placeholder="¿En qué podemos ayudarte?"
                value={form.mensaje}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 rounded border focus:outline-none transition-all duration-300 resize-none text-sm"
                style={{ 
                  backgroundColor: colors.blanco,
                  borderColor: colors.borde,
                  color: colors.grisOscuro
                }}
                variants={inputFocusVariants}
                whileFocus="focus"
                whileHover={{ borderColor: colors.verdeOscuro, transition: { duration: 0.2 } }}
                required
              />
            </motion.div>

            <motion.button
              type="submit"
              className="w-full py-3 rounded font-medium flex items-center justify-center gap-2 text-sm uppercase tracking-wide"
              style={{ backgroundColor: colors.verdeOscuro, color: colors.blanco }}
              variants={formItemVariants}
              whileHover={{ 
                scale: 1.02,
                backgroundColor: colors.verdeClaro,
                transition: { duration: 0.3 }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.1 }
              }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{ display: "inline-block" }}
              >
                <MessageCircle className="w-4 h-4" />
              </motion.div>
              Enviar por WhatsApp
            </motion.button>
          </motion.form>

          <motion.div 
            className="text-xs space-y-2 mt-6" 
            style={{ color: colors.grisClaro }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              📱 Se abrirá WhatsApp con tu mensaje preparado
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              ✅ Te responderemos en menos de 2 horas
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Modal de confirmación con animaciones mejoradas */}
      <AnimatePresence>
        {showConfirmationModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 px-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="rounded shadow-lg p-6 max-w-sm w-full"
              style={{ backgroundColor: colors.blanco }}
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ 
                duration: 0.4,
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            >
              <div className="text-center mb-6">
                <motion.div 
                  className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4" 
                  style={{ backgroundColor: colors.fondo }}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.2,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  <MessageCircle className="w-5 h-5" style={{ color: colors.verdeOscuro }} />
                </motion.div>
                <motion.h2 
                  className="text-base font-medium mb-2" 
                  style={{ color: colors.grisOscuro }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  Redirigiendo a WhatsApp
                </motion.h2>
                <motion.p 
                  className="text-sm" 
                  style={{ color: colors.grisMedio }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  ¿Deseas continuar para enviar tu mensaje?
                </motion.p>
              </div>
              
              <motion.div 
                className="flex gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <motion.button
                  onClick={() => setShowConfirmationModal(false)}
                  className="flex-1 py-2 rounded text-xs font-medium uppercase tracking-wide"
                  style={{ 
                    backgroundColor: colors.fondo,
                    color: colors.grisOscuro,
                    border: `1px solid ${colors.borde}`
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    backgroundColor: colors.borde,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancelar
                </motion.button>
                <motion.button
                  onClick={confirmWhatsAppRedirect}
                  className="flex-1 py-2 rounded text-xs font-medium text-white flex items-center justify-center gap-1 uppercase tracking-wide"
                  style={{ backgroundColor: colors.verdeOscuro }}
                  whileHover={{ 
                    scale: 1.02,
                    backgroundColor: colors.verdeClaro,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-3 h-3" />
                  Continuar
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Contacto;