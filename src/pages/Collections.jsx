import React from 'react'

const Collections = () => {
  return (
    <div className='relative xl:px-28 px-4 mt-0 mb-10 h-[500px] overflow-hidden'>
      {/* Video de fondo */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/img/video.mp4" type="video/mp4" />
        {/* Fallback para navegadores que no soporten el video */}
        Tu navegador no soporta el elemento video.
      </video>
      
      {/* Overlay oscuro opcional para mejorar legibilidad */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>
      
      {/* Contenido */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex h-full">
          <div className="md:w-1/2"></div>
        </div>
        
        {/* Botón centrado en la parte inferior */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button className="bg-white text-black font-semibold px-8 py-4 capitalize rounded-sm hover:-translate-y-2 transition-all duration-300 shadow-lg">
            see collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default Collections