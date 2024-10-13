'use client'; // pour app/page.js

import { useState, useEffect } from 'react';
import io from 'socket.io-client';

let socket;

export default function Home() {
  const [username, setUsername] = useState('');  // Pseudo de l'utilisateur
  const [message, setMessage] = useState('');    // Message de l'utilisateur
  const [messages, setMessages] = useState([]);  // Liste des messages
  const [hasUsername, setHasUsername] = useState(false); // Si le pseudo est défini ou non

  useEffect(() => {
    // Connexion au serveur WebSocket
    socket = io();

    // Réception des messages
    socket.on('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSetUsername = () => {
    if (username.trim()) {
      setHasUsername(true);
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('message', { username, message }); // Envoie du pseudo avec le message
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Chat en temps réel avec pseudo</h1>

      {!hasUsername ? (
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Entrez votre pseudo"
          />
          <button onClick={handleSetUsername}>Confirmer Pseudo</button>
        </div>
      ) : (
        <div>
          <div>
            {messages.map((msg, index) => (
              <p key={index}>
                <strong>{msg.username}:</strong> {msg.message}
              </p>
            ))}
          </div>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Écris un message..."
          />
          <button onClick={sendMessage}>Envoyer</button>
        </div>
      )}
    </div>
  );
}
