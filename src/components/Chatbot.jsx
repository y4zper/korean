import React, { useState } from "react";
import { FaComments } from "react-icons/fa";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = { text: input };
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userMessage),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
    } catch (err) {
      console.error("Error al enviar mensaje:", err);
    }
  };

  return (  
    <div>
      {/* Ícono flotante */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-[#7FB069] text-white p-4 rounded-full shadow-lg hover:opacity-90"
      >
        <FaComments size={24} />
      </button>

      {/* Ventana de chat */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-[#F9F7F4] rounded-2xl shadow-lg flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-[#B8E6E6] p-3 font-semibold text-gray-700">
            Asistente Virtual
          </div>

          {/* Mensajes */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[70%] ${
                  m.sender === "user"
                    ? "ml-auto bg-[#B8E6E6] text-gray-800"
                    : "mr-auto bg-[#A8D5BA] text-gray-800"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-2 border-t border-[#E8EAED] flex">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 rounded-l-lg border border-[#E8EAED] focus:outline-none"
              placeholder="Escribe tu mensaje..."
            />
            <button
              onClick={sendMessage}
              className="bg-[#7FB069] text-white px-4 rounded-r-lg hover:opacity-90"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
