import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

    // Variantes de animación
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                duration: 0.8
            }
        }
    };

    const textVariants = {
        hidden: { 
            opacity: 0, 
            y: 30 
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
                duration: 0.8
            }
        }
    };

    const imageVariants = {
        hidden: { 
            opacity: 0, 
            scale: 1.1 
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 15,
                duration: 1.2
            }
        }
    };

    const cardVariants = {
        hidden: { 
            opacity: 0, 
            y: 50,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.6
            }
        },
        exit: {
            opacity: 0,
            y: -50,
            scale: 0.95,
            transition: {
                duration: 0.4
            }
        }
    };

    const optionVariants = {
        hidden: { 
            opacity: 0, 
            x: -20 
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 150,
                damping: 12
            }
        },
        hover: {
            scale: 1.02,
            x: 8,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        },
        tap: {
            scale: 0.98,
            transition: {
                duration: 0.1
            }
        }
    };

    const resultVariants = {
        hidden: { 
            opacity: 0, 
            scale: 0.8,
            y: 50
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 80,
                damping: 12,
                duration: 0.8
            }
        }
    };

    const progressVariants = {
        initial: { width: "0%" },
        animate: { 
            width: `${(currentStep / questions.length) * 100}%`,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.8
            }
        }
    };

    const listItemVariants = {
        hidden: { 
            opacity: 0, 
            x: -10 
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 150,
                damping: 15
            }
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
        <motion.section 
            style={{ 
                background: `linear-gradient(to bottom, #FFFFFF 0%, #FFFFFF 100%)`,
                minHeight: '100vh',
                paddingTop: '2rem',
                paddingBottom: '2rem'
            }}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    
                    {/* Test - lado izquierdo */}
                    <motion.div 
                        className="order-2 lg:order-1 space-y-6"
                        variants={textVariants}
                    >
                        <motion.div 
                            className="space-y-4"
                            variants={textVariants}
                        >
                            <motion.h2 
                                className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-gray-900"
                                style={{ 
                                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                                    fontWeight: '300',
                                    letterSpacing: '-0.02em'
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            >
                                Test de Tipo de Piel
                            </motion.h2>
                            <motion.h3 
                                className="text-xl md:text-xl font-bold"
                                style={{ 
                                    color: '#7FB069',
                                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                                    fontWeight: '300',
                                    letterSpacing: '0.02em'
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                            >
                                피부 타입 테스트
                            </motion.h3>
                            <motion.p 
                                className="text-sm md:text-sm leading-relaxed text-gray-900"
                                style={{ 
                                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                                    fontWeight: '400'
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                            >
                                Descubre tu tipo de piel con nuestro análisis inspirado en la filosofía coreana del cuidado facial 
                            </motion.p>
                        </motion.div>

                        <AnimatePresence mode="wait">
                            {showResult && result ? (
                                <motion.div 
                                    className="space-y-8"
                                    key="results"
                                    variants={resultVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                >
                                    {/* Resultado */}
                                    <motion.div 
                                        className="rounded-3xl p-6 md:p-8 shadow-sm"
                                        style={{ 
                                            backgroundColor: '#FFFFFF',
                                            border: `1px solid ${skinTypeInfo[result].bgColor}`
                                        }}
                                        whileHover={{ 
                                            scale: 1.02,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        <div className="text-center space-y-4">
                                            <motion.div 
                                                className="text-4xl"
                                                animate={{ 
                                                    scale: [1, 1.2, 1],
                                                    rotate: [0, 5, -5, 0]
                                                }}
                                                transition={{ 
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    repeatDelay: 3
                                                }}
                                            >
                                                {skinTypeInfo[result].emoji}
                                            </motion.div>
                                            <motion.h3 
                                                className="text-2xl md:text-3xl font-light"
                                                style={{ 
                                                    color: skinTypeInfo[result].color,
                                                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                                                    fontWeight: '300',
                                                    letterSpacing: '-0.01em'
                                                }}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.3, duration: 0.6 }}
                                            >
                                                {skinTypeInfo[result].title}
                                            </motion.h3>
                                            <motion.p 
                                                className="leading-relaxed max-w-md mx-auto"
                                                style={{ 
                                                    color: '#666666',
                                                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                                                }}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5, duration: 0.6 }}
                                            >
                                                {skinTypeInfo[result].description}
                                            </motion.p>
                                        </div>
                                    </motion.div>

                                    {/* Características */}
                                    <motion.div 
                                        className="rounded-3xl p-6 md:p-8 shadow-sm"
                                        style={{ 
                                            backgroundColor: '#FFFFFF',
                                            border: `1px solid ${skinTypeInfo[result].bgColor}`
                                        }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7, duration: 0.6 }}
                                        whileHover={{ 
                                            scale: 1.01,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        <motion.h4 
                                            className="text-lg font-medium mb-4 flex items-center gap-3"
                                            style={{ 
                                                color: skinTypeInfo[result].color,
                                                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                                                fontWeight: '500'
                                            }}
                                        >
                                            <motion.div
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                transition={{ type: "spring", stiffness: 400 }}
                                            >
                                                {skinTypeInfo[result].icon}
                                            </motion.div>
                                            특징 / Características
                                        </motion.h4>
                                        <motion.div 
                                            className="space-y-2"
                                            variants={containerVariants}
                                            initial="hidden"
                                            animate="visible"
                                        >
                                            {skinTypeInfo[result].characteristics.map((char, index) => (
                                                <motion.div 
                                                    key={index} 
                                                    className="flex items-start gap-3"
                                                    variants={listItemVariants}
                                                    custom={index}
                                                    whileHover={{ x: 5 }}
                                                    transition={{ type: "spring", stiffness: 300 }}
                                                >
                                                    <motion.div 
                                                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                                        style={{ backgroundColor: skinTypeInfo[result].bgColor }}
                                                        animate={{ scale: [1, 1.2, 1] }}
                                                        transition={{ 
                                                            duration: 1.5,
                                                            repeat: Infinity,
                                                            delay: index * 0.2
                                                        }}
                                                    />
                                                    <span 
                                                        className="text-sm leading-relaxed"
                                                        style={{ 
                                                            color: '#666666',
                                                            fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                                                        }}
                                                    >
                                                        {char}
                                                    </span>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    </motion.div>

                                    {/* Recomendaciones */}
                                    <motion.div 
                                        className="rounded-3xl p-6 md:p-8 shadow-sm"
                                        style={{ 
                                            backgroundColor: '#FFFFFF',
                                            border: `1px solid ${skinTypeInfo[result].bgColor}`
                                        }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.9, duration: 0.6 }}
                                        whileHover={{ 
                                            scale: 1.01,
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        <motion.h4 
                                            className="text-lg font-medium mb-4"
                                            style={{ 
                                                color: skinTypeInfo[result].color,
                                                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                                                fontWeight: '500'
                                            }}
                                        >
                                            추천 사항 / Recomendaciones
                                        </motion.h4>
                                        <motion.div 
                                            className="space-y-3"
                                            variants={containerVariants}
                                            initial="hidden"
                                            animate="visible"
                                        >
                                            {skinTypeInfo[result].recommendations.map((rec, index) => (
                                                <motion.div 
                                                    key={index} 
                                                    className="flex items-start gap-3"
                                                    variants={listItemVariants}
                                                    custom={index}
                                                    whileHover={{ x: 5 }}
                                                    transition={{ type: "spring", stiffness: 300 }}
                                                >
                                                    <motion.div 
                                                        className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                                                        style={{ backgroundColor: '#A8D5BA' }}
                                                        animate={{ scale: [1, 1.3, 1] }}
                                                        transition={{ 
                                                            duration: 1.8,
                                                            repeat: Infinity,
                                                            delay: index * 0.3
                                                        }}
                                                    />
                                                    <span 
                                                        className="text-sm leading-relaxed"
                                                        style={{ 
                                                            color: '#666666',
                                                            fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                                                        }}
                                                    >
                                                        {rec}
                                                    </span>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    </motion.div>

                                    {/* Botón para repetir */}
                                    <motion.div 
                                        className="text-center"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.1, duration: 0.6 }}
                                    >
                                        <motion.button
                                            onClick={resetTest}
                                            className="px-8 py-3 rounded-full font-medium transition-colors text-sm tracking-wide"
                                            style={{ 
                                                backgroundColor: '#7FB069',
                                                color: '#FFFFFF',
                                                fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                                                fontWeight: '500'
                                            }}
                                            whileHover={{ 
                                                scale: 1.05,
                                                backgroundColor: '#6a9657',
                                                transition: { duration: 0.2 }
                                            }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            다시 하기 / Repetir Test
                                        </motion.button>
                                    </motion.div>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="question"
                                    className="rounded-3xl p-6 md:p-8 shadow-sm"
                                    style={{ 
                                        backgroundColor: '#FFFFFF',
                                        border: '1px solid #E8EAED'
                                    }}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <div className="space-y-6">
                                        <motion.div 
                                            className="text-center"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2, duration: 0.6 }}
                                        >
                                            <h3 
                                                className="text-lg md:text-xl font-medium leading-relaxed"
                                                style={{ 
                                                    color: '#4A90A4',
                                                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
                                                    fontWeight: '500'
                                                }}
                                            >
                                                {questions[currentStep - 1].question}
                                            </h3>
                                        </motion.div>
                                        
                                        <motion.div 
                                            className="space-y-3"
                                            variants={containerVariants}
                                            initial="hidden"
                                            animate="visible"
                                        >
                                            {questions[currentStep - 1].options.map((option, index) => (
                                                <motion.button
                                                    key={index}
                                                    onClick={() => handleAnswer(questions[currentStep - 1].id, option.value)}
                                                    className="w-full p-4 text-left rounded-2xl transition-all duration-300 text-sm md:text-base leading-relaxed group"
                                                    style={{ 
                                                        border: '1px solid #E8EAED',
                                                        backgroundColor: '#FFFFFF',
                                                        fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                                                    }}
                                                    variants={optionVariants}
                                                    custom={index}
                                                    whileHover="hover"
                                                    whileTap="tap"
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <motion.div 
                                                            className="w-3 h-3 rounded-full mt-1 flex-shrink-0 transition-colors"
                                                            style={{ border: '1px solid #E8EAED' }}
                                                            whileHover={{ 
                                                                borderColor: '#A8D5BA',
                                                                backgroundColor: '#A8D5BA'
                                                            }}
                                                        />
                                                        <span style={{ color: '#666666' }}>
                                                            {option.text}
                                                        </span>
                                                    </div>
                                                </motion.button>
                                            ))}
                                        </motion.div>
                                        
                                        {/* Progress bar minimalista */}
                                        <motion.div 
                                            className="space-y-2"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.8, duration: 0.6 }}
                                        >
                                            <div className="w-full rounded-full h-1"
                                                 style={{ backgroundColor: '#E8EAED' }}>
                                                <motion.div
                                                    className="h-1 rounded-full"
                                                    style={{ 
                                                        background: `linear-gradient(to right, #A8D5BA 0%, #B8E6E6 100%)`
                                                    }}
                                                    variants={progressVariants}
                                                    initial="initial"
                                                    animate="animate"
                                                />
                                            </div>
                                            <div className="flex justify-between text-xs"
                                                 style={{ 
                                                    color: '#999999',
                                                    fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
                                                }}>
                                                <motion.span
                                                    key={currentStep}
                                                    initial={{ scale: 1.2, color: '#7FB069' }}
                                                    animate={{ scale: 1, color: '#999999' }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {currentStep} / {questions.length}
                                                </motion.span>
                                                <motion.span
                                                    key={`${currentStep}-percent`}
                                                    initial={{ scale: 1.2, color: '#7FB069' }}
                                                    animate={{ scale: 1, color: '#999999' }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {Math.round((currentStep / questions.length) * 100)}%
                                                </motion.span>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Imagen - lado derecho */}
                    <motion.div 
                        className="relative order-1 lg:order-2"
                        variants={imageVariants}
                    >
                        <motion.div 
                            className="aspect-[4/5] lg:aspect-[3/4] relative overflow-hidden rounded-2xl"
                            whileHover={{ 
                                scale: 1.02,
                                transition: { duration: 0.4 }
                            }}
                        >
                            <motion.img
                                src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1200&q=80"
                                alt="Skincare coreano minimalista"
                                className="w-full h-full object-cover"
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                transition={{ 
                                    duration: 1.5,
                                    type: "spring",
                                    stiffness: 50
                                }}
                            />
                            <motion.div 
                                className="absolute inset-0"
                                style={{ 
                                    background: 'linear-gradient(to top, rgba(74, 144, 164, 0.2) 0%, transparent 100%)'
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            />
                            <motion.div 
                                className="absolute bottom-6 left-6 text-white"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 0.8 }}
                            >
                                <motion.p 
                                    className="text-sm md:text-base font-light tracking-wide"
                                    style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    한국 스킨케어
                                </motion.p>
                                <motion.p 
                                    className="text-xs md:text-sm opacity-80"
                                    style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.8 }}
                                    transition={{ delay: 1.2, duration: 0.6 }}
                                >
                                    Korean Skincare
                                </motion.p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default TipoPiel;