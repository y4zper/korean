import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "¿Cómo realizo un pedido?",
    answer:
      "Solo tienes que seleccionar los productos que deseas, agregarlos al carrito y completar el proceso de compra.",
  },
  {
    question: "¿Hacen envíos a todo el Perú?",
    answer:
      "Sí, realizamos envíos a nivel nacional mediante Olva/ Shalom. En Lima Metropolitana el envío es gratis por compras mayores a S/160.",
  },
  {
    question: "¿Cuánto cuesta el envío?",
    answer:
      "En Lima: Gratis por compras mayores a S/160. Delivery gratis en distritos seleccionados. En provincias: depende de la ciudad y empresa de transporte.",
  },
  {
    question: "¿En cuánto tiempo llega mi pedido?",
    answer:
      "En Lima: 1–3 días hábiles. En provincias: 2–5 días hábiles según la ciudad.",
  },
  {
    question: "¿Los productos son originales?",
    answer:
      "Sí, trabajamos solo con productos de skincare coreano 100% originales.",
  },
  {
    question: "¿Cómo elijo el producto adecuado para mi tipo de piel?",
    answer:
      "Puedes revisar la categoría 'Tipo de piel' en nuestra tienda o escribirnos para asesorarte.",
  },
  {
    question: "¿Qué promociones tienen?",
    answer:
      "Compras mayores a S/160 → Envío gratis en Lima por Shalom/Olva. Compras mayores a S/250 → Regalo de perfumes o productos de skincare. Toda compra → Incluye mascarillas y muestras gratis.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos pagos por Yape, Plin, transferencia bancaria y contraentrega (solo en Lima).",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
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
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      }
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0, 
      x: -50 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotate: -10
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: { 
        duration: 1,
        ease: "easeOut",
        delay: 0.3
      }
    }
  };

  const answerVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      y: -10
    },
    visible: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        opacity: { delay: 0.1 }
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  return (
    <motion.section 
      className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Texto FAQ */}
      <motion.div variants={textVariants}>
        <motion.h2 
          className="text-3xl md:text-4xl font-semibold text-[#4A90A4] mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Preguntas Frecuentes
        </motion.h2>
        
        <motion.p 
          className="text-[#4A4A4A] text-base mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          Queremos que tu experiencia con nuestra tienda sea tan suave y clara
          como tu piel ✨ Aquí respondemos tus dudas más comunes.
        </motion.p>

        <motion.div 
          className="space-y-4"
          variants={containerVariants}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border border-[#E8EAED] bg-[#F9F7F4] rounded-xl shadow-sm overflow-hidden"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                shadow: "0 8px 25px rgba(0,0,0,0.1)",
                transition: { duration: 0.2 }
              }}
              layout
            >
              <motion.button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-5 py-4 text-left text-[#4A4A4A] font-medium focus:outline-none hover:bg-[#F5F3F0] transition-colors duration-200"
                whileHover={{ backgroundColor: "rgba(245, 243, 240, 0.7)" }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="pr-4">{faq.question}</span>
                <motion.div
                  animate={{ 
                    rotate: openIndex === index ? 180 : 0,
                    scale: openIndex === index ? 1.1 : 1
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <FaChevronDown className="text-[#7FB069] flex-shrink-0" />
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    variants={answerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="overflow-hidden"
                  >
                    <motion.div 
                      className="px-5 pb-4 text-[#4A4A4A] text-sm leading-relaxed border-t border-[#E8EAED]/50"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {faq.answer}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Imagen decorativa */}
      <motion.div 
        className="hidden md:block"
        variants={imageVariants}
      >
        <motion.div
          className="relative"
          whileHover={{ 
            scale: 1.05,
            rotate: 2,
            transition: { duration: 0.3 }
          }}
        >
          {/* Elemento decorativo de fondo */}
          <motion.div
            className="absolute -inset-4 bg-gradient-to-br from-[#A8D5BA]/20 to-[#B8E6E6]/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.img
            src="https://cdn-icons-png.flaticon.com/512/4206/4206277.png"
            alt="Preguntas Frecuentes Skincare"
            className="w-full max-w-sm mx-auto drop-shadow-lg relative z-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8,
              delay: 0.5,
              ease: "easeOut"
            }}
            whileHover={{
              filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.15))",
              transition: { duration: 0.3 }
            }}
          />
          
          {/* Partículas flotantes decorativas */}
          <motion.div
            className="absolute top-10 right-10 w-4 h-4 bg-[#7FB069]/30 rounded-full"
            animate={{
              y: [-10, 10, -10],
              x: [-5, 5, -5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
          
          <motion.div
            className="absolute bottom-20 left-8 w-6 h-6 bg-[#A8D5BA]/40 rounded-full"
            animate={{
              y: [10, -10, 10],
              x: [5, -5, 5],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          
          <motion.div
            className="absolute top-1/2 left-4 w-3 h-3 bg-[#B8E6E6]/50 rounded-full"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default FAQ;