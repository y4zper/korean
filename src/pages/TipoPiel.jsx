import React, { useState } from 'react';
import { FaShoppingBag } from 'react-icons/fa';

const TipoPiel = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);
    const [showResult, setShowResult] = useState(false);

    // Preguntas del test - versión más fácil y cotidiana
    const questions = [
        {
            id: 1,
            question: "Cuando te despiertas por la mañana, ¿cómo se ve tu cara?",
            options: [
                { value: "grasa", text: "Brillosa y con sensación grasosa al tocarla" },
                { value: "seca", text: "Se siente áspera y a veces se ve descamada" },
                { value: "mixta", text: "La frente y nariz brillosas, pero las mejillas normales" },
                { value: "normal", text: "Se ve fresca y se siente suave al tacto" }
            ]
        },
        {
            id: 2,
            question: "¿Qué tan seguido te salen granitos o puntos negros?",
            options: [
                { value: "grasa", text: "Casi siempre tengo algún granito, especialmente en la nariz" },
                { value: "seca", text: "Casi nunca, pero cuando salen son grandes y duelen" },
                { value: "mixta", text: "Solo me salen en la frente, nariz o barbilla" },
                { value: "normal", text: "De vez en cuando, especialmente antes de la menstruación" }
            ]
        },
        {
            id: 3,
            question: "Cuando usas una crema nueva en la cara, ¿qué suele pasar?",
            options: [
                { value: "grasa", text: "Mi cara se ve más brillosa de lo normal" },
                { value: "seca", text: "Se me irrita fácil o me pica un poco" },
                { value: "mixta", text: "En algunas partes se siente bien, en otras no tanto" },
                { value: "normal", text: "Por lo general mi piel la acepta bien" }
            ]
        },
        {
            id: 4,
            question: "A la hora del almuerzo, ¿cómo se ve tu cara en el espejo?",
            options: [
                { value: "grasa", text: "Muy brillosa, tengo que limpiarme con papel o pañuelo" },
                { value: "seca", text: "Se ve opaca y a veces siento que está tirante" },
                { value: "mixta", text: "Solo la frente y nariz se ven brillosas" },
                { value: "normal", text: "Se mantiene bien, con un brillo natural y sano" }
            ]
        },
        {
            id: 5,
            question: "Después de lavarte la cara con jabón, ¿cómo la sientes?",
            options: [
                { value: "grasa", text: "Limpia, pero en una hora ya está brillosa otra vez" },
                { value: "seca", text: "Muy tirante, necesito ponerme crema inmediatamente" },
                { value: "mixta", text: "Las mejillas cómodas, pero la nariz se vuelve brillosa pronto" },
                { value: "normal", text: "Fresca y cómoda por varias horas" }
            ]
        }
    ];

    // Información detallada por tipo de piel - con colores de tu marca
    const skinTypeInfo = {
        grasa: {
            title: "지성피부 (Piel Grasa)",
            emoji: "💧",
            icon: <FaShoppingBag className="text-2xl" style={{ color: '#4A90A4' }} />,
            color: "#4A90A4",
            bgColor: "#B8E6E6",
            description: "Tu piel produce exceso de sebo, especialmente en la zona T. Es importante mantener el equilibrio sin resecar.",
            characteristics: [
                "Poros visibles y dilatados",
                "Tendencia al brillo durante el día",
                "Mayor resistencia al envejecimiento",
                "Propensa a imperfecciones"
            ],
            recommendations: [
                "Limpieza suave pero efectiva 2 veces al día",
                "Usa productos con ácido salicílico o niacinamida",
                "Hidratación ligera y oil-free",
                "Protector solar no comedogénico diariamente",
                "Exfoliación química 2-3 veces por semana"
            ],
            routine: "Rutina de 8-10 pasos enfocada en control de grasa y equilibrio"
        },
        seca: {
            title: "건성피부 (Piel Seca)",
            emoji: "🌿",
            icon: <FaShoppingBag className="text-2xl" style={{ color: '#7FB069' }} />,
            color: "#7FB069",
            bgColor: "#A8D5BA",
            description: "Tu piel necesita hidratación extra y cuidado suave. La clave está en restaurar y mantener la barrera cutánea.",
            characteristics: [
                "Sensación de tirantez frecuente",
                "Poros poco visibles",
                "Textura áspera o descamación",
                "Mayor propensión a líneas finas"
            ],
            recommendations: [
                "Limpieza cremosa y muy suave",
                "Múltiples capas de hidratación (layering)",
                "Ingredientes como ácido hialurónico y ceramidas",
                "Aceites faciales nutritivos por la noche",
                "Evitar productos con alcohol o fragancias fuertes"
            ],
            routine: "Rutina de 10-12 pasos centrada en nutrición e hidratación profunda"
        },
        mixta: {
            title: "복합성피부 (Piel Mixta)",
            emoji: "⚖️",
            icon: <FaShoppingBag className="text-2xl" style={{ color: '#4A90A4' }} />,
            color: "#4A90A4",
            bgColor: "#F5E6E8",
            description: "Combinas zona T grasa con mejillas normales o secas. Requiere un cuidado equilibrado y diferenciado.",
            characteristics: [
                "Zona T (frente, nariz, barbilla) oleosa",
                "Mejillas normales, secas o sensibles",
                "Diferentes necesidades por zona",
                "Poros más visibles en zona T"
            ],
            recommendations: [
                "Productos balanceados para todo el rostro",
                "Tratamientos específicos por zona cuando sea necesario",
                "Hidratación adaptada a cada área",
                "Mascarillas de arcilla solo en zona T",
                "Observar cómo responde cada zona a los productos"
            ],
            routine: "Rutina de 8-10 pasos con cuidado diferenciado por zonas"
        },
        normal: {
            title: "정상피부 (Piel Normal)",
            emoji: "✨",
            icon: <FaShoppingBag className="text-2xl" style={{ color: '#7FB069' }} />,
            color: "#7FB069",
            bgColor: "#F0EDE5",
            description: "¡Tienes suerte! Tu piel está naturalmente equilibrada. El objetivo es mantener este balance perfecto.",
            characteristics: [
                "Equilibrio natural de grasa y hidratación",
                "Poros pequeños y poco visibles",
                "Textura suave y uniforme",
                "Pocas imperfecciones"
            ],
            recommendations: [
                "Rutina de mantenimiento consistente",
                "Limpieza suave diaria",
                "Hidratación balanceada",
                "Protección solar religiosa",
                "Antioxidantes para prevención del envejecimiento"
            ],
            routine: "Rutina de 7-9 pasos enfocada en mantenimiento y prevención"
        }
    };

    const handleAnswer = (questionId, answer) => {
        setAnswers({ ...answers, [questionId]: answer });
        if (questionId < questions.length) {
            setCurrentStep(currentStep + 1);
        } else {
            calculateResult({ ...answers, [questionId]: answer });
        }
    };

    const calculateResult = (allAnswers) => {
        const counts = {};
        Object.values(allAnswers).forEach(answer => {
            counts[answer] = (counts[answer] || 0) + 1;
        });

        const resultType = Object.keys(counts).reduce((a, b) =>
            counts[a] > counts[b] ? a : b
        );

        setResult(resultType);
        setShowResult(true);
    };

    const resetTest = () => {
        setCurrentStep(1);
        setAnswers({});
        setResult(null);
        setShowResult(false);
    };

    return (
        <section style={{ 
            background: `linear-gradient(to bottom, #F9F7F4 0%, #FFFFFF 100%)`,
            minHeight: '100vh',
            paddingTop: '2rem',
            paddingBottom: '2rem'
        }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    
                    {/* Test - lado izquierdo */}
                    <div className="order-2 lg:order-1 space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight"
                                style={{ color: '#4A90A4' }}>
                                Test de Tipo de Piel
                            </h2>
                            <h3 className="text-xl md:text-2xl font-light   "
                                style={{ color: '#7FB069' }}>
                                피부 타입 테스트
                            </h3>
                            <p className="text-sm md:text-base leading-relaxed"
                               style={{ color: '#666666' }}>
                                Descubre tu tipo de piel con nuestro análisis inspirado en la filosofía coreana del cuidado facial 🌸
                            </p>
                        </div>

                        {showResult && result ? (
                            <div className="space-y-8">
                                {/* Resultado */}
                                <div className="rounded-3xl p-6 md:p-8 shadow-sm"
                                     style={{ 
                                         backgroundColor: '#FFFFFF',
                                         border: `1px solid ${skinTypeInfo[result].bgColor}`
                                     }}>
                                    <div className="text-center space-y-4">
                                        <div className="text-4xl">{skinTypeInfo[result].emoji}</div>
                                        <h3 className="text-2xl md:text-3xl font-light"
                                            style={{ color: skinTypeInfo[result].color }}>
                                            {skinTypeInfo[result].title}
                                        </h3>
                                        <p className="leading-relaxed max-w-md mx-auto"
                                           style={{ color: '#666666' }}>
                                            {skinTypeInfo[result].description}
                                        </p>
                                    </div>
                                </div>

                                {/* Características */}
                                <div className="rounded-3xl p-6 md:p-8 shadow-sm"
                                     style={{ 
                                         backgroundColor: '#FFFFFF',
                                         border: `1px solid ${skinTypeInfo[result].bgColor}`
                                     }}>
                                    <h4 className="text-lg font-medium mb-4 flex items-center gap-3"
                                        style={{ color: skinTypeInfo[result].color }}>
                                        {skinTypeInfo[result].icon}
                                        특징 / Características
                                    </h4>
                                    <div className="space-y-2">
                                        {skinTypeInfo[result].characteristics.map((char, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                                     style={{ backgroundColor: skinTypeInfo[result].bgColor }}></div>
                                                <span className="text-sm leading-relaxed"
                                                      style={{ color: '#666666' }}>{char}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recomendaciones */}
                                <div className="rounded-3xl p-6 md:p-8 shadow-sm"
                                     style={{ 
                                         backgroundColor: '#FFFFFF',
                                         border: `1px solid ${skinTypeInfo[result].bgColor}`
                                     }}>
                                    <h4 className="text-lg font-medium mb-4"
                                        style={{ color: skinTypeInfo[result].color }}>
                                        추천 사항 / Recomendaciones
                                    </h4>
                                    <div className="space-y-3">
                                        {skinTypeInfo[result].recommendations.map((rec, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                                     style={{ backgroundColor: '#A8D5BA' }}></div>
                                                <span className="text-sm leading-relaxed"
                                                      style={{ color: '#666666' }}>{rec}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Botón para repetir */}
                                <div className="text-center">
                                    <button
                                        onClick={resetTest}
                                        className="px-8 py-3 rounded-full font-medium transition-colors text-sm tracking-wide"
                                        style={{ 
                                            backgroundColor: '#7FB069',
                                            color: '#FFFFFF'
                                        }}
                                        onMouseEnter={(e) => e.target.style.backgroundColor = '#6a9657'}
                                        onMouseLeave={(e) => e.target.style.backgroundColor = '#7FB069'}
                                    >
                                        다시 하기 / Repetir Test
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-3xl p-6 md:p-8 shadow-sm"
                                 style={{ 
                                     backgroundColor: '#FFFFFF',
                                     border: '1px solid #E8EAED'
                                 }}>
                                <div className="space-y-6">
                                    <div className="text-center">
                                        <h3 className="text-lg md:text-xl font-medium leading-relaxed"
                                            style={{ color: '#4A90A4' }}>
                                            {questions[currentStep - 1].question}
                                        </h3>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        {questions[currentStep - 1].options.map((option, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleAnswer(questions[currentStep - 1].id, option.value)}
                                                className="w-full p-4 text-left rounded-2xl transition-all duration-300 text-sm md:text-base leading-relaxed group"
                                                style={{ 
                                                    border: '1px solid #E8EAED',
                                                    backgroundColor: '#FFFFFF'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.target.style.borderColor = '#A8D5BA';
                                                    e.target.style.backgroundColor = '#F9F7F4';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.borderColor = '#E8EAED';
                                                    e.target.style.backgroundColor = '#FFFFFF';
                                                }}
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className="w-3 h-3 rounded-full mt-1 flex-shrink-0 transition-colors"
                                                         style={{ border: '1px solid #E8EAED' }}></div>
                                                    <span style={{ color: '#666666' }}>
                                                        {option.text}
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                    
                                    {/* Progress bar minimalista */}
                                    <div className="space-y-2">
                                        <div className="w-full rounded-full h-1"
                                             style={{ backgroundColor: '#E8EAED' }}>
                                            <div
                                                className="h-1 rounded-full transition-all duration-700"
                                                style={{ 
                                                    background: `linear-gradient(to right, #A8D5BA 0%, #B8E6E6 100%)`,
                                                    width: `${(currentStep / questions.length) * 100}%`
                                                }}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between text-xs"
                                             style={{ color: '#999999' }}>
                                            <span>{currentStep} / {questions.length}</span>
                                            <span>{Math.round((currentStep / questions.length) * 100)}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Imagen - lado derecho */}
                    <div className="relative order-1 lg:order-2">
                        <div className="aspect-[4/5] lg:aspect-[3/4] relative overflow-hidden rounded-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1200&q=80"
                                alt="Skincare coreano minimalista"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0"
                                 style={{ 
                                     background: 'linear-gradient(to top, rgba(74, 144, 164, 0.2) 0%, transparent 100%)'
                                 }}></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <p className="text-sm md:text-base font-light tracking-wide">
                                    한국 스킨케어
                                </p>
                                <p className="text-xs md:text-sm opacity-80">
                                    Korean Skincare
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TipoPiel;