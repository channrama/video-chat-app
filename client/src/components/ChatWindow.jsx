// client/src/components/ChatWindow.js
import React, { useState, useEffect } from 'react';

const ChatWindow = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    if (socket) {
      socket.on('createMessage', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [socket]);

  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      socket.emit('message', inputMessage.trim());
      setInputMessage('');
    }
  };

  return (
    <div className="chat-window">
      <ul className="messages">
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <div className="main__message_container">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type message here.."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
