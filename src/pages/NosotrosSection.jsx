import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaUsers, FaLeaf, FaStar, FaShieldAlt, FaGlobeAmericas } from 'react-icons/fa';

const NosotrosPage = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const stagger = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const valores = [
    {
      icon: <FaShieldAlt className="w-8 h-8 text-[#7FB069]" />,
      title: "Autenticidad",
      description: "Productos 100% originales importados directamente desde Corea del Sur"
    },
    {
      icon: <FaLeaf className="w-8 h-8 text-[#7FB069]" />,
      title: "Naturalidad",
      description: "Ingredientes naturales que respetan y nutren la piel de manera efectiva"
    },
    {
      icon: <FaUsers className="w-8 h-8 text-[#7FB069]" />,
      title: "Inclusividad",
      description: "Skincare para todos los tipos de piel, sin importar edad, género o condición"
    },
    {
      icon: <FaHeart className="w-8 h-8 text-[#7FB069]" />,
      title: "Pasión",
      description: "Amor genuino por el cuidado de la piel y el bienestar de nuestros clientes"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9F7F4]">
      {/* Hero Section */}
      <motion.section
  initial="hidden"
  animate="visible"
  variants={fadeInUp}
>
  {/* Capa semitransparente para oscurecer y dar contraste */}

</motion.section>


      {/* Nuestra Historia */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="py-20 px-4 xl:px-28"
      >
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeInUp}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#A8D5BA] to-[#B8E6E6] rounded-2xl opacity-20 blur-xl"></div>
                <img 
                  src="./img/banner321.png" 
                  alt="Skincare coreano productos" 
                  className="relative w-full h-80 object-cover rounded-md shadow-2xl"
                />
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="space-y-6">
              <h2 className="text-3xl md:text-2xl font-bold text-gray-900 mb-6">
                Nuestra <span className="text-[#7FB069]">Historia</span>
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-sm">
                  <strong className="text-[#7FB069]">HYALURO.PE</strong> nació de la pasión por el cuidado de la piel y la admiración por la innovación coreana en cosmética. Reconocimos que el skincare coreano representa la vanguardia en ingredientes naturales y tecnología avanzada.
                </p>
                <p className="text-sm">
                  Cada producto en nuestro catálogo es seleccionado con cuidado, priorizando <span className="font-semibold text-gray-800">autenticidad, efectividad</span> y el respeto por la individualidad de cada piel.
                </p>
              </div>
              <div className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-1">
                  {[1,2,3,4,5].map((i) => (
                    <FaStar key={i} className="w-6 h-6 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600">+1000 clientes satisfechos</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Misión y Visión */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4 xl:px-28">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Misión & <span className="text-[#7FB069]">Visión</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#A8D5BA] to-[#B8E6E6] mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div variants={fadeInUp} className="group">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#A8D5BA]/20 to-[#B8E6E6]/20 p-8 h-full transition-all duration-500 group-hover:shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#7FB069]/20 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-[#7FB069] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <FaHeart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Nuestra Misión</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Llevar skincare coreano auténtico a precios accesibles, educando sobre el cuidado de la piel y fomentando la autoestima a través del bienestar personal.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="group">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#B8E6E6]/20 to-[#A8D5BA]/20 p-8 h-full transition-all duration-500 group-hover:shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#7FB069]/20 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-[#7FB069] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <FaGlobeAmericas className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Nuestra Visión</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Ser la marca líder de skincare coreano en Perú, reconocida por su autenticidad, calidad y compromiso con la satisfacción de nuestros clientes.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Valores */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
        className="py-20 px-4 xl:px-28"
      >
        <div className="container mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Nuestros <span className="text-[#7FB069]">Valores</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Los pilares que guían cada decisión y acción en HYALURO.PE
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valores.map((valor, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[#A8D5BA] to-[#B8E6E6] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  {valor.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{valor.title}</h3>
                <p className="text-gray-600 leading-relaxed">{valor.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="py-20 bg-gradient-to-r from-[#A8D5BA] to-[#B8E6E6] relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
            alt="Skincare background" 
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        
        <div className="container mx-auto px-4 xl:px-28 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            ¿Listo para descubrir el <span className="text-[#7FB069]">skincare coreano</span>?
          </h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Únete a miles de personas que ya transformaron su rutina de cuidado facial
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#7FB069] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Explorar Productos
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default NosotrosPage;