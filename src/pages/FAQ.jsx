import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

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

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
      {/* Texto FAQ */}
      <div>
        <h2 className="text-3xl md:text-4xl font-semibold text-[#4A90A4] mb-6">
          Preguntas Frecuentes
        </h2>
        <p className="text-[#4A4A4A] text-base mb-10 leading-relaxed">
          Queremos que tu experiencia con nuestra tienda sea tan suave y clara
          como tu piel ✨ Aquí respondemos tus dudas más comunes.
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-[#E8EAED] bg-[#F9F7F4] rounded-xl shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-5 py-4 text-left text-[#4A4A4A] font-medium focus:outline-none"
              >
                <span>{faq.question}</span>
                <FaChevronDown
                  className={`transition-transform duration-300 text-[#7FB069] ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-5 pb-4 text-[#4A4A4A] text-sm leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Imagen decorativa */}
      <div className="hidden md:block">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4206/4206277.png"
          alt="Preguntas Frecuentes Skincare"
          className="w-full max-w-sm mx-auto drop-shadow-lg"
        />
      </div>
    </section>
  );
};

export default FAQ;
