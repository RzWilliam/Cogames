// Chat.js
"use client";

import { useState, useEffect } from "react";
import { useSocket } from "@/context/SocketContext"; // Import du contexte
import { motion } from "framer-motion";

export default function Chat() {
  const socket = useSocket(); // Récupération du socket via le contexte
  const [username, setUsername] = useState(""); // Pseudo de l'utilisateur
  const [message, setMessage] = useState(""); // Message de l'utilisateur
  const [messages, setMessages] = useState([]); // Liste des messages
  const [hasUsername, setHasUsername] = useState(false); // Si le pseudo est défini ou non

  useEffect(() => {
    if (!socket) return; // Si le socket n'est pas encore prêt, ne rien faire

    // Réception des messages
    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Nettoyage lors du démontage
    return () => {
      socket.off("message"); // Retirer l'écouteur pour éviter les fuites de mémoire
    };
  }, [socket]);

  const handleSetUsername = () => {
    if (username.trim()) {
      setHasUsername(true);
    }
  };

  const sendMessage = () => {
    if (message.trim() && socket) {
      socket.emit("message", { username, message }); // Envoie du pseudo avec le message
      setMessage(""); // Réinitialisation du champ de message après envoi
    }
  };

  return (
    <div className="flex items-center w-full justify-center min-h-screen bg-gray-100">
      <motion.div
        className="w-full max-w-md p-4 bg-white rounded-lg shadow-md"
        initial={{ scale: 0, rotate: -90 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <h1 className="text-2xl font-bold text-center mb-4">
          Chat en temps réel
        </h1>

        {!hasUsername ? (
          <div className="flex flex-col items-center ">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Entrez votre pseudo"
              className="w-full px-4 py-2 mb-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSetUsername}
              className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Confirmer Pseudo
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="h-64 p-2 mb-4 overflow-y-auto bg-gray-100 border border-gray-300 rounded-lg">
              {messages.map((msg, index) => (
                <div key={index} className="mb-2">
                  <p className="text-gray-700">
                    <strong className="text-blue-500">{msg.username}:</strong>{" "}
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Écris un message..."
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Envoyer
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
