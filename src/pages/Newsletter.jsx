import React, { useState } from 'react';
import { FaInstagram, FaPlay, FaHeart, FaComment, FaShare } from 'react-icons/fa';


const Newsletter = () => {

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

    // Datos simulados de posts de Instagram (reemplaza con datos reales de la API de IG)
    const instagramPosts = [
        {
            id: 1,
            image: "/img/ig.png", // Reemplaza con URLs reales
            alt: "Rutina de skincare matutina K-Beauty",
            likes: 245,
            caption: "Morning glow routine ✨ #KBeauty #GlowUp"
        },
        {
            id: 2,
            image: "/img/ig.png ",
            alt: "Serum de vitamina C coreano",
            likes: 189,
            caption: "Vitamin C magic 🍊 #SkincareRoutine"
        },
        {
            id: 3,
            image: "/img/ig.png ",
            alt: "Sheet mask coreana hidratante",
            likes: 312,
            caption: "Self-care Sunday 💆‍♀️ #SelfCare"
        },
        {
            id: 4,
            image: "/img/ig.png ",
            alt: "Limpiador facial coreano",
            likes: 156,
            caption: "Double cleanse method 🧴 #CleanBeauty"
        },
        {
            id: 5,
            image: "/img/ig.png ",
            alt: "Crema hidratante night routine",
            likes: 278,
            caption: "Night routine essentials 🌙 #NightSkincare"
        },
        {
            id: 6,
            image: "/img/ig.png ",
            alt: "Bloqueador solar coreano",
            likes: 203,
            caption: "SPF is life ☀️ #SunProtection"
        }
    ];
  
  return (
<section className="bg-gradient-to-br from-[#F5E6E8] via-white to-[#F9F7F4] py-10">            <div className="max-w-screen-2xl container mx-auto xl:px-28 px-4">
                {/* Header Section */}
                <div className="text-center mb-5">
                    <h2 className="text-4xl md:text-5xl font-light text-gray-900 tracking-wide mb-6">
                        Conocenos en Instagram
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-light">
                        Descubre los secretos de la belleza coreana y únete a nuestra comunidad de K-Beauty lovers
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-4">
<FaInstagram className="text-[#7FB069] text-2xl" />
                        <span className="text-gray-700 font-medium">@hyaluro_peru</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Video & Brand Story */}
                    <div className="space-y-8">
                        {/* Video Section */}
                        <div className="relative group">
<div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-[#F5E6E8] to-[#B8E6E6]/30">
                                {!isVideoPlaying ? (
                                    // Video Thumbnail
                                    <div className="relative">
                                        <img 
                                            src="/img/ssss.png" // Reemplaza con tu thumbnail
                                            alt="Video promocional Hyaluro Peru"
                                            className="w-full h-85 object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                                            <button 
  onClick={() => setIsVideoPlaying(true)}
  className="bg-white bg-opacity-90 hover:bg-opacity-100 text-[#7FB069] rounded-full p-6 transition-all duration-300 transform hover:scale-110 shadow-xl"
>
                                                <FaPlay className="text-3xl ml-1" />
                                            </button>
                                        </div>
                                          
                                    </div>
                                ) : (
                                    // Video Player (reemplaza con tu video real)
                                    <div className="relative">
                                          <video 
                                              controls 
                                              autoPlay 
                                              className="w-full h-85 object-cover "
                                              poster="/img/ssss.png"
                                          >
                                              <source src="/img/pyme5.mp4" type="video/mp4" />
                                              Tu navegador no soporta videos HTML5.
                                          </video>
                                          <button 
                                              onClick={() => setIsVideoPlaying(false)}
                                              className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-300"
                                              title="Cerrar video"
                                          >
                                              ✕
                                          </button>
    </div>
                                )}
                            </div>
                        </div>

                        {/* Brand Story */}
                        <div className="space-y-6">

                            {/* CTA Button */}
                            <div className="text-center">
                                <a 
  href="https://instagram.com/hyaluro_peru" 
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-3 bg-gradient-to-r from-[#A8D5BA] to-[#B8E6E6] text-gray-800 px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
>
                                    <FaInstagram className="text-xl" />
                                    Síguenos en Instagram
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Instagram Feed */}
                    <div className="space-y-6">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Nuestros Últimos Posts
                            </h3>
                            <p className="text-gray-600">
                                Tips, rutinas y productos que transformarán tu piel
                            </p>
                        </div>

                        {/* Instagram Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {instagramPosts.map((post) => (
                                <div key={post.id} className="group relative overflow-hidden rounded-xl shadow-lg">
                                    <img 
                                        src={post.image} 
                                        alt={post.alt}
                                        className="w-full h-32 sm:h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute bottom-0 left-0 right-0 p-3">
                                            <div className="flex items-center justify-between text-white text-sm">
                                                <div className="flex items-center gap-1">
                                                    <FaHeart className="text-red-400" />
                                                    <span>{post.likes}</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <FaComment />
                                                    <FaShare />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Instagram Icon */}
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <FaInstagram className="text-white text-lg drop-shadow-lg" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Instagram Stats */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#F5E6E8]">
  <div className="grid grid-cols-3 gap-4 text-center">
    <div>
      <div className="text-2xl font-bold text-[#7FB069] mb-1">850+</div>
      <div className="text-sm text-gray-600">Posts</div>
    </div>
    <div>
      <div className="text-2xl font-bold text-[#4A90A4] mb-1">12.5K</div>
      <div className="text-sm text-gray-600">Seguidores</div>
    </div>
    <div>
      <div className="text-2xl font-bold text-[#7FB069] mb-1">95%</div>
      <div className="text-sm text-gray-600">Engagement</div>
    </div>
  </div>
</div>

                        {/* Hashtags */}
                        <div className="text-center">
                            <div className="flex flex-wrap justify-center gap-2">
                                {['#KBeauty', '#SkincareRoutine', '#GlowUp', '#HyaluroPeru', '#KoreanSkincare'].map((tag) => (
<span key={tag} className="bg-gradient-to-r from-[#F5E6E8] to-[#B8E6E6]/30 text-[#7FB069] px-3 py-1 rounded-full text-sm font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Newsletter