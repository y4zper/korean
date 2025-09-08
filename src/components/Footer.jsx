import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhone, FaShieldAlt, FaTruck, FaUndo, FaHeadset } from "react-icons/fa";
import logo from "/img/logo1.png";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
<footer className="bg-gradient-to-b from-[#F9F7F4] to-[#E8EAED]">           
            {/* Features Section */}
            <div className="py-8 border-b border-gray-200">
                <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-[#F5E6E8] p-3 rounded-full mb-3">
  <FaTruck className="w-6 h-6 text-[#7FB069]" />
</div>  
                            <h4 className="font-semibold text-gray-900 mb-1">Envío Gratis</h4>
                            <p className="text-sm text-gray-600">En compras mayores a S/150</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-[#A8D5BA]/30 p-3 rounded-full mb-3">
  <FaShieldAlt className="w-6 h-6 text-[#7FB069]" />
</div>
                            <h4 className="font-semibold text-gray-900 mb-1">100% Originales</h4>
                            <p className="text-sm text-gray-600">Productos auténticos K-Beauty</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-[#B8E6E6]/50 p-3 rounded-full mb-3">
  <FaUndo className="w-6 h-6 text-[#4A90A4]" />
</div>
                            <h4 className="font-semibold text-gray-900 mb-1">30 Días</h4>
                            <p className="text-sm text-gray-600">Garantía de devolución</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                           <div className="bg-[#F5E6E8] p-3 rounded-full mb-3">
  <FaHeadset className="w-6 h-6 text-[#4A90A4]" />
</div>
                            <h4 className="font-semibold text-gray-900 mb-1">Soporte 24/7</h4>
                            <p className="text-sm text-gray-600">Asesoría personalizada</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="inline-block mb-4">
                            <img src={logo} alt="Logo" className="h-12" />
                        </Link>
                        <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                            Tu tienda especializada en skincare coreano auténtico. 
                            Descubre la belleza de la rutina K-Beauty con productos 
                            originales y de la más alta calidad.
                        </p>
                        
                        {/* Social Media */}
                        <div className="flex items-center gap-4 mb-6">
                            <a href="#" className="bg-[#F5E6E8] p-2 rounded-full hover:bg-[#F5E6E8]/80 transition-colors duration-300">
  <FaInstagram className="w-4 h-4 text-[#7FB069]" />
</a>
                            <a href="#" className="bg-[#B8E6E6]/50 p-2 rounded-full hover:bg-[#B8E6E6]/70 transition-colors duration-300">
  <FaFacebookF className="w-4 h-4 text-[#4A90A4]" />
</a>
                            <a href="#" className="bg-gray-900 p-2 rounded-full hover:bg-gray-800 transition-colors duration-300">
                                <FaTiktok className="w-4 h-4 text-white" />
                            </a>
                            <a href="#" className="bg-[#F5E6E8] p-2 rounded-full hover:bg-[#F5E6E8]/80 transition-colors duration-300">
  <FaYoutube className="w-4 h-4 text-[#7FB069]" />
</a>
                        </div>
                    </div>

                    {/* Productos */}
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4 text-lg">Productos</h4>
                        <div className="space-y-3">
                            <Link to="/shop?category=Hidratantes" className="text-sm text-gray-600 hover:text-[#7FB069]
 transition-colors duration-300 block">
                                Hidratantes
                            </Link>
                            <Link to="/shop?category=Bloqueadores" className="text-sm text-gray-600 hover:text-[#7FB069]
 transition-colors duration-300 block">
                                Bloqueadores
                            </Link>
                            <Link to="/shop?category=Limpiadores" className="text-sm text-gray-600 hover:text-[#7FB069]
 transition-colors duration-300 block">
                                Limpiadores
                            </Link>
                            <Link to="/shop?category=Serums" className="text-sm text-gray-600 hover:text-[#7FB069]
 transition-colors duration-300 block">
                                Serums
                            </Link>
                            <Link to="/shop?category=Tonicos" className="text-sm text-gray-600 hover:text-[#7FB069]
 transition-colors duration-300 block">
                                Tónicos
                            </Link>
                            <Link to="/shop" className="text-sm text-gray-600 hover:text-[#7FB069]
 transition-colors duration-300 block">
                                Todos los Productos
                            </Link>
                        </div>
                    </div>

                    {/* Ayuda & Soporte */}
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4 text-lg">Ayuda & Soporte</h4>
                        <div className="space-y-3">
                            <Link to="/skin-test" className="text-sm text-gray-600 hover:text-[#7FB069]
 transition-colors duration-300 block">
                                ¿Qué tipo de piel tengo?
                            </Link>
                            <Link to="/rutina-skincare" className="text-sm text-gray-600 hover:text-[#7FB069]
 transition-colors duration-300 block">
                                Guía de rutina K-Beauty
                            </Link>
                            <Link to="/faq" className="text-sm text-gray-600 hover:text-[#7FB069]
 transition-colors duration-300 block">
                                Preguntas Frecuentes
                            </Link>
                            <Link to="/shipping" className="text-sm text-gray-600 hover:text-[#7FB069]
 transition-colors duration-300 block">
                                Envíos y Devoluciones
                            </Link>
                            <Link to="/contact" className="text-sm text-gray-600 hover:text-[#7FB069]
 transition-colors duration-300 block">
                                Contacto
                            </Link>
                            <Link to="/blog" className="text-sm text-gray-600 hover:text-[#7FB069]
 transition-colors duration-300 block">
                                Blog K-Beauty
                            </Link>
                        </div>
                    </div>

                    {/* Contacto */}
                    <div>
                        <h4 className="font-semibold text-gray-900 mb-4 text-lg">Contacto</h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <FaMapMarkerAlt className="w-4 h-4 text-[#7FB069]
 mt-1 flex-shrink-0" />
                                <p className="text-sm text-gray-600">
                                    Lima, Perú<br />
                                    Distrito de Miraflores
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaPhone className="w-4 h-4 text-[#7FB069]
 flex-shrink-0" />
                                <a href="tel:+51982498372" className="text-sm text-gray-600 hover:text-[#7FB069]
 transition-colors duration-300">
                                    +51 982 498 372
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaEnvelope className="w-4 h-4 text-[#7FB069]
 flex-shrink-0" />
                                <a href="#" className="text-sm text-gray-600 hover:text-[#7FB069]
 transition-colors duration-300">
                                    hyaluro.pe@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <FaWhatsapp className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <a 
                                    href="https://wa.me/51982498372" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-gray-600 hover:text-green-500 transition-colors duration-300"
                                >
                                    WhatsApp Business
                                </a>
                            </div>
                        </div>

                        {/* Horarios */}
                        <div className="mt-6 p-4 bg-[#F5E6E8] rounded-lg">
                            <h5 className="font-medium text-gray-900 mb-2 text-sm">Horarios de Atención</h5>
                            <p className="text-xs text-gray-600">
                                Lun - Vie: 9:00 AM - 7:00 PM<br />
                                Sáb: 9:00 AM - 5:00 PM<br />
                                Dom: 10:00 AM - 3:00 PM
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
<div className="bg-[#4A90A4] text-white py-6">
                <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-center md:text-left">
                            <p className="text-sm text-white">
                                © {currentYear} Hyaluro Peru. Todos los derechos reservados.
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-6 text-xs text-white">
                            <Link to="/" className="hover:text-white transition-colors duration-300">
                                Política de Privacidad
                            </Link>
                            <Link to="/" className="hover:text-white transition-colors duration-300">
                                Términos y Condiciones
                            </Link>
                            <Link to="/" className="hover:text-white transition-colors duration-300">
                                Política de Cookies
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;