import React, { useState } from 'react';
import { FaShoppingBag } from 'react-icons/fa';

const TipoPiel = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);
    const [showResult, setShowResult] = useState(false);

    // Preguntas del test
    const questions = [
        {
            id: 1,
            question: "¿Cómo se siente tu piel al despertar?",
            options: [
                { value: "grasa", text: "Oleosa y brillante, especialmente en la zona T" },
                { value: "seca", text: "Tirante y áspera, a veces con descamación" },
                { value: "mixta", text: "Oleosa en la zona T, pero normal/seca en mejillas" },
                { value: "normal", text: "Suave y cómoda, sin brillo excesivo" }
            ]
        },
        {
            id: 2,
            question: "¿Con qué frecuencia aparecen imperfecciones en tu rostro?",
            options: [
                { value: "grasa", text: "Frecuentemente, especialmente puntos negros y granitos" },
                { value: "seca", text: "Raramente, pero cuando aparecen son profundos" },
                { value: "mixta", text: "Solo en la zona T (frente, nariz, barbilla)" },
                { value: "normal", text: "Ocasionalmente, especialmente durante cambios hormonales" }
            ]
        },
        {
            id: 3,
            question: "¿Cómo reacciona tu piel al usar productos nuevos?",
            options: [
                { value: "grasa", text: "Generalmente los tolera bien, pero pueden causar más brillo" },
                { value: "seca", text: "Es muy sensible y puede irritarse fácilmente" },
                { value: "mixta", text: "Varía según la zona donde los aplique" },
                { value: "normal", text: "Los tolera bien la mayoría de las veces" }
            ]
        },
        {
            id: 4,
            question: "¿Cómo se ve tu piel a medio día?",
            options: [
                { value: "grasa", text: "Muy brillante y oleosa en toda la cara" },
                { value: "seca", text: "Opaca y a veces se siente tirante" },
                { value: "mixta", text: "Brillante solo en la zona T" },
                { value: "normal", text: "Se mantiene cómoda con un brillo natural saludable" }
            ]
        },
        {
            id: 5,
            question: "¿Cómo se siente tu piel después de limpiarla?",
            options: [
                { value: "grasa", text: "Limpia pero vuelve a brillar rápidamente" },
                { value: "seca", text: "Muy tirante y necesita hidratación inmediata" },
                { value: "mixta", text: "Cómoda en mejillas pero la zona T se vuelve oleosa pronto" },
                { value: "normal", text: "Limpia y cómoda por varias horas" }
            ]
        }
    ];

    // Información detallada por tipo de piel - estilo coreano minimalista
    const skinTypeInfo = {
        grasa: {
            title: "지성피부 (Piel Grasa)",
            emoji: "💧",
            icon: <FaShoppingBag className="text-2xl text-blue-400" />,
            color: "blue",
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
            icon: <FaShoppingBag className="text-2xl text-green-400" />,
            color: "green",
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
            icon: <FaShoppingBag className="text-2xl text-purple-400" />,
            color: "purple",
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
            icon: <FaShoppingBag className="text-2xl text-yellow-400" />,
            color: "yellow",
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
        <section className="bg-gradient-to-b from-inherit to-white min-h-screen py-8 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    
                    {/* Test - lado izquierdo */}
                    <div className="order-2 lg:order-1 space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-black leading-tight">
                                피부 타입 테스트
                            </h2>
                            <h3 className="text-xl md:text-2xl text-gray-900 font-light">
                                Test de Tipo de Piel
                            </h3>
                            <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                                Descubre tu tipo de piel con nuestro análisis inspirado en la filosofía coreana del cuidado facial 🌸
                            </p>
                        </div>

                        {showResult && result ? (
                            <div className="space-y-8">
                                {/* Resultado */}
                                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                                    <div className="text-center space-y-4">
                                        <div className="text-4xl">{skinTypeInfo[result].emoji}</div>
                                        <h3 className="text-2xl md:text-3xl font-light text-gray-900">
                                            {skinTypeInfo[result].title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed max-w-md mx-auto">
                                            {skinTypeInfo[result].description}
                                        </p>
                                    </div>
                                </div>

                                {/* Características */}
                                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                                    <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-3">
                                        <FaShoppingBag className={`text-${skinTypeInfo[result].color}-400`} />
                                        특징 / Características
                                    </h4>
                                    <div className="space-y-2">
                                        {skinTypeInfo[result].characteristics.map((char, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 bg-gray-300 rounded-full mt-2 flex-shrink-0"></div>
                                                <span className="text-gray-600 text-sm leading-relaxed">{char}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recomendaciones */}
                                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                                    <h4 className="text-lg font-medium text-gray-900 mb-4">
                                        추천 사항 / Recomendaciones
                                    </h4>
                                    <div className="space-y-3">
                                        {skinTypeInfo[result].recommendations.map((rec, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 bg-rose-300 rounded-full mt-2 flex-shrink-0"></div>
                                                <span className="text-gray-600 text-sm leading-relaxed">{rec}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Botón para repetir */}
                                <div className="text-center">
                                    <button
                                        onClick={resetTest}
                                        className="px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors text-sm tracking-wide"
                                    >
                                        다시 하기 / Repetir Test
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                                <div className="space-y-6">
                                    <div className="text-center">
                                        <h3 className="text-lg md:text-xl font-medium text-gray-900 leading-relaxed">
                                            {questions[currentStep - 1].question}
                                        </h3>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        {questions[currentStep - 1].options.map((option, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleAnswer(questions[currentStep - 1].id, option.value)}
                                                className="w-full p-4 text-left border border-gray-200 rounded-2xl hover:border-rose-200 hover:bg-rose-50/30 transition-all duration-300 text-sm md:text-base leading-relaxed group"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className="w-3 h-3 border border-gray-300 rounded-full mt-1 group-hover:border-rose-300 transition-colors flex-shrink-0"></div>
                                                    <span className="text-gray-700 group-hover:text-rose-700">
                                                        {option.text}
                                                    </span>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                    
                                    {/* Progress bar minimalista */}
                                    <div className="space-y-2">
                                        <div className="w-full bg-gray-100 rounded-full h-1">
                                            <div
                                                className="bg-gradient-to-r from-rose-300 to-pink-300 h-1 rounded-full transition-all duration-700"
                                                style={{ width: `${(currentStep / questions.length) * 100}%` }}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-400">
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
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
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